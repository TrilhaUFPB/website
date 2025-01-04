import Image from "next/image";
import { Carousel } from "@/components/ui/apple-cards-carousel";

import { FaQuoteLeft } from "react-icons/fa"; 

function Card({ card, index }: { card: any; index: number }) {
  return (
    <div
      key={index}
      className="border border-gray-300 p-6 rounded-2xl flex flex-col md:flex-row items-center w-full md:w-[500px] mx-auto h-auto md:h-[400px]"
    >
      {/* Left: Image */}
      <div className="w-full md:w-1/3 h-40 md:h-full flex items-center">
        <Image
          src={card.photo}
          alt={card.name}
          width={150}
          height={150}
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:w-2/3 flex flex-col items-start justify-center pl-0 md:pl-6 space-y-4 mt-4 md:mt-0">
        {/* Icon */}
        <FaQuoteLeft className="text-gray-400 text-1xl" />

        {/* Testimonial Text */}
        <p className="text-gray-700 text-sm leading-relaxed">"{card.text}"</p>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800">{card.name}</h3>

        {/* Role */}
        <p className="text-sm text-gray-600">{card.role}</p>
      </div>
    </div>
  );
}

export default function Depoimentos() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Estudante de Ciências da Computação",
      photo: "https://via.placeholder.com/150?text=Maria", // Mock image for Maria
      text: "Excelente experiência de aprendizado! O curso é muito bem estruturado e os instrutores são atenciosos.",
    },
    {
      name: "João Santos",
      role: "Desenvolvedor Web",
      photo: "https://via.placeholder.com/150?text=Joao", // Mock image for João
      text: "Os instrutores são muito dedicados e realmente se preocupam com o progresso dos alunos. Recomendo!",
    },
    {
      name: "Ana Oliveira",
      role: "Especialista em Dados",
      photo: "https://via.placeholder.com/150?text=Ana", // Mock image for Ana
      text: "Recomendo a todos que querem evoluir. Os conteúdos são práticos e aplicáveis ao mercado de trabalho.",
    },
    {
      name: "Lucas Pereira",
      role: "Engenheiro de Software",
      photo: "https://via.placeholder.com/150?text=Lucas", // Mock image for Lucas
      text: "Aprendi mais em poucas semanas do que em anos de estudo. Os instrutores tornam o aprendizado envolvente.",
    },
    {
      name: "Beatriz Costa",
      role: "Analista de Sistemas",
      photo: "https://via.placeholder.com/150?text=Beatriz", // Mock image for Beatriz
      text: "A abordagem prática dos cursos me ajudou a aplicar o conhecimento diretamente no meu trabalho.",
    },
  ];  

  const testimonialCards = testimonials.map((testimonial, index) => (
    <Card key={index} card={testimonial} index={index} />
  ));

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Depoimentos
        </h2>
        <Carousel items={testimonialCards} />
      </div>
    </section>
  );
}