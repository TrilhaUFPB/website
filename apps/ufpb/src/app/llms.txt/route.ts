import { getAllAreas, getAllMaterials } from "@/lib/materials";
import pt from "@/locales/pt/common.json";

export const dynamic = "force-static";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://trilhaufpb.com"
).replace(/\/$/, "");
const communityUrl = (
  process.env.NEXT_PUBLIC_TRILHA_URL?.trim() || "https://otrilha.com"
).replace(/\/$/, "");

type Paper = { slug: string; title: string; desc: string; lang: string; author: string };

export function GET() {
  const materials = getAllMaterials();
  const areas = getAllAreas()
    .map((area) => {
      const items = materials
        .filter((m) => m.area === area.slug)
        .map((m) => {
          const desc = m.description ? `: ${m.description}` : "";
          return `- [${m.title}](${siteUrl}/materiais/${m.area}/${m.slug})${desc}`;
        });
      return items.length ? `### ${area.name}\n\n${items.join("\n")}` : "";
    })
    .filter(Boolean)
    .join("\n\n");

  const papers = (pt.papers.items as Paper[])
    .map(
      (p) =>
        `- [${p.title}](${siteUrl}/papers/${p.slug}.html) (${p.lang}, ${p.author}): ${p.desc}`,
    )
    .join("\n");

  const body = `# Trilha UFPB

> Programa gratuito de programação, projetos e mentoria na UFPB, feito por estudantes para estudantes. Reúne aulas, materiais didáticos em português e papers sobre programação, dados, backend, banco de dados e frontend.

O Trilha UFPB faz parte da comunidade Trilha (${communityUrl}), que também inclui o Momento, o Hack The Path e o Trilha UFPE. O conteúdo é aberto e pode ser citado com link para a página de origem.

## Páginas principais

- [Início](${siteUrl}/): visão geral do programa
- [Materiais](${siteUrl}/materiais): trilha de estudo organizada por área
- [Aulas](${siteUrl}/aulas): cronograma e conteúdo das aulas
- [Papers](${siteUrl}/papers): artigos autorais escritos por membros da comunidade
- [Turmas](${siteUrl}/turmas): turmas por período
- [Comunidade Trilha](${communityUrl}): quem somos e nossa história

## Materiais

${areas}

## Papers

${papers}

## Optional

- [Sitemap](${siteUrl}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
