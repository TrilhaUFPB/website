'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { SectionHead } from '@/components/home/shared';
import { PUBLIC_TESTIMONIALS } from '@trilha/people/testimonials';

export default function Depoimentos() {
  const { t, locale } = useTranslation();
  const cohortLabel = t('depo.cohortLabel');
  const featured = PUBLIC_TESTIMONIALS;
  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <SectionHead eyebrow={t('depo.eyebrow')} title={t('depo.title')} lede={t('depo.lede')} />
        <div className="depo-grid reveal">
          {featured.map((item, i) => {
            const p = item.person;
            const cohort = p.class ? `${cohortLabel} ${p.class}` : '';
            const company = p.company?.trim() ?? '';
            const job = p.role.trim();
            const role = [job, company].filter(Boolean).join(' · ');
            return (
              <figure key={i} className="depo">
                <div className="depo-topline">
                  <span className="depo-quote-mark" aria-hidden="true">“</span>
                  {cohort && <span className="depo-cohort">{cohort}</span>}
                </div>
                <blockquote>
                  {item.short![locale]}
                </blockquote>
                <figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                  <div>
                    <div className="depo-name">{p.name}</div>
                    {role && (
                      <div className="depo-role">
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
