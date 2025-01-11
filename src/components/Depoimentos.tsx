import Image from "next/image";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { FaQuoteLeft } from "react-icons/fa";
import DynamicGrid from "./DynamicGrid";

import { Person } from "@/data/people";
import { 
  MiguelQueiroz, Emyle, Marcus, LuisAranha,
  // Clara, Kruta, Artur, DaviGurgel, VitorReis, Luigi,
  // Bea, JoseVitor, NicolasKleiton, RafaelTorres,
 } from "@/data/people";

interface Testimonial {
  person: Person;
  text: string;
  textClassName?: string;
}

const EmyleTestimonial: Testimonial = {
  person: Emyle,
  text: "O Trilha foi uma experiência incrível. Se não fosse pelo projeto, dificilmente eu teria tido contato com tantos assuntos importantes de programação logo no meu primeiro período.  Ele não só me proporcionou uma base técnica, mas também me ajudou a desenvolver habilidades como trabalho em equipe e gestão de projeto, especialmente durante o hackathon, preparando-me para a vida profissional real",
};

const MiguelTestimonial: Testimonial = {
  person: MiguelQueiroz,
  text: "O Trilha foi de suma importância para a minha introdução ao curso de ciência da computação que, até então, estava sendo predominantemente teórico. As aulas semanais e o hackathon no fim do período transformaram a minha visão sobre a programação ao me fazer pôr em prática toda a teoria aprendida em sala. Fiquei muito feliz e grato por ter participado, por isso recomendo a todos que estão iniciando no curso!",
};

const LuisAranhaTestimonial: Testimonial = {
  person: LuisAranha,
  text: "O trilha foi uma experiência que me proporcionou muito aprendizado e conexão com pessoas importantes da área, explicando desde a base do que é programar e o que é uma linguagem de programação, em especial o Python, até como produzir um projeto em grupo com pessoas extremamente competentes que trilharam o caminho comigo. Acredito ter sido de grande importância para mim, visto que iniciei no curso de Ciência da Computação com um conhecimento quase nulo da área, e me proporcionou preencher esse vazio!",
};

const MarcusTestimonial: Testimonial = {
  person: Marcus,
  text: "Aqui, tive grandes experiências com coisas que sequer pensei que teria. Consegui aprender com pessoas que me inspiram e, do início ao fim, tive uma enorme satisfação em participar dessa trajetória.",
  textClassName: 'font-xl',
};

export default function Depoimentos() {

  const testimonials = [EmyleTestimonial, MiguelTestimonial, LuisAranhaTestimonial, MarcusTestimonial];

  const testimonialCards = testimonials.map((testimonial, index) => (
    <Card key={index} card={testimonial} index={index} />
  ));

  return (
    <section id="depoimentos" className="py-20 bg-Branco relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50}/>
      <div className="container mx-auto px-6">
        <h2 className="text-1xl font-bold text-center text-AzulCeu fnt-poppins mb-3">
          Depoimentos
        </h2>
        <h1 className=" text-3xl font-extrabold text-center text-AzulMeiaNoite mb-12 font-poppins ">
          O que nossos alunos têm a falar sobre o Trilha
        </h1>
        <Carousel items={testimonialCards} />
      </div>
    </section>
  );
}


function Card({ card, index }: { card: Testimonial; index: number }) {
  const borderClass = index % 2 === 0 ? "border-AzulEletrico" : "border-VerdeMenta";
  const colorClass = index % 2 === 0 ? "text-AzulEletrico" : "text-VerdeMenta";
  return (
    <div
      key={index}
      className={`overflow-hidden border-4 p-6 rounded-3xl w-[270px] md:w-[500px] sm:w-[400px] mx-auto h-[550px] md:h-[320px] sm:h-[320px] ${borderClass} bg-Branco z-30`}
    >

      {/* Upper content */}
      <div className="mb-2 flex flex-row items-center justify-between h-1/3">

        {/* Left: Content */}
        <div className="w-full md:w-2/3 flex flex-col items-start justify-center">
          {/* Icon */}
          <FaQuoteLeft className={`text-1xl ${colorClass}`} />
        
          {/* Name */}
          <h3 className="text-4sm font-bold text-AzulMeiaNoite font-poppins mt-4">{card.person.name}</h3>

          {/* Role */}
          <p className="text-sm text-gray-600 font-poppins">{card.person.role}</p>

        </div>

        {/* Right: Image */}
        <div className={`rounded-full border-4 flex items-center justify-center mt-4 md:mt-0 ${borderClass}`}>
          <Image
            src={card.person.photo}
            alt={card.person.name}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>

      </div>

      {/* Lower content */}
      <div className="flex flex-col items-center justify-center h-2/3">

        {/* Testimonial Text */}
        <p 
        className={
          `text-center text-gray-700 leading-relaxed font-spaceGrotesk mt-0 ${
          card.textClassName || 'text-xs'}`
        }
        >
          &quot;{card.text}&quot;
        </p>

      </div>
      
    </div>
  );
}

