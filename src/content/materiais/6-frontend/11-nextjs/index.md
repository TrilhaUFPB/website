---
title: 11. Next.js
description: 
category: Frontend
order: 11
---

# 11. Next.js (Moderno – App Router)

## Objetivo da aula

Apresentar o **Next.js moderno**, com foco no **App Router**, explicando por que ele existe, quais problemas resolve em relação ao React “puro” e como pensar aplicações modernas que combinam **renderização no servidor**, **roteamento por pastas**, **data fetching eficiente** e **SEO básico**, sem perder clareza arquitetural.

## Pré-requisitos

* Conhecimento básico de **React** (componentes, props, state)
* Noções de **TypeScript**
* Conceitos básicos de **HTTP** e **fetch**
* Entendimento geral de como funciona uma aplicação web no navegador

## O que você será capaz de explicar ao final

* A diferença conceitual entre **React** e **Next.js**
* Como funciona o **App Router** e o roteamento baseado em pastas
* O papel de **Server Components** e **Client Components**
* Como e onde buscar dados em uma aplicação Next moderna
* Por que Next.js ajuda no **SEO**, mas não “resolve tudo sozinho”
* O que significa **deploy** em aplicações modernas
* Boas práticas de organização e mentalidade de projeto em Next.js

---

## Sumário

* [1. React x Next.js: qual problema o Next resolve?](#1-react-x-nextjs-qual-problema-o-next-resolve)
* [2. App Router e roteamento por pastas (app/)](#2-app-router-e-roteamento-por-pastas-app)
* [3. Server Components x Client Components](#3-server-components-x-client-components)
* [4. Data fetching no App Router](#4-data-fetching-no-app-router)
* [5. SEO básico no Next](#5-seo-básico-no-next)
* [6. Deploy (conceito) e ambiente de produção](#6-deploy-conceito-e-ambiente-de-produção)
* [7. Boas práticas de organização e mentalidade](#7-boas-práticas-de-organização-e-mentalidade-de-projeto)
* [8. Próximos passos](#8-próximos-passos)
* [Erros comuns e confusões clássicas](#erros-comuns-e-confusões-clássicas)
* [Glossário rápido](#glossário-rápido)
* [Resumo final](#resumo-final)

---

## React x Next.js: qual problema o Next resolve?

### React como biblioteca de UI

O React, por si só, é **uma biblioteca para construir interfaces**. Ele resolve muito bem o problema de **componentização** e **atualização eficiente da UI**, mas deixa várias decisões importantes nas mãos do desenvolvedor:

* Como funciona o roteamento?
* Onde acontece a renderização (cliente ou servidor)?
* Como lidar com SEO?
* Como dividir o código?
* Como estruturar o projeto?

Em aplicações reais, essas decisões não são triviais. Por isso, projetos em React “puro” acabam acumulando **camadas de configuração**, bibliotecas adicionais e padrões próprios.

### Next.js como framework

O Next.js surge como um **framework**: ele usa React por baixo, mas entrega **convenções prontas** para problemas recorrentes.

De forma resumida, o Next oferece:

* **Roteamento automático** baseado em arquivos
* **Renderização no servidor** (SSR) e estática (SSG)
* **Code splitting** automático
* Otimizações de build e carregamento
* Estrutura de projeto padronizada

**Dica**
Frameworks reduzem liberdade em troca de **consistência e previsibilidade**. Isso costuma ser positivo em times e projetos médios ou grandes.

### Quando usar Next.js

* **Sites públicos** que precisam ser indexados (marketing, blogs, documentação)
* **Aplicações com páginas indexáveis**, mesmo que tenham interatividade
* **Dashboards** também podem usar Next, embora o SEO seja menos crítico

### Conceitos de renderização (visão geral)

* **CSR (Client-Side Rendering)**: o navegador baixa JS e constrói a página
* **SSR (Server-Side Rendering)**: o servidor envia HTML já pronto
* **SSG (Static Site Generation)**: HTML gerado no build

Cada abordagem envolve trade-offs entre:

* Tempo até aparecer conteúdo
* Interatividade
* Complexidade
* Carga no servidor

---
![alt text](/api/materiais-assets/6-frontend/11-nextjs/assets/image.png)
*Figura 1 — React x Next.js*
---

## App Router e roteamento por pastas (app/)

### Estrutura base

No Next moderno, tudo começa na pasta **app/**.

Arquivos fundamentais:

* `app/layout.tsx` → layout raiz
* `app/page.tsx` → rota `/`

O layout define **estrutura persistente** (header, footer), enquanto `page.tsx` define o conteúdo da rota.

### Rotas por pastas

Cada pasta vira um segmento da URL:

```
app/
 ├─ page.tsx        → /
 └─ about/
    └─ page.tsx    → /about
```

Rotas aninhadas funcionam da mesma forma, refletindo a hierarquia.

### Layouts e composição

Layouts podem ser **aninhados**, permitindo UI persistente em partes da aplicação.

**Conceito-chave**
Layouts não são apenas “templates”; eles representam **fronteiras de renderização e estado visual persistente**.

### Not found e erros

* `not-found.tsx`: página 404 customizada
* `error.tsx`: tratamento de erros da rota

São arquivos especiais, reconhecidos pelo framework.

### Route groups

Pastas entre parênteses, como `(auth)` ou `(dashboard)`, **não aparecem na URL**.
Servem apenas para **organizar o código**.

### Exemplo de árvore e URLs

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

---
![alt text](/api/materiais-assets/6-frontend/11-nextjs/assets/image-1.png)
*Figura 2 — app/ → URLs*

---

## Server Components x Client Components

### Modelo mental

No **App Router**, todo componente é **Server Component por padrão**.

* **Server Component**: roda no servidor
* **Client Component**: roda no navegador (precisa de `"use client"`)

### O que pode em Server Components

* Buscar dados no servidor
* Acessar recursos sensíveis (conceito)
* Renderizar HTML já com dados

### O que exige Client Components

* `useState`, `useEffect`
* Eventos (`onClick`, `onChange`)
* APIs do browser (`window`, `localStorage`)

### A fronteira

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

**Atenção**
Um Client Component **não pode importar** um Server Component.

### Boas práticas

* Client Components pequenos
* Buscar dados no servidor sempre que possível
* Usar Client apenas para interatividade

---
![alt text](/api/materiais-assets/6-frontend/11-nextjs/assets/image-2.png)
*Figura 3 — Server x Client Components*

* **Objetivo**: Mostrar onde cada componente roda.
* **Descrição**: Servidor renderizando HTML e navegador cuidando da interação.

---

## Data fetching no App Router

### Fetch no servidor

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

**Conceito-chave**
Menos trabalho no cliente significa **melhor performance percebida**, mesmo que o servidor faça mais.

### Cache e revalidação (visão geral)

* Fetch é cacheado por padrão
* `revalidate` permite atualizar dados periodicamente
* Útil para dados que mudam, mas não a cada requisição

### Fetch no cliente

Quando depende do browser ou interação do usuário:

* `useEffect`
* estados de loading e erro

### Padrão recomendado

> Buscar dados no servidor por padrão.
> Usar fetch no cliente apenas quando necessário.

---
![alt text](/api/materiais-assets/6-frontend/11-nextjs/assets/image-3.png)
*Figura 4 — Fluxo de data fetching*

* **Objetivo**: Mostrar server fetch → HTML → hidratação.
* **Descrição**: Linha do tempo do request até a interatividade.

---

## SEO básico no Next

### Por que SEO entra aqui

Next.js gera **HTML real**, não apenas um container vazio. Isso facilita o trabalho de crawlers.

### Metadata no App Router

Cada página pode exportar metadata:

```tsx
export const metadata = {
  title: "Página Inicial",
  description: "Descrição da página"
};
```

Também pode ser dinâmica (conceito).

### Boas práticas

* Títulos únicos
* Descrições claras
* Headings semânticos
* Open Graph (noção)

**Atenção**
Next ajuda no SEO, mas **conteúdo e estrutura** continuam sendo decisivos.

---
![alt text](/api/materiais-assets/6-frontend/11-nextjs/assets/image-4.png)
*Figura 5 — Metadata e SEO*

* **Objetivo**: Mostrar relação entre página, metadata e crawler.
* **Descrição**: Página → title/description → preview/bot.

---

## Deploy (conceito) e ambiente de produção

### O que é deploy

Processo de:

1. Build
2. Geração de artefatos
3. Execução em servidor ou edge

### Ambientes

* **Dev**: desenvolvimento local
* **Staging**: validação
* **Prod**: usuários finais

### Onde hospedar

* Plataformas especializadas
* Infra própria
* O conceito é o mesmo

### Variáveis de ambiente

* Configurações externas ao código
* Secrets devem existir **apenas no servidor**

### Observabilidade

* Logs
* Erros
* Monitoramento em produção

---

## Boas práticas de organização e mentalidade de projeto

Separar responsabilidades:

* `app/`: rotas
* `components/`: UI
* `services/`: fetchers
* `types/`: tipagens

Evitar:

* Lógica excessiva em `page.tsx`
* Tornar tudo Client sem necessidade

**Conceito-chave**
Next.js exige **escolhas conscientes**: decidir o que roda no servidor e o que roda no cliente.

---

## Próximos passos

* Server Actions
* Autenticação
* Banco de dados e ORMs
* Otimização de imagens
* Streaming e caching avançado

---

## Erros comuns e confusões clássicas

* Usar `useState` em Server Component
* Esquecer `"use client"`
* Acessar `window` no servidor
* Fazer fetch no cliente sem necessidade
* Confundir `app/` com `pages/`
* Achar que SEO é automático
* Expor secrets no cliente
* Tratar deploy como “subir pasta”

---

## Glossário rápido

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

## Resumo final

O Next.js moderno não é apenas “React com mais coisas”. Ele representa uma **mudança de mentalidade**: pensar primeiro no servidor, usar o cliente apenas quando necessário, confiar em convenções e estruturar aplicações com clareza arquitetural. Entender isso é o passo fundamental para construir aplicações web modernas, escaláveis e bem organizadas.
