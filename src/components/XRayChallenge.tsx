import React, { useState } from 'react';
import { XRayChallengeData, Participant } from '../types';
import { AiAvatar } from './AiAvatar';
import { Award, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface XRayChallengeProps {
  challenge: XRayChallengeData;
  participants: Participant[];
  onHighlightParticipant: (id: string | null) => void;
}

export const XRayChallenge: React.FC<XRayChallengeProps> = ({
  challenge,
  participants,
  onHighlightParticipant,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Retrieve candidate participants
  const candidateParticipants = challenge.candidateIds
    .map((id) => participants.find((p) => p.id === id))
    .filter(Boolean) as Participant[];

  const correctPerson = participants.find((p) => p.id === challenge.correctParticipantId);

  const handleSelect = (participantId: string) => {
    setSelectedId(participantId);
    setIsRevealed(true);
    // Highlight the correct connector in the X-Ray room
    onHighlightParticipant(challenge.correctParticipantId);
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsRevealed(false);
    onHighlightParticipant(null);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/30 border border-purple-500/40 p-6 shadow-[0_0_35px_rgba(168,85,247,0.15)] relative overflow-hidden backdrop-blur-md">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <span className="text-xl">🔍</span>
          </div>
          <div>
            <div className="text-[11px] font-mono-tech uppercase text-purple-300 font-bold tracking-wider flex items-center gap-1.5">
              <span>X-RAY CHALLENGE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <p className="text-base font-display font-bold text-white mt-0.5">
              {challenge.question}
            </p>
          </div>
        </div>

        {isRevealed && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-400 hover:text-purple-300 transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Challenge</span>
          </button>
        )}
      </div>

      {/* Interactive Candidate AI Avatars Selection */}
      {!isRevealed ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-mono-tech">
            Select one of the 3 participant avatars below to reveal the meeting connector:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {candidateParticipants.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => handleSelect(candidate.id)}
                className="group p-4 rounded-2xl bg-slate-900/70 hover:bg-purple-950/50 border border-slate-800 hover:border-purple-400/50 flex flex-col items-center text-center transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="mb-2">
                  <AiAvatar
                    styleConfig={candidate.avatarStyle}
                    expression={candidate.representativeExpression}
                    size="md"
                    showAura={true}
                  />
                </div>
                <div className="font-display font-bold text-sm text-white group-hover:text-purple-200">
                  {candidate.name}
                </div>
                <div className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-tight mt-0.5">
                  {candidate.observedRole}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Revealed Discovery State */
        <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-400/50 space-y-4 animate-in fade-in zoom-in-95 duration-400">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/50 text-purple-200 text-xs font-mono-tech font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Award className="w-4 h-4 text-purple-300" />
              <span>{challenge.revealedTitle || 'X-RAY REVEALED'}</span>
            </div>

            <div className="text-xs font-mono-tech text-cyan-300 animate-pulse">
              Highlighted in Team Constellation ↑
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {correctPerson && (
              <div className="shrink-0">
                <AiAvatar
                  styleConfig={correctPerson.avatarStyle}
                  expression="smiling"
                  size="lg"
                  isSelected={true}
                  showAura={true}
                />
              </div>
            )}

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="text-lg font-display font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{correctPerson?.name}</span>
                <span className="text-xs font-mono-tech text-purple-300 px-2 py-0.5 rounded bg-purple-900/60 border border-purple-400/40">
                  {correctPerson?.observedRole}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {challenge.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
