import Link from 'next/link';
import { notFound } from 'next/navigation';
import ptCommon from '@/locales/pt/common.json';
import TurmaStudents from './TurmaStudents';

import { cohorts } from '@trilha/people/cohorts';
export function generateStaticParams() { return cohorts.map(({period}) => ({period})); }

export default async function TurmaPage({ params }: { params: Promise<{ period: string }> }) {
  const { period } = await params;
  const cohort = cohorts.find(item => item.period === period);
  if (!cohort) notFound();

  const meta = { title:cohort.title.pt, theme:cohort.description.pt };
  const back = ptCommon.turmaPage.back;
  const cohortLabel = ptCommon.turmaPage.cohortLabel;

  return (
    <main className="shell">
      <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 88px)', paddingBottom: 'clamp(56px, 7vw, 110px)' }}>
        <div className="container">
          <div className="reveal in" style={{ marginBottom: 32 }}>
            <Link href="/#turmas" className="kicker" style={{ color: 'var(--ink-soft)' }}>
              {back}
            </Link>
          </div>
          <header className="section-head" style={{ marginBottom: 48 }}>
            <div className="kicker tag-dot" style={{ color: 'var(--mint-deep)', marginBottom: 18 }}>
              {cohortLabel} {period}
            </div>
            <h2>
              <span className="serif-italic">{period}</span>
              {meta ? ` — ${meta.title}` : ''}
            </h2>
            {meta?.theme && <p className="lede">{meta.theme}</p>}
          </header>

          <TurmaStudents period={period} />
        </div>
      </section>
    </main>
  );
}
