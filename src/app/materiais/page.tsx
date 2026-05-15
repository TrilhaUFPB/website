import Link from "next/link";
import { getAllMaterials, getMaterialsByArea } from "@/lib/materials";

export default async function MaterialsIndexPage() {
  const areas = await getMaterialsByArea();
  const allMaterials = await getAllMaterials();
  const populatedAreas = areas.filter((a) => a.materials.length > 0);

  return (
    <section className="section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Materiais</p>
          <h2>Biblioteca didática da Trilha.</h2>
          <p className="lede">
            Conteúdos organizados por área para apoiar quem está aprendendo computação —
            {" "}{allMaterials.length} materiais em {populatedAreas.length} áreas.
          </p>
        </header>

        {populatedAreas.length > 0 ? (
          <div className="papers-grid">
            {populatedAreas.map((area) => (
              <div key={area.slug} className="paper-card">
                <div className="paper-card-body">
                  <div className="paper-card-top">
                    <span className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
                      {area.name}
                    </span>
                    <span className="paper-lang">
                      {area.materials.length} {area.materials.length === 1 ? 'material' : 'materiais'}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {area.materials.map((m) => (
                      <li key={m.slug}>
                        <Link
                          href={`/materiais/${m.area}/${m.slug}`}
                          className="display"
                          style={{
                            fontSize: 'clamp(18px, 1.4vw, 22px)',
                            lineHeight: 1.2,
                            color: 'var(--ink)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'baseline',
                            gap: 10,
                          }}
                        >
                          <span>{m.title}</span>
                          <span className="arrow" style={{ color: 'var(--ink-soft)' }}>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="lede">Os materiais serão adicionados em breve.</p>
        )}
      </div>
    </section>
  );
}
