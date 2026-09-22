'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { useTranslatedPeople } from '@/data/people-i18n';
import { cohorts, cohortOrganizations } from '@trilha/people/cohorts';
import type { Person } from '@trilha/people/profiles';

export default function TurmaStudents({ period }: { period: string }) {
 const { locale } = useTranslation();
 const en=locale==='en';
 const { trackStudentProfileClick } = usePostHogTracking();
 const { translatePerson, translateRole } = useTranslatedPeople();
 const students=(cohorts.find(c=>c.period===period)?.students??[]).map(translatePerson);
 const organization=cohortOrganizations[period as keyof typeof cohortOrganizations]??[];
 function card(p:Person,detail:string,org=false) {
  const content=<>
   <div className="cohort-person-photo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {p.photo?<img src={p.photo} alt={p.name} loading="lazy"/>:<span>{p.name.split(' ').slice(0,2).map(n=>n[0]).join('')}</span>}
   </div>
   <div className="cohort-person-info"><h3>{p.name}</h3>{detail&&<p>{detail}</p>}{p.link&&<span className="cohort-person-arrow" aria-hidden="true">↗</span>}</div>
  </>;
  return p.link?<a key={p.name} className="cohort-person" href={p.link} target="_blank" rel="noreferrer" onClick={()=>{if(!org)trackStudentProfileClick(p.name,period);}}>{content}</a>:<article key={p.name} className="cohort-person">{content}</article>;
 }
 return <>
  <section className="cohort-people-section" aria-labelledby="cohort-students">
   <div className="cohort-section-heading"><div><span className="kicker">{en?'THE COHORT':'A TURMA'}</span><h2 id="cohort-students">{en?'Learning together.':'Quem viveu essa história.'}</h2></div><span>{students.length} {en?'students':'estudantes'}</span></div>
   <div className="cohort-people-grid">{students.map(p=>card(p,p.course))}</div>
  </section>
  <section className="cohort-people-section" aria-labelledby="cohort-organization">
   <div className="cohort-section-heading"><div><span className="kicker">{en?'ORGANIZATION':'ORGANIZAÇÃO'} · {period}</span><h2 id="cohort-organization">{en?'The people behind it.':'Quem fez acontecer.'}</h2></div></div>
   <p className="cohort-section-description">{en?'The team and their roles during this edition.':'A equipe e os cargos durante esta edição do Trilha.'}</p>
   <div className="cohort-people-grid">{organization.map(p=>{const role=p.pos[p.org.indexOf(period)];return card(p,role?translateRole(role):(en?'Organization':'Organização'),true);})}</div>
  </section>
 </>;
}
