"use client";
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { hackathons } from '@/data/hackathons';
import { useTranslatedPeople } from '@/data/people-i18n';
import { useTranslation } from '@/hooks/useTranslation';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: { project: string } }) {
  const { translatePerson } = useTranslatedPeople();
  const { t } = useTranslation();

  const project = hackathons.flatMap(h => h.projects).find(p => p.slug === params.project);
  if (!project) return notFound();

  const members = project.members.map((p, idx) => {
    const tr = translatePerson(p);
    return { id: idx, name: tr.name, designation: tr.role, image: tr.photo, link: tr.link };
  });

  return (
    <div className="bg-Branco min-h-screen">
      <Navbar />
      <section className="py-20 px-4 md:px-28 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center text-AzulMeiaNoite font-poppins">
          {project.name}
        </h1>
        <p className="text-center font-spaceGrotesk text-AzulMeiaNoite max-w-3xl mx-auto">
          {t(project.descriptionKey)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(project.images || []).map((img, idx) => (
            <Image key={idx} src={`/${img}`} alt={project.name} width={600} height={400} className="rounded-lg object-cover" />
          ))}
        </div>
        <div className="flex justify-center">
          <AnimatedTooltip items={members} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
