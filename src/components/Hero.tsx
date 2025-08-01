"use client";

import Navbar from "@/components/NavBar";
import { FlipWords } from "./ui/flip-words";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden flex flex-col bg-Branco">
      <BackgroundBeamsWithCollision className="relative overflow-hidden flex flex-col bg-Branco w-full">
        <Navbar />

        <DynamicGrid
          cellSize={50}
          className="opacity-5 z-0"
          numberOfCells={50}
        />

        {/* Main Hero Section */}
        <div className="h-[90vh] relative overflow-hidden flex items-center justify-center">
          <div className="relative container mx-auto px-6 text-center z-10 max-w-[60%] flex flex-col items-center">
            <h1
              className="font-poppins text-5xl md:text-6xl font-semibold mb-2 text-AzulMeiaNoite select-none"
              style={{
                display: "inline-block",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <span className="text-VerdeMenta">
                {t("hero.title").split(":")[0]}:
              </span>{" "}
              {t("hero.title").split(":")[1]}
            </h1>
            <div>
              <FlipWords
                words={t("hero.words")}
                duration={1000}
                className="font-poppins text-5xl md:text-6xl font-semibold mb-2 text-AzulMeiaNoite select-none"
              />
            </div>
            <p className="font-spaceGrotesk text-neutral-600 mb-8 text-lg md:text-2xl max-w-[100%] md:max-w-[80%] align-middle">
              {t("hero.description")}
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                className="bg-VerdeMenta text-white font-bold py-2 px-4 rounded hover:bg-AzulEletrico transition duration-300"
                onClick={() => {
                  const aboutSection = document.getElementById("sobre");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {t("hero.button")}
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
