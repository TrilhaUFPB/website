import Image from "next/image";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { FaQuoteLeft } from "react-icons/fa";
import DynamicGrid from "./DynamicGrid";

interface Testimonial {
  name: string;
  role: string;
  photo: string;
  text: string;
}

export default function Depoimentos() {
  const testimonials: Testimonial[] = [
    {
      name: "Pedro Kruta",
      role: "Desenvolvedor Web",
      photo: "pessoas/2024.1/kruta.png",
      text: "Os instrutores são muito dedicados e realmente se preocupam com o progresso dos alunos. Recomendo!",
    },
    {
      name: "Maria Clara Dantas",
      role: "Estudante de Ciências da Computação",
      photo: "pessoas/2024.1/clara.png",
      text: "Excelente experiência de aprendizado! O curso é muito bem estruturado e os instrutores são atenciosos.",
    },
    {
      name: "Luigi Smitgchi",
      role: "Engenheiro de Software",
      photo: "pessoas/2024.1/luigi.png",
      text: "Aprendi mais em poucas semanas do que em anos de estudo. Os instrutores tornam o aprendizado envolvente.",
    },
    {
      name: "Emyle Santos",
      role: "Especialista em Dados",
      photo: "pessoas/2024.1/emyle.png",
      text: "Recomendo a todos que querem evoluir. Os conteúdos são práticos e aplicáveis ao mercado de trabalho.",
    },
    {
      name: "Beatriz Pessôa",
      role: "Analista de Sistemas",
      photo: "pessoas/2024.1/bea.png",
      text: "A abordagem prática dos cursos me ajudou a aplicar o conhecimento diretamente no meu trabalho.",
    },
  ];

  const testimonialCards = testimonials.map((testimonial, index) => (
    <Card key={index} card={testimonial} index={index} />
  ));

  return (
    <section id="depoimentos" className="py-20 bg-Branco relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" />
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
      className={`border-4 p-6 rounded-3xl w-[270px] md:w-[500px] sm:w-[400px] mx-auto h-[370px] md:h-[300px] sm:h-[300px] ${borderClass}`}
    >

      {/* Upper content */}
      <div className="mb-12 flex flex-row items-center justify-between">

        {/* Left: Content */}
        <div className="w-full md:w-2/3 flex flex-col items-start justify-center">
          {/* Icon */}
          <FaQuoteLeft className={`text-1xl ${colorClass}`} />
        
          {/* Name */}
          <h3 className="text-4sm font-bold text-AzulMeiaNoite font-poppins mt-4">{card.name}</h3>

          {/* Role */}
          <p className="text-sm text-gray-600 font-poppins">{card.role}</p>

        </div>

        {/* Right: Image */}
        <div className={`rounded-full border-4 flex items-center justify-center mt-4 md:mt-0 ${borderClass}`}>
          <Image
            src={card.photo}
            alt={card.name}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>

      </div>

      {/* Lower content */}
      <div>

        {/* Testimonial Text */}
        <p className="text-center text-gray-700 text-2sm leading-relaxed font-spaceGrotesk mt-4">
          &quot;{card.text}&quot;
        </p>

      </div>
      
    </div>
  );
}

