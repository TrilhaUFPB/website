import ArrowIcon from "./ArrowIcon";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function Ufpe() {
  return <div className="trilha-site"><main className="quiet-arrival">
    <img className="arrival-cloud arrival-cloud-left" src="/community/cloud-pixel.png" alt="" />
    <img className="arrival-cloud arrival-cloud-right" src="/community/cloud-pixel-2.png" alt="" />
    <div className="arrival-content">
      <img className="arrival-logo" src="/community/montanha-oficial.svg" width="80" height="60" alt="Trilha" />
      <span className="section-label">TRILHA UFPE</span>
      <h1>Em breve,<br /><em>em Recife.</em></h1>
      <p>Um novo lugar para começar juntos.</p>
      <Link className="button" href="/"><ArrowIcon direction="left" /> Voltar ao Trilha</Link>
    </div>
  </main></div>;
}
