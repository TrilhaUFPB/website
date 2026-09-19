'use client';
import Link from 'next/link';
import { cohorts } from '@trilha/people/cohorts';
import { useTranslation } from '@/hooks/useTranslation';
export default function CohortHeader({period}:{period:string}) {
 const {t,locale}=useTranslation();
 const cohort=cohorts.find(item=>item.period===period)!;
 const language=locale==='en'?'en':'pt';
 return <>
  <div className="reveal in" style={{marginBottom:32}}><Link href="/#turmas" className="kicker" style={{color:'var(--ink-soft)'}}>{t('turmaPage.back')}</Link></div>
  <header className="section-head" style={{marginBottom:48}}>
   <div className="kicker tag-dot" style={{color:'var(--mint-deep)',marginBottom:18}}>{t('turmaPage.cohortLabel')} {period}</div>
   <h2><span className="serif-italic">{period}</span> — {cohort.title[language]}</h2>
   <p className="lede">{cohort.description[language]}</p>
  </header>
 </>;
}
