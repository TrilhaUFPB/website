'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { SectionHead } from '@/components/home/shared';
import type { Stat } from '@/components/home/data';

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match || !inView) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(target * eased);
      setDisplay(`${n}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function Numbers() {
  const { t } = useTranslation();
  const stats = t<Stat[]>('numbers.stats');
  const reveals = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.4 }
    );
    reveals.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section id="numeros" className="section section--ink section--ink-numbers">
      <div className="container">
        <SectionHead eyebrow={t('numbers.eyebrow')} title={t('numbers.title')} />
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                reveals.current[i] = el;
              }}
              className="reveal stat"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="stat-k display">
                <CountUp value={s.k} />
              </div>
              <div className="stat-l eyebrow">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
