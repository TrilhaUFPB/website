---
title: 9. React Fundamentos
description: 
category: Frontend
order: 9
---

# 9. React (Fundamentos)

## Objetivo da aula

Construir um modelo mental sólido de como o React cria e atualiza interfaces, e como escrever componentes modernos (Function Components + Hooks) em **TypeScript**, usando **props**, **state**, **eventos**, **formulários controlados** e **listas** — com foco em clareza, legibilidade e previsibilidade do fluxo de dados.

## Pré-requisitos

* JavaScript: funções, arrays (`map`), objetos, operadores (`&&`, ternário), callbacks.
* TypeScript: tipos básicos, `type`/`interface`, tipagem de funções, `Array<T>`.
* Noção básica de HTML e eventos do navegador (clique, submit, change).

## O que você será capaz de explicar ao final

* Por que dizemos que **UI = f(state)** e o que isso muda na forma de programar.
* O que é um **componente** React (como função) e por que ele é uma “peça” reutilizável.
* O que é **JSX/TSX** de verdade (e o que ele *não* é).
* Como **props** e **state** se relacionam e por que o fluxo é **de cima para baixo**.
* Como funciona **render** e **re-render** quando o state muda.
* Como lidar com **eventos** e tipá-los no TypeScript.
* Por que **formulários controlados** são o padrão mais confiável no mundo real.
* Como renderizar **listas** com `.map` e escolher `key` corretamente.

---

## Sumário

1. [O que é React (modelo mental)](#1-o-que-é-react-modelo-mental)
2. [Componentes (Function Components)](#2-componentes-function-components)
3. [JSX e TSX (o “HTML dentro do JS” sem mito)](#3-jsx-e-tsx-o-html-dentro-do-js-sem-mito)
4. [Props (entrada do componente)](#4-props-entrada-do-componente)
5. [State (useState) — quando a UI precisa “lembrar”](#5-state-usestate--quando-a-ui-precisa-lembrar)
6. [Eventos no React (comparando com DOM)](#6-eventos-no-react-comparando-com-dom)
7. [Formulários controlados (o padrão “profissional”)](#7-formulários-controlados-o-padrão-profissional)
8. [Renderização de listas (map) e keys](#8-renderização-de-listas-map-e-keys)
9. [Boas práticas de estrutura e legibilidade](#9-boas-práticas-de-estrutura-e-legibilidade)
10. [Erros comuns e confusões clássicas](#10-erros-comuns-e-confusões-clássicas)
11. [Glossário rápido](#11-glossário-rápido)
12. [Resumo final](#12-resumo-final)

---

<a id="1-o-que-é-react-modelo-mental"></a>

## O que é React (modelo mental)

React é uma forma de construir interfaces em que você descreve **como a UI deve ser** para um certo estado, e deixa o React cuidar do “como atualizar” quando esse estado muda.

### UI como função do estado (UI = f(state))

A ideia central é simples e poderosa:

* Você mantém **dados** (state).
* A interface é um **resultado** desses dados.
* Quando os dados mudam, você **recalcula** a interface.

Isso muda o estilo mental: em vez de “cliquei aqui, então esconda esse elemento e mude aquele texto”, você pensa “se `isOpen` é `true`, então o painel aparece; se é `false`, ele não aparece”.

**Conceito-chave**
No React, você não “manda a tela mudar”. Você **muda o state**, e a tela é **derivada** desse state.

### Componentes como “peças” reutilizáveis

Um componente é uma peça de UI que encapsula:

* uma estrutura (o que aparece),
* um comportamento (como responde a eventos),
* e uma intenção (qual responsabilidade ele tem).

Pense em LEGO: você não molda o castelo de uma vez; você monta com blocos que você entende, testa e combina.

### Renderização declarativa vs manipulação manual do DOM

No DOM “manual” (sem React), é comum:

* selecionar elementos (`querySelector`),
* adicionar listeners,
* alterar `textContent`, `classList`, criar/remover nós, etc.

No React (declarativo), você:

* descreve a UI em função do estado,
* escreve handlers que mudam estado,
* e o React aplica as mudanças necessárias no DOM.

**Dica**
“Declarativo” não significa “mágico”. Significa que você descreve *o resultado*, e o React administra os passos intermediários.

### Virtual DOM e reconciliação (visão geral leve)

Quando o state muda, o React:

1. executa novamente seu componente (re-render),
2. gera uma “descrição” da UI (um conjunto de elementos React),
3. compara com a descrição anterior,
4. atualiza no DOM real apenas o que for necessário.

Essa comparação e atualização é chamada de **reconciliação**. Você não precisa dos detalhes internos agora; o importante é entender **por que você escreve UI como função do estado** e **por que o React consegue atualizar eficientemente**.

### Fluxo de dados: de cima para baixo (props)

Em React, dados geralmente fluem:

* **do componente pai para o filho**, via **props**.

Isso dá previsibilidade: você sabe onde um dado nasceu e por quais componentes ele passa.

---
![alt text](/api/materiais-assets/6-frontend/9-react-fundamentos/assets/image.png)
*Figura 1 — Fluxo de dados (Parent → props → Child)*

---

<a id="2-componentes-function-components"></a>

## Componentes (Function Components)

### O que é um componente: função que retorna UI

Um Function Component é literalmente uma função que retorna elementos React (via JSX/TSX). Na prática, ele também:

* pode receber **props** (entrada),
* pode ter **state** (memória interna),
* pode reagir a **eventos**.

### Convenções

#### PascalCase

Componentes começam com letra maiúscula:

* `UserCard`, `LoginForm`, `TodoList`.

Isso não é só estilo: em JSX, tags com letra minúscula são tratadas como elementos HTML (`div`, `button`), e tags com maiúscula são tratadas como componentes.

#### export/import

Para reutilizar componentes, você exporta e importa:

```tsx
// UserBadge.tsx
export function UserBadge() {
  return <span>Usuário</span>;
}
```

```tsx
// App.tsx
import { UserBadge } from "./UserBadge";

export function App() {
  return (
    <div>
      <UserBadge />
    </div>
  );
}
```

### Responsabilidade e composição

Um componente bom costuma ser:

* **pequeno e focado** (uma responsabilidade clara),
* **composto** com outros componentes.

Em vez de um “componente gigante” que faz tudo, você organiza em camadas: componentes simples compõem componentes mais completos.

**Dica**
Se você precisa rolar muito para entender um componente, é sinal de que ele pode ser dividido.

### Exemplo mínimo de componente (TSX) e explicação linha a linha

```tsx
// Greeting.tsx
type GreetingProps = {
  name: string; // o componente precisa de um nome para renderizar a saudação
};

export function Greeting({ name }: GreetingProps) {
  // A função é o componente. Ela recebe props e retorna UI (JSX).
  return <p>Olá, {name}!</p>;
}
```

* `type GreetingProps`: descreve a “forma” das props aceitas.
* `({ name }: GreetingProps)`: destructuring + tipagem explícita.
* `return <p>...`: JSX/TSX descrevendo o resultado visual.

**Conceito-chave**
Um componente não “imprime” na tela por conta própria. Ele **retorna uma descrição** do que deve aparecer.

---

<a id="3-jsx-e-tsx-o-html-dentro-do-js-sem-mito"></a>

## JSX e TSX (o “HTML dentro do JS” sem mito)

### JSX como sintaxe (não é string, não é HTML)

JSX parece HTML, mas não é:

* não é uma string,
* não é um “template” do navegador,
* é uma **sintaxe** que vira chamadas JavaScript que criam elementos React.

TSX é JSX + TypeScript: permite que o TypeScript entenda tipos enquanto você escreve JSX.

**Conceito-chave**
JSX é uma forma de escrever **árvores de elementos** em um formato legível.

### Por que `className` e não `class`

Em JavaScript, `class` é palavra reservada. O React usa:

* `className` para classes CSS,
* `htmlFor` no lugar de `for` em labels.

Isso alinha os nomes com propriedades do DOM/JS e evita conflitos.

### Expressões dentro de `{}`

#### Renderizar variáveis

```tsx
const user = "Gabriel";
return <h1>Bem-vindo, {user}</h1>;
```

#### Ternário e `&&` (com cuidado)

```tsx
return <p>{isAdmin ? "Acesso total" : "Acesso limitado"}</p>;
```

```tsx
return <p>{hasError && "Ocorreu um erro."}</p>;
```

**Atenção**
Com `&&`, o lado esquerdo precisa ser um boolean “limpo”. Se você usar um número, `0 && "texto"` resulta em `0` (e pode aparecer na tela). Prefira booleans.

### Atributos e tipos: string vs expressão

* String literal: `title="Olá"`
* Expressão: `title={message}` ou `disabled={isDisabled}`

```tsx
<button disabled={isSaving}>Salvar</button>
```

### Regras do JSX

#### Um único “root”

Você precisa retornar um único elemento raiz:

```tsx
return (
  <div>
    <h1>Título</h1>
    <p>Texto</p>
  </div>
);
```

#### Fragment

Quando você não quer criar um `div` extra:

```tsx
return (
  <>
    <h1>Título</h1>
    <p>Texto</p>
  </>
);
```

### O que vira “JS de verdade” (visão geral)

Você pode imaginar que:

```tsx
<h1>Olá</h1>
```

vira algo como “crie um elemento React do tipo `h1` com esse conteúdo”. Você não precisa decorar a forma exata; o importante é entender que JSX é transformado em JavaScript e **executa** no seu bundle.

---

<a id="4-props-entrada-do-componente"></a>

## Props (entrada do componente)

### Props como parâmetros

Props são os “argumentos” de um componente. Se o componente é uma função, props são os parâmetros.

Isso é ótimo porque:

* facilita teste mental,
* reduz dependências escondidas,
* incentiva componentes reutilizáveis.

### Por que props não devem ser mutadas

Props representam dados **recebidos**. Se você as muta, você:

* quebra previsibilidade,
* pode criar inconsistências (o pai “acha” uma coisa, o filho alterou outra),
* viola a ideia de “fonte única de verdade”.

**Atenção**
Se você precisa “alterar algo”, normalmente isso é **state** (local) ou uma ação solicitada ao pai via callback.

### Tipagem de props em TypeScript

Um padrão comum:

```tsx
type CardProps = {
  title: string;
  description?: string; // opcional
};

export function Card({ title, description }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </section>
  );
}
```

* `description?: string` significa “pode não vir”.
* destructuring torna o uso mais legível.

### Props `children` (noção)

`children` é o conteúdo entre a abertura e fechamento do componente:

```tsx
type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export function Panel({ title, children }: PanelProps) {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
```

Uso:

```tsx
<Panel title="Avisos">
  <p>Manutenção às 22h.</p>
</Panel>
```

### Padrões comuns

* **Props de conteúdo**: `title`, `subtitle`, `label`
* **Props de comportamento**: `onClick`, `onSubmit`, `onChange`

#### Exemplo mínimo: Card + Button com `onClick` tipado

```tsx
type ButtonProps = {
  label: string;
  onClick: () => void; // evento é tratado dentro do componente, aqui é só o “contrato”
};

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

type InfoCardProps = {
  title: string;
  description: string;
  onAction: () => void;
};

export function InfoCard({ title, description, onAction }: InfoCardProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button label="Ok" onClick={onAction} />
    </section>
  );
}
```

**Conceito-chave**
Quando você passa uma função por props, você está criando um “fio” de comunicação: o filho não muda o estado do pai diretamente — ele **pede** por meio de uma callback.

---

<a id="5-state-usestate--quando-a-ui-precisa-lembrar"></a>

## State (useState) — quando a UI precisa “lembrar”

### O que é state e por que existe

State é a memória do componente: dados que:

* mudam ao longo do tempo,
* e afetam o que a UI mostra.

Exemplos típicos:

* contador,
* campo de input,
* se um painel está aberto,
* qual item está selecionado.

### `useState`: valor atual + setter

O `useState` te dá dois valores:

* o **valor atual**,
* uma função para **atualizar** esse valor.

Quando você chama o setter, o React agenda um re-render.

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Valor: {count}</p>
      <button onClick={() => setCount(count + 1)}>Somar</button>
    </div>
  );
}
```

**Conceito-chave**
O componente “roda de novo” (re-render) porque o state mudou — não porque você “mandou redesenhar”.

### Regras importantes

#### Nunca mutar state diretamente

Se o state é um objeto/array, você não deve fazer `push`, `sort` mutável, ou alterar propriedades diretamente. O React precisa de uma **nova referência** para entender que mudou.

**Atenção**
Mesmo que “pareça funcionar”, mutação costuma gerar bugs intermitentes e difíceis de rastrear.

#### Atualizações podem ser agrupadas (noção)

O React pode agrupar atualizações de state para evitar renders desnecessários. Então, não assuma que o state muda “instantaneamente” linha a linha como uma variável comum.

#### Functional update quando depende do anterior

Se o próximo valor depende do valor anterior, prefira:

```tsx
setCount((prev) => prev + 1);
```

Isso evita problemas quando múltiplas atualizações são agrupadas.

### Exemplos mínimos

#### Contador (bem explicado)

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    // Usa functional update porque depende do valor anterior
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <p>Valor: {count}</p>
      <button onClick={handleIncrement}>Somar</button>
    </div>
  );
}
```

#### Toggle (mostrar/esconder)

```tsx
import { useState } from "react";

export function ToggleDetails() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Esconder" : "Mostrar"} detalhes
      </button>

      {isOpen && <p>Detalhes do produto: entrega em até 2 dias.</p>}
    </section>
  );
}
```

---
![alt text](/api/materiais-assets/6-frontend/9-react-fundamentos/assets/image-1.png)
*Figura 2 — Ciclo de render: state muda → re-render → UI atualiza*

---

<a id="6-eventos-no-react-comparando-com-dom"></a>

## Eventos no React (comparando com DOM)

### `onClick`, `onChange`, `onSubmit`

React usa props para eventos:

* `onClick` em botões,
* `onChange` em inputs,
* `onSubmit` em forms.

Isso se parece com DOM, mas a forma de organizar é mais consistente: você passa uma função e o React chama quando o evento ocorre.

### Synthetic events (visão geral)

O React fornece eventos que parecem eventos do DOM, mas são “normalizados” para funcionar de forma consistente entre navegadores (historicamente importante). Hoje, a diferença raramente importa no básico, mas o termo aparece na documentação.

### Tipar eventos com TypeScript (sem exagero)

Em muitos casos, o TypeScript infere o tipo automaticamente. Quando você precisar explicitar, use os tipos do React:

* `React.MouseEvent`
* `React.ChangeEvent<HTMLInputElement>`
* `React.FormEvent<HTMLFormElement>`

#### Exemplo: clique com state + submit com preventDefault

```tsx
import { useState } from "react";

export function MiniForm() {
  const [count, setCount] = useState(0);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // e existe, mas aqui não precisamos dele — serve para mostrar o tipo
    setCount((prev) => prev + 1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // impede o reload da página
    // aqui você “processaria” os dados do form
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Cliques: {count}</p>
      <button type="button" onClick={handleClick}>
        Somar
      </button>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Atenção**
Em um `<form>`, um `<button>` sem `type` pode se comportar como submit por padrão. Em exemplos e em produção, prefira declarar `type="button"` quando não for submit.

---

<a id="7-formulários-controlados-o-padrão-profissional"></a>

## Formulários controlados (o padrão “profissional”)

Imagine um formulário de cadastro. Se a UI deve refletir o estado, então o valor do input também precisa estar em algum lugar previsível. É aí que entra o padrão de formulário controlado.

### Controlado vs não-controlado

* **Não-controlado**: o valor “mora” no DOM; você lê depois (ex: via `ref` ou `FormData`).
* **Controlado**: o valor “mora” no state; o input apenas **reflete** esse state.

No React, o padrão controlado é muito comum porque:

* facilita validação,
* facilita habilitar/desabilitar botões,
* evita inconsistências,
* mantém o modelo mental “UI = f(state)” coerente.

### Input controlado: `value` + `onChange`

O padrão:

* `value={state}`
* `onChange` atualiza o state

```tsx
import { useState } from "react";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // validação simples (noção)
    if (!name.trim()) {
      setError("Informe seu nome.");
      return;
    }
    if (!email.includes("@")) {
      setError("E-mail parece inválido.");
      return;
    }

    setError(null);
    // Aqui você enviaria os dados (sem fetch nesta aula)
  }

  const isValid = name.trim().length > 0 && email.includes("@");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome</label>
        <input id="name" value={name} onChange={handleNameChange} />
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" value={email} onChange={handleEmailChange} />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={!isValid}>
        Cadastrar
      </button>
    </form>
  );
}
```

**Dica**
Comece simples: “um state por campo” é ótimo para formulários pequenos e didáticos. Estado em objeto faz sentido quando o formulário cresce — mas introduz detalhes (merge, imutabilidade) que aumentam o custo mental.

### Trade-off: estado por campo vs estado como objeto

* **Por campo**: mais verboso, mais explícito, mais fácil de raciocinar.
* **Objeto único**: menos `useState`, mas exige cuidado com updates imutáveis.

**Conceito-chave**
Form controlado é basicamente um ciclo fechado: UI mostra `value`; evento muda state; state redefine `value`.

---
![alt text](/api/materiais-assets/6-frontend/9-react-fundamentos/assets/image-2.png)

*Figura 3 — Form controlado: input → onChange → setState → value atualiza*

---

<a id="8-renderização-de-listas-map-e-keys"></a>

## Renderização de listas (map) e keys

### Renderizar arrays com `.map`

Quando você tem uma lista de dados, a UI geralmente é “um item visual para cada item do array”. O `.map` expressa isso diretamente.

```tsx
type Todo = {
  id: string;
  title: string;
};

type TodoListProps = {
  items: Todo[];
};

export function TodoList({ items }: TodoListProps) {
  if (items.length === 0) {
    return <p>Nenhuma tarefa ainda.</p>;
  }

  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### `key`: por que existe

`key` é a forma de o React identificar **a identidade** de cada item renderizado numa lista.

Sem identidade, quando uma lista muda (insere, remove, reordena), o React pode:

* reaproveitar o “item visual” errado,
* misturar estados locais de componentes filhos,
* causar bugs visuais difíceis.

**Conceito-chave**
`key` não é “um índice qualquer”. É uma etiqueta de identidade para o React rastrear cada item ao longo do tempo.

### Por que não usar `index` quando a lista muda

Se você usa `index` como `key` e insere um item no topo, todos os índices mudam. O React “acha” que os itens trocaram de identidade — e aí o reaproveitamento fica errado.

**Atenção**
`index` como key só é aceitável quando a lista é **estática** (não muda ordem, não insere/remove) — o que é mais raro do que parece.

### Estados comuns: lista vazia, loading, error (noção, sem fetch)

Mesmo sem buscar dados nesta aula, é importante reconhecer padrões:

* **empty state**: “não há dados ainda”
* **loading**: “estou carregando”
* **error**: “falhei”

Esses estados são só variações de UI = f(state).

### Exemplo mínimo: lista com `id` + botão para adicionar item (sem persistência)

```tsx
import { useState } from "react";

type Item = { id: string; label: string };

export function SimpleList() {
  const [items, setItems] = useState<Item[]>([
    { id: "a1", label: "Primeiro" },
    { id: "b2", label: "Segundo" },
  ]);

  function handleAdd() {
    // gera um id simples (apenas para exemplo local)
    const id = String(Date.now());
    const newItem: Item = { id, label: `Item ${items.length + 1}` };

    // nunca mutar: cria novo array
    setItems((prev) => [...prev, newItem]);
  }

  return (
    <section>
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>

      {items.length === 0 ? (
        <p>Lista vazia.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

---
![alt text](/api/materiais-assets/6-frontend/9-react-fundamentos/assets/image-3.png)

*Figura 4 — Lista: array → map → elementos com key (identidade)*

---

<a id="9-boas-práticas-de-estrutura-e-legibilidade"></a>

## Boas práticas de estrutura e legibilidade

### Componentes pequenos

* Menos linhas por componente facilita entendimento.
* Menos responsabilidades reduz efeito colateral.
* Componentes menores se tornam “vocabulário” do seu app.

### Nomear handlers: `handleSubmit`, `handleChange`

Nomes consistentes viram documentação:

* `handleSubmit`
* `handleNameChange`
* `handleAddItem`

Isso deixa o JSX mais limpo, porque a intenção aparece no nome.

### Evitar lógica pesada dentro do JSX

JSX é ótimo para estrutura, mas lógica complexa dentro dele vira ruído.

Preferível:

```tsx
const total = price * quantity;
return <p>Total: {total}</p>;
```

Em vez de:

```tsx
return <p>Total: {price * quantity}</p>;
```

Para condições maiores:

* extraia para variáveis (`const content = ...`)
* ou funções pequenas (`function renderBody() { ... }`)

**Dica**
Uma boa regra prática: se você precisa “ler em voz alta” uma expressão dentro de `{}`, talvez ela devesse virar uma variável nomeada.

### Padrões de pasta (visão geral)

Sem impor framework, um arranjo comum é:

* `components/` para componentes reutilizáveis (Button, Card, Modal…)
* `pages/` ou `screens/` para páginas/telas (Home, Profile…)

O importante é separar:

* **peças reutilizáveis** (genéricas)
* de **composição de telas** (específica do contexto).

### Estilos (sem ensinar, apenas mencionar)

Existem várias formas:

* CSS puro,
* CSS Modules,
* styled-components,
* etc.

Nos exemplos desta aula, manteremos neutro: foco no React/TS, não no styling.

---

<a id="10-erros-comuns-e-confusões-clássicas"></a>

## Erros comuns e confusões clássicas

* **Esquecer `key`** em listas, ou usar uma `key` que não é estável.
* **Usar índice como `key`** em lista que insere/remove/reordena (bug de identidade).
* **Mutar state** (especialmente arrays/objetos): `push`, `sort` mutável, `obj.prop = ...`.
* **Confundir props com state**:

  * props: vem de fora, o componente recebe
  * state: mora dentro, o componente controla
* **Passar função executada no `onClick`**:

  * errado: `onClick={handleSave()}`
  * certo: `onClick={handleSave}` (passa a referência)
* **Chamar setter em loop/condição sem cuidado**, criando re-renders em cascata.
* **Esquecer `preventDefault()`** no `onSubmit`, causando reload e perdendo state.
* **Colocar lógica gigante no JSX**, deixando UI difícil de ler.
* **Assumir que state atualiza “na hora”** como uma variável comum — e escrever código dependente dessa suposição.

**Atenção**
A maioria desses problemas não é “erro de sintaxe”; é erro de **modelo mental**. Quando você entende UI = f(state) e identidade via `key`, muitos bugs deixam de existir.

---

<a id="11-glossário-rápido"></a>

## Glossário rápido

* **Componente**: função que recebe props e retorna uma descrição de UI (elementos React).
* **JSX/TSX**: sintaxe que permite escrever árvores de UI dentro do JavaScript/TypeScript.
* **Props**: dados de entrada de um componente (parâmetros), vindos do pai.
* **State**: dados internos que o componente “lembra” e que afetam a UI.
* **Hook**: função do React (ex: `useState`) que adiciona recursos ao componente.
* **Render**: execução do componente para produzir a UI atual.
* **Re-render**: render novamente após mudança de state/props.
* **Controlled input**: input cujo `value` vem do state e é atualizado via `onChange`.
* **Key**: identificador estável que dá identidade a itens de lista para o React.
* **Handler**: função que lida com um evento (ex: `handleSubmit`).
* **Composição**: montar componentes a partir de outros componentes, como LEGO.

---

<a id="12-resumo-final"></a>

## Resumo final

React é mais fácil quando você aceita o contrato principal: **a UI é uma função do estado**. Componentes são funções que retornam UI; **props** levam dados do pai para o filho; **state** permite que a UI “lembre” e reaja a interações; eventos disparam handlers que mudam state; formulários controlados tornam inputs previsíveis; listas são renderizadas com `map` e precisam de **keys estáveis** para preservar identidade.

**Próximos passos naturais** (apenas como direção): lidar com efeitos (ex: buscar dados), compartilhar estado entre componentes mais distantes e melhorar performance — assuntos que dependem desse fundamento estar bem firme.
