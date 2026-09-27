import React from 'react';
import { SocialSignal } from '../types';
import { Zap, Link as LinkIcon, Lightbulb, Users, Eye } from 'lucide-react';

interface SignalsGridProps {
  signals: SocialSignal[];
  activeSignalId: string | null;
  onSelectSignal: (id: string | null, participantIds: string[]) => void;
}

export const SignalsGrid: React.FC<SignalsGridProps> = ({
  signals,
  activeSignalId,
  onSelectSignal,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'strongest_interaction':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'connector':
        return <LinkIcon className="w-4 h-4 text-cyan-400" />;
      case 'team_structure':
        return <Users className="w-4 h-4 text-emerald-400" />;
      case 'discussion_pattern':
      default:
        return <Lightbulb className="w-4 h-4 text-yellow-300" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono-tech uppercase text-cyan-300 font-semibold tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          OVERALL TEAM INSIGHTS ({signals.length})
        </h3>
        <span className="text-[11px] text-slate-400 font-mono-tech">
          Click insight to illuminate in team constellation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {signals.map((sig) => {
          const isActive = activeSignalId === sig.id;

          return (
            <div
              key={sig.id}
              onClick={() => {
                if (isActive) {
                  onSelectSignal(null, []);
                } else {
                  onSelectSignal(sig.id, sig.highlightParticipants);
                }
              }}
              className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-[1.02]'
                  : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors shrink-0">
                    {getIcon(sig.type)}
                  </div>
                  <h4 className="text-xs font-display font-extrabold text-white tracking-wide uppercase">
                    {sig.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {sig.description}
                </p>
              </div>

              {/* Observable Evidence Note */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono-tech">
                <Eye className="w-3 h-3 text-cyan-400/80 shrink-0" />
                <span className="truncate">{sig.evidenceNote}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
