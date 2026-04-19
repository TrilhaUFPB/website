---
title: TypeScript
description: 
category: Frontend
order: 8
---

# TypeScript (Fundamentos) — JavaScript com “contratos” para o dia a dia

## Objetivo da aula

Entender **o que é TypeScript**, por que ele existe e como usar **tipos** de forma prática para escrever código mais confiável no front-end (navegador), com melhor autocomplete, refatoração mais segura e menos bugs por valores inesperados.

## Pré-requisitos

* JavaScript básico (variáveis, funções, objetos, arrays)
* Noção de execução no navegador (o JS roda em runtime no browser)
* Familiaridade com Promises e `async/await` (conceito, não implementação avançada)

## O que você será capaz de explicar ao final

* O que TypeScript **é** (e o que **não é**) no fluxo real de um projeto
* A diferença entre erro **em tempo de desenvolvimento** (compile-time) e erro **em runtime**
* Como o TypeScript faz **inferência de tipos** e quando você deve **anotar** explicitamente
* Como usar tipos básicos, unions e narrowing para lidar com dados opcionais e incertos
* Como tipar funções, objetos (`interface` e `type`), arrays e `Promise<T>` no front-end
* Quais práticas evitam “brigar com o TypeScript” e quais erros são clássicos em iniciantes

---

## Sumário

* [1. O que é TypeScript e por que ele existe](#sec-1)
* [2. Modelo mental: inferência vs anotações](#sec-2)
* [3. Tipos básicos (a base que você usa sempre)](#sec-3)
* [4. Tipar funções (o ponto de maior valor no dia a dia)](#sec-4)
* [5. Objetos tipados: interfaces e types](#sec-5)
* [6. Arrays tipados](#sec-6)
* [7. Promise<T> e assincronicidade tipada](#sec-7)
* [8. Boas práticas e “higiene” de TypeScript para iniciantes](#sec-8)
* [9. Erros comuns e confusões clássicas](#sec-9)
* [10. Glossário rápido](#sec-10)
* [11. Resumo final](#sec-11)

---

<a id="sec-1"></a>

## 1. O que é TypeScript e por que ele existe

TypeScript (TS) é, em essência, **JavaScript + um sistema de tipos estático**. Dá para pensar nos tipos como **contratos** que descrevem o que um valor *deveria ser* (ou *pode ser*) **antes** do código rodar.

> **Conceito-chave**
> TypeScript adiciona uma camada de verificação **em tempo de desenvolvimento**. Ele não muda como o JavaScript funciona no navegador — ele te ajuda a chegar em um JavaScript melhor.

### TS = JavaScript + tipos (contratos)

Quando você escreve TypeScript, você está escrevendo JavaScript com anotações e regras extras. O TypeScript verifica coerência, por exemplo:

* “Essa função espera `string`, então não passe `number`.”
* “Esse objeto deveria ter `name`, mas você esqueceu.”
* “Esse valor pode ser `null`, então trate antes de usar.”

Em JavaScript puro, muita coisa só dá errado quando o código roda:

```js
// JS: só vai estourar quando executar
function upperName(user) {
  return user.name.toUpperCase();
}

upperName(null); // TypeError em runtime
```

Em TypeScript, você “ensina” ao código que `user` precisa ter um formato — e o compilador pode te alertar antes:

```ts
type User = { name: string };

function upperName(user: User): string {
  return user.name.toUpperCase();
}

// upperName(null); // erro em tempo de desenvolvimento (se você tipar corretamente)
```

### Erros em tempo de desenvolvimento vs runtime

* **Tempo de desenvolvimento (compile-time):** momento em que o TypeScript analisa seu código e acusa inconsistências.
* **Runtime:** quando o JavaScript executa no navegador. É aqui que erros como `TypeError` acontecem.

> **Atenção**
> TypeScript **não impede** todos os bugs: ele reduz bugs de *tipagem* (valores inesperados), mas **não garante lógica correta**. Você ainda pode escrever um algoritmo errado com tipos “certinhos”.

### Benefícios reais no mundo real (por que times adotam)

**1) Autocomplete e DX (Developer Experience)**
Quando os tipos estão claros, o editor sugere propriedades e métodos corretos. Isso reduz consulta a documentação e diminui “tentativa e erro”.

**2) Refatoração mais segura**
Renomear uma propriedade ou mudar a assinatura de uma função fica menos arriscado: o TypeScript aponta todos os pontos quebrados.

**3) Documentação viva do código**
Um tipo bem escrito funciona como especificação: “qual o formato do dado?” sem precisar ler vários arquivos ou comentários.

**4) Menos bugs por valores inesperados**
Especialmente com dados externos (por exemplo, respostas de API), você lida melhor com `null`, campos faltando, formatos inconsistentes.

### Custos e trade-offs (com honestidade)

**Curva de aprendizado**
Você precisa aprender a pensar em “formatos” e “possibilidades” de dados.

**Necessidade de build (transpilação)**
TypeScript **não roda no navegador**. Você escreve `.ts`, mas o navegador executa `.js`. Logo, existe uma etapa de compilação/transpilação no meio.

**“Lutar contra tipos” quando a modelagem está errada**
Se você tenta “forçar” um modelo que não representa a realidade dos dados, você vai se irritar:

* ou espalha `any` e perde a segurança,
* ou faz gambiarras com `as`,
* ou fica travado porque o tipo não descreve o mundo real.

> **Dica**
> Quando você “briga com o TypeScript”, muitas vezes é sinal de que **o tipo não está representando a realidade** (ou você ainda não tratou um caso, como `null`/`undefined`).

### Onde ele entra no fluxo: escrever `.ts` → compilar → `.js`

O TypeScript entra **antes** do navegador. Fluxo típico:

1. Você escreve código em **`.ts`** (ou `.tsx` em projetos com JSX).
2. Um compilador/transpilador gera **`.js`**.
3. O navegador executa **JavaScript**.

---
![alt text](image.png)
*Figura 1 — Fluxo do TypeScript no front-end*

---

<a id="sec-2"></a>

## 2. Modelo mental: inferência vs anotações

### Type inference: o TypeScript deduz tipos a partir do valor

Muitas vezes você nem precisa escrever tipos. O TS olha o valor inicial e deduz:

```ts
let title = "bem-vindo"; // inferido como string
let count = 0;           // inferido como number
let isOpen = true;       // inferido como boolean
```

Se você tenta mudar para um tipo incompatível, ele avisa:

```ts
let count = 0;
// count = "zero"; // erro: string não é atribuível a number
```

> **Conceito-chave**
> Inferência é o TS dizendo: “pelo que eu vejo aqui, esse valor é do tipo X”.

### Quando você precisa anotar (escrever o tipo explicitamente)

Mesmo com inferência, há situações em que anotar é a melhor decisão:

**1) Funções “públicas” (API interna do seu código)**
Funções são pontos de contrato: quem chama não deve adivinhar tipos.

**2) Estruturas complexas (especialmente objetos e dados vindos de fora)**
Objetos grandes, dados opcionais, respostas de API.

**3) Quando o TS não consegue inferir bem**
Exemplo clássico: você inicia com `null` porque ainda vai preencher depois.

```ts
let userName = null; 
// aqui o TS pode inferir algo amplo demais (dependendo de configurações)
// e você perde o benefício, ou fica travado depois.
```

Uma anotação resolve e documenta sua intenção:

```ts
let userName: string | null = null;
```

### Tipos como “restrições” e como “guia”

Tipos servem para:

* **Restringir**: impedir usos incoerentes.
* **Guiar**: orientar o editor e você mesmo sobre o que é esperado.

Pense assim: tipos não existem para “enfeitar”; eles existem para **diminuir a ambiguidade** do código.

### Diferença entre tipo (compile-time) e valor (runtime)

Esse é um divisor de águas para evitar confusões.

* **Tipo:** informação usada pelo compilador e editor **antes** do programa rodar.
* **Valor:** dado real que existe quando o programa está executando no navegador.

> **Atenção**
> Você não consegue “imprimir um tipo” no console. Tipo não é valor.

---
![alt text](image-1.png)
*Figura 2 — Camadas: tipo vs valor (compile-time vs runtime)*

* **Objetivo da figura:** fixar que tipos vivem “fora” do runtime do navegador.
* **Descrição do que aparece:** duas camadas empilhadas; cima “Type System”, baixo “JavaScript Runtime”.
* **Opção 1: diagrama simples (ASCII)**

  ```
  ┌────────────────────────────────────┐
  │ CAMADA DE TIPOS (TypeScript)        │  <- compile-time (editor/compilador)
  │ - interfaces, type aliases          │
  │ - checagem e inferência             │
  └────────────────────────────────────┘
  ┌────────────────────────────────────┐
  │ CAMADA DE EXECUÇÃO (JavaScript)     │  <- runtime (navegador)
  │ - valores reais, objetos, arrays    │
  │ - erros de execução (TypeError)     │
  └────────────────────────────────────┘
  ```
* **Opção 2: instrução para imagem vetorial**

  * Dois retângulos com cores diferentes (leve contraste), com setas: “TS checa aqui”, “JS executa aqui”.
  * Um aviso pequeno: “Tipos não existem no runtime”.

---

<a id="sec-3"></a>

## 3. Tipos básicos (a base que você usa sempre)

### Primitivos: `string`, `number`, `boolean`

São o arroz e feijão do TS.

```ts
let email: string = "ana@exemplo.com";
let price: number = 19.9;
let active: boolean = false;
```

### Tipos especiais (os que mais evitam dor de cabeça)

#### `null` e `undefined` (noções)

* `undefined` costuma significar “não definido” (ex.: propriedade ausente).
* `null` costuma significar “intencionalmente vazio”.

No front-end, é comum lidar com campos opcionais (“talvez venha, talvez não”).

> **Dica**
> Quando algo pode estar ausente, **modele isso no tipo** (ex.: `string | null`) e trate antes de usar.

#### `any` (perigoso; quando aparece)

`any` é um “coringa” que desliga a checagem de tipos. Ele aparece frequentemente:

* quando você consome dados sem tipar,
* quando você usa bibliotecas mal tipadas,
* quando você usa conversões forçadas.

```ts
let data: any = JSON.parse('{"x": 1}');
data.toUpperCase(); // compila, mas pode explodir em runtime
```

> **Atenção**
> `any` é como “tirar o cinto de segurança”: resolve rápido um incômodo, mas aumenta o risco silenciosamente.

#### `unknown` (mais seguro que `any`)

`unknown` representa “eu não sei o tipo”. Diferente de `any`, ele **obriga** você a verificar antes de usar.

```ts
let value: unknown = JSON.parse('{"name":"ana"}');

// value.name // erro: não dá pra acessar propriedade em unknown
if (typeof value === "object" && value !== null) {
  // ainda assim, TS não sabe que tem 'name' — mas já avançamos na segurança
}
```

**Refinar com `typeof` (narrowing):**

```ts
function printUpper(x: unknown) {
  if (typeof x === "string") {
    console.log(x.toUpperCase()); // seguro
    return;
  }
  console.log("não é string");
}
```

#### `void` (retorno sem valor)

Função que não retorna nada “útil”:

```ts
function logMessage(msg: string): void {
  console.log(msg);
}
```

#### `never` (apenas noção)

`never` indica “isso nunca acontece”, geralmente em:

* código que lança erro sempre,
* ramificações impossíveis após checagens completas.

Você não precisa “usar” `never` ativamente no começo, mas é bom reconhecer quando aparecer.

### Union types (`A | B`)

Union é quando um valor pode ser **um de vários tipos**.

Exemplo realista: uma API que às vezes retorna `null` quando não encontra o usuário:

```ts
type User = { name: string };

let user: User | null = null;
```

Isso força você a tratar o caso nulo antes de usar `user.name`.

### Type narrowing (refinamento): usar checagens para ficar seguro

O TypeScript entende certas checagens e “refina” o tipo dentro do bloco.

**`typeof` para primitivos:**

```ts
function formatId(id: string | number): string {
  if (typeof id === "number") {
    return id.toFixed(0);
  }
  return id.trim();
}
```

**Checagem de `null`:**

```ts
function upperUserName(user: { name: string } | null): string {
  if (user === null) return "visitante";
  return user.name.toUpperCase();
}
```

---
![alt text](image-2.png)
*Figura 3 — Union + narrowing (string | null → checagem → uso seguro)*

---

### Mini-tabela: tipo → exemplo → armadilha comum → dica

| Tipo                 | Exemplo             | Armadilha comum                                                 | Dica prática                               |
| -------------------- | ------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| `string`             | `"ana"`             | assumir que string nunca vem vazia                              | trate `""` quando for regra de negócio     |
| `number`             | `19.9`              | achar que number tem “inteiro” vs “float” (no JS é tudo number) | valide domínio: `>= 0`, limites etc.       |
| `boolean`            | `true`              | confundir “truthy/falsy” com boolean real                       | prefira boolean explícito                  |
| `null` / `undefined` | `null`              | ignorar e estourar com `.toUpperCase()`                         | use union e faça checagem                  |
| `any`                | `let x: any`        | virar “cura” para todo erro                                     | use como último recurso                    |
| `unknown`            | `let x: unknown`    | tentar usar direto como se soubesse                             | refine com `typeof`, checagens             |
| `void`               | `(): void`          | esperar valor de retorno                                        | use quando a intenção é “efeito colateral” |
| `never`              | `throw new Error()` | achar que é “nunca retorna” em qualquer caso                    | aparece em casos específicos; não force    |

---

<a id="sec-4"></a>

## 4. Tipar funções (o ponto de maior valor no dia a dia)

Em projetos front-end, funções são onde mais se ganha com TS: você tipa entradas e saídas, e o resto do código “se alinha”.

### Tipos de parâmetros e retorno

```ts
function formatPrice(value: number): string {
  return value.toFixed(2);
}
```

No JS, é comum receber valor errado sem perceber:

```js
function formatPrice(value) {
  return value.toFixed(2);
}

formatPrice("10"); // estoura em runtime: "10".toFixed is not a function
```

No TS, isso vira erro antes:

```ts
formatPrice("10"); // erro: string não é number
```

### Retorno inferido vs anotado

O TS geralmente infere o retorno:

```ts
function double(n: number) {
  return n * 2; // retorno inferido como number
}
```

Mas anotar pode ser útil quando:

* você quer deixar o contrato explícito,
* você quer evitar que mudanças internas alterem o retorno “sem querer”.

```ts
function double(n: number): number {
  return n * 2;
}
```

> **Dica**
> Tipar **parâmetros** costuma ser mais importante que tipar **retorno** (porque o retorno quase sempre é inferido). Mas em funções centrais do sistema, anotar retorno ajuda a manter contrato estável.

### Parâmetros opcionais (`?`) e valores default

**Opcional (`?`)**: o parâmetro pode ser omitido (logo, pode ser `undefined` na prática).

```ts
function greet(name?: string): string {
  if (!name) return "olá, visitante";
  return `olá, ${name}`;
}
```

**Default value**: aqui o parâmetro tem um valor padrão, e o TS entende que dentro da função ele já está definido.

```ts
function greet(name: string = "visitante"): string {
  return `olá, ${name}`;
}
```

> **Atenção**
> `name?: string` não significa “string ou null”. Significa “string ou undefined”. Se você quer aceitar `null` também, modele: `name?: string | null`.

### Funções que retornam objetos (retorno tipado)

```ts
type Point = { x: number; y: number };

function createPoint(x: number, y: number): Point {
  return { x, y };
}
```

Esse padrão é muito comum no front-end: criar objetos com shape previsível.

### Arrow functions tipadas (sintaxe)

```ts
const toSlug = (text: string): string => {
  return text.trim().toLowerCase().replaceAll(" ", "-");
};
```

### Boas práticas: tipar a “borda” do sistema

Em front-end, a “borda” é onde o desconhecido entra:

* dados do usuário (inputs),
* dados de `localStorage`,
* dados de `fetch()` (API),
* query string, `location`, etc.

Tipar a borda evita que `any` contamine o resto do código.

> **Conceito-chave**
> Se você tipa bem os **inputs e outputs**, o “meio” do código tende a ficar naturalmente mais seguro por inferência.

### Evitar `any` e preferir `unknown` quando necessário

Se você realmente não sabe o tipo de entrada (ex.: parse de JSON), prefira `unknown` e refine.

---

**Exemplos mínimos (essenciais):**

1. **Formatação (`string → string`)**

```ts
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

2. **Cálculo (`number → number`)**

```ts
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

3. **Retorno de objeto tipado**

```ts
type Size = { width: number; height: number };

function getViewportSize(): Size {
  return { width: window.innerWidth, height: window.innerHeight };
}
```

---

<a id="sec-5"></a>

## 5. Objetos tipados: interfaces e types (comparar com clareza)

No dia a dia, a maior parte do que você tipa são **objetos**: usuários, produtos, configurações, resultados.

### Por que tipar objetos

Objetos representam “contratos de dados”. Imagine que você renderiza um card de usuário e precisa de:

* `id`
* `name`
* `avatarUrl` (às vezes ausente)

Esse shape precisa ficar claro, porque ele impacta várias partes do código.

### `interface`: foco em “shape” e extensibilidade

Interfaces são muito usadas para descrever “o formato” de objetos, especialmente quando você imagina que isso pode ser estendido.

```ts
interface User {
  id: string;
  name: string;
  avatarUrl?: string; // opcional
}
```

### `type`: aliases, unions e composições simples

`type` cria um “apelido” para um tipo — que pode ser um objeto, união, primitivo, etc.

```ts
type ID = string | number;

type User = {
  id: ID;
  name: string;
  avatarUrl?: string;
};
```

### Diferenças práticas (sem dogma)

Em projetos reais, a escolha costuma ser mais “pragmática” do que “certa/errada”.

**Quando `interface` costuma brilhar**

* Modelos de objeto “clássicos” (User, Product, Settings)
* Quando você quer extensibilidade e um estilo mais “contrato”

**Quando `type` costuma ser mais conveniente**

* Unions (`string | null`)
* Aliases (`type ID = string | number`)
* Composições simples (`type A = B & C`)

> **Dica**
> Se o seu tipo é “principalmente um objeto”, `interface` é uma escolha confortável. Se você está fazendo união/alias, `type` costuma ser mais direto.

### `readonly` (noção útil)

`readonly` impede reatribuição daquela propriedade (ótimo para dados que não deveriam ser mutados sem querer).

```ts
type Product = {
  readonly id: string;
  name: string;
};

const p: Product = { id: "p1", name: "Camiseta" };
// p.id = "p2"; // erro: id é readonly
```

### Excess property checks (noção): por que objeto literal é “mais cobrado”

Um detalhe que confunde iniciantes: o TS é mais rígido quando você passa um **objeto literal** diretamente.

```ts
type User = { id: string; name: string };

function showUser(u: User) {}

showUser({ id: "1", name: "Ana", age: 20 }); 
// erro: 'age' é propriedade extra (excess property check)
```

Mas se você colocar em uma variável, o comportamento pode mudar dependendo do contexto:

```ts
const maybeUser = { id: "1", name: "Ana", age: 20 };
showUser(maybeUser); // muitas vezes passa, porque agora é uma variável com tipo inferido
```

> **Conceito-chave**
> O TS “pega mais pesado” com objeto literal porque esse é um momento em que ele pode proteger você de um campo digitado errado ou de um contrato sendo quebrado silenciosamente.

### Exemplos pequenos de ambos e explicação da escolha

**Exemplo com `interface` (modelo de dados)**

```ts
interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

function renderUserName(user: User): string {
  return user.name;
}
```

**Exemplo com `type` (alias + union)**

```ts
type RequestState = "idle" | "loading" | "success" | "error";

let state: RequestState = "idle";
```

---

<a id="sec-6"></a>

## 6. Arrays tipados (lista de coisas)

### Sintaxes: `string[]` e `Array<string>`

As duas funcionam. A primeira é mais comum no dia a dia:

```ts
const tags: string[] = ["front-end", "ts", "web"];
// equivalente:
const tags2: Array<string> = ["front-end", "ts", "web"];
```

### Arrays de objetos: `User[]`

```ts
type User = { id: string; name: string };

const users: User[] = [
  { id: "u1", name: "Ana" },
  { id: "u2", name: "Bruno" },
];
```

### Tuplas (visão geral)

Tupla é um array com posições de tipos conhecidos. Use com moderação — é útil, mas pode virar código pouco legível se exagerar.

```ts
type Point = [number, number]; // [x, y]
const p: Point = [10, 20];
```

### Métodos de array com tipos: `map`/`filter` preservando tipos

Uma das grandes vantagens do TS é que `map` e `filter` carregam os tipos.

```ts
type User = { id: string; name: string; active: boolean };

const users: User[] = [
  { id: "u1", name: "Ana", active: true },
  { id: "u2", name: "Bruno", active: false },
];

const names = users.map(u => u.name);
// names: string[] (inferido)

const activeUsers = users.filter(u => u.active);
// activeUsers: User[] (inferido)
```

**Exemplo pequeno pedido: map para nomes**

```ts
const userNames: string[] = users.map(u => u.name);
```

---

<a id="sec-7"></a>

## 7. Promise<T> e assincronicidade tipada

No front-end, assincronicidade aparece o tempo todo: requisições, timers, eventos, carregamento.

### Relembrar: `async function` retorna `Promise`

Se uma função é `async`, ela sempre retorna uma `Promise`.

```ts
async function getTitle(): Promise<string> {
  return "home";
}
```

Se você retorna um valor direto dentro de `async`, ele vira o “resultado resolvido” da Promise.

### Tipar retorno de `async`: `Promise<User>` e `Promise<User[]>`

```ts
type User = { id: string; name: string };

async function getUsers(): Promise<User[]> {
  // ... buscar em algum lugar
  return [{ id: "u1", name: "Ana" }];
}
```

> **Conceito-chave**
> Em `Promise<T>`, o `T` é o tipo do valor que você vai ter **depois** que a Promise resolver (`await`).

### `fetch` e parsing JSON: o ponto onde `unknown` faz diferença

Um caso real: `fetch()` traz bytes; `response.json()` transforma em algo JavaScript.
O problema é que **JSON não vem tipado**. Se você tratar como se fosse certo sem checar, pode criar segurança “de mentira”.

Um padrão saudável (sem bibliotecas) é:

1. Parsear como `unknown`
2. Validar minimamente (checagens simples)
3. Só então tratar como `User[]`

```ts
type User = { id: string; name: string };

// Validação mínima: não é perfeita, mas reduz risco grosseiro.
function isUserArray(value: unknown): value is User[] {
  if (!Array.isArray(value)) return false;

  return value.every(item => {
    if (typeof item !== "object" || item === null) return false;

    const obj = item as { id?: unknown; name?: unknown };
    return typeof obj.id === "string" && typeof obj.name === "string";
  });
}

async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  const data: unknown = await response.json();

  if (!isUserArray(data)) {
    // aqui você decide: lançar erro, retornar vazio, mostrar fallback...
    throw new Error("Resposta inesperada da API");
  }

  return data; // agora é User[] de verdade para o TS (e bem provável em runtime)
}
```

> **Atenção**
> Tipar o retorno “no grito” sem validar (`return (await res.json()) as User[]`) pode calar o TS, mas não muda o que veio da rede. Se a API mudar, seu app quebra em runtime — e o TS não vai te salvar.

---
![alt text](image-3.png)
*Figura 4 — Promise<T> (pending → resolve(T) / reject(Error))*

---

<a id="sec-8"></a>

## 8. Boas práticas e “higiene” de TypeScript para iniciantes

### Preferir tipos simples e legíveis

Se um tipo começa a ficar difícil de ler, ele deixa de ajudar e vira ruído. A ideia é clareza, não “mostrar poder”.

> **Dica**
> Se você não consegue explicar seu tipo em uma frase, talvez ele esteja complicado demais para a necessidade atual.

### Evitar overtyping (tipar tudo sem necessidade)

O TS já infere bastante. Tipar absolutamente tudo pode:

* duplicar informação,
* tornar refatorações mais cansativas,
* poluir o código.

Use anotação onde há **contrato** (borda, funções públicas, modelos).

### Union types para estados reais (noção)

Muitos estados do front-end não são “um objeto sempre pronto”. Ex.: carregamento e erro.

Um jeito simples de representar é com unions:

```ts
type LoadState = "idle" | "loading" | "success" | "error";
```

Isso evita “estado inválido” (por exemplo, `loading=true` e `error` preenchido ao mesmo tempo sem querer).

### Quando usar type assertions (`as`)

`as` é uma afirmação: “confia em mim”.
Às vezes é necessário, mas é **último recurso**.

```ts
const input = document.querySelector("#email") as HTMLInputElement | null;
```

Aqui faz sentido porque o DOM tem tipos amplos, e você sabe o que espera encontrar — mas ainda é bom tratar `null`.

> **Atenção**
> `as` não valida nada em runtime. Ele apenas manda o compilador “ficar quieto”. Use quando você tem motivo concreto e controle do cenário.

### Erros comuns (higiene)

* **`any` espalhado**: vira uma “contaminação” — de repente nada mais é checado.
* **Não tratar `null`/`undefined`**: o TS te avisa por um motivo.
* **Confundir interface/type como runtime**: não existe `interface User` no JS final.
* **Achar que TS impede bug lógico**: ele impede incoerência de tipo, não garante lógica.

---

<a id="sec-9"></a>

## 9. Erros comuns e confusões clássicas

### “TypeScript roda no browser”

Não roda. O navegador roda **JavaScript**. TypeScript precisa virar JS antes.

### Usar `any` como “cura”

Funciona como analgésico: passa a dor do erro, mas esconde o problema. Muitas bases de código viram um “JS com maquiagem” por excesso de `any`.

### Usar `as` para calar erro sem entender

Quando você usa `as` sem critério, você troca um erro explícito (útil) por um bug em runtime (doloroso e mais difícil de rastrear).

### Ignorar `string | null` e estourar em runtime

Esse é um bug muito comum:

* “Pode ser `null`” não é detalhe, é realidade do dado.
* Se você não trata, uma hora chega o caso nulo.

### Tipar `fetch` como se fosse verdade sem validação

Dizer que a resposta é `User[]` não faz a API se comportar.
Se a API mudar (campo renomeado, tipo diferente), o TS não tem como saber.

### Confundir `interface`/`type` com “classe”

`interface` e `type` não criam objetos nem comportamento. Eles descrevem **formas**.
Classe é outra coisa (runtime, `new`, métodos, etc.). Nesta aula, foque em contratos de dados.

### Achar que “passou no TypeScript, então está correto”

“Correto” aqui significa: “coerente com o modelo de tipos”.
Você ainda pode:

* usar a fórmula errada,
* inverter condições,
* mostrar o texto errado,
* calcular datas errado,
  com tipos impecáveis.

---

<a id="sec-10"></a>

## 10. Glossário rápido

* **Inferência:** TS deduz o tipo a partir do valor/uso.
* **Anotação:** você escreve explicitamente o tipo (`: string`, `: User[]`).
* **Union (`A | B`):** valor pode ser um de vários tipos.
* **Narrowing:** refinamento do tipo após checagens (`typeof`, `x !== null`).
* **`any`:** desliga checagem de tipos; rápido, mas perigoso.
* **`unknown`:** tipo “não sei”; obriga validação/refinamento antes de usar.
* **`interface`:** descreve shape de objeto; comum em modelos.
* **`type alias`:** apelido de tipo; ótimo para unions e aliases simples.
* **Generics (noção):** tipo parametrizado; aqui aparece como `Array<T>` e `Promise<T>`.
* **`Array<T>` / `T[]`:** lista de valores do tipo `T`.
* **`Promise<T>`:** promessa que resolve com um valor do tipo `T` (ou rejeita com erro).
* **Compile-time vs runtime:** checagem antes de rodar vs execução real no navegador.

---

<a id="sec-11"></a>

## 11. Resumo final

TypeScript é uma camada de tipos sobre o JavaScript: um sistema de **contratos** que melhora o desenvolvimento sem mudar a natureza do runtime no navegador. Ele brilha quando você tipa bem **funções** (entradas e saídas), modela **objetos** com `interface`/`type`, trata **valores opcionais** com unions e usa **narrowing** para segurança. Em assincronicidade, `Promise<T>` deixa explícito o que chega após `await`, e a disciplina de tratar `unknown` (principalmente em `fetch`/JSON) evita uma categoria inteira de bugs silenciosos.

Se você usar tipos para refletir a realidade — sem `any` como muleta e sem `as` para “calar o compilador” — o TypeScript vira exatamente o que ele promete ser: um guia confiável para escrever front-end mais previsível, fácil de refatorar e mais resistente a mudanças.
