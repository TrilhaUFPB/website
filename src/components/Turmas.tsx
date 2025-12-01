"use client";

import TurmaSection from "./TurmaSection";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";
import { useTranslatedPeople } from "@/data/people-i18n";

export default function Turmas() {
  const { t } = useTranslation();
  const {
    peopleOrganization20241: translatedOrg20241,
    peopleStudents20241: translatedStudents20241,
    peopleOrganization20242: translatedOrg20242,
    peopleStudents20242: translatedStudents20242,
    peopleOrganization20251: translatedOrg20251,
    peopleStudents20251: translatedStudents20251,
  } = useTranslatedPeople();

  const transformedPeople20241 = translatedOrg20241.map((person, index) => ({
    id: index,
    name: person.name,
    designation: person.role,
    image: person.photo,
    link: person.link,
  }));

  const transformedPeopleStudents20241 = translatedStudents20241.map((person) => ({
    name: person.name,
    course: person.course || "",
    photo: person.photo,
    link: person.link,
    role:
      person.role.trim() === ""
        ? t("people.roles.Ex Aluno Trilha")
        : person.role,
  }));

  const transformedPeople20242 = translatedOrg20242.map((person, index) => ({
    id: index,
    name: person.name,
    designation: person.role,
    image: person.photo,
    link: person.link,
  }));

  const transformedPeopleStudents20242 = translatedStudents20242.map((person) => ({
    name: person.name,
    course: person.course || "",
    photo: person.photo,
    link: person.link,
    role:
      person.role.trim() === ""
        ? t("people.roles.Ex Aluno Trilha")
        : person.role,
  }));

  const transformedPeople20251 = translatedOrg20251.map((person, index) => ({
    id: index,
    name: person.name,
    designation: person.role,
    image: person.photo,
    link: person.link,
  }));

  const transformedPeopleStudents20251 = translatedStudents20251.map((person) => ({
    name: person.name,
    course: person.course || "",
    photo: person.photo,
    link: person.link,
    role:
      person.role.trim() === ""
        ? t("people.roles.Ex Aluno Trilha")
        : person.role,
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
        <TurmaSection
          title={t("turmas.secondClass")}
          organizers={transformedPeople20242}
          students={transformedPeopleStudents20242}
        />
        <TurmaSection
          title={t("turmas.thirdClass")}
          organizers={transformedPeople20251}
          students={transformedPeopleStudents20251}
        />
      </div>
    </section>
  );
}
