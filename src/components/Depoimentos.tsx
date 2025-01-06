import Image from "next/image";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { FaQuoteLeft } from "react-icons/fa";

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
      photo: "pessoas/kruta.png",
      text: "Os instrutores são muito dedicados e realmente se preocupam com o progresso dos alunos. Recomendo!",
    },
    {
      name: "Maria Clara Dantas",
      role: "Estudante de Ciências da Computação",
      photo: "pessoas/clara.png",
      text: "Excelente experiência de aprendizado! O curso é muito bem estruturado e os instrutores são atenciosos.",
    },
    {
      name: "Luigi Smitgchi",
      role: "Engenheiro de Software",
      photo: "pessoas/luigi.png",
      text: "Aprendi mais em poucas semanas do que em anos de estudo. Os instrutores tornam o aprendizado envolvente.",
    },
    {
      name: "Emyle Santos",
      role: "Especialista em Dados",
      photo: "pessoas/emyle.png",
      text: "Recomendo a todos que querem evoluir. Os conteúdos são práticos e aplicáveis ao mercado de trabalho.",
    },
    {
      name: "Beatriz Pessoa",
      role: "Analista de Sistemas",
      photo: "pessoas/bea.png",
      text: "A abordagem prática dos cursos me ajudou a aplicar o conhecimento diretamente no meu trabalho.",
    },
  ];

  const testimonialCards = testimonials.map((testimonial, index) => (
    <Card key={index} card={testimonial} index={index} />
  ));

  return (
    <section id="depoimentos" className="py-20 bg-Branco">
      <div className="container mx-auto px-6">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu fnt-poppins mb-2">
          Depoimentos
        </h2>
        <h1 className="text-3xl font-bold text-center text-AzulMeiaNoite mb-4 font-poppins">
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
      className={`border p-6 rounded-2xl flex flex-col md:flex-row items-center w-full md:w-[500px] mx-auto h-auto md:h-[400px] ${
        borderClass
      }`}
    >
      {/* Left: Image */}
      <div className="w-full md:w-1/2 h-40 md:h-full flex items-center">
        <Image
          src={card.photo}
          alt={card.name}
          width={150}
          height={150}
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center pl-0 md:pl-6 mt-4 md:mt-0">
        {/* Icon */}
        <FaQuoteLeft className={`text-1xl ${colorClass}`}/>

        {/* Testimonial Text */}
        <p className="text-gray-700 text-2sm leading-relaxed font-spaceGrotesk mt-4">
          &quot;{card.text}&quot;
        </p>

        {/* Name */}
        <h3 className="text-4sm font-semibold text-AzulMeiaNoite font-poppins mt-4">{card.name}</h3>

        {/* Role */}
        <p className="text-sm text-gray-600 font-poppins">{card.role}</p>
      </div>
    </div>
  );
}
