"use client"

import { useState } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { ChevronDown } from "lucide-react";

const TurmaSection = ({
  title,
  organizers,
  students,
}: {
  title: string;
  organizers: { id: number; name: string; designation: string; image: string; link?: string }[];
  students: { name: string; course: string; photo: string; link?: string; role: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-2 border-AzulMeiaNoite rounded-3xl py-4 px-6 w-full bg-Branco/5 text-Branco relative">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center cursor-pointer flex-row px-4 p-4 bg-AzulCeu rounded-lg z-20"
        onClick={toggleAccordion}
      >
        <h1 className="text-2xl font-bold text-Branco font-poppins text-center">{title}</h1>
        <button
          className="text-Branco font-bold text-lg focus:outline-none"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the entire accordion
            toggleAccordion();
          }}
        >
          <ChevronDown
            className={`transform transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>

      {/* Accordion Content */}
      <div
        className={`transition-all duration-500 ${
          isOpen ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-0 px-4 py-4">
          {/* Organizers Section */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-1xl font-semibold text-center font-poppins mb-4">Organização:</h2>
            <div className="flex flex-row items-center justify-center w-full">
              <AnimatedTooltip items={organizers} />
            </div>
          </div>

          {/* Students Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-1xl font-semibold text-center font-poppins mb-6 gap-2">Alunos:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-4 md:px-4 lg:px-20">
              {students.map((student, index) => (
                <div key={index} className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full border-0 border-AzulMeiaNoite overflow-hidden mb-2">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-full h-full object-cover z-10"
                    />
                  </div>
                  <h3 className="text-center font-bold font-poppins text-sm w-full truncate">
                    {student.name.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <p className="text-center font-spaceGrotesk text-xs font-semibold">{student.course}</p>
                  <hr className="border-t border-Branco w-3/4 my-1" />
                  <p className="text-center font-spaceGrotesk text-xs font-semibold">{student.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurmaSection;
