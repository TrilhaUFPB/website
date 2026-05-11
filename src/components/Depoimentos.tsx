'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { SectionHead } from '@/components/home/shared';
import { TESTIMONIALS } from '@/data/testimonials';

export default function Depoimentos() {
  const { t, locale } = useTranslation();
  const cohortLabel = t('depo.cohortLabel');
  const featured = TESTIMONIALS.filter((tt) => tt.short);
  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <SectionHead eyebrow={t('depo.eyebrow')} title={t('depo.title')} lede={t('depo.lede')} />
        <div className="depo-grid reveal">
          {featured.map((item, i) => {
            const p = item.person;
            const cohort = p.class ? `${cohortLabel} ${p.class}` : '';
            const job = p.role.trim();
            const role = [cohort, job].filter(Boolean).join(' · ');
            return (
              <figure key={i} className={`depo ${i % 3 === 1 ? 'depo--tall' : ''}`}>
                <blockquote>
                  <span
                    className="display serif-italic"
                    style={{ fontSize: 36, lineHeight: 1, marginRight: 4 }}
                  >
                    “
                  </span>
                  {item.short![locale]}
                </blockquote>
                <figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt={p.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    {role && (
                      <div className="kicker" style={{ marginTop: 2 }}>
                        {role}
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
