import React from 'react';
import { TeamStats as ITeamStats } from '../types';
import { Users, Zap, GitBranch, Layers } from 'lucide-react';

interface TeamStatsProps {
  stats: ITeamStats;
}

export const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  const items = [
    {
      label: 'PARTICIPANTS',
      value: stats.participantsCount,
      icon: <Users className="w-4 h-4 text-cyan-400" />,
      sub: 'Unique team members detected',
    },
    {
      label: 'STRONG INTERACTION PAIRS',
      value: stats.strongInteractionPairs,
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      sub: 'High reciprocal velocity',
    },
    {
      label: 'OBSERVED PATTERNS',
      value: stats.observedInteractionPatterns,
      icon: <GitBranch className="w-4 h-4 text-purple-400" />,
      sub: 'Multi-party discussion flows',
    },
    {
      label: 'MEETING IMAGES ANALYZED',
      value: stats.imagesAnalyzed,
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      sub: 'Aggregated evidence pool',
    },
  ];

  return (
    <div className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-5 shadow-lg backdrop-blur-md">
      <div className="text-[11px] font-mono-tech uppercase tracking-wider text-cyan-300 font-bold mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>TEAM X-RAY // CONSOLIDATED METRICS</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3.5 hover:border-slate-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-xl font-display font-black text-white">
                {item.value}
              </div>
              <div className="text-[10px] font-mono-tech uppercase tracking-tight text-slate-300">
                {item.label}
              </div>
              <div className="text-[9px] text-slate-400 font-mono-tech">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
