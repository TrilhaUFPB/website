import { ButtonLink, ArrowIcon } from "@trilha/ui";
import Trajetoria from "@/components/community/Trajetoria";
import TeamViewSwitch from "@/components/community/TeamViewSwitch";
import { trajetoriaData } from "@/components/community/trajetoria-data";
import "@/components/community/community.css";
import "@/components/community/trajetoria.css";

export const metadata = { title: "Quem somos · Trajetórias" };

export default function Page() {
  return (
    <div className="trilha-site tj-fullpage">
      <Trajetoria {...trajetoriaData()}>
        <ButtonLink href="/"><ArrowIcon direction="left" /> Voltar ao Trilha</ButtonLink>
        <span className="section-label">QUEM SOMOS</span>
        <h1>Uma rede feita de gente.</h1>
        <p>Cada coluna é uma turma. Quem passou por mais de uma vira uma linha: entrou como aluno, voltou para organizar, foi liderar uma iniciativa.</p>
        <TeamViewSwitch current="trajetoria" />
      </Trajetoria>
    </div>
  );
}
