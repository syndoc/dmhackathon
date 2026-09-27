export type VisibleExpression = 'smiling' | 'neutral' | 'focused' | 'surprised';

export interface ParticipantAvatarStyle {
  gender: 'male' | 'female' | 'neutral';
  hair: 'short-dark' | 'curly-dark' | 'long-dark' | 'short-blonde' | 'bob-brown' | 'fade-beard' | 'buzz';
  skinTone: string;
  hairColor: string;
  glasses?: boolean;
  accentColor: string;
}

export interface InteractionScore {
  targetId: string;
  targetName: string;
  score: number; // 1 to 10 for visual block representation (e.g. 8 -> ████████░░)
}

export interface Participant {
  id: string; // e.g. "person_01"
  name: string; // Actual name if visible in screenshot, otherwise "Person 1", "Person 2", etc.
  observedRole: 'Conversation Driver' | 'Connector' | 'Idea Contributor' | 'Problem Solver' | 'Active Participant';
  representativeExpression: VisibleExpression;
  visibleSignals: string[]; // e.g. ["🙂 Visible smile observed", "👀 Facing screen", "🎙️ Active speaking indicator"]
  avatarStyle: ParticipantAvatarStyle;
  meetingPattern: string; // e.g. "Frequently appears in discussion with Person 2 and Person 3."
  interactionScores: InteractionScore[];
  evidenceSummary: string; // e.g. "Deduplicated across 3 uploaded images with matching visual identity."
  appearancesInImages: number;
}

export type EnergyPathType = 
  | 'collaboration' // Cyan
  | 'frequent_interaction' // Purple
  | 'observed_alignment' // Green
  | 'challenge_respond'; // Amber

export interface EnergyPath {
  id: string;
  from: string; // participant id
  to: string; // participant id
  type: EnergyPathType;
  strength: number; // 0.2 to 1.0 (thickness and particle speed)
  evidence: string;
}

export interface TeamStats {
  participantsCount: number;
  strongInteractionPairs: number;
  observedInteractionPatterns: number;
  imagesAnalyzed: number;
}

export interface SocialSignal {
  id: string;
  type: 'connector' | 'strongest_interaction' | 'discussion_pattern' | 'team_structure';
  title: string; // e.g. "TEAM CONNECTOR", "STRONGEST OBSERVED INTERACTION"
  highlightParticipants: string[];
  description: string;
  evidenceNote: string;
}

export interface XRayChallengeData {
  question: string; // "Who appears to connect the most participants?"
  candidateIds: string[]; // 3 participant IDs
  correctParticipantId: string;
  revealedTitle: string;
  explanation: string;
}

export interface MeetingXRayResult {
  title: string;
  subtitle: string; // e.g. "Combined analysis of 4 meeting participants across 3 uploaded images"
  teamSummary: string;
  stats: TeamStats;
  participants: Participant[]; // Strictly deduplicated unique team members
  interactions: EnergyPath[]; // Consolidated relationship paths
  signals: SocialSignal[]; // Overall team-level insights
  challenge: XRayChallengeData;
  disclaimer: string;
}

export interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  size: number;
  previewUrl?: string;
}
