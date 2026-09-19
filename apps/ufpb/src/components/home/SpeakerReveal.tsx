'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useRef, useState } from 'react';

export type RevealPhoto = readonly [original: string, edited: string, alt: string, position: string];

const speakers: RevealPhoto[] = [
  ['herval.jpg', 'herval', 'Herval Freire', '50% 65%'],
  ['itamar.jpg', 'itamar', 'Itamar Rocha', '20% 60%'],
  ['jp_honorato.jpg', 'jp-honorato', 'João Pedro Vasconcelos e Felipe Honorato', '50% 48%'],
  ['lara.jpg', 'lara', 'Lara Pontes', '60% 50%'],
  ['terron.png', 'terron', 'Rodrigo Terron', '75% 50%'],
  ['marcos-andre.png', 'marcos-andre', 'Marcos Candeia e André Costa', '85% 40%'],
];

export const speakerPhotos: RevealPhoto[] = speakers.map(([original, edited, alt, position]) => [
  `/assets/palestras/${original}`, `/assets/palestras/edited/${edited}-v1.png`, alt, position,
]);

export function SpeakerReveal({ photos = speakerPhotos, controls = false, onComplete }: { photos?: RevealPhoto[]; controls?: boolean; onComplete?: () => void }) {
  const { locale } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const root = useRef<HTMLDivElement>(null);
  const [original, edited, name, position] = photos[index];
  const ready = loaded[original] && loaded[edited];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  // Warm the next pair while the current photograph is on screen.
  useEffect(() => {
    const next = photos[(index + 1) % photos.length];
    next.slice(0, 2).forEach(src => { const image = new Image(); image.src = src; });
  }, [index, photos]);

  return (
    <div ref={root} className="speaker-reveal" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}>
      <div key={edited} className="speaker-reveal-cycle" style={{ opacity: ready ? undefined : 1, animationPlayState: visible && ready && !hovered && !focused ? 'running' : 'paused' }}
        onAnimationEnd={event => {
          if (event.target !== event.currentTarget) return;
          if (index === photos.length - 1 && onComplete) onComplete();
          else setIndex(i => (i + 1) % photos.length);
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="speaker-original" src={original} alt={name}
          style={{ objectPosition: position }} onLoad={() => setLoaded(s => ({ ...s, [original]: true }))} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="speaker-edited" style={{ visibility: ready ? 'visible' : 'hidden' }} src={edited} alt="" aria-hidden="true"
          onLoad={() => setLoaded(s => ({ ...s, [edited]: true }))} />
      </div>
      {controls && <div className="photo-controls">
        <button type="button" aria-label={locale === 'pt' ? 'Foto anterior' : 'Previous photo'} onClick={() => setIndex(i => (i + photos.length - 1) % photos.length)}>←</button>
        <span>{index + 1} / {photos.length}</span>
        <button type="button" aria-label={locale === 'pt' ? 'Próxima foto' : 'Next photo'} onClick={() => setIndex(i => (i + 1) % photos.length)}>→</button>
      </div>}
    </div>
  );
}
