import React, { useState } from 'react';
import {
  Copy, CheckCheck, Play, LogOut, Settings, Users,
  Clock, Pencil, UserX, Mic, MicOff,
} from 'lucide-react';
import {  useSketchio  } from '../../context/SketchioContext.js';
import {  useAuth  } from '../../context/AuthContext.js';
import {  AvatarDisplay  } from '../AvatarDisplay.js';
import {  SketchioVoiceControls  } from './SketchioVoiceControls.js';
import {  sounds  } from '../../services/sound.js';

export const SketchioLobbyView: React.FC = () => {
  const {
    skRoomState, skAmIHost, skMyPlayer, skVoiceParticipants,
    skStartGame, skLeave, skKickPlayer, skUpdateSettings,
  } = useSketchio();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (!skRoomState) return null;
  const { roomCode, players, settings } = skRoomState;
  const connectedCount = players.filter(p => p.isConnected).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode).catch(() => {});
    sounds.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Pencil size={18} className="text-[#22D3EE]" />
            <h1 className="font-display text-xl sm:text-2xl font-black text-white">Sketchio</h1>
          </div>
          <p className="text-[10px] sm:text-xs text-[#475569] font-mono">Draw a word · Everyone guesses · First right wins points</p>
        </div>
        <div className="flex items-center gap-2">
          <SketchioVoiceControls />
          <button
            onClick={() => { sounds.playClick(); skLeave(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#9AA0AD] hover:text-[#EF4444] hover:bg-[#EF4444]/10 border border-[#28303F] transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            Leave
          </button>
        </div>
      </div>

      {/* Room code card */}
      <div className="relative glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-[#22D3EE]/20 overflow-hidden">
        <div className="orb orb-gold absolute -right-10 -top-10 w-40 h-40 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)' }} />
        <p className="text-xs text-[#475569] font-mono uppercase tracking-widest mb-2">Room Code</p>
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-black tracking-widest text-[#22D3EE]">{roomCode}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#28303F] hover:border-[#22D3EE]/40 bg-[#0F1217] text-xs font-semibold text-[#9AA0AD] hover:text-[#22D3EE] transition-colors cursor-pointer"
          >
            {copied ? <><CheckCheck size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
          </button>
        </div>
        <p className="text-[10px] sm:text-xs text-[#2A3045] mt-2 font-mono">Share this code with friends to join</p>
      </div>

      {/* Players list */}
      <div className="glass rounded-2xl p-3 sm:p-5 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#E6E8EC]">
            <Users size={15} className="text-[#22D3EE]" />
            Players ({connectedCount}/{settings.maxPlayers})
          </div>
          {connectedCount < 2 && (
            <span className="text-xs text-[#475569] font-mono">Need {2 - connectedCount} more to start</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {players.map(p => {
            const vStatus = skVoiceParticipants[p.id];
            return (
            <div
              key={p.id}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                p.isConnected
                  ? vStatus?.isSpeaking
                    ? 'bg-[#0F1217] border-[#22D3EE] ring-1 ring-[#22D3EE]/50 shadow-lg shadow-cyan-950/20'
                    : 'bg-[#0F1217] border-[#28303F]'
                  : 'bg-[#0A0B10] border-[#1A1F2E] opacity-40'
              }`}
            >
              <div className="relative">
                <AvatarDisplay avatarId={p.avatar} size="md" />
                {vStatus && (
                  <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full border border-[#0F1217] ${
                    vStatus.isMuted ? 'bg-[#EF4444] text-white' : vStatus.isSpeaking ? 'bg-[#22D3EE] text-[#0A0B10] animate-pulse' : 'bg-[#181C24] text-[#22D3EE]'
                  }`}>
                    {vStatus.isMuted ? <MicOff size={10} /> : <Mic size={10} />}
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-[#E6E8EC] truncate max-w-full text-center">
                {p.username}
              </span>
              {p.isHost && (
                <span className="text-[9px] font-mono text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/25 px-1.5 py-0.5 rounded">
                  HOST
                </span>
              )}
              {!p.isConnected && (
                <span className="text-[9px] text-[#475569] font-mono">offline</span>
              )}
              {skAmIHost && p.id !== (user?.id) && p.isConnected && (
                <button
                  onClick={() => { sounds.playClick(); skKickPlayer(p.id); }}
                  title="Kick player"
                  className="absolute top-1.5 right-1.5 p-1 rounded-lg text-[#475569] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                >
                  <UserX size={11} />
                </button>
              )}
            </div>
            );
          })}

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, settings.maxPlayers - players.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-[#1A1F2E] opacity-30">
              <div className="w-10 h-10 rounded-xl bg-[#0A0B10] flex items-center justify-center text-[#2A3045]">
                <Users size={14} />
              </div>
              <span className="text-xs text-[#2A3045] font-mono">Empty</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings (host only) */}
      {skAmIHost && (
        <div className="glass rounded-2xl mb-4 sm:mb-6 overflow-hidden">
          <button
            onClick={() => { sounds.playClick(); setShowSettings(s => !s); }}
            className="w-full flex items-center justify-between p-4 text-sm font-semibold text-[#9AA0AD] hover:text-[#E6E8EC] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Settings size={15} className="text-[#22D3EE]" />
              Game Settings
            </div>
            <span className="text-xs font-mono text-[#475569]">{showSettings ? '▲ Hide' : '▼ Show'}</span>
          </button>

          {showSettings && (
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-[#28303F]">
              {/* Rounds */}
              <div>
                <label className="block text-xs text-[#475569] font-mono uppercase tracking-widest mb-2">Rounds</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => skUpdateSettings({ rounds: n })}
                      className={`w-9 h-9 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        settings.rounds === n
                          ? 'bg-[#22D3EE]/20 border-[#22D3EE]/50 text-[#22D3EE]'
                          : 'bg-[#0F1217] border-[#28303F] text-[#9AA0AD] hover:border-[#22D3EE]/30'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Draw time */}
              <div>
                <label className="block text-xs text-[#475569] font-mono uppercase tracking-widest mb-2">Draw Time</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[40, 60, 80, 120].map(t => (
                    <button
                      key={t}
                      onClick={() => skUpdateSettings({ drawingTimeSeconds: t })}
                      className={`px-3 h-9 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        settings.drawingTimeSeconds === t
                          ? 'bg-[#22D3EE]/20 border-[#22D3EE]/50 text-[#22D3EE]'
                          : 'bg-[#0F1217] border-[#28303F] text-[#9AA0AD] hover:border-[#22D3EE]/30'
                      }`}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Max players */}
              <div>
                <label className="block text-xs text-[#475569] font-mono uppercase tracking-widest mb-2">
                  <Clock size={11} className="inline mr-1" />
                  Max Players
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[2, 4, 6, 8, 10, 12].map(n => (
                    <button
                      key={n}
                      onClick={() => skUpdateSettings({ maxPlayers: n })}
                      className={`w-9 h-9 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        settings.maxPlayers === n
                          ? 'bg-[#22D3EE]/20 border-[#22D3EE]/50 text-[#22D3EE]'
                          : 'bg-[#0F1217] border-[#28303F] text-[#9AA0AD] hover:border-[#22D3EE]/30'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Start / waiting */}
      {skAmIHost ? (
        <button
          onClick={() => { sounds.playClick(); skStartGame(); }}
          disabled={connectedCount < 2}
          className="w-full py-4 rounded-lg font-display font-black text-base text-black bg-cyan-400 hover:bg-cyan-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <Play size={18} />
          Start Game
        </button>
      ) : (
        <div className="text-center py-4 text-sm text-[#475569] font-mono animate-pulse">
          Waiting for the host to start the game…
        </div>
      )}
    </div>
  );
};
