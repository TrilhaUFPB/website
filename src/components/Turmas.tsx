"use client";

import { peopleOrganization20241, peopleStudents20241 } from "@/data/people";
import TurmaSection from "./TurmaSection";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";
import { useTranslatedPeople } from "@/data/people-i18n";

const courses = {
  "Ciência da Computação": "CC",
  "Engenharia da Computação": "EC",
  "Ciência de Dados e Inteligência Artificial": "CDIA",
};

export default function Turmas() {
  const { t } = useTranslation();
  const { 
    peopleOrganization20241: translatedOrg, 
    peopleStudents20241: translatedStudents,
    courses 
  } = useTranslatedPeople();

  const transformedPeople20241 = translatedOrg.map((person, index) => ({
    id: index,
    name: person.name,
    designation: person.role,
    image: person.photo,
    link: person.link,
  }));

  const transformedPeopleStudents20241 = translatedStudents.map((person) => ({
    name: person.name,
    course: courses[person.course] ? courses[person.course].split(' ')[0] : "CC",
    photo: person.photo,
    link: person.link,
    role: person.role.trim() === "" ? t("people.roles.Ex Aluno Trilha") : person.role,
  }));

  return (
    <section
      id="turmas"
      className="py-20 bg-AzulMeiaNoite px-4 md:px-28 relative"
    >
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50} />

      <div className="px-6">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu fnt-poppins mb-2 z-10">
          {t("turmas.title")}
        </h2>
        <h1 className="text-3xl font-bold text-center text-Branco font-poppins mb-6 z-10">
          {t("turmas.subtitle")}
        </h1>

        <p className="text-2sm font-regular text-center text-Branco font-spaceGrotesk mb-8 z-10">
          {t("turmas.description")}
        </p>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center justify-center z-10">
        {/* Use the TurmaSection Component */}
        <TurmaSection
          title={t("turmas.firstClass")}
          organizers={transformedPeople20241}
          students={transformedPeopleStudents20241}
        />
      </div>
    </section>
  );
}
