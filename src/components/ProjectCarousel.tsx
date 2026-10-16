import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from 'react';

export interface CarouselItemBase {
  id: string;
}

interface ProjectCarouselProps<T extends CarouselItemBase> {
  items: T[];
  label: string;
  renderItem: (item: T, state: { active: boolean; offset: number }) => ReactNode;
  className?: string;
  variant?: 'services' | 'demos';
}

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function ProjectCarousel<T extends CarouselItemBase>({
  items,
  label,
  renderItem,
  className = '',
  variant = 'services',
}: ProjectCarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const regionId = useId();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lockVertical = useRef(false);

  const length = items.length;
  const goTo = useCallback(
    (index: number) => {
      if (length === 0) return;
      setActiveIndex(wrapIndex(index, length));
    },
    [length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    lockVertical.current = false;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = event.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStartX.current);
    const dy = Math.abs(touch.clientY - touchStartY.current);
    if (dy > dx && dy > 10) {
      lockVertical.current = true;
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null || lockVertical.current) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }
    const touch = event.changedTouches[0];
    const delta = touch.clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    if (activeIndex >= length && length > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, length]);

  if (length === 0) {
    return <p className="carousel-empty">Nenhum item disponível.</p>;
  }

  return (
    <div
      className={`carousel carousel--${variant} ${className}`.trim()}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      id={regionId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel__viewport">
        <ul className="carousel__track" aria-live="polite">
          {items.map((item, index) => {
            const rawOffset = index - activeIndex;
            let offset = rawOffset;
            if (rawOffset > length / 2) offset -= length;
            if (rawOffset < -length / 2) offset += length;

            const active = index === activeIndex;
            const visible = Math.abs(offset) <= 1;

            return (
              <li
                key={item.id}
                className={[
                  'carousel__slide',
                  active ? 'is-active' : '',
                  offset === -1 ? 'is-prev' : '',
                  offset === 1 ? 'is-next' : '',
                  visible ? 'is-visible' : 'is-hidden',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden={!active}
                data-offset={offset}
              >
                <div className="carousel__slide-inner" inert={!active || undefined}>
                  {renderItem(item, { active, offset })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="btn btn--ghost carousel__btn"
          onClick={goPrev}
          aria-label="Item anterior"
        >
          Anterior
        </button>
        <div className="carousel__dots" role="tablist" aria-label="Posição do carrossel">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`carousel__dot${index === activeIndex ? ' is-active' : ''}`}
              aria-selected={index === activeIndex}
              aria-label={`Ir para item ${index + 1}: ${'name' in item && typeof item.name === 'string' ? item.name : item.id}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn--ghost carousel__btn"
          onClick={goNext}
          aria-label="Próximo item"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
