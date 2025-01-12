import Image from "next/image";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { FaQuoteLeft } from "react-icons/fa";
import DynamicGrid from "./DynamicGrid";

import { Person } from "@/data/people";
import { 
  MiguelQueiroz, Emyle, Marcus, LuisAranha,
  Clara, Kruta, Luigi, NicolasKleiton, Bea,
  DaviGurgel, Artur, VitorReis,
  // JoseVitor, RafaelTorres,
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

const ClaraTestimonial: Testimonial = {
  person: Clara,
  text: 'A experiência que o Trilha proporcionou foi simplesmente única. O projeto me ajudou a crescer tanto como estudante quanto como pessoa, me ensinando a ser mais focada e a trabalhar melhor em equipe. Mais do que isso, conhecer pessoas incríveis e ouvir histórias inspiradoras mudou totalmente a forma como eu vejo a área. Sou muito grata a todos os envolvidos, porque o Trilha marcou profundamente minha vida, tanto no lado pessoal quanto no acadêmico.',
};

const KrutaTestimonial: Testimonial = {
  person: Kruta,
  text: "O programa Trilha foi um pilar fundamental para a minha formação nesse início de graduação. Nele, tive a oportunidade de conhecer novas pessoas, construir amizades valiosas e adquirir muito conhecimento, tanto na parte técnica quanto no trabalho em equipe e na convivência em grupo.",
};

const LuigiTestimonial: Testimonial = {
  person: Luigi,
  text: "O Trilha me ajudou a construir uma base sólida e a trilhar um caminho de aprendizado que passa pelos conceitos principais necessários para entrar em um primeiro projeto real. Através dele, desenvolvi habilidades práticas e teóricas que foram fundamentais para minha jornada, me preparando para desafios como aqueles que enfrento atualmente na Moises. Essa experiência não apenas reforçou minha confiança, mas também abriu portas para projetos mais complexos, onde posso aplicar os conhecimentos recebidos e impactar o mundo.",
};

const NicolasKleitonTestimonial: Testimonial = {
  person: NicolasKleiton,
  text: "Participar do trilha foi uma experiência incrível pra mim, especialmente porque eu tinha acabado de entrar na universidade, não conhecia ninguém e, nesse tempo, pude conhecer pessoas incríveis. O trilha foi essencial para colocar em prática o que aprendemos, principalmente durante o hackathon. Sou muito grato ao trilha por tudo. Tenho certeza de que essa experiência não foi importante apenas pra mim, mas também para todos que tiveram a chance de participar.",
};

const BeaTestimonial: Testimonial = {
  person: Bea,
  text: "Vivenciar o Trilha foi um marco no início da minha trajetória na Ciência da Computação. O projeto não apenas me apresentou os fundamentos da programação, mas também me deu a confiança para explorar a área com mais segurança. A experiência prática e o aprendizado em equipe foram transformadores, mostrando a importância de colaborar e crescer junto com outras pessoas. O Trilha foi uma parte especial desse começo, e sou muito grata por ter feito parte dessa jornada.",
};

const DaviGurgelTestimonial: Testimonial = {
  person: DaviGurgel,
  text: "O Trilha foi essencial para o meu início de curso e me proporcionou uma base muito sólida do que vou precisar para uma boa formação como estudante e profissional. A experiência foi indispensável para mim, pois entrei no curso com pouca base de programação e acredito que o Trilha me fez alcançar um nível que eu talvez demoraria vários meses a mais para atingir, sem a mentoria. Além disso, durante esse projeto conheci pessoas incríveis, com quem tenho vontade de manter contato pelo resto da minha vida. Por isso, sou muito grato por ter participado da primeira edição do Trilha.",
};

const ArturTestimonial: Testimonial = {
  person: Artur,
  text: "O Trilha foi essencial para me ajudar a construir uma base sólida nos conceitos básicos de programação e a seguir um caminho estruturado de aprendizado nas diversas áreas possíveis do ramo, abrangendo os principais conceitos necessários para ingressar em projetos reais. Durante essa jornada, desenvolvi habilidades práticas e teóricas que foram de suma importância para a minha evolução. Ter experiências com profissionais reconhecidos no mercado e com ex-alunos foi, para mim, a parte mais engrandecedora do projeto. Estou extremamente feliz por ter tido essa oportunidade singular!",
};

const VitorReisTestimonial: Testimonial = {
  person: VitorReis,
  text: "O Trilha foi uma experiência incrível pra mim, na qual aprendi muita coisa no ramo da programação, desde o básico até conceitos mais avançados, e tive minha primeira experiência em um trabalho em equipe no hackathon. Além disso, pude conhecer pessoas incríveis, as quais sou extremamente grato por terem feito minhas sextas-feiras mais felizes durante o Trilha.",
};

export default function Depoimentos() {

  const testimonials = [KrutaTestimonial, EmyleTestimonial, LuigiTestimonial, 
    BeaTestimonial, MiguelTestimonial, 
    LuisAranhaTestimonial, MarcusTestimonial, 
    ClaraTestimonial, NicolasKleitonTestimonial, 
    DaviGurgelTestimonial, ArturTestimonial, VitorReisTestimonial];

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
      className={`overflow-hidden border-4 p-6 rounded-3xl w-[270px] md:w-[500px] sm:w-[400px] mx-auto h-[560px] md:h-[330px] sm:h-[330px] ${borderClass} bg-Branco z-30`}
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

