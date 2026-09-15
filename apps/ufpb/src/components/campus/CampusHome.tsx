"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import Sobre from "@/components/Sobre";
import Numbers from "@/components/Numbers";
import Turmas from "@/components/Turmas";
import Projects from "@/components/Projects";
import Depoimentos from "@/components/Depoimentos";
import QuemSomos from "@/components/QuemSomos";
import Materiais from "@/components/Materiais";
import FAQ from "@/components/FAQ";
import { TickProvider, useReveal } from "@/components/home/shared";

export default function CampusHome() {
  useReveal();
  return (
    <TickProvider interval={4500}>
      <div className="campus-home" id="inicio">
        <nav className="campus-nav" aria-label="Navegação principal">
          <Link
            href="/"
            className="campus-brand"
            aria-label="Trilha, início"
          >
            <img src="/campus/trilha.svg" width="60" height="45" alt="" />
            <span>
              Trilha
            </span>
          </Link>
          <div className="campus-nav-links">
            <a href="#sobre">O programa</a>
            <a href="#turmas">Turmas</a>
            <a href="#projetos">Projetos</a>
            <Link href="/materiais">Materiais</Link>
          </div>
          <Link className="campus-button" href="/aulas">
            Acompanhe as aulas <ArrowUpRight size={17} />
          </Link>
          <a className="campus-main-site" href={process.env.NEXT_PUBLIC_TRILHA_URL || "https://otrilha.com"}>
            Conheça o Trilha <ArrowUpRight size={16} />
          </a>
        </nav>
        <main>
          <section className="campus-hero" aria-labelledby="campus-title">
            <div className="campus-hero-copy">
              <span className="campus-eyebrow">
                APRENDER FAZENDO
              </span>
              <h1 id="campus-title">
                Seu começo
                <br />
                em tecnologia.
                <br />
                <em>Em boa companhia.</em>
              </h1>
              <p>
                Programação, projetos e gente por perto. Um programa gratuito,
                feito por estudantes, para aprender construindo.
              </p>
              <div className="campus-actions">
                <a className="campus-button" href="#sobre">
                  Conheça o programa <ArrowRight size={18} />
                </a>
                <Link href="/materiais" className="campus-text-link">
                  Explore os materiais <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <figure className="campus-hero-photo">
              <img
                src="/campus/aula.jpg"
                width="1600"
                height="1200"
                alt="Estudantes do Trilha compartilhando conhecimento em sala"
              />
              <figcaption>
                <span>
                  O próximo passo
                  <br />
                  <strong>a gente dá junto.</strong>
                </span>
              </figcaption>
            </figure>
          </section>
          <section
            className="campus-shortcuts"
            aria-label="Continue aprendendo"
          >
            <Link href="/aulas">
              <CalendarDays size={24} />
              <div>
                <span>NA PRÁTICA</span>
                <h2>Acompanhe as aulas</h2>
                <p>Encontros, atividades e o que vem a seguir.</p>
              </div>
              <ArrowUpRight />
            </Link>
            <Link href="/materiais">
              <BookOpen size={24} />
              <div>
                <span>NO SEU RITMO</span>
                <h2>Abra os materiais</h2>
                <p>Conteúdo aberto para estudar e experimentar.</p>
              </div>
              <ArrowUpRight />
            </Link>
          </section>
          <Sobre />
          <Numbers />
          <Turmas />
          <Projects />
          <Depoimentos />
          <QuemSomos />
          <Materiais />
          <FAQ />
        </main>
        <footer className="campus-footer">
          <div>
            <img src="/campus/trilha.svg" width="65" height="50" alt="Trilha" />
            <h2>
              Aprendeu? Compartilha.
              <br />É assim que a gente cresce.
            </h2>
          </div>
          <nav aria-label="Links do rodapé">
            <Link href="/aulas">Aulas</Link>
            <Link href="/materiais">Materiais</Link>
            <a href="#turmas">Turmas</a>
            <a
              href={
                process.env.NEXT_PUBLIC_TRILHA_URL || "https://otrilha.com"
              }
            >
              Conheça todo o Trilha <ArrowUpRight size={16} />
            </a>
          </nav>
          <small>Trilha UFPB · De estudantes para estudantes.</small>
        </footer>
      </div>
    </TickProvider>
  );
}
