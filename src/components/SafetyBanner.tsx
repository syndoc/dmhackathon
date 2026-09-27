import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface SafetyBannerProps {
  disclaimer?: string;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({
  disclaimer = "Social X-Ray shows AI-inferred interaction patterns from the provided meeting evidence. It does not determine people's actual feelings or relationships.",
}) => {
  return (
    <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4 flex items-center gap-3.5 text-xs text-slate-400">
      <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
        <ShieldCheck className="w-4 h-4" />
      </div>
      <div className="leading-relaxed">
        <span className="text-cyan-300 font-mono-tech font-semibold uppercase text-[11px] block sm:inline sm:mr-2">
          Observation Boundary:
        </span>
        <span>{disclaimer}</span>
      </div>
    </div>
  );
};
