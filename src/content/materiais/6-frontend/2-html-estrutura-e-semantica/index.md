---
title: 2. HTML Estrutura e Semântica
description: 
category: Frontend
order: 2
---

# 2. HTML: Estrutura e Semântica

## Objetivo da aula

Entender o HTML como **linguagem de marcação** que descreve a **estrutura** e o **significado** do conteúdo de uma página, aprendendo a escrever documentos bem formados, legíveis e semanticamente corretos — base para acessibilidade, manutenção e para o navegador interpretar a página de forma consistente.

---

## Pré-requisitos

- Noções básicas de arquivos e pastas (criar e salvar `.html`)
- Saber abrir um arquivo HTML no navegador
- Familiaridade com o conceito de "tag" (mesmo que superficial)

---

## O que você será capaz de fazer/explicar ao final

- Explicar **o que é HTML de verdade** (estrutura/semântica) e como ele se relaciona com CSS e JavaScript
- Montar a **estrutura mínima** de um documento HTML e justificar cada parte (`doctype`, `head`, `meta`, `title`, `body`)
- Escrever conteúdo com **hierarquia correta** (títulos e parágrafos) e usar `strong`/`em` pelo **significado**, não pela aparência
- Criar **listas**, **links**, **imagens** e **âncoras internas**
- Organizar uma página com **tags semânticas** (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Criar **formulários básicos** com boas práticas de acessibilidade (`label` + `input`, `method`, `action`, tipos essenciais)
- Aplicar boas práticas (semântica, legibilidade, `id` vs `class`, evitar "divitis")

---

## Sumário

1. [O que é HTML de verdade](#1-o-que-é-html-de-verdade)
2. [Estrutura básica de um documento HTML](#2-estrutura-básica-de-um-documento-html)
3. [Conteúdo e hierarquia: títulos e parágrafos](#3-conteúdo-e-hierarquia-títulos-e-parágrafos)
4. [Listas (ul, ol, li)](#4-listas-ul-ol-li)
5. [Links e imagens (a, img)](#5-links-e-imagens-a-img)
6. [Estrutura semântica de página](#6-estrutura-semântica-de-página)
7. [Formulários básicos](#7-formulários-básicos)
8. [Boas práticas gerais e erros comuns](#8-boas-práticas-gerais-e-erros-comuns)
9. [Checklist mental](#9-checklist-mental)
10. [Glossário rápido](#10-glossário-rápido)
11. [Resumo final](#11-resumo-final)
12. [Projeto Prático](#12-projeto-prático)

---

## O que é HTML de verdade

### Estrutura x aparência

HTML (HyperText Markup Language) é uma **linguagem de marcação**. Isso significa que ele serve para **marcar** partes de um conteúdo e atribuir a elas um **papel**: título, parágrafo, navegação, seção, artigo, imagem, formulário etc.

> **Conceito-chave**  
> HTML descreve **o que** cada parte do conteúdo *é* (significado/estrutura), não **como** ela *parece*. A aparência (cor, fonte, espaçamento) é papel do CSS.

Quando você escolhe uma tag, você está fazendo uma escolha semântica. Por exemplo:

- Usar `<h1>` significa "isso é o **título principal** da página".
- Usar `<p>` significa "isso é um **parágrafo** de texto".
- Usar `<nav>` significa "isso é um **bloco de navegação**".

> **Boa prática**  
> Escreva HTML como se você estivesse organizando um documento para ser entendido por pessoas, por leitores de tela e por ferramentas automáticas (navegadores, indexadores, etc.). A aparência você ajusta depois.

> **Anti-padrão**  
> Escolher tags "pelo tamanho" ("usei `<h1>` porque fica grande") é misturar estrutura com estilo. O resultado costuma ser uma página confusa, difícil de manter e pior para acessibilidade.

### HTML, CSS e JavaScript (visão geral)

Pense numa página web como uma casa:

- **HTML = planta/estrutura**: define os cômodos e o que existe em cada um.
- **CSS = acabamento/decoração**: define cores, tamanhos, espaçamentos, layout.
- **JavaScript = comportamento/interatividade**: responde a cliques, validações avançadas, atualizações dinâmicas.

> **Atenção**  
> Nesta aula, vamos ficar no HTML. É comum mencionar que certas experiências (validações sofisticadas, interações complexas) podem exigir JavaScript — mas o **fundamento** é um HTML bem estruturado.

---

## Estrutura básica de um documento HTML

Todo documento HTML completo tem uma "casca" mínima que ajuda o navegador a interpretar corretamente a página.

**Elementos essenciais:**

- `<!doctype html>`: informa que o documento segue o padrão HTML moderno.
- `<html lang="pt-BR">`: elemento raiz; `lang` declara o idioma principal (importante para acessibilidade).
- `<head>`: metadados (configurações, título, informações para o navegador).
- `<meta charset="UTF-8">`: define codificação para acentos e caracteres.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: ajusta a visualização em telas menores (mobile).
- `<title>`: título da aba/janela.
- `<body>`: conteúdo visível (texto, imagens, links, formulários etc.).

> **Dica**  
> O `head` não é "opcional": ele melhora compatibilidade, legibilidade e comportamento em diferentes dispositivos.

### Exemplo mínimo completo

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minha primeira página</title>
  </head>
  <body>
    <h1>Olá, web!</h1>
    <p>Este é um documento HTML com estrutura mínima.</p>
  </body>
</html>
```

**Explicação rápida, linha a linha:**

- `<!doctype html>`: coloca o navegador no "modo padrão" (evita comportamentos antigos).
- `<html lang="pt-BR">`: define o idioma principal (melhora leitura por leitores de tela).
- `<meta charset="UTF-8" />`: garante que "ç", "ã", "é" apareçam corretamente.
- `viewport`: faz a página respeitar a largura do dispositivo (evita "zoom afastado" no celular).
- `<title>`: aparece na aba do navegador e é usado como rótulo do documento.
- `<body>`: tudo o que você quer que o usuário veja fica aqui.

### Como o navegador interpreta isso

O navegador lê o HTML e constrói uma estrutura em memória chamada **DOM** (Document Object Model). Pense no DOM como uma árvore: cada elemento vira um nó, e nós podem conter outros nós.

> **Conceito-chave**  
> O DOM não é "um detalhe interno": ele explica por que **aninhamento** e **hierarquia** importam. Um HTML bem formado vira uma árvore clara; um HTML bagunçado vira uma árvore difícil de entender e de manter.

![Árvore DOM mostrando a hierarquia de elementos HTML: html contendo head e body, com seus respectivos filhos como meta, title, h1 e p](/api/materiais-assets/6-frontend/2-html-estrutura-e-semantica/assets/image.png)

*Figura 1 — Árvore DOM simples*

---

## Conteúdo e hierarquia: títulos e parágrafos

### h1 a h6: hierarquia e leitura

Títulos (`<h1>` a `<h6>`) formam uma **hierarquia de seções**. Eles ajudam:

- O leitor a **escanear** o conteúdo (identificar rapidamente o que existe na página)
- Tecnologias assistivas a navegar (pular para seções)
- Ferramentas a entender a estrutura do documento

> **Boa prática**  
> Use títulos como você usaria em um texto bem organizado: um **título principal** e subtítulos em níveis coerentes.

> **Atenção**  
> É comum a regra prática "um `<h1>` por página". Em páginas simples (site institucional, artigo, landing page), isso funciona muito bem: um título principal claro, e abaixo os subtítulos. Em aplicações mais complexas, ainda assim a ideia central permanece: **não quebre a hierarquia**.

> **Anti-padrão**  
> Pular níveis sem motivo (ex.: `h1` → `h4`) costuma indicar que você está usando heading por aparência, não por estrutura.

### p: parágrafo como unidade de texto

`<p>` representa um **parágrafo**: um bloco de texto com uma ideia ou unidade textual coerente.

> **Boa prática**  
> Quebre o texto em parágrafos quando muda a ideia, como em escrita normal. Isso melhora leitura e manutenção.

### strong vs em: significado semântico

- `<strong>` indica **importância** (o conteúdo é crucial no contexto).
- `<em>` indica **ênfase** (mudança de entonação/ênfase no sentido).

> **Conceito-chave**  
> `strong` e `em` não significam "negrito" e "itálico". Eles carregam **significado**. O CSS pode decidir como isso aparece, mas a semântica é o ponto principal.

**Exemplo bom (semântico):**

```html
<p><strong>Atenção:</strong> salve seu trabalho antes de fechar o navegador.</p>
<p>Eu <em>realmente</em> recomendo ler os títulos antes de começar.</p>
```

**Exemplo ruim (aparência disfarçada de semântica):**

```html
<p><strong>Meu texto em negrito só porque eu quis.</strong></p>
<p><em>Itálico sem intenção de ênfase, só porque eu gostei.</em></p>
```

> **Boa prática**  
> Se a intenção é só aparência (negrito/itálico sem significado), isso é papel do CSS. Use `strong`/`em` quando houver sentido no texto.

![Hierarquia visual de títulos em uma página: h1 como título principal, seguido por dois h2 como subtítulos, e sob um deles dois h3 como subtítulos menores](/api/materiais-assets/6-frontend/2-html-estrutura-e-semantica/assets/image-1.png)

*Figura 2 — Hierarquia visual de títulos*

```
h1: Guia de HTML Semântico
  h2: Introdução
  h2: Estrutura do Documento
    h3: head e metadados
    h3: body e conteúdo
  h2: Conteúdo
    h3: Títulos e parágrafos
    h3: Listas e links
```

---

## Listas (ul, ol, li)

Listas são mais do que "itens com bolinhas": elas comunicam que existe um **conjunto de elementos relacionados**.

- `<ul>`: lista **não ordenada** (a ordem não muda o sentido)
- `<ol>`: lista **ordenada** (a ordem importa)
- `<li>`: item da lista (sempre dentro de `ul` ou `ol`)

> **Dica**  
> Imagine uma página de receitas:
> - Ingredientes: a ordem não muda (use `ul`)
> - Passo a passo: a ordem é essencial (use `ol`)

**Exemplo com boa legibilidade e aninhamento:**

```html
<h2>Ingredientes</h2>
<ul>
  <li>2 ovos</li>
  <li>1 xícara de farinha</li>
  <li>
    Coberturas (opcional):
    <ul>
      <li>Mel</li>
      <li>Frutas</li>
    </ul>
  </li>
</ul>

<h2>Modo de preparo</h2>
<ol>
  <li>Misture os ingredientes secos.</li>
  <li>Adicione os ovos e mexa até ficar homogêneo.</li>
  <li>Asse por 30 minutos.</li>
</ol>
```

> **Boa prática**
> - Mantenha a indentação consistente.
> - Aninhe listas somente quando houver relação clara de "subitens".
> - Evite usar lista para "qualquer coisa alinhada": lista é para **conjuntos**.

---

## Links e imagens (a, img)

### Links absolutos x relativos

Links são criados com `<a>` e o destino vai no atributo `href`.

- **URL absoluta**: inclui protocolo e domínio (ex.: `https://exemplo.com/pagina`)
- **URL relativa**: depende da posição do arquivo atual (ex.: `contato.html`, `imagens/logo.png`)

**Exemplo (externo, absoluto):**

```html
<a href="https://www.exemplo.com">Visitar site</a>
```

**Exemplo (interno, relativo):**

```html
<a href="contato.html">Contato</a>
```

> **Conceito-chave**  
> URL relativa torna seu projeto mais portátil: se você mover a pasta inteira para outro lugar, os links internos continuam funcionando.

### target="_blank" e rel

Abrir em nova aba é possível com `target="_blank"`:

```html
<a href="https://www.exemplo.com" target="_blank" rel="noopener noreferrer">
  Abrir em nova aba
</a>
```

> **Atenção**  
> Quando você usa `target="_blank"`, é boa prática incluir `rel="noopener noreferrer"` por questões de segurança e isolamento entre abas.

> **Boa prática**  
> Use nova aba com critério (por exemplo, quando o usuário está em um fluxo e você quer evitar que ele "perca" a página atual). Em muitos casos, abrir na mesma aba é mais previsível.

### Âncoras internas (#)

Âncoras internas permitem navegar para um ponto da mesma página, geralmente usando `id`.

```html
<nav>
  <a href="#sobre">Sobre</a>
  <a href="#contato">Contato</a>
</nav>

<section id="sobre">
  <h2>Sobre</h2>
  <p>Texto da seção sobre.</p>
</section>

<section id="contato">
  <h2>Contato</h2>
  <p>Texto da seção contato.</p>
</section>
```

> **Dica**  
> Âncoras internas são muito úteis para páginas longas (documentação, artigos, landing pages) e para navegação rápida.

### Imagens: src, alt, width/height

Imagens são inseridas com `<img>`. Ela não tem tag de fechamento, porque é um elemento "vazio".

**Atributos essenciais:**

- `src`: caminho da imagem
- `alt`: texto alternativo (acessibilidade e fallback)
- `width` e `height`: ajudam o navegador a reservar espaço e evitar "pulos" de layout

**Exemplo recomendado:**

```html
<img
  src="imagens/cafe.jpg"
  alt="Xícara de café sobre uma mesa de madeira"
  width="640"
  height="426"
/>
```

> **Conceito-chave**  
> `alt` não é "descrição para SEO". É uma **alternativa textual** para quando a imagem não pode ser vista (leitor de tela, falha de carregamento, conexão lenta).

**Alt bom vs alt ruim:**

```html
<!-- Bom: descreve o conteúdo relevante da imagem -->
<img src="perfil.jpg" alt="Foto de perfil de uma pessoa sorrindo" />

<!-- Ruim: genérico e pouco informativo -->
<img src="perfil.jpg" alt="imagem" />
```

> **Atenção**  
> Se a imagem for **puramente decorativa** e não adicionar informação, é comum usar `alt=""` (vazio). Isso indica a leitores de tela que ela pode ser ignorada.

---

## Estrutura semântica de página

### Por que semântica existe

Tags semânticas existem para que o HTML expresse intenção e papel dos blocos. Isso melhora:

- **Acessibilidade** (leitores de tela identificam navegação, conteúdo principal, rodapé etc.)
- **Manutenção** (você "lê" o HTML e entende o layout conceitual)
- **Clareza estrutural** (a página vira um documento com partes reconhecíveis)
- **SEO como consequência** (ferramentas entendem melhor a organização, mas isso não é o foco)

> **Boa prática**  
> Imagine uma página de blog: cabeçalho com logo, menu, conteúdo do artigo e rodapé. Tags semânticas deixam essa estrutura explícita.

### Quando usar header, nav, main, section, article, footer

- `<header>`: introdução de uma página ou de uma seção (pode conter logo, título, ações iniciais).
- `<nav>`: bloco de navegação (menu principal, menu lateral, "pular para seção").
- `<main>`: conteúdo principal **único** da página (o "miolo" que define a página).
- `<section>`: seção temática dentro de uma página (agrupa conteúdo relacionado).
- `<article>`: conteúdo independente, que faz sentido sozinho (post, notícia, card de artigo).
- `<footer>`: rodapé da página ou de uma seção (créditos, links institucionais, informações finais).

> **Atenção**
> - Em geral, use **um `<main>` por página**.
> - Você pode ter mais de um `header`/`footer` se fizer sentido (por exemplo, `header` dentro de um `article`).

### section vs div (conceitual)

`<div>` é um contêiner **genérico**: não diz "o que é". Ele serve quando não existe um elemento mais específico ou quando você precisa agrupar por motivos estruturais/estilísticos sem significado adicional.

`<section>` tem **significado**: indica uma seção temática do documento e normalmente contém um título (`h2`, `h3`, etc.).

> **Boa prática**
> - Use `section` quando a ideia for "um capítulo/tema" da página.
> - Use `div` quando for apenas "uma caixa" sem significado próprio.

![Wireframe semântico de uma página mostrando as regiões principais: header no topo, nav ao lado esquerdo, main contendo section e article no centro, e footer na base](/api/materiais-assets/6-frontend/2-html-estrutura-e-semantica/assets/image-2.png)
*Figura 3 — Wireframe semântico*

---

## Formulários básicos

### form: action e method (GET x POST)

Formulários são o mecanismo clássico da web para **enviar dados**.

`<form>` envolve os campos e define:
- `action`: para onde os dados serão enviados (uma URL)
- `method`: como serão enviados (principalmente `GET` ou `POST`)

**Visão de alto nível:**

- **GET**: envia dados na URL (bom para buscas e filtros; não ideal para dados sensíveis)
- **POST**: envia dados no corpo da requisição (bom para cadastros/login; mais apropriado para dados maiores/sensíveis)

> **Atenção**  
> Mesmo com `POST`, não pense "está automaticamente seguro". Segurança envolve HTTPS, backend, políticas, etc. Aqui a ideia é entender o papel do HTML no envio.

### label ↔ input (for/id)

`<label>` dá um **nome acessível** para o campo e melhora usabilidade: clicar no texto pode focar o input.

A associação é feita com:
- `label for="id-do-input"`
- `input id="id-do-input"`

> **Boa prática**  
> Sempre que possível, use `label` associado. Isso é um dos maiores ganhos de acessibilidade com pouco esforço.

> **Anti-padrão**  
> Usar apenas `placeholder` e omitir `label` prejudica leitura (o placeholder some quando você digita) e acessibilidade.

### Tipos essenciais de input

Alguns tipos comuns e úteis:

- `text`: texto geral
- `email`: indica campo de e-mail (teclado e validação básica do navegador)
- `password`: mascara a digitação
- `checkbox`: múltipla seleção (sim/não, ou várias opções)
- `radio`: seleção única dentro de um grupo (mesmo `name`)

> **Dica**  
> Escolher o `type` adequado melhora a experiência especialmente no celular (teclado contextual) e permite validações simples do navegador, sem JavaScript.

### button: submit vs button

- `<button type="submit">`: envia o formulário
- `<button type="button">`: botão genérico (não envia)

> **Atenção**  
> Se você não define `type`, o comportamento pode variar conforme o contexto; em formulários, muitos navegadores tratam `button` como `submit`. Ser explícito evita surpresa.

**Exemplo pequeno de formulário "bem feito" (comentado):**

```html
<form action="/cadastro" method="post">
  <h2>Criar conta</h2>

  <label for="nome">Nome</label>
  <input id="nome" name="nome" type="text" autocomplete="name" />

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" autocomplete="email" />

  <label for="senha">Senha</label>
  <input id="senha" name="senha" type="password" autocomplete="new-password" />

  <fieldset>
    <legend>Preferências</legend>

    <label>
      <input name="novidades" type="checkbox" />
      Receber novidades por e-mail
    </label>
  </fieldset>

  <button type="submit">Cadastrar</button>
</form>
```

> **Conceito-chave**  
> Repare que:
> - Cada `input` importante tem `name` (é o "nome do dado" enviado).
> - `label` está presente e associado.
> - `fieldset`/`legend` organizam um grupo conceitual de campos (melhora leitura e acessibilidade).

| | |
|---|---|
| ![Dois diagramas lado a lado mostrando a associação correta entre label e input: à esquerda, um label com atributo 'for' conectado a um input com 'id' correspondente; à direita, um exemplo de campo de e-mail com label "E-mail" e input type="email"](/api/materiais-assets/6-frontend/2-html-estrutura-e-semantica/assets/image-3.png){width=300px} | ![Exemplo visual de formulário preenchido mostrando campos de texto, e-mail, senha e checkboxes com labels claramente associados](/api/materiais-assets/6-frontend/2-html-estrutura-e-semantica/assets/image-4.png){width=400px} |


*Figura 4 — Associação label ↔ input*

---

## Boas práticas gerais e erros comuns

> **Boa prática — Semântica acima de aparência**
> - Não use `h1` "porque é grande".
> - Não use `strong` "porque deixa em negrito".
> - Escolha tags pelo que elas **significam**.

> **Boa prática — Estrutura limpa e legível**
> - Indentação consistente (2 ou 4 espaços, mas seja consistente).
> - Fechamentos corretos e aninhamento bem formado.
> - Uma ideia por bloco: título → parágrafos → lista → etc.

> **Anti-padrão — "Divitis"**  
> Usar `<div>` para tudo é um sinal de que a página não está comunicando estrutura. Se existe uma tag semântica adequada (`main`, `nav`, `header`, `article`), use-a.

> **Conceito-chave — id vs class**
> - `id`: **único** na página (um elemento com aquele identificador).
> - `class`: **reutilizável** (vários elementos podem compartilhar).
> 
> **Uso típico:**
> - `id` é bom para âncoras (`#secao`) e para elementos realmente únicos.
> - `class` é bom para estilização (CSS) e padrões repetidos.

> **Atenção**  
> Mesmo que você ainda não esteja usando JavaScript, entender `id` vs `class` desde cedo evita HTML inconsistente e facilita evoluções.

> **Boa prática — Nomes bons e consistentes**
> - Prefira nomes descritivos, em **kebab-case** para IDs e classes (ex.: `id="area-contato"`, `class="card-produto"`).
> - Evite abreviações confusas.

> **Boa prática — Atributos globais úteis**
> - `lang` no `<html>`: essencial para idioma.
> - `title`: use com cuidado; pode ajudar como dica contextual, mas não substitui um texto claro na tela.
> - `aria-*`: existe para acessibilidade, mas deve ser usada com entendimento. Em geral, um HTML semântico bem escrito reduz a necessidade de `aria`.

> **Atenção**  
> "Arrumar no CSS" não corrige um HTML semântico ruim. CSS melhora aparência; semântica ruim continua ruim para leitores de tela e para manutenção.

---

## Checklist mental

Uma revisão rápida (conceitual) antes de considerar seu HTML "pronto":

- [ ] Minha página tem **estrutura mínima correta** (`doctype`, `lang`, `meta charset`, `meta viewport`, `title`)?
- [ ] Os **títulos** seguem uma hierarquia coerente, sem pular níveis sem motivo?
- [ ] Usei `strong`/`em` pelo **significado**, não pela aparência?
- [ ] Listas estão em `ul/ol` com `li` e aninhamento faz sentido?
- [ ] Links estão com `href` correto (relativo/absoluto) e `target="_blank"` (se usado) tem `rel` adequado?
- [ ] Imagens têm `alt` informativo (ou vazio quando decorativas) e dimensões quando apropriado?
- [ ] A página tem blocos semânticos claros (`header/nav/main/...`) e evitei `div` desnecessária?
- [ ] Em formulários, cada campo tem `label` associado e `name` definido?

---

## Glossário rápido

- **Elemento**: a unidade do HTML (ex.: um parágrafo é um elemento).
- **Tag**: a "marca" do elemento (ex.: `<p>` e `</p>`).
- **Atributo**: informação extra na tag (ex.: `href`, `src`, `alt`, `id`, `class`).
- **DOM (Document Object Model)**: representação em árvore do documento que o navegador constrói a partir do HTML.
- **Semântica**: significado do conteúdo e papel de cada parte do documento.
- **Acessibilidade**: capacidade de uso por pessoas com diferentes necessidades (inclui leitores de tela, navegação por teclado, etc.).
- **URL absoluta**: endereço completo (com `https://` e domínio).
- **URL relativa**: endereço dependente do caminho atual do arquivo.

---

## Resumo final

HTML é a base estrutural da web: ele organiza o conteúdo e comunica significado. Quando você escolhe tags corretamente — títulos em hierarquia, parágrafos, listas, links, imagens com `alt`, blocos semânticos e formulários com `label` — você cria páginas mais claras, mais acessíveis e muito mais fáceis de manter. CSS e JavaScript entram depois para aparência e comportamento, mas um bom HTML continua sendo o "esqueleto" que sustenta tudo.

---

## Projeto Prático

Para consolidar o aprendizado desta aula, confira a implementação prática no repositório **to-do**:

📁 **[Aula 1 - HTML](https://github.com/gabrielcarvvlho/to-do/tree/main/aula-1-html)**

Nesta aula prática, você verá como aplicar os conceitos de estrutura semântica e formulários em um projeto real.

---
