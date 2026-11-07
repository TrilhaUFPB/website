import { ufpbUrl } from "@/lib/sites";

export const dynamic = "force-static";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://otrilha.com"
).replace(/\/$/, "");
const campusUrl = ufpbUrl.replace(/\/$/, "");

export function GET() {
  const body = `# Trilha

> Uma comunidade de estudantes que abre caminhos para aprender, se conectar e construir, com Trilha UFPB, Momento, Hack The Path e Trilha UFPE.

A Trilha é feita de estudantes para estudantes. O programa de ensino e os materiais didáticos ficam no site do Trilha UFPB (${campusUrl}).

## Páginas principais

- [Início](${siteUrl}/): visão geral da comunidade
- [Quem somos](${siteUrl}/equipe): pessoas e papéis na organização
- [Nossa história](${siteUrl}/historia): como a Trilha começou e evoluiu
- [Trilha UFPE](${siteUrl}/ufpe): a Trilha na UFPE

## Conteúdo educacional

- [Trilha UFPB](${campusUrl}): programa gratuito de programação, projetos e mentoria na UFPB
- [Materiais](${campusUrl}/materiais): lições de Python, estruturas de dados, dados, backend, banco de dados e frontend
- [Papers](${campusUrl}/papers): artigos autorais da comunidade
- [llms.txt do Trilha UFPB](${campusUrl}/llms.txt): índice completo dos materiais

## Optional

- [Sitemap](${siteUrl}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
