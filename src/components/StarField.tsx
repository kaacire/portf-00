import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface StarFieldProps {
  density?: 'low' | 'medium';
  className?: string;
}

interface StarSpec {
  id: string;
  left: string;
  top: string;
  size: number;
  color: string;
  delay: string;
  duration: string;
  driftX: string;
  driftY: string;
}

const COLORS = [
  'rgba(65, 105, 255, 0.55)',
  'rgba(138, 69, 255, 0.5)',
  'rgba(245, 245, 247, 0.45)',
  'rgba(65, 105, 255, 0.35)',
  'rgba(138, 69, 255, 0.35)',
];

function createStars(count: number, seed: string): StarSpec[] {
  const stars: StarSpec[] = [];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  const next = () => {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    return hash / 0xffffffff;
  };

  for (let i = 0; i < count; i += 1) {
    stars.push({
      id: `${seed}-${i}`,
      left: `${next() * 100}%`,
      top: `${next() * 100}%`,
      size: 6 + next() * 10,
      color: COLORS[Math.floor(next() * COLORS.length)],
      delay: `${next() * 6}s`,
      duration: `${8 + next() * 10}s`,
      driftX: `${(next() - 0.5) * 24}px`,
      driftY: `${(next() - 0.5) * 28}px`,
    });
  }

  return stars;
}

export function StarField({ density = 'medium', className = '' }: StarFieldProps) {
  const reducedMotion = useReducedMotion();
  const count = density === 'low' ? 8 : 14;

  const stars = useMemo(() => createStars(count, `${density}-${count}`), [count, density]);

  return (
    <div
      className={`star-field ${reducedMotion ? 'star-field--static' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-field__star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            color: star.color,
            animationDelay: star.delay,
            animationDuration: star.duration,
            ['--star-drift-x' as string]: star.driftX,
            ['--star-drift-y' as string]: star.driftY,
          }}
        >
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
