---
title: JavaScript no Navegador
description: 
category: Frontend
order: 6
---

# JavaScript no Navegador: DOM, Eventos, Formulários, Validação e localStorage

## Objetivo da aula

Entender como o JavaScript “entra” numa página web para **ler e modificar o DOM**, reagir a **eventos do usuário**, **manipular formulários**, aplicar **validação simples** e usar **localStorage** para persistência básica no navegador — tudo com JavaScript puro.

## Pré-requisitos

* HTML básico (tags, atributos, formulários com `input`, `label`, `button`)
* CSS básico (classes e noção de layout)
* JavaScript básico (variáveis `let/const`, funções, condicionais e loops)

## O que você será capaz de explicar ao final

* O que é o **DOM** e por que ele precisa existir antes de ser manipulado
* Como **selecionar** elementos com `querySelector`, `querySelectorAll` e `getElementById`
* Como **alterar** texto, atributos, classes e criar/remover elementos
* Como funcionam **eventos** e `addEventListener`, incluindo `event.target` e `preventDefault`
* Como ler e controlar dados de **formulários** sem recarregar a página
* Como fazer **validação simples** (HTML + JS) com mensagens claras
* O que é **localStorage**, suas limitações e como salvar/ler valores (inclusive objetos via JSON)

---

## Sumário

* [1. Onde o JavaScript entra na página (modelo mental)](#1-onde-o-javascript-entra-na-página-modelo-mental)
* [2. DOM na prática: selecionar elementos](#2-dom-na-prática-selecionar-elementos)
* [3. Alterar elementos (o básico que resolve 80% dos casos)](#3-alterar-elementos-o-básico-que-resolve-80-dos-casos)
* [4. Eventos: como a página “escuta” o usuário](#4-eventos-como-a-página-escuta-o-usuário)
* [5. Manipulação de formulários (com modelo mental sólido)](#5-manipulação-de-formulários-com-modelo-mental-sólido)
* [6. Validação simples (sem complicar e sem bibliotecas)](#6-validação-simples-sem-complicar-e-sem-bibliotecas)
* [7. localStorage (noções) — persistência simples no navegador](#7-localstorage-noções--persistência-simples-no-navegador)
* [8. Boas práticas e “higiene” de código para DOM](#8-boas-práticas-e-higiene-de-código-para-dom)
* [9. Erros comuns e confusões clássicas](#9-erros-comuns-e-confusões-clássicas)
* [10. Glossário rápido](#10-glossário-rápido)
* [11. Resumo final](#11-resumo-final)
* [12. Projeto Prático](#12-projeto-prático)

---

## 1. Onde o JavaScript entra na página (modelo mental)

Um jeito útil de pensar em uma página web é separar responsabilidades:

* **HTML** define a **estrutura** (o que existe: títulos, parágrafos, botões, inputs).
* **CSS** define a **aparência** (como parece: cores, espaçamentos, layout).
* **JavaScript** define o **comportamento** (o que acontece: ao clicar, enviar, digitar, alternar tema).

O JavaScript no navegador atua principalmente sobre a “representação viva” do HTML: o **DOM**.

>Conceito-chave: o navegador não “enxerga” seu HTML como texto depois que a página carrega. Ele converte o HTML em uma **árvore de nós (nodes)** na memória. Essa árvore é o **DOM (Document Object Model)**.

### Momento de execução: por que o DOM precisa existir antes

Se seu script roda cedo demais, ele tenta selecionar elementos que ainda **não foram criados** pelo navegador — e isso gera `null` e erros.

Existem duas formas comuns (e corretas) de garantir que o DOM exista antes do JS manipular elementos:

1. **Colocar o `<script>` no final do `<body>`**
   O navegador lê o HTML de cima para baixo. Se o script vem depois do conteúdo, o DOM daquele conteúdo já foi construído.

2. **Usar `defer` no `<script>` dentro do `<head>`**
   Com `defer`, o navegador baixa o arquivo JS sem travar a renderização e **só executa o script depois** de construir o DOM.

>Dica: em projetos pequenos, “script no fim do body” é simples e funciona bem. Em projetos maiores, `defer` ajuda a manter organização (scripts no `<head>`) sem quebrar o DOM.

### Conceito de DOM: a página como uma árvore

A árvore DOM tem nós como `document`, elementos (`<div>`, `<button>`…), texto, comentários etc. Em geral, você vai trabalhar com **elementos** (Element nodes).

![alt text](image.png)
*Figura 1 — Árvore do DOM (HTML → nós → elementos)*

---

## 2. DOM na prática: selecionar elementos

Selecionar um elemento é obter uma **referência** para ele em uma variável. A partir disso, você consegue ler propriedades e alterar seu estado (texto, classes, atributos etc.).

### Seletores essenciais

#### `document.querySelector(...)`

Retorna **o primeiro** elemento que bate com o seletor CSS informado.

* Seletor por **tag**: `"button"`
* Seletor por **classe**: `".botao-primario"`
* Seletor por **id**: `"#email"`

Se não encontrar nada, retorna `null`.

#### `document.querySelectorAll(...)`

Retorna uma **lista de elementos** que batem com o seletor. Essa lista é um **NodeList**.

* Pode vir vazia (tamanho 0).
* É comum iterar com `forEach`.

#### `document.getElementById(...)` (visão geral)

Retorna o elemento com aquele `id`. É direto e rápido, mas menos flexível que seletores CSS.

>Conceito-chave: **um elemento** (`Element`) e **uma lista de elementos** (`NodeList`) são coisas diferentes. Erros comuns surgem quando você tenta usar métodos de elemento em uma lista.

### Exemplo mínimo (HTML + JS) para dar contexto

**HTML**

```html
<h1 id="titulo">Cadastro</h1>
<button class="acao">Mudar título</button>
```

**JS**

```js
// Seleciona UM elemento (o primeiro que bater)
const $titulo = document.querySelector("#titulo");

// Seleciona UMA lista (NodeList) com todos que baterem
const $botoes = document.querySelectorAll(".acao");

// Alternativa por id (retorna um elemento ou null)
const $titulo2 = document.getElementById("titulo");
```

### NodeList e iteração (sem complicar)

Um `NodeList` não é um array “completo”, mas geralmente você consegue fazer:

```js
$botoes.forEach(($btn) => {
  // Aqui $btn é um elemento individual
});
```

### Boas práticas ao selecionar

* **Selecione uma vez e reutilize a referência.** Evite ficar repetindo `querySelector` em todo lugar.
* **Nomes de variáveis claros.** Uma convenção comum é prefixar com `$` para lembrar que é referência de DOM:

  * `$form`, `$button`, `$emailInput`, `$msg`

>Dica: a convenção `$` é opcional, mas ajuda muito a “ler” o código rapidamente: “isso aqui é elemento da tela”.

---

## 3. Alterar elementos (o básico que resolve 80% dos casos)

Uma vez que você tem a referência de um elemento, a pergunta vira: **o que exatamente eu quero mudar no DOM?**
Normalmente é uma dessas coisas: texto, atributos/propriedades, classes/estilos, inserir/remover nós.

### Texto e conteúdo: `textContent` vs `innerHTML`

* `textContent`: altera **texto puro**. Seguro para conteúdo vindo do usuário.
* `innerHTML`: interpreta o valor como **HTML** e recria nós por dentro do elemento.

>Atenção: `innerHTML` pode ser perigoso quando você insere conteúdo que veio do usuário (ou de dados não confiáveis). Isso pode abrir brecha para **XSS** (injetar scripts na página).

Exemplo:

```js
const $titulo = document.querySelector("#titulo");

// Seguro: vira texto literal
$titulo.textContent = "Bem-vindo!";

// Perigoso se "..." vier do usuário
// $titulo.innerHTML = "<img src=x onerror=alert(1)>";
```

### Atributos e propriedades (diferença importante)

* **Atributo**: o que está escrito no HTML (`<input type="email">`).
* **Propriedade**: o estado “vivo” no objeto JS (o que o usuário digitou em `input.value`).

Para atributos:

```js
const $img = document.querySelector("img");
$img.setAttribute("alt", "Foto do perfil");
const alt = $img.getAttribute("alt");
```

Para inputs, use propriedades:

```js
const $email = document.querySelector("#email");

// O valor digitado pelo usuário
console.log($email.value);
```

>Conceito-chave: `value` em input **não é texto dentro da tag**. É uma propriedade do elemento que muda conforme o usuário interage.

### Classes e estilos

A forma mais “limpa” de mudar aparência é alternar classes (o CSS faz o resto).

```js
const $box = document.querySelector(".box");

$box.classList.add("ativo");
$box.classList.remove("ativo");
$box.classList.toggle("ativo"); // liga/desliga
```

`style` existe, mas use com parcimônia:

```js
$box.style.borderRadius = "12px";
```

>Dica: preferir classes mantém o estilo no CSS e evita “misturar responsabilidades”.

### Criar e inserir elementos

Quando você precisa adicionar algo novo na página (uma mensagem, um item de lista, etc.):

```js
const $lista = document.querySelector("#lista");

const $item = document.createElement("li");
$item.textContent = "Novo item";

// Insere no final
$lista.append($item);

// Ou no início
// $lista.prepend($item);
```

### Remover elementos

```js
const $aviso = document.querySelector(".aviso");
$aviso.remove();
```

>Conceito-chave: todas essas operações são, no fundo, **mudanças na árvore DOM**: trocar o conteúdo de um nó, alterar atributos do nó, adicionar um nó filho, remover um nó, etc.

---

## 4. Eventos: como a página “escuta” o usuário

Eventos são sinais do navegador dizendo: “algo aconteceu”.

* O usuário clicou (`click`)
* Enviou um formulário (`submit`)
* Digitou em um campo (`input`)
* Mudou seleção (`change`)

O JavaScript reage a eventos usando **listeners**.

### `addEventListener`: assinatura e callback

A ideia é: “quando acontecer X, execute Y”.

```js
const $btn = document.querySelector("#botao");

$btn.addEventListener("click", () => {
  // callback: roda quando o evento acontecer
  console.log("Clicou!");
});
```

>Conceito-chave: o navegador “guarda” a função callback. Ela não roda na hora; roda depois, quando o evento acontecer.

### Eventos essenciais para esta aula

* `click`: botões, links, qualquer elemento clicável
* `submit`: formulários
* `input` e `change` (noções):

  * `input` dispara enquanto digita (ótimo para limpar erro em tempo real)
  * `change` dispara quando o elemento “confirma” a mudança (depende do tipo: select, checkbox, ao sair do campo, etc.)

### O objeto `event`

O navegador passa um objeto com detalhes do evento.

* `event.target`: elemento que disparou
* `event.preventDefault()`: impede o comportamento padrão do navegador

Exemplo:

```js
document.querySelector("#area").addEventListener("click", (event) => {
  console.log("Clique veio de:", event.target);
});
```

#### `preventDefault` (crítico em `submit`)

Quando você envia um formulário, o padrão do navegador é **recarregar** e tentar “enviar” para algum lugar. Em apps modernos, frequentemente você quer interceptar esse envio para validar e atualizar a UI.

```js
$form.addEventListener("submit", (event) => {
  event.preventDefault(); // impede recarregar
});
```

### Noção de propagação (bubbling) — teaser

Às vezes parece que um clique “subiu” para elementos pais. Isso acontece porque muitos eventos **propagam** do elemento mais interno para seus ancestrais (bubbling).

>Atenção: isso é a raiz de situações em que um `click` em um botão também ativa um listener em um `div` pai. Nesta aula, basta saber que isso existe.

![alt text](image-1.png)
*Figura 2 — Fluxo de evento: usuário clica → listener roda → DOM atualiza*

---

## 5. Manipulação de formulários (com modelo mental sólido)

Formulário é um “pacote” de dados que o usuário preenche. O navegador sabe coletar esses dados e, por padrão, sabe enviar e recarregar. Quando você usa JavaScript, você passa a controlar:

1. **ler os valores**
2. **validar**
3. **mostrar feedback**
4. **decidir o próximo passo**

>Conceito-chave: em formulários, você quase sempre trabalha com **propriedades** (como `value` e `checked`) e com o evento `submit`.

### Acessar valores comuns

* Texto: `input.value`
* Checkbox: `checkbox.checked` (boolean)
* Select: `select.value`

Exemplo:

```js
const nome = $nomeInput.value.trim();
const email = $emailInput.value.trim();
const aceitou = $termosCheckbox.checked;
```

### Reset e estados

* `form.reset()`: volta os campos ao estado inicial do HTML.
* Desabilitar botão (noções): útil para evitar duplo clique e dar sensação de processamento mesmo sem async.

```js
$btnSubmit.disabled = true;
// ...processa...
$btnSubmit.disabled = false;
```

### Exemplo mínimo “padrão de mercado”

Um formulário simples que:

* impede recarregar
* lê valores
* mostra mensagem na UI (evitando `alert` como padrão)

**HTML**

```html
<form id="cadastro">
  <label for="nome">Nome</label>
  <input id="nome" name="nome" type="text" required />

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required />

  <button id="btnEnviar" type="submit">Cadastrar</button>

  <p id="mensagem" aria-live="polite"></p>
</form>
```

**JS**

```js
const $form = document.querySelector("#cadastro");
const $nome = document.querySelector("#nome");
const $email = document.querySelector("#email");
const $msg = document.querySelector("#mensagem");
const $btn = document.querySelector("#btnEnviar");

function renderMensagem(texto, tipo) {
  // tipo pode ser "sucesso" ou "erro" (CSS decide a aparência)
  $msg.textContent = texto;
  $msg.classList.remove("sucesso", "erro");
  $msg.classList.add(tipo);
}

$form.addEventListener("submit", (event) => {
  event.preventDefault(); // sem recarregar a página

  const nome = $nome.value.trim();
  const email = $email.value.trim();

  // Aqui, por enquanto, só um feedback simples (validação vem na próxima seção)
  if (nome === "" || email === "") {
    renderMensagem("Preencha nome e e-mail.", "erro");
    return;
  }

  // Simula um "ok" no cliente
  renderMensagem(`Cadastro recebido, ${nome}!`, "sucesso");

  // Opcional: limpar campos
  // $form.reset();
});
```

>Dica: `aria-live="polite"` ajuda leitores de tela a anunciarem mudanças na mensagem, melhorando acessibilidade com pouco esforço.

---

## 6. Validação simples (sem complicar e sem bibliotecas)

Validar é checar se os dados fazem sentido **antes** de seguir adiante.

* Validação no cliente melhora **UX** (feedback rápido).
* Mas não substitui validação no servidor: qualquer pessoa pode burlar o front-end.

>Atenção: “validar só no front” é como colocar um “porteiro simpático” na entrada, mas deixar a porta dos fundos aberta. Serve para orientar, não para garantir segurança.

### Dois níveis (camadas) de validação

#### A) Validação nativa do HTML (suporte)

* `required`
* `type="email"`
* `minlength`, `maxlength` (quando fizer sentido)

Isso já impede algumas submissões e ajuda em navegadores e leitores de tela.

#### B) Validação no JS (mensagens personalizadas e controle)

No JS, você decide:

* quais regras usar
* quando exibir
* onde exibir
* como guiar o usuário (foco no erro, limpar ao corrigir)

### Regras simples comuns

* `required`: campo não pode estar vazio
* tamanho mínimo: por exemplo, nome com pelo menos 3 caracteres
* e-mail: checagem básica (sem “regex monstruosa”)

Uma checagem simples e honesta:

* tem `@` e tem `.` depois do `@`
  Isso não cobre 100% dos e-mails válidos, mas evita erros mais básicos sem complicar.

### Mensagens de erro: onde e como

Em UX, existem duas estratégias comuns:

* mensagem no topo (resume o problema)
* mensagem perto do campo (mais específico)

Uma abordagem simples é ter:

* uma mensagem geral no topo (`#mensagem`)
* e, se quiser, mensagens por campo (não é obrigatório nesta aula)

Além disso:

* limpar erro quando o usuário corrige (ouvindo `input`)
* colocar foco no primeiro campo com erro (para orientar)

**Fluxo mental recomendado:**

1. usuário envia (`submit`)
2. você impede o padrão (`preventDefault`)
3. valida campos em sequência
4. se achar erro: mostra mensagem + foca o campo + encerra
5. se tudo ok: segue e mostra sucesso

![alt text](image-2.png)

*Figura 3 — Fluxo de submit: preencher → submit → preventDefault → validar → mensagens*
    
---
### Exemplo mínimo: validação com mensagens e foco

```js
function emailPareceValido(email) {
  const arroba = email.indexOf("@");
  if (arroba < 1) return false;

  const pontoDepois = email.indexOf(".", arroba + 2);
  return pontoDepois > arroba + 1;
}

function validarCadastro({ nome, email }) {
  if (nome.length === 0) {
    return { ok: false, campo: $nome, mensagem: "Informe seu nome." };
  }
  if (nome.length < 3) {
    return { ok: false, campo: $nome, mensagem: "Nome deve ter pelo menos 3 caracteres." };
  }
  if (email.length === 0) {
    return { ok: false, campo: $email, mensagem: "Informe seu e-mail." };
  }
  if (!emailPareceValido(email)) {
    return { ok: false, campo: $email, mensagem: "E-mail parece inválido. Confira e tente novamente." };
  }

  return { ok: true };
}

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dados = {
    nome: $nome.value.trim(),
    email: $email.value.trim(),
  };

  const resultado = validarCadastro(dados);

  if (!resultado.ok) {
    renderMensagem(resultado.mensagem, "erro");
    resultado.campo.focus(); // guia o usuário para o ponto do problema
    return;
  }

  renderMensagem(`Cadastro recebido, ${dados.nome}!`, "sucesso");
});
```

### Limpar erro quando o usuário corrige (usando `input`)

```js
function limparMensagemSeEstiverErrado() {
  if ($msg.classList.contains("erro")) {
    $msg.textContent = "";
    $msg.classList.remove("erro");
  }
}

$nome.addEventListener("input", limparMensagemSeEstiverErrado);
$email.addEventListener("input", limparMensagemSeEstiverErrado);
```

>Dica: mensagens claras ajudam mais do que mensagens “genéricas” (“Inválido”). Prefira dizer o que faltou e como resolver, sem culpar o usuário.

---

## 7. localStorage (noções) — persistência simples no navegador

Até aqui, tudo que você faz some ao recarregar a página. O `localStorage` é um mecanismo simples para guardar dados **no dispositivo** do usuário.

### O que é

* Armazenamento **chave/valor** persistente no navegador.
* Os dados ficam associados à **origem** (domínio + protocolo + porta).
  Ex.: `https://meusite.com` não acessa dados de `https://outrosite.com`.

### Limitações (por que não é “um banco de dados”)

* Tamanho limitado (varia por navegador, mas é pequeno comparado a bancos reais).
* Não é ideal para muitos dados, nem para consultas complexas.
* Não tem controle de acesso “de verdade”: qualquer script rodando na mesma origem pode ler.

>Atenção: **não guarde senha**, token sensível ou dados privados no `localStorage`. Ele não foi projetado para confidencialidade.

### API básica

* `localStorage.setItem(chave, valor)`
* `localStorage.getItem(chave)` → retorna string ou `null`
* `localStorage.removeItem(chave)`

Exemplo simples (string):

```js
localStorage.setItem("nomeUsuario", "Gabriel");
const nome = localStorage.getItem("nomeUsuario"); // "Gabriel"
```

### Strings apenas: por que `JSON.stringify` / `JSON.parse`

O `localStorage` guarda **apenas strings**. Se você quiser guardar um objeto/array, precisa converter para string.

```js
const preferencias = { tema: "dark", fonte: "grande" };
localStorage.setItem("preferencias", JSON.stringify(preferencias));

const raw = localStorage.getItem("preferencias");
const obj = raw ? JSON.parse(raw) : null;
```

>Conceito-chave: `stringify` transforma objeto → string. `parse` transforma string → objeto.

### Caso de uso didático: lembrar o nome do usuário no formulário

Você pode salvar o nome e preencher automaticamente ao abrir a página.

```js
// Ao carregar a página (script após DOM ou com defer)
const nomeSalvo = localStorage.getItem("nomeUsuario");
if (nomeSalvo) {
  $nome.value = nomeSalvo;
}

// Ao submeter com sucesso, salvar
function salvarNome(nome) {
  localStorage.setItem("nomeUsuario", nome);
}
```

### Diferença para `sessionStorage` (apenas mencionar)

* `localStorage`: persiste até o usuário limpar ou você remover.
* `sessionStorage`: dura apenas enquanto a aba/janela estiver aberta.

![alt text](image-3.png)
*Figura 4 — Diagrama localStorage: chave/valor + JSON stringify/parse*

---

## 8. Boas práticas e “higiene” de código para DOM

Conforme a página cresce, o risco é transformar o código em um “espaguete” de listeners e alterações diretas. Algumas práticas simples deixam tudo mais legível.

### Separe responsabilidades (mesmo sem arquitetura formal)

Uma organização saudável para arquivos pequenos:

1. **Seleção de elementos** (topo)
2. **Funções utilitárias** (renderizar mensagem, validar, salvar no storage)
3. **Handlers de eventos** (listeners chamando funções)

Isso evita “lógica demais dentro do listener”.

### Evite

* Repetir `querySelector` toda hora
* Usar `innerHTML` quando `textContent` resolve
* Enfiar regras de validação, render e armazenamento dentro de um único callback gigante

### Debug (jeito profissional de achar problemas)

* Use `console.log` de forma estratégica:

  * confirme se a seleção não é `null`
  * confirme valores antes e depois do `trim()`
  * confirme o caminho do fluxo (entrou no if? saiu?)

>Dica: o erro mais comum em DOM é “não selecionei o que eu achava que selecionei”. Conferir referências no console economiza tempo.

### Erros comuns de seleção

Se `querySelector` retorna `null`, normalmente é:

* seletor errado (`"#Email"` vs `"#email"`)
* script rodando cedo (DOM ainda não existe)
* elemento não está na página atual (ex.: HTML diferente)

---

## 9. Erros comuns e confusões clássicas

* **Script roda antes do DOM existir**
  Sintoma: `querySelector(...)` retorna `null` e você vê erro ao tentar usar `.addEventListener` ou `.textContent`.
  Correção: script no fim do body ou `defer`.

* **`querySelector` retorna `null` e o código “quebra”**
  Modelo mental: `null` significa “não achei elemento nenhum”.
  A primeira pergunta é: “o seletor está certo e o elemento existe?”

* **Confundir `value` com `textContent`**
  `value` é para inputs (estado digitado).
  `textContent` é para texto dentro de elementos (p, div, span, etc.).

* **Esquecer `preventDefault()` no `submit`**
  Sintoma: página recarrega e você “perde” a mensagem/estado.
  Correção: `event.preventDefault()` no handler.

* **Usar `innerHTML` sem necessidade e criar brecha de XSS**
  Se o conteúdo vem do usuário, use `textContent`.
  `innerHTML` só deve ser usado com conteúdo controlado e com consciência do risco.

* **Validar só no front-end e achar que está seguro**
  Validação no cliente é UX. Segurança exige validação no servidor.

* **Guardar dados sensíveis no `localStorage`**
  Qualquer script da mesma origem pode ler. Não é lugar de segredo.

* **Esquecer `JSON.stringify` / `JSON.parse`**
  Sintoma: você salva objeto e depois lê “`[object Object]`” ou erra ao tratar como objeto.
  Regra: localStorage guarda string → use JSON quando precisar guardar estruturas.

* **NodeList vs elemento único**
  `querySelectorAll` não tem `.classList` diretamente. Você precisa iterar.

---

## 10. Glossário rápido

* **DOM**: representação em árvore do documento HTML na memória do navegador.
* **Nó (node)**: unidade da árvore DOM (elemento, texto, etc.).
* **Árvore**: estrutura hierárquica de pai/filho (como o DOM organiza a página).
* **Seletor**: padrão (CSS) usado para encontrar elementos (ex.: `#id`, `.classe`, `tag`).
* **`querySelector`**: seleciona o primeiro elemento que bate com o seletor.
* **`querySelectorAll`**: seleciona todos os elementos que batem; retorna `NodeList`.
* **NodeList**: coleção de elementos retornada por `querySelectorAll` (iterável, não é “array completo”).
* **Evento**: sinal disparado pelo navegador (click, submit, input…).
* **Listener**: função registrada para executar quando um evento acontecer.
* **Callback**: função passada como argumento para ser executada depois.
* **`preventDefault`**: impede o comportamento padrão do navegador (ex.: submit recarregar).
* **`submit`**: evento do formulário ao tentar enviar.
* **`input`**: evento ao alterar valor enquanto digita/interage com um campo.
* **Validação**: checagem de regras dos dados (obrigatoriedade, formato, tamanho).
* **localStorage**: armazenamento persistente chave/valor (strings) no navegador.
* **JSON**: formato textual para representar objetos; usado com `stringify`/`parse`.

---

## 11. Resumo final

Nesta aula, você consolidou o modelo mental do JavaScript no navegador: o HTML vira uma **árvore DOM**, e o JavaScript trabalha apontando para nós dessa árvore para **ler e modificar** o que o usuário vê. Com **eventos** e `addEventListener`, a página deixa de ser estática e passa a **reagir**: clique, envio de formulário, digitação. Em formulários, o padrão é controlar o `submit` com `preventDefault`, **validar** com regras simples (HTML + JS) e oferecer mensagens claras. Para persistência básica, `localStorage` permite guardar pequenas preferências (como nome ou tema), lembrando que ele guarda **strings** e não é lugar para dados sensíveis.

---

## 12. Projeto Prático

Para consolidar o aprendizado desta aula, confira a implementação prática no repositório **to-do**:

📁 **[Aula 5 - JavaScript no Navegador](https://github.com/gabrielcarvvlho/to-do/tree/main/aula-5-js-navegador)**

Nesta aula prática, você verá como aplicar os conceitos de DOM, eventos, formulários, validação e localStorage em um projeto real.

---

