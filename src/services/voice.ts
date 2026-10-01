/**
 * Suspecto Real-Time WebRTC Voice Communication Service
 * Mesh audio connections across room participants with speaking volume detection.
 * Supports reliable multi-peer mesh audio, candidate queuing, AudioContext resumption,
 * and robust cleanup.
 */

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

export type VoicePermissionStatus = 'prompt' | 'granted' | 'denied' | 'unsupported';

export class VoiceService {
  private localStream: MediaStream | null = null;
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private remoteAudioElements: Map<string, HTMLAudioElement> = new Map();
  private pendingIceCandidates: Map<string, RTCIceCandidateInit[]> = new Map();
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private voiceCheckInterval: any = null;

  public isJoinedVoice: boolean = false;
  public isMuted: boolean = false;
  public isSpeaking: boolean = false;
  public permissionStatus: VoicePermissionStatus = 'prompt';
  public errorMessage: string | null = null;

  private onStateChangeCallback?: () => void;
  private sendSignalCallback?: (toPlayerId: string, signal: any) => void;
  private sendStatusCallback?: (isMuted: boolean, isSpeaking: boolean, isJoinedVoice: boolean) => void;

  constructor() {
    if (typeof window !== 'undefined' && (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
      this.permissionStatus = 'unsupported';
    }
  }

  public setCallbacks(
    onStateChange: () => void,
    sendSignal: (toPlayerId: string, signal: any) => void,
    sendStatus: (isMuted: boolean, isSpeaking: boolean, isJoinedVoice: boolean) => void
  ) {
    this.onStateChangeCallback = onStateChange;
    this.sendSignalCallback = sendSignal;
    this.sendStatusCallback = sendStatus;
  }

  public async joinVoice(): Promise<boolean> {
    if (this.isJoinedVoice && this.localStream) return true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.permissionStatus = 'unsupported';
      this.errorMessage = 'Voice chat is not supported in this browser.';
      this.notifyChange();
      return false;
    }

    try {
      this.errorMessage = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      this.localStream = stream;
      this.isJoinedVoice = true;
      this.isMuted = false;
      this.permissionStatus = 'granted';

      // Setup audio analyzer for speaking volume detection
      await this.setupAudioAnalyzer(stream);

      // Notify server of voice status
      if (this.sendStatusCallback) {
        this.sendStatusCallback(this.isMuted, this.isSpeaking, true);
      }

      this.notifyChange();
      return true;
    } catch (err: any) {
      console.warn('[Voice] Failed to get user media:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.permissionStatus = 'denied';
        this.errorMessage = 'Microphone permission denied. Please allow microphone access in your browser.';
      } else {
        this.errorMessage = 'Could not access microphone: ' + (err.message || 'Unknown error');
      }
      this.isJoinedVoice = false;
      this.notifyChange();
      return false;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !muted;
      });
    }

    if (muted && this.isSpeaking) {
      this.isSpeaking = false;
    }

    if (this.sendStatusCallback && this.isJoinedVoice) {
      this.sendStatusCallback(this.isMuted, this.isSpeaking, this.isJoinedVoice);
    }

    this.notifyChange();
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
  }

  /**
   * Synchronize WebRTC peer connections with players actively in voice chat.
   * Only players who have joined voice are connected to avoid offer drops.
   */
  public syncPeers(activeVoicePlayerIds: string[], myPlayerId: string) {
    if (!this.isJoinedVoice || !this.localStream) return;

    // Connect with newly active voice peers
    for (const peerId of activeVoicePlayerIds) {
      if (peerId === myPlayerId) continue;

      if (!this.peerConnections.has(peerId)) {
        // If my ID is lower, initiate offer
        const shouldOffer = myPlayerId < peerId;
        this.createPeerConnection(peerId, myPlayerId, shouldOffer);
      }
    }

    // Cleanup peers who left voice
    for (const [peerId, pc] of this.peerConnections.entries()) {
      if (!activeVoicePlayerIds.includes(peerId)) {
        this.cleanupPeer(peerId, pc);
      }
    }
  }

  public async handleIncomingSignal(fromPlayerId: string, signal: any, myPlayerId: string) {
    if (!this.isJoinedVoice || !this.localStream) return;

    let pc = this.peerConnections.get(fromPlayerId);
    if (!pc) {
      // Passive receiver peer connection
      pc = this.createPeerConnection(fromPlayerId, myPlayerId, false);
    }

    try {
      if (signal.type === 'offer') {
        await pc.setRemoteDescription(new RTCSessionDescription(signal));

        // Process any queued ICE candidates
        await this.drainPendingIceCandidates(fromPlayerId, pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        if (this.sendSignalCallback) {
          this.sendSignalCallback(fromPlayerId, answer);
        }
      } else if (signal.type === 'answer') {
        if (pc.signalingState !== 'stable') {
          await pc.setRemoteDescription(new RTCSessionDescription(signal));
          // Process any queued ICE candidates
          await this.drainPendingIceCandidates(fromPlayerId, pc);
        }
      } else if (signal.candidate) {
        if (pc.remoteDescription && pc.remoteDescription.type) {
          await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
        } else {
          // Queue candidate until remote description is set
          const pending = this.pendingIceCandidates.get(fromPlayerId) || [];
          pending.push(signal.candidate);
          this.pendingIceCandidates.set(fromPlayerId, pending);
        }
      }
    } catch (err) {
      console.warn(`[Voice] Error handling signal from ${fromPlayerId}:`, err);
    }
  }

  private async drainPendingIceCandidates(peerId: string, pc: RTCPeerConnection) {
    const pending = this.pendingIceCandidates.get(peerId);
    if (pending && pending.length > 0) {
      for (const cand of pending) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(cand));
        } catch (e) {
          console.warn(`[Voice] Failed to add queued ICE candidate for ${peerId}:`, e);
        }
      }
      this.pendingIceCandidates.delete(peerId);
    }
  }

  private createPeerConnection(peerId: string, myPlayerId: string, shouldOffer: boolean): RTCPeerConnection {
    // If existing connection exists, close it first
    const existing = this.peerConnections.get(peerId);
    if (existing) {
      this.cleanupPeer(peerId, existing);
    }

    const pc = new RTCPeerConnection(RTC_CONFIG);
    this.peerConnections.set(peerId, pc);

    // Add local tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        pc.addTrack(track, this.localStream!);
      });
    }

    // Handle remote audio stream
    pc.ontrack = (event) => {
      let audio = this.remoteAudioElements.get(peerId);
      if (!audio) {
        audio = new Audio();
        audio.autoplay = true;
        (audio as any).playsInline = true;
        this.remoteAudioElements.set(peerId, audio);
      }
      if (event.streams && event.streams[0]) {
        audio.srcObject = event.streams[0];
        audio.play().catch((e) => {
          console.debug('[Voice] Autoplay blocked, waiting for user gesture:', e);
        });
      }
    };

    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && this.sendSignalCallback) {
        this.sendSignalCallback(peerId, { candidate: event.candidate });
      }
    };

    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed') {
        console.warn(`[Voice] Connection failed with ${peerId}, cleaning up`);
        this.cleanupPeer(peerId, pc);
      }
    };

    // If initiator, create and send initial offer
    if (shouldOffer) {
      pc.createOffer({ offerToReceiveAudio: true })
        .then((offer) => pc.setLocalDescription(offer).then(() => offer))
        .then((offer) => {
          if (this.sendSignalCallback) {
            this.sendSignalCallback(peerId, offer);
          }
        })
        .catch((err) => {
          console.warn(`[Voice] Failed to create offer for ${peerId}:`, err);
        });
    }

    return pc;
  }

  private cleanupPeer(peerId: string, pc: RTCPeerConnection) {
    try {
      pc.close();
    } catch (_) {}
    this.peerConnections.delete(peerId);
    this.pendingIceCandidates.delete(peerId);

    const audio = this.remoteAudioElements.get(peerId);
    if (audio) {
      try {
        audio.srcObject = null;
        audio.pause();
        audio.remove();
      } catch (_) {}
      this.remoteAudioElements.delete(peerId);
    }
  }

  private async setupAudioAnalyzer(stream: MediaStream) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.audioContext = new AudioCtx();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume().catch(() => {});
      }

      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let speakingDebounce = false;

      if (this.voiceCheckInterval) {
        clearInterval(this.voiceCheckInterval);
      }

      this.voiceCheckInterval = setInterval(() => {
        if (!this.analyser || this.isMuted || !this.isJoinedVoice) {
          if (this.isSpeaking) {
            this.isSpeaking = false;
            this.notifyStatusUpdate();
            this.notifyChange();
          }
          return;
        }

        // Resume audio context if it was suspended by the browser
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().catch(() => {});
        }

        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const nowSpeaking = average > 16; // speaking threshold

        if (nowSpeaking !== this.isSpeaking) {
          if (nowSpeaking) {
            this.isSpeaking = true;
            speakingDebounce = true;
            this.notifyStatusUpdate();
            this.notifyChange();
          } else if (speakingDebounce) {
            // Keep speaking active for at least 300ms to prevent flickering
            speakingDebounce = false;
            setTimeout(() => {
              if (!speakingDebounce && this.isSpeaking) {
                this.isSpeaking = false;
                this.notifyStatusUpdate();
                this.notifyChange();
              }
            }, 300);
          }
        }
      }, 120);
    } catch (err) {
      console.warn('[Voice] Audio analyzer init failed:', err);
    }
  }

  private notifyStatusUpdate() {
    if (this.sendStatusCallback && this.isJoinedVoice) {
      this.sendStatusCallback(this.isMuted, this.isSpeaking, this.isJoinedVoice);
    }
  }

  private notifyChange() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback();
    }
  }

  public leaveVoice() {
    if (this.voiceCheckInterval) {
      clearInterval(this.voiceCheckInterval);
      this.voiceCheckInterval = null;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }

    for (const [peerId, pc] of this.peerConnections.entries()) {
      this.cleanupPeer(peerId, pc);
    }
    this.peerConnections.clear();
    this.pendingIceCandidates.clear();

    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (_) {}
      this.audioContext = null;
    }

    const wasJoined = this.isJoinedVoice;
    this.isJoinedVoice = false;
    this.isMuted = false;
    this.isSpeaking = false;

    if (wasJoined && this.sendStatusCallback) {
      this.sendStatusCallback(true, false, false);
    }

    this.notifyChange();
  }
}

export function createVoiceService(): VoiceService {
  return new VoiceService();
}

export const voiceService = new VoiceService();
