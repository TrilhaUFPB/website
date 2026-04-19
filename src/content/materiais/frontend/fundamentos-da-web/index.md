---
title: Fundamentos da Web
description: 
category: Frontend
order: 1
---

# Fundamentos da Web

## Objetivo da aula

Construir uma base sólida e precisa sobre o que é a Web, como ela funciona por baixo do capô e como uma página sai de um endereço digitado (URL) para virar pixels na tela. Ao final, você deve conseguir entender o processo completo de uma navegação simples, usando o vocabulário técnico correto.

## O que você será capaz de explicar ao final

- A diferença entre Internet e Web
- O que significam cliente, servidor, requisição e resposta
- O papel do HTTP e por que ele é considerado "stateless"
- O caminho completo: URL → DNS → conexão → HTTP → renderização
- A diferença entre front-end e back-end, onde entra banco de dados e o que é uma API
- Como organizar um projeto front-end básico com index.html e style.css 

## Sumário

1. [Visão geral da Web](#1-visão-geral-da-web)
   - [1.1 A ideia da Web](#11-a-ideia-da-web)
   - [1.2 Site, página, navegador e servidor](#12-site-página-navegador-e-servidor)
   - [1.3 Requisição e resposta: a conversa básica](#13-requisição-e-resposta-a-conversa-básica)
   - [1.4 Internet ≠ Web](#14-internet--web)
2. [Modelo Cliente–Servidor](#2-modelo-clienteservidor)
   - [2.1 O que roda no cliente vs. no servidor](#21-o-que-roda-no-cliente-vs-no-servidor)
   - [2.2 HTTP e o conceito de stateless](#22-http-e-o-conceito-de-stateless)
   - [2.3 Cookies e sessão (visão conceitual)](#23-cookies-e-sessão-visão-conceitual)
3. [O caminho de uma página: do URL até aparecer na tela](#3-o-caminho-de-uma-página-do-url-até-aparecer-na-tela)
   - [3.1 Anatomia de um URL](#31-anatomia-de-um-url)
   - [3.2 DNS: como o nome vira endereço](#32-dns-como-o-nome-vira-endereço)
   - [3.3 Conexão: TCP/UDP e onde entra TLS/HTTPS](#33-conexão-tcpudp-e-onde-entra-tlshttps)
   - [3.4 Ciclo Request/Response: headers, status e body](#34-ciclo-requestresponse-headers-status-e-body)
   - [3.5 Renderização no navegador: do HTML aos pixels](#35-renderização-no-navegador-do-html-aos-pixels)
4. [HTTP na prática](#4-http-na-prática)
   - [4.1 Métodos HTTP](#41-métodos-http)
   - [4.2 Status codes essenciais](#42-status-codes-essenciais)
   - [4.3 Headers comuns (e por que importam)](#43-headers-comuns-e-por-que-importam)
   - [4.4 Cache: por que existe e como ajuda](#44-cache-por-que-existe-e-como-ajuda)
   - [4.5 HTTP vs HTTPS](#45-http-vs-https)
5. [Front-end vs Back-end](#5-front-end-vs-back-end)
   - [5.1 Responsabilidades do front-end](#51-responsabilidades-do-front-end)
   - [5.2 Responsabilidades do back-end](#52-responsabilidades-do-back-end)
   - [5.3 Onde entra o banco de dados](#53-onde-entra-o-banco-de-dados)
   - [5.4 API: o que é e por que existe](#54-api-o-que-é-e-por-que-existe)
   - [5.5 Separação de responsabilidades: por que importa](#55-separação-de-responsabilidades-por-que-importa)
6. [Estrutura básica de um projeto front-end](#6-estrutura-básica-de-um-projeto-front-end)
   - [6.1 index.html e style.css: o papel de cada um](#61-indexhtml-e-stylecss-o-papel-de-cada-um)
   - [6.2 Organização de pastas (boas práticas)](#62-organização-de-pastas-boas-práticas)
   - [6.3 Como o navegador "junta" HTML e CSS](#63-como-o-navegador-junta-html-e-css)
   - [6.4 Exemplo mínimo: HTML + CSS](#64-exemplo-mínimo-html--css)
   - [6.5 O que ainda não teremos (e por quê)](#65-o-que-ainda-não-teremos-e-por-quê)
7. [Erros comuns e confusões clássicas](#7-erros-comuns-e-confusões-clássicas)
8. [Glossário rápido](#8-glossário-rápido)
9. [Resumo final](#9-resumo-final)

---

## 1. Visão geral da Web

### 1.1 A ideia da Web

A Web (World Wide Web) pode ser entendida como um sistema de documentos e recursos interligados, acessados por meio de endereços (URLs) e transferidos por um protocolo de comunicação (principalmente HTTP/HTTPS).

Um jeito bom de visualizar isso é pensar em uma biblioteca gigantesca:
- cada "livro" é um recurso (uma página HTML, uma imagem, um arquivo CSS, um PDF…),
- cada livro tem um "código de localização" (o URL),
- e existe um conjunto de regras para pedir e receber livros (o HTTP).

**Conceito-chave:** na Web, você não "entra" em um computador remoto; você pede recursos (documentos/arquivos/dados) e os recebe, seguindo regras bem definidas.

### 1.2 Site, página, navegador e servidor

Esses termos aparecem desde o primeiro dia, mas muita gente usa como sinônimos — e eles não são.

- **Página (web page):** um documento específico, normalmente representado por um HTML e seus recursos associados (CSS, imagens, fontes…).
- **Site:** um conjunto organizado de páginas e recursos, geralmente sob um mesmo domínio, com navegação e propósito coerentes.
- **Navegador (browser):** o programa do usuário que:
  - solicita recursos na rede
  - interpreta HTML/CSS
  - renderiza o resultado na tela
- **Servidor:** um programa (rodando em uma máquina) que responde às solicitações, entregando páginas/arquivos/dados.

**Dica:** quando você diz "o site está fora do ar", tecnicamente você está dizendo: "o servidor não está respondendo corretamente às requisições" — pode ser por queda, sobrecarga, falha de rede, erro interno, manutenção, etc.

### 1.3 Requisição e resposta: a conversa básica

A navegação na Web é uma sequência de "perguntas" e "respostas":

- **Requisição (request):** mensagem enviada pelo navegador pedindo um recurso.
- **Resposta (response):** mensagem devolvida pelo servidor com:
  - um status (por exemplo, "ok", "não encontrado", "redirecionado"),
  - metadados (headers),
  - e, muitas vezes, um conteúdo (body), como o HTML.

Uma analogia forte é a de restaurante:
- você (cliente) faz um pedido com detalhes ("quero um prato X, sem cebola")
- a cozinha (servidor) devolve um resultado (o prato) + uma "situação do pedido"
  - "pronto" (200)
  - "não temos esse prato" (404)
  - "vá para outra unidade" (301/302)
  - "houve um erro na cozinha" (500)

**Atenção:** "requisição" não é "abrir o site". Você pode fazer várias requisições dentro de uma mesma página: uma para o HTML, outra para o CSS, outras para imagens, fontes e assim por diante.

---

![Diagrama mostrando a troca de mensagens entre cliente e servidor: cliente enviando uma requisição (request) e servidor respondendo com uma resposta (response) contendo status, headers e body](image.png)

*Figura 1 — Cliente ↔ Servidor (Request/Response)*

---

### 1.4 Internet ≠ Web

- **A Internet** é a infraestrutura: uma rede global (na verdade, um conjunto de redes) conectando máquinas e permitindo troca de dados usando protocolos como IP.
- **A Web** é um serviço que usa a Internet. Ela é uma das "aplicações" construídas em cima da Internet, assim como:
  - e-mail (SMTP/IMAP),
  - chamadas de voz/vídeo (vários protocolos),
  - compartilhamento de arquivos, jogos online etc.

**Conceito-chave:** Internet é a "estrada"; Web é um tipo de "veículo e sistema de entrega" que trafega nessa estrada.

---

## 2. Modelo Cliente–Servidor

### 2.1 O que roda no cliente vs. no servidor

O modelo cliente–servidor organiza responsabilidades:

**Cliente (navegador):**
- faz requisições
- recebe respostas
- interpreta e renderiza HTML/CSS
- controla interação com o usuário (cliques, rolagem, formulários)
- mantém alguns dados locais (cache, cookies, armazenamento do navegador)

**Servidor:**
- recebe requisições
- decide o que entregar (arquivo, página, dado)
- aplica regras de negócio (quando há aplicação)
- autentica/autoriza acesso quando necessário
- conversa com banco de dados e outros serviços

**Atenção:** "servidor" pode significar máquina (hardware) ou programa (software). Em Web, na maioria das vezes estamos falando do software que responde às requisições, mesmo que ele rode em várias máquinas.

### 2.2 HTTP e o conceito de stateless

HTTP é, por design, um protocolo **stateless**. Isso significa que, do ponto de vista do protocolo, cada requisição é independente: o servidor não é obrigado a "lembrar" automaticamente do que aconteceu antes.

Pense em um balcão de atendimento onde:
- cada vez que você chega, você precisa explicar seu pedido do zero;
- o atendente pode até registrar algo em um sistema, mas isso já é uma camada adicional (não "vem de graça" do protocolo).

**Por que isso é útil?**
- **Escalabilidade:** é mais fácil distribuir requisições entre vários servidores se nenhuma delas depende de uma "memória interna" fixa de um servidor específico.
- **Simplicidade do protocolo:** mensagens claras, independentes e reutilizáveis.

**Conceito-chave:** "stateless" não significa "não existe login" ou "não existe carrinho". Significa que o HTTP puro não garante memória de contexto entre requisições. A "memória" é construída por outros mecanismos.

### 2.3 Cookies e sessão (visão conceitual)

Para criar experiências com continuidade (login, preferências, carrinho), usamos mecanismos de estado por cima do HTTP.

- **Cookie:** pequeno pedaço de informação armazenado no navegador e enviado em requisições futuras para o mesmo site (conforme regras). Em geral, é usado para carregar um identificador ou preferências.
- **Sessão:** um estado mantido no servidor associado a um identificador. Um caso clássico é:
  - servidor cria uma sessão e gera um ID de sessão
  - navegador guarda esse ID em um cookie
  - a cada requisição, o navegador envia o cookie
  - servidor usa o ID para "reconhecer" o usuário

**Atenção:** cookies não são "mágicos" nem "seguros por padrão". Como viajam na rede (idealmente por HTTPS) e ficam no cliente, existem regras e cuidados (escopo, expiração, flags de segurança). Aqui o importante é entender a ideia, não implementar.

---

## 3. O caminho de uma página: do URL até aparecer na tela

Vamos narrar uma situação real: você abre o navegador, digita um endereço e pressiona Enter. O que acontece?

**Dica:** a Web parece "instantânea" porque muita coisa é otimizada (cache, conexões reutilizadas, CDNs). Mas conceitualmente, o caminho é o mesmo.

---

![Pipeline visual do caminho completo de uma navegação web: URL → DNS (resolução de domínio) → Conexão TCP/TLS → HTTP Request → HTTP Response → Renderização no navegador](image-1.png)
*Figura 2 — "URL → DNS → conexão → HTTP → renderização" (visão pipeline)*

---

### 3.1 Anatomia de um URL

URL é o endereço de um recurso. Ele não é só "o domínio". Um URL típico:

```
https://www.exemplo.com/produtos/camisa?cor=azul&tamanho=m#avaliacoes
```

Quebrando em partes:
- **Protocolo (scheme):** `https`
  - Define como a comunicação será feita (HTTP com segurança via TLS, neste caso).
- **Domínio (host):** `www.exemplo.com`
  - Um nome amigável que será resolvido para um endereço IP via DNS.
- **Caminho (path):** `/produtos/camisa`
  - Indica qual recurso/rota dentro do site.
- **Query string:** `?cor=azul&tamanho=m`
  - Parâmetros enviados ao servidor para refinar a solicitação (filtros, paginação, busca).
- **Fragmento (fragment):** `#avaliacoes`
  - Usado no lado do navegador para apontar para uma parte da página. Em geral, não é enviado ao servidor na requisição HTTP.

**Conceito-chave:** domínio identifica "para onde ir"; caminho e query ajudam a definir "o que pedir"; fragmento ajuda o navegador a decidir "onde focar" no conteúdo carregado.

### 3.2 DNS: como o nome vira endereço

Computadores na rede se comunicam usando endereços IP (como 203.0.113.10 em IPv4 ou endereços IPv6). O problema: humanos preferem nomes.

O DNS (Domain Name System) funciona como uma "agenda telefônica":
- você pergunta: "qual o IP de www.exemplo.com?"
- um resolvedor DNS responde com o IP correspondente (ou informa que não existe)

**Visão geral do que ocorre:**
1. Seu computador pergunta para um resolvedor (geralmente do roteador ou do provedor).
2. Se ele não souber, ele consulta outros servidores DNS de forma hierárquica (raiz → TLD → autoritativo).
3. A resposta costuma ser cacheada por um tempo, para acelerar consultas futuras.

**Dica:** DNS também é um dos motivos de "às vezes funciona para mim e não para você": caches diferentes podem estar em estados diferentes (ou apontando para IPs diferentes por balanceamento).

### 3.3 Conexão: TCP/UDP e onde entra TLS/HTTPS

Depois de obter o IP, o navegador precisa estabelecer comunicação com o servidor.

- **TCP (Transmission Control Protocol):**
  - orientado a conexão
  - garante entrega ordenada e confiável (com retransmissões)
  - base tradicional do HTTP/1.1 e HTTP/2
- **UDP (User Datagram Protocol):**
  - não orientado a conexão (mais "leve")
  - não garante entrega/ordem por si só
  - é usado por tecnologias modernas como QUIC, que por sua vez suporta HTTP/3

Para uma base inicial, guarde:
- na Web tradicional, HTTP roda sobre TCP
- em evoluções mais recentes, HTTP pode rodar sobre mecanismos mais modernos (como QUIC/UDP), mantendo a ideia de request/response

**Onde entra o HTTPS?**

HTTPS é HTTP + TLS (Transport Layer Security). Antes de trafegar os dados HTTP, navegador e servidor fazem um processo para:
- negociar criptografia
- validar a identidade do servidor (certificado)
- garantir integridade e confidencialidade dos dados

**Atenção:** "HTTPS" não significa "o site é confiável em conteúdo". Significa que a conexão é protegida contra espionagem e adulteração no caminho, e que você está falando com o servidor que provou possuir o certificado adequado para aquele domínio.

### 3.4 Ciclo Request/Response: headers, status e body

Uma vez que a conexão está pronta, ocorre a troca HTTP.

**Estrutura conceitual de uma requisição**

Uma requisição inclui:
- método (GET, POST, etc.)
- caminho do recurso
- headers (metadados)
- às vezes um corpo (body), principalmente em POST/PUT/PATCH

Exemplo textual (simplificado) de request:
```
GET /produtos/camisa?cor=azul HTTP/1.1
Host: www.exemplo.com
Accept: text/html
User-Agent: (informações do navegador)
```

**Estrutura conceitual de uma resposta**

Uma resposta inclui:
- status code (200, 404, 500…)
- headers (metadados)
- opcionalmente um body (HTML, JSON, imagem…)

Exemplo textual (simplificado) de response:
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=60

<html> ... </html>
```

**Conceito-chave:** headers são "envelopes" de informação sobre o conteúdo e sobre como tratá-lo (tipo, cache, autenticação, idioma, compressão…). Eles não são detalhe: são parte essencial da Web moderna.

### 3.5 Renderização no navegador: do HTML aos pixels

Receber o HTML é só o começo. O navegador precisa transformar texto em uma página visual. Em alto nível:

1. **Parsing do HTML → DOM**
   - O navegador lê o HTML e constrói uma estrutura em árvore chamada DOM (Document Object Model).
   - É como um "mapa" dos elementos: títulos, parágrafos, imagens, links etc.

2. **Carregamento e parsing do CSS → CSSOM**
   - O CSS é baixado (se estiver externo) e interpretado em uma estrutura que representa regras e estilos: o CSSOM.

3. **Combinação DOM + CSSOM → Render Tree**
   - O navegador decide quais nós serão renderizados e com quais estilos.

4. **Layout (ou reflow)**
   - Cálculo de geometria: onde cada elemento fica, tamanho, posicionamento, quebras de linha.

5. **Paint (pintura)**
   - O navegador desenha pixels: cores, bordas, texto, imagens, sombras.

**Dica:** você pode pensar em "DOM = o que existe" e "CSSOM = como deve parecer". A render tree é "o que existe do jeito que deve aparecer".

**Atenção:** o navegador pode precisar buscar recursos adicionais durante esse processo (CSS, imagens, fontes). Uma página é normalmente o resultado de múltiplas requisições.

---

## 4. HTTP na prática

### 4.1 Métodos HTTP

Métodos descrevem a intenção da requisição.

- **GET:** pedir um recurso (ler/consultar).
  - Ex.: buscar a página de um produto.
- **POST:** enviar dados para processamento (criar/acionar algo).
  - Ex.: enviar um formulário de cadastro.
- **PUT** (visão geral): substituir/atualizar um recurso por completo.
- **PATCH** (visão geral): atualizar parcialmente um recurso.
- **DELETE** (visão geral): remover um recurso.

**Conceito-chave:** métodos ajudam a construir APIs e sistemas previsíveis. Mesmo em sites "com páginas", por trás pode existir um conjunto de recursos que são criados, lidos, atualizados e removidos.

### 4.2 Status codes essenciais

Status codes são a forma padrão do servidor dizer "o que aconteceu".

- **200 OK:** deu certo, aqui está o conteúdo.
- **301 Moved Permanently:** o recurso mudou de endereço permanentemente.
- **302 Found (redirecionamento):** redirecionamento temporário (comum em fluxos específicos).
- **400 Bad Request:** requisição malformada ou inválida.
- **401 Unauthorized:** falta autenticação (você não provou quem é).
- **403 Forbidden:** você até pode estar autenticado, mas não tem permissão.
- **404 Not Found:** recurso não existe (ou não foi encontrado).
- **500 Internal Server Error:** erro inesperado no servidor.

---

![Mini fluxograma de status codes HTTP agrupados por categoria: 2xx (sucesso em verde), 3xx (redirecionamento em azul), 4xx (erro do cliente em laranja) e 5xx (erro do servidor em vermelho)](image-2.png)
*Figura 3 — Mini fluxograma de status codes (2xx/3xx/4xx/5xx)*

---

### 4.3 Headers comuns (e por que importam)

Alguns headers aparecem tanto que viram parte do vocabulário:

- **Content-Type:** diz o tipo do conteúdo.
  - Ex.: `text/html`, `text/css`, `application/json`, `image/png`.
  - O navegador usa isso para saber como interpretar o body.
- **Accept:** o cliente diz que tipos aceita.
  - Ex.: "eu aceito HTML" ou "eu aceito JSON".
- **Cache-Control:** instruções de cache.
  - Ex.: `max-age=3600` para permitir guardar por 1 hora.
- **Authorization:** credenciais para autenticação/autorização.
  - Ex.: tokens (conceitualmente). Importante para APIs e áreas protegidas.

**Dica:** se o conteúdo "parece certo mas o navegador não renderiza", uma causa clássica é Content-Type errado (por exemplo, servidor enviando CSS como texto genérico).

### 4.4 Cache: por que existe e como ajuda

Cache existe para evitar pedir a mesma coisa toda hora. Se você entra em um site várias vezes:
- o logo, fontes, CSS e imagens quase sempre são os mesmos
- baixar tudo de novo seria desperdício

Com cache:
- páginas abrem mais rápido
- economiza dados e processamento
- reduz carga no servidor

Cache pode existir em vários pontos:
- no navegador
- em proxies e redes (CDNs)
- até no sistema operacional

**Atenção:** cache também é fonte de confusão em desenvolvimento: você muda um arquivo e "parece que não mudou". Muitas vezes o navegador está usando uma versão cacheada.

### 4.5 HTTP vs HTTPS

**HTTP** é comunicação em texto claro (conceitualmente). Alguém no caminho pode:
- ler o conteúdo
- modificar o conteúdo
- se passar por intermediário

**HTTPS** adiciona TLS para:
- confidencialidade (criptografia)
- integridade (detectar alterações)
- autenticação do servidor (certificado)

**Consequência prática:**
- em sites modernos, HTTPS é padrão — especialmente quando há login, dados pessoais, pagamentos, ou qualquer dado sensível.

---

## 5. Front-end vs Back-end

### 5.1 Responsabilidades do front-end

Front-end é tudo que acontece do lado do usuário, no navegador, com foco em:
- estrutura e conteúdo (HTML)
- apresentação e layout (CSS)
- acessibilidade e experiência de leitura/navegação
- organização visual e consistência

Mesmo sem interatividade avançada, front-end já envolve decisões importantes:
- hierarquia de informação
- responsividade (telas diferentes)
- semântica (usar a tag certa para o significado certo)

### 5.2 Responsabilidades do back-end

Back-end é o que acontece no servidor, com foco em:
- regras de negócio (o que pode/não pode)
- autenticação e autorização
- validações de dados
- integração com banco de dados e serviços externos
- entrega de páginas/arquivos/dados conforme requisições

**Conceito-chave:** front-end e back-end conversam. O front-end pede; o back-end decide e responde.

### 5.3 Onde entra o banco de dados

Banco de dados (BD) é um componente usado para persistir informação:
- usuários, produtos, pedidos, posts, comentários…
- registros que precisam sobreviver ao "desligar e ligar"

Ele quase nunca é acessado diretamente pelo navegador em aplicações tradicionais. O caminho típico é:

**navegador → back-end → banco de dados → back-end → navegador**

Isso protege regras e dados e facilita controle de acesso.

**Atenção:** "o back-end" não é "o banco de dados". O back-end pode usar banco de dados, mas também pode usar cache, filas, serviços externos e lógica própria.

### 5.4 API: o que é e por que existe

API (Application Programming Interface) é, na prática, um contrato de comunicação. Em Web, geralmente significa:
- um conjunto de URLs/rotas que aceitam requisições (GET/POST/…)
- devolvem dados em um formato (muito comum: JSON)
- com regras claras (o que enviar, o que receber, quais erros)

**Por que isso existe?**
- separa interface (front-end) de lógica (back-end)
- permite múltiplos clientes: navegador, app mobile, integração com parceiros
- torna o sistema mais modular e evolutivo

### 5.5 Separação de responsabilidades: por que importa

Separar front-end e back-end não é "moda"; é engenharia.

**Benefícios:**
- **manutenção:** mudar visual sem mexer em regras críticas
- **escala de equipe:** pessoas diferentes podem trabalhar em camadas diferentes
- **segurança:** regras sensíveis ficam no servidor
- **evolução:** trocar tecnologia de UI sem reescrever tudo

**Dica:** quando um sistema cresce, a clareza de fronteiras (quem faz o quê) vira um dos principais fatores de qualidade.

---

## 6. Estrutura básica de um projeto front-end

Nesta etapa, vamos montar o "esqueleto" clássico de um projeto estático: HTML + CSS. Isso já é suficiente para criar páginas bem estruturadas e bonitas — só não teremos a camada de interatividade programável ainda.

### 6.1 index.html e style.css: o papel de cada um

**index.html**
- É o ponto de entrada mais comum. Contém:
  - a estrutura do documento
  - o conteúdo (textos, links, imagens)
  - a ligação para o CSS externo

**style.css**
- Define a aparência:
  - cores, fontes, tamanhos
  - espaçamentos e layout
  - estilos de elementos e classes

**Conceito-chave:** HTML descreve o que é; CSS descreve como parece.

---

![Diagrama mostrando o navegador carregando um arquivo HTML que contém uma tag link referenciando um arquivo CSS externo, ilustrando a dependência e relação entre os dois arquivos](image-3.png)
*Figura 4 — HTML + CSS sendo carregados (dependência básica)*

---

### 6.2 Organização de pastas (boas práticas)

Para projetos pequenos, o importante é não virar bagunça. Uma organização típica (sem exageros) é:

```
meu-site/
├─ index.html
├─ css/
│  └─ style.css
└─ assets/
   └─ images/
```

- **index.html na raiz:** fácil de achar e padrão para páginas iniciais.
- **css/:** separa estilos do restante.
- **assets/:** "recursos" estáticos (imagens, ícones, fontes).

**Dica:** organização é parte da engenharia. Um projeto com nomes claros economiza tempo e evita erros bobos (como linkar arquivo errado).

### 6.3 Como o navegador "junta" HTML e CSS

Quando o navegador recebe o HTML, ele:
1. faz parsing e constrói o DOM
2. encontra referências externas (como CSS)
3. baixa o CSS e constrói o CSSOM
4. aplica regras do CSSOM ao DOM (seletores)
5. renderiza o resultado (layout e paint)

Isso explica por que:
- se o CSS não carregar, o conteúdo aparece "cru" (sem estilo)
- se o caminho do CSS estiver errado, nada "quebra" no HTML — apenas fica sem aparência

**Atenção:** caminhos de arquivos importam. `href="css/style.css"` significa "dentro da pasta css". Se você mudar pastas sem ajustar caminhos, o navegador não "adivinha".

### 6.4 Exemplo mínimo: HTML + CSS

Exemplo propositalmente curto, apenas para mostrar a ligação.

**index.html**
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minha Primeira Página</title>

    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <header>
      <h1>Fundamentos da Web</h1>
      <p>Uma página simples com HTML + CSS.</p>
    </header>

    <main>
      <h2>O que é a Web?</h2>
      <p>A Web é um sistema de recursos acessados por URLs e transferidos por HTTP.</p>
    </main>
  </body>
</html>
```

**css/style.css**
```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  margin: 24px;
}

header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  margin-bottom: 16px;
}

h1 {
  margin: 0 0 8px 0;
}
```

Perceba a ideia central:
- o HTML declara estrutura e conteúdo
- o `<link rel="stylesheet" ...>` conecta o CSS
- o CSS altera a aparência sem mudar o significado do conteúdo

### 6.5 O que ainda não teremos (e por quê)

Neste capítulo, não vamos ensinar nem usar JavaScript. Isso é intencional:
- primeiro, você consolida a fundação: rede + HTTP + HTML/CSS
- depois, adicionamos interatividade programável (camada que transforma páginas em aplicações ricas)

**Conceito-chave:** interatividade moderna (validações dinâmicas, componentes, atualizações sem recarregar) depende de JavaScript — mas só faz sentido aprender bem quando a base de Web e HTTP está firme.

---

## 7. Erros comuns e confusões clássicas

- **"HTML é o site pronto."**
  - HTML é a estrutura do documento. "Site" envolve conjunto de páginas, recursos, organização, e muitas vezes servidores e dados.

- **"Back-end é o banco de dados."**
  - Banco é um componente. Back-end é a aplicação no servidor que implementa regras e conversa com bancos e serviços.

- **"Domínio e URL são a mesma coisa."**
  - Domínio é parte do URL (o host). URL inclui protocolo, caminho, query e mais.

- **"HTTP é a Internet."**
  - HTTP é um protocolo usado na Web. A Internet é a rede subjacente. Web é um serviço sobre ela.

- **"HTTPS deixa o site 'seguro' em qualquer sentido."**
  - HTTPS protege a conexão (confidencialidade/integridade/autenticação do servidor). Não garante que o conteúdo seja verdadeiro, nem que o sistema não tenha falhas.

- **"Se aparece no navegador, veio do servidor como 'uma página pronta'."**
  - O navegador monta a página: baixa HTML, CSS, imagens e renderiza. O servidor entrega recursos; a composição visual final é do navegador.

- **"Se algo deu errado, sempre é culpa do front-end."**
  - Erros podem ser de rede, DNS, certificado, servidor, permissões, cache, caminho de arquivo, etc. Diagnóstico bom começa por entender o caminho inteiro.

---

## 8. Glossário rápido

- **Web:** sistema de recursos interligados acessados por URLs (principalmente via HTTP/HTTPS).
- **Internet:** infraestrutura de redes conectadas que permite troca de dados (IP).
- **Cliente:** quem faz a requisição (geralmente o navegador).
- **Servidor:** quem responde com recursos/dados.
- **Requisição (request):** mensagem pedindo um recurso.
- **Resposta (response):** mensagem com status, headers e (às vezes) body.
- **URL:** endereço completo de um recurso (protocolo + domínio + caminho + etc.).
- **Domínio:** nome legível que o DNS resolve para um IP.
- **DNS:** sistema que mapeia nomes de domínio para endereços IP.
- **IP:** endereço numérico de um dispositivo na rede.
- **TCP/UDP:** protocolos de transporte; TCP é confiável/orientado a conexão; UDP é leve e base para QUIC.
- **TLS:** camada de segurança que habilita HTTPS (criptografia e autenticação).
- **HTTP/HTTPS:** protocolo da Web; HTTPS é HTTP protegido por TLS.
- **Header:** metadado em request/response (tipo de conteúdo, cache, autenticação…).
- **Body:** conteúdo principal da mensagem (HTML, JSON, imagem…).
- **Status code:** código numérico que indica o resultado (200, 404, 500…).
- **DOM:** árvore do documento construída a partir do HTML.
- **CSSOM:** estrutura construída a partir do CSS.
- **Renderização:** processo de transformar DOM+CSSOM em pixels (layout e paint).
- **Cache:** armazenamento temporário para acelerar carregamentos futuros.
- **API:** contrato de comunicação entre sistemas (rotas, dados, regras).

---

## 9. Resumo final

A Web é uma camada construída sobre a Internet para solicitar e entregar recursos por meio de URLs, usando principalmente HTTP/HTTPS. O navegador (cliente) faz requisições; o servidor responde com status, headers e conteúdo. Antes de qualquer HTML aparecer, há um caminho técnico bem definido: URL é analisado, DNS resolve domínio em IP, uma conexão é estabelecida (com TLS no caso de HTTPS), o ciclo request/response acontece, e o navegador interpreta HTML e CSS para renderizar a página. Com essa base, você está pronto para separar com clareza o que é front-end e back-end e entender por que um simples index.html ligado a um style.css já é um "microcosmo" do funcionamento real da Web — a camada de interatividade programável virá depois, em momento apropriado.

