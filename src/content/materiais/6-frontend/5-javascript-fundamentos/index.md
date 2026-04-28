---
title: 5. Javascript Fundamentos
description: 
category: Frontend
order: 5
---

<a id="topo"></a>

# 5. JavaScript (Fundamentos) 

## Objetivo da aula

Construir um **modelo mental correto** de como o JavaScript executa código no navegador e como pensamos em **valores, tipos, variáveis, decisões, repetições, funções e dados** (arrays e objetos). A meta não é decorar sintaxe, e sim entender “o que acontece na cabeça do JS” quando seu programa roda.

## Pré-requisitos

* Noções básicas de **HTML** e **CSS** (o que são e para que servem).
* Familiaridade com a ideia de **instruções** (linha a linha) e **variáveis** (mesmo que de outra linguagem).
* Você já ouviu falar de “console” e “erro”, mesmo sem dominar DevTools.

## O que você será capaz de explicar ao final

* Onde o JavaScript roda no contexto da Web e qual é seu papel.
* A diferença prática entre `let` e `const` (e por que `var` não é foco).
* Os tipos fundamentais (`number`, `string`, `boolean`, `null`, `undefined`) e armadilhas comuns.
* Como funcionam condicionais e loops e como evitar erros clássicos (loop infinito, condição errada).
* O que é uma função, como passar dados (parâmetros) e devolver resultados (`return`).
* Como arrays e objetos são usados para modelar dados do dia a dia e por que “referência” importa.
* Como `map` e `filter` expressam transformação/seleção de dados com callbacks.
* A noção de escopo (global, função e bloco) e por que isso evita bugs.

---

## Sumário

* [1. O que é JavaScript no contexto da Web](#sec1)
* [2. Variáveis: let e const (e por que var não é foco)](#sec2)
* [3. Tipos básicos (com intuição forte)](#sec3)
* [4. Condicionais e loops](#sec4)
* [5. Funções (o conceito central)](#sec5)
* [6. Arrays e objetos](#sec6)
* [7. Métodos de array: map e filter](#sec7)
* [8. Escopo (noção)](#sec8)
* [9. O que vem depois](#sec9)
* [10. Erros comuns e confusões clássicas](#sec10)
* [11. Glossário rápido](#sec11)
* [12. Resumo final](#sec12)
* [13. Projeto Prático](#sec13)

---

<a id="sec1"></a>

## 1) O que é JavaScript no contexto da Web

Quando você abre uma página, o navegador lida com três “camadas” principais:

* **HTML** descreve a **estrutura** (o que existe na página).
* **CSS** descreve a **apresentação** (como parece).
* **JavaScript** descreve o **comportamento/lógica** (o que acontece ao longo do tempo, decisões, cálculos, regras, interação).

Pense assim: o HTML é o “esqueleto”, o CSS é “pele/roupa”, e o JavaScript é o “sistema nervoso” que toma decisões.

### Onde o JS roda

Nesta aula, o foco é **JavaScript no navegador**. Isso significa:

* O código é lido por um **motor JavaScript** embutido no navegador.
* O motor executa as instruções do seu arquivo `.js` seguindo regras bem específicas de linguagem.

>**Dica (modelo mental):** imagine um leitor extremamente literal que percorre o arquivo de cima para baixo, avaliando expressões e executando comandos. Quando ele encontra uma função, ele “aprende” aquela função, mas só executa o corpo quando alguém chama.

### Modelo mental de execução: arquivo → motor JS → instruções

A execução, nesta fase, deve ser vista como:

1. O motor carrega seu arquivo.
2. Ele avalia declarações e cria “nomes” (variáveis/funções) conforme as regras.
3. Ele executa instruções em ordem, linha a linha, **tomando desvios** quando há condicionais e **repetindo** quando há loops.

### Console como ferramenta de observação

O **console** é como um “monitor” do estado do programa:

* Serve para **imprimir valores** e acompanhar o que está acontecendo.
* É uma forma de ver “o que o JS está vendo”.

>**Atenção:** o console é uma lente, não um “modo de programar”. Se você depende do console para “fazer o programa funcionar”, provavelmente está misturando observação com lógica.

---

![alt text](/api/materiais-assets/6-frontend/5-javascript-fundamentos/assets/image.png)
*Figura 1 — Fluxo de execução: sequência, decisão e repetição*

---

<a id="sec2"></a>

## 2) Variáveis: let e const (e por que var não é foco)

### O que é uma variável

Uma variável é um **nome** associado a um **valor**.

* O nome é um rótulo para você (e para o motor JS).
* O valor é o dado que o programa usa (número, texto, objeto, etc.).

Uma boa metáfora: **variável é um post-it com um nome**, apontando para um valor.

### Declaração, atribuição e reatribuição

* **Declarar**: criar o nome.
* **Atribuir**: dar um valor.
* **Reatribuir**: trocar o valor associado ao mesmo nome (quando permitido).

Exemplo mínimo:

```js
let pontos;          // declaração (sem valor inicial)
pontos = 10;         // atribuição
pontos = 15;         // reatribuição (ok com let)
```

>**Conceito-chave:** declarar não é o mesmo que atribuir. Uma variável pode existir e ainda não ter um valor útil para seu programa.

### let vs const

* `let` permite **reatribuição**.
* `const` **não permite reatribuição**.

Exemplo mínimo e objetivo:

```js
let nivel = 1;
nivel = 2; // ok

const pi = 3.14159;
pi = 3.14; // erro: não pode reatribuir uma const
```

#### A confusão clássica: “const não muda” ≠ “objeto é imutável”

`const` impede trocar **para onde o nome aponta**. Mas se esse “para onde” é um **objeto ou array**, o conteúdo **pode** ser mutável.

```js
const user = { name: "Ana", age: 20 };

// Isso é permitido: estamos mudando um conteúdo interno do objeto
user.age = 21;

// Isso NÃO é permitido: reatribuir a variável para outro objeto
user = { name: "Ana", age: 21 }; // erro
```

>**Atenção:** `const` não cria imutabilidade automática. Ele congela a **referência**, não o conteúdo.

### Por que `var` não é foco

`var` existe por razões históricas. Ele tem regras diferentes de escopo e comportamento que costumam confundir iniciantes. Como `let` e `const` são o padrão moderno no navegador, esta base se concentra neles.

### Boas práticas de uso

* Prefira `const` por padrão.
* Use `let` quando você **realmente precisar** reatribuir.
* Use nomes legíveis e semânticos: `total`, `idade`, `precoFinal`, `isAdmin`.

>**Dica:** se você está usando `let` em tudo, provavelmente está deixando de comunicar intenção. `const` é um sinal de “isso não deveria ser trocado”.

---

<a id="sec3"></a>

## 3) Tipos básicos (com intuição forte)

Programar é manipular valores. Valores vêm em tipos diferentes porque o motor precisa saber:

* como armazenar,
* como comparar,
* como operar (somar, concatenar, etc.).

### Tipos fundamentais desta aula

* `number` — números (inteiros e decimais).
* `string` — texto.
* `boolean` — verdadeiro/falso.
* `null` — ausência intencional de valor.
* `undefined` — valor “não definido” (muito comum quando você não atribuiu nada, ou acessou algo inexistente).

Exemplos rápidos:

```js
const idade = 19;                 // number
const nome = "Gabriel";           // string
const ativo = true;               // boolean
const resposta = null;            // null
let cidade;                       // undefined (ainda não atribuído)
```

### typeof (e uma peculiaridade importante)

O operador `typeof` diz o “tipo” de um valor:

```js
typeof 10;         // "number"
typeof "oi";       // "string"
typeof true;       // "boolean"
typeof undefined;  // "undefined"
```

>**Atenção:** `typeof null` retorna `"object"` por um motivo histórico da linguagem. Nesta aula, guarde a regra prática: **null é “sem valor”, escolhido de propósito**.

### Conversões e coerção (visão geral)

JavaScript às vezes tenta “ajudar” convertendo tipos automaticamente (**coerção implícita**). Isso pode ser perigoso porque você perde previsibilidade.

Exemplo clássico:

```js
"10" + 1; // "101"  (concatenação, não soma)
"10" - 1; // 9      (a string vira número)
```

>**Conceito-chave:** coerção implícita muda o sentido do seu código. O mesmo símbolo pode significar coisas diferentes dependendo dos tipos.

### Comparação: `==` vs `===`

* `==` tenta comparar “fazendo coerções”.
* `===` compara **sem coerção** (tipo e valor).

Recomendação prática: use `===` como padrão.

```js
0 == false;   // true  (coerção)
0 === false;  // false (tipos diferentes)
```

>**Dica:** `===` reduz surpresas. Você lê o código e confia mais no que ele diz.

### Truthy e Falsy

Em contextos de condição (`if`, `while`), o JS interpreta valores como “verdadeiro” ou “falso” mesmo sem serem booleans.
Os principais **falsy** são:

* `false`
* `0`
* `""` (string vazia)
* `null`
* `undefined`
* `NaN`

Todo o resto é **truthy** (inclui `"0"`, `"false"`, `[]`, `{}`).

Exemplo mínimo:

```js
if ("") {
  // não entra
}

if ([]) {
  // entra (array vazio é truthy)
}
```

>**Atenção:** “vazio” não significa “falso”. `[]` e `{}` são valores existentes, então são truthy.

### Mini-tabela: tipo → exemplo → armadilha comum

| Tipo        | Exemplo            | Armadilha comum                                                 |
| ----------- | ------------------ | --------------------------------------------------------------- |
| `number`    | `10`, `3.5`        | achar que `"10"` é number; confundir concatenação com soma      |
| `string`    | `"oi"`, `'a'`      | misturar string com number e gerar coerção inesperada           |
| `boolean`   | `true`, `false`    | esperar que `0` seja “igual” a `false` em `===`                 |
| `null`      | `null`             | confundir com `undefined`; lembrar que é “ausência intencional” |
| `undefined` | variável sem valor | acessar propriedade inexistente e receber `undefined`           |

---
![alt text](/api/materiais-assets/6-frontend/5-javascript-fundamentos/assets/image-1.png)
*Figura 2 — Tipos: primitivos vs referência (visão inicial)*

---

<a id="sec4"></a>

## 4) Condicionais (decisão) e loops (repetição)

Programas úteis tomam decisões e repetem tarefas. A diferença entre um código “estático” e um programa é justamente o fluxo.

### if / else if / else

O `if` avalia uma condição. Se for truthy, executa o bloco.

```js
const idade = 17;

if (idade >= 18) {
  // entra se idade for 18 ou mais
} else {
  // caso contrário
}
```

Se você tiver múltiplas faixas:

```js
const nota = 7;

if (nota >= 9) {
  // excelente
} else if (nota >= 7) {
  // bom
} else {
  // precisa melhorar
}
```

>**Conceito-chave:** o JS escolhe **um caminho**. Em uma cadeia `if / else if / else`, apenas um bloco roda.

### switch (visão geral)

`switch` é útil quando você compara o mesmo valor contra muitas opções fixas.

```js
const dia = "seg";

switch (dia) {
  case "seg":
    // ...
    break;
  case "ter":
    // ...
    break;
  default:
    // ...
}
```

>**Atenção:** o `break` evita que o código “caia” no próximo caso. Sem `break`, o fluxo continua.

### Operadores lógicos: `&&`, `||`, `!`

* `&&` (E): verdadeiro se ambos forem truthy.
* `||` (OU): verdadeiro se pelo menos um for truthy.
* `!` (NÃO): inverte.

Exemplo realista: checar acesso.

```js
const logado = true;
const isAdmin = false;

if (logado && isAdmin) {
  // acesso total
}
```

>**Dica:** `&&` e `||` em JS não retornam necessariamente boolean; eles retornam um dos operandos. Para esta aula, pense neles como operadores de decisão, mas saiba que existe essa nuance.

---

### Loops: quando repetir é a regra

Loops são para executar um bloco várias vezes, controlando início, condição e atualização.

#### `for` (contagem)

Ideal quando você sabe quantas vezes quer repetir.

```js
for (let i = 0; i < 3; i++) {
  // i = 0, depois 1, depois 2
}
```

O modelo mental do `for` é:

1. inicializa (`let i = 0`)
2. testa condição (`i < 3`)
3. executa bloco
4. atualiza (`i++`)
5. volta ao passo 2

#### `while` (condição)

Ideal quando você quer “enquanto isso for verdade”.

```js
let tentativas = 0;

while (tentativas < 3) {
  tentativas++;
}
```

#### `for...of` (percorrer valores de arrays)

Muito útil para iterar sobre valores de um array sem lidar diretamente com índices.

```js
const nomes = ["Ana", "Bia", "Caio"];

for (const nome of nomes) {
  // nome assume "Ana", depois "Bia", depois "Caio"
}
```

>**Conceito-chave:** loops são sobre **controle de estado**: algo muda a cada repetição (contador, item atual, condição).

### Atenções essenciais

* **Loop infinito**: acontece quando a condição nunca fica falsa.
* **Atualização esquecida**: `i` não muda, condição nunca muda.
* **Condição errada**: `<=` em vez de `<` pode causar iterações a mais.

>**Atenção:** loop infinito no navegador pode travar a página. Para iniciantes, isso é um sinal comum de “eu esqueci de atualizar algo” ou “minha condição nunca fica falsa”.

---

<a id="sec5"></a>

## 5) Funções (o conceito central)

Funções são o mecanismo mais importante para organizar lógica:

* você encapsula um comportamento,
* dá um nome a ele,
* e reutiliza sempre que precisar.

Uma função é como uma “máquina”:

* **entrada**: parâmetros
* **processamento**: corpo
* **saída**: retorno

### Declaração vs expressão de função

**Declaração**:

```js
function soma(a, b) {
  return a + b;
}
```

**Expressão** (função como valor):

```js
const soma = function (a, b) {
  return a + b;
};
```

>**Dica:** existe uma diferença de comportamento na forma como o JS “enxerga” essas funções antes de executar tudo (hoisting), mas por enquanto foque em: ambas criam funções, só que uma é declaração e outra é valor atribuído a uma variável.

### Parâmetros e retorno

Parâmetros são nomes locais que recebem valores na chamada.

```js
function dobro(x) {
  return x * 2;
}

const resultado = dobro(5); // resultado = 10
```

Se não houver `return`, a função devolve `undefined`.

```js
function loga(msg) {
  // sem return
  console.log(msg);
}

const r = loga("oi"); // r é undefined
```

>**Conceito-chave:** `return` encerra a função e define o valor devolvido. Sem `return`, o retorno é `undefined`.

### Funções puras vs efeito colateral (noção)

* **Função pura**: depende só das entradas e não altera nada fora dela.
* **Efeito colateral**: mexe em algo externo (ex.: logar no console, modificar um objeto fora).

Exemplo (intuição):

```js
function calculaTotal(preco, qtd) {
  return preco * qtd; // mais próximo de “pura”
}

function registraNoConsole(valor) {
  console.log(valor); // efeito colateral (I/O)
}
```

>**Dica:** funções puras facilitam testes e raciocínio. Efeitos colaterais são necessários, mas devem ser usados com consciência.

### Arrow functions

Arrow functions são uma forma mais curta de escrever funções, muito usadas para callbacks.

Tradicional:

```js
const dobro = function (x) {
  return x * 2;
};
```

Arrow:

```js
const dobro = (x) => {
  return x * 2;
};
```

Quando o corpo é uma única expressão, dá para encurtar ainda mais:

```js
const dobro = (x) => x * 2;
```

>**Atenção:** arrow functions lidam com `this` de forma diferente das funções tradicionais. Nesta aula, não vamos ensinar `this`; apenas guarde que existe essa diferença.

---

<a id="sec6"></a>

## 6) Arrays e objetos (estruturas de dados do dia a dia)

Programas reais quase nunca trabalham só com um valor solto. Você trabalha com coleções e entidades.

### Array: lista ordenada

Um array é uma lista, onde cada item tem um índice (posição).

```js
const nomes = ["Ana", "Bia", "Caio"];

nomes[0]; // "Ana"
nomes[2]; // "Caio"
nomes.length; // 3
```

Você pode atualizar posições:

```js
const notas = [7, 8, 9];
notas[1] = 10; // agora [7, 10, 9]
```

>**Conceito-chave:** índice começa em 0. `length` é “quantos itens existem”, não o último índice.

### Objeto: pares chave-valor

Um objeto modela uma “coisa” com propriedades.

```js
const user = {
  name: "Ana",
  age: 20
};

user.name;     // "Ana"
user["age"];   // 20
```

Acesso por **ponto** é ótimo quando a chave é um nome fixo.
Acesso por **colchetes** é útil quando a chave vem de uma variável.

```js
const campo = "name";
user[campo]; // "Ana"
```

### Modelo mental importante: primitivos vs referências (noção)

* Primitivos (number, string, boolean, null, undefined) são “copiados” facilmente.
* Arrays e objetos são manipulados por **referência**: variáveis podem apontar para o mesmo lugar.

Exemplo que costuma surpreender:

```js
const original = { count: 1 };
const copia = original;

copia.count = 2;

original.count; // 2  (mesma referência)
```

>**Atenção:** isso não é “bug do JS”. É um modelo comum em várias linguagens: objetos têm identidade e podem ser compartilhados.

### Mutabilidade em arrays/objetos

Arrays/objetos geralmente são mutáveis: você consegue mudar por dentro.

Isso é poderoso, mas pode gerar efeitos inesperados se várias partes do código compartilham a mesma referência.

>**Dica:** quando começar a trabalhar com dados mais complexos, uma grande parte da qualidade do seu código vem de saber **quando mutar** e quando **criar uma nova estrutura**.

---

<a id="sec7"></a>

## 7) Métodos de array (map, filter) — pensar em transformação de dados

Quando você tem uma lista, as operações mais comuns são:

* **transformar** cada item (ex.: preços → preços com desconto)
* **selecionar** alguns itens (ex.: apenas maiores de idade)

Loops fazem isso, mas `map` e `filter` expressam melhor a intenção.

### Por que existem (visão declarativa)

Em vez de dizer “como” passo a passo (controle de índice, contador), você descreve “o que” quer:

* `map`: “para cada item, gere um novo item”
* `filter`: “mantenha apenas os itens que passam no critério”

### Callback: função como argumento (com calma)

Tanto `map` quanto `filter` recebem uma função (callback). Essa função é chamada para cada item.

Você entrega “uma regra” e o JS aplica na coleção.

### map

* percorre o array
* aplica a callback a cada item
* devolve um **novo array** com os resultados

```js
const nums = [1, 2, 3];

const dobrados = nums.map((n) => n * 2);
// dobrados = [2, 4, 6]
// nums continua [1, 2, 3]
```

>**Conceito-chave:** `map` transforma; o tamanho do array resultante costuma ser o mesmo do original.

### filter

* percorre o array
* a callback devolve `true` ou `false`
* devolve um **novo array** só com os itens aprovados

```js
const idades = [12, 18, 21, 15];

const maiores = idades.filter((i) => i >= 18);
// maiores = [18, 21]
```

### Comparando com loop tradicional (sem demonizar loop)

Você poderia fazer com `for`, e isso não é “errado”. A questão é legibilidade:

* `for` é ótimo quando você precisa de controle fino (índice, interrupção, múltiplos acumuladores).
* `map/filter` brilham quando a operação é claramente “transformar/selecionar”.

>**Dica:** escolha a ferramenta que melhor comunica sua intenção para quem vai ler o código (incluindo você no futuro).

### Regras de ouro

* `map` e `filter` **não mutam** o array original (eles criam um novo).
* Evite efeitos colaterais dentro do callback (ex.: alterar variáveis externas sem necessidade).

>**Atenção:** um erro comum é usar `map` “para fazer algo” (como logar) e não retornar nada. Aí você ganha um array cheio de `undefined`.

---
![alt text](/api/materiais-assets/6-frontend/5-javascript-fundamentos/assets/image-2.png)
*Figura 3 — map e filter: array entra → callback → novo array sai*

---

<a id="sec8"></a>

## 8) Escopo (noção) — onde as variáveis “existem”

Escopo é o conjunto de regras que definem:

* onde um nome pode ser usado,
* por quanto tempo ele existe,
* e quais partes do código “enxergam” aquela variável.

### Escopo global vs local

* **Global**: declarado fora de funções/blocos, “visível” em muitas partes.
* **Local**: declarado dentro de uma função ou bloco, “visível” apenas ali.

### let/const têm escopo de bloco

Bloco é um par de chaves `{ ... }` associado a estruturas como `if`, `for`, `while`.

```js
if (true) {
  const msg = "dentro do bloco";
}

// msg não existe aqui fora (ReferenceError)
```

Isso é bom porque evita “vazamento” de variáveis.

### Por que isso importa

* Evita colisões de nomes (“duas coisas chamadas `total` se atropelando”).
* Limita o impacto de uma variável ao lugar onde ela faz sentido.
* Reduz bugs causados por reaproveitar nome em lugar errado.

>**Conceito-chave:** quanto menor o escopo necessário, melhor. Variáveis globais demais viram “estado compartilhado” difícil de controlar.

>**Atenção:** “closure” (fechamento) existe e é fundamental, mas não entra nesta aula. Você vai ver depois como funções podem “lembrar” variáveis do ambiente onde foram criadas.

---
![alt text](/api/materiais-assets/6-frontend/5-javascript-fundamentos/assets/image-3.png)
*Figura 4 — Escopo: global → função → bloco*


---

<a id="sec9"></a>

## 9) O que vem depois (contexto sem aprofundar)

Com esses fundamentos, você está pronto para duas grandes frentes:

* **DOM e eventos:** como o JS “conversa” com a página (ler/modificar elementos, reagir a cliques, teclado, etc.).
* **Assíncrono:** lidar com coisas que demoram (rede, tempo, espera), com conceitos como promises e `fetch`.

Além disso, você vai aprender a ler melhor erros:

* Mensagens no console,
* Linha/coluna,
* “stack trace” (cadeia de chamadas).

>**Dica:** dominar fundamentos reduz 80% dos bugs “misteriosos”. Muitos erros avançados são versões sofisticadas de: tipo errado, referência compartilhada, escopo inesperado, condição incorreta.

---

<a id="sec10"></a>

## 10) Erros comuns e confusões clássicas

1. **Usar `==` e cair em coerção inesperada**
   `0 == false` dá `true`, `"0" == 0` dá `true`. Isso “parece conveniente” até quebrar uma regra do seu sistema.

2. **Confundir `null` e `undefined`**

* `undefined` costuma aparecer quando você não definiu algo.
* `null` geralmente é uma decisão explícita: “não há valor”.

3. **Achar que `const` impede mutação de objetos/arrays**
   `const` impede reatribuir, não impede `obj.prop = ...` ou `arr.push(...)`.

4. **Esquecer `return` e receber `undefined`**
   A função “termina” sem devolver valor.

5. **Loop infinito**
   Condição nunca fica falsa ou o contador nunca atualiza. Em navegador, isso pode travar o tab.

6. **Misturar string e number sem perceber**
   `"10" + 1` vira `"101"`. Quando seu programa lida com inputs textuais, isso aparece muito.

7. **Usar `map` sem retornar**
   Se você escreve `{ ... }` no callback e esquece `return`, o resultado vira `[undefined, undefined, ...]`.

8. **Mutar um array/objeto original sem perceber que está compartilhado**
   Duas variáveis apontam para o mesmo objeto; mudar por uma muda para todas.

9. **Escopo errado (variável “sumiu”)**
   Declarou com `let/const` dentro de bloco e tentou usar fora → `ReferenceError`.

>**Atenção:** `ReferenceError` (variável não existe) é diferente de `undefined` (variável existe, mas valor é indefinido). Essa distinção é um divisor de águas.

---

<a id="sec11"></a>

## 11) Glossário rápido

* **Variável:** nome associado a um valor.
* **Atribuição:** colocar um valor em uma variável (`x = 10`).
* **Reatribuição:** trocar o valor de uma variável (`x = 20`).
* **Tipo:** categoria de um valor (`number`, `string`, etc.).
* **Coerção:** conversão de tipo (às vezes implícita) feita pelo JS.
* **Truthy/Falsy:** valores que se comportam como verdadeiro/falso em condições.
* **Condição:** expressão avaliada para decidir um caminho (`if`, `while`).
* **Loop:** repetição controlada por condição/contagem (`for`, `while`).
* **Função:** bloco reutilizável que recebe entradas e pode devolver saída.
* **Parâmetro:** variável na definição da função (entrada nomeada).
* **Retorno:** valor devolvido por `return` (ou `undefined` se não houver).
* **Callback:** função passada como argumento para outra função.
* **Array:** lista ordenada indexada.
* **Objeto:** estrutura de chave-valor.
* **Referência:** “apontamento” para um mesmo objeto/array na memória.
* **Escopo:** região onde um nome existe e pode ser acessado.

---

<a id="secF"></a>

## 12) Resumo final

JavaScript, no navegador, é a camada de **comportamento** da Web: ele executa instruções, toma decisões e transforma dados. Você viu que `let` e `const` não são só sintaxe — são sinais de intenção e têm impacto no raciocínio sobre reatribuição e referências. Tipos básicos e comparações (`===`) evitam coerções traiçoeiras. Condicionais e loops controlam o fluxo; funções organizam lógica e tornam o código reutilizável. Arrays e objetos modelam o mundo real, e entender **referências e mutabilidade** é essencial para prever efeitos do seu código. Por fim, `map` e `filter` ajudam a pensar coleções como transformações claras — um passo importante para escrever código legível e confiável.

---

## 13) Projeto Prático

Para consolidar o aprendizado desta aula, confira a implementação prática no repositório **to-do**:

📁 **[Aula 4 - JavaScript Fundamentos](https://github.com/gabrielcarvvlho/to-do/tree/main/aula-4-js-fundamentos)**

Nesta aula prática, você verá como aplicar os conceitos de variáveis, tipos, funções, arrays e objetos em um projeto real.

---

