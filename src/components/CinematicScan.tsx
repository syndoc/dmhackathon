import React, { useEffect, useState } from 'react';
import { UploadedImage, Participant, EnergyPath } from '../types';
import { AiAvatar } from './AiAvatar';
import { Scan, Users, GitMerge, Sparkles } from 'lucide-react';

interface CinematicScanProps {
  images: UploadedImage[];
  sampleParticipants: Participant[];
  sampleInteractions: EnergyPath[];
  onComplete: () => void;
}

export const CinematicScan: React.FC<CinematicScanProps> = ({
  images,
  sampleParticipants,
  sampleInteractions,
  onComplete,
}) => {
  // Stages: 1 -> 2 -> 3 -> 4
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Stage 1: 0 - 950ms: INGESTING MEETING EVIDENCE...
    // Stage 2: 950 - 2000ms: MATCHING IDENTITIES ACROSS IMAGES...
    // Stage 3: 2000 - 3050ms: CONSOLIDATING TEAM DYNAMICS...
    // Stage 4: 3050 - 4000ms: TEAM SOCIAL X-RAY REVEALED
    const t1 = setTimeout(() => setStage(2), 950);
    const t2 = setTimeout(() => setStage(3), 2000);
    const t3 = setTimeout(() => setStage(4), 3050);
    const t4 = setTimeout(() => onComplete(), 4050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#06080e] flex flex-col items-center justify-center p-4 md:p-8 select-none overflow-hidden">
      {/* Background Fluoroscopic Grid and radial glow */}
      <div className="absolute inset-0 xray-grid opacity-30 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none animate-pulse-ring" />

      {/* Main Viewport Card */}
      <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl border border-cyan-500/50 bg-black overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col justify-between">
        
        {/* Stage 1: Grid of ingested meeting evidence thumbnails */}
        {stage === 1 && (
          <div className="absolute inset-0 p-6 grid grid-cols-2 gap-3 opacity-60 animate-in fade-in duration-300">
            {images.slice(0, 4).map((img, idx) => (
              <div key={img.id || idx} className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950">
                <img src={img.dataUrl} alt="Meeting evidence" className="w-full h-full object-cover filter contrast-125" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-tech text-cyan-300">
                  EVIDENCE #{idx + 1}
                </div>
              </div>
            ))}
            {/* Sweeping laser */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-beam-sweep" />
            </div>
          </div>
        )}

        {/* Stage 2 & 3 & 4: Deduplicated Team Constellation Emerging */}
        {stage >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center z-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative w-full h-full">
              {/* Concentric orbital rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[380px] h-[380px] rounded-full border border-cyan-500/15" />
                <div className="w-[240px] h-[240px] rounded-full border border-cyan-500/20" />
              </div>

              {/* Sample deduplicated avatars (4 members) */}
              {sampleParticipants.slice(0, 4).map((p, idx) => {
                const diamond = [
                  { x: 50, y: 22 },
                  { x: 24, y: 55 },
                  { x: 76, y: 55 },
                  { x: 50, y: 80 },
                ];
                const pos = diamond[idx % 4];

                return (
                  <div
                    key={p.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div className="flex flex-col items-center">
                      <AiAvatar
                        styleConfig={p.avatarStyle}
                        expression={p.representativeExpression}
                        size="md"
                        showAura={true}
                        isSelected={stage === 4}
                      />
                      <div className="mt-1 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/40 text-[10px] font-mono-tech text-cyan-300 whitespace-nowrap">
                        {p.name}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Flowing connection paths in Stage 3 & 4 */}
              {stage >= 3 && (
                <svg
                  viewBox="0 0 1000 650"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-in fade-in duration-500"
                >
                  <path
                    d="M 500 143 Q 320 250 240 357"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeDasharray="6 3"
                  />
                  <path
                    d="M 500 143 Q 680 250 760 357"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M 240 357 Q 350 480 500 520"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  <path
                    d="M 760 357 Q 650 480 500 520"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  {/* Particles */}
                  <circle r="4" fill="#ffffff">
                    <animateMotion path="M 500 143 Q 680 250 760 357" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="4" fill="#06b6d4">
                    <animateMotion path="M 500 143 Q 320 250 240 357" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Top HUD Telemetry */}
        <div className="relative z-30 p-4 flex items-center justify-between text-xs font-mono-tech text-cyan-300 bg-slate-950/70 backdrop-blur-sm border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold tracking-wider uppercase">
              {stage === 1 && 'STAGE 1 // INGESTING MEETING EVIDENCE...'}
              {stage === 2 && 'STAGE 2 // MATCHING IDENTITIES & DEDUPLICATING...'}
              {stage === 3 && 'STAGE 3 // CONSOLIDATING TEAM DYNAMICS...'}
              {stage === 4 && 'STAGE 4 // TEAM SOCIAL X-RAY REVEALED'}
            </span>
          </div>
          <div className="text-slate-400">
            {images.length} SCREENSHOTS ANALYZED TOGETHER
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="relative z-30 p-6 flex flex-col items-center text-center bg-slate-950/85 backdrop-blur-md border-t border-cyan-500/30">
          <div className="flex items-center gap-3 mb-2">
            <Scan className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-wide">
              {stage === 1 && 'Ingesting meeting evidence...'}
              {stage === 2 && 'Matching identities across screenshots...'}
              {stage === 3 && 'Consolidating overall interaction patterns...'}
              {stage === 4 && 'One Team Social X-Ray Revealed'}
            </h3>
          </div>

          <p className="text-xs font-mono-tech text-cyan-300/85 max-w-lg">
            {stage === 1 && 'Reading visual tiles across all uploaded screenshots as collective evidence.'}
            {stage === 2 && 'Tracking recurring faces and clothing to deduplicate participants into one unified team.'}
            {stage === 3 && 'Synthesizing reciprocal conversation paths and collective interaction velocity.'}
            {stage === 4 && 'Consolidated Social X-Ray active • Team topology loaded.'}
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  stage === s
                    ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
                    : stage > s
                    ? 'w-3 bg-cyan-700'
                    : 'w-3 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
