# Trilha — dois sites, um repositório

Monorepo com npm workspaces e dois apps Next.js independentes.

| App | Conteúdo | Local |
| --- | --- | --- |
| `apps/trilha` (`@trilha/community`) | Landing page do Trilha, iniciativas, história, impacto e equipe | http://localhost:4318 |
| `apps/ufpb` (`@trilha/ufpb`) | Programa UFPB, aulas, materiais, turmas, projetos, equipe, ferramentas e administração | http://localhost:4319 |

## Desenvolvimento

```sh
npm ci
npm run dev:trilha
# Em outro terminal:
npm run dev:ufpb
```

Para produção local: `npm run build`, seguido de `npm run start:trilha` e `npm run start:ufpb` em terminais separados.

`npm test` executa os testes existentes do conteúdo UFPB. Com ambos os servidores no ar, `npm run check:sites` verifica páginas, imagens, redirecionamentos e proteção da administração.

## Domínios e deploy

Criar/configurar **dois projetos Next.js** no provedor, ligados ao mesmo repositório:

- Projeto do `otrilha.com`: Root Directory **`apps/trilha`**.
- Projeto do domínio Trilha UFPB: Root Directory **`apps/ufpb`**.

Usar o lockfile da raiz (npm workspaces). O build de cada projeto é `npm run build` dentro de sua Root Directory. As configurações Next incluem a raiz do monorepo para resolver dependências compartilhadas. No Vercel, permitir arquivos externos à Root Directory.

Definir antes do deploy:

| App | Variável | Valor |
| --- | --- | --- |
| Trilha | `NEXT_PUBLIC_SITE_URL` | URL pública do Trilha |
| Trilha | `NEXT_PUBLIC_UFPB_URL` | URL pública completa do novo app UFPB |
| UFPB | `NEXT_PUBLIC_SITE_URL` | URL pública completa do app UFPB |
| UFPB | `NEXT_PUBLIC_TRILHA_URL` | URL pública do Trilha |

Os valores locais estão em `.env.example` de cada app. As variáveis públicas são usadas no build. Os defaults são localhost; **configurar os domínios reais antes de publicar**.

Transferir para o projeto UFPB as variáveis de ambiente atualmente usadas para administração, SMTP, Firebase e analytics. Manter analytics do site institucional no projeto Trilha. O arquivo legado `env.local` não é automaticamente carregado pelo Next; usar `.env.local` local ou as variáveis do provedor, sem versionar segredos.

A landing redireciona `/ufpb`, `/aulas/*`, `/materiais/*`, `/turmas/*`, `/papers/*`, `/trilhurna/*`, `/admin/*` e `/metrics/*` para o app UFPB. As APIs de atividades e de administração pertencem somente ao app UFPB; autenticação e requisições continuam na mesma origem desse app.

**Esta alteração não configura DNS nem publica os apps.** Ajustar os dois projetos e variáveis antes de mesclar/deployar a mudança de estrutura.

## Organização

Cada app mantém seu `src`, `public`, configuração, metadados e dependências. O site institucional não inclui conteúdo de aulas nem rotas administrativas. O app UFPB usa os dados, traduções, APIs e materiais já existentes; sua nova home está em `src/components/campus/`.

Os estilos do redesign institucional estão em `apps/trilha/src/components/community/`. Não há pacote de UI compartilhado ainda: os dois designs podem evoluir independentemente.
