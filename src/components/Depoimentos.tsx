/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { FaQuoteLeft } from "react-icons/fa";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";

import { Person } from "@/data/people";
import {
  MiguelQueiroz,
  Emyle,
  Marcus,
  LuisAranha,
  Clara,
  Kruta,
  Luigi,
  NicolasKleiton,
  Bea,
  DaviGurgel,
  Artur,
  VitorReis,
  RafaelTorres,
  // JoseVitor, RafaelTorres,
} from "@/data/people";
import { useTranslatedPeople } from "@/data/people-i18n";

interface Testimonial {
  person: Person;
  text: string;
  textClassName?: string;
}

// The translated testimonials in English
const enTestimonials = {
  Emyle:
    "Trilha was an incredible experience. If it weren't for the project, I would hardly have come into contact with so many important programming topics in my first semester. It not only provided me with a technical foundation, but also helped me develop skills such as teamwork and project management, especially during the hackathon, preparing me for real professional life.",
  Miguel:
    "Trilha was of paramount importance for my introduction to the computer science course which, until then, was predominantly theoretical. The weekly classes and the hackathon at the end of the period transformed my view of programming by making me put into practice all the theory learned in class. I was very happy and grateful to have participated, so I recommend it to everyone who is starting the course!",
  LuisAranha:
    "Trilha was an experience that provided me with a lot of learning and connection with important people in the field, explaining everything from the basics of what programming is and what a programming language is, especially Python, to how to produce a group project with extremely competent people who walked the path with me. I believe it was of great importance to me, since I started the Computer Science course with almost zero knowledge of the area, and it helped me fill this void!",
  Marcus:
    "Here, I had great experiences with things I never thought I would have. I was able to learn from people who inspire me and, from beginning to end, I had enormous satisfaction in participating in this journey.",
  Clara:
    "The experience that Trilha provided was simply unique. The project helped me grow both as a student and as a person, teaching me to be more focused and to work better in teams. More than that, meeting incredible people and hearing inspiring stories completely changed the way I see the field. I am very grateful to everyone involved, because Trilha has profoundly marked my life, both personally and academically.",
  Kruta:
    "The Trilha program was a fundamental pillar for my education at the beginning of my undergraduate studies. In it, I had the opportunity to meet new people, build valuable friendships and acquire a lot of knowledge, both in the technical part and in teamwork and group interaction.",
  Luigi:
    "Trilha helped me build a solid foundation and forge a learning path that covers the main concepts needed to enter a first real project. Through it, I developed practical and theoretical skills that were fundamental to my journey, preparing me for challenges like those I currently face at Moises. This experience not only reinforced my confidence, but also opened doors to more complex projects, where I can apply the knowledge received and impact the world.",
  NicolasKleiton:
    "Participating in Trilha was an incredible experience for me, especially because I had just entered university, didn't know anyone, and during that time, I was able to meet amazing people. Trilha was essential for putting what we learned into practice, especially during the hackathon. I am very grateful to Trilha for everything. I am sure that this experience was not only important for me but also for everyone who had the chance to participate.",
  Bea: "Experiencing Trilha was a milestone at the beginning of my journey in Computer Science. The project not only introduced me to the fundamentals of programming, but also gave me the confidence to explore the field with more security. The practical experience and team learning were transformative, showing the importance of collaborating and growing with other people. Trilha was a special part of this beginning, and I am very grateful to have been part of this journey.",
  DaviGurgel:
    "Trilha was essential for my beginning of the course and provided me with a very solid foundation of what I will need for good training as a student and professional. The experience was indispensable for me, as I entered the course with little programming background and I believe that Trilha made me reach a level that I might have taken several more months to reach without mentoring. Additionally, during this project I met incredible people, with whom I want to stay in touch for the rest of my life. That's why I'm very grateful to have participated in the first edition of Trilha.",
  Artur:
    "Trilha was essential to help me build a solid foundation in the basic concepts of programming and to follow a structured learning path in the various possible areas of the field, covering the main concepts necessary to enter real projects. During this journey, I developed practical and theoretical skills that were of paramount importance to my evolution. Having experiences with recognized professionals in the market and with former students was, for me, the most enriching part of the project. I am extremely happy to have had this unique opportunity!",
  VitorReis:
    "Trilha was an incredible experience for me, in which I learned a lot in the field of programming, from the basics to more advanced concepts, and had my first experience in teamwork during the hackathon. In addition, I was able to meet incredible people, to whom I am extremely grateful for making my Fridays happier during Trilha.",
  RafaelTorres:
    "Trilha was a transformative experience for me. The project not only helped me build a solid foundation, but also provided contact with very important subjects that I would hardly have known otherwise. Participating in Trilha at the beginning of the course was certainly one of the best decisions I made, I am very grateful to have participated.",
};

// The original Portuguese testimonials
const ptTestimonials = {
  Emyle:
    "O Trilha foi uma experiência incrível. Se não fosse pelo projeto, dificilmente eu teria tido contato com tantos assuntos importantes de programação logo no meu primeiro período.  Ele não só me proporcionou uma base técnica, mas também me ajudou a desenvolver habilidades como trabalho em equipe e gestão de projeto, especialmente durante o hackathon, preparando-me para a vida profissional real",
  Miguel:
    "O Trilha foi de suma importância para a minha introdução ao curso de ciência da computação que, até então, estava sendo predominantemente teórico. As aulas semanais e o hackathon no fim do período transformaram a minha visão sobre a programação ao me fazer pôr em prática toda a teoria aprendida em sala. Fiquei muito feliz e grato por ter participado, por isso recomendo a todos que estão iniciando no curso!",
  LuisAranha:
    "O trilha foi uma experiência que me proporcionou muito aprendizado e conexão com pessoas importantes da área, explicando desde a base do que é programar e o que é uma linguagem de programação, em especial o Python, até como produzir um projeto em grupo com pessoas extremamente competentes que trilharam o caminho comigo. Acredito ter sido de grande importância para mim, visto que iniciei no curso de Ciência da Computação com um conhecimento quase nulo da área, e me proporcionou preencher esse vazio!",
  Marcus:
    "Aqui, tive grandes experiências com coisas que sequer pensei que teria. Consegui aprender com pessoas que me inspiram e, do início ao fim, tive uma enorme satisfação em participar dessa trajetória.",
  Clara:
    "A experiência que o Trilha proporcionou foi simplesmente única. O projeto me ajudou a crescer tanto como estudante quanto como pessoa, me ensinando a ser mais focada e a trabalhar melhor em equipe. Mais do que isso, conhecer pessoas incríveis e ouvir histórias inspiradoras mudou totalmente a forma como eu vejo a área. Sou muito grata a todos os envolvidos, porque o Trilha marcou profundamente minha vida, tanto no lado pessoal quanto no acadêmico.",
  Kruta:
    "O programa Trilha foi um pilar fundamental para a minha formação nesse início de graduação. Nele, tive a oportunidade de conhecer novas pessoas, construir amizades valiosas e adquirir muito conhecimento, tanto na parte técnica quanto no trabalho em equipe e na convivência em grupo.",
  Luigi:
    "O Trilha me ajudou a construir uma base sólida e a trilhar um caminho de aprendizado que passa pelos conceitos principais necessários para entrar em um primeiro projeto real. Através dele, desenvolvi habilidades práticas e teóricas que foram fundamentais para minha jornada, me preparando para desafios como aqueles que enfrento atualmente na Moises. Essa experiência não apenas reforçou minha confiança, mas também abriu portas para projetos mais complexos, onde posso aplicar os conhecimentos recebidos e impactar o mundo.",
  NicolasKleiton:
    "Participar do trilha foi uma experiência incrível pra mim, especialmente porque eu tinha acabado de entrar na universidade, não conhecia ninguém e, nesse tempo, pude conhecer pessoas incríveis. O trilha foi essencial para colocar em prática o que aprendemos, principalmente durante o hackathon. Sou muito grato ao trilha por tudo. Tenho certeza de que essa experiência não foi importante apenas pra mim, mas também para todos que tiveram a chance de participar.",
  Bea: "Vivenciar o Trilha foi um marco no início da minha trajetória na Ciência da Computação. O projeto não apenas me apresentou os fundamentos da programação, mas também me deu a confiança para explorar a área com mais segurança. A experiência prática e o aprendizado em equipe foram transformadores, mostrando a importância de colaborar e crescer junto com outras pessoas. O Trilha foi uma parte especial desse começo, e sou muito grata por ter feito parte dessa jornada.",
  DaviGurgel:
    "O Trilha foi essencial para o meu início de curso e me proporcionou uma base muito sólida do que vou precisar para uma boa formação como estudante e profissional. A experiência foi indispensável para mim, pois entrei no curso com pouca base de programação e acredito que o Trilha me fez alcançar um nível que eu talvez demoraria vários meses a mais para atingir, sem a mentoria. Além disso, durante esse projeto conheci pessoas incríveis, com quem tenho vontade de manter contato pelo resto da minha vida. Por isso, sou muito grato por ter participado da primeira edição do Trilha.",
  Artur:
    "O Trilha foi essencial para me ajudar a construir uma base sólida nos conceitos básicos de programação e a seguir um caminho estruturado de aprendizado nas diversas áreas possíveis do ramo, abrangendo os principais conceitos necessários para ingressar em projetos reais. Durante essa jornada, desenvolvi habilidades práticas e teóricas que foram de suma importância para a minha evolução. Ter experiências com profissionais reconhecidos no mercado e com ex-alunos foi, para mim, a parte mais engrandecedora do projeto. Estou extremamente feliz por ter tido essa oportunidade singular!",
  VitorReis:
    "O Trilha foi uma experiência incrível pra mim, na qual aprendi muita coisa no ramo da programação, desde o básico até conceitos mais avançados, e tive minha primeira experiência em um trabalho em equipe no hackathon. Além disso, pude conhecer pessoas incríveis, as quais sou extremamente grato por terem feito minhas sextas-feiras mais felizes durante o Trilha.",
  RafaelTorres:
    "O Trilha foi uma experiência transformadora para mim. O projeto não apenas me ajudou a construir uma base sólida, mas também proporcionou contato com assuntos muito importantes, que dificilmente eu conheceria de outra forma. Participar do Trilha no início do curso foi com certeza uma das melhores decisões que tomei, sou muito grato por ter participado.",
};

export default function Depoimentos() {
  const { t, locale } = useTranslation();
  const { translatePerson } = useTranslatedPeople();

  // Determine the appropriate testimonials based on locale
  const testimonialTexts = locale === "en" ? enTestimonials : ptTestimonials;

  // Create testimonials with translated person info and testimonial text from the direct object
  const EmyleTestimonial: Testimonial = {
    person: translatePerson(Emyle),
    text: testimonialTexts.Emyle,
    textClassName: "",
  };

  const MiguelTestimonial: Testimonial = {
    person: translatePerson(MiguelQueiroz),
    text: testimonialTexts.Miguel,
    textClassName: "",
  };

  const LuisAranhaTestimonial: Testimonial = {
    person: translatePerson(LuisAranha),
    text: testimonialTexts.LuisAranha,
    textClassName: "",
  };

  const MarcusTestimonial: Testimonial = {
    person: translatePerson(Marcus),
    text: testimonialTexts.Marcus,
    textClassName: "font-xl",
  };

  const ClaraTestimonial: Testimonial = {
    person: translatePerson(Clara),
    text: testimonialTexts.Clara,
    textClassName: "",
  };

  const KrutaTestimonial: Testimonial = {
    person: translatePerson(Kruta),
    text: testimonialTexts.Kruta,
    textClassName: "",
  };

  const LuigiTestimonial: Testimonial = {
    person: translatePerson(Luigi),
    text: testimonialTexts.Luigi,
    textClassName: "",
  };

  const NicolasKleitonTestimonial: Testimonial = {
    person: translatePerson(NicolasKleiton),
    text: testimonialTexts.NicolasKleiton,
    textClassName: "",
  };

  const BeaTestimonial: Testimonial = {
    person: translatePerson(Bea),
    text: testimonialTexts.Bea,
    textClassName: "",
  };

  const DaviGurgelTestimonial: Testimonial = {
    person: translatePerson(DaviGurgel),
    text: testimonialTexts.DaviGurgel,
    textClassName: "",
  };

  const ArturTestimonial: Testimonial = {
    person: translatePerson(Artur),
    text: testimonialTexts.Artur,
    textClassName: "",
  };

  const VitorReisTestimonial: Testimonial = {
    person: translatePerson(VitorReis),
    text: testimonialTexts.VitorReis,
    textClassName: "",
  };

  const RafaelTorresTestimonial: Testimonial = {
    person: translatePerson(RafaelTorres),
    text: testimonialTexts.RafaelTorres,
    textClassName: "",
  };

  const testimonials = [
    KrutaTestimonial,
    EmyleTestimonial,
    LuigiTestimonial,
    BeaTestimonial,
    MiguelTestimonial,
    MarcusTestimonial,
    ClaraTestimonial,
    VitorReisTestimonial,
    RafaelTorresTestimonial,
  ];

  const testimonialCards = testimonials.map((testimonial, index) => (
    <Card key={index} card={testimonial} index={index} />
  ));

  return (
    <section id="depoimentos" className="py-20 bg-Branco relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50} />
      <div className="container mx-auto px-6">
        <h2 className="text-1xl font-bold text-center text-AzulCeu fnt-poppins mb-3">
          {t("depoimentos.title")}
        </h2>
        <h1 className=" text-3xl font-extrabold text-center text-AzulMeiaNoite mb-12 font-poppins ">
          {t("depoimentos.subtitle")}
        </h1>
        <Carousel items={testimonialCards} />
      </div>
    </section>
  );
}

function Card({ card, index }: { card: Testimonial; index: number }) {
  const borderClass =
    index % 2 === 0 ? "border-AzulEletrico" : "border-VerdeMenta";
  const colorClass = index % 2 === 0 ? "text-AzulEletrico" : "text-VerdeMenta";
  return (
    <div
      key={index}
      className={`overflow-hidden border-4 p-6 rounded-3xl w-[270px] md:w-[500px] sm:w-[400px] mx-auto h-[570px] md:h-[340px] sm:h-[340px] ${borderClass} bg-Branco z-30`}
    >
      {/* Upper content */}
      <div className="mb-2 flex flex-row items-center justify-between h-1/3">
        {/* Left: Content */}
        <div className="w-full md:w-2/3 flex flex-col items-start justify-center">
          {/* Icon */}
          <FaQuoteLeft className={`text-1xl ${colorClass}`} />

          {/* Name */}
          <h3 className="text-4sm font-bold text-AzulMeiaNoite font-poppins mt-4">
            {card.person.name}
          </h3>

          {/* Role */}
          <p className="text-sm text-gray-600 font-poppins">
            {card.person.role}
          </p>
        </div>

        {/* Right: Image */}
        <div
          className={`rounded-full border-4 flex items-center justify-center mt-4 md:mt-0 ${borderClass}`}
        >
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
          className={`text-center text-gray-700 leading-relaxed font-spaceGrotesk mt-0 ${
            card.textClassName || "text-xs"
          }`}
        >
          &quot;{card.text}&quot;
        </p>
      </div>
    </div>
  );
}
