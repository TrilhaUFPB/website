'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { PlaceholderImg, SectionHead } from '@/components/home/shared';
import type { ProjectItem } from '@/components/home/data';

export default function Projects() {
  const { t } = useTranslation();
  const items = t<ProjectItem[]>('projects.items');
  return (
    <section id="projetos" className="section section--paper">
      <div className="container">
        <SectionHead eyebrow={t('projects.eyebrow')} title={t('projects.title')} lede={t('projects.lede')} />
        <div className="projects-grid reveal">
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
      </div>
    </section>
  );
}
