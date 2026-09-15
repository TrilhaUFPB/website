import ArrowIcon from "./ArrowIcon";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function Ufpe() {
  return (
    <div className="trilha-site">
      <main className="initiative-detail">
        <Link href="/">
          <ArrowIcon direction="left" /> Voltar ao Trilha
        </Link>
        <img src="/community/montanha-oficial.svg" width="85" alt="Trilha" />
        <span className="section-label">Estadual · Em breve</span>
        <h1>Trilha UFPE</h1>
        <h2>Um novo começo vem aí.</h2>
        <p>
          A Trilha está chegando à UFPE. Mais um lugar para construir caminhos
          juntos.
        </p>
      </main>
    </div>
  );
}
