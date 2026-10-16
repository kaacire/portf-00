import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface TypewriterTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  charDelayMs?: number;
}

/** Prevents StrictMode remounts from restarting the entrance animation. */
const playedTitles = new Set<string>();

export function TypewriterTitle({
  text,
  as: Tag = 'h1',
  className = '',
  charDelayMs = 55,
}: TypewriterTitleProps) {
  const reducedMotion = useReducedMotion();
  const alreadyPlayed = playedTitles.has(text);
  const [visibleCount, setVisibleCount] = useState(
    reducedMotion || alreadyPlayed ? text.length : 0,
  );

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(text.length);
      playedTitles.add(text);
      return;
    }

    if (playedTitles.has(text)) {
      setVisibleCount(text.length);
      return;
    }

    playedTitles.add(text);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, charDelayMs);

    return () => window.clearInterval(timer);
  }, [text, charDelayMs, reducedMotion]);

  const done = visibleCount >= text.length;

  return (
    <Tag className={`typewriter ${className}`.trim()} aria-label={text}>
      <span className="typewriter__visible" aria-hidden="true">
        {text.slice(0, visibleCount)}
        <span className={`typewriter__caret${done ? ' typewriter__caret--done' : ''}`} />
      </span>
      <span className="visually-hidden">{text}</span>
    </Tag>
  );
}
