import { notFound } from 'next/navigation';
import CohortHeader from './CohortHeader';
import TurmaStudents from './TurmaStudents';

import { cohorts } from '@trilha/people/cohorts';
export function generateStaticParams() { return cohorts.map(({period}) => ({period})); }

export default async function TurmaPage({ params }: { params: Promise<{ period: string }> }) {
  const { period } = await params;
  const cohort = cohorts.find(item => item.period === period);
  if (!cohort) notFound();

  return (
    <main className="shell">
      <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 88px)', paddingBottom: 'clamp(56px, 7vw, 110px)' }}>
        <div className="container">
          <CohortHeader period={period} />
          <TurmaStudents period={period} />
        </div>
      </section>
    </main>
  );
}
