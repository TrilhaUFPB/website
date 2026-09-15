import Link from "next/link";
import ArrowIcon from "@/components/community/ArrowIcon";
import "@/components/community/community.css";
export default function NotFound() {
  return <div className="trilha-site"><main className="lost-path">
    <div className="arrival-content">
      <span className="section-label">404 · PÁGINA NÃO ENCONTRADA</span>
      <h1>Esse caminho<br />ainda não existe.</h1>
      <p>Mas tem muita coisa para descobrir por aqui.</p>
      <Link className="button" href="/"><ArrowIcon direction="left" /> Voltar ao Trilha</Link>
    </div>
  </main></div>;
}
