"use client";

import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";
import { useTranslatedPeople } from "@/data/people-i18n";
import { hackathons } from "@/data/hackathons";
import { AnimatedTooltip } from "./ui/animated-tooltip";

export default function HackathonsSection() {
  const { t } = useTranslation();
  const { translatePerson } = useTranslatedPeople();

  return (
    <section className="py-20 bg-Branco px-4 md:px-28 relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50} />
      <div className="px-6">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu font-poppins mb-2 z-10">
          {t("hackathons.title")}
        </h2>
        <h1 className="text-3xl font-bold text-center text-AzulMeiaNoite font-poppins mb-8 z-10">
          {t("hackathons.subtitle")}
        </h1>
      </div>
      <div className="flex flex-col gap-12">
        {hackathons.map((hackathon, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold text-AzulMeiaNoite font-poppins mb-6 text-center">
              {t(`hackathons.${hackathon.class.replace('.', '_')}`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hackathon.projects.map((project, pIndex) => {
                const members = project.members.map((p, index) => {
                  const translated = translatePerson(p);
                  return {
                    id: index,
                    name: translated.name,
                    designation: translated.role,
                    image: translated.photo,
                    link: translated.link,
                  };
                });
                return (
                  <div
                    key={pIndex}
                    className="border-2 border-AzulMeiaNoite rounded-3xl p-6 bg-Branco/5"
                  >
                    <h3 className="text-xl font-bold font-poppins text-AzulMeiaNoite mb-2 text-center">
                      {project.name}
                    </h3>
                    <p className="text-sm font-spaceGrotesk text-AzulMeiaNoite mb-4">
                      {t(project.descriptionKey)}
                    </p>
                    <div className="flex justify-center">
                      <AnimatedTooltip items={members} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
