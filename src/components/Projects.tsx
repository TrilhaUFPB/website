'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { PlaceholderImg, SectionHead } from '@/components/home/shared';
import type { ProjectItem } from '@/components/home/data';

export default function Projects() {
  const { t } = useTranslation();
  const items = t<ProjectItem[]>('projects.items');
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
    // figure out active card by which is closest to viewport center
    const center = scrollLeft + clientWidth / 2;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.project-card'));
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const cardCenter = c.offsetLeft + c.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  }, []);

  useEffect(() => {
    updateState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    return () => {
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [updateState]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.project-card');
    if (!card) return;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    el.scrollBy({ left: (card.offsetWidth + gap) * dir, behavior: 'smooth' });
  };

  const scrollToIdx = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.project-card');
    const card = cards[idx];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section id="projetos" className="section section--paper">
      <div className="container">
        <SectionHead eyebrow={t('projects.eyebrow')} title={t('projects.title')} lede={t('projects.lede')} />
        <div className="projects-carousel reveal">
          <button
            type="button"
            className="projects-nav projects-nav--prev"
            aria-label="Anterior"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
          >
            ‹
          </button>
          <div className="projects-track" ref={trackRef}>
            {items.map((p, i) => {
              const inner = (
                <>
                  <div className="project-img">
                    {p.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        style={{ width: '100%', aspectRatio: '5 / 4', objectFit: 'cover', background: 'var(--paper)' }}
                      />
                    ) : (
                      <PlaceholderImg label={`hackathon shot · ${p.tag}`} ratio="5 / 4" />
                    )}
                  </div>
                  <div className="project-meta">
                    <div className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
                      {p.tag}
                    </div>
                    <h3 className="display" style={{ fontSize: 30, margin: '10px 0 8px', lineHeight: 1.05 }}>
                      {p.title}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 15 }}>{p.desc}</p>
                  </div>
                </>
              );
              return p.pitch ? (
                <a key={i} href={p.pitch} target="_blank" rel="noreferrer" className="project-card">
                  {inner}
                </a>
              ) : (
                <article key={i} className="project-card">
                  {inner}
                </article>
              );
            })}
          </div>
          <button
            type="button"
            className="projects-nav projects-nav--next"
            aria-label="Próximo"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
          >
            ›
          </button>
        </div>
        <div className="projects-dots" role="tablist" aria-label="Projetos">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`projects-dot${i === activeIdx ? ' is-active' : ''}`}
              aria-label={`Ir para projeto ${i + 1}`}
              aria-selected={i === activeIdx}
              onClick={() => scrollToIdx(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
