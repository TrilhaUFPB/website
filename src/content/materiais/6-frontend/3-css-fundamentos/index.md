---
title: 3. CSS Fundamentos
description: 
category: Frontend
order: 3
---

# 3. CSS: Fundamentos

**Objetivo da aula**

Entender o CSS “raiz” (puro), como ele é aplicado pelo navegador e como você controla aparência e layout básico de elementos usando regras, seletores, cascata, herança, especificidade, box model, unidades e `display`.

---

**Pré-requisitos**

* Noções básicas de HTML (tags, atributos `class` e `id`, estrutura mínima de um documento).
* Entender que um arquivo `.html` é interpretado pelo navegador e vira uma página.

---

**O que você será capaz de explicar ao final**

* Por que CSS existe e como o navegador combina HTML + CSS para renderizar a página.
* O que é uma regra CSS (seletor + declarações) e como conflitos são resolvidos (cascata, herança, especificidade).
* Como aplicar CSS via arquivo externo e por que isso é a prática padrão.
* Como funcionam seletores essenciais (tag, classe, id), pseudo-classes básicas e boas práticas de uso.
* O box model (content/padding/border/margin), `box-sizing`, colapso de margens e `overflow`.
* Propriedades essenciais (cor, tamanho, espaçamento, bordas, sombras leves) e como ler shorthands.
* Tipografia básica (famílias, tamanhos, peso, `line-height`) com noção de legibilidade.
* Diferenças e usos de `px`, `%` e `rem`.
* Fluxo normal e `display` básico (`block`, `inline`, `inline-block`, `none`).

---

## Sumário

1. [O que é CSS e por que ele existe](#1-o-que-é-css-e-por-que-ele-existe)
   1.1 [Separação de responsabilidades](#11-separação-de-responsabilidades-conteúdo-x-apresentação)
   1.2 [Como o navegador combina HTML + CSS](#12-como-o-navegador-combina-html--css-visão-geral-dom-cssom-e-renderização)
   1.3 [Regra CSS: seletor + declarações](#13-a-ideia-de-regra-css-seletor--declarações)
   1.4 [Cascata, especificidade e herança](#14-conceitos-base-cascata-especificidade-e-herança)
2. [Como aplicar CSS (arquivo externo)](#2-como-aplicar-css-arquivo-externo)
3. [Seletores fundamentais (tag, classe, id)](#3-seletores-fundamentais-tag-classe-id--e-o-jeito-certo-de-usar)
4. [Box Model (o coração do CSS)](#4-box-model-o-coração-do-css)
5. [Propriedades essenciais](#5-propriedades-essenciais-com-agrupamento-didático)
6. [Tipografia básica](#6-tipografia-básica-o-que-você-precisa-saber-já)
7. [Unidades (px, %, rem)](#7-unidades-px--rem--com-intuição-forte)
8. [display e fluxo básico](#8-display-e-fluxo-básico-layout-sem-magia)
9. [Erros comuns e confusões clássicas](#9-erros-comuns-e-confusões-clássicas)
10. [Glossário rápido](#10-glossário-rápido)
11. [Resumo final](#11-resumo-final)
12. [Projeto Prático](#12-projeto-prático)

---

## O que é CSS e por que ele existe

CSS (Cascading Style Sheets) é a linguagem que descreve **como** os elementos do HTML devem **aparecer**: cores, fontes, espaçamentos, bordas e também regras de layout (como os elementos se comportam no fluxo da página).

### Separação de responsabilidades (conteúdo x apresentação)

Pense no HTML como o **roteiro** e a **estrutura**: títulos, parágrafos, listas, formulários. Ele diz “o que é”.
Já o CSS é a **direção de arte**: “como isso deve parecer”.

Essa separação tem vantagens práticas enormes:

* **Manutenção**: mudar o visual sem reescrever conteúdo.
* **Reuso**: o mesmo CSS pode estilizar várias páginas.
* **Consistência**: você cria padrões visuais repetíveis (botões, cards, títulos).
* **Acessibilidade e semântica**: HTML bem feito ajuda leitores de tela e motores de busca; CSS não deve “consertar” semântica ruim.

**Conceito-chave**: CSS não é “enfeite”. Ele é parte do produto. Legibilidade, espaçamento e hierarquia visual são usabilidade.

---

### Como o navegador combina HTML + CSS (visão geral: DOM, CSSOM e renderização)

Quando você abre uma página, o navegador não “desenha” diretamente o HTML. Ele constrói representações internas:

* **DOM (Document Object Model)**: a árvore de nós gerada a partir do HTML.
* **CSSOM (CSS Object Model)**: a árvore/estrutura de regras CSS interpretadas.
* **Render Tree**: combinação do DOM com os estilos calculados (inclui o que realmente aparece; por exemplo, elementos com `display: none` não entram).
* **Layout (reflow)**: cálculo de tamanhos e posições.
* **Paint**: pintura dos pixels (texto, bordas, cores, sombras).
* **Composite**: combinação final das camadas (dependendo do caso).

**Dica**: quando você altera CSS, às vezes o navegador só repinta; outras vezes precisa recalcular layout. Por isso certas mudanças “custam” mais (não é para você otimizar agora — é para entender por que DevTools é importante depois).

![DOM, CSSOM e Render Tree: fluxo do HTML e CSS até a renderização final na tela](/api/materiais-assets/6-frontend/3-css-fundamentos/assets/image.png){width=700px}
*Figura 1 — Do HTML/CSS até a tela (pipeline mental)*

---

### A ideia de regra CSS: seletor + declarações

Uma regra CSS tem dois blocos:

* **Seletor**: diz *quais elementos* serão afetados.
* **Declarações**: dizem *o que aplicar* (propriedades e valores).

Exemplo mínimo (só para contextualizar):

```css
p {
  color: #333;
  line-height: 1.6;
}
```

Aqui:

* `p` é o seletor (seleciona todos os parágrafos).
* `color` e `line-height` são propriedades; `#333` e `1.6` são valores.

**Atenção**: CSS é declarativo. Você não “manda fazer”, você descreve regras. O navegador decide como aplicar, seguindo um conjunto de prioridades (cascata/especificidade/herança).

---

### Conceitos-base: Cascata, Especificidade e Herança

Esses três conceitos explicam por que “o CSS que você escreveu” às vezes não aparece como você esperava.

#### Cascata

É o mecanismo que resolve conflitos quando **múltiplas regras** tentam definir a **mesma propriedade** para o mesmo elemento.

Na prática, a cascata considera:

1. origem do estilo (user-agent do navegador, autor do site, usuário)
2. importância (`!important`)
3. **especificidade** do seletor
4. ordem de aparição (regra mais abaixo geralmente vence se todo o resto empatar)

#### Especificidade

É uma “pontuação” do seletor: quanto mais específico, maior prioridade.
Em termos intuitivos:

* seletor por **id** geralmente “pesa” mais que por classe
* seletor por **classe** pesa mais que por tag
* quanto mais você “empilha” condições, mais específico fica

Exemplo conceitual:

* `#cabecalho` tende a vencer `.cabecalho`
* `.card p` tende a vencer apenas `p`

**Atenção**: especificidade alta demais vira armadilha. Você começa a “brigar” com seu próprio CSS.

#### Herança

Algumas propriedades passam do elemento “pai” para os “filhos”, principalmente as ligadas a texto (como `color`, `font-family`). Outras não herdam (como `margin`, `border`).

Exemplo narrativo: se você define `color` no `body`, todo texto dentro herda, a menos que alguma regra sobrescreva.

**Mini-tabela: cascata vs herança vs especificidade**

| Conceito       | Resolve o quê?        | Onde acontece?                                   | Exemplo típico                       |
| -------------- | --------------------- | ------------------------------------------------ | ------------------------------------ |
| Cascata        | Conflito entre regras | Quando várias regras definem a mesma propriedade | “Qual `color` vence?”                |
| Especificidade | Prioridade do seletor | Dentro da cascata                                | `#id` vence `.classe`                |
| Herança        | Propagação de valores | Do pai para o filho (para certas propriedades)   | `font-family` no `body` afeta textos |

**Conceito-chave**: quando um estilo “não pega”, quase sempre é:
(1) você selecionou o elemento errado, ou
(2) uma regra mais forte venceu (especificidade/ordem), ou
(3) a propriedade não herda como você imaginou.

![Diagrama mostrando como especificidade e cascata resolvem conflitos de estilos CSS](/api/materiais-assets/6-frontend/3-css-fundamentos/assets/image-1.png){width=700px}
*Figura 2 — “Quem vence?” (cascata e especificidade)*

---

## Como aplicar CSS (arquivo externo)

O jeito padrão é criar um arquivo `.css` e “linkar” no HTML:

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

### Por que fica no `<head>`?

Porque o CSS é necessário para o navegador calcular layout e pintar a página corretamente. Colocar no `<head>` ajuda o navegador a descobrir cedo quais estilos aplicar.

**Dica**: CSS normalmente é **render-blocking** (o navegador pode atrasar a pintura até obter estilos). Isso evita “piscadas” de layout sem estilo.

### Ordem de carregamento e prioridade (múltiplos arquivos)

Você pode ter mais de um `<link>`:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="components.css">
<link rel="stylesheet" href="pages/home.css">
```

Regra prática: **se dois seletores tiverem o mesmo peso**, o que vier **por último** tende a vencer (ordem no HTML e, dentro do arquivo, ordem das regras).

### Boas práticas simples de organização

* `base.css`: estilos gerais (tipografia global, cores básicas, ajustes de corpo).
* `components.css`: padrões reutilizáveis (botões, cards).
* `pages/*.css`: ajustes específicos por página, se necessário.

**Reset/normalize como conceito (opcional)**
Browsers aplicam estilos padrão. Às vezes você quer começar de forma mais previsível.

Uma abordagem simples (sem depender de libs externas):

```css
* { box-sizing: border-box; }
body { margin: 0; }
```

**Atenção**: “resetar tudo” sem entender pode apagar estilos úteis (como espaçamento de listas) e te fazer gastar tempo recolocando o que o browser já fazia bem.

### Evitar `style=""` inline — e por quê

Inline style:

```html
<p style="color: red;">Texto</p>
```

Problemas reais:

* Manutenção ruim: visual espalhado no HTML
* Reuso baixo
* **Especificidade alta**: inline costuma vencer regras externas, gerando “briga” de estilos
* Mistura conteúdo e apresentação (volta ao problema que CSS resolve)

---

## Seletores fundamentais (tag, classe, id) => e o jeito certo de usar

Seletores são a “ponte” entre regras e elementos.

### Seletores de tipo (tag)

Seleciona todos os elementos daquela tag:

```css
p { line-height: 1.6; }
```

Bom para padrões gerais de tipografia e consistência.

### Seletor de classe (`.`)

Seleciona elementos com a classe:

```css
.card { padding: 16px; border: 1px solid #ddd; }
```

Use classe quando você quer **reutilizar estilo** em múltiplos lugares.

### Seletor de id (`#`)

Seleciona o elemento com aquele id:

```css
#header { background-color: #fafafa; }
```

Use id como **identificador único**. Em CSS, id é poderoso (especificidade alta) e pode virar problema se você usar “id para tudo”.

**Dica**: na prática moderna, classe é a ferramenta principal para estilo; id fica mais para identificação pontual (e muito comum em JS, âncoras, acessibilidade via `for`/`aria` etc.).

---

### Seletores combinados simples (descendente)

Seleciona `p` que esteja dentro de `.card`:

```css
.card p { margin-top: 0; }
```

**Atenção**: seletores “profundos” (`.a .b .c p span`) criam dependência frágil da estrutura do HTML. Se você muda uma `div`, o estilo “quebra” silenciosamente.

### Agrupamento e encadeamento

**Agrupamento** (mesma regra para seletores diferentes):

```css
h1, h2, h3 { font-family: system-ui, sans-serif; }
```

**Encadeamento** (mesmo elemento com múltiplas classes):

```css
.button.primary { font-weight: 600; }
```

Aqui seleciona elementos que tenham **as duas classes** `button` e `primary`.

### Boas práticas de naming (semântica)

Prefira nomes que descrevem papel/semântica visual, não “como parece hoje”.

* Melhor: `.card`, `.button`, `.alert`, `.nav`
* Evite: `.azul`, `.fonte20`, `.margem10` (isso prende o nome ao detalhe)

**Conceito-chave**: seu CSS é um vocabulário. Bons nomes tornam o código legível e escalável.

### Pseudo-classes essenciais: `:hover` e `:focus`

Pseudo-classes permitem estados visuais sem JavaScript.

Exemplo:

```css
a:hover { text-decoration: underline; }
button:focus { outline: 2px solid #000; }
```

**Atenção**: `:focus` não é “detalhe estético”: é acessibilidade (teclado). Evite remover outline sem oferecer alternativa clara.

![Ilustração dos tipos de seletores CSS: tag, classe, id e combinadores](/api/materiais-assets/6-frontend/3-css-fundamentos/assets/image-2.png){width=700px}
*Figura 3 — Tipos de seletores (mapa rápido)*

---

## Box Model

Todo elemento renderizado é uma caixa retangular. Essa caixa tem camadas:

* **content**: o conteúdo (texto, imagem)
* **padding**: “acolchoamento” interno (espaço entre conteúdo e borda)
* **border**: a borda
* **margin**: espaço externo (separa do resto)

### Dimensões reais: `width/height` vs espaço ocupado

Quando você define:

```css
.box { width: 200px; padding: 20px; border: 5px solid; }
```

Pergunta crucial: a caixa ocupa 200px ou mais?

Depende do `box-sizing`.

### `box-sizing`: `content-box` vs `border-box`

* `content-box` (padrão): `width` mede só o **content**. Padding e borda aumentam o tamanho final.
* `border-box`: `width` inclui content + padding + border. Resultado mais previsível para layout.

Muito comum:

```css
* { box-sizing: border-box; }
```

**Dica**: `border-box` reduz “conta de padeiro” de layout.

### Colapso de margens (introdução)

Margens verticais (top/bottom) de elementos em fluxo normal podem “colapsar” em certas situações: em vez de somar, a maior prevalece.

Exemplo narrativo típico:

* Um `h1` com `margin-bottom: 20px`
* Um `p` com `margin-top: 16px`
  Você poderia esperar 36px, mas pode virar 20px (o maior).

**Atenção**: isso confunde no início porque você “mexeu em um elemento” e o espaço parece mudar “no outro”. Não é bug: é regra do fluxo normal.

### `overflow`: quando o conteúdo “vaza” da caixa

* `overflow: visible` (padrão em muitos casos): deixa vazar
* `overflow: hidden`: corta
* `overflow: auto`: cria scroll se precisar

Isso é parte do box model porque trata a relação “conteúdo vs caixa”.

### Como diagnosticar box model 

Quando algo não encaixa, pense em camadas:

1. o elemento tem `width`/`height`?
2. tem `padding`/`border` que estão inflando?
3. a margem está colapsando?
4. o conteúdo está estourando (`overflow`)?

Ferramentas mentais simples:

* aplicar `outline: 1px solid` temporariamente (não altera layout como `border` pode alterar)
* usar DevTools para ver a “caixa” destacada (content/padding/border/margin)

![Diagrama das camadas do box model: content, padding, border e margin em seções concêntricas](/api/materiais-assets/6-frontend/3-css-fundamentos/assets/image-3.png){width=700px}
*Figura 4 — Box model em camadas*

---

## Propriedades essenciais 

A ideia aqui é criar “pacotes” mentais: cor, tamanho, espaçamento, bordas e acabamento.

### Cores

* `color`: cor do texto
* `background-color`: cor de fundo

Formatos comuns:

* nomes (`black`, `white`) — úteis, mas limitados
* hex (`#RRGGBB`)
* `rgb()` e `rgba()` (com alpha/transparência)

Diferença importante:

* `opacity: 0.5` deixa **tudo** do elemento (incluindo filhos) transparente.
* `rgba(0,0,0,0.5)` afeta só aquela cor (ex.: só o fundo).

**Dica**: se você quer fundo translúcido, prefira `rgba` no background ao invés de `opacity` no container (para não “lavar” o texto junto).

### Tamanhos

* `width`, `height`
* `max-width`, `min-height` etc.

Por que `max-width` é tão importante?
Porque previne layouts “quebrando” em telas menores. Um componente pode crescer até um limite, mas não explodir a página.

Exemplo mínimo:

```css
.container { max-width: 960px; margin: 0 auto; }
```

### Espaçamento

* `margin`: espaço externo
* `padding`: espaço interno

**Shorthand (leitura obrigatória)**

* 1 valor: todos os lados

  * `margin: 16px;` → top/right/bottom/left = 16
* 2 valores: vertical / horizontal

  * `margin: 8px 16px;` → top/bottom = 8, left/right = 16
* 3 valores: top / horizontal / bottom

  * `margin: 8px 16px 4px;`
* 4 valores: top / right / bottom / left (sentido horário)

  * `margin: 8px 12px 4px 12px;`

**`gap` (menção)**
`gap` é “espaço entre itens” em layouts com flex/grid. Aqui é só para você reconhecer quando vir; flex/grid fica para outra aula.

### Bordas

* `border`: espessura + estilo + cor
* `border-radius`: arredondamento

Lembre: borda faz parte do box model.

Exemplo:

```css
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
}
```

### Sombra (acabamento leve)

`box-shadow` dá profundidade, mas use com parcimônia (sombra forte vira “lama visual”).

Exemplo mínimo:

```css
.card { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
```

---

## Tipografia básica 

Texto é onde a maioria das interfaces “vive”. Tipografia ruim derruba a percepção de qualidade.

### `font-family` e fallback fonts

Você declara uma lista: se a primeira não existir, usa a próxima.

Exemplo:

```css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
```

Ideia: terminar com uma família genérica (`sans-serif`, `serif`, `monospace`) para garantir previsibilidade.

### `font-size`, `font-weight`, `line-height`

* `font-size`: tamanho do texto
* `font-weight`: peso (ex.: 400 normal, 700 bold — valores variam conforme fonte)
* `line-height`: altura da linha; influencia legibilidade mais do que muita gente imagina

Boas práticas:

* Evitar texto “apertado”: `line-height` geralmente fica bom em algo como 1.4–1.7 para parágrafos.
* `line-height` proporcional (sem unidade) escala melhor com o tamanho do texto.

Exemplo:

```css
p { font-size: 1rem; line-height: 1.6; }
```

### Alinhamento e detalhes

* `text-align: left/center/right/justify` (cuidado com justify em telas estreitas)
* `letter-spacing`: use com cautela; pequenas mudanças podem prejudicar legibilidade

### Noção de “escala tipográfica”

Em vez de tamanhos aleatórios, você define uma progressão coerente:

* texto base (corpo)
* subtítulo
* título

Isso cria hierarquia visual sem “gritar” com o usuário.

![Comparação visual de diferentes valores de line-height e seu impacto na legibilidade do texto](/api/materiais-assets/6-frontend/3-css-fundamentos/assets/image-4.png){width=700px}
*Figura 5 — `line-height` e legibilidade*

---

## Unidades (px, %, rem)

Unidades não são só “medida”: elas carregam uma filosofia de layout.

### `px` (pixel CSS no mundo moderno)

Hoje, “1px” em CSS é um **pixel CSS**, não necessariamente um pixel físico do monitor. Em telas de alta densidade, vários pixels físicos podem representar 1px CSS.

Uso típico:

* bordas finas
* sombras
* ajustes muito específicos (com parcimônia)

### `%` (relativo a quê?)

`%` depende da propriedade e do contexto. Em geral:

* larguras (`width: 50%`) são relativas ao **contêiner**
* algumas propriedades tipográficas têm regras próprias
* alturas em `%` podem surpreender se o contêiner não tiver altura definida

**Conceito-chave**: `%` é “porcentagem de uma referência”. Sempre pergunte: referência de quê?

### `rem` (relativo à raiz)

`rem` é relativo ao `font-size` do elemento raiz (`html`).
Se `html` tiver `font-size: 16px` (comum), então:

* `1rem` = 16px
* `0.875rem` = 14px
* `1.25rem` = 20px

Por que isso é útil?

* Acessibilidade: se o usuário aumenta a fonte base, o layout escala de forma mais coerente.

### Recomendação prática (regra de bolso)

* **rem**: tipografia e espaçamentos principais (consistência e escalabilidade)
* **px**: detalhes finos (bordas, sombras, pequenos ajustes)
* **%**: dimensões relativas (principalmente larguras)

**Mini-tabela: unidade → referência → uso típico → armadilhas**

| Unidade | Referência                   | Uso típico                    | Armadilhas                                             |
| ------- | ---------------------------- | ----------------------------- | ------------------------------------------------------ |
| px      | pixel CSS                    | borda/sombra/detalhe          | “fixa demais” se usada em tudo                         |
| %       | contexto/contêiner (depende) | largura fluida                | altura % confusa sem referência definida               |
| rem     | fonte raiz (`html`)          | texto e espaçamento escalável | se alguém muda o root, tudo muda (o que pode ser bom!) |

---

## display e fluxo básico (layout sem magia)

### Fluxo normal (document flow)

Por padrão, os elementos seguem o fluxo do documento:

* elementos de bloco “empilham” verticalmente
* elementos inline fluem dentro de uma linha, como palavras

### `display: block`, `inline`, `inline-block`

**block**

* ocupa a largura disponível (por padrão)
* quebra linha antes e depois
* aceita `width`/`height`, `margin`, `padding`

**inline**

* não quebra linha (fica “no meio do texto”)
* `width` e `height` geralmente não se aplicam como você espera
* padding/margin têm comportamento particular (principalmente vertical)

**inline-block**

* fica em linha (como inline)
* mas aceita dimensões (como block)

**Dica**: `inline-block` é um “híbrido” útil quando você quer itens lado a lado com tamanho controlável, sem entrar em flex/grid ainda.

### “Por que meu elemento não aceita `width`?”

Caso clássico: você tentou dar `width` em um elemento `inline` (ex.: `span`, `a`).

Solução: trocar display:

```css
a { display: inline-block; width: 200px; }
```

### `display: none` (e a diferença entre “sumir” e “invisível”)

* `display: none`: remove do fluxo, não ocupa espaço.
* `visibility: hidden` (nota): some visualmente, mas ainda ocupa espaço.

**Atenção**: `display: none` também tira o elemento da árvore de renderização; não é só “ficar transparente”.

### Teaser: posicionamento

Existe `position: relative/absolute/fixed/sticky`, mas isso merece uma aula própria. Por enquanto: lembre que `display` e fluxo normal explicam a maior parte das dúvidas iniciais.

![Visualização do fluxo normal: elementos block empilhados verticalmente e inline fluindo em linhas](/api/materiais-assets/6-frontend/3-css-fundamentos/assets/image-5.png){width=700px}
*Figura 6 — Fluxo normal e tipos de display*

---

## Erros comuns e confusões clássicas 

1. **Usar `id` para tudo**
   Você cria especificidade alta demais e depois precisa “forçar” ainda mais para sobrescrever.

2. **Aumentar especificidade sem perceber**
   Seletores longos e profundos “grudam” no HTML e quebram quando a estrutura muda.

3. **Brigar com a cascata usando `!important`**
   Funciona no curto prazo, vira dívida técnica no médio.

4. **Achar que tudo herda**
   `color` herda, `margin` não. Se algo não mudou, pode ser herança inexistente.

5. **Colapso de margens “misterioso”**
   Você ajusta `margin-top` de um elemento e parece que muda o espaço do outro.

6. **Tentar dar `width` em elemento inline**
   `span` e `a` (inline) costumam ignorar dimensões. Troque `display`.

7. **Misturar `%` sem saber referência**
   Especialmente `height: 100%` sem contêiner com altura definida.

8. **Texto ilegível por `line-height` ruim**
   Fonte pequena e `line-height` baixo “cansa” rápido.

9. **Usar `opacity` no container e “lavar” tudo**
   Se queria só fundo translúcido, use `rgba()` no `background-color`.

---

## Glossário rápido

* **Regra CSS**: seletor + bloco de declarações (propriedades/valores).
* **Cascata**: mecanismo que decide qual regra vence quando há conflito.
* **Especificidade**: “peso” do seletor na disputa de estilos.
* **Herança**: propriedades que passam do pai para os filhos (principalmente texto).
* **DOM**: estrutura em árvore do HTML interpretado.
* **CSSOM**: estrutura em árvore das regras CSS interpretadas.
* **Render Tree**: elementos + estilos finais que serão renderizados.
* **Box model**: content/padding/border/margin — a anatomia da caixa.
* **content-box**: `width/height` medem só o conteúdo.
* **border-box**: `width/height` incluem padding e borda.
* **Fluxo normal**: comportamento padrão de layout (block empilha, inline flui).
* **block/inline/inline-block**: modos de exibição que definem comportamento no fluxo.
* **rem**: unidade relativa ao tamanho da fonte raiz (`html`).
* **shorthand**: propriedade “atalho” que define vários lados/valores numa linha.
* **pseudo-classe**: seletor de estado (ex.: `:hover`, `:focus`).
* **overflow**: como lidar com conteúdo que excede a caixa.

---

## Resumo final

CSS é a linguagem que transforma a estrutura do HTML em uma interface legível e consistente. Para dominar o básico de verdade, você precisa entender três “regras do jogo” (cascata, especificidade e herança), a anatomia de toda caixa na tela (box model) e o comportamento padrão do layout (fluxo normal e `display`). Com esses fundamentos, as propriedades essenciais (cores, tamanhos, espaçamentos, bordas, tipografia e unidades) deixam de ser tentativa-e-erro e viram decisões conscientes — exatamente o que separa “fiz funcionar” de “sei o que estou fazendo”. 

---

## Projeto Prático

Para consolidar o aprendizado desta aula, confira a implementação prática no repositório **to-do**:

📁 **[Aula 2 - CSS Fundamentos](https://github.com/gabrielcarvvlho/to-do/tree/main/aula-2-css-fundamentos)**

Nesta aula prática, você verá como aplicar os conceitos de seletores, box model, cores, tipografia e layout básico em um projeto real.