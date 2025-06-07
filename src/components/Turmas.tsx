"use client";

import TurmaSection from "./TurmaSection";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";
import { useTranslatedPeople } from "@/data/people-i18n";
import { classes } from "@/data/classes";

export default function Turmas() {
  const { t } = useTranslation();
  const { translatePerson } = useTranslatedPeople();

  const transformOrganizers = (org: any[]) =>
    org.map((person, index) => {
      const translated = translatePerson(person);
      return {
        id: index,
        name: translated.name,
        designation: translated.role,
        image: translated.photo,
        link: translated.link,
      };
    });

  const transformStudents = (students: any[]) =>
    students.map((person) => {
      const translated = translatePerson(person);
      return {
        name: translated.name,
        course: translated.course || "",
        photo: translated.photo,
        link: translated.link,
        role:
          translated.role.trim() === ""
            ? t("people.roles.Ex Aluno Trilha")
            : translated.role,
      };
    });

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

      <div className="container mx-auto px-6 flex flex-col items-center justify-center z-10 gap-8">
        {classes.map((cls) => {
          const org = transformOrganizers(cls.organizers);
          const stu = transformStudents(cls.students);
          return (
            <TurmaSection
              key={cls.id}
              title={t(`classPages.${cls.id.replace('.', '_')}.title`)}
              organizers={org}
              students={stu}
              detailsLink={`/classes/${cls.id}`}
            />
          );
        })}
      </div>
    </section>
  );
}
