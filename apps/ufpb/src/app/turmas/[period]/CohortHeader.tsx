'use client';
import Link from 'next/link';
import { cohorts } from '@trilha/people/cohorts';
import { useTranslation } from '@/hooks/useTranslation';
export default function CohortHeader({period}:{period:string}) {
 const {t,locale}=useTranslation();
 const cohort=cohorts.find(item=>item.period===period)!;
 const en=locale==='en';
 const index=cohorts.indexOf(cohort);
 return <>
  <Link href="/#turmas" className="cohort-back">{t('turmaPage.back')}</Link>
  <header className="cohort-heading">
   <div><div className="kicker">TRILHA UFPB · {period}</div><h1>{cohort.title[en?'en':'pt']}</h1></div>
   <p>{cohort.description[en?'en':'pt']}</p>
  </header>
  <figure className="cohort-cover">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={cohort.image} alt={`${cohort.title[en?'en':'pt']} — Trilha UFPB`} />
   <figcaption>Trilha UFPB <span>{period}</span></figcaption>
  </figure>
  <div className="cohort-facts">
   <span><strong>{cohort.students.length}</strong> {en?'students':'estudantes'}</span>
   <span><strong>{cohort.durationSemesters}</strong> {cohort.durationSemesters===1?(en?'semester':'semestre'):(en?'semesters':'semestres')}</span>
   <span className="cohort-status">{cohort.status==='active'?(en?'In progress':'Em andamento'):(en?'Completed':'Concluída')}</span>
  </div>
  <nav className="cohort-editions" aria-label={en?'Other cohorts':'Outras turmas'}>
   {index>0?<Link href={`/turmas/${cohorts[index-1].period}`}>← {cohorts[index-1].title[en?'en':'pt']}</Link>:<span/>}
   {index<cohorts.length-1&&<Link href={`/turmas/${cohorts[index+1].period}`}>{cohorts[index+1].title[en?'en':'pt']} →</Link>}
  </nav>
 </>;
}
