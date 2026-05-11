'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { CyclingImage, SectionHead } from '@/components/home/shared';
import type { Pillar } from '@/components/home/data';

const PILLAR_GALLERY: Record<number, string[]> = {
  0: ['/assets/aulas/aulas.jpg', '/assets/aulas/luigi.jpg'],
  1: ['/assets/objetivos/aula.jpg'],
  2: [
    '/assets/palestras/herval.jpg',
    '/assets/palestras/itamar.jpg',
    '/assets/palestras/jp_honorato.jpg',
    '/assets/palestras/lara.jpg',
    '/assets/palestras/terron.png',
  ],
  3: ['/assets/objetivos/festa.jpg', '/assets/objetivos/selfie.jpeg', '/assets/objetivos/todos.JPG'],
};

export default function Sobre() {
  const { t } = useTranslation();
  const pillars = t<Pillar[]>('sobre.pillars');
  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionHead eyebrow={t('sobre.eyebrow')} title={t('sobre.title')} lede={t('sobre.lede')} />
        <div className="pillars-grid reveal">
          {pillars.map((p, i) => {
            const gallery = PILLAR_GALLERY[i] ?? [];
            return (
              <article key={i} className="pillar">
                {gallery.length > 0 && (
                  <div className="pillar-img">
                    <CyclingImage images={gallery} alt={p.tag} />
                  </div>
                )}
                <div className="pillar-tag eyebrow">{p.tag}</div>
                <h3 className="pillar-title display">{p.title}</h3>
                <p className="pillar-body">{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
