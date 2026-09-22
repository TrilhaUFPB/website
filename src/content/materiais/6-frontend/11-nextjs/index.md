---
title: 11. Next.js
description: Entenda o que o Next.js resolve em relação ao React puro, como funciona o App Router, a fronteira entre Server e Client Components, data fetching e SEO básico
category: Frontend
order: 11
---

## Sumário

- [11.0. Visão Geral: Next.js](#110-visao-geral-nextjs)
- [11.1. React x Next.js: qual problema o Next resolve?](#111-react-x-nextjs-qual-problema-o-next-resolve)
- [11.2. App Router e roteamento por pastas (app/)](#112-app-router-e-roteamento-por-pastas-app)
- [11.3. Server Components x Client Components](#113-server-components-x-client-components)
- [11.4. Data fetching no App Router](#114-data-fetching-no-app-router)
- [11.5. SEO básico no Next](#115-seo-basico-no-next)
- [11.6. Deploy (conceito) e ambiente de produção](#116-deploy-conceito-e-ambiente-de-producao)
- [11.7. Boas práticas de organização e mentalidade de projeto](#117-boas-praticas-de-organizacao-e-mentalidade-de-projeto)
- [11.8. Próximos passos](#118-proximos-passos)
- [11.9. Erros comuns e confusões clássicas](#119-erros-comuns-e-confusoes-classicas)
- [11.10. Glossário rápido](#1110-glossario-rapido)
- [11.11. Resumo final](#1111-resumo-final)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> React resolve *como* construir a interface. Não resolve *onde* ela roda, como as rotas se organizam, nem como o Google vai indexar sua página. É exatamente nessa lacuna que o Next.js entra.

O Next.js é hoje o framework mais usado sobre React, e o **App Router** mudou a forma de pensar aplicações: menos JavaScript no cliente, mais renderização no servidor, e convenções prontas para roteamento, SEO e organização de projeto. Vamos entender o que ele resolve, como funciona por baixo dos panos, e onde ele exige decisões conscientes.

---

# 11.0. Visão Geral: Next.js

## O que você vai aprender neste módulo?

* **11.1 e 11.2:** a diferença conceitual entre **React** e **Next.js**, e como o **App Router** organiza rotas por pastas, com layouts e route groups.
* **11.3 e 11.4:** a fronteira entre **Server Components** e **Client Components** — o que cada um pode e não pode fazer — e onde buscar dados numa aplicação Next moderna.
* **11.5:** por que o Next ajuda no **SEO**, mas não "resolve tudo sozinho".
* **11.6 a 11.11:** deploy, organização de projeto, próximos passos, erros comuns e um glossário de repasse rápido.

## Pré-requisitos

* Conhecimento básico de **React** (componentes, props, state)
* Noções de **TypeScript**
* Conceitos básicos de **HTTP** e **fetch**
* Entendimento geral de como funciona uma aplicação web no navegador

---

# 11.1. React x Next.js: qual problema o Next resolve?

## React como biblioteca de UI

O React, por si só, é **uma biblioteca para construir interfaces**. Ele resolve muito bem o problema de **componentização** e **atualização eficiente da UI**, mas deixa várias decisões importantes nas mãos do desenvolvedor:

* Como funciona o roteamento?
* Onde acontece a renderização (cliente ou servidor)?
* Como lidar com SEO?
* Como dividir o código?
* Como estruturar o projeto?

Em aplicações reais, essas decisões não são triviais. Por isso, projetos em React "puro" acabam acumulando **camadas de configuração**, bibliotecas adicionais e padrões próprios.

## Next.js como framework

O Next.js surge como um **framework**: ele usa React por baixo, mas entrega **convenções prontas** para problemas recorrentes.

De forma resumida, o Next oferece:

* **Roteamento automático** baseado em arquivos
* **Renderização no servidor** (SSR) e estática (SSG)
* **Code splitting** automático
* Otimizações de build e carregamento
* Estrutura de projeto padronizada

> **Dica:** Frameworks reduzem liberdade em troca de **consistência e previsibilidade**. Isso costuma ser positivo em times e projetos médios ou grandes.

## Quando usar Next.js

* **Sites públicos** que precisam ser indexados (marketing, blogs, documentação)
* **Aplicações com páginas indexáveis**, mesmo que tenham interatividade
* **Dashboards** também podem usar Next, embora o SEO seja menos crítico

## Conceitos de renderização (visão geral)

* **CSR (Client-Side Rendering)**: o navegador baixa JS e constrói a página
* **SSR (Server-Side Rendering)**: o servidor envia HTML já pronto
* **SSG (Static Site Generation)**: HTML gerado no build

Cada abordagem envolve trade-offs entre tempo até aparecer conteúdo, interatividade, complexidade e carga no servidor.

![Figura 1 — React x Next.js](/api/materiais-assets/6-frontend/11-nextjs/assets/image.png)
*Figura 1 — React resolve a UI; o Next.js resolve tudo em volta dela.*

---

# 11.2. App Router e roteamento por pastas (app/)

## Estrutura base

No Next moderno, tudo começa na pasta **app/**.

Arquivos fundamentais:

* `app/layout.tsx` → layout raiz
* `app/page.tsx` → rota `/`

O layout define **estrutura persistente** (header, footer), enquanto `page.tsx` define o conteúdo da rota.

## Rotas por pastas

Cada pasta vira um segmento da URL:

```
app/
 ├─ page.tsx        → /
 └─ about/
    └─ page.tsx    → /about
```

Rotas aninhadas funcionam da mesma forma, refletindo a hierarquia.

## Layouts e composição

Layouts podem ser **aninhados**, permitindo UI persistente em partes da aplicação.

> **Conceito-chave:** Layouts não são apenas "templates"; eles representam **fronteiras de renderização e estado visual persistente**.

## Not found e erros

* `not-found.tsx`: página 404 customizada
* `error.tsx`: tratamento de erros da rota

São arquivos especiais, reconhecidos pelo framework.

## Route groups

Pastas entre parênteses, como `(auth)` ou `(dashboard)`, **não aparecem na URL**. Servem apenas para **organizar o código**.

## Exemplo de árvore e URLs

```
app/
 ├─ layout.tsx
 ├─ page.tsx              → /
 ├─ (auth)/
 │   └─ login/
 │      └─ page.tsx       → /login
 └─ dashboard/
     ├─ layout.tsx
     └─ page.tsx          → /dashboard
```

![Figura 2 — app/ → URLs](/api/materiais-assets/6-frontend/11-nextjs/assets/image-1.png)
*Figura 2 — a estrutura de pastas em app/ mapeada para as URLs correspondentes.*

---

# 11.3. Server Components x Client Components

## Modelo mental

No **App Router**, todo componente é **Server Component por padrão**.

* **Server Component**: roda no servidor
* **Client Component**: roda no navegador (precisa de `"use client"`)

## O que pode em Server Components

* Buscar dados no servidor
* Acessar recursos sensíveis (conceito)
* Renderizar HTML já com dados

## O que exige Client Components

* `useState`, `useEffect`
* Eventos (`onClick`, `onChange`)
* APIs do browser (`window`, `localStorage`)

## A fronteira

Um Server Component pode **renderizar** um Client Component, passando props **serializáveis**.

```tsx
// ClientComponent.tsx
"use client";
export function Counter() {
  return <button>+1</button>;
}
```

```tsx
// Page.tsx (Server Component)
import { Counter } from "./ClientComponent";

export default async function Page() {
  return <Counter />;
}
```

> **Atenção:** Um Client Component **não pode importar** um Server Component.

## Boas práticas

* Client Components pequenos
* Buscar dados no servidor sempre que possível
* Usar Client apenas para interatividade

![Figura 3 — Server x Client Components](/api/materiais-assets/6-frontend/11-nextjs/assets/image-2.png)
*Figura 3 — Server Components rodam no servidor; Client Components cuidam da interação no navegador.*

---

# 11.4. Data fetching no App Router

## Fetch no servidor

Server Components podem ser `async`:

```tsx
export default async function Page() {
  const data = await fetch("https://api.exemplo.com/items").then(r => r.json());
  return <pre>{JSON.stringify(data)}</pre>;
}
```

Benefícios:

* Menos JS no cliente
* HTML já chega pronto
* Melhor SEO

> **Conceito-chave:** Menos trabalho no cliente significa **melhor performance percebida**, mesmo que o servidor faça mais.

## Cache e revalidação (visão geral)

* Fetch é cacheado por padrão
* `revalidate` permite atualizar dados periodicamente
* Útil para dados que mudam, mas não a cada requisição

## Fetch no cliente

Quando depende do browser ou interação do usuário:

* `useEffect`
* estados de loading e erro

## Padrão recomendado

> Buscar dados no servidor por padrão.
> Usar fetch no cliente apenas quando necessário.

![Figura 4 — Fluxo de data fetching](/api/materiais-assets/6-frontend/11-nextjs/assets/image-3.png)
*Figura 4 — o fluxo de data fetching: busca no servidor, HTML pronto, depois hidratação no cliente.*

---

# 11.5. SEO básico no Next

## Por que SEO entra aqui

Next.js gera **HTML real**, não apenas um container vazio. Isso facilita o trabalho de crawlers.

## Metadata no App Router

Cada página pode exportar metadata:

```tsx
export const metadata = {
  title: "Página Inicial",
  description: "Descrição da página"
};
```

Também pode ser dinâmica (conceito).

## Boas práticas

* Títulos únicos
* Descrições claras
* Headings semânticos
* Open Graph (noção)

> **Atenção:** Next ajuda no SEO, mas **conteúdo e estrutura** continuam sendo decisivos.

![Figura 5 — Metadata e SEO](/api/materiais-assets/6-frontend/11-nextjs/assets/image-4.png)
*Figura 5 — a relação entre a página, a metadata exportada, e como ela aparece para crawlers e previews.*

---

# 11.6. Deploy (conceito) e ambiente de produção

## O que é deploy

Processo de:

1. Build
2. Geração de artefatos
3. Execução em servidor ou edge

## Ambientes

* **Dev**: desenvolvimento local
* **Staging**: validação
* **Prod**: usuários finais

## Onde hospedar

* Plataformas especializadas
* Infra própria
* O conceito é o mesmo

## Variáveis de ambiente

* Configurações externas ao código
* Secrets devem existir **apenas no servidor**

## Observabilidade

* Logs
* Erros
* Monitoramento em produção

---

# 11.7. Boas práticas de organização e mentalidade de projeto

Separar responsabilidades:

* `app/`: rotas
* `components/`: UI
* `services/`: fetchers
* `types/`: tipagens

Evitar:

* Lógica excessiva em `page.tsx`
* Tornar tudo Client sem necessidade

> **Conceito-chave:** Next.js exige **escolhas conscientes**: decidir o que roda no servidor e o que roda no cliente.

---

# 11.8. Próximos passos

* Server Actions
* Autenticação
* Banco de dados e ORMs
* Otimização de imagens
* Streaming e caching avançado

---

# 11.9. Erros comuns e confusões clássicas

* Usar `useState` em Server Component
* Esquecer `"use client"`
* Acessar `window` no servidor
* Fazer fetch no cliente sem necessidade
* Confundir `app/` com `pages/`
* Achar que SEO é automático
* Expor secrets no cliente
* Tratar deploy como "subir pasta"

---

# 11.10. Glossário rápido

* **Framework**: conjunto de regras e ferramentas
* **CSR**: renderização no cliente
* **SSR**: renderização no servidor
* **SSG**: geração estática
* **App Router**: roteamento por pastas
* **Layout**: UI persistente
* **Server Component**: componente do servidor
* **Client Component**: componente do browser
* **Metadata**: informações para SEO
* **Caching**: reutilização de dados
* **Revalidate**: atualização controlada
* **Deploy**: publicação da aplicação

---

# 11.11. Resumo final

O Next.js moderno não é apenas "React com mais coisas". Ele representa uma **mudança de mentalidade**: pensar primeiro no servidor, usar o cliente apenas quando necessário, confiar em convenções e estruturar aplicações com clareza arquitetural. Entender isso é o passo fundamental para construir aplicações web modernas, escaláveis e bem organizadas.

---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre o App Router e a fronteira entre Server e Client Components, confira o seguinte recurso:

- [Getting Started: Server and Client Components - Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components)

```quiz
- tipo: single
  pergunta: Qual a diferença conceitual central entre React e Next.js?
  opcoes:
    - texto: React é uma biblioteca de UI; Next.js é um framework que usa React e entrega convenções prontas para roteamento, renderização e SEO
      correta: true
      explicacao: Exato! O React resolve componentização e atualização de UI, mas deixa decisões como roteamento, renderização e SEO nas mãos do desenvolvedor. O Next.js entrega convenções prontas para isso.
      explicacao_erro: React é uma biblioteca focada em construir interfaces. Next.js é um framework construído sobre o React que resolve, com convenções prontas, tudo que o React sozinho deixa em aberto — roteamento, renderização e SEO.
    - texto: Não existe diferença real, Next.js é só um apelido para projetos React
      correta: false
      explicacao: Existe uma diferença real de escopo. React é uma biblioteca de UI; Next.js é um framework completo que toma decisões de roteamento, renderização e estrutura de projeto.
    - texto: React roda no servidor e Next.js roda no cliente
      correta: false
      explicacao: É o contrário do que define cada um — essa distinção não é sobre onde cada um roda, mas sobre escopo. Aliás, o App Router do Next introduz justamente a renderização no servidor por padrão.
    - texto: Next.js substitui completamente a necessidade de aprender React
      correta: false
      explicacao: O Next.js usa o React por baixo dos panos — ele não substitui o React, mas se apoia nele para entregar convenções prontas.

- tipo: single
  pergunta: No App Router, o que acontece com uma pasta escrita entre parênteses, como `(auth)`?
  opcoes:
    - texto: Ela organiza o código, mas não aparece como segmento na URL final
      correta: true
      explicacao: Exato! Route groups servem para organizar arquivos relacionados sem afetar a URL — uma pasta `(auth)/login/page.tsx` vira a rota `/login`, não `/auth/login`.
      explicacao_erro: Pastas entre parênteses são "route groups" — elas existem para organizar o código, mas o Next as ignora ao montar a URL da rota.
    - texto: Ela vira um segmento obrigatório da URL, como qualquer outra pasta
      correta: false
      explicacao: Route groups são exatamente a exceção a essa regra — o parêntese sinaliza ao Next para não incluir aquele nome no caminho da URL.
    - texto: Ela transforma automaticamente todos os componentes dentro dela em Client Components
      correta: false
      explicacao: Route groups não têm relação com a fronteira Server/Client — essa distinção depende da diretiva `"use client"`, não da forma como as pastas são organizadas.
    - texto: Ela é usada exclusivamente para páginas de erro e not-found
      correta: false
      explicacao: Páginas de erro usam arquivos especiais como `error.tsx` e `not-found.tsx`. Route groups servem para organizar rotas relacionadas, sem relação direta com tratamento de erro.

- tipo: single
  pergunta: Por que um Client Component não pode importar diretamente um Server Component?
  opcoes:
    - texto: Porque o código de um Server Component roda no servidor e não pode ser enviado para o navegador, onde o Client Component é executado
      correta: true
      explicacao: Exato! Um Server Component pode depender de recursos que só existem no servidor. Permitir essa importação quebraria a fronteira — por isso o fluxo correto é o Server Component renderizar o Client Component, passando props serializáveis, nunca o contrário.
      explicacao_erro: A fronteira existe porque o código de Server Components roda no servidor. Um Client Component roda no navegador, então importar um Server Component significaria tentar rodar código de servidor no cliente — o que não é possível.
    - texto: Porque Client Components não podem receber props
      correta: false
      explicacao: Client Components recebem props normalmente — inclusive de Server Components, desde que sejam props serializáveis. O problema não é receber props, é a direção da importação.
    - texto: Porque isso deixaria a aplicação lenta demais
      correta: false
      explicacao: Não é uma questão de performance, e sim de onde cada tipo de componente pode executar. A restrição existe porque código de Server Component não pode rodar no navegador.
    - texto: Porque só existe um Client Component por aplicação
      correta: false
      explicacao: Uma aplicação Next pode ter quantos Client Components forem necessários. A regra da fronteira é sobre a direção da importação, não sobre quantidade.

- tipo: single
  pergunta: Por que buscar dados em um Server Component (em vez de com `useEffect` no cliente) costuma ser a abordagem recomendada no App Router?
  opcoes:
    - texto: Porque reduz o JavaScript enviado ao cliente e entrega o HTML já pronto com os dados, melhorando performance percebida e SEO
      correta: true
      explicacao: Exato! Fetch no servidor significa que o HTML já chega com os dados renderizados, sem depender de uma segunda requisição no navegador — isso melhora tanto a performance percebida quanto a indexação por crawlers.
      explicacao_erro: O padrão recomendado é buscar dados no servidor por padrão, e usar fetch no cliente só quando necessário, como dados que dependem de interação do usuário — porque isso reduz JS no cliente e entrega HTML pronto.
    - texto: Porque `useEffect` não existe mais no React moderno
      correta: false
      explicacao: "`useEffect` continua existindo e é necessário em Client Components para fetch que depende do navegador ou de interação do usuário. O ponto não é a extinção do hook, é a preferência por resolver no servidor quando possível."
    - texto: Porque fetch no cliente é proibido no App Router
      correta: false
      explicacao: Fetch no cliente não é proibido — é usado quando os dados dependem do browser ou de interação do usuário. É uma questão de padrão recomendado, não de proibição.
    - texto: Porque dados buscados no servidor nunca podem ser cacheados
      correta: false
      explicacao: "É o oposto — fetch no servidor é cacheado por padrão no Next.js, e `revalidate` permite controlar quando esses dados são atualizados."

- tipo: single
  pergunta: |
    Um componente declarado sem `"use client"` tenta usar `useState` e o build falha.
    Qual é a causa e a correção, segundo o modelo mental do App Router?
  opcoes:
    - texto: O componente é um Server Component por padrão, que não suporta hooks como `useState`; a correção é adicionar `"use client"` no topo do arquivo
      correta: true
      explicacao: Exato! No App Router, todo componente é Server Component por padrão. Hooks como `useState` e `useEffect`, além de eventos e APIs do navegador, exigem que o arquivo seja declarado como Client Component com `"use client"`.
      explicacao_erro: Esse é um dos erros mais comuns listados no material — usar `useState` em um Server Component. Como todo componente é Server por padrão, a correção é declarar `"use client"` no topo do arquivo que precisa de estado, eventos ou APIs do navegador.
    - texto: O `useState` foi removido do React e deve ser substituído por `useEffect`
      correta: false
      explicacao: "`useState` continua sendo um hook válido do React. O problema não é o hook em si, e sim tentar usá-lo em um componente que roda no servidor por padrão."
    - texto: O componente precisa ser movido para a pasta `pages/` em vez de `app/`
      correta: false
      explicacao: Misturar `app/` com o antigo `pages/` é, inclusive, um dos erros comuns citados no material — mas não é essa a causa do erro de `useState`. A correção é declarar `"use client"`, não trocar de pasta.
    - texto: O erro não tem relação com Server ou Client Components, é um bug do Next.js
      correta: false
      explicacao: Não é um bug — é o comportamento esperado do App Router. Hooks de estado exigem explicitamente a diretiva `"use client"`, já que o padrão é todo componente ser Server Component.
```
