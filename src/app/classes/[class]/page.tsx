"use client";
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HackathonsSection from '@/components/HackathonsSection';
import { classes } from '@/data/classes';
import { hackathons } from '@/data/hackathons';
import { useTranslation } from '@/hooks/useTranslation';
import { useTranslatedPeople } from '@/data/people-i18n';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

export default function ClassPage({ params }: { params: { class: string } }) {
  const { t } = useTranslation();
  const { translatePerson } = useTranslatedPeople();

  const classInfo = classes.find((c) => c.id === params.class);
  if (!classInfo) return notFound();

  const organizers = classInfo.organizers.map((p, index) => {
    const tr = translatePerson(p);
    return { id: index, name: tr.name, designation: tr.role, image: tr.photo, link: tr.link };
  });

  const students = classInfo.students.map((p) => {
    const tr = translatePerson(p);
    return { name: tr.name, course: tr.course, photo: tr.photo, link: tr.link, role: tr.role };
  });

  const hackathon = hackathons.find((h) => h.class === classInfo.id);

  return (
    <div className="bg-Branco min-h-screen">
      <Navbar />
      <section className="py-20 px-4 md:px-28 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center text-AzulMeiaNoite font-poppins">
          {t(classInfo.titleKey)}
        </h1>
        <p className="text-center font-spaceGrotesk text-AzulMeiaNoite max-w-3xl mx-auto">
          {t(classInfo.descriptionKey)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classInfo.images.map((img, idx) => (
            <Image
              key={idx}
              src={`/${img}`}
              alt={classInfo.id}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold">{t('turmaSection.organization')}</h2>
          <AnimatedTooltip items={organizers} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold">{t('turmaSection.students')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {students.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <Image src={s.photo} alt={s.name} height={200} width={200} className="rounded-full w-24 h-24" />
                <p className="text-sm text-center font-bold">{s.name.split(' ').slice(0,2).join(' ')}</p>
                <p className="text-xs text-center">{s.course}</p>
                <p className="text-xs text-center">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
        {hackathon && <HackathonsSection hackathonsList={[hackathon]} />}
      </section>
      <Footer />
    </div>
  );
}
