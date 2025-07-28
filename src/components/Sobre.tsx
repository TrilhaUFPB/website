"use client";

import Image from "next/image";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";

// Slideshow component with optional captions
function Slideshow({ 
  images, 
  alt, 
  className, 
  captions 
}: { 
  images: string[], 
  alt: string, 
  className?: string,
  captions?: string[]
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={alt}
            width={800}
            height={600}
            className="rounded-xl w-full h-full object-cover"
          />
          {/* Caption overlay */}
          {captions && captions[index] && (
            <div className="absolute bottom-4 right-4 bg-Branco/30 bg-opacity-90 text-black px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-white border-opacity-20">
              <p className="text-sm font-bold">{captions[index]}</p>
            </div>
          )}
        </div>
      ))}
      {/* Placeholder to maintain aspect ratio */}
      <div className="w-full h-0 pb-[75%]"></div>
    </div>
  );
}

export default function Sobre() {
  const { t } = useTranslation();

  // Define image arrays for each slideshow
  const turmasImages = ["/turmas/trilha2024.JPG", "/turmas/trilha20242.jpeg"];
  const aulasImages = ["/aulas/aulas.jpeg", "/aulas/luigi.jpg"];
  const palestrasImages = [
    "/palestras/jp_honorato.jpeg",
    "/palestras/herval.jpeg", 
    "/palestras/itamar.JPG",
    "/palestras/lara.JPG",
    "/palestras/terron.png"
  ];
  const objetivosImages = ["/objetivos/aulaTrilha.JPG", "/objetivos/festa.JPG"];

  // Define captions for palestras
  const palestrasCaptions = [
    "João Pedro (Microsoft, Ex UFPB) e Felipe Honorato (Moises, Ex UFPB)",
    "Herval Freire (Maestro, Ex Meta, Twitter, UFPB)",
    "Itamar Rocha (Harvard, Ex Meta, Google, UFPB)",
    "Lara Pontes (MIT, Ex UFPB)",
    "Rodrigo Terron (Newhack Founder, Ex RocketSeat CEO, Forbes Under 30)"
  ];

  return (
    <section
      id="sobre"
      className="py-20 bg-AzulMeiaNoite flex w-full overflow-hidden relative"
    >
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50} />
      <div className="container mx-auto px-12">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu font-poppins mb-2">
          {t("sobre.title")}
        </h2>
        <p className="text-3xl font-semibold text-center text-Branco font-poppins mb-16">
          {t("sobre.subtitle")}
        </p>

        <div className="gap-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-VerdeMenta p-4 lg:p-10 rounded-2xl shadow-lg lg:flex-[4] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <h3 className="font-poppins font-extrabold text-xl text-BrancoCreme lg:text-3xl mb-2 mt-2 lg:mb-4 lg:mt-2">
                {t("sobre.origin.title")}
              </h3>
              <p className="text-BrancoCreme mb-4 text-sm lg:text-xl font-bold font-spaceGrotesk">
                {t("sobre.origin.description")}
              </p>
              <button
                className="px-[10px] text-sm py-1 lg:px-4 lg:py-2 bg-AzulMeiaNoite text-BrancoCreme font-semibold rounded-md hover:bg-Branco hover:text-VerdeMenta duration-500"
                onClick={() =>
                  document
                    .getElementById("quem-somos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("sobre.origin.button")}
              </button>
              <Slideshow
                images={turmasImages}
                alt="imagem turmas"
                className="mt-4 mb-2 lg:mt-4"
              />
            </div>

            <div className="bg-AzulEletrico p-4 lg:p-10 rounded-2xl shadow-lg flex-grow lg:flex-[5] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <Slideshow
                images={aulasImages}
                alt="imagem aulas"
                className="lg:mt-4"
              />
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-4">
                {t("sobre.classes.title")}
              </h3>
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                {t("sobre.classes.description")}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <div className="bg-AzulEletrico p-4 lg:p-10 rounded-2xl shadow-lg flex-grow lg:flex-[12] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-2">
                {t("sobre.events.title")}
              </h3>
              <Slideshow
                images={palestrasImages}
                alt="imagem palestra"
                className="mb-4 lg:mb-4"
                captions={palestrasCaptions}
              />
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                {t("sobre.events.description")}
              </p>
            </div>

            <div className="bg-AzulCeu p-4 lg:p-10 rounded-2xl shadow-lg flex-grow lg:flex-[11] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-2">
                {t("sobre.goals.title")}
              </h3>
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                {t("sobre.goals.description")}
              </p>
              <Slideshow
                images={objetivosImages}
                alt="imagem aula pratica"
                className="mt-4 mb-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
