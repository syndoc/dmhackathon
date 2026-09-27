import React from 'react';
import { VisibleExpression, ParticipantAvatarStyle } from '../types';

interface AiAvatarProps {
  styleConfig: ParticipantAvatarStyle;
  expression: VisibleExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isHighlighted?: boolean;
  isSelected?: boolean;
  className?: string;
  showAura?: boolean;
}

export const AiAvatar: React.FC<AiAvatarProps> = ({
  styleConfig,
  expression,
  size = 'md',
  isHighlighted = false,
  isSelected = false,
  className = '',
  showAura = true,
}) => {
  const pixelSizes = {
    sm: 44,
    md: 72,
    lg: 110,
    xl: 140,
  };

  const dim = pixelSizes[size] || 72;

  // Expression variations
  const mouthPaths: Record<VisibleExpression, string> = {
    // Subtle, clean stylized smile
    smiling: 'M 40 68 Q 50 78 60 68',
    // Neutral straight calm line
    neutral: 'M 42 70 L 58 70',
    // Focused slightly concentrated curve
    focused: 'M 43 72 Q 50 70 57 72',
    // Subtle surprised open circle / oval
    surprised: 'M 50 67 C 46 67 46 75 50 75 C 54 75 54 67 50 67 Z',
  };

  const eyebrowPaths: Record<VisibleExpression, { left: string; right: string }> = {
    smiling: {
      left: 'M 35 44 Q 41 40 47 43',
      right: 'M 53 43 Q 59 40 65 44',
    },
    neutral: {
      left: 'M 35 44 L 47 44',
      right: 'M 53 44 L 65 44',
    },
    focused: {
      left: 'M 36 46 L 47 43',
      right: 'M 53 43 L 64 46',
    },
    surprised: {
      left: 'M 34 39 Q 41 35 47 38',
      right: 'M 53 38 Q 59 35 66 39',
    },
  };

  // Eyes
  const eyeOpenness = expression === 'surprised' ? 4.5 : expression === 'smiling' ? 2.5 : 3.2;

  // Hair style SVG rendering
  const renderHair = () => {
    const color = styleConfig.hairColor || '#1e293b';
    switch (styleConfig.hair) {
      case 'curly-dark':
        return (
          <g fill={color}>
            <circle cx="50" cy="30" r="24" />
            <circle cx="33" cy="36" r="14" />
            <circle cx="67" cy="36" r="14" />
            <circle cx="28" cy="46" r="10" />
            <circle cx="72" cy="46" r="10" />
            <circle cx="42" cy="22" r="12" />
            <circle cx="58" cy="22" r="12" />
          </g>
        );
      case 'long-dark':
      case 'bob-brown':
        return (
          <path
            d="M 28 55 C 26 30 35 18 50 18 C 65 18 74 30 72 55 C 75 75 70 82 66 85 C 65 65 64 45 64 40 C 60 32 40 32 36 40 C 36 45 35 65 34 85 C 30 82 25 75 28 55 Z"
            fill={color}
          />
        );
      case 'fade-beard':
        return (
          <g>
            <path
              d="M 30 42 C 30 24 40 20 50 20 C 60 20 70 24 70 42 C 64 36 36 36 30 42 Z"
              fill={color}
            />
            {/* Trim beard along jaw */}
            <path
              d="M 33 60 C 33 78 40 85 50 86 C 60 85 67 78 67 60 C 63 68 59 74 50 74 C 41 74 37 68 33 60 Z"
              fill={color}
              opacity="0.85"
            />
          </g>
        );
      case 'buzz':
      case 'short-blonde':
      case 'short-dark':
      default:
        return (
          <path
            d="M 29 44 C 28 26 38 20 50 20 C 62 20 72 26 71 44 C 65 35 55 33 50 33 C 45 33 35 35 29 44 Z"
            fill={color}
          />
        );
    }
  };

  const accentColor = styleConfig.accentColor || '#06b6d4';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-all duration-300 ${className}`}
      style={{ width: dim, height: dim }}
    >
      {/* Outer X-Ray Digital Halo / Aura */}
      {showAura && (
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${
            isSelected
              ? 'animate-pulse scale-125 opacity-90'
              : isHighlighted
              ? 'scale-115 opacity-70'
              : 'opacity-40 group-hover:opacity-75'
          }`}
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, ${accentColor}00 70%)`,
            filter: `blur(${dim * 0.12}px)`,
          }}
        />
      )}

      {/* Cybernetic Reticle Ring */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full relative z-10 transition-transform duration-300 ${
          isSelected ? 'scale-105' : 'group-hover:scale-105'
        }`}
      >
        <defs>
          <linearGradient id={`grad-${styleConfig.accentColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`skin-${styleConfig.skinTone}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={styleConfig.skinTone || '#f8d0b0'} />
            <stop offset="100%" stopColor={styleConfig.skinTone ? `${styleConfig.skinTone}dd` : '#e6b592'} />
          </linearGradient>

          <filter id="avatar-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={accentColor} floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Outer Circular Boundary */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#grad)"
          stroke={isSelected ? '#22d3ee' : isHighlighted ? accentColor : '#1e293b'}
          strokeWidth={isSelected ? '2.5' : '1.5'}
          strokeDasharray={isSelected ? 'none' : '6 3'}
        />

        {/* Subtle interior radar grid ring */}
        <circle cx="50" cy="50" r="44" fill="#090d16" stroke="#0e1726" strokeWidth="1" />

        {/* Hair Backdrop for Long Hair */}
        {(styleConfig.hair === 'long-dark' || styleConfig.hair === 'bob-brown') && renderHair()}

        {/* Shoulders / Torso Silhouette in modern dark tech jacket */}
        <path
          d="M 22 94 C 24 80 34 76 50 76 C 66 76 76 80 78 94 Z"
          fill="#131c2e"
          stroke={accentColor}
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />
        {/* Collar accent */}
        <path d="M 44 76 L 50 83 L 56 76" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.8" />

        {/* Neck */}
        <rect x="44" y="65" width="12" height="14" rx="2" fill="url(#skin-tone)" />

        {/* Head / Face */}
        <path
          d="M 33 46 C 33 32 40 26 50 26 C 60 26 67 32 67 46 C 67 62 60 72 50 72 C 40 72 33 62 33 46 Z"
          fill={styleConfig.skinTone || '#f8d0b0'}
        />

        {/* Hair Foreground */}
        {renderHair()}

        {/* Eyebrows matching expression */}
        <path
          d={eyebrowPaths[expression].left}
          stroke={styleConfig.hairColor || '#334155'}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={eyebrowPaths[expression].right}
          stroke={styleConfig.hairColor || '#334155'}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stylized Eyes */}
        <ellipse cx="42" cy="49" rx="3.2" ry={eyeOpenness} fill="#090d16" />
        <ellipse cx="58" cy="49" rx="3.2" ry={eyeOpenness} fill="#090d16" />
        {/* Eye specular glint */}
        <circle cx="43.2" cy="47.5" r="1" fill="#ffffff" />
        <circle cx="59.2" cy="47.5" r="1" fill="#ffffff" />

        {/* Optional Glasses */}
        {styleConfig.glasses && (
          <g stroke={accentColor} strokeWidth="1.2" fill="none">
            <rect x="35" y="44" width="14" height="10" rx="3" fill="rgba(6, 182, 212, 0.1)" />
            <rect x="51" y="44" width="14" height="10" rx="3" fill="rgba(6, 182, 212, 0.1)" />
            <line x1="49" y1="48" x2="51" y2="48" />
            <line x1="33" y1="47" x2="35" y2="47" />
            <line x1="65" y1="47" x2="67" y2="47" />
          </g>
        )}

        {/* Subtle Nose */}
        <path d="M 50 54 L 48.5 59 L 51.5 59" stroke="#c0937a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Mouth matching visible expression */}
        <path
          d={mouthPaths[expression]}
          stroke={expression === 'smiling' ? '#a24855' : '#885555'}
          strokeWidth="2"
          strokeLinecap="round"
          fill={expression === 'surprised' ? '#68222d' : 'none'}
        />

        {/* Highlighting Beacon Corner Marks if selected */}
        {isSelected && (
          <g stroke="#22d3ee" strokeWidth="1.5">
            <path d="M 12 24 L 12 12 L 24 12" fill="none" />
            <path d="M 88 24 L 88 12 L 76 12" fill="none" />
            <path d="M 12 76 L 12 88 L 24 88" fill="none" />
            <path d="M 88 76 L 88 88 L 76 88" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
