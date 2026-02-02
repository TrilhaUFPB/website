import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getMaterialBySlug, generateAllMaterialParams, getAdjacentMaterials, getAllAreas, extractHeadings } from "@/lib/materials";
import MarkdownRenderer from "@/components/materiais/MarkdownRenderer";
import TableOfContents from "@/components/materiais/TableOfContents";

interface MaterialPageProps {
  params: Promise<{
    segment: string;
    slug: string;
  }>;
}

// Gera os parâmetros estáticos para todas as páginas de materiais (area + slug)
export async function generateStaticParams() {
  return generateAllMaterialParams().map(({ area, slug }) => ({
    segment: area,
    slug,
  }));
}

// Gera metadados dinâmicos
export async function generateMetadata({ params }: MaterialPageProps) {
  const resolvedParams = await params;
  const material = getMaterialBySlug(resolvedParams.segment, resolvedParams.slug);

  if (!material) {
    return {
      title: "Material não encontrado | Trilha UFPB",
    };
  }

  return {
    title: `${material.title} | Materiais Trilha UFPB`,
    description: material.description || `Material didático: ${material.title}`,
  };
}

export default async function MaterialPage({ params }: MaterialPageProps) {
  const resolvedParams = await params;
  const area = resolvedParams.segment;
  const slug = resolvedParams.slug;
  const material = getMaterialBySlug(area, slug);

  if (!material) {
    notFound();
  }

  const { prev, next } = getAdjacentMaterials(area, slug);

  // Encontra nome da área
  const areas = getAllAreas();
  const currentArea = areas.find(a => a.slug === area);

  // Estima tempo de leitura (média 200 palavras por minuto)
  const wordCount = material.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Extrai headings para o TOC
  const headings = extractHeadings(material.content);

  return (
    <div className="relative">
      {/* Conteúdo principal - BEM LARGO */}
      <article className="max-w-full pl-4 md:pl-8 pr-8 xl:pr-[300px]">
        {/* Breadcrumb e meta */}
        <div className="mb-4">
          <nav className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/materiais" className="hover:text-AzulEletrico dark:hover:text-AzulCeu transition-colors">
                  Materiais
                </Link>
              </li>
              <li className="text-gray-300 dark:text-slate-600">/</li>
              {currentArea && (
                <>
                  <li className="text-gray-400 dark:text-gray-500">
                    {currentArea.name}
                  </li>
                  <li className="text-gray-300 dark:text-slate-600">/</li>
                </>
              )}
              <li className="text-AzulMeiaNoite dark:text-white font-medium truncate">
                {material.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-xl md:text-2xl font-bold text-AzulMeiaNoite dark:text-white mb-1">
            {material.title}
          </h1>

          {material.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {material.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {currentArea && (
              <span className="px-2 py-0.5 bg-AzulCeu/10 dark:bg-AzulCeu/20 text-AzulEletrico dark:text-AzulCeu rounded-full text-xs">
                {currentArea.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {readingTime} min de leitura
            </span>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-slate-700 mb-5" />

        <div className="prose-container">
          <MarkdownRenderer content={material.content} />
        </div>

        <nav className="mt-8 pt-4 border-t border-gray-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/materiais/${prev.area}/${prev.slug}`}
              className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 hover:border-AzulCeu/50 dark:hover:border-AzulCeu/50 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 text-gray-400 group-hover:text-AzulEletrico dark:group-hover:text-AzulCeu transition-colors" />
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Anterior</span>
                <p className="font-medium text-xs text-AzulMeiaNoite dark:text-white group-hover:text-AzulEletrico dark:group-hover:text-AzulCeu transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/materiais/${next.area}/${next.slug}`}
              className="flex items-center justify-end gap-2 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 hover:border-AzulCeu/50 dark:hover:border-AzulCeu/50 transition-colors group text-right"
            >
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Próximo</span>
                <p className="font-medium text-xs text-AzulMeiaNoite dark:text-white group-hover:text-AzulEletrico dark:group-hover:text-AzulCeu transition-colors">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-AzulEletrico dark:group-hover:text-AzulCeu transition-colors" />
            </Link>
          )}
        </nav>
      </article>

      <TableOfContents headings={headings} />
    </div>
  );
}
