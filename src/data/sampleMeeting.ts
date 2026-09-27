import { MeetingXRayResult, UploadedImage } from '../types';

// Helper to generate realistic Google Meet SVG mock screenshots
function generateMeetSvg(activeSpeaker: string, subtitle: string, frameNumber: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1c20" />
        <stop offset="100%" stopColor="#111215" />
      </linearGradient>
      <linearGradient id="tile-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#282a2e" />
        <stop offset="100%" stopColor="#1e2023" />
      </linearGradient>
    </defs>

    <rect width="1200" height="675" fill="url(#bg-grad)"/>
    
    <!-- Top Bar -->
    <rect width="1200" height="48" fill="#17181b"/>
    <circle cx="28" cy="24" r="6" fill="#ea4335"/>
    <circle cx="48" cy="24" r="6" fill="#fbbc05"/>
    <circle cx="68" cy="24" r="6" fill="#34a853"/>
    <text x="96" y="30" fill="#e8eaed" font-family="system-ui, sans-serif" font-size="14" font-weight="500">
      Product Architecture &amp; Core Sprint Sync — Image ${frameNumber}
    </text>
    <rect x="1060" y="14" width="116" height="22" rx="11" fill="#2d2f33"/>
    <text x="1118" y="29" fill="#9aa0a6" font-family="monospace" font-size="11" text-anchor="middle">10:42 AM</text>

    <!-- Main Grid: 4 video tiles showing the SAME 4 people across images -->
    <!-- Tile 1: Alex Vance (Person 1) -->
    <g transform="translate(40, 68)">
      <rect width="540" height="255" rx="12" fill="url(#tile-grad)" stroke="${activeSpeaker === 'Alex' ? '#8ab4f8' : '#33363a'}" stroke-width="${activeSpeaker === 'Alex' ? '4' : '1'}"/>
      <rect x="12" y="12" width="516" height="231" rx="8" fill="#22252a" opacity="0.6"/>
      <circle cx="270" cy="115" r="48" fill="#1a73e8"/>
      <text x="270" y="126" fill="#ffffff" font-family="system-ui" font-size="28" font-weight="600" text-anchor="middle">A</text>
      <rect x="16" y="214" width="130" height="26" rx="13" fill="rgba(0,0,0,0.7)"/>
      <text x="32" y="231" fill="#ffffff" font-family="system-ui" font-size="12" font-weight="500">Alex Vance</text>
      ${activeSpeaker === 'Alex' ? '<rect x="470" y="16" width="54" height="22" rx="11" fill="#1a73e8"/><text x="497" y="31" fill="#ffffff" font-size="10" font-family="system-ui" text-anchor="middle">Speaking</text>' : ''}
    </g>

    <!-- Tile 2: Sam Lin (Person 2) -->
    <g transform="translate(620, 68)">
      <rect width="540" height="255" rx="12" fill="url(#tile-grad)" stroke="${activeSpeaker === 'Sam' ? '#8ab4f8' : '#33363a'}" stroke-width="${activeSpeaker === 'Sam' ? '4' : '1'}"/>
      <rect x="12" y="12" width="516" height="231" rx="8" fill="#22252a" opacity="0.6"/>
      <circle cx="270" cy="115" r="48" fill="#9333ea"/>
      <text x="270" y="126" fill="#ffffff" font-family="system-ui" font-size="28" font-weight="600" text-anchor="middle">S</text>
      <rect x="16" y="214" width="120" height="26" rx="13" fill="rgba(0,0,0,0.7)"/>
      <text x="32" y="231" fill="#ffffff" font-family="system-ui" font-size="12" font-weight="500">Sam Lin</text>
      ${activeSpeaker === 'Sam' ? '<rect x="470" y="16" width="54" height="22" rx="11" fill="#1a73e8"/><text x="497" y="31" fill="#ffffff" font-size="10" font-family="system-ui" text-anchor="middle">Speaking</text>' : ''}
    </g>

    <!-- Tile 3: Priya Sharma (Person 3) -->
    <g transform="translate(40, 345)">
      <rect width="540" height="255" rx="12" fill="url(#tile-grad)" stroke="${activeSpeaker === 'Priya' ? '#8ab4f8' : '#33363a'}" stroke-width="${activeSpeaker === 'Priya' ? '4' : '1'}"/>
      <rect x="12" y="12" width="516" height="231" rx="8" fill="#22252a" opacity="0.6"/>
      <circle cx="270" cy="115" r="48" fill="#0891b2"/>
      <text x="270" y="126" fill="#ffffff" font-family="system-ui" font-size="28" font-weight="600" text-anchor="middle">P</text>
      <rect x="16" y="214" width="140" height="26" rx="13" fill="rgba(0,0,0,0.7)"/>
      <text x="32" y="231" fill="#ffffff" font-family="system-ui" font-size="12" font-weight="500">Priya Sharma</text>
      ${activeSpeaker === 'Priya' ? '<rect x="470" y="16" width="54" height="22" rx="11" fill="#1a73e8"/><text x="497" y="31" fill="#ffffff" font-size="10" font-family="system-ui" text-anchor="middle">Speaking</text>' : ''}
    </g>

    <!-- Tile 4: Marcus Bell (Person 4) -->
    <g transform="translate(620, 345)">
      <rect width="540" height="255" rx="12" fill="url(#tile-grad)" stroke="${activeSpeaker === 'Marcus' ? '#8ab4f8' : '#33363a'}" stroke-width="${activeSpeaker === 'Marcus' ? '4' : '1'}"/>
      <rect x="12" y="12" width="516" height="231" rx="8" fill="#22252a" opacity="0.6"/>
      <circle cx="270" cy="115" r="48" fill="#d97706"/>
      <text x="270" y="126" fill="#ffffff" font-family="system-ui" font-size="28" font-weight="600" text-anchor="middle">M</text>
      <rect x="16" y="214" width="130" height="26" rx="13" fill="rgba(0,0,0,0.7)"/>
      <text x="32" y="231" fill="#ffffff" font-family="system-ui" font-size="12" font-weight="500">Marcus Bell</text>
      ${activeSpeaker === 'Marcus' ? '<rect x="470" y="16" width="54" height="22" rx="11" fill="#1a73e8"/><text x="497" y="31" fill="#ffffff" font-size="10" font-family="system-ui" text-anchor="middle">Speaking</text>' : ''}
    </g>

    <!-- Live Caption Bar -->
    <rect x="250" y="616" width="700" height="34" rx="8" fill="rgba(0,0,0,0.85)"/>
    <text x="600" y="638" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle">
      ${subtitle}
    </text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_MEETING_IMAGES: UploadedImage[] = [
  {
    id: 'sample-image-1',
    name: 'meeting-screenshot-1.png',
    dataUrl: generateMeetSvg('Alex', 'Alex: "Let\'s look at our architecture bottlenecks before Sam demos."', 1),
    size: 245000,
  },
  {
    id: 'sample-image-2',
    name: 'meeting-screenshot-2.png',
    dataUrl: generateMeetSvg('Sam', 'Sam: "Right, here is the latency breakdown. Priya, how does this affect API caching?"', 2),
    size: 251000,
  },
  {
    id: 'sample-image-3',
    name: 'meeting-screenshot-3.png',
    dataUrl: generateMeetSvg('Priya', 'Priya: "We can route it through Redis. Marcus, can your team handle the schema migration?"', 3),
    size: 238000,
  },
  {
    id: 'sample-image-4',
    name: 'meeting-screenshot-4.png',
    dataUrl: generateMeetSvg('Marcus', 'Marcus: "We could, but let\'s consider DB locks during peak hours first."', 4),
    size: 262000,
  },
];

export const DEFAULT_SAMPLE_RESULT: MeetingXRayResult = {
  title: 'SOCIAL X-RAY',
  subtitle: 'Combined analysis of 4 meeting participants across 4 uploaded images',
  teamSummary: 'Across all uploaded meeting evidence, 4 unique participants were identified and matched. The team demonstrates high collaborative cohesion with Priya acting as the central connector bridging the conversation drivers with technical infrastructure execution.',
  stats: {
    participantsCount: 4,
    strongInteractionPairs: 2,
    observedInteractionPatterns: 5,
    imagesAnalyzed: 4,
  },
  participants: [
    {
      id: 'person_01',
      name: 'Alex Vance',
      observedRole: 'Conversation Driver',
      representativeExpression: 'smiling',
      visibleSignals: [
        '🙂 Visible smile observed',
        '👀 Facing screen directly',
        '🎙️ Active speaking halo observed across images'
      ],
      avatarStyle: {
        gender: 'male',
        hair: 'short-dark',
        skinTone: '#f8d0b0',
        hairColor: '#1e293b',
        glasses: false,
        accentColor: '#38bdf8',
      },
      meetingPattern: 'Frequently appears in discussion with Sam and Priya. Regularly initiates agenda items and hands off speaking turns.',
      interactionScores: [
        { targetId: 'person_02', targetName: 'Sam Lin', score: 9 },
        { targetId: 'person_03', targetName: 'Priya Sharma', score: 6 },
        { targetId: 'person_04', targetName: 'Marcus Bell', score: 3 },
      ],
      evidenceSummary: 'Visual identity verified across 4 uploaded screenshots. Unmuted speaking state and forward posture.',
      appearancesInImages: 4,
    },
    {
      id: 'person_02',
      name: 'Sam Lin',
      observedRole: 'Problem Solver',
      representativeExpression: 'smiling',
      visibleSignals: [
        '🙂 Visible smile observed',
        '👓 Wearing glasses',
        '👀 Looking toward shared screen'
      ],
      avatarStyle: {
        gender: 'neutral',
        hair: 'fade-beard',
        skinTone: '#f5cda7',
        hairColor: '#0f172a',
        glasses: true,
        accentColor: '#c084fc',
      },
      meetingPattern: 'Offers technical breakdown solutions and responds directly to prompt inquiries from Alex and Priya.',
      interactionScores: [
        { targetId: 'person_01', targetName: 'Alex Vance', score: 9 },
        { targetId: 'person_03', targetName: 'Priya Sharma', score: 7 },
        { targetId: 'person_04', targetName: 'Marcus Bell', score: 4 },
      ],
      evidenceSummary: 'Consistent visual match across 4 screenshots: glasses, neutral top, screen-share presentation cues.',
      appearancesInImages: 4,
    },
    {
      id: 'person_03',
      name: 'Priya Sharma',
      observedRole: 'Connector',
      representativeExpression: 'smiling',
      visibleSignals: [
        '🙂 Visible smile observed',
        '🖐️ Visible hand gesture',
        '👀 Engaging multiple participants'
      ],
      avatarStyle: {
        gender: 'female',
        hair: 'long-dark',
        skinTone: '#d4a373',
        hairColor: '#171717',
        glasses: false,
        accentColor: '#22d3ee',
      },
      meetingPattern: 'Appears in observed interactions with most participants. Connects the high-level architecture drivers to Marcus.',
      interactionScores: [
        { targetId: 'person_02', targetName: 'Sam Lin', score: 8 },
        { targetId: 'person_01', targetName: 'Alex Vance', score: 7 },
        { targetId: 'person_04', targetName: 'Marcus Bell', score: 7 },
      ],
      evidenceSummary: 'Appears in all 4 screenshots with central handoff interactions; links across participants.',
      appearancesInImages: 4,
    },
    {
      id: 'person_04',
      name: 'Marcus Bell',
      observedRole: 'Idea Contributor',
      representativeExpression: 'focused',
      visibleSignals: [
        '🤔 Focused expression',
        '👀 Monitoring technical constraints',
        '🎙️ Active speaker halo in technical review'
      ],
      avatarStyle: {
        gender: 'male',
        hair: 'short-dark',
        skinTone: '#e0a96d',
        hairColor: '#292524',
        glasses: false,
        accentColor: '#f59e0b',
      },
      meetingPattern: 'Provides pragmatic constraint evaluations regarding database locks and infrastructure timeline.',
      interactionScores: [
        { targetId: 'person_03', targetName: 'Priya Sharma', score: 7 },
        { targetId: 'person_01', targetName: 'Alex Vance', score: 4 },
        { targetId: 'person_02', targetName: 'Sam Lin', score: 4 },
      ],
      evidenceSummary: 'Visual identity confirmed in 4 screenshots: focused gaze, active speaking cue during database lock review.',
      appearancesInImages: 4,
    }
  ],
  interactions: [
    {
      id: 'e1',
      from: 'person_01',
      to: 'person_02',
      type: 'frequent_interaction',
      strength: 0.95,
      evidence: 'High volume of shared conversational exchanges detected across multiple meeting screenshots.'
    },
    {
      id: 'e2',
      from: 'person_02',
      to: 'person_03',
      type: 'collaboration',
      strength: 0.84,
      evidence: 'Direct architectural inquiry answered with concrete implementation plan.'
    },
    {
      id: 'e3',
      from: 'person_03',
      to: 'person_01',
      type: 'observed_alignment',
      strength: 0.76,
      evidence: 'Visual affirmation and synchronized timeline agreement observed in meeting evidence.'
    },
    {
      id: 'e4',
      from: 'person_03',
      to: 'person_04',
      type: 'collaboration',
      strength: 0.78,
      evidence: 'Priya directly prompts Marcus on database schema timeline across images.'
    },
    {
      id: 'e5',
      from: 'person_04',
      to: 'person_01',
      type: 'challenge_respond',
      strength: 0.62,
      evidence: 'Marcus raises alternative perspective on database locks, triggering plan refinement.'
    }
  ],
  signals: [
    {
      id: 's1',
      type: 'connector',
      title: 'TEAM CONNECTOR',
      highlightParticipants: ['person_03'],
      description: 'Priya Sharma appears in observed interactions with most participants, bridging between discussion drivers and technical infrastructure.',
      evidenceNote: 'Central nexus linking Sam, Alex, and Marcus across all meeting images'
    },
    {
      id: 's2',
      type: 'strongest_interaction',
      title: 'STRONGEST OBSERVED INTERACTION',
      highlightParticipants: ['person_01', 'person_02'],
      description: 'Alex Vance ↔️ Sam Lin: Frequently observed across the uploaded meeting evidence with highest reciprocal interaction.',
      evidenceNote: 'Reciprocal prompt-and-response loop observed across multiple images'
    },
    {
      id: 's3',
      type: 'discussion_pattern',
      title: 'DISCUSSION PATTERN',
      highlightParticipants: ['person_01', 'person_03', 'person_04'],
      description: 'Alex Vance → Priya Sharma → Marcus Bell: Recurring observed interaction sequence across meeting evidence.',
      evidenceNote: 'Consistently observed conversational handoff sequence'
    },
    {
      id: 's4',
      type: 'team_structure',
      title: 'TEAM STRUCTURE',
      highlightParticipants: ['person_01', 'person_02', 'person_03', 'person_04'],
      description: 'Most participants appear connected through a central interaction group rather than isolated silos.',
      evidenceNote: 'Zero isolated participants; 100% team connectivity index'
    }
  ],
  challenge: {
    question: 'Who appears to connect the most participants?',
    candidateIds: ['person_01', 'person_03', 'person_02'],
    correctParticipantId: 'person_03',
    revealedTitle: 'X-RAY REVEALED',
    explanation: 'Priya Sharma connects both the high-level architecture drivers (Alex & Sam) and infrastructure (Marcus), participating in 3 cross-cutting interaction paths.'
  },
  disclaimer: 'Social X-Ray shows AI-inferred interaction patterns from the provided meeting evidence. It does not determine people’s actual feelings or relationships.'
};
