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

export const galleryImage = (path: string) => `/assets/gallery-web/${path.replace(/^\//, '').replaceAll('/', '-').replace(/\.[^.]+$/, '.webp')}`;

export const speakerPhotos: RevealPhoto[] = speakers.map(([original, edited, alt, position]) => [
  galleryImage(`/assets/palestras/${original}`), galleryImage(`/assets/palestras/edited/${edited}-v1.png`), alt, position,
]);

export function SpeakerReveal({ photos = speakerPhotos, controls = false, onComplete }: { photos?: RevealPhoto[]; controls?: boolean; onComplete?: () => void }) {
  const { locale } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<{ photo: RevealPhoto; clip: string; opacity: string } | null>(null);
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

  useEffect(() => {
    root.current?.querySelectorAll('img').forEach(image => {
      if (image.complete && image.naturalWidth > 0) {
        const src = image.getAttribute('src');
        if (src) setLoaded(previous => previous[src] ? previous : { ...previous, [src]: true });
      }
    });
  }, [original, edited]);

  // Warm the next pair while the current photograph is on screen.
  useEffect(() => {
    const next = photos[(index + 1) % photos.length];
    next.slice(0, 2).forEach(src => { const image = new Image(); image.src = src; });
  }, [index, photos]);

  function changePhoto(next: number) {
    const artwork = root.current?.querySelector('.speaker-reveal-cycle .speaker-edited');
    const style = artwork ? getComputedStyle(artwork) : null;
    setOutgoing({ photo: photos[index], clip: style?.clipPath ?? 'inset(0 100% 0 0)', opacity: style?.visibility === 'hidden' ? '0' : (style?.opacity ?? '1') });
    setIndex(next);
  }

  return (
    <div ref={root} className="speaker-reveal" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}>
      <div key={edited} className="speaker-reveal-cycle" style={{ animationName: ready ? undefined : 'none', animationPlayState: visible && ready && !hovered && !focused ? 'running' : 'paused' }}
        onAnimationEnd={event => {
          if (event.target !== event.currentTarget) return;
          if (index === photos.length - 1 && onComplete) onComplete();
          else changePhoto((index + 1) % photos.length);
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="speaker-original" src={original} alt={name}
          style={{ objectPosition: position }} onLoad={() => setLoaded(s => ({ ...s, [original]: true }))} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="speaker-edited" style={{ visibility: ready ? 'visible' : 'hidden', animationName: ready ? undefined : 'none' }} src={edited} alt="" aria-hidden="true"
          onLoad={() => setLoaded(s => ({ ...s, [edited]: true }))} />
      </div>
      {outgoing && <div key={original} className="speaker-outgoing" aria-hidden="true"
        style={{ animationName: loaded[original] ? undefined : 'none' }}
        onAnimationEnd={event => { if (event.target === event.currentTarget) setOutgoing(null); }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={outgoing.photo[0]} alt="" style={{ objectFit: 'cover', objectPosition: outgoing.photo[3] }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={outgoing.photo[1]} alt="" style={{ objectFit: 'contain', clipPath: outgoing.clip, opacity: outgoing.opacity }} />
      </div>}
      {controls && <div className="photo-controls">
        <button type="button" aria-label={locale === 'pt' ? 'Foto anterior' : 'Previous photo'} onClick={() => changePhoto((index + photos.length - 1) % photos.length)}>←</button>
        <span>{index + 1} / {photos.length}</span>
        <button type="button" aria-label={locale === 'pt' ? 'Próxima foto' : 'Next photo'} onClick={() => changePhoto((index + 1) % photos.length)}>→</button>
      </div>}
    </div>
  );
}
