---
title: 10. React (Intermediário)
description: 
category: Frontend
order: 10
---

# 10. React (Intermediário) com TypeScript

## Objetivo da aula

Aprofundar o modelo mental do React moderno (Function Components + Hooks) para lidar com **efeitos**, **dados remotos**, **estados de loading/erro**, **compartilhamento de dados com Context**, **organização de projeto** e **formulários mais complexos** — com TypeScript, sem bibliotecas externas de estado ou formulários.

## Pré-requisitos

* React (fundamentos): componentes, props, `useState`, eventos, listas, formulários controlados simples.
* TypeScript básico: tipos, interfaces, `Promise<T>`, `Record`, `Partial`, tipagem de funções.
* JavaScript assíncrono: `async/await`, `try/catch`, `fetch`, JSON.

## O que você será capaz de explicar ao final

* O que é um **efeito** e por que `useEffect` existe (e por que ele roda **depois** do render).
* Como pensar corretamente em **dependências** e por que “desligar o lint” costuma virar bug.
* Como estruturar um consumo de API com **fetch + service layer**, tipagem em TS e tratamento de erros.
* Como modelar UI com **loading/success/error/empty** e oferecer **retry** sem virar gambiarra.
* Quando `useContext` resolve um problema real (prop drilling) e quando vira um “Context Deus”.
* Como organizar pastas e responsabilidades para um projeto crescer sem virar confusão.
* Como construir um formulário mais complexo (validação por campo + no submit) sem libs externas.

---

## Sumário

* [1. O “degrau” intermediário no React: estado, efeitos e dados remotos](#1-o-degrau-intermediário-no-react-estado-efeitos-e-dados-remotos)
* [2. useEffect (o hook de efeitos) — modelo mental certo](#2-useeffect-o-hook-de-efeitos--modelo-mental-certo)
* [3. Consumo de APIs no React (fetch + useEffect)](#3-consumo-de-apis-no-react-fetch--useeffect)
* [4. Loading e erro (estados de UI “de verdade”)](#4-loading-e-erro-estados-de-ui-de-verdade)
* [5. useContext (compartilhar dados sem prop drilling)](#5-usecontext-compartilhar-dados-sem-prop-drilling)
* [6. Organização de projeto (estrutura simples e escalável)](#6-organização-de-projeto-estrutura-simples-e-escalável)
* [7. Formulários mais complexos (sem libs, mas com padrão bom)](#7-formulários-mais-complexos-sem-libs-mas-com-padrão-bom)
* [8. Próximos passos (contexto, sem ensinar agora)](#8-próximos-passos-contexto-sem-ensinar-agora)
* [Erros comuns e confusões clássicas](#erros-comuns-e-confusões-clássicas)
* [Glossário rápido](#glossário-rápido)
* [Resumo final](#resumo-final)

---

## O “degrau” intermediário no React: estado, efeitos e dados remotos

Até aqui, o React pode ter parecido um “motor de UI” relativamente fechado:

* Você tem **state** e **props**.
* O componente **renderiza** (na prática, executa a função).
* O resultado é uma descrição da UI (JSX).
* Quando state/props mudam, o componente renderiza novamente.

### Relembrando o modelo mental: render → state/props → UI

O ponto central é que o **render** deve ser **puro**: dado o mesmo state/props, você quer a mesma UI. Isso ajuda o React a manter consistência, otimizar atualizações e evitar comportamentos imprevisíveis.

>**Conceito-chave**
> **Render não é “um lugar para fazer coisas”**. Render é para **descrever a UI**. Coisas que “mexem no mundo” (rede, storage, timers) entram em outra categoria.

### O novo problema: sincronizar UI com “mundo externo”

Em aplicações reais, o componente precisa conversar com algo fora do React:

* **Rede (API)**: buscar lista de usuários, produtos, pedidos.
* **Storage**: salvar preferências, recuperar token.
* **Timers**: contador, debounce, polling.
* **Subscriptions**: WebSocket, listeners, eventos do browser.

Essas ações têm duas características importantes:

1. Elas são **efeitos colaterais** (não são só “calcular UI”).
2. Elas têm **tempo**: começam, terminam, podem falhar, podem precisar ser canceladas.

### Introduzindo: `useEffect` como “ponto de sincronização”

`useEffect` existe para você dizer: “Depois que o React desenhar/confirmar esta UI, sincronize com o mundo externo”.

Em outras palavras: **render descreve**, **effect sincroniza**.

### Introduzindo: Context como “distribuição de dados” sem prop drilling

Quando muitos componentes precisam de um mesmo dado (tema, usuário autenticado, idioma), passar props “no meio do caminho” vira ruído. Context cria um canal onde um valor pode ser lido por qualquer componente dentro de uma subárvore.

>**Dica**
> Pense em Context como um **sistema de distribuição** dentro de uma parte do app — não como uma solução mágica de “estado global”.

---

## useEffect (o hook de efeitos) — modelo mental certo

### O que é “efeito”

Um **efeito** é um código que roda **depois do render** para **sincronizar** o componente com algo externo ao React.

Exemplos clássicos:

* Atualizar `document.title`
* Iniciar/limpar um `setInterval`
* Fazer `fetch` de dados
* Registrar/desregistrar um event listener

### Assinatura

```tsx
useEffect(() => {
  // efeito: roda após o render
  return () => {
    // cleanup: roda antes do próximo efeito e ao desmontar
  };
}, [deps]);
```

### Dependências: por que existem

A lista de dependências não é “um detalhe chato”. Ela é a forma do React garantir **consistência**: se o efeito usa valores que mudam, o efeito precisa ser reexecutado para sincronizar de novo.

Uma forma útil de pensar:

>**Conceito-chave**
> Dependências são a **lista de coisas que o efeito usa de fora** (do escopo do componente) e que podem mudar entre renders.

* Se o efeito usa `userId`, e `userId` muda, você quer sincronizar de novo.
* Se o efeito usa uma função criada inline, e ela muda a cada render, você pode causar reexecuções desnecessárias.

### Padrões comuns

#### 1) Rodar “uma vez” (deps vazias)

```tsx
useEffect(() => {
  // roda após o primeiro render
}, []);
```

Isso é útil para:

* configurar algo que só existe enquanto o componente está montado (ex.: iniciar timer, registrar listener)
* iniciar um fetch inicial (com cuidado)

>**Atenção**
> “Rodar uma vez” funciona porque você está dizendo que o efeito **não depende** de nada que varie. Se na prática ele depende (por exemplo, de `props`), a deps vazia vira fonte de bug sutil.

#### 2) Rodar quando algo muda (deps específicas)

```tsx
useEffect(() => {
  // sincroniza quando userId muda
}, [userId]);
```

### Cleanup: por que existe

O cleanup serve para:

* evitar vazamentos (timers, subscriptions)
* evitar efeitos duplicados (listener registrado várias vezes)
* interromper sincronizações antigas antes de iniciar novas

O cleanup roda:

* **antes** do efeito rodar novamente (quando deps mudam)
* ao **desmontar** o componente

#### Exemplo mínimo: `document.title`

```tsx
import { useEffect } from "react";

type Props = { pageTitle: string };

export function TitleSync({ pageTitle }: Props) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <h1>{pageTitle}</h1>;
}
```

#### Exemplo mínimo: timer com cleanup (`setInterval`)

```tsx
import { useEffect, useState } from "react";

export function Clock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // cleanup: para o timer quando o componente sai da tela
    return () => {
      window.clearInterval(id);
    };
  }, []);

  return <p>Segundos: {seconds}</p>;
}
```

### Armadilhas clássicas (com honestidade)

#### Loop infinito por deps erradas

Se o efeito faz `setState`, isso causa re-render. Se o efeito depende desse state e não foi planejado, pode virar ciclo.

#### Depender de função/objeto instável

Objetos e funções criados inline mudam de referência a cada render:

```tsx
const options = { method: "GET" }; // novo objeto em todo render
```

Se `options` estiver em deps, o efeito roda sempre. A solução costuma envolver:

* mover criação para dentro do effect (quando possível), ou
* estabilizar referências (com `useMemo/useCallback`) — **não vamos ensinar agora**, mas é o próximo degrau.

#### “Desligar” o lint e criar bug

O lint (`react-hooks/exhaustive-deps`) geralmente está apontando um problema real: você está usando algo que pode mudar e não declarou. Desligar o lint pode “silenciar” o sintoma, mas mantém o bug.

>**Dica**
> Quando o lint “pede” uma dependência que você acha estranha, a pergunta certa é: **por que essa dependência está mudando?**. Às vezes o ajuste correto é mudar como você cria funções/objetos, não remover deps.

---
![Figura 1 — Linha do tempo do useEffect](/api/materiais-assets/6-frontend/10-react-intermediario/assets/image.png)
*Figura 1 — Linha do tempo do `useEffect` (render → commit → effect → cleanup)*


## Consumo de APIs no React (fetch + useEffect)

### Modelo mental (o ciclo completo)

Imagine uma tela que busca usuários ao abrir:

1. iniciar request
2. marcar `loading`
3. receber resposta
4. se sucesso: salvar `data`
5. se falha: salvar `error`
6. renderizar UI conforme o estado

>**Conceito-chave**
> Consumir API não é “pegar dados” — é **modelar estados** ao longo do tempo.

### Por que não chamar `fetch` no corpo do componente

O corpo do componente roda em todo render. Se você fizer:

```tsx
// ERRADO: exemplo intencional
fetch("/api/users");
```

Você pode disparar requests repetidos:

* na primeira renderização
* em re-renders causados por state/props
* em re-renders do React em modo estrito (dev) que reexecuta certas coisas para detectar problemas

O lugar apropriado para sincronizar com rede é o `useEffect`.

### Tipagem com TypeScript: defina o tipo do payload

Mesmo quando a API devolve JSON, quem define o contrato no seu código é você.

```ts
export type User = {
  id: string;
  name: string;
  email: string;
};
```

### Status HTTP vs erro de rede

`fetch` só rejeita a promise em erros de rede (ex.: sem internet). Para HTTP 404/500, ele resolve normalmente — por isso você precisa checar `response.ok`.

### Exemplo mínimo “padrão de mercado”: service separado + componente com `data/loading/error`

#### `services/usersService.ts`

```ts
import type { User } from "../types/user";

const BASE_URL = "https://example.com"; // em projeto real, viria de config/env

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/api/users`, { signal });

  // HTTP != sucesso automático
  if (!response.ok) {
    // você pode enriquecer com status/texto
    throw new Error(`Falha ao buscar usuários (HTTP ${response.status})`);
  }

  // Tipagem: confiamos que a API segue o contrato
  const data = (await response.json()) as User[];
  return data;
}
```

#### `types/user.ts`

```ts
export type User = {
  id: string;
  name: string;
  email: string;
};
```

#### `screens/UsersList.tsx`

```tsx
import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { getUsers } from "../services/usersService";

export function UsersList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Um "token" simples para permitir refetch (retry)
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await getUsers(controller.signal);
        setUsers(result);
      } catch (err) {
        // Se foi abort, normalmente não mostramos erro ao usuário
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setError("Não foi possível carregar usuários agora.");
      } finally {
        setLoading(false);
      }
    }

    load();

    // cleanup: cancela request se o componente desmontar
    // ou se reloadToken mudar antes do fetch terminar
    return () => controller.abort();
  }, [reloadToken]);

  if (loading) return <p>Carregando...</p>;

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button onClick={() => setReloadToken((t) => t + 1)}>
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!users) return null; // estado inicial antes do primeiro load terminar

  if (users.length === 0) return <p>Nenhum usuário encontrado.</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <strong>{u.name}</strong> — {u.email}
        </li>
      ))}
    </ul>
  );
}
```

### Cancelamento (noção): `AbortController`

O objetivo do cancelamento aqui é evitar duas situações ruins:

* request antigo terminando depois e sobrescrevendo estado “mais novo”
* componente desmontar e, mesmo assim, o código tentar dar `setState`

>**Atenção**
> Cancelamento não “salva performance” por mágica. Ele evita inconsistências e avisos (“setState on unmounted component”) e melhora previsibilidade quando há múltiplos requests.

---
![alt text](/api/materiais-assets/6-frontend/10-react-intermediario/assets/image-1.png)
*Figura 2 — Fluxo de API: UI → service(fetch) → response → state → render*

---

## Loading e erro (estados de UI “de verdade”)

### A tríade de estados

Na prática, telas com dados remotos vivem nesses estados:

* **loading**: requisição em andamento
* **success**: dados disponíveis
* **error**: falhou (com mensagem/ação)

Um ponto importante: `success` não é “tenho algo para mostrar”. Às vezes `success` significa “tenho uma lista vazia”. Isso entra como **empty state**.

### Estados adicionais úteis

* **empty state**: request foi ok, mas veio vazio (ex.: `[]`)
* **retry**: ação explícita para tentar de novo

>**Conceito-chave**
> Loading/erro não são “detalhes de UI”. Eles são parte do **modelo de estado** da tela.

### Boas práticas (mundo real)

* Evitar “flash” de loading (carrega e some instantâneo):

  * para requests muito rápidos, você pode optar por não mostrar spinner imediatamente; em apps reais, isso é um refinamento de UX.
* Mensagens amigáveis ao usuário:

  * “Não foi possível carregar agora” é melhor do que “TypeError: Failed to fetch”.
* Log técnico separado:

  * usuário vê uma mensagem simples; você mantém `console.error(err)` para diagnóstico.

### Skeleton vs spinner (conceito)

* **Spinner**: comunica “estou esperando”, mas não mostra estrutura.
* **Skeleton**: mostra “o formato” do conteúdo e tende a parecer mais estável.

Aqui, o ponto não é implementar um skeleton completo, e sim entender a intenção.

### Erro com ação (tentar novamente)

O padrão mais útil é oferecer um caminho de recuperação:

* um botão “Tentar novamente” que dispara refetch
* em situações específicas, sugerir “Verifique sua conexão”

>**Dica**
> Se a UI não mostra erro, o usuário conclui que “o app travou”. Em apps com dados remotos, **erro exibido é parte do funcionamento normal**.

---

## useContext (compartilhar dados sem prop drilling)

### Problema: prop drilling

Prop drilling acontece quando um dado precisa atravessar vários componentes que não usam esse dado, apenas repassam:

`App → Layout → Sidebar → UserBadge`

Se só o `UserBadge` precisa do usuário, os intermediários viram “correio” de props.

### O que é Context

Context é um canal de valores “globais” dentro de uma subárvore de componentes. Você cria um Context, fornece um valor com `Provider`, e lê com `useContext`.

### As partes do Context

* `createContext`: cria o canal
* `Provider`: define o valor para a subárvore
* `useContext`: lê o valor

### Tipagem com TS: default `null` e padrão de custom hook

Em TS, é comum permitir que o Context exista sem valor (antes de um Provider), então o tipo inclui `null`. Para evitar `null` espalhado pelo app, um padrão bem usado é criar um hook que valida:

#### `contexts/ThemeContext.tsx`

```tsx
import { createContext, useContext, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  // useMemo não é obrigatório aqui para aprender Context,
  // mas evita recriar o objeto a cada render (um detalhe de performance).
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme deve ser usado dentro de <ThemeProvider>.");
  }
  return ctx;
}
```

#### Consumindo em dois componentes

```tsx
import { useTheme } from "../contexts/ThemeContext";

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Tema atual: {theme} (alternar)
    </button>
  );
}

export function HeaderTitle() {
  const { theme } = useTheme();
  return <h1>Bem-vindo — tema: {theme}</h1>;
}
```

E no topo do app:

```tsx
import { ThemeProvider } from "./contexts/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      {/* resto do app */}
    </ThemeProvider>
  );
}
```

### Boas práticas e limites

Context é ótimo para:

* tema (light/dark)
* usuário autenticado (id, nome, permissões)
* locale/idioma
* configurações globais

Context é perigoso quando:

* você coloca **dados altamente mutáveis** (ex.: digitação em tempo real, stream de dados) e muitos componentes consomem → re-render em cascata
* você cria um “Context Deus” com tudo do app → acoplamento e manutenção difícil

>**Atenção**
> Cada mudança no `value` do Provider tende a causar re-render nos consumidores. Em apps grandes, isso é um fator real. Uma estratégia comum é **dividir contextos por domínio** (AuthContext, ThemeContext, SettingsContext) em vez de um só.

---
![alt text](/api/materiais-assets/6-frontend/10-react-intermediario/assets/image-2.png)
*Figura 3 — Context: Provider no topo → consumo em filhos (sem prop drilling)*

---

## Organização de projeto (estrutura simples e escalável)

Organizar projeto não é “estética de pastas”: é uma forma de reduzir acoplamento e evitar que mudanças pequenas virem mudanças espalhadas.

### Objetivo: reduzir acoplamento e melhorar manutenção

Uma regra prática: **componentes de UI** deveriam ser o mais “burrinhos” possível sobre detalhes externos (ex.: URLs de API). Isso torna testes, refactors e reuso muito mais simples.

### Sugestão de estrutura (sem impor framework)

Uma estrutura simples e comum:

```
src/
  components/   (reutilizáveis, UI)
  screens/      (telas/páginas)
  services/     (chamadas de API, fetch)
  contexts/     (providers e hooks de context)
  types/        (tipos de domínio)
  utils/        (funções pequenas e genéricas)
```

### Regras práticas

* **Componente não deve conhecer detalhes de fetch**

  * Prefira: `services/usersService.ts` encapsula URL, `response.ok`, parsing.
* **Tipos perto do domínio**

  * `User`, `Product`, `Order` em `types/`.
* **Manter “UI pura” quando possível**

  * Recebe dados já prontos, renderiza.
* **Separar decisão de apresentação**

  * “como buscar” (service) ≠ “como mostrar” (component)

### Naming e padrões

* Componentes: `PascalCase` (`UsersList`, `UserCard`)
* Hooks: `useX` (`useTheme`, `useAuth`)
* Handlers: `handleX` (`handleSubmit`, `handleRetry`)
* Services: verbos (`getUsers`, `createUser`, `updateProfile`)

### Evitar

* Uma `utils/` gigante com coisas sem critério (vira “porão do projeto”).
* Lógica de negócio espalhada dentro do JSX (dificulta leitura e manutenção).
* Componentes fazendo de tudo: render + fetch + validação + formatação + regras.

---

## Formulários mais complexos (sem libs, mas com padrão bom)

### Relembrando: formulários controlados

Um input controlado é aquele cujo valor vem do state, e mudanças atualizam o state via `onChange`.

Em formulários simples isso é trivial. O “complexo” aparece quando precisamos de:

* múltiplos campos
* validação por campo + validação no submit
* mensagens por campo
* campos que dependem de outros (ex.: confirmar senha depende da senha)
* estado de envio (submit em andamento) e erro de envio

### Modelos de estado

#### A) Um state por campo

Prós: direto, explícito.
Contras: verboso conforme cresce.

#### B) Um state objeto `form`

Prós: compacto e escalável.
Contras: exige disciplina para atualizar corretamente sem mutações.

Aqui vamos usar o modelo B.

### Validação: função pura `validate(form) → errors`

Em vez de validação espalhada em vários lugares, centralize:

* uma função `validate` que recebe o form inteiro
* devolve um objeto de erros por campo

Tipagem útil:

* `type Errors = Partial<Record<keyof FormState, string>>;`

Assim:

* se um campo não tem erro, ele nem aparece no objeto
* TS ajuda a manter os nomes dos campos coerentes

### Exemplo mínimo “padrão de mercado”: cadastro com 4 campos

* nome
* email
* senha
* confirmar senha

#### `screens/SignUpForm.tsx`

```tsx
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (form.name.trim().length < 2) {
    errors.name = "Informe um nome com pelo menos 2 caracteres.";
  }

  if (!form.email.includes("@")) {
    errors.email = "Informe um e-mail válido.";
  }

  if (form.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "As senhas não conferem.";
  }

  return errors;
}

// Simulação de envio: em app real, chamaria um service (fetch)
async function fakeSubmit(_form: FormState): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
  // Para simular erro, você poderia lançar um Error aqui.
}

export function SignUpForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));

    // limpar erro do campo ao digitar (comportamento comum)
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await fakeSubmit(form);
      // Em app real: navegar, mostrar toast, reset etc.
    } catch (err) {
      console.error(err);
      setSubmitError("Não foi possível enviar o cadastro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Nome
          <input
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            aria-invalid={!!errors.name}
          />
        </label>
        {errors.name && <p role="alert">{errors.name}</p>}
      </div>

      <div>
        <label>
          E-mail
          <input
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
        </label>
        {errors.email && <p role="alert">{errors.email}</p>}
      </div>

      <div>
        <label>
          Senha
          <input
            type="password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            aria-invalid={!!errors.password}
          />
        </label>
        {errors.password && <p role="alert">{errors.password}</p>}
      </div>

      <div>
        <label>
          Confirmar senha
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
            aria-invalid={!!errors.confirmPassword}
          />
        </label>
        {errors.confirmPassword && <p role="alert">{errors.confirmPassword}</p>}
      </div>

      {submitError && (
        <div role="alert">
          <p>{submitError}</p>
        </div>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Enviando..." : "Criar conta"}
      </button>
    </form>
  );
}
```

### Comentários práticos

* `validate` é uma função pura: facilita consistência e refactor.
* Erros por campo ficam centralizados em `errors`.
* `submitting` desabilita o botão e previne múltiplos envios.
* `submitError` é um erro “de rede/servidor”, diferente dos erros de validação local.

>**Dica**
> Um bom formulário separa claramente: **erros de validação** (o usuário corrige) vs **erro de envio** (o usuário tenta de novo).

---
![alt text](/api/materiais-assets/6-frontend/10-react-intermediario/assets/image-4.png)
*Figura 4 — Form complexo: inputs → state(form) → validate → errors → UI*
---

## Próximos passos (contexto, sem ensinar agora)

Depois desse degrau, é natural que apareçam novas necessidades:

* **Roteamento**: React Router (SPA) ou Next.js (framework com rotas e SSR/SSG).
* **Bibliotecas de forms**: React Hook Form / Formik para reduzir boilerplate em forms grandes.
* **Validação estruturada**: Zod / Yup para schemas reutilizáveis e mensagens consistentes.
* **Estado global mais robusto**: Redux / Zustand quando Context começa a ficar pesado (muitos domínios, alta mutabilidade).
* **Performance e referências estáveis**: `memo`, `useMemo`, `useCallback` para controlar re-render e custo de cálculos.

>**Conceito-chave**
> Essas ferramentas não substituem fundamentos. Elas fazem sentido quando você entende **por que** o boilerplate existe e quais trade-offs você quer assumir.

---

## Erros comuns e confusões clássicas

* **Chamar `fetch` no corpo do componente** e disparar requests em todo re-render.
* **Não checar `response.ok`** e tratar 404/500 como se fosse sucesso.
* Confundir **erro HTTP** com **erro de rede** (o comportamento do `fetch` é diferente).
* Criar `useEffect` com deps erradas e cair em:

  * **loop infinito**
  * **efeito desatualizado** (deps faltando)
* “Resolver” deps desligando o lint e introduzir bugs difíceis de rastrear.
* Esquecer **cleanup** em timers/listeners/subscriptions.
* Dar `setState` após unmount (ou ter request antigo atualizando tela nova).
* Context com valor gigantesco (“Context Deus”) misturando auth, tema, carrinho, preferências, etc.
* Provider faltando e o app quebrar de forma silenciosa (ou com `null` espalhado).
* Form com validação espalhada: um `if` no submit, outro no onChange, outro no componente — mensagens incoerentes.
* Não mostrar erro na UI (usuário acha que travou).
* Não ter empty state e mostrar uma lista “vazia” sem explicação.

---

## Glossário rápido

* **Efeito (effect):** código que roda após o render para sincronizar com o mundo externo (rede, DOM, timers).
* **Dependência (deps):** lista de valores externos usados pelo effect que determinam quando ele precisa rodar novamente.
* **Cleanup:** função retornada pelo effect para desfazer/cancelar algo (timer, listener, request) antes do próximo effect ou no unmount.
* **Fetch:** API nativa do browser para requests HTTP baseada em Promises.
* **Service layer:** camada de funções que encapsula detalhes de API (URL, `response.ok`, parsing, tipagem).
* **Loading state:** estado que representa “requisição em andamento”.
* **Error state:** estado que representa “falhou” (com mensagem e, idealmente, ação).
* **Empty state:** estado de sucesso sem dados úteis (lista vazia), com UI informativa.
* **Retry:** ação explícita para tentar novamente uma operação que falhou.
* **Context:** mecanismo do React para fornecer valores a uma subárvore sem prop drilling.
* **Provider:** componente que define o valor do Context para os descendentes.
* **Prop drilling:** passar props por vários níveis só para chegar em um componente mais profundo.

---

## Resumo final

O “intermediário” em React começa quando a UI deixa de ser só uma função de `state/props` e passa a precisar de **tempo** e **mundo externo**. `useEffect` é o ponto de sincronização: ele roda depois do render, segue regras de dependências para manter consistência e usa cleanup para evitar vazamentos e estados inválidos. Consumir APIs com qualidade não é apenas fazer `fetch`: é modelar corretamente `loading/error/success/empty`, separar responsabilidades com uma camada de services e tratar diferenças entre falhas HTTP e de rede. `useContext` resolve prop drilling e padroniza dados “globais do domínio”, mas tem limites — especialmente quando o valor muda com alta frequência. Por fim, formulários mais complexos exigem disciplina: estado bem modelado, validação centralizada e estados de submissão/erro claros. Com esses fundamentos, o próximo degrau (roteamento, libs de forms, estado global e performance) fica muito mais consciente e menos “mágico”.
