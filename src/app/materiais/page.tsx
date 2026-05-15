import Link from "next/link";
import { getAllMaterials, getMaterialsByArea } from "@/lib/materials";

const areaBlurb: Record<string, string> = {
  "1-introducao-ao-python": "Primeiros passos em programação: do ambiente de execução até POO.",
  "2-estruturas-de-dados": "Como organizar, acessar e transformar dados com eficiência.",
  "3-dados": "Pipelines, análise e engenharia para trabalhar com dados na prática.",
  "4-backend": "Modelos mentais, APIs, segurança e arquitetura de serviços.",
  "5-banco-de-dados": "Modelagem, SQL e fundamentos para persistência de dados.",
  "6-frontend": "Da semântica do HTML ao React e performance no navegador.",
};

export default async function MaterialsIndexPage() {
  const areas = await getMaterialsByArea();
  const allMaterials = await getAllMaterials();
  const populated = areas.filter((a) => a.materials.length > 0);

  return (
    <>
      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Materiais</p>
            <h2>Biblioteca didática da Trilha.</h2>
            <p className="lede">
              Conteúdos organizados por área para apoiar quem está aprendendo computação —
              {" "}{allMaterials.length} materiais em {populated.length} áreas.
            </p>
          </header>

          <div className="materiais-areas">
            {populated.map((area) => {
              const first = area.materials[0];
              return (
                <article key={area.slug} className="materiais-area">
                  <div className="materiais-area-meta">
                    <span className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
                      {area.materials.length} {area.materials.length === 1 ? 'material' : 'materiais'}
                    </span>
                  </div>
                  <h3 className="display materiais-area-title">{area.name}</h3>
                  <p className="materiais-area-desc">
                    {areaBlurb[area.slug] ?? 'Materiais didáticos preparados pelo time da Trilha.'}
                  </p>
                  {first && (
                    <Link
                      href={`/materiais/${first.area}/${first.slug}`}
                      className="materiais-area-cta"
                    >
                      Começar <span className="arrow">→</span>
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
