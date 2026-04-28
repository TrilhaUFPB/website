---
title: 4. CSS Responsividade
description: 
category: Frontend
order: 4
---

# 4. CSS (Layout Responsivo): Flexbox, Grid e Media Queries

**Objetivo da aula**
Entender como construir layouts que se adaptam bem a diferentes tamanhos de tela usando CSS puro, com foco em *modelo mental* (como pensar layout) e não em decorar propriedades.

**Pré-requisitos**

* Noções de HTML básico (estrutura de tags, `class` e `id`)
* CSS básico (seletores, box model, `display`, espaçamento com `margin`/`padding`)
* Entendimento de que elementos são “caixas” no fluxo da página

**Ao final, você será capaz de explicar**

* O que é *layout responsivo* e por que sites “quebram” no celular
* Quando escolher **Flexbox** (1D) e quando escolher **Grid** (2D)
* Como **eixos** e **distribuição de espaço** funcionam no Flexbox
* Como **linhas/colunas**, **fr**, **minmax** e **áreas** organizam um Grid
* Como aplicar **mobile-first** com **media queries** sem virar “CSS de gambiarra”
* Boas práticas para manter layouts consistentes, debuggáveis e fáceis de evoluir

---

## Sumário

* [1. O que é layout responsivo (e o problema que ele resolve)](#1-o-que-é-layout-responsivo-e-o-problema-que-ele-resolve)

  * [1.1 Evolução: desktop fixo → múltiplos tamanhos → mobile-first](#11-evolução-desktop-fixo--múltiplos-tamanhos--mobile-first)
  * [1.2 Conceitos essenciais: viewport, “quebra” no celular, responsivo vs adaptativo](#12-conceitos-essenciais-viewport-quebra-no-celular-responsivo-vs-adaptativo)
  * [1.3 Princípios práticos: fluidez e conteúdo guiando o layout](#13-princípios-práticos-fluidez-e-conteúdo-guiando-o-layout)
  * [1.4 As três ferramentas: Flexbox (1D), Grid (2D), Media Queries](#14-as-três-ferramentas-flexbox-1d-grid-2d-media-queries)
* [2. Modelo mental de Flexbox (layout principal)](#2-modelo-mental-de-flexbox-layout-principal)

  * [2.1 Quando usar Flexbox](#21-quando-usar-flexbox)
  * [2.2 Container vs itens; main axis vs cross axis](#22-container-vs-itens-main-axis-vs-cross-axis)
  * [2.3 Propriedades do container](#23-propriedades-do-container)
  * [2.4 Propriedades dos itens](#24-propriedades-dos-itens)
  * [2.5 Pitfalls clássicos](#25-pitfalls-clássicos)
  * [2.6 Exemplo padrão de mercado: header e cards com wrap](#26-exemplo-padrão-de-mercado-header-e-cards-com-wrap)
* [3. Modelo mental de Grid (layout mais complexo)](#3-modelo-mental-de-grid-layout-mais-complexo)

  * [3.1 Quando usar Grid](#31-quando-usar-grid)
  * [3.2 Conceitos: tracks, linhas, áreas; 2D vs 1D](#32-conceitos-tracks-linhas-áreas-2d-vs-1d)
  * [3.3 Propriedades essenciais do container](#33-propriedades-essenciais-do-container)
  * [3.4 Posicionamento e áreas](#34-posicionamento-e-áreas)
  * [3.5 Exemplo padrão de mercado: sidebar + conteúdo e grid de cards responsivo](#35-exemplo-padrão-de-mercado-sidebar--conteúdo-e-grid-de-cards-responsivo)
* [4. Responsividade na prática: Mobile-first e Media Queries](#4-responsividade-na-prática-mobile-first-e-media-queries)

  * [4.1 O que é mobile-first](#41-o-que-é-mobile-first)
  * [4.2 Sintaxe e lógica: min-width vs max-width](#42-sintaxe-e-lógica-min-width-vs-max-width)
  * [4.3 Breakpoints vêm do conteúdo](#43-breakpoints-vêm-do-conteúdo)
  * [4.4 O que mudar em breakpoints](#44-o-que-mudar-em-breakpoints)
  * [4.5 Acessibilidade e responsividade](#45-acessibilidade-e-responsividade)
  * [4.6 Exemplo mínimo com 2 breakpoints (1 → 2 → 3 colunas)](#46-exemplo-mínimo-com-2-breakpoints-1--2--3-colunas)
* [5. Boas práticas de layout (para não virar “CSS de gambiarra”)](#5-boas-práticas-de-layout-para-não-virar-css-de-gambiarra)

  * [5.1 Comece simples: fluxo normal + max-width + padding](#51-comece-simples-fluxo-normal--max-width--padding)
  * [5.2 Evitar height fixa (quando possível)](#52-evitar-height-fixa-quando-possível)
  * [5.3 Preferências que ajudam o layout “respirar”](#53-preferências-que-ajudam-o-layout-respirar)
  * [5.4 Padronização com tokens simples](#54-padronização-com-tokens-simples)
  * [5.5 Debug de layout: pensar em caixas](#55-debug-de-layout-pensar-em-caixas)
  * [5.6 Performance e manutenção](#56-performance-e-manutenção)
  * [5.7 Responsividade sem excessos](#57-responsividade-sem-excessos)
* [Erros comuns e confusões clássicas](#erros-comuns-e-confusões-clássicas)
* [Glossário rápido](#glossário-rápido)
* [Resumo final](#resumo-final)
* [Projeto Prático](#projeto-prático)

---

## O que é layout responsivo (e o problema que ele resolve)

Layout responsivo é a capacidade de uma interface **reorganizar e redimensionar** seus elementos para permanecer legível e utilizável em diferentes telas — de um celular pequeno a um monitor ultrawide.

Imagine um site pensado como uma folha A4: largura fixa, tudo “encaixado” milimetricamente. Em um celular, essa “folha” não cabe. O navegador tenta “apertar” ou “encaixar” do jeito que dá: texto minúsculo, colunas estourando, botões apertados, rolagem lateral. Responsividade é evitar que isso aconteça.

>**Conceito-chave:** responsividade não é “fazer caber”. É **preservar hierarquia visual, leitura e interação** sob diferentes restrições de espaço.

### Evolução: desktop fixo → múltiplos tamanhos → mobile-first

* **Era do desktop fixo:** layouts com larguras fixas (`px`), geralmente centrados, assumindo monitores similares.
* **Explosão de tamanhos:** notebooks, tablets, celulares grandes e pequenos, telas retina, TVs.
* **Mobile-first:** projetar primeiro para a menor tela (maior restrição) e **adicionar** melhorias conforme há mais espaço.

A motivação do mobile-first é simples: se você consegue organizar bem o conteúdo com pouco espaço, você ganha um layout mais robusto e fácil de evoluir.

### Conceitos essenciais: viewport, “quebra” no celular, responsivo vs adaptativo

**Viewport** é a “janela” na qual o navegador renderiza a página. Em celulares, se você não informa corretamente o viewport, o navegador pode simular uma largura maior (como se fosse desktop) e depois reduzir visualmente, bagunçando escalas e quebras de linha.

Um detalhe prático (e essencial) é a tag:

```html
<!-- Coloque no <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Isso diz: “use a largura real do dispositivo”.

>**Atenção:** sem essa meta tag, você pode escrever CSS “correto” e ainda assim ver o site renderizado como se fosse um desktop encolhido no celular.

**Responsividade vs adaptabilidade (sem drama):**

* **Responsivo:** layout muda de forma *fluida* e contínua (larguras relativas, grids que se ajustam, wrap).
* **Adaptativo:** layout troca *em etapas* (por exemplo, um layout para mobile e outro para desktop), geralmente guiado por breakpoints.

Na prática, projetos reais misturam os dois: base fluida + alguns pontos de ajuste.

### Princípios práticos: fluidez e conteúdo guiando o layout

Dois princípios evitam muita dor:

1. **Layout fluido (fluid layout)**
   Use larguras relativas e limites saudáveis:

* `max-width` para não ficar largo demais em telas grandes
* `%`, `fr`, `minmax()` e `auto` para permitir adaptação
* `gap` para espaçamento consistente

2. **O conteúdo guia o layout (não o contrário)**
   Quando o layout força o conteúdo (ex.: alturas fixas, colunas rígidas), o que “vaza” não é o conteúdo — é a fragilidade do layout. Um bom layout assume que:

* textos podem crescer (tradução, acessibilidade, zoom)
* itens podem faltar ou sobrar
* imagens podem ter proporções diferentes

>**Dica:** pense como um designer de sistemas: você não desenha uma tela; você desenha **regras** para uma família de telas.

### As três ferramentas: Flexbox (1D), Grid (2D), Media Queries

* **Flexbox (1D):** excelente para distribuir itens em **uma dimensão por vez** (linha *ou* coluna). É o “motor” de alinhamento e espaçamento em componentes.
* **Grid (2D):** ideal para páginas e seções onde você controla **linhas e colunas simultaneamente**.
* **Media queries:** pontos de ajuste quando o layout precisa mudar **decisivamente** (ex.: de 1 para 2 colunas; sidebar aparece; paddings aumentam).

---

## Modelo mental de Flexbox (layout principal)

Flexbox é como organizar objetos em uma prateleira: você decide se a prateleira é horizontal ou vertical, quanto espaço há entre os itens, como eles se alinham e se podem “quebrar” para outra linha.

### Quando usar Flexbox

Use Flexbox quando você precisa:

* distribuir itens em uma linha/coluna com **alinhamento consistente**
* criar barras de navegação, headers, toolbars
* alinhar ícones e textos
* construir listas de cards que podem usar `wrap`
* centralizar conteúdo *de forma intencional* (e não por tentativa-e-erro)

>**Conceito-chave:** Flexbox resolve **organização local** (componentes). Para **layout global** (página inteira), Grid costuma ser mais direto.

### Container vs itens; main axis vs cross axis

No Flexbox há dois papéis:

* **Flex container:** o elemento com `display: flex;`
* **Flex items:** os filhos diretos do container

E há dois eixos:

* **Main axis (eixo principal):** direção em que os itens são distribuídos (linha ou coluna)
* **Cross axis (eixo transversal):** perpendicular ao main axis

A propriedade que muda a direção do eixo principal é `flex-direction`.

>**Atenção:** `justify-content` e `align-items` sempre dependem do eixo. Quem confunde eixos confunde tudo no Flexbox.

![Diagrama ilustrando os conceitos de Flexbox: container com eixo principal (main axis) horizontal e eixo transversal (cross axis) vertical, mostrando propriedades justify-content e align-items controlando o posicionamento dos flex items](/api/materiais-assets/6-frontend/4-css-responsividade/assets/image.png){width=800px}
*Figura 1 — Flexbox: eixos e alinhamentos*
---

### Propriedades do container

#### `display: flex`

Ativa o comportamento flex no container. A partir daí, os filhos diretos viram flex items.

```css
.container {
  display: flex;
}
```

#### `justify-content`

Controla **distribuição ao longo do main axis**. Valores comuns:

* `flex-start`: itens no início
* `center`: itens no centro
* `space-between`: primeiro no início, último no fim, espaço entre
* `space-around` / `space-evenly`: distribuições com espaçamento “ao redor” (úteis, mas use com critério)

>**Dica:** `space-between` é um clássico para “logo à esquerda e menu à direita”.

#### `align-items` vs `align-content` (diferença importante)

* **`align-items`** alinha **os itens dentro de uma linha** (cross axis). Funciona na maioria dos casos.
* **`align-content`** alinha **o conjunto de linhas** quando há múltiplas linhas (ou colunas) — isto é, quando existe `flex-wrap` e sobra espaço no cross axis.

Um jeito de lembrar:

* `align-items`: “como cada item se posiciona na linha”
* `align-content`: “como as linhas se distribuem dentro do container”

>**Atenção:** muita gente tenta usar `align-content` achando que é “centralizar verticalmente”. Se não há múltiplas linhas, ele pode não fazer nada.

#### `gap` (espaçamento sem gambiarra)

`gap` define espaçamento **entre itens** de forma consistente, sem precisar “espalhar” margens nos filhos.

```css
.list {
  display: flex;
  gap: 16px; /* espaço uniforme entre itens */
}
```

>**Conceito-chave:** `gap` é layout declarativo: o espaçamento pertence ao *container*, não a cada item.

#### `flex-wrap`

Define se os itens podem quebrar para a linha seguinte.

* `nowrap` (padrão): tudo tenta caber numa linha (pode esmagar itens)
* `wrap`: itens quebram quando necessário

Isso é uma ferramenta poderosa de responsividade “natural”, porque muitas interfaces não precisam de media query para virar duas linhas — basta permitir quebra.

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

### Propriedades dos itens

#### `flex` (grow, shrink, basis)

`flex` é um atalho para três ideias:

* **`flex-grow`**: o quanto o item pode **crescer** para ocupar espaço extra
* **`flex-shrink`**: o quanto o item pode **encolher** quando falta espaço
* **`flex-basis`**: o “tamanho base” inicial do item (antes de crescer/encolher)

Exemplo de leitura:

* `flex: 1 1 200px;` → começa em 200px, pode crescer, pode encolher
* `flex: 0 0 auto;` → não cresce, não encolhe, tamanho baseado no conteúdo/largura

>**Conceito-chave:** Flexbox não é “definir larguras”; é **negociar espaço**.

#### `order`

Permite mudar a ordem visual dos itens.

```css
.item-destaque { order: -1; }
```

>**Atenção:** `order` muda a ordem visual, mas a ordem no HTML continua a mesma. Isso impacta leitura por teclado e tecnologias assistivas. Use com responsabilidade.

#### `align-self`

Sobrescreve `align-items` para um item específico.

```css
.item { align-self: flex-end; }
```

### Pitfalls clássicos

* **Confundir `justify-content` com `align-items`**
  Lembre: depende do eixo principal (`flex-direction`).
* **Tentar centralizar tudo com `margin`/`padding` “no chute”**
  Centralização é uma regra de layout; Flexbox dá uma regra clara (e estável).
* **Usar `width` fixa em itens que deveriam ser flexíveis**
  Larguras fixas quebram rápido com traduções, zoom e telas pequenas.
* **Esquecer `gap` e criar “margem em todo lugar”**
  Margens distribuídas são difíceis de manter e geram inconsistência.

### Exemplo padrão de mercado: header e cards com wrap

A ideia aqui é mostrar dois padrões comuns:

1. **Header:** logo à esquerda, menu à direita
2. **Cards:** lista que quebra automaticamente com `wrap` e `gap`

**HTML mínimo**

```html
<header class="topbar">
  <div class="logo">MinhaMarca</div>
  <nav class="menu">
    <a href="#">Início</a>
    <a href="#">Produtos</a>
    <a href="#">Contato</a>
  </nav>
</header>

<section class="cards">
  <article class="card">Card A</article>
  <article class="card">Card B</article>
  <article class="card">Card C</article>
  <article class="card">Card D</article>
</section>
```

**CSS essencial**

```css
.topbar {
  display: flex;
  justify-content: space-between; /* separa logo e menu */
  align-items: center;            /* alinha verticalmente */
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.menu {
  display: flex;
  gap: 12px; /* espaçamento limpo entre links */
}

/* Cards: responsivo “por natureza” com wrap */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.card {
  /* base: tenta ter ~240px, mas aceita encolher/crescer */
  flex: 1 1 240px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

>**Dica:** repare que os cards ficam 1 por linha no mobile (se a tela for estreita), 2 ou 3 em telas maiores, **sem media query**, porque a regra é “cada card tenta ter ~240px e quebra quando necessário”.

---

## Modelo mental de Grid (layout mais complexo)

Se Flexbox é “prateleira”, Grid é “papel quadriculado”: você define linhas e colunas e posiciona elementos em uma malha bidimensional.

### Quando usar Grid

Use Grid quando você precisa:

* estruturar **páginas** (header/aside/main/footer)
* controlar **linhas e colunas ao mesmo tempo**
* criar áreas nomeadas (“sidebar”, “conteúdo”, “rodapé”)
* montar galerias e vitrines com colunas que se adaptam com elegância

>**Conceito-chave:** Grid é uma linguagem para **macro-layout**. Você descreve a grade; os elementos “encaixam” nela.

### Conceitos: tracks, linhas, áreas; 2D vs 1D

* **Grid container:** `display: grid;`
* **Grid items:** filhos diretos do container
* **Tracks:** as faixas de **colunas** e **linhas** (cada coluna/linha é uma track)
* **Grid lines:** as linhas que delimitam tracks (numeração das linhas)
* **Grid areas:** regiões retangulares nomeadas (um “mapa” de layout)

A diferença fundamental para Flexbox:

* **Flexbox:** organiza itens em uma dimensão por vez (1D)
* **Grid:** organiza itens em duas dimensões (2D), permitindo planejamento de áreas

![Diagrama mostrando a estrutura do CSS Grid: linhas numeradas delimitando tracks (faixas de colunas e linhas), com áreas nomeadas destacadas formando regiões retangulares do layout](/api/materiais-assets/6-frontend/4-css-responsividade/assets/image-1.png){width=800px}

*Figura 2 — Grid: linhas, colunas e áreas*


### Propriedades essenciais do container

#### `display: grid`

Ativa Grid no container.

#### `grid-template-columns` / `grid-template-rows`

Definem quantas colunas/linhas e seus tamanhos.

```css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr; /* sidebar fixa + conteúdo flexível */
}
```

#### `gap`

Espaço entre tracks. (Mais limpo do que margens nos itens.)

```css
.layout { gap: 16px; }
```

#### `repeat()`

Evita repetição e deixa o CSS mais legível.

```css
.grid {
  grid-template-columns: repeat(3, 1fr);
}
```

#### `fr` (unidade de fração)

`fr` é “parte do espaço disponível”.
`1fr 2fr` significa: “divida o espaço sobrando em 3 partes; a segunda coluna leva 2”.

>**Conceito-chave:** `fr` é um modelo mental: **proporção do espaço livre**, não um valor absoluto.

#### `minmax()` (responsividade sem quebrar)

`minmax(min, max)` define um intervalo: a track não fica menor que `min`, nem maior que `max`.

Um uso clássico para cards:

```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
```

Aqui você diz: “cada coluna deve ter no mínimo 220px; se houver espaço, ela cresce”.

#### `auto-fit` vs `auto-fill` (com intuição e cuidado)

Ambos aparecem com `repeat()` quando você quer “quantas colunas couberem”.

* **`auto-fit`**: “encaixe colunas e **colapse** as que ficarem vazias”
  Resultado típico: itens se esticam para ocupar o espaço disponível (grade mais “cheia”).
* **`auto-fill`**: “crie o máximo de colunas possíveis, mesmo que algumas fiquem vazias”
  Resultado típico: você pode “reservar” espaço para colunas que não têm item.

Na prática:

* Para **vitrine de cards**, `auto-fit` costuma ser a escolha mais natural.
* `auto-fill` pode ser útil quando você quer manter a “estrutura” de colunas mesmo com poucos itens.

>**Dica:** se você usou `auto-fill` e achou que ficou “um buraco” estranho, experimente `auto-fit`.

### Posicionamento e áreas

#### `grid-column` / `grid-row` (visão geral)

Permitem dizer onde um item começa e termina.

```css
.item {
  grid-column: 1 / 3; /* ocupa da linha 1 até antes da 3 (duas colunas) */
}
```

Você não precisa decorar números para tudo, mas entender o mecanismo ajuda a debugar.

#### `grid-template-areas` (um “mapa” do layout)

Define um desenho textual de áreas. Excelente para layouts de página.

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "sidebar main"
    "sidebar main";
}

.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
```

>**Conceito-chave:** áreas funcionam como um “contrato” do layout. Você lê o CSS e entende a página sem imaginar números.

### Exemplo padrão de mercado: sidebar + conteúdo e grid de cards responsivo

**HTML mínimo**

```html
<div class="page">
  <aside class="sidebar">Sidebar</aside>
  <main class="main">
    <h1>Conteúdo</h1>

    <section class="cards-grid">
      <article class="card">Card 1</article>
      <article class="card">Card 2</article>
      <article class="card">Card 3</article>
      <article class="card">Card 4</article>
    </section>
  </main>
</div>
```

**CSS essencial**

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
  padding: 16px;
}

.sidebar {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}

.main {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}

/* Cards que se ajustam sem media query */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
```

>**Dica:** compare este grid de cards com o exemplo de Flexbox com `wrap`. Ambos funcionam. A diferença é que Grid te dá controle direto sobre **colunas**, enquanto Flexbox negocia espaço item a item.

---

## Responsividade na prática: Mobile-first e Media Queries

Media queries são “pontos de ajuste” onde você muda regras de layout. O erro comum é usar media queries para consertar um layout rígido. O uso maduro é: **base fluida + ajustes pontuais**.

### O que é mobile-first

Mobile-first significa:

1. escrever o CSS base pensando em telas pequenas
2. aumentar e enriquecer o layout conforme a tela cresce

Isso costuma resultar em CSS mais curto, porque telas pequenas exigem menos “regras especiais”: geralmente é uma coluna, com espaçamentos adequados.

>**Conceito-chave:** mobile-first não é “design para celular”. É **estratégia de robustez**: comece pela maior restrição.

![Diagrama ilustrando a abordagem mobile-first: layout simples e funcional em telas pequenas, com incrementos visuais e estruturais para telas maiores](/api/materiais-assets/6-frontend/4-css-responsividade/assets/image-2.png){width=800px}
*Figura 3 — Mobile-first: base + incrementos*


### Sintaxe e lógica: min-width vs max-width

**Sintaxe essencial (mobile-first):**

```css
@media (min-width: 600px) {
  /* regras para telas >= 600px */
}
```

* `min-width` (“a partir de”): combina naturalmente com mobile-first.
* `max-width` (“até”): funciona, mas tende a gerar CSS invertido (muitas exceções para telas menores).

>**Dica:** com `min-width`, você lê o CSS como evolução: base → melhora → melhora.

### Breakpoints vêm do conteúdo

Breakpoints não deveriam existir porque “o iPhone X tem tal largura”. Eles existem porque:

* um texto começa a ficar apertado
* cards ficam estreitos demais
* a navegação não cabe mais em uma linha
* a linha de leitura fica longa demais em telas grandes

Em projetos reais, você encontra breakpoints observando quando o **conteúdo** perde qualidade.

Como referência (não regra), é comum ver algo na linha de:

* ~600px (mobile → tablet)
* ~900–1024px (tablet → desktop)
* ~1200px+ (desktop amplo)

>**Atenção:** breakpoints por dispositivo específico envelhecem rápido. Breakpoints por conteúdo envelhecem bem.

### O que mudar em breakpoints

Mudanças típicas (e justificáveis) em breakpoints:

* **número de colunas** em grids/listas
* **paddings e gaps** para aumentar respiro
* **tamanho de fonte** (com cuidado, preferindo `rem`)
* **ordem/visibilidade**, raramente (e sempre pensando em acessibilidade)

>**Atenção:** “sumir com conteúdo” não é responsividade; é perda de informação. Se algo vai ocultar, tenha um motivo forte (priorização) e mantenha acesso por navegação alternativa.

### Acessibilidade e responsividade

Dois pontos que evitam problemas:

* Evite “travar” fontes em `px` em componentes críticos. Usar `rem` permite respeitar preferências do usuário.
* Garanta que o layout suporte **zoom** (navegador/OS). Layouts com larguras fixas e alturas fixas quebram com zoom com facilidade.

>**Conceito-chave:** acessibilidade não é um extra; ela é um “teste de estresse” do seu layout.

### Exemplo mínimo com 2 breakpoints (1 → 2 → 3 colunas)

Aqui faz sentido usar **Grid**, porque a intenção é diretamente “controlar colunas”.

**HTML mínimo**

```html
<section class="catalogo">
  <article class="card">Produto 1</article>
  <article class="card">Produto 2</article>
  <article class="card">Produto 3</article>
  <article class="card">Produto 4</article>
  <article class="card">Produto 5</article>
</section>
```

**CSS (mobile-first)**

```css
.catalogo {
  display: grid;
  grid-template-columns: 1fr; /* mobile: 1 coluna */
  gap: 16px;
  padding: 16px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}

/* >= 600px: 2 colunas */
@media (min-width: 600px) {
  .catalogo {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* >= 1024px: 3 colunas */
@media (min-width: 1024px) {
  .catalogo {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px; /* mais respiro */
    padding: 20px;
  }
}
```

>**Dica:** perceba que os breakpoints mudam o que é estrutural (número de colunas) e também refinam “sensação de espaço” (gap/padding). Isso é mais comum do que só “trocar colunas”.

![Demonstração visual de grid responsivo em três breakpoints: mobile com cards em 1 coluna, tablet com 2 colunas e desktop com 3 colunas, mantendo gap e padding consistentes](/api/materiais-assets/6-frontend/4-css-responsividade/assets/image-3.png){width=800px}
*Figura 4 — Cards responsivos mudando colunas por breakpoint*

---

## Boas práticas de layout (para não virar “CSS de gambiarra”)

Boas práticas não são “regras morais”; elas reduzem custo de manutenção. Layout costuma mudar ao longo do semestre/projeto — e CSS frágil vira retrabalho.

### Comece simples: fluxo normal + max-width + padding

Antes de Flex e Grid, existe o **fluxo normal**: elementos em bloco empilham, inline seguem na linha. Muitos layouts começam bem assim, com um container central.

```css
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}
```

>**Dica:** `max-width + margin: 0 auto` resolve mais do que parece. É o “esqueleto” de muita interface real.

### Evitar height fixa (quando possível)

Altura fixa (`height: 300px`) costuma quebrar por:

* textos maiores (tradução, acessibilidade)
* conteúdo variável (cards com descrições diferentes)
* mudanças de fonte/line-height
* zoom do usuário

Prefira:

* deixar a altura ser definida pelo conteúdo
* usar `min-height` quando você precisa de um “piso”
* controlar espaçamento com `padding` e alinhamento com Flex/Grid

>**Atenção:** altura fixa é uma aposta de que o conteúdo nunca mudará. Em software, essa aposta geralmente perde.

### Preferências que ajudam o layout “respirar”

* **Containers com `max-width`** para leitura confortável em telas grandes
* **`gap` no container** em vez de margens espalhadas
* **Unidades relativas** quando faz sentido:

  * `rem` para tipografia e espaçamentos ligados à leitura
  * `%` / `fr` para larguras fluidas
* **Larguras “intencionais”**:

  * evite `width` fixa em cards; prefira `minmax`, `flex-basis`, `max-width`

### Padronização com tokens simples

Em projetos reais, consistência de espaçamento evita “cada tela com um valor diferente”.

Uma abordagem simples (opcional) é usar variáveis CSS:

```css
:root {
  --space-1: 8px;
  --space-2: 12px;
  --space-3: 16px;
  --space-4: 24px;
}

.section { padding: var(--space-4); }
.list    { gap: var(--space-3); }
```

>**Conceito-chave:** tokens são um jeito de codificar *decisões de design* e diminuir entropia.

### Debug de layout: pensar em caixas

Quando algo “não alinha”, raramente é “o Flexbox está errado”. Normalmente é:

* uma margem inesperada
* um item maior do que parece (padding/border)
* um container sem largura definida do jeito que você supôs

Técnicas práticas:

* usar `outline` temporário para enxergar caixas sem deslocar layout:

```css
* { outline: 1px solid rgba(255, 0, 0, 0.2); }
```

* inspecionar no DevTools: box model, tamanho real, flex/grid overlays
* conferir se o item problemático é **filho direto** do container flex/grid (isso importa!)

Checklist mental rápido:

* O container certo tem `display: flex`/`grid`?
* O item é filho direto desse container?
* Estou alinhando no eixo certo (main/cross)?
* Há `gap` e/ou margens competindo?
* Existe `width`/`height` fixa sabotando a adaptação?

### Performance e manutenção

CSS também “escala mal” se você não tiver disciplina:

* **Evite seletores muito específicos** (cadeias longas e dependentes de estrutura).
  Prefira classes com intenção clara.
* **Evite `!important`**.
  Ele é o equivalente a “forçar a porta”: resolve agora, complica depois. Use como último recurso (ex.: sobrescrever CSS legado ou terceiros — mas aqui estamos em CSS puro, então a necessidade deve ser rara).
* Prefira regras reutilizáveis e consistentes ao invés de exceções por componente.

### Responsividade sem excessos

Antes de criar 10 media queries, tente resolver com:

* **Flexbox com `wrap` + `gap`**
* **Grid com `repeat(auto-fit, minmax(...))`**
* **larguras relativas + `max-width`**
* tipografia fluida *com moderação* (sem exageros)

>**Dica:** media query é uma ferramenta de “mudança estrutural”. Se você está usando para ajustar 2px aqui e ali, provavelmente o layout base está frágil.

---

## Erros comuns e confusões clássicas

* **“Usar Grid para tudo” sem entender o problema**
  Grid é poderoso, mas Flexbox é mais simples e adequado para muitos componentes (menus, alinhamentos locais, toolbars).
* **Confundir `auto-fit` e `auto-fill`**
  Se aparecerem “colunas fantasmas” ou espaços estranhos, revise a intenção: preencher com itens (`auto-fit`) ou reservar slots (`auto-fill`).
* **Centralização errada por excesso de margens/paddings**
  Centralizar é um requisito de layout: use `justify-content`/`align-items` ou `margin: auto` com intenção, não tentativa.
* **Breakpoint baseado em iPhone específico**
  Dispositivos mudam; conteúdo permanece. Breakpoints devem responder ao conteúdo.
* **`width` fixa em card / coluna**
  Em telas pequenas, estoura; em telas grandes, fica estranho. Prefira regras flexíveis com limites (`minmax`, `flex-basis`, `max-width`).
* **Muitos breakpoints**
  Quanto mais pontos, mais combinações de bugs. Se o layout exige dezenas de ajustes, a base provavelmente não é fluida o suficiente.
* **Usar `position: absolute` como “solução de layout”**
  `absolute` tira do fluxo e é ótimo para casos específicos (badges, ícones sobrepostos), mas ruim como estrutura principal (quebra responsividade e manutenção).
* **Ignorar a diferença entre `align-items` e `align-content`**
  `align-content` depende de múltiplas linhas/colunas no flex container.
* **Reordenar elementos com `order` sem pensar em acessibilidade**
  Ordem visual ≠ ordem de leitura/teclado. Pode confundir usuários e tecnologias assistivas.

---

## Glossário rápido

* **Flex container:** elemento com `display: flex`, que controla organização dos filhos.
* **Flex item:** filho direto de um flex container.
* **Main axis:** eixo principal do Flexbox, definido por `flex-direction`.
* **Cross axis:** eixo perpendicular ao main axis.
* **Wrap:** quebra de itens para a próxima linha/coluna (`flex-wrap: wrap`).
* **Grid container:** elemento com `display: grid`, que define uma malha 2D.
* **Track:** uma coluna ou linha do Grid.
* **Grid lines:** linhas que delimitam tracks; usadas para posicionar itens.
* **`fr`:** unidade de fração do espaço disponível no Grid.
* **`minmax()`:** define intervalo de tamanho para uma track (mínimo e máximo).
* **`auto-fit`/`auto-fill`:** estratégias para repetir colunas automaticamente com `repeat()`.
* **Breakpoint:** ponto (geralmente via media query) onde regras mudam.
* **Viewport:** área visível usada para renderização; em mobile depende de configuração via meta tag.
* **Mobile-first:** estratégia de CSS base para telas pequenas com incrementos por `min-width`.

---

## Resumo final

Layout responsivo é, sobretudo, **pensar em regras sob restrição**: telas variam, conteúdo varia, usuários mudam configurações. Você ganha robustez quando:

* usa **Flexbox** para organização 1D e alinhamento em componentes,
* usa **Grid** para estrutura 2D e macro-layout,
* aplica **media queries** como ajustes pontuais (mobile-first),
* prefere soluções fluídas (`wrap`, `minmax`, unidades relativas) antes de “remendar” com dezenas de breakpoints,
* mantém consistência com `gap`, containers com `max-width`, e CSS legível e pouco específico.

## Projeto Prático

Para consolidar o aprendizado desta aula, confira a implementação prática no repositório **to-do**:

📁 **[Aula 3 - CSS Responsivo](https://github.com/gabrielcarvvlho/to-do/tree/main/aula-3-css-responsivo)**

Nesta aula prática, você verá como aplicar Flexbox, Grid e media queries para criar layouts responsivos em um projeto real.