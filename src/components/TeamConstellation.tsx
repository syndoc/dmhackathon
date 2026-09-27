import React, { useState, useMemo } from 'react';
import { Participant, EnergyPath, EnergyPathType } from '../types';
import { AiAvatar } from './AiAvatar';
import { Sparkles, Info, Eye, Layers } from 'lucide-react';

interface TeamConstellationProps {
  participants: Participant[];
  interactions: EnergyPath[];
  selectedParticipantId: string | null;
  onSelectParticipant: (id: string) => void;
  highlightedParticipantIds: string[];
  onOpenEvidence: () => void;
  evidenceCount: number;
}

const PATH_CONFIGS: Record<EnergyPathType, { color: string; label: string; dash: string }> = {
  collaboration: {
    color: '#06b6d4', // Cyan
    label: 'Collaboration',
    dash: 'none',
  },
  frequent_interaction: {
    color: '#a855f7', // Purple
    label: 'Frequent interaction',
    dash: 'none',
  },
  observed_alignment: {
    color: '#10b981', // Green
    label: 'Observed alignment',
    dash: '6 4',
  },
  challenge_respond: {
    color: '#f59e0b', // Amber
    label: 'Challenge / respond',
    dash: '4 4',
  },
};

export const TeamConstellation: React.FC<TeamConstellationProps> = ({
  participants,
  interactions,
  selectedParticipantId,
  onSelectParticipant,
  highlightedParticipantIds,
  onOpenEvidence,
  evidenceCount,
}) => {
  const [hoveredParticipantId, setHoveredParticipantId] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<EnergyPath | null>(null);
  const [activeFilter, setActiveFilter] = useState<EnergyPathType | 'ALL'>('ALL');

  const activeParticipantId = hoveredParticipantId || selectedParticipantId;

  // Intentional aesthetic layout positions for the team constellation
  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    const count = participants.length;

    if (count === 4) {
      // Intentional Diamond / Constellation Layout
      // Person 1 (Top Center), Person 2 (Left Mid), Person 3 (Right Mid), Person 4 (Bottom Center)
      const diamond = [
        { x: 50, y: 19 },
        { x: 22, y: 54 },
        { x: 78, y: 54 },
        { x: 50, y: 81 },
      ];
      participants.forEach((p, idx) => {
        map[p.id] = diamond[idx % 4];
      });
    } else if (count === 3) {
      // Inverted Triangle
      const tri = [
        { x: 50, y: 22 },
        { x: 26, y: 72 },
        { x: 74, y: 72 },
      ];
      participants.forEach((p, idx) => {
        map[p.id] = tri[idx % 3];
      });
    } else {
      // Harmonious regular polygon for 5+ people
      participants.forEach((p, idx) => {
        const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
        const rx = 36; // Horizontal radius percentage
        const ry = 32; // Vertical radius percentage
        map[p.id] = {
          x: 50 + rx * Math.cos(angle),
          y: 50 + ry * Math.sin(angle),
        };
      });
    }

    return map;
  }, [participants]);

  // Find participants connected to active participant
  const connectedIds = useMemo(() => {
    if (!activeParticipantId) return new Set<string>();
    const set = new Set<string>([activeParticipantId]);
    interactions.forEach((path) => {
      if (path.from === activeParticipantId) set.add(path.to);
      if (path.to === activeParticipantId) set.add(path.from);
    });
    return set;
  }, [activeParticipantId, interactions]);

  const visibleInteractions = useMemo(() => {
    if (activeFilter === 'ALL') return interactions;
    return interactions.filter((i) => i.type === activeFilter);
  }, [interactions, activeFilter]);

  return (
    <div className="relative w-full rounded-3xl bg-[#070913] border border-cyan-500/30 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.14)] flex flex-col">
      
      {/* Top Telemetry & Controls Strip */}
      <div className="relative z-20 px-5 py-3.5 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
        
        {/* Title Tag */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech uppercase font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            TEAM INTERACTION CONSTELLATION
          </div>
          <span className="text-xs text-slate-400 font-mono-tech hidden sm:inline">
            ({participants.length} Unique Members • {interactions.length} Inferred Ties)
          </span>
        </div>

        {/* Energy Path Type Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono-tech">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
              activeFilter === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            All Flows
          </button>
          {(Object.keys(PATH_CONFIGS) as EnergyPathType[]).map((type) => {
            const cfg = PATH_CONFIGS[type];
            const isSelected = activeFilter === type;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
                />
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subtle Button to Inspect Supporting Meeting Images */}
        <button
          onClick={onOpenEvidence}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono-tech text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
          title="Inspect the source meeting images used for analysis"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>View Source Evidence ({evidenceCount})</span>
        </button>

      </div>

      {/* Main Constellation Canvas */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden select-none flex items-center justify-center p-4">
        
        {/* Ambient Fluoroscopic Grid & Concentric Orbitals */}
        <div className="absolute inset-0 xray-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[520px] h-[520px] rounded-full border border-cyan-500/10 animate-pulse-ring" />
          <div className="w-[360px] h-[360px] rounded-full border border-cyan-500/15" />
          <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/20" />
          {/* Subtle central energy core */}
          <div className="w-4 h-4 rounded-full bg-cyan-400/40 blur-[4px] animate-ping" />
        </div>

        {/* SVG Flowing Energy Paths */}
        <svg
          viewBox="0 0 1000 650"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
        >
          <defs>
            <filter id="trail-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#06b6d4" floodOpacity="0.8" />
            </filter>
          </defs>

          {visibleInteractions.map((path, idx) => {
            const pFrom = positions[path.from];
            const pTo = positions[path.to];
            if (!pFrom || !pTo) return null;

            // Map percentage to 1000 x 650 coordinates
            const x1 = (pFrom.x / 100) * 1000;
            const y1 = (pFrom.y / 100) * 650;
            const x2 = (pTo.x / 100) * 1000;
            const y2 = (pTo.y / 100) * 650;

            // Quadratic curve control point curving gracefully around central area
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const deflection = idx % 2 === 0 ? 38 : -38;
            const nx = -dy / dist;
            const ny = dx / dist;
            const cx = midX + nx * deflection;
            const cy = midY + ny * deflection;

            const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
            const config = PATH_CONFIGS[path.type] || PATH_CONFIGS.collaboration;

            const isRelated = activeParticipantId && (path.from === activeParticipantId || path.to === activeParticipantId);
            const isDimmed = activeParticipantId && !isRelated;

            // Stroke thickness directly reflecting consolidated interaction strength
            const strokeWidth = isRelated ? path.strength * 5 + 3 : path.strength * 3.5 + 1.5;
            const opacity = isDimmed ? 0.12 : isRelated ? 1 : 0.85;

            return (
              <g
                key={path.id}
                opacity={opacity}
                className="pointer-events-auto cursor-pointer transition-opacity duration-300"
                onMouseEnter={() => setHoveredPath(path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Invisible hover corridor */}
                <path d={pathD} fill="none" stroke="transparent" strokeWidth="26" />

                {/* Soft Glowing Light Trail Underlay */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={config.color}
                  strokeWidth={strokeWidth + 6}
                  strokeOpacity={isRelated ? 0.45 : 0.22}
                  strokeLinecap="round"
                  filter="url(#trail-glow)"
                />

                {/* Main Path Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={config.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={config.dash}
                  strokeLinecap="round"
                />

                {/* Moving Light Packet Particle 1 */}
                <circle r={isRelated ? 4.5 : 3.2} fill="#ffffff" filter="drop-shadow(0 0 5px #ffffff)">
                  <animateMotion
                    path={pathD}
                    dur={`${2.2 / (path.strength || 0.8)}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Secondary Particle for Continuous Energy Flow */}
                <circle r={isRelated ? 3.5 : 2.5} fill={config.color} filter={`drop-shadow(0 0 6px ${config.color})`}>
                  <animateMotion
                    path={pathD}
                    dur={`${2.2 / (path.strength || 0.8)}s`}
                    begin="1.1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* AI Participant Avatars positioned in aesthetic constellation */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {participants.map((p) => {
            const pos = positions[p.id];
            if (!pos) return null;

            const isSelected = selectedParticipantId === p.id;
            const isHovered = hoveredParticipantId === p.id;
            const isHighlighted = highlightedParticipantIds.includes(p.id);
            const isConnected = connectedIds.has(p.id);
            const isDimmed = activeParticipantId && !isConnected && !isHighlighted;

            return (
              <div
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-300"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  opacity: isDimmed ? 0.25 : 1,
                  transform: `translate(-50%, -50%) scale(${isSelected || isHovered ? 1.08 : 1})`,
                }}
                onMouseEnter={() => setHoveredParticipantId(p.id)}
                onMouseLeave={() => setHoveredParticipantId(null)}
                onClick={() => onSelectParticipant(p.id)}
              >
                {/* Tech Avatar Card */}
                <div
                  className={`group relative flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.5)]'
                      : isHighlighted
                      ? 'bg-purple-950/90 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                      : 'bg-slate-950/80 hover:bg-slate-900/90 border-slate-800/80 hover:border-cyan-500/50 shadow-xl'
                  }`}
                >
                  {/* AI Avatar Graphic */}
                  <div className="relative mb-2">
                    <AiAvatar
                      styleConfig={p.avatarStyle}
                      expression={p.representativeExpression}
                      size="md"
                      isSelected={isSelected}
                      isHighlighted={isHighlighted || isHovered}
                    />

                    {/* Small expression icon tag */}
                    <div
                      className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] shadow"
                      title={`Representative visible expression: ${p.representativeExpression}`}
                    >
                      <span>
                        {p.representativeExpression === 'smiling'
                          ? '🙂'
                          : p.representativeExpression === 'surprised'
                          ? '😮'
                          : p.representativeExpression === 'focused'
                          ? '🤔'
                          : '😐'}
                      </span>
                    </div>
                  </div>

                  {/* Clean Technical Typography Label */}
                  <div className="text-center w-full min-w-[110px] max-w-[140px]">
                    <div className="font-display font-extrabold text-xs text-white tracking-wide truncate">
                      {p.name}
                    </div>
                    <div className="text-[10px] font-mono-tech text-cyan-300 uppercase tracking-tight truncate mt-0.5">
                      {p.observedRole}
                    </div>
                  </div>

                  {/* Selection Indicator Ring */}
                  {(isSelected || isHighlighted) && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hovered Path Evidence Tooltip */}
        {hoveredPath && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl bg-slate-950/95 border border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md max-w-md text-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-2 text-xs font-mono-tech font-bold text-cyan-300 mb-0.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PATH_CONFIGS[hoveredPath.type]?.color }}
              />
              <span className="uppercase">{PATH_CONFIGS[hoveredPath.type]?.label}</span>
              <span className="text-slate-400 font-normal">
                (Strength: {Math.round(hoveredPath.strength * 100)}%)
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {hoveredPath.evidence}
            </p>
          </div>
        )}

      </div>

      {/* Constellation Footer Instructions */}
      <div className="relative z-20 px-5 py-3 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-slate-400">
        <div className="flex items-center gap-2 text-cyan-300/90">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any team avatar to view their consolidated dossier &amp; observed interactions</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Deduplicated &amp; synthesized across {evidenceCount} meeting screenshots
        </div>
      </div>

    </div>
  );
};
