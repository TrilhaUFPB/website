import { notFound } from "next/navigation";
import Link from "next/link";
import { getMaterialBySlug, generateAllMaterialParams, getAdjacentMaterials, getAllAreas, extractHeadings } from "@/lib/materials";
import MarkdownRenderer from "@/components/materiais/MarkdownRenderer";
import TableOfContents from "@/components/materiais/TableOfContents";

interface MaterialPageProps {
  params: Promise<{ segment: string; slug: string }>;
}

export async function generateStaticParams() {
  return generateAllMaterialParams().map(({ area, slug }) => ({ segment: area, slug }));
}

export async function generateMetadata({ params }: MaterialPageProps) {
  const { segment, slug } = await params;
  const material = getMaterialBySlug(segment, slug);
  if (!material) return { title: "Material não encontrado | Trilha UFPB" };
  return {
    title: `${material.title} | Materiais Trilha UFPB`,
    description: material.description || `Material didático: ${material.title}`,
  };
}

export default async function MaterialPage({ params }: MaterialPageProps) {
  const { segment: area, slug } = await params;
  const material = getMaterialBySlug(area, slug);
  if (!material) notFound();

  const { prev, next } = getAdjacentMaterials(area, slug);
  const currentArea = getAllAreas().find((a) => a.slug === area);
  const wordCount = material.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const headings = extractHeadings(material.content);

  return (
    <section className="section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow tag-dot" style={{ color: 'var(--mint-deep)' }}>
            <Link href="/materiais" style={{ color: 'inherit' }}>Materiais</Link>
            {currentArea && <> · {currentArea.name}</>}
          </p>
          <h2>{material.title}</h2>
          {material.description && <p className="lede">{material.description}</p>}
          <p className="kicker" style={{ marginTop: 14, color: 'var(--ink-soft)' }}>
            {readingTime} min de leitura
          </p>
        </header>

        <article className="prose-container" style={{ maxWidth: 820, margin: '0 auto' }}>
          <MarkdownRenderer content={material.content} />
        </article>

        <nav
          style={{
            maxWidth: 820,
            margin: '64px auto 0',
            paddingTop: 32,
            borderTop: '1px solid var(--rule)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          {prev ? (
            <Link href={`/materiais/${prev.area}/${prev.slug}`} className="btn btn--ghost" style={{ justifyContent: 'flex-start' }}>
              <span className="arrow" style={{ transform: 'rotate(180deg)' }}>→</span>
              <span style={{ textAlign: 'left' }}>
                <span className="kicker" style={{ display: 'block', color: 'var(--ink-soft)' }}>Anterior</span>
                <span>{prev.title}</span>
              </span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/materiais/${next.area}/${next.slug}`} className="btn btn--ghost" style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
              <span style={{ textAlign: 'right' }}>
                <span className="kicker" style={{ display: 'block', color: 'var(--ink-soft)' }}>Próximo</span>
                <span>{next.title}</span>
              </span>
              <span className="arrow">→</span>
            </Link>
          ) : <span />}
        </nav>
      </div>

      <TableOfContents headings={headings} />
    </section>
  );
}
