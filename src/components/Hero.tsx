import Navbar from '@/components/NavBar'
import { FlipWords } from "./ui/flip-words";
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision';

export default function Hero() {
  return (
    <div className="relative overflow-hidden flex flex-col bg-Branco">
      <BackgroundBeamsWithCollision className="relative overflow-hidden flex flex-col bg-Branco w-full">
      <Navbar />

      <div
          className="absolute inset-0 grid pointer-events-none opacity-20 z-0"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))", 
            gridTemplateRows: "repeat(auto-fit, 50px)", 
          }}
        >
          {Array.from({ length: 420 }, (_, index) => (
            <div key={index} className="border border-gray-300"></div>
          ))}
        </div>

      <div className="h-[90vh] relative overflow-hidden flex items-center justify-center">
        <div className="relative container mx-auto px-6 text-center z-10 max-w-[60%] flex flex-col items-center">
            <h1
            className="font-poppins text-5xl md:text-6xl font-semibold mb-2 text-AzulMeiaNoite select-none"
            style={{
              display: "inline-block", // Keeps the layout adaptive
              transition: "all 0.3s ease-in-out", // Smooth transition for position and size
            }}
            >
            Trilha: Seu Caminho para
            </h1>
            <div>
            <FlipWords 
              words={["Aprender", "Crescer", "Conectar-se", "Inspirar-se"]} 
              duration={1000} 
              className="font-poppins text-5xl md:text-6xl font-semibold mb-2 text-AzulMeiaNoite select-none"
            />
            </div>
            <p className="font-spaceGrotesk text-neutral-600 mb-8 text-lg md:text-2xl max-w-[100%] md:max-w-[80%] align-middle">
              Iniciando a graduação com experiências práticas e relacionamentos duradouros.
            </p>
          <button className="bg-VerdeMenta text-white font-bold py-2 px-4 rounded hover:bg-AzulEletrico transition duration-300">
            Saiba Mais
          </button>
        </div>
      </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
