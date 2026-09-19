'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { SectionHead } from '@/components/home/shared';
import { SpeakerReveal, type RevealPhoto } from '@/components/home/SpeakerReveal';
import type { Pillar } from '@/components/home/data';

const groupPhoto = (original: string, artwork: string, alt: string, position = '50% 50%'): RevealPhoto =>
  [original, `/assets/community-edited/${artwork}-${artwork === 'festa' ? 'v2' : 'v1'}.png`, alt, position];

const GROUP_GALLERIES: Record<number, RevealPhoto[]> = {
  0: [groupPhoto('/assets/aulas/aulas.jpg', 'aulas', 'Estudantes trabalhando em sala'),
      groupPhoto('/assets/aulas/luigi.jpg', 'apresentacao', 'Apresentação em sala', '50% 65%')],
  1: [groupPhoto('/assets/objetivos/aula.jpg', 'mentoria', 'Estudantes colaborando no computador'),
      groupPhoto('/campus/aula.jpg', 'aulas', 'Atividades em grupo')],
  3: [groupPhoto('/assets/objetivos/festa.jpg', 'festa', 'Confraternização da comunidade', '50% 60%'),
      groupPhoto('/assets/objetivos/selfie.jpeg', 'selfie', 'Selfie da comunidade'),
      groupPhoto('/assets/objetivos/todos.JPG', 'comunidade', 'Encontro da comunidade')],
};

export default function Sobre() {
  const { t, locale } = useTranslation();
  const [active, setActive] = useState(0);
  const labels = locale === 'pt' ? ['Aulas', 'Palestras', 'Mentoria', 'Comunidade'] : ['Classes', 'Talks', 'Mentoring', 'Community'];
  const pillarIndex = [0, 2, 1, 3][active];
  const pillars = t<Pillar[]>('sobre.pillars');
  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionHead eyebrow={t('sobre.eyebrow')} title={t('sobre.title')} lede={t('sobre.lede')} />
        <div className="about-tabs" role="tablist" aria-label={locale === 'pt' ? 'Experiências no Trilha' : 'Trilha experiences'}>
          {labels.map((label, i) => <button key={label} id={`about-tab-${i}`} role="tab"
            aria-selected={active === i} aria-controls="about-panel" tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)} onKeyDown={event => {
              const next = event.key === 'ArrowRight' ? (i + 1) % 4 : event.key === 'ArrowLeft' ? (i + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
              if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`about-tab-${next}`)?.focus(); }
            }}>{label}</button>)}
        </div>
        <div id="about-panel" className="about-gallery" role="tabpanel" aria-labelledby={`about-tab-${active}`}>
          <div className="about-gallery-image pillar--speakers">
            <SpeakerReveal key={active} photos={GROUP_GALLERIES[pillarIndex]} controls onComplete={() => setActive(i => (i + 1) % 4)} />
          </div>
          <div className="about-gallery-copy">
            <span className="eyebrow">{pillars[pillarIndex].tag}</span>
            <h3>{pillars[pillarIndex].title}</h3>
            <p>{pillars[pillarIndex].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
