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

function useSemesterFormatter() {
  const { t } = useTranslation();
  return (s: string): string | null => {
    const v = s.trim();
    if (!v || v === 'Null') return null;
    if (/^\d+$/.test(v)) return `${v}°`;
    const key = `people.semesters.${v}`;
    const tr = t(key);
    return tr !== key ? tr : v;
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
  const formatSemester = useSemesterFormatter();

  return (
    <section id="time" className="section">
      <div className="container">
        <SectionHead eyebrow={t('time.eyebrow')} title={t('time.title')} lede={t('time.lede')} />
        {(() => {
          const groupKey = (rawPos: string) =>
            rawPos === 'Presidente' || rawPos.startsWith('Líder') ? 'Liderança' : rawPos;

          type Member = { person: typeof team[0]; rawPos: string };
          const groups: { trilhaRole: string; members: Member[] }[] = [];
          for (const p of team) {
            const isFounder = founderNames.has(p.name);
            const rawPos = isFounder ? 'Fundador' : (p.pos.at(-1) ?? '');
            const trilhaRole = groupKey(rawPos);
            const last = groups.at(-1);
            if (last && last.trilhaRole === trilhaRole) last.members.push({ person: p, rawPos });
            else groups.push({ trilhaRole, members: [{ person: p, rawPos }] });
          }

          const renderCard = ({ person: p }: Member, i: number) => {
            const isFounder = founderNames.has(p.name);
            const sem = formatSemester(p.semester);
            const courseLine = sem ? `${translateCourse(p.course)} · ${sem}` : translateCourse(p.course);
            return (
              <a
                key={i}
                href={p.link || '#'}
                target={p.link ? '_blank' : '_self'}
                rel="noreferrer"
                className="team-card"
                onClick={() => isFounder ? trackFounderProfileClick(p.name) : trackCurrentMemberProfileClick(p.name, p.role)}
              >
                <div className="team-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt={p.name}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                  />
                  <div className="team-photo-bg"></div>
                </div>
                <div className="team-info">
                  <div className="team-name">{p.name}</div>
                  {(p.role || p.company) && (
                    <div className="kicker team-pos">
                      {[translateRole(p.role), p.company].filter(Boolean).join(' @ ')}
                    </div>
                  )}
                  <div className="team-course">{courseLine}</div>
                </div>
                {p.link && <span className="team-arrow">↗</span>}
              </a>
            );
          };

          return groups.map((group) => {
            const isLeadership = group.trilhaRole === 'Liderança';
            return (
              <div key={group.trilhaRole} className="team-section reveal">
                {group.trilhaRole && !isLeadership && (
                  <h2 className="team-section-title">{translateRole(group.trilhaRole)}</h2>
                )}
                <div className={isLeadership ? 'team-grid team-grid--titled' : 'team-grid'}>
                  {group.members.map((m, i) =>
                    isLeadership ? (
                      <div key={i} className="team-col">
                        <h2 className="team-section-title team-col-title">{translateRole(m.rawPos)}</h2>
                        {renderCard(m, i)}
                      </div>
                    ) : renderCard(m, i)
                  )}
                </div>
              </div>
            );
          });
        })()}
      </div>
    </section>
  );
}
