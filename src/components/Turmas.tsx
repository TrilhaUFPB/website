"use client"

import { AnimatedTooltip } from "./ui/animated-tooltip";
import { peopleOrganization20242, peopleStudents20242 } from "@/data/people";
import TurmaSection from "./TurmaSection";

const courses = {
  "Ciência da Computação": "CC",
  "Engenharia da Computação": "EC",
  "Ciência de Dados e Inteligência Artificial": "CDIA",
};

const transformedPeople20242 = peopleOrganization20242.map((person, index) => ({
  id: index,
  name: person.name,
  designation: person.role,
  image: person.photo,
  link: person.link,
}));

const transformedPeopleStudents20242 = peopleStudents20242.map((person) => ({
  name: person.name,
  course: courses[person.course as keyof typeof courses],
  photo: person.photo,
  link: person.link,
  role: person.role.trim() === "" ? "Ex Aluno Trilha" : person.role,
}));

export default function Turmas() {
  return (
    <section id="quem-somos" className="py-20 bg-AzulMeiaNoite px-4 md:px-28 relative">
      <div
        className="absolute inset-0 grid pointer-events-none opacity-5 z-0"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
          gridTemplateRows: "repeat(auto-fit, 50px)",
        }}
      >
        {Array.from({ length: 700 }, (_, index) => (
          <div key={index} className="border border-gray-600"></div>
        ))}
      </div>

      <div className="px-6">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu fnt-poppins mb-2 z-10">Turmas</h2>
        <h1 className="text-3xl font-semibold text-center text-Branco font-poppins mb-6 z-10">
          Conheça nossos tutores e alunos de turmas anteriores
        </h1>

        <p className="text-2sm font-regular text-center text-Branco font-spaceGrotesk mb-8 z-10">
          Nós temos grande orgulho de nossas turmas anteriores e de nossos alunos. 
          Sempre apoiamos e incentivamos a conexão entre os alunos e tutores, e mantemos contato com todos até hoje.
          Nossas mentorias não são apenas para o período de aula, mas para a vida.

          Temos felicidade também em dizer que muitos de nossos alunos continuam a contribuir para a comunidade Trilha.
          Além disso, um impacto direto de nosso programa se encontra em nossos alunos que, logo após a finalização da turma,
          entram no mercado de trabalho e em projetos práticos, já com uma base sólida de conhecimento.
        </p>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center justify-center z-10">
        {/* Use the TurmaSection Component */}
        <TurmaSection
          title="Primeira Turma - 2024.2"
          organizers={transformedPeople20242}
          students={transformedPeopleStudents20242}
        />
      </div>
    </section>
  );
}
