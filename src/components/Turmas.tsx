'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { SectionHead } from '@/components/home/shared';
import type { TurmaItem } from '@/components/home/data';

export default function Turmas() {
  const { t } = useTranslation();
  const { trackTurmaSectionInteraction } = usePostHogTracking();
  const items = t<TurmaItem[]>('turmas.items');
  const studentsSuffix = t('turmas.studentsSuffix');
  const [active, setActive] = useState(2);
  return (
    <section id="turmas" className="section">
      <div className="container">
        <SectionHead eyebrow={t('turmas.eyebrow')} title={t('turmas.title')} lede={t('turmas.lede')} />
        <div className="turmas-row reveal">
          {items.map((it, i) => (
            <a
              key={i}
              href={`/turmas/${it.period}`}
              className={`turma-card ${active === i ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => trackTurmaSectionInteraction('click', it.period)}
              tabIndex={0}
            >
              <div className="turma-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.img} alt={it.title} />
                <div className="turma-overlay">
                  <span className="kicker">{it.period}</span>
                  <span className="kicker">
                    {it.students} {studentsSuffix}
                  </span>
                </div>
              </div>
              <div className="turma-meta">
                <div className="display turma-title">
                  <span className="serif-italic">{it.period}</span> — {it.title}
                </div>
                <p className="turma-theme">{it.theme}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
