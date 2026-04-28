---
title: 7. JavaScript Assíncrono
description: 
category: Frontend
order: 7
---

# 7. JavaScript Assíncrono (no navegador)

## Objetivo da aula

Entender, com rigor conceitual e visão prática, como o JavaScript lida com operações que demoram (principalmente rede) sem travar a interface do navegador, usando **Promises**, **async/await** e **fetch**, além de construir um modelo mental correto para **tratamento de erros** e **boas práticas** do mundo real.

## Pré-requisitos

* JavaScript básico no navegador: variáveis, funções, objetos, arrays.
* Noção de DOM e eventos (click, submit), mesmo que mínima.
* Noção geral de HTTP (requisição e resposta) ajuda, mas será revisada.

## O que você será capaz de explicar ao final

* Por que o JavaScript precisa de assincronicidade para manter a UI responsiva.
* Como o **event loop** organiza a execução: **call stack**, **task queue** e **microtask queue**.
* O que é uma **Promise**, seus estados e como encadear com `then/catch/finally`.
* Por que `async/await` é uma forma mais legível de lidar com Promises — sem “bloquear” a página.
* Como usar `fetch` para **GET/POST**, entender `Response`, checar `ok`, e fazer parsing de JSON corretamente.
* Diferença entre **erro de rede** e **erro HTTP** (e por que `fetch` não rejeita em 404/500).
* Noções essenciais de **CORS**, **loading states**, e limites práticos como timeouts e cancelamento (visão geral).

---

## Sumário

* [1. Por que assincronicidade existe no JavaScript](#1-por-que-assincronicidade-existe-no-javascript)

  * [1.1 Operações que demoram e a UI responsiva](#11-operações-que-demoram-e-a-ui-responsiva)
  * [1.2 Modelo mental: “iniciar agora, continuar depois”](#12-modelo-mental-iniciar-agora-continuar-depois)
  * [1.3 Event loop (visão geral)](#13-event-loop-visão-geral)
* [2. Promises (fundamento)](#2-promises-fundamento)

  * [2.1 O que é uma Promise](#21-o-que-é-uma-promise)
  * [2.2 Estados: pending, fulfilled, rejected](#22-estados-pending-fulfilled-rejected)
  * [2.3 then/catch/finally e encadeamento](#23-thencatchfinally-e-encadeamento)
  * [2.4 Resolver vs rejeitar (e lançar erro)](#24-resolver-vs-rejeitar-e-lançar-erro)
  * [2.5 Promise.all (visão geral)](#25-promiseall-visão-geral)
* [3. async/await (sintaxe mais legível)](#3-asyncawait-sintaxe-mais-legível)

  * [3.1 O que async faz](#31-o-que-async-faz)
  * [3.2 await e a “pausa” que não bloqueia a página](#32-await-e-a-pausa-que-não-bloqueia-a-página)
  * [3.3 try/catch/finally com await](#33-trycatchfinally-com-await)
  * [3.4 Armadilhas comuns](#34-armadilhas-comuns)
* [4. fetch (rede no navegador)](#4-fetch-rede-no-navegador)

  * [4.1 fetch retorna Promise de Response](#41-fetch-retorna-promise-de-response)
  * [4.2 Response: ok, status, headers](#42-response-ok-status-headers)
  * [4.3 Parsing: json() e text()](#43-parsing-json-e-text)
  * [4.4 GET e POST com JSON](#44-get-e-post-com-json)
  * [4.5 Erro de rede vs erro HTTP](#45-erro-de-rede-vs-erro-http)
* [5. Consumir APIs (modelo mental de cliente)](#5-consumir-apis-modelo-mental-de-cliente)

  * [5.1 O que é uma API no contexto web](#51-o-que-é-uma-api-no-contexto-web)
  * [5.2 Request/Response com JSON](#52-requestresponse-com-json)
  * [5.3 Query string e path params](#53-query-string-e-path-params)
  * [5.4 CORS: por que acontece e limites](#54-cors-por-que-acontece-e-limites)
  * [5.5 Boas práticas de organização](#55-boas-práticas-de-organização)
* [6. Tratamento de erro básico](#6-tratamento-de-erro-básico)

  * [6.1 O que pode dar errado](#61-o-que-pode-dar-errado)
  * [6.2 Estratégia mínima de erros](#62-estratégia-mínima-de-erros)
  * [6.3 finally e estados de UX](#63-finally-e-estados-de-ux)
  * [6.4 Exemplo “padrão de mercado”](#64-exemplo-padrão-de-mercado)
* [7. Boas práticas e limites do mundo real](#7-boas-práticas-e-limites-do-mundo-real)
* [8. Erros comuns e confusões clássicas](#8-erros-comuns-e-confusões-clássicas)
* [9. Glossário rápido](#9-glossário-rápido)
* [10. Resumo final](#10-resumo-final)

---

## Por que assincronicidade existe no JavaScript

### Operações que demoram e a UI responsiva

No navegador, o JavaScript divide um espaço delicado com a experiência do usuário: cliques, rolagem, animações, digitação, renderização de layout. Tudo isso precisa continuar fluindo enquanto o seu código roda.

Algumas operações **inevitavelmente demoram**:

* Rede: buscar dados de uma API, enviar um formulário, baixar um arquivo.
* Disco/armazenamento: leituras mais custosas (ex.: alguns acessos ao storage podem ser síncronos, mas operações complexas normalmente envolvem mecanismos assíncronos do navegador).
* Temporizadores: esperar um tempo (`setTimeout`, `setInterval`).
* APIs do navegador que “respondem depois”: geolocalização, permissões, alguns fluxos de mídia etc.

Se o JavaScript “parasse o mundo” esperando uma resposta de rede, a página travaria: sem clique, sem rolagem, sem repintura. O usuário sentiria o site “congelado”.

>**Conceito-chave:** o navegador precisa manter a **interatividade**. O JavaScript foi desenhado para iniciar uma operação e continuar executando outras coisas enquanto essa operação termina “em paralelo” (do ponto de vista do programador).

### Modelo mental: “iniciar agora, continuar depois”

Pense em uma pizzaria (seu código) que faz pedidos para uma cozinha (rede/IO). Se a atendente ficasse parada olhando o forno até a pizza ficar pronta, ninguém mais seria atendido. O correto é:

1. **Fazer o pedido** (iniciar operação).
2. **Continuar atendendo** (executar outras partes do programa).
3. Quando a pizza ficar pronta, **receber a notificação** e seguir com o próximo passo.

Assincronicidade, no JavaScript do navegador, é exatamente isso: “**iniciar agora, continuar depois**”.

### Event loop (visão geral)

O coração do modelo é entender como o JavaScript decide **o que roda agora** e **o que fica para depois**. Em alto nível:

* **Call stack (pilha de chamadas):** onde ficam as funções que estão sendo executadas agora.
* **Task queue (fila de tarefas):** eventos e callbacks “normais” (ex.: eventos de UI, timers, mensagens). Muitas referências chamam isso de *macrotask queue*.
* **Microtask queue (fila de microtarefas):** continuação de Promises (callbacks de `then/catch/finally`) e reações do mecanismo de Promises. Microtasks têm prioridade: elas rodam **antes** da próxima task.

Além disso, o navegador intercala momentos de renderização/repintura entre ciclos, quando possível. O ponto prático: **se você bloqueia a call stack por muito tempo, a UI sofre**.

>**Dica:** quando você “espera” uma Promise com `await`, você não está “congelando” o navegador. Você está dizendo: *“quando isso resolver, continue daqui; por enquanto, devolva o controle para o event loop”*.

---
![alt text](/api/materiais-assets/6-frontend/7-javascript-assincrono/assets/image.png)
*Figura 1 — Event Loop no navegador (call stack + task queue + microtask queue)*

---

## Promises (fundamento)

### O que é uma Promise

Uma **Promise** é como um **recibo**: ela representa um resultado que ainda não está disponível, mas estará no futuro — ou falhará.

* Você recebe a Promise **imediatamente**.
* O valor real chega **depois**, quando a operação termina.
* Enquanto isso, você define “o que fazer quando chegar” (sucesso) e “o que fazer se der ruim” (erro).

>**Conceito-chave:** uma Promise não é o valor. Ela é um **objeto que representa o compromisso** de entregar um valor (ou um erro) mais adiante.

### Estados: pending, fulfilled, rejected

Toda Promise vive em um destes estados:

* **pending (pendente):** ainda não terminou.
* **fulfilled (cumprida):** terminou com sucesso; tem um valor.
* **rejected (rejeitada):** terminou com falha; tem um motivo (geralmente um erro).

Esses estados são **imutáveis**: uma Promise pendente vira fulfilled ou rejected **uma única vez**.

---
![alt text](/api/materiais-assets/6-frontend/7-javascript-assincrono/assets/image-1.png)
*Figura 2 — Estados de uma Promise*

---

### then/catch/finally e encadeamento

O trio clássico:

* `then(fn)` roda quando a Promise é **fulfilled**.
* `catch(fn)` roda quando a Promise é **rejected** (ou quando algum erro é lançado no caminho).
* `finally(fn)` roda **sempre**, em sucesso ou erro (muito útil para “limpar” estados de loading).

O detalhe que muda o jogo: **`then` devolve outra Promise**. Isso permite encadear passos de forma linear:

* Passo 1 termina → gera valor
* Passo 2 usa o valor → gera outro
* Se algum passo falhar → cai no `catch`

>**Conceito-chave:** callbacks de `then/catch/finally` são agendados na **microtask queue**. Isso explica por que eles rodam “logo depois” que a stack esvazia, antes de novos eventos comuns.

**Exemplo mínimo: Promise manual e encadeamento**

```js
// Simula uma operação assíncrona (por exemplo, "buscar dados").
// Não é um timer como foco do curso; é só um jeito curto de criar uma Promise.
function obterNumeroAssincrono() {
  return new Promise((resolve, reject) => {
    const deuCerto = Math.random() > 0.2; // 80% chance de sucesso
    if (deuCerto) resolve(10);
    else reject(new Error("Falha ao obter número"));
  });
}

obterNumeroAssincrono()
  .then((n) => n * 2)              // transforma o valor
  .then((n) => `Resultado: ${n}`)  // transforma de novo
  .then((texto) => {
    console.log(texto);
  })
  .catch((err) => {
    console.error("Erro:", err.message);
  })
  .finally(() => {
    console.log("Finalizou (sucesso ou erro).");
  });
```

Repare no modelo mental:

* A chamada `obterNumeroAssincrono()` retorna **imediatamente** (Promise pendente).
* Os `then/catch/finally` registram “continuações”.
* Quando a Promise resolve/rejeita, essas continuações vão para a **microtask queue** e rodam quando a call stack estiver livre.

### Resolver vs rejeitar (e lançar erro)

Aqui mora uma confusão comum: **“retornar um valor”** e **“lançar um erro”** têm efeitos diferentes na cadeia.

* Dentro de `then`, se você **retorna um valor**, a próxima Promise do encadeamento é **fulfilled** com esse valor.
* Se você **lança um erro** (`throw`), a próxima Promise do encadeamento vira **rejected** e o fluxo vai para o `catch`.

Exemplo mínimo (mesmo estilo, sem alongar):

```js
Promise.resolve(5)
  .then((x) => {
    if (x < 10) throw new Error("x pequeno demais");
    return x * 2;
  })
  .then((y) => console.log("y:", y))
  .catch((err) => console.error("Caiu no catch:", err.message));
```

>**Atenção:** “rejeitar” (`reject`) e “lançar erro” (`throw`) se comportam de forma muito parecida do ponto de vista de quem consome: ambos levam ao `catch`. A diferença é onde isso acontece: `reject` decide o estado final da Promise; `throw` transforma um passo do encadeamento em falha.

### Promise.all (visão geral)

`Promise.all([...])` serve para quando você tem várias operações assíncronas independentes e quer:

* disparar todas **em paralelo** (não uma após a outra),
* e continuar **quando todas** terminarem.

Exemplo mental típico: buscar usuários, permissões e configurações ao carregar uma página.

**Comportamento importante:** `Promise.all` é “fail-fast”. Se **qualquer** Promise rejeitar, o conjunto rejeita.

```js
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.reject(new Error("C falhou"));

Promise.all([p1, p2, p3])
  .then((valores) => console.log(valores)) // não chega aqui
  .catch((err) => console.error("Falhou o conjunto:", err.message));
```

>**Dica:** o “fail-fast” é ótimo quando você precisa de **tudo** para continuar. Se você quer “pegar o que der certo e lidar com o que falhar”, existe outra abordagem (como `Promise.allSettled`), mas a ideia central aqui é entender o padrão de paralelismo e o risco de falha em cascata.

---

## async/await (sintaxe mais legível)

Promises funcionam muito bem, mas `then` encadeado pode ficar verboso em lógicas mais longas, principalmente com várias validações e retornos intermediários. `async/await` existe para escrever **código assíncrono com cara de código sequencial**, mantendo o mesmo mecanismo (Promises) por baixo.

### O que async faz

Uma função marcada com `async` tem uma regra simples e poderosa:

* **sempre retorna uma Promise**.
* Se você `return valor`, isso vira `Promise.resolve(valor)`.
* Se você `throw erro`, isso vira `Promise.reject(erro)`.

Exemplo mínimo:

```js
async function f() {
  return 42;
}

f().then((v) => console.log(v)); // 42
```

### await e a “pausa” que não bloqueia a página

`await` só pode ser usado dentro de função `async`. Ele significa:

* “Espere esta Promise resolver e pegue o valor.”
* Se a Promise rejeitar, `await` “lança” o erro naquele ponto (como se fosse um `throw`).

A palavra “esperar” engana: **não é um bloqueio do thread inteiro**. O que acontece de verdade:

1. A função `async` começa a executar normalmente na call stack.
2. Quando encontra um `await`, ela **suspende** sua continuação.
3. A continuação é agendada como **microtask** para rodar quando a Promise terminar.
4. O controle volta ao event loop, e a UI continua respondendo.

>**Conceito-chave:** `await` não congela o navegador. Ele congela **apenas o trecho daquela função** — a execução do resto do programa (incluindo UI) continua.

### try/catch/finally com await

Como `await` pode “lançar” um erro quando a Promise rejeita, o padrão natural é:

* `try` envolvendo os awaits relevantes,
* `catch` para tratar,
* `finally` para sempre finalizar estados (ex.: loading).

```js
async function carregarAlgo() {
  try {
    const valor = await Promise.resolve("ok");
    console.log(valor);
  } catch (err) {
    console.error("Erro:", err);
  } finally {
    console.log("Sempre executa.");
  }
}
```

### Comparação didática: then/catch vs async/await (mesma lógica)

**Versão com `then/catch`:**

```js
function obterTexto() {
  return Promise.resolve("dados");
}

obterTexto()
  .then((t) => t.toUpperCase())
  .then((t) => console.log("Resultado:", t))
  .catch((err) => console.error("Erro:", err));
```

**Versão com `async/await`:**

```js
async function executar() {
  try {
    const t = await Promise.resolve("dados");
    const upper = t.toUpperCase();
    console.log("Resultado:", upper);
  } catch (err) {
    console.error("Erro:", err);
  }
}
```

Ambas são Promises por baixo. A diferença é a legibilidade e o local onde o erro “aparece”: com `await`, o erro se comporta como exceção naquele ponto.

### Armadilhas comuns

>**Atenção:** quase todos os “bugs estranhos” com async/await vêm de três descuidos.

* **Esquecer `await`:** você acha que tem o dado, mas ainda tem uma Promise.

  * Sintoma: `console.log` mostra `Promise { <pending> }` ou você tenta usar como objeto e dá erro.
* **Usar `await` fora de `async`:**

  * Sintoma: erro de sintaxe (em scripts normais). (Em alguns contextos modernos pode existir *top-level await*, mas não assuma isso como padrão em qualquer site/projeto.)
* **Misturar `then` e `await` sem necessidade:**

  * Não é “proibido”, mas costuma bagunçar o estilo e confundir o fluxo de erros.
  * Quando é aceitável? Em casos pontuais (ex.: você já tem uma Promise e quer mapear rapidamente com `then` em uma linha). Mas, em geral, escolha um estilo por função.

>**Dica:** se a função já é `async`, normalmente vale manter o raciocínio em `await` e usar `try/catch/finally`. Isso deixa o caminho do erro mais previsível.

---

## fetch (rede no navegador)

### fetch retorna Promise de Response

`fetch(url, options?)` é a API nativa do navegador para fazer requisições HTTP. O retorno é:

* uma **Promise** que resolve para um objeto **Response**.

Isso é crucial: você não recebe o corpo imediatamente; primeiro recebe a “caixa” (Response) com metadados (status, headers) e métodos para ler o corpo.

### Response: ok, status, headers

Um `Response` traz:

* `status`: código HTTP (ex.: 200, 404, 500).
* `statusText`: texto associado (nem sempre confiável para UX).
* `ok`: booleano que geralmente significa “status entre 200 e 299”.
* `headers`: coleção de cabeçalhos.

>**Conceito-chave:** `fetch` considera que recebeu uma resposta HTTP “comunicável” mesmo que seja 404/500. Isso **não é erro de rede**; é uma resposta válida do servidor — só que indicando falha do ponto de vista do negócio.

### Parsing: json() e text()

Para ler o corpo, você usa métodos que também são assíncronos:

* `response.json()` → Promise que resolve para um objeto JS (após parsing do JSON).
* `response.text()` → Promise que resolve para string.

>**Atenção:** `response.json()` **retorna Promise**. Esquecer o `await` aqui é um erro clássico.

### GET e POST com JSON

**GET básico (com checagem de ok e parsing):**

```js
async function buscarUsuarios() {
  const response = await fetch("https://api.exemplo.com/users");

  if (!response.ok) {
    // A resposta chegou, mas indica erro HTTP (ex.: 404, 500)
    throw new Error(`HTTP ${response.status} ao buscar usuários`);
  }

  const data = await response.json(); // <- parsing é assíncrono
  return data; // ex.: [{ id: 1, name: "Ana" }, ...]
}
```

**POST básico enviando JSON:**

```js
async function criarUsuario(novoUsuario) {
  const response = await fetch("https://api.exemplo.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoUsuario),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ao criar usuário`);
  }

  const criado = await response.json(); // ex.: { id: 123, name: "Ana" }
  return criado;
}
```

>**Dica:** `Content-Type: application/json` diz ao servidor como interpretar o corpo. E `JSON.stringify` transforma objeto JS em texto JSON.

### Diferença essencial: erro de rede vs erro HTTP

Essa distinção precisa ficar gravada:

* **Erro de rede** (offline, DNS, conexão recusada, interrupção) → `fetch(...)` **rejeita** a Promise → cai no `catch`.
* **Erro HTTP** (404/500 etc.) → `fetch(...)` **resolve** com `Response` → você precisa checar `response.ok` (ou `status`) e decidir lançar erro.

>**Conceito-chave:** “404” é o servidor falando com você. “Falha de rede” é você não conseguir falar com o servidor.

---
![alt text](/api/materiais-assets/6-frontend/7-javascript-assincrono/assets/image-2.png)
*Figura 3 — Fluxo do fetch: request → response → ok? → parse json → render*

---

## Consumir APIs (modelo mental de cliente)

### O que é uma API no contexto web

No contexto de front-end, uma **API** é um conjunto de endpoints (URLs) que aceitam requisições e devolvem respostas, normalmente em **JSON**.

Você, no navegador, está do lado “cliente”:

* envia uma **request** (método, headers, body),
* recebe uma **response** (status, headers, body).

Imagine que você precisa buscar uma lista de usuários para preencher uma tabela: a UI depende de um dado que está fora da página. Você dispara a request, mostra loading, recebe a resposta, valida, parseia, renderiza.

### Request/Response com JSON (reforço)

JSON é só texto com estrutura. O ciclo típico:

* Enviar JSON: `body: JSON.stringify(obj)`
* Receber JSON: `await response.json()`

E não confunda:

* **“Recebi uma resposta”** ≠ **“A operação deu certo”**
* Sucesso do protocolo (HTTP) não garante sucesso do negócio.

>**Dica:** APIs frequentemente retornam mensagens no corpo em caso de erro (ex.: `{ "message": "Email já cadastrado" }`). Mesmo assim, você ainda precisa checar `response.ok` antes de tentar assumir sucesso.

### Query string e path params (visão geral)

Dois jeitos comuns de passar parâmetros em APIs:

* **Query string:** depois de `?`, em pares `chave=valor`.

  * Ex.: `/users?page=2&limit=10`
  * Boa para filtros, paginação e buscas.

* **Path params:** parte do caminho da URL.

  * Ex.: `/users/123` (buscar usuário de id 123)
  * Boa para identificar um recurso específico.

No `fetch`, ambos viram apenas URLs diferentes.

### CORS: por que acontece e limites

CORS (**Cross-Origin Resource Sharing**) é uma política de segurança do navegador. Ela existe para impedir que uma página em uma origem (origin) faça requisições “livres” para outra origem sem autorização.

**Origin** é, grosso modo, o trio:

* protocolo (`https`),
* domínio,
* porta.

Exemplo: `https://meusite.com` é uma origin. `https://api.outrosite.com` é outra.

O que você percebe na prática:

* Seu `fetch` pode falhar com erro de CORS mesmo que a API “exista”.
* Isso não é “bug do seu JavaScript”: é o navegador bloqueando porque o servidor não autorizou aquela origin.

>**Atenção:** CORS é resolvido **no servidor** (configurando headers como `Access-Control-Allow-Origin`), ou via um intermediário controlado (proxy). Do lado do front-end, você não “conserta CORS” com uma linha de código segura.

### Boas práticas: organização mínima sem virar framework

Duas ideias simples melhoram muito a qualidade do código:

1. **Encapsular `fetch` em funções com nome de intenção**

* `getUsers()`, `getUserById(id)`, `createUser(data)` etc.
* Isso evita espalhar URLs e detalhes de parsing pela UI.

2. **Separar camada “serviço” da UI (conceito)**

* A camada de serviço fala HTTP/JSON.
* A UI lida com renderização, loading, estados visuais.

>**Conceito-chave:** quando você separa “buscar dados” de “mostrar dados”, o código fica mais testável, legível e fácil de evoluir.

---

## Tratamento de erro básico

### O que pode dar errado

Em rede e parsing, “dar errado” tem várias caras. O importante é reconhecer as categorias:

* **Rede**: offline, DNS, servidor inacessível, conexão interrompida.
* **CORS**: o navegador bloqueia por política de segurança.
* **HTTP 4xx/5xx**: servidor respondeu, mas indicou erro.

  * 4xx costuma ser erro de cliente (dados inválidos, não autorizado).
  * 5xx costuma ser erro do servidor (falha interna).
* **JSON inválido**: a resposta veio com corpo que não é JSON (ou veio truncada).
* **Timeout** (noção): a resposta demora demais e você decide abortar/encerrar a tentativa.

### Estratégia mínima de erros (sem paranoia, mas correta)

Um tratamento saudável costuma ter três camadas:

* **Tratamento técnico (código):** `try/catch`, checar `response.ok`, capturar falhas de parsing.
* **Mensagem para usuário:** clara, humana, sem detalhes internos (“Não foi possível carregar. Tente novamente.”).
* **Log para desenvolvimento:** `console.error(err)` para você diagnosticar.

>**Atenção:** “engolir” erro (capturar e não sinalizar nada) é uma das piores experiências: nem o usuário entende, nem o dev consegue investigar.

### finally e noções de UX: loading, empty, error

Mesmo sem “virar projeto”, é importante nomear três estados básicos de UI:

* **Loading state:** algo está em andamento. Mostre feedback (spinner, texto “carregando”, botão desabilitado).
* **Empty state:** carregou, mas veio vazio (lista sem itens).
* **Error state:** deu erro. Mostre mensagem amigável e, quando fizer sentido, opção de tentar novamente (conceito).

`finally` é o aliado natural para garantir que você finalize o loading independentemente de sucesso/erro.

---
![alt text](/api/materiais-assets/6-frontend/7-javascript-assincrono/assets/image-3.png)
*Figura 4 — Fluxo de tratamento de erro: try → catch → finally (com estados de UI)*
---

### Exemplo “padrão de mercado” (função async completa, curta e realista)

Abaixo está um exemplo que combina o essencial: iniciar loading, fazer request, validar status, parsear JSON, retornar dados, tratar erros e finalizar.

```js
// Estado mínimo de UI (conceitual, sem framework):
let loading = false;
let errorMessage = "";

// Funções “de UI” para ilustrar intenção
function setLoading(v) {
  loading = v;
  // Aqui você poderia, por exemplo, mostrar/ocultar um spinner no DOM.
}

function setError(msg) {
  errorMessage = msg;
  // Aqui você poderia renderizar msg em um <div role="alert">.
}

async function fetchJson(url, options) {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(url, options);

    // Erro HTTP não rejeita automaticamente: precisamos validar
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} (${response.statusText})`);
    }

    // Parsing pode falhar (JSON inválido)
    const data = await response.json();
    return data;
  } catch (err) {
    // Log para dev (detalhado)
    console.error("Falha ao buscar JSON:", err);

    // Mensagem amigável para usuário (genérica)
    setError("Não foi possível carregar os dados agora. Tente novamente.");

    // Repassa o erro se quem chamou quiser reagir (opcional, mas comum)
    throw err;
  } finally {
    // Sempre encerra loading
    setLoading(false);
  }
}

// Exemplo de uso narrativo:
// “buscar lista de usuários e depois renderizar”
async function carregarUsuarios() {
  try {
    const users = await fetchJson("https://api.exemplo.com/users");
    console.log("Usuários:", users);
    // renderizar(users) — omitido para manter o foco no async
  } catch {
    // UI já recebeu mensagem amigável via setError
  }
}
```

>**Dica:** repare no papel do `throw err` dentro do `catch`. Ele permite que a função que chamou decida o que fazer (ex.: mostrar uma tela específica), sem perder o log e a mensagem amigável.

---

## Boas práticas e limites do mundo real (visão geral útil)

### Paralelizar quando possível (evitar “cascata” desnecessária)

Um erro comum de performance é fazer requisições independentes em sequência por puro hábito.

Se A e B não dependem uma da outra, você pode disparar em paralelo e aguardar ambas:

```js
async function carregarTudo() {
  const [users, config] = await Promise.all([
    fetchJson("https://api.exemplo.com/users"),
    fetchJson("https://api.exemplo.com/config"),
  ]);

  console.log(users, config);
}
```

>**Conceito-chave:** “cascata” (uma chamada esperando a outra sem necessidade) aumenta latência total e deixa o usuário esperando mais.

### Cancelamento (teaser): AbortController

No navegador, você pode querer cancelar uma requisição quando:

* o usuário sai da tela,
* faz uma busca nova e a anterior ficou obsoleta,
* ou você quer implementar timeout por conta própria.

A ideia existe via **AbortController**, mas o ponto aqui é conceitual: **nem toda requisição deve necessariamente terminar**.

>**Dica:** cancelamento é também uma forma de evitar “respostas atrasadas” atualizando a UI no momento errado.

### Timeouts: noção importante

`fetch` não oferece um “timeout simples” embutido do tipo `fetch(url, { timeout: 5000 })`. Se você precisa de timeout, a abordagem usual é:

* criar um `AbortController`,
* programar um timer que chama `abort()`.

Aqui, a mensagem é: **timeout é uma política da aplicação**, não uma garantia automática do `fetch`.

### Segurança e privacidade

* **Não exponha tokens/segredos** em código público (qualquer pessoa pode ver no DevTools).
* Se algo é sensível (chave privada, segredos de servidor), **não pertence ao front-end**.
* Mesmo tokens “de usuário” (ex.: Bearer) precisam de cuidado: o navegador é ambiente sob controle do cliente.

>**Atenção:** “colocar segredo no front” não é segurança; é só esconder mal. Se o código roda no navegador, o usuário pode inspecionar.

### Rate limits e “erros de negócio”

APIs podem limitar chamadas (rate limit). Às vezes isso aparece como:

* HTTP 429,
* ou uma resposta com mensagem de limite excedido.

O tratamento não é “tentar infinitamente”: é lidar como uma condição do sistema (esperar, reduzir chamadas, melhorar cache, etc.). O essencial: **nem todo erro é bug; alguns são regra do serviço**.

---

## Erros comuns e confusões clássicas

* **“fetch rejeita em 404/500”**
  Não rejeita. Ele resolve com `Response`. Você precisa checar `response.ok` (ou `status`) e então lançar um erro.

* **Esquecer `await response.json()`**
  `json()` retorna Promise. Sem `await`, você fica com uma Promise no lugar dos dados.

* **Try/catch que “não pega”**
  `try/catch` só pega erros no mesmo fluxo síncrono, ou em `await`s dentro do `try`. Se você usa `then`, o `try/catch` externo não captura; você precisa de `.catch` no encadeamento ou usar `await` dentro de `try`.

* **Engolir o erro no catch e seguir como se nada tivesse acontecido**
  Isso cria UI inconsistente. Se você captura, trate (mensagem/log) e decida se vai repropagar (`throw`) ou se o fluxo realmente pode continuar.

* **Misturar `then` e `await` sem critério**
  Pode funcionar, mas costuma confundir o caminho do erro e a leitura do código. Em geral, mantenha um estilo por função.

* **Atualizar UI “do nada” sem loading**
  O usuário fica sem feedback e tende a clicar múltiplas vezes. Loading state não é luxo: é parte do contrato de interação.

* **Esquecer `finally` e deixar loading preso**
  Um erro no meio sem `finally` pode deixar spinner eterno.

* **Confundir CORS com “bug no meu fetch”**
  CORS é uma política do navegador. Se o servidor não autoriza sua origin, a requisição é bloqueada (e o front não tem como “forçar”).

* **Assumir que toda resposta é JSON**
  Em erro, servidores podem responder HTML/texto. Se você chamar `response.json()` em algo que não é JSON, o parsing falha e cai no `catch`.

---

## Glossário rápido

* **Event loop:** mecanismo que coordena execução de código, filas de tarefas e momentos de renderização no navegador.
* **Call stack:** pilha onde funções em execução ficam; se ela não esvazia, nada “depois” acontece.
* **Task queue (macrotask):** fila de tarefas “normais” como eventos e timers.
* **Microtask:** tarefas de alta prioridade, como continuações de Promises (`then/catch/finally`).
* **Promise:** objeto que representa um valor futuro (ou erro futuro).
* **Pending / Fulfilled / Rejected:** estados de uma Promise: pendente, resolvida com sucesso, ou rejeitada com falha.
* **then / catch / finally:** métodos para reagir a sucesso, erro e finalização de uma Promise; rodam como microtasks.
* **async:** marca função que sempre retorna Promise; `return` vira resolve, `throw` vira reject.
* **await:** espera uma Promise dentro de `async` sem bloquear o navegador; retoma depois via microtask.
* **fetch:** API nativa de rede do navegador; retorna Promise de `Response`.
* **Response:** objeto com status/headers e métodos para ler corpo (`json()`, `text()`).
* **JSON:** formato textual de dados estruturados muito comum em APIs web.
* **Parsing:** processo de transformar texto (ex.: JSON) em estruturas em memória (objetos JS).
* **CORS:** política de segurança do navegador que controla requisições entre origens diferentes.
* **Status code:** código HTTP (200, 404, 500…) que indica resultado do lado do servidor.

---

## Resumo final

Assincronicidade existe no JavaScript do navegador para que operações lentas (principalmente rede) não travem a página. O **event loop** coordena quando o código roda: a **call stack** executa o que está “agora”, enquanto tarefas futuras ficam em filas; continuações de **Promises** têm prioridade via **microtask queue**. **Promises** são o fundamento: um “recibo” de um valor futuro, com estados bem definidos e encadeamento via `then/catch/finally`. **async/await** não muda o mecanismo — apenas torna a leitura mais linear, suspendendo a função sem bloquear a UI. Com **fetch**, você faz HTTP no navegador, entendendo que `fetch` rejeita em erro de rede, mas **não** em erro HTTP (404/500): por isso a checagem `response.ok` é obrigatória no caminho feliz. No mundo real, tratar erro com clareza (para usuário e para dev), cuidar de loading/empty/error states, entender CORS, e evitar cascatas desnecessárias (paralelizando com `Promise.all`) são diferenças entre um código “funciona na minha máquina” e um front-end robusto.
