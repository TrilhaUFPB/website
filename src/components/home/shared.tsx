'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const TickContext = createContext(0);

export function TickProvider({
  interval = 3500,
  children,
}: {
  interval?: number;
  children: React.ReactNode;
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), interval);
    return () => clearInterval(id);
  }, [interval]);
  return <TickContext.Provider value={tick}>{children}</TickContext.Provider>;
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export function useScrolled(threshold = 12) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const onScroll = () => setS(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return s;
}

export function CyclingImage({ images, alt }: { images: string[]; alt: string }) {
  const tick = useContext(TickContext);
  const i = images.length ? tick % images.length : 0;
  return (
    <div className="pillar-img-stack">
      {images.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt={alt} loading="lazy" className={idx === i ? 'on' : ''} />
      ))}
    </div>
  );
}

export function SectionHead({
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="section-head reveal">
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

export function PlaceholderImg({ label, ratio = '4 / 3' }: { label: string; ratio?: string }) {
  return (
    <div className="placeholder-img" style={{ aspectRatio: ratio }}>
      {label}
    </div>
  );
}
