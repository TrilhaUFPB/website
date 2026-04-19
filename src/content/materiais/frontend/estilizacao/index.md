---
title: Estilização
description: 
category: Frontend
order: 12
---

# 11. Estilização em React/Next (App Router)

## Objetivo da aula

Entender, com modelo mental claro, **como** e **por que** diferentes abordagens de estilização existem no ecossistema React/Next.js (App Router), e **como escolher** uma estratégia que preserve consistência visual, produtividade e manutenção ao longo do tempo.

## Pré-requisitos

* React básico (componentes, props, state)
* Noção de HTML/CSS (seletores, cascade, box model)
* Noção de Next.js moderno (App Router) e organização por componentes

## O que você será capaz de explicar ao final

* Por que “estilo também é arquitetura” em um projeto React/Next
* Como CSS Modules resolve conflitos de escopo e como usar sem “acoplamento ao markup”
* O modelo mental do Tailwind: **escala/tokens → utilitários → componentes**
* Quando faz sentido usar bibliotecas de UI (shadcn/ui, MUI, Chakra) e os riscos de “Frankenstein UI”
* Como organizar estilos e componentes para manter consistência em um projeto real

---

## Sumário

* [1. Panorama: formas de estilizar em React/Next](#1-panorama-formas-de-estilizar-em-reactnext)
* [2. CSS Modules (escopo local e previsível)](#2-css-modules-escopo-local-e-previsivel)
* [3. Tailwind (utility-first com consistência via design system)](#3-tailwind-utility-first-com-consistencia-via-design-system)
* [4. Bibliotecas de UI: shadcn, MUI e Chakra](#4-bibliotecas-de-ui-shadcn-mui-e-chakra)

  * [4.1 shadcn/ui](#41-shadcnui)
  * [4.2 MUI (Material UI)](#42-mui-material-ui)
  * [4.3 Chakra UI](#43-chakra-ui)
  * [4.4 Comparativo honesto](#44-comparativo-honesto)
* [5. Consistência visual](#5-consistencia-visual)
* [6. Organização de projeto](#6-organizacao-de-projeto-estilos-sem-virar-bagunca)
* [7. Guia de decisão](#7-guia-de-decisao-como-escolher-abordagem-no-seu-projeto)
* [Erros comuns e confusões clássicas](#erros-comuns-e-confusoes-classicas)
* [Glossário rápido](#glossario-rapido)
* [Resumo final](#resumo-final)
* [Referências](#referencias)

---

## 1. Panorama: formas de estilizar em React/Next

Em projetos pequenos, estilizar parece simples: “escreve um CSS e aplica uma classe”. Só que, conforme o projeto cresce, surge o problema real: **consistência + produtividade + manutenção**. E isso é menos sobre “deixar bonito” e mais sobre **governança**: como evitar que cada tela vire um universo paralelo de cores, espaçamentos e botões?

Imagine um time que começa com 2 pessoas. Em poucas semanas já existem:

* 6 variações de botão (“azul”, “azul2”, “azul-claro”, “primario”, “primary”, “btnMain”)
* espaçamentos quase iguais (8px, 10px, 12px, 14px…)
* inputs com foco (focus) diferente em cada página
* uma mudança de paleta que vira caça ao tesouro

As abordagens comuns para atacar isso em React/Next:

### CSS “tradicional”

Você cria arquivos `.css` globais e aplica classes no HTML. Funciona, mas em escala tende a sofrer com:

* **colisão de nomes** (`.button` em dois lugares diferentes)
* dependência forte da ordem de import/cascade
* regras “vazando” para componentes que não deveriam ser afetados

### CSS Modules (escopo local)

Você escreve CSS normal, mas com **escopo por arquivo** (por componente). Isso reduz conflitos e torna o comportamento mais previsível, sem exigir um runtime.

### Utility-first (Tailwind)

Em vez de inventar infinitas classes semânticas (`.card`, `.card2`, `.cardNew`), você compõe UI com **utilitários atômicos** (`p-4`, `rounded-lg`, `text-sm`), usando uma **escala** (spacing, fonte, cores) para manter consistência.

### Component libraries (shadcn/ui, MUI, Chakra)

Você adota um conjunto de componentes prontos (ou semi-prontos) com acessibilidade e padrões já embutidos. Isso acelera o time, mas muda o tipo de trabalho: você passa a gerenciar **tema, customização e consistência** em cima da biblioteca.

### Trade-offs (o que você troca por quê)

Você sempre paga um preço — a pergunta é **qual preço você prefere pagar**.

* **Clareza**: é fácil entender de onde vem o estilo?
* **Velocidade**: dá para construir telas rápido?
* **Controle**: você consegue ajustar detalhes sem brigar com o sistema?
* **Escalabilidade**: o projeto continua consistente com mais gente mexendo?
* **Bundle/perf**: quanto CSS/runtime você leva para produção?
* **DX (Developer Experience)**: o time consegue trabalhar sem fricção?

**Conceito-chave: “estilo também é arquitetura”**
Arquitetura é como você organiza complexidade para mudanças futuras. Estilo, em produto real, é exatamente isso: **um conjunto de decisões que precisam continuar funcionando quando tudo muda** (time cresce, features acumulam, design evolui).

---
![alt text](image.png)
*Figura 1 — Global CSS vs CSS Modules (escopo e conflito de classes)*

---

## 2. CSS Modules (escopo local e previsível)

### O que é

CSS Modules é **CSS normal**, porém com um detalhe importante: as classes do arquivo viram **um objeto importado** e são transformadas em nomes únicos (geralmente com hash) no build.

Isso permite que você escreva `.container`, `.title`, `.button` **sem medo** de colidir com outra `.button` de outro lugar.

### Modelo mental: por que o “hash” existe?

Pense assim:

* No CSS global, `.button` é um **apelido público**: qualquer pessoa pode usar, sobrescrever ou ser afetada por ele.
* No CSS Module, `.button` é um **apelido privado**: quando o projeto compila, ele vira algo como `button__a1b2c3`.
  Não é “mágica”; é só uma estratégia de nomes únicos para garantir escopo.

### Uso típico em React/Next

O padrão mais comum é:

* Arquivo termina com `*.module.css`
* Você importa como objeto
* Usa no `className`

```tsx
// Button.tsx
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export function Button({ variant = "primary", children }: ButtonProps) {
  // Modelo mental: styles.<nome> vira uma string única gerada no build.
  const className =
    variant === "primary" ? styles.primary : styles.secondary;

  return <button className={className}>{children}</button>;
}
```

```css
/* Button.module.css */
.primary {
  /* classe local: não colide com outras .primary do projeto */
  background: #1d4ed8;
  color: white;
  border-radius: 12px;
  padding: 10px 14px;
}

.secondary {
  background: transparent;
  color: #1d4ed8;
  border: 1px solid #1d4ed8;
  border-radius: 12px;
  padding: 10px 14px;
}
```

**Dica**
CSS Modules brilha quando você quer **CSS de verdade** (pseudo-classes, seletores, media queries) com **escopo previsível**, sem discutir com cascade global.

### Composição e padrões (sem virar gambiarra)

#### 1) “Classes utilitárias locais”

Em vez de repetir regras, crie pequenos blocos locais úteis:

```css
/* Card.module.css */
.card { border-radius: 16px; padding: 16px; }
.softShadow { box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
```

```tsx
import styles from "./Card.module.css";

function Card({ elevated }: { elevated?: boolean }) {
  // Modelo mental: você está compondo strings de classes, como no CSS normal,
  // só que cada “pedaço” é local e seguro.
  const className = elevated
    ? `${styles.card} ${styles.softShadow}`
    : styles.card;

  return <div className={className}>...</div>;
}
```

#### 2) Variantes simples sem acoplar demais

Variantes (“primary/secondary”, “sm/md/lg”) são inevitáveis. O erro é deixar isso espalhar sem padrão.

Uma forma segura é padronizar **um lugar** onde você monta classes (um helper pequeno), evitando duplicação.

```ts
// classNames.ts (helper simples)
export function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}
```

```tsx
import styles from "./Badge.module.css";
import { cx } from "../lib/classNames";

function Badge({ intent = "info" }: { intent?: "info" | "danger" }) {
  return (
    <span className={cx(styles.base, intent === "danger" && styles.danger)}>
      ...
    </span>
  );
}
```

**Conceito-chave**
A “unidade” de organização em CSS Modules é o **componente**. Se você sente vontade de criar um arquivo de Module gigantesco “para tudo”, você está voltando ao problema do CSS global — só que com outro nome.

### Global CSS vs Modules: quando usar cada um

* **Global (pouco e bem definido)**:

  * reset/normalize
  * tipografia base (ex.: `body`, `a`, `h1`)
  * tokens CSS (variáveis) e temas
* **CSS Modules (quase todo o resto)**:

  * layout e aparência de componentes
  * estados locais (hover, active)
  * variantes do componente

**Atenção**
Global CSS tende a virar “lixo radioativo”: mexer em um lugar quebra outro. Use global como **infraestrutura** (base), e Modules como **implementação de componentes**.

### Boas práticas

* **Naming semântico**: prefira `.header`, `.title`, `.actions` em vez de `.blueText`, `.margin10`.
* Evite seletores profundos do tipo `.card .header .title span`
  Isso amarra estilo à estrutura e torna refatoração dolorosa.
* Prefira **classes explícitas** nos pontos importantes do componente.

### Erros comuns (e por que acontecem)

* **“Por que minha classe não pega?”**

  * Você escreveu a classe no CSS Module, mas usou `className="minhaClasse"` ao invés de `className={styles.minhaClasse}`.
  * Você está tentando acessar uma chave que não existe (`styles.minha_classe` vs `.minhaClasse`).
* **Colisões globais disfarçadas**

  * Você usa CSS Module, mas mantém um arquivo global com seletores genéricos (`button { ... }`, `.button { ... }`).
* **Acoplamento ao markup**

  * Estilo depende de uma hierarquia específica. Quando muda um `<div>`, tudo desmorona.

---

## 3. Tailwind (utility-first com consistência via design system)

### O que é Tailwind (modelo mental)

Tailwind é uma biblioteca de classes utilitárias. Mas a parte importante não é “ter muitas classes”; é que essas classes representam uma **escala consistente**.

Pense na diferença:

* “CSS livre”: cada pessoa escolhe `margin: 13px`, `font-size: 15px`, `border-radius: 9px`.
* “Sistema”: o time escolhe uma escala (ex.: 8, 12, 16, 20…) e **todo mundo compõe usando esses degraus**.

Tailwind te empurra para o “sistema” porque:

* `p-4` significa um passo específico da escala de spacing
* `text-sm`, `text-lg` seguem uma escala de tipografia
* cores e estados têm uma gramática consistente (`hover:...`, `focus:...`)

**Conceito-chave**
Tailwind não é um “atalho para escrever menos”. É um jeito de codificar **um design system mínimo** diretamente na forma como você escreve UI.

---
![alt text](image-2.png)
*Figura 2 — Tailwind como sistema (tokens/escala → utilitários → componentes)*

---

### Como pensar classes: um roteiro mental

#### 1) Layout primeiro (estrutura)

* display: `flex`, `grid`
* alinhamento e espaçamento: `items-center`, `justify-between`, `gap-4`
* dimensionamento: `w-full`, `max-w-md`

#### 2) Tipografia (hierarquia)

* tamanho e peso: `text-sm`, `text-lg`, `font-medium`
* legibilidade: `leading-6`, `tracking-tight`

#### 3) Cores e estados (feedback)

* base: `bg-...`, `text-...`, `border-...`
* interação: `hover:...`, `active:...`
* foco/acessibilidade: `focus-visible:...`

#### 4) Responsividade (mobile-first)

Em Tailwind, você geralmente escreve o estilo base (mobile) e “sobe” com breakpoints.

```tsx
export function Header() {
  return (
    <header className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-lg font-semibold">painel</h1>
      <nav className="flex gap-3 text-sm">
        <a className="underline-offset-4 hover:underline" href="#">docs</a>
        <a className="underline-offset-4 hover:underline" href="#">conta</a>
      </nav>
    </header>
  );
}
```

**Modelo mental do exemplo:**

* A estrutura é coluna no mobile (`flex-col`) e vira linha em telas maiores (`sm:flex-row`).
* Você não está “escrevendo CSS em linha”; você está declarando composição a partir de um vocabulário padronizado.

---

### Organização e legibilidade (sem “className gigante”)

Existe um risco real no Tailwind: o componente vira um parágrafo de classes. O antídoto não é “voltar ao CSS global”, e sim **organizar abstrações na hora certa**.

Boas estratégias:

1. **Extrair componentes de UI**
   Se várias telas usam o mesmo padrão de botão, transforme em `<Button />`.
   Isso reduz repetição e centraliza decisões de estilo.

2. **Helpers para montar classes**
   Um helper simples (equivalente ao `cx`) mantém lógica fora do JSX.

3. **Variantes com padrão**
   Em projetos maiores, é comum padronizar “intent/size” (ex.: primary/ghost, sm/md/lg).
   Você pode fazer isso com um mapeamento simples sem depender de bibliotecas.

```ts
// buttonStyles.ts
const base =
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2";

const intents = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800",
  ghost: "bg-transparent hover:bg-neutral-100",
};

const sizes = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
};

export function buttonClassName(opts?: {
  intent?: keyof typeof intents;
  size?: keyof typeof sizes;
}) {
  const intent = opts?.intent ?? "primary";
  const size = opts?.size ?? "md";
  return [base, intents[intent], sizes[size]].join(" ");
}
```

```tsx
import { buttonClassName } from "./buttonStyles";

export function Button({
  intent,
  size,
  children,
}: {
  intent?: "primary" | "ghost";
  size?: "sm" | "md";
  children: React.ReactNode;
}) {
  // Modelo mental: "botão" é um componente-base com variantes estáveis.
  return <button className={buttonClassName({ intent, size })}>{children}</button>;
}
```

**Dica**
O objetivo não é “esconder Tailwind”. O objetivo é **centralizar decisões** que precisam ser consistentes.

---

### Customização: theme/tokens e dark mode (noção)

A ideia-chave é: **você decide escalas e semântica**, e o time usa isso como contrato.

* Tokens/escala: spacing, cores, tipografia coerentes
* Dark mode: estilos que mudam de forma previsível, sem duplicar tudo

**Atenção**
O erro comum é tratar Tailwind como “atalho” e começar a usar valores arbitrários a cada ajuste. Isso destrói o ganho principal: consistência.

---

### Boas práticas com Tailwind

* Prefira **escala** ao invés de valores “quebrados”
* Padronize componentes-base (botão, input, card)
* Garanta estados de foco visíveis (teclado) e contraste adequado
* Defina uma regra clara para CSS global (se existir): base/tokens, não “layout da página X”

### Erros comuns

* Inconsistência por “valores quebrados” (cada dev inventa uma distância/tamanho)
* Misturar Tailwind e CSS global sem estratégia
* “Abstrair cedo demais”: criar uma camada de helpers tão grande que ninguém entende
* Ignorar foco/teclado: UI “bonita no mouse”, ruim no acesso

---

## 4. Bibliotecas de UI: shadcn, MUI e Chakra (quando e por quê)

Biblioteca de UI é como adotar uma “fábrica” de componentes. Você ganha velocidade e padrões, mas precisa aceitar uma governança: tema, customização e consistência não acontecem sozinhos.

### 4.1 shadcn/ui

#### O que é (e o que não é)

* **É:** um conjunto de componentes que você **gera/copia para dentro do seu repositório** e passa a manter como código do projeto (geralmente construídos sobre primitives de acessibilidade e usando Tailwind).
* **Não é:** uma dependência “mágica” que você atualiza e pronto. Como o código vira seu, você é responsável por entender e manter.

Vantagens:

* Você tem **controle total** do código no repo.
* Boa base de acessibilidade **quando os primitives são bem usados**.
* Combina muito bem com Tailwind e com um design system próprio.

Custos:

* Você precisa **manter e entender** o que foi gerado.
* Atualizações não são “um clique”; exigem cuidado para não quebrar customizações.

Padrão de uso e organização (visão geral):

* Componentes de base ficam em uma pasta única (ex.: `/components/ui`)
* Você cria seus componentes de produto (ex.: `/components/features/...`) usando os primitives

**Atenção**
Detalhes de instalação, comandos e estrutura exata podem mudar. Trate a documentação oficial como fonte de verdade quando for implementar.

---

### 4.2 MUI (Material UI)

Filosofia:

* Biblioteca completa: componentes prontos, maduros e um sistema de tema robusto.
* Excelente para ganhar produtividade quando você aceita (ou aproxima) o visual do Material Design, ou quando precisa de componentes complexos rapidamente.

Pontos fortes:

* Ecossistema amplo (componentes avançados, padrões consolidados)
* Produtividade alta em CRUDs e painéis
* Theming bem estruturado

Pontos de atenção:

* Customização profunda pode virar “luta contra o framework visual”
* Bundle e dependências podem crescer (depende do uso)
* Se seu design é muito específico, você pode gastar energia “descaracterizando” componentes

Theming e estilo (noção):

* Você costuma centralizar tokens (cores, tipografia, radius) no tema
* O resto do app consome o tema para manter coerência

**Atenção**
APIs e detalhes de integração em Next (App Router) variam por versão. Confirme na doc oficial no momento de implementar.

---

### 4.3 Chakra UI

Filosofia:

* Componentes com “style props”: você monta UI com props de estilo e tema, com foco em DX e acessibilidade.
* A experiência é “rápida para prototipar”, com composição simples.

Pontos fortes:

* DX agradável: componente + props, composição rápida
* Acessibilidade é um objetivo central
* Theming direto e consistente quando bem configurado

Pontos de atenção:

* Sem governança, “style props” podem virar inconsistência (cada tela com espaçamento próprio)
* Controle fino pode exigir mais disciplina (principalmente com design muito específico)
* Bundle/runtime depende do uso e do padrão adotado

Theming (noção):

* Centralize decisões no tema (tokens)
* Evite “inventar” valores em cada componente

**Atenção**
Detalhes de API/config podem mudar. Confirme na doc oficial.

---

### 4.4 Comparativo honesto (sem fanboy)

Quando escolher cada uma:

* **CSS Modules**: ótimo para times que querem CSS “puro”, escopo seguro e controle fino, com baixo risco de dependência de biblioteca.
* **Tailwind**: ótimo quando você quer **consistência por escala** e velocidade, e aceita compor UI com utilitários + componentes-base.
* **shadcn/ui**: ótimo quando você quer acelerar com componentes já desenhados, mas **mantendo controle no repositório** (bom para design system próprio).
* **MUI**: ótimo para produto que precisa de muitos componentes complexos e rapidez, especialmente em interfaces tipo painel/admin.
* **Chakra**: ótimo para prototipação rápida e apps que valorizam DX, desde que o time imponha disciplina de tokens e padrões.

Quando misturar:

* **Tailwind + shadcn/ui** costuma ser uma mistura natural.
* Misturar **MUI + Tailwind** ou **Chakra + Tailwind** exige muita estratégia (senão vira duas filosofias competindo).

Riscos típicos: “Frankenstein UI”

* botão do MUI em uma tela, botão custom Tailwind em outra, input do Chakra em um modal…
* cada componente tem padding, radius e foco diferentes
* o usuário percebe como “produto remendado”

**Atenção**
Misturar 3 abordagens sem estratégia quase sempre piora. A inconsistência vira dívida técnica e dívida de UX ao mesmo tempo.

---

## 5. Consistência visual (o que separa projeto amador de projeto profissional)

Consistência visual não é “tudo igualzinho”; é **um conjunto de decisões coerentes** que o usuário aprende sem perceber.

### Design tokens (conceito)

Tokens são valores nomeados que representam decisões de design.

* **Cores**: não é só “azul #1d4ed8”; é o papel semântico:

  * `primary`, `success`, `danger`, `neutral`
* **Tipografia**:

  * tamanhos e pesos padronizados (ex.: `sm`, `base`, `lg`)
* **Espaçamentos**:

  * escala (ex.: 4, 8, 12, 16, 24…)
* **Radius e sombras**:

  * poucos níveis bem definidos (ex.: `md`, `lg`)

**Conceito-chave**
Token é um contrato. Se amanhã “primary” mudar de tom, você não quer caçar 200 hexadecimais no projeto.

### Componentização: primitives e variantes

Em projeto real, você quer “primitivos” confiáveis:

* `<Button />`, `<Input />`, `<Card />`, `<Modal />`

E quer variantes controladas:

* `size`: sm/md/lg
* `intent`: primary/secondary/danger
* `state`: loading/disabled

A consistência vem quando:

* tokens → alimentam componentes-base
* variantes → são combinadas de forma previsível
* telas → só “montam” blocos, sem inventar estilo do zero

### Acessibilidade como parte da consistência

Consistência também é comportamento:

* contraste adequado (texto legível)
* foco visível no teclado (`Tab`)
* feedback claro de erro/sucesso (não só cor; mensagens e ícones ajudam)

**Atenção**
Remover foco (outline) “porque é feio” é um clássico. Em produto profissional, foco é parte do UX — e parte da acessibilidade.

### Evitar “pixel chasing”

“Pixel chasing” é ajustar caso a caso até “parecer certo”, sem sistema.

* Decisões sistêmicas (tokens e componentes) > ajustes pontuais em 20 telas
* Ajuste pontual cria exceções; exceções viram padrão; o padrão vira caos

---
![alt text](image-1.png)
*Figura 4 — Consistência: tokens → componentes base → variantes → telas*

---

## 6. Organização de projeto (estilos sem virar bagunça)

Organização é o que impede que a estilização vire um campo minado.

Uma estrutura simples e escalável:

* `/app`
  rotas e layouts do App Router
* `/components`

  * `/ui` (componentes-base: Button, Input, Card)
  * `/features` (componentes específicos de domínio)
* `/styles`

  * `globals.css` (base: reset, tipografia, tokens CSS se usados)
  * `tokens.css` (opcional: variáveis de cor/spacing)
* `/lib`

  * helpers de `className`, mapeamento de variantes, utilitários

### Estratégias por stack

#### Com CSS Modules

* `globals.css` pequeno e “infra”
* cada componente com seu `Component.module.css`
* tokens em variáveis CSS globais (opcional), consumidos nos Modules

#### Com Tailwind

* tokens e padrões vivem no “sistema” (escala) e em componentes-base
* evite CSS global para layout de páginas; prefira compor com utilitários
* variantes centralizadas (mapeamento de classes) em `/components/ui` ou `/lib`

#### Com UI libs (MUI/Chakra)

* tema centralizado (um lugar só)
* customizações e overrides também centralizados
* crie wrappers/base components quando necessário para padronizar uso

### Convenções que evitam caos

* Defina um padrão único para variantes (`intent`, `size`, `state`)
* Nomeie componentes-base de forma clara (o que é “ui” vs “feature”)
* Documente “o mínimo” no próprio código (comentários e tipos bem nomeados)

**Dica**
Quando alguém novo entra no time, ele deve conseguir responder em 5 minutos:

1. onde mexo no estilo global?
2. onde crio um componente-base?
3. como aplico variantes sem inventar moda?

---

## 7. Guia de decisão (como escolher abordagem no seu projeto)

Escolha baseada em critérios práticos:

### Critérios

* **Time pequeno vs grande**

  * time grande precisa de mais “contratos” (tokens, componentes-base)
* **Design próprio vs design pronto**

  * design próprio pede controle (Tailwind + tokens / CSS Modules + tokens)
  * design pronto pede biblioteca (MUI/Chakra) para velocidade
* **Velocidade vs controle**

  * velocidade: UI library
  * controle: CSS Modules / Tailwind bem disciplinado
* **Longevidade**

  * quanto mais tempo o projeto vive, mais importante é consistência e governança

### Recomendações realistas

* Projetos pequenos:

  * **Tailwind** (com componentes-base) ou **CSS Modules** bem feito
* Projetos com “cara de produto” e design system:

  * **Tailwind + tokens + componentes-base** (e shadcn/ui se ajudar)
* Produto rápido (MVP com componentes complexos):

  * **UI library** (MUI/Chakra), com estratégia de tema e consistência desde o começo

**Atenção**
Misturar 3 abordagens sem estratégia costuma piorar: você ganha complexidade de todas e consistência de nenhuma.

---
![alt text](image-3.png)
*Figura 3 — Matriz de decisão: CSS Modules vs Tailwind vs UI Library*

---

## D. Erros comuns e confusões clássicas

* **Global CSS virando “lixo radioativo”**

  * muitos seletores genéricos, regras que afetam tudo, medo de mexer
* **Classes duplicadas e inconsistentes**

  * cada tela reinventa `button`, `card`, `input` com pequenas variações
* **Customizar UI library “na marra”**

  * overrides espalhados, estilos brigando com o sistema da biblioteca
* **Copiar componente pronto sem adaptar tokens**

  * o componente entra com radius/cores/foco diferentes do resto
* **Ausência de estados de foco**

  * UX ruim para teclado e acessibilidade comprometida
* **Misturar Tailwind e CSS Modules sem regra**

  * ninguém sabe onde colocar o quê; estilos se contradizem
* **Acoplamento excessivo ao markup (CSS muito “profundo”)**

  * refatorar HTML quebra estilo; evolução fica cara
* **“Pixel chasing”**

  * ajustes pontuais infinitos sem sistema; dívida visual cresce silenciosamente

---

## Glossário rápido

* **Escopo**: “onde” um estilo vale; local (componente) vs global (app).
* **Cascade (cascata)**: regra de prioridade do CSS baseada em origem, especificidade e ordem.
* **Utility-first**: compor UI com classes pequenas e atômicas, em vez de classes semânticas gigantes.
* **Design tokens**: valores nomeados (cores, spacing, fontes) que representam decisões de design.
* **Theming**: capacidade de aplicar um conjunto de tokens/padrões globalmente (inclui dark mode).
* **Componente base (primitivo)**: bloco reutilizável e estável (Button, Input, Card).
* **Variante**: variação controlada de um componente (size, intent, state).
* **DX (Developer Experience)**: quão fluido e produtivo é desenvolver/manter.
* **Consistência visual**: coerência entre telas e componentes em aparência e comportamento.

---

## Resumo final

Estilização em React/Next não é só “colocar CSS”: é decidir **como o time vai produzir UI de forma consistente** ao longo do tempo.
CSS Modules te dá **escopo local e previsibilidade** com CSS tradicional. Tailwind te dá **um sistema** (escala → utilitários → componentes) que favorece consistência e velocidade quando bem disciplinado. Bibliotecas de UI aceleram muito, mas cobram organização em tema e governança — e misturar filosofias sem estratégia costuma gerar “Frankenstein UI”.
O sinal de maturidade é claro: **tokens bem definidos, componentes-base sólidos e variantes consistentes**.

---

## Referências

* Next.js — Styling (CSS, CSS Modules): [https://nextjs.org/docs/app/building-your-application/styling](https://nextjs.org/docs/app/building-your-application/styling)
* Tailwind CSS — Documentação: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
* shadcn/ui — Documentação: [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
* MUI (Material UI) — Documentação: [https://mui.com/material-ui/getting-started/](https://mui.com/material-ui/getting-started/)
* Chakra UI — Documentação: [https://chakra-ui.com/docs/getting-started](https://chakra-ui.com/docs/getting-started)
