import React from 'react';
import { Activity, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface HeaderProps {
  currentStep: 'upload' | 'scanning' | 'results';
  onReset: () => void;
  onLoadSample: () => void;
  hasCustomImages: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onReset,
  onLoadSample,
  hasCustomImages,
}) => {
  return (
    <header className="border-b border-cyan-500/20 bg-[#06080e]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Scanner Moniker */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                SOCIAL X-RAY
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-tech tracking-wider uppercase font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                FLUOROSCOPIC v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Observable Meeting Dynamics Analyzer
            </p>
          </div>
        </div>

        {/* Telemetry & Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono-tech text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM: {currentStep === 'scanning' ? 'IDENTITY MATCHING' : currentStep === 'results' ? 'TEAM X-RAY LOADED' : 'AWAITING EVIDENCE'}</span>
          </div>

          {currentStep === 'results' && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm"
              title="Start a new meeting scan"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>New Scan</span>
            </button>
          )}

          {currentStep === 'upload' && (
            <button
              onClick={onLoadSample}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.15)]"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Load Sample Meeting</span>
              <span className="sm:hidden">Sample</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
