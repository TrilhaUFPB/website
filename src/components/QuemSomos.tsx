'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { SectionHead } from '@/components/home/shared';
import { peopleFounders, peopleOrganizationCurrent, type Person } from '@/data/people';

function useRoleTranslator() {
  const { t } = useTranslation();
  return (role: string) =>
    role
      .split(' · ')
      .map((seg) => {
        const key = `people.roles.${seg}`;
        const tr = t(key);
        return tr !== key ? tr : seg;
      })
      .join(' · ');
}

function useCourseTranslator() {
  const { t } = useTranslation();
  return (course: string) => {
    const key = `people.courses.${course}`;
    const tr = t(key);
    return tr !== key ? tr : course;
  };
}

const founderNames = new Set(peopleFounders.map((p) => p.name));
const team: Person[] = [
  ...peopleFounders,
  ...peopleOrganizationCurrent.filter((p) => !founderNames.has(p.name)),
];

export default function QuemSomos() {
  const { t } = useTranslation();
  const { trackFounderProfileClick, trackCurrentMemberProfileClick } = usePostHogTracking();
  const translateRole = useRoleTranslator();
  const translateCourse = useCourseTranslator();

  return (
    <section id="time" className="section">
      <div className="container">
        <SectionHead eyebrow={t('time.eyebrow')} title={t('time.title')} lede={t('time.lede')} />
        <div className="team-grid reveal">
          {team.map((p, i) => {
            const isFounder = founderNames.has(p.name);
            const onClick = () => {
              if (isFounder) trackFounderProfileClick(p.name);
              else trackCurrentMemberProfileClick(p.name, p.role);
            };
            return (
              <a
                key={i}
                href={p.link || '#'}
                target={p.link ? '_blank' : '_self'}
                rel="noreferrer"
                className="team-card"
                onClick={onClick}
              >
                <div className="team-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt={p.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '0';
                    }}
                  />
                  <div className="team-photo-bg"></div>
                </div>
                <div className="team-info">
                  <div className="team-name">{p.name}</div>
                  <div className="kicker team-role">{translateRole(p.role)}</div>
                  <div className="team-course">{translateCourse(p.course)}</div>
                </div>
                {p.link && <span className="team-arrow">↗</span>}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
