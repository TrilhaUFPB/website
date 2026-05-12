'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { useTranslatedPeople } from '@/data/people-i18n';
import type { Person } from '@/data/people';

export default function TurmaStudents({ period }: { period: string }) {
  const { locale } = useTranslation();
  const { trackStudentProfileClick } = usePostHogTracking();
  const translated = useTranslatedPeople();

  const students = (() => {
    if (period === '2024.1') return translated.peopleStudents20241 as Person[];
    if (period === '2024.2') return translated.peopleStudents20242 as Person[];
    if (period === '2025.1') return translated.peopleStudents20251 as Person[];
    return [] as Person[];
  })();

  // Touch `locale` so eslint doesn't complain — the hook above already reacts to it via translatePerson.
  void locale;

  return (
    <div className="team-grid">
      {students.map((p, i) => (
        <a
          key={`s-${i}`}
          href={p.link || '#'}
          target={p.link ? '_blank' : '_self'}
          rel="noreferrer"
          className="team-card"
          onClick={() => trackStudentProfileClick(p.name, period)}
        >
          <div className="team-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p.photo ? <img src={p.photo} alt={p.name} /> : null}
            <div className="team-photo-bg"></div>
          </div>
          <div className="team-info">
            <div className="team-name">{p.name}</div>
            {(p.role || p.company) && (
              <div className="kicker team-pos">
                {[p.role, p.company].filter(Boolean).join(' @ ')}
              </div>
            )}
            <div className="team-course">{p.course}</div>
          </div>
          {p.link && <span className="team-arrow">↗</span>}
        </a>
      ))}
    </div>
  );
}
