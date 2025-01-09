export default function Sobre() {
  return (
    <section id="sobre" className="py-20 bg-AzulMeiaNoite flex w-full overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-1xl font-semibold text-center text-AzulCeu font-poppins mb-2">Sobre Nós</h2>
        <p className="text-3xl font-semibold text-center text-Branco font-poppins mb-8 ">
          Aulas, Palestras, Mentorias e muito mais
        </p>

        <div className="gap-4 px-4">
          <div className="flex gap-2 lg:gap-4">
            <div className="bg-VerdeMenta p-4 lg:p-10 rounded-2xl shadow-lg ">
              <h3 className="font-poppins font-extrabold text-xl text-BrancoCreme lg:text-3xl mb-2 mt-2 lg:mb-4 lg:mt-2">Como o TRILHA surgiu?</h3>
              <p className="text-BrancoCreme mb-4 text-sm lg:text-xl font-bold font-spaceGrotesk">
                O TRILHA surgiu como uma iniciativa de alunos da UFPB para apoiar estudantes dos primeiros períodos do Centro de Informática. 
              </p>
              <button className="px-[10px] text-sm py-1 lg:px-4 lg:py-2 bg-AzulMeiaNoite text-BrancoCreme font-semibold rounded-md hover:bg-Branco hover:text-VerdeMenta duration-500">
                Conheça nosso time
              </button>
              <img className="rounded-xl mt-4 mb-2 lg:mt-4"  src="trilha2024.JPG" alt="imagem palestra"/>
            </div>

            <div className="bg-AzulEletrico p-4 lg:p-10 rounded-2xl shadow-lg flex-grow w-[1100px] ">
              <img className="rounded-xl lg:mt-4"  src="aulas.jpeg" alt="imagem aulas"/>
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-4">Como são as aulas?</h3>
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                As aulas do TRILHA são práticas e focadas no mercado de trabalho, com tutoria personalizada e conteúdo envolvente              
              </p>
            </div>
          </div>

          <div className="flex gap-2 lg:gap-4 pt-4">

            <div className="bg-AzulEletrico p-4 lg:p-10 rounded-2xl shadow-lg flex-grow w-[1200px]">
              <h3 className="font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-2">Palestras e Eventos</h3>
              <img className="rounded-xl mb-4 lg:mb-4" src="palestra.JPG" alt="imagem palestra" />
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                O TRILHA também oferece palestras e eventos para complementar a formação dos alunos, trazendo especialistas do mercado e da academia para compartilhar conhecimentos, tendências e experiências .
              </p>
            </div>

            <div className="bg-AzulCeu p-4 lg:p-10 rounded-2xl shadow-lg flex-grow w-[1400px]">
              <h3 className=" font-poppins font-extrabold text-xl lg:text-3xl text-BrancoCreme mb-2 mt-2 lg:mb-4 lg:mt-2">Quais são os nossos objetivos?</h3>
              <p className="text-BrancoCreme text-sm lg:text-xl font-bold font-spaceGrotesk">
                Os objetivos do TRILHA são capacitar e inspirar estudantes dos primeiros períodos. O projeto visa fomentar a troca de conhecimento e o desenvolvimento de habilidades técnicas essenciais para a carreira dos alunos.
              </p>
              <img className="rounded-xl mt-4 mb-2" src="aulaTrilha.JPG" alt="imagem aula trilha"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}