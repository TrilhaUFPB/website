import ArrowIcon from "./ArrowIcon";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function Team() {
  return (
    <div className="trilha-site">
      <main className="team-directory network-page">
        <Link className="team-back button" href="/">
          <ArrowIcon direction="left" /> Voltar ao Trilha
        </Link>
        <span className="section-label">QUEM SOMOS</span>
        <h1>Uma rede feita de gente.</h1>
        <p>
          Conheça quem constrói o Trilha, compartilha conhecimento e faz nossas
          iniciativas acontecerem.
        </p>
        <div className="people-map-intro"><span className="section-label">TODOS</span><p>Uma comunidade, muitas formas de contribuir.</p></div>
        <div className="team-grid people-map">
          <article className="person" data-initiative="Trilha" id="pessoa-Clara">
            <img
              src="/community/pessoas/2024.1/clara.png"
              alt="Maria Clara Dantas"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Maria Clara Dantas</h3>
            <p>Presidência · Trilha</p>
          </article>
          <article className="person" data-initiative="Momento" id="pessoa-NicoleCosta">
            <img
              src="/community/pessoas/2025.1/nicole.jpg"
              alt="Nicole Costa e Silva"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Nicole Costa e Silva</h3>
            <p>Liderança · Momento</p>
          </article>
          <article className="person" data-initiative="Hack The Path" id="pessoa-MariaLuisaQuintela">
            <img
              src="/community/pessoas/2025.1/quintela.jpg"
              alt="Maria Luisa Moreira Quintela"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Maria Luisa Moreira Quintela</h3>
            <p>Liderança · Hack The Path</p>
          </article>
          <article className="person" data-initiative="Hack The Path" id="pessoa-Luigi">
            <img
              src="/community/pessoas/2024.1/luigi.png"
              alt="Luigi Schmitt"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Luigi Schmitt</h3>
            <p>Liderança · Hack The Path</p>
          </article>
          <article className="person" data-initiative="Hack The Path" id="pessoa-Ralf">
            <img
              src="/community/pessoas/ralf.jpeg"
              alt="Ralf Ferreira"
              loading="lazy"
              width="800"
              height="800"
            />
            <h3>
              <Link
                href="https://www.linkedin.com/in/ralfferreira/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ralf Ferreira no LinkedIn"
              >
                Ralf Ferreira
              </Link>
            </h3>
            <p>Líder · Hack The Path</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Guilherme">
            <img
              src="/community/pessoas/guilherme.png"
              alt="Guilherme Huther"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Guilherme Huther</h3>
            <p>Aulas · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Kruta">
            <img
              src="/community/pessoas/2024.1/kruta.png"
              alt="Pedro Kruta"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Pedro Kruta</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Bea">
            <img
              src="/community/pessoas/2024.1/bea.png"
              alt="Beatriz Pessôa"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Beatriz Pessôa</h3>
            <p>Mídias · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Daniel">
            <img
              src="/community/pessoas/daniel.jpg"
              alt="Daniel Brandão"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Daniel Brandão</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Davi">
            <img
              src="/community/pessoas/davi.png"
              alt="Davi Nasiasene"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Davi Nasiasene</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Emyle">
            <img
              src="/community/pessoas/2024.1/emyle.png"
              alt="Emyle Santos"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Emyle Santos</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Beatriz">
            <img
              src="/community/pessoas/2024.2/beatriz.png"
              alt="Ana Beatriz Mota da Cruz"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Ana Beatriz Mota da Cruz</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-MiguelQueiroz">
            <img
              src="/community/pessoas/2024.1/miguel.png"
              alt="Miguel Queiroz Fernandes Soares"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Miguel Queiroz Fernandes Soares</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Marcus">
            <img
              src="/community/pessoas/2024.1/marcus.jpg"
              alt="Marcus Vinicius da Silva Araujo"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Marcus Vinicius da Silva Araujo</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-GabrielCarvalho">
            <img
              src="/community/pessoas/2024.2/gabriel.jpg"
              alt="Gabriel Carvalho"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Gabriel Carvalho</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-JoaoGabrielArruda">
            <img
              src="/community/pessoas/2025.1/arruda.jpg"
              alt="João Gabriel Oliveira de Arruda"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>João Gabriel Oliveira de Arruda</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-Joaquim">
            <img
              src="/community/pessoas/2025.1/joaquim.jpg"
              alt="Joaquim Germano"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Joaquim Germano</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-EduardoOliveira">
            <img
              src="/community/pessoas/2025.1/eduardo.jpg"
              alt="Eduardo Oliveira Silva"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Eduardo Oliveira Silva</h3>
            <p>Organização · Trilha</p>
          </article>
          <article className="person" data-initiative="Trilha" id="pessoa-MariaLuizaCavalcanti">
            <img
              src="/community/pessoas/2025.1/uchoa.jpg"
              alt="Maria Luíza Uchoa Cavalcanti"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>Maria Luíza Uchoa Cavalcanti</h3>
            <p>Organização · Trilha</p>
          </article>
        </div>
<section className="founders-section"><h2>Fundadores</h2><div className="team-grid"><article className="person"><img src="/community/pessoas/tiago.jpg" alt="Tiago Trindade" loading="lazy"/><h3>Tiago Trindade</h3><p>Fundador · Trilha</p></article><article className="person"><img src="/community/pessoas/felipe.png" alt="Felipe Duarte" loading="lazy"/><h3>Felipe Duarte</h3><p>Fundador · Trilha</p></article><article className="person"><img src="/community/pessoas/nicholas.png" alt="Nicholas Rodrigues" loading="lazy"/><h3>Nicholas Rodrigues</h3><p>Fundador · Trilha</p></article><article className="person"><img src="/community/pessoas/guilherme.png" alt="Guilherme Huther" loading="lazy"/><h3>Guilherme Huther</h3><p>Fundador · Trilha</p></article><article className="person"><img src="/community/pessoas/icaro.png" alt="Ícaro Mori" loading="lazy"/><h3>Ícaro Mori</h3><p>Fundador · Trilha</p></article></div></section>        <Link className="button" href="/">
          Voltar ao Trilha <ArrowIcon direction="up-right" />
        </Link>
      </main>
    </div>
  );
}
