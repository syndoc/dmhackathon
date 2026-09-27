import React from 'react';
import { Participant } from '../types';
import { AiAvatar } from './AiAvatar';
import { Eye, ShieldCheck, X, Zap, Users } from 'lucide-react';

interface ParticipantProfileProps {
  participant: Participant | null;
  totalImagesAnalyzed: number;
  onClose: () => void;
  onSelectOtherParticipant?: (id: string) => void;
}

export const ParticipantProfile: React.FC<ParticipantProfileProps> = ({
  participant,
  totalImagesAnalyzed,
  onClose,
  onSelectOtherParticipant,
}) => {
  if (!participant) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#090d16]/95 border-l border-cyan-500/40 p-6 shadow-[-15px_0_50px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right-10 duration-300">
      
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono-tech uppercase font-bold tracking-wider text-cyan-300">
              TEAM MEMBER DOSSIER
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close dossier"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero: Large AI Avatar with Glowing Aura */}
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <AiAvatar
              styleConfig={participant.avatarStyle}
              expression={participant.representativeExpression}
              size="lg"
              isSelected={true}
              showAura={true}
            />

            {/* Expression Pill */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-400/50 text-[10px] font-mono-tech text-cyan-300 shadow flex items-center gap-1 whitespace-nowrap">
              <span>Representative:</span>
              <span className="font-bold uppercase tracking-wider">{participant.representativeExpression}</span>
            </div>
          </div>

          {/* Name & Observed Role */}
          <h3 className="text-2xl font-display font-extrabold text-white tracking-wide mt-2">
            {participant.name}
          </h3>

          <div className="mt-1 px-3 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech uppercase font-bold tracking-wider">
            {participant.observedRole}
          </div>
        </div>

        {/* 1. VISIBLE SIGNALS */}
        <div className="mt-6 space-y-2">
          <div className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>VISIBLE SIGNALS</span>
          </div>
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-3.5 space-y-2">
            {participant.visibleSignals.map((signal, idx) => (
              <div key={idx} className="text-xs text-slate-200 flex items-center gap-2">
                <span>{signal}</span>
              </div>
            ))}
            <div className="text-xs text-slate-400 italic pt-1 border-t border-slate-800/60">
              {participant.evidenceSummary}
            </div>
          </div>
        </div>

        {/* 2. OBSERVED INTERACTIONS (Visual Blocks e.g. Person 2 ████████░░) */}
        <div className="mt-6 space-y-2">
          <div className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>OBSERVED INTERACTIONS</span>
          </div>
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-3.5 space-y-2.5 font-mono-tech">
            {participant.interactionScores.map((item, idx) => {
              const filledBlocks = '█'.repeat(Math.min(10, Math.max(1, item.score)));
              const emptyBlocks = '░'.repeat(Math.max(0, 10 - item.score));

              return (
                <div
                  key={idx}
                  onClick={() => onSelectOtherParticipant && onSelectOtherParticipant(item.targetId)}
                  className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
                  title={`Click to inspect ${item.targetName}`}
                >
                  <span className="text-slate-300 font-semibold w-28 truncate">
                    {item.targetName}
                  </span>
                  <div className="flex-1 px-3 text-right">
                    <span className="text-cyan-400 tracking-tighter">{filledBlocks}</span>
                    <span className="text-slate-700 tracking-tighter">{emptyBlocks}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 w-8 text-right font-bold">
                    {item.score}/10
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. MEETING PATTERN */}
        <div className="mt-6 space-y-2">
          <div className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider">
            MEETING PATTERN
          </div>
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-3.5 text-xs text-slate-300 leading-relaxed italic">
            "{participant.meetingPattern}"
          </div>
        </div>

        {/* 4. DEDUPLICATION EVIDENCE NOTE */}
        <div className="mt-6 p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center gap-3 text-xs text-slate-300 font-mono-tech">
          <Users className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Identified across {participant.appearancesInImages} of {totalImagesAnalyzed} uploaded meeting screenshots as a single unified team member.
          </span>
        </div>

      </div>

      {/* Footer Notice */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-400 font-mono-tech">
        <ShieldCheck className="w-4 h-4 text-cyan-400/80 shrink-0" />
        <span>AI-INFERRED FROM {totalImagesAnalyzed} MEETING IMAGES • OBSERVABLE DYNAMICS ONLY</span>
      </div>

    </div>
  );
};
