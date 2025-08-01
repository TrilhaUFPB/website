"use client";

import DynamicGrid from "./DynamicGrid";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { useTranslatedPeople } from "@/data/people-i18n";
import { usePostHogTracking } from "@/hooks/usePostHogTracking";

export default function QuemSomos() {
  const { t } = useTranslation();
  const {
    peopleFounders: translatedFounders,
    peopleOrganization20251: translatedOrg,
  } = useTranslatedPeople();
  const { trackFounderProfileClick, trackCurrentMemberProfileClick } = usePostHogTracking();

  return (
    <section id="quem-somos" className="py-20 bg-Branco px-4 md:px-28 relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50} />

      <div className="px-8">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu font-poppins mb-2 z-10">
          {t("quemSomos.title")}
        </h2>
        <h1 className="text-3xl font-extrabold text-center text-AzulMeiaNoite font-poppins mb-6 z-10">
          {t("quemSomos.subtitle")}
        </h1>

        <h2 className="text-1xl font-semibold text-center text-AzulMeiaNoite font-poppins mt-12 mb-6 z-10">
          {t("quemSomos.founders")}
        </h2>

        {/* Founders Section */}
        <div className="flex flex-wrap justify-center gap-6 relative z-10">
          {translatedFounders.map((person) => (
            <a
              key={person.name}
              href={person.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center w-24 md:w-40"
              onClick={() => trackFounderProfileClick(person.name)}
            >
              {/* Image Circle */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-AzulMeiaNoite overflow-hidden group">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={200}
                  height={200}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full"
                />
              </div>

              {/* Person Details */}
              <h3 className="mt-2 font-bold font-poppins text-sm md:text-base text-AzulMeiaNoite">
                {person.name.split(" ").slice(0, 2).join(" ")}
              </h3>
            </a>
          ))}
        </div>

        <h2 className="text-1xl font-semibold text-center text-AzulMeiaNoite font-poppins mt-12 mb-6 z-10">
          {t("quemSomos.current")}
        </h2>

        {/* People Section */}
        <div className="flex flex-wrap justify-center gap-6 relative z-10">
          {translatedOrg.map((person) => (
            <a
              key={person.name}
              href={person.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center w-24 md:w-40"
              onClick={() => trackCurrentMemberProfileClick(person.name, person.pos[person.pos.length - 1])}
            >
              {/* Image Circle */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-AzulMeiaNoite overflow-hidden group">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={200}
                  height={200}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full"
                />
              </div>

              {/* Person Details */}
              <h3 className="mt-2 font-bold font-poppins text-sm md:text-base text-AzulMeiaNoite">
                {person.name.split(" ").slice(0, 2).join(" ")}
              </h3>
              <p className="text-xs md:text-sm font-spaceGrotesk font-semibold text-AzulCeu">
                {person.course} - {person.semester}
                {t("quemSomos.semester")}
              </p>
              <p className="text-xs md:text-sm font-spaceGrotesk text-neutral-600 font-semibold mt-0">
                {person.pos[person.pos.length - 1]} {/* Last role */}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
