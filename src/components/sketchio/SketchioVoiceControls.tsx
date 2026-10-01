import React, { useState } from 'react';
import { Mic, MicOff, Users, AlertCircle, Loader2 } from 'lucide-react';
import {  useSketchio  } from '../../context/SketchioContext.js';
import {  useAuth  } from '../../context/AuthContext.js';
import {  AvatarDisplay  } from '../AvatarDisplay.js';
import {  sounds  } from '../../services/sound.js';

export const SketchioVoiceControls: React.FC = () => {
  const {
    skRoomState,
    skVoiceJoined,
    skVoiceMuted,
    skVoiceSpeaking,
    skVoicePermission,
    skVoiceError,
    skVoiceParticipants,
    skJoinVoiceChat,
    skLeaveVoiceChat,
    skToggleVoiceMute,
  } = useSketchio();
  const { effectiveProfile, user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showRoster, setShowRoster] = useState(false);

  if (!skRoomState) return null;

  const handleToggleVoice = async () => {
    sounds.playClick();
    if (skVoiceJoined) {
      skLeaveVoiceChat();
    } else {
      setIsConnecting(true);
      await skJoinVoiceChat();
      setIsConnecting(false);
    }
  };

  const handleMuteClick = () => {
    sounds.playClick();
    skToggleVoiceMute();
  };

  const myId = user?.id ?? effectiveProfile.id;
  const connectedVoiceUsers = Object.keys(skVoiceParticipants);
  const voiceUserCount = connectedVoiceUsers.length + (skVoiceJoined && !skVoiceParticipants[myId] ? 1 : 0);

  return (
    <div className="relative inline-flex items-center gap-1.5 sm:gap-2 select-none">
      {/* Voice Toggle Button */}
      {!skVoiceJoined ? (
        <button
          onClick={handleToggleVoice}
          disabled={isConnecting || skVoicePermission === 'unsupported'}
          aria-label="Join Sketchio voice chat"
          title="Join voice communication"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0F1217] hover:bg-[#181C24] border border-[#28303F] hover:border-[#22D3EE]/40 text-xs font-semibold text-[#9AA0AD] hover:text-[#22D3EE] transition-all cursor-pointer disabled:opacity-50"
        >
          {isConnecting ? (
            <Loader2 size={13} className="animate-spin text-[#22D3EE]" />
          ) : (
            <Mic size={13} className="text-[#9AA0AD]" />
          )}
          <span className="hidden sm:inline">{isConnecting ? 'Connecting…' : 'Join Voice'}</span>
          {voiceUserCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-md bg-[#22D3EE]/20 text-[#22D3EE] text-[10px] font-mono font-bold">
              {voiceUserCount}
            </span>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F1217] border border-[#28303F] shadow-md">
          {/* Mute/Unmute Toggle */}
          <button
            onClick={handleMuteClick}
            aria-label={skVoiceMuted ? 'Unmute microphone' : 'Mute microphone'}
            title={skVoiceMuted ? 'Microphone is muted (Click to unmute)' : 'Microphone is live (Click to mute)'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              skVoiceMuted
                ? 'bg-[#EF4444]/15 border border-[#EF4444]/35 text-[#FF9AA2] hover:bg-[#EF4444]/25'
                : skVoiceSpeaking
                ? 'bg-[#22D3EE]/25 border border-[#22D3EE] text-[#22D3EE] ring-2 ring-[#22D3EE]/40 animate-pulse'
                : 'bg-[#22D3EE]/15 border border-[#22D3EE]/35 text-[#22D3EE] hover:bg-[#22D3EE]/25'
            }`}
          >
            {skVoiceMuted ? (
              <MicOff size={13} className="text-[#FF9AA2]" />
            ) : (
              <Mic size={13} className="text-[#22D3EE]" />
            )}
            <span className="hidden sm:inline">{skVoiceMuted ? 'Muted' : skVoiceSpeaking ? 'Speaking…' : 'Unmuted'}</span>
          </button>

          {/* Connected Participants Count Pill */}
          <button
            onClick={() => setShowRoster(!showRoster)}
            aria-label="Toggle voice participants list"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-[#9AA0AD] hover:text-[#22D3EE] hover:bg-[#181C24] transition-colors cursor-pointer"
          >
            <Users size={13} />
            <span className="font-mono text-[11px] font-bold text-[#22D3EE]">{voiceUserCount}</span>
          </button>

          {/* Leave Voice */}
          <button
            onClick={handleToggleVoice}
            aria-label="Disconnect from voice chat"
            title="Leave voice chat"
            className="px-2 py-1 rounded-lg text-xs text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#FF6B7A] transition-colors cursor-pointer"
          >
            Leave
          </button>
        </div>
      )}

      {/* Permission / Error Notice */}
      {skVoiceError && (
        <div className="absolute top-full right-0 mt-2 z-50 p-2.5 bg-[#181C24] border border-[#EF4444]/40 rounded-xl text-xs text-[#FF9AA2] shadow-xl max-w-[260px] sm:max-w-xs flex items-start gap-2">
          <AlertCircle size={14} className="text-[#EF4444] shrink-0 mt-0.5" />
          <div className="leading-tight">
            <span>{skVoiceError}</span>
          </div>
        </div>
      )}

      {/* Voice Participants Roster Dropdown */}
      {showRoster && skVoiceJoined && (
        <div className="absolute top-full right-0 mt-2 z-50 w-56 bg-[#11131A] border border-[#28303F] rounded-xl shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[#28303F] mb-2 text-xs font-bold text-[#E6E8EC]">
            <span>Voice Members</span>
            <span className="text-[10px] text-[#22D3EE] font-mono">{voiceUserCount} Connected</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {/* Self */}
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#0A0B10] border border-[#28303F]">
              <div className="flex items-center gap-2">
                <div className={`relative ${skVoiceSpeaking ? 'ring-2 ring-[#22D3EE] rounded-lg' : ''}`}>
                  <AvatarDisplay avatarId={effectiveProfile.avatar} size="sm" showBorder={false} />
                </div>
                <span className="text-xs font-semibold text-[#E6E8EC] truncate max-w-[85px]">
                  {effectiveProfile.username} (You)
                </span>
              </div>
              {skVoiceMuted ? (
                <MicOff size={12} className="text-[#FF9AA2]" />
              ) : (
                <Mic size={12} className={skVoiceSpeaking ? 'text-[#22D3EE]' : 'text-[#737B8C]'} />
              )}
            </div>

            {/* Other room players in voice */}
            {skRoomState.players
              .filter((p) => p.id !== myId && skVoiceParticipants[p.id])
              .map((p) => {
                const status = skVoiceParticipants[p.id];
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-[#0A0B10] border border-[#28303F]"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`relative ${status?.isSpeaking ? 'ring-2 ring-[#22D3EE] rounded-lg' : ''}`}>
                        <AvatarDisplay avatarId={p.avatar} size="sm" showBorder={false} />
                      </div>
                      <span className="text-xs font-medium text-[#E6E8EC] truncate max-w-[95px]">
                        {p.username}
                      </span>
                    </div>
                    {status?.isMuted ? (
                      <MicOff size={12} className="text-[#FF9AA2]" />
                    ) : (
                      <Mic size={12} className={status?.isSpeaking ? 'text-[#22D3EE] animate-pulse' : 'text-[#737B8C]'} />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
