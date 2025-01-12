"use client";

import Image from "next/image";
import DynamicGrid from "./DynamicGrid";

export default function Sobre() {
  return (
    <section id="sobre" className="py-20 bg-AzulMeiaNoite flex w-full overflow-hidden relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50}/>
      <div className="container mx-auto px-12">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu font-poppins mb-2">Sobre Nós</h2>
        <p className="text-3xl font-semibold text-center text-Branco font-poppins mb-16">
          Aulas, Palestras, Mentorias e muito mais
        </p>

        <div className="gap-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-VerdeMenta p-4 lg:p-10 rounded-2xl shadow-lg lg:flex-[4] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <h3 className="font-poppins font-extrabold text-xl text-BrancoCreme lg:text-3xl mb-2 mt-2 lg:mb-4 lg:mt-2">
                Como o TRILHA surgiu?
              </h3>
              <p className="text-BrancoCreme mb-4 text-sm lg:text-xl font-bold font-spaceGrotesk">
                O TRILHA surgiu como uma iniciativa de alunos da UFPB para apoiar estudantes dos primeiros períodos do Centro de Informática.
              </p>
              <button 
                className="px-[10px] text-sm py-1 lg:px-4 lg:py-2 bg-AzulMeiaNoite text-BrancoCreme font-semibold rounded-md hover:bg-Branco hover:text-VerdeMenta duration-500"
                onClick={() => document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                Conheça nosso time
              </button>
              <Image className="rounded-xl mt-4 mb-2 lg:mt-4" src="/trilha2024.JPG" alt="imagem palestra" width={800} height={600} />
            </div>

            <div className="bg-AzulEletrico p-4 lg:p-10 rounded-2xl shadow-lg flex-grow lg:flex-[5] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <Image className="rounded-xl lg:mt-4" src="/aulas.jpeg" alt="imagem aulas" width={800} height={600} />
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-4">
                Como são as aulas?
              </h3>
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                As aulas do TRILHA são práticas e focadas no mercado de trabalho, com tutoria personalizada e conteúdo envolvente.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <div className="bg-AzulEletrico p-4 lg:p-10 rounded-2xl shadow-lg flex-grow lg:flex-[12] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-2">
                Palestras e Eventos
              </h3>
              <Image className="rounded-xl mb-4 lg:mb-4" src="/palestra.JPG" alt="imagem palestra" width={800} height={600} />
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                O TRILHA também oferece palestras e eventos para complementar a formação dos alunos, trazendo especialistas do mercado e da academia para compartilhar conhecimentos, tendências e experiências.
              </p>
            </div>

            <div className="bg-AzulCeu p-4 lg:p-10 rounded-2xl shadow-lg flex-grow lg:flex-[11] transform transition-transform duration-500 hover:scale-[1.02] hover:z-10">
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-2">
                Quais são os nossos objetivos?
              </h3>
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                Os objetivos do TRILHA são capacitar e inspirar estudantes dos primeiros períodos. O projeto visa fomentar a troca de conhecimento e o desenvolvimento de habilidades técnicas essenciais para a carreira dos alunos.
              </p>
              <Image className="rounded-xl mt-4 mb-2" src="/aulaTrilha.JPG" alt="imagem aula pratica" width={800} height={600} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
