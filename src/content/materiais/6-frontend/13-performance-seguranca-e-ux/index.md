---
title: 13. Performance, Segurança e UX
description: 
category: Frontend
order: 13
---

# 13. Performance, Segurança e UX (Web)

## Objetivo da aula

Entender **como performance, segurança e UX se combinam** para formar a “qualidade percebida” de um produto web — e aprender um **checklist prático** para construir interfaces rápidas, confiáveis, encontráveis (SEO) e seguras no dia a dia.

## Pré-requisitos

* HTML e semântica (tags, estrutura de documento)
* CSS básico (layout e responsividade)
* JavaScript básico (DOM, eventos, fetch)
* Noções de requisições HTTP (request/response) e APIs

## O que você será capaz de explicar ao final

* Por que o usuário percebe performance, segurança e UX como **uma coisa só**: qualidade.
* O que torna um site “rápido” na prática (rede, peso, renderização e percepção).
* Quais gargalos mais comuns derrubam performance no front-end e como evitá-los.
* O mínimo de SEO bem feito para páginas serem entendidas por buscadores e por pessoas.
* O que é XSS em nível conceitual e **como prevenir de forma defensiva**.
* Como desenhar estados de feedback (loading/erro/sucesso) para melhorar UX e performance percebida.
* Um checklist final aplicável em qualquer stack.

---

## Sumário

* [1. Por que Performance + Segurança + UX andam juntos](#1-por-que-performance--segurança--ux-andam-juntos)
* [2. Performance (fundamentos práticos)](#2-performance-fundamentos-práticos)

  * [2.1 O que significa “rápido” na Web](#21-o-que-significa-rápido-na-web)
  * [2.2 Principais gargalos do front-end](#22-principais-gargalos-do-front-end)
  * [2.3 Boas práticas de performance (sem depender de framework)](#23-boas-práticas-de-performance-sem-depender-de-framework)
  * [2.4 Medir antes de “otimizar no escuro”](#24-medir-antes-de-otimizar-no-escuro)
* [3. SEO essencial (o mínimo bem feito)](#3-seo-essencial-o-mínimo-bem-feito)
* [4. Segurança: noções de XSS (defensivo e conceitual)](#4-segurança-noções-de-xss-defensivo-e-conceitual)
* [5. Feedback visual: loading, erro, sucesso (UX aplicada)](#5-feedback-visual-loading-erro-sucesso-ux-aplicada)
* [6. UX (fundamentos que todo dev precisa)](#6-ux-fundamentos-que-todo-dev-precisa)
* [Glossário rápido](#glossário-rápido)
* [Resumo final](#resumo-final)
* [Referências](#referências)

---

## Por que Performance + Segurança + UX andam juntos

Um usuário não separa mentalmente “front-end”, “rede”, “servidor”, “segurança” e “design”. Ele percebe algo mais simples: **qualidade**.
Se a página demora, trava, “pula” elementos, falha silenciosamente, ou parece suspeita, o diagnóstico do usuário é o mesmo: “o site é ruim”.

Pense no caminho real: alguém clica num link no celular, em 4G instável, com 15 abas abertas. O que acontece?

* Se o site **demora para mostrar algo útil**, a pessoa volta.
* Se o site **mostra algo, mas quebra** ao interagir, a confiança cai.
* Se aparece um erro genérico (“deu errado”) sem orientação, a pessoa desiste.
* Se uma falha de segurança faz o site “agir estranho”, a pessoa não volta mais — e ainda alerta outros.

### O mesmo usuário sente tudo como “qualidade”

Performance influencia UX (tempo de resposta percebido), e UX influencia performance percebida (feedback que reduz ansiedade). Segurança, por sua vez, protege o usuário e protege o produto: incidentes de segurança viram perda de confiança, reputação, e, frequentemente, trabalho extra de engenharia.

### Trade-offs reais

No mundo real, você vive equilibrando escolhas:

* **Velocidade vs. complexidade**: adicionar uma dependência “para facilitar” pode aumentar bundle e custo de manutenção.
* **Segurança vs. flexibilidade**: permitir HTML “customizável” por usuários pode ser útil, mas eleva muito o risco de XSS.
* **SEO vs. arquitetura**: algumas escolhas de renderização podem facilitar o app, mas dificultar indexação.

>**Conceito-chave**: **otimizar o que importa para o usuário (percepção)**
> Nem toda otimização é valiosa. A prioridade é reduzir o tempo até “algo útil aparecer”, manter interações responsivas e a interface estável — e fazer isso sem abrir brechas de segurança.

---

## Performance (fundamentos práticos)

![alt text](/api/materiais-assets/6-frontend/13-performance-seguranca-e-ux/assets/image.png)
### Figura 1 — Performance pipeline (visão geral)

---

### O que significa “rápido” na Web

#### Latência e rede (TTFB como conceito)

Mesmo com “internet boa”, a web é uma conversa: você pede, o servidor responde, e isso leva tempo.
**TTFB (Time To First Byte)** é o conceito de quanto tempo demora desde o request até chegar o **primeiro byte** da resposta. Não é “a página carregou”, mas é um sinal de **latência + processamento do servidor + caminho de rede**.

Um site pode ser lento por:

* distância física (roteamento, rede móvel),
* servidor ocupado,
* resposta pesada,
* muitos redirecionamentos.

#### Peso de recursos (JS/CSS/imagens)

Depois do HTML, a página geralmente busca **CSS, JS, fontes e imagens**. O tempo total depende de:

* **quantos arquivos** (muitas requisições),
* **tamanho** (megabytes importam),
* **prioridade** (o que é necessário para mostrar algo útil primeiro).

Em muitos sites, o maior peso não é “código”, mas **imagens** (hero enorme, banners, carrosséis) — e isso vira gargalo real.

#### Renderização e bloqueios

Dois pontos confundem iniciantes:

* **CSS pode bloquear renderização inicial**: o navegador precisa do CSS para desenhar corretamente; sem ele, a página pode piscar ou ficar “sem estilo”.
* **JS pode bloquear a main thread**: parsing e execução de JS competem com renderização e interação. Se o JS faz trabalho pesado, o usuário percebe “travadas”.

>**Dica**: quando alguém diz “o site está travando”, muitas vezes o problema não é a rede — é **JS ocupando a main thread**.

#### Performance percebida: “aparecer algo útil” vs “estar 100% pronto”

Usuários toleram carregamento se enxergarem progresso. Em geral:

* “**apareceu o conteúdo principal**” tem mais valor do que “carregou tudo, inclusive o que ninguém usa”.
* “**posso ler e clicar sem travar**” vale mais do que “carregou um gráfico perfeito 2s depois”.

É por isso que métricas focadas em experiência (como as do programa Web Vitals) existem: elas tentam medir **o que o usuário sente**, não só bytes transferidos. ([web.dev][1])

---

### Principais gargalos do front-end

1. **Imagens não otimizadas (o maior vilão em muitos sites)**
   Problemas típicos:

* imagem de 4000px sendo exibida em 400px,
* formato pesado quando poderia ser mais eficiente,
* falta de carregamento progressivo/lazy.

2. **Bundle JS grande**
   Sintoma: primeira carga “demora para ficar clicável”.
   Causas comuns:

* dependências grandes para resolver algo simples,
* carregar páginas inteiras mesmo sem o usuário navegar,
* código “sempre ativo” (listeners, analytics, libs) logo no início.

3. **Requisições demais**
   Muitas chamadas pequenas (ou sequenciais) criam latência acumulada: cada request tem overhead. Isso aparece muito quando a UI faz “chatty APIs” (várias chamadas pequenas para montar uma tela).

4. **Renderizações/reflows desnecessários**
   Quando o DOM muda muito, o navegador recalcula layout e repinta. Atualizações em cascata, medições de layout repetidas e animações mal-feitas podem “comer frames” e dar sensação de travamento.

5. **Terceiros (scripts externos)**
   Pixels, trackers, widgets, chat, mapas, A/B testing — muitos terceiros competem por rede e CPU. O custo é real:

* aumentam requisições,
* executam JS na main thread,
* podem adicionar falhas (inclusive de disponibilidade).

>**Atenção**: “é só um scriptzinho” é uma frase perigosa. Terceiros são uma das maiores fontes de regressão silenciosa.

---

### Boas práticas de performance (sem depender de framework)

A ideia aqui é **mentalidade + hábitos**. Framework ajuda, mas não substitui.

#### Imagens

* **Formatos modernos (conceito):** usar formatos mais eficientes reduz bytes transferidos sem perder qualidade perceptível (quando suportado).
* **Tamanhos corretos e responsive images (conceito):** entregue uma imagem proporcional ao tamanho em que ela será exibida, e permita versões diferentes por viewport (mobile vs desktop).
* **Lazy loading (noção):** imagens fora da “dobra” (abaixo do que aparece primeiro) podem ser carregadas sob demanda.

Exemplo mínimo (apenas para fixar o conceito de lazy em imagens):

```html
<img src="foto.jpg" alt="descrição clara da foto" loading="lazy" width="800" height="600">
```

>**Dica**: definir `width` e `height` ajuda a reservar espaço e reduzir “pulos” visuais (estabilidade).

#### CSS

* **Evitar CSS global enorme:** quanto maior e mais genérico, maior a chance de conflitos, e maior o custo de manutenção.
* **Critical CSS (noção):** priorizar o CSS necessário para a “primeira dobra” ajuda a mostrar algo útil mais cedo, deixando o resto para depois.

O objetivo não é “micro-otimizar”, e sim reduzir o tempo até a interface ser legível.

#### JavaScript

* **Carregar o necessário:** separar o que é essencial no início do que pode vir depois (por rota, por componente, por interação).
* **Evitar trabalho pesado no main thread:** parsing, loops grandes, transformações complexas e bibliotecas pesadas podem travar interação.
* **Debouncing/throttling (noção):** eventos como `scroll`, `resize` e `input` podem disparar rápido demais; controlar frequência reduz carga.

>**Conceito-chave**: main thread é um “caixa único”
> Se você coloca muita coisa na fila (JS pesado), a interface “para de responder” mesmo com rede ótima.

#### Rede/cache

* **Cache-Control (noção):** cache bem configurado evita downloads repetidos (especialmente para assets versionados como `app.9f3a2.js`).
* **Evitar “chatty APIs”:** prefira endpoints que entregam os dados necessários de forma coerente (menos ida e volta), e evite cascatas sequenciais quando possível.

---

### Medir antes de “otimizar no escuro”

Ferramentas ajudam a responder: “onde está o tempo?” e “qual mudança realmente melhorou?”.

#### Ferramentas e abordagens (conceito)

* **DevTools Performance:** ajuda a ver trabalho de CPU, frames, long tasks, renderizações, e gargalos de main thread.
* **Lighthouse:** roda auditorias e gera relatório com indicadores e recomendações; pode ser usado no DevTools, CLI ou CI. ([Chrome for Developers][2])
* **Logs e métricas reais (noção):** performance de laboratório é útil, mas você quer também sinais do mundo real (dispositivos fracos, redes ruins, jornadas reais).

>**Atenção**: otimização sem medição pode piorar
> Você pode “melhorar um número” e piorar a experiência real, ou mover o gargalo para outro lugar. Use medição antes/depois e mude uma coisa por vez.

---

## SEO essencial (o mínimo bem feito)

SEO não é “hack”. Em essência, é:

1. tornar a página **compreensível para crawlers** (estrutura e metadados), e
2. tornar a página **útil e clara para pessoas** (conteúdo e navegação).

### Elementos essenciais

#### `title` e `meta description` (únicos por página)

* **Title**: precisa ser específico e descrever o conteúdo da página (não “Home” em todo lugar).
* **Meta description**: ajuda a formar o snippet; boas práticas incluem ser relevante e **única por página**. ([Google for Developers][3])

Exemplo mínimo:

```html
<head>
  <title>guia de performance web: como melhorar tempo de carregamento</title>
  <meta name="description" content="entenda latência, peso de recursos e boas práticas para sites rápidos e estáveis.">
</head>
```

#### Headings semânticos (H1/H2)

* **H1** deve representar o tema principal da página.
* **H2/H3** organizam seções e facilitam leitura, acessibilidade e entendimento por mecanismos.

#### Links com texto descritivo

“clique aqui” é ruim porque não descreve destino. Prefira:

* “ver documentação de entrega”
* “política de privacidade”
* “detalhes do plano”

#### Imagens com `alt`

O `alt` não é “encheção”; ele:

* melhora acessibilidade (leitor de tela),
* ajuda contexto quando a imagem não carrega,
* pode contribuir para entendimento do conteúdo.

#### Canonical (noção)

Quando existem múltiplas URLs com conteúdo muito similar, `rel="canonical"` sugere qual versão é a principal, reduzindo confusão e duplicação.

#### Sitemap/robots (noção)

* **Sitemap**: lista URLs importantes para descoberta.
* **robots.txt**: orienta rastreamento (não é “segurança”).

### SEO e renderização (visão geral)

Crawlers evoluíram, mas o princípio continua sólido: **HTML já renderizado com conteúdo relevante** facilita indexação.

* **CSR (Client-Side Rendering)**: a página “nasce vazia” e o JS preenche depois. Se isso falha, atrasa ou é bloqueado, o conteúdo pode ficar pouco indexável.
* **SSR/SSG**: HTML já chega com conteúdo, e o JS “hidrata” depois; melhora previsibilidade para bots e para usuários em rede fraca.

>**Dica**: pense em “funciona minimamente sem JS?”
> Nem sempre precisa ser perfeito, mas se sem JS vira uma página completamente vazia, SEO e acessibilidade sofrem.

### Dados estruturados (apenas noção)

São marcações que ajudam buscadores a entender entidades (produto, artigo, evento). Não é obrigatório para o básico, mas pode melhorar apresentação em resultados.

### Erros comuns

* páginas sem H1,
* title genérico e repetido,
* conteúdo duplicado sem canonical,
* SPA com conteúdo pouco indexável,
* imagens sem `alt`,
* links sem texto descritivo.

![alt text](/api/materiais-assets/6-frontend/13-performance-seguranca-e-ux/assets/image-3.png)
### Figura 4 — SEO essencial (do conteúdo ao crawler)

---

## Segurança: noções de XSS (defensivo e conceitual)

### O que é XSS (sem ensinar ataque)

XSS (Cross-Site Scripting) é uma classe de problema em que **conteúdo não confiável** acaba sendo interpretado como **código** no navegador. A forma mental correta é:

> “Entrada do usuário (ou de terceiros) → vira HTML/JS → o navegador executa.”

O ponto crítico é a **mistura indevida de dados com marcação/código**.

### Onde o risco aparece

* **`innerHTML`**: injeta strings como HTML. Se essa string contém conteúdo não confiável, você pode criar execução inesperada.
* **Renderizar conteúdo vindo de API sem sanitização**: “mas veio do meu servidor” não garante que é confiável (pode ter sido alimentado por usuários, parceiros, integrações).
* **Interpolação em atributos perigosos (noção)**: certos atributos e contextos exigem cuidado extra (URLs, estilos inline, handlers, etc.). O problema é menos “o atributo em si” e mais **o contexto de interpretação**.

### Princípios de prevenção (o que um dev front precisa saber)

1. **Escape por padrão**
   Frameworks modernos costumam escapar strings automaticamente quando você renderiza texto. Isso é bom e deve ser preservado.

2. **Evitar `innerHTML`**
   Se você quer colocar texto, prefira APIs que não interpretam HTML.

Exemplo conceitual (mínimo):

```js
// melhor: trata como texto
element.textContent = textoVindoDoUsuario;

// risco: interpreta como HTML
element.innerHTML = textoVindoDoUsuario;
```

3. **Sanitização quando precisar renderizar HTML**
   Às vezes você *precisa* renderizar HTML (por exemplo, conteúdo editorial). Nesse caso, a ideia é: **limpar/remover o que não é permitido** antes de renderizar.
   Aqui o ponto é conceitual: definir um conjunto de tags/atributos permitidos e remover o resto.

4. **CSP como camada extra (noção)**
   Content Security Policy é um conjunto de regras que o servidor envia ao navegador para **restringir o que pode ser carregado/executado** (origens de scripts, estilos, etc.). Ela funciona como “cinto de segurança”: não substitui boas práticas, mas reduz impacto de falhas, especialmente XSS. ([MDN Web Docs][4])

>**Atenção**: validação no front não é segurança completa
> O front-end melhora UX e reduz lixo, mas segurança real precisa de validação e controles no back-end também.

### Checklist “coisas para não fazer”

* nunca inserir HTML de usuário diretamente na página;
* cuidado com renderizadores de Markdown/HTML: trate como entrada potencialmente não confiável;
* cuidado com dados de terceiros (integrações, widgets, feeds): “terceiro” não é “confiável”.

![alt text](/api/materiais-assets/6-frontend/13-performance-seguranca-e-ux/assets/image-2.png) 

### Figura 3 — XSS defensivo (cadeia de confiança)

---

## Feedback visual: loading, erro, sucesso (UX aplicada)

Feedback visual é parte de performance percebida: ele responde à pergunta emocional do usuário — **“o sistema me ouviu?”**.

### Por que feedback é parte de performance percebida

Quando você clica e nada muda, o cérebro interpreta como atraso ou falha. A pessoa clica de novo, duplica ações, cria inconsistência (“enviei duas vezes?”) e fica frustrada.

### Loading states

#### Spinner vs skeleton: quando usar cada

* **Spinner**: bom para operações curtas e indefinidas (“carregando algo pequeno”). Em excesso, passa sensação de espera sem progresso.
* **Skeleton**: melhor quando você sabe a estrutura do conteúdo e quer mostrar “o layout já está vindo”. Ajuda leitura e reduz ansiedade.

>**Dica**: skeleton funciona bem quando a tela tem “forma” (cards, lista, perfil). Spinner funciona melhor quando é uma ação pequena (ex.: validar um cupom).

#### Evitar “flicker”

Se algo carrega rápido demais, mostrar loading por 80ms e sumir cria “pisca-pisca” (flicker). Uma prática comum é:

* só mostrar loading se passar de um pequeno limiar (ex.: 200–300ms),
* ou manter por um tempo mínimo (sem exagerar) para estabilidade visual.

### Estados de erro

Uma boa mensagem de erro tem três características:

1. **o que aconteceu** (sem culpa do usuário),
2. **impacto** (o que foi afetado),
3. **próxima ação** (o que fazer agora).

Exemplo de erro acionável (curto):

* “não foi possível carregar seus eventos agora. verifique sua conexão e tente novamente.”
* “salvamento falhou. tente novamente ou copie o texto para não perder.”

**Retries e alternativas** (quando faz sentido):

* retry automático em falhas transitórias (rede móvel),
* botão “tentar novamente” quando o usuário controla o momento,
* fallback (“mostrar dados em cache”) quando possível.

### Estados de sucesso

Sucesso deve ser **objetivo**:

* “salvo”
* “pagamento confirmado”
* “convite enviado”

Evite exagero visual para ações frequentes (poluição e fadiga). Reserve toasts/alerts fortes para eventos relevantes.

### Microinterações

* **disabled states**: botão desabilitado evita múltiplos envios e comunica “estou trabalhando”.
* **foco e teclado (noção)**: usuários navegam por teclado e leitores de tela; foco visível é parte de UX e acessibilidade.

#### Padrões de UI “de mercado” (exemplos pequenos)

**Botão com estado de loading:**

```html
<button disabled aria-busy="true">
  salvando...
</button>
```

**Mensagem inline de erro (formulário):**

```html
<label for="email">email</label>
<input id="email" aria-invalid="true" aria-describedby="email-erro">
<p id="email-erro">digite um email válido</p>
```

**Toast/alert (conceito, sem library):**

* usar para confirmar ações (ex.: “item removido”) com duração curta;
* oferecer desfazer quando a ação é destrutiva (“desfazer”).

![alt text](/api/materiais-assets/6-frontend/13-performance-seguranca-e-ux/assets/image-1.png)

### Figura 2 — Estados de UI (transições)

---

## UX (fundamentos que todo dev precisa)

UX não é “deixar bonito”. UX é **reduzir fricção**: menos esforço para concluir tarefas, menos dúvida, menos surpresa.

### Princípios práticos

* **Consistência**: padrões repetidos viram aprendizado. Se cada tela age de um jeito, o usuário nunca “domina” o sistema.
* **Previsibilidade**: ações devem ter consequências esperadas. Se clicar em “salvar” às vezes fecha a tela e às vezes não, parece bug.
* **Affordances**: algo que parece clicável deve ser clicável; algo não clicável não deve “parecer botão”.
* **Hierarquia visual**: o que é mais importante aparece primeiro (tamanho, contraste, posição). Sem hierarquia, tudo compete e nada guia.
* **Acessibilidade básica**:

  * contraste adequado,
  * foco visível,
  * labels em formulários (não depender só de placeholder).

>**Conceito-chave**: acessibilidade é UX sob condições “difíceis”
> Usuário com sol na tela, com mão tremendo no ônibus, com teclado, com leitor de tela — todos se beneficiam de interfaces mais claras.

### UX em formulários

Formulários são onde a maioria dos produtos “perde” usuário.

* **Validação no tempo certo (não agressiva)**: mostrar erro antes do usuário terminar de digitar é frustrante.
* **Mensagens específicas**: “inválido” é vago. Diga o critério (“mínimo 8 caracteres”, “inclua @”).
* **Preservar dados se der erro**: perder o que foi digitado após falha de rede parece punição.

### UX e performance

* **tempo de resposta percebido**: 300ms sem feedback pode parecer travamento; 800ms com feedback claro parece “em andamento”.
* **mostrar progresso**: quando a operação é longa, “etapas” e barra de progresso reduzem ansiedade.

>**Atenção**: UX ruim frequentemente parece “bug”
> O usuário não distingue “não pensamos nesse caso” de “o sistema quebrou”.

---

## Glossário rápido

* **Latência:** atraso de comunicação entre cliente e servidor (tempo de ida e volta).
* **Cache:** reaproveitamento de respostas/arquivos para evitar downloads repetidos.
* **Bundle:** arquivo(s) final(is) de JS/CSS empacotados para entrega ao navegador.
* **Main thread:** “linha principal” onde JS, renderização e interação competem; se ela trava, a UI trava.
* **Lighthouse:** ferramenta de auditoria automatizada de qualidade (performance, SEO, etc.). ([Chrome for Developers][2])
* **SEO:** práticas para páginas serem entendidas e bem apresentadas em mecanismos de busca.
* **Crawler:** robô que visita páginas e coleta conteúdo para indexação.
* **Metadata:** dados no `<head>` (title, description, etc.) que descrevem a página.
* **XSS:** injeção onde conteúdo não confiável vira código executável no navegador.
* **Sanitização:** limpeza de conteúdo para remover partes perigosas antes de renderizar.
* **CSP:** política que restringe o que pode ser carregado/executado no navegador (camada extra). ([MDN Web Docs][4])
* **Loading state:** estado visual que comunica carregamento/processamento.
* **Skeleton:** “esqueleto” do layout enquanto dados reais carregam.
* **Affordance:** pista visual de como interagir (parece clicável, parece arrastável etc.).

---

## Resumo final

Qualidade na Web é a soma do que o usuário sente: **rapidez**, **confiabilidade**, **clareza** e **segurança**. Performance não é só “carregar rápido”; é entregar utilidade cedo, manter a interface estável e interações responsivas. SEO não é truque; é estrutura e conteúdo compreensíveis. Segurança (XSS) é, antes de tudo, disciplina: tratar entradas como não confiáveis e renderizar com responsabilidade. E UX é o “cola-tudo”: feedback, consistência e acessibilidade transformam tecnologia em experiência.

---

## Referências

* Google Search Central — SEO Starter Guide (títulos e fundamentos). ([Google for Developers][5])
* Google Search Central — boas práticas de snippets e meta descriptions (descrições únicas e relevantes). ([Google for Developers][3])
* Chrome for Developers — visão geral do Lighthouse (auditorias e uso). ([Chrome for Developers][2])
* Web.dev / Google Search Central — INP substituindo FID como métrica de responsividade nos Core Web Vitals (contexto de métricas de UX). ([Google for Developers][6])
* MDN Web Docs — Content Security Policy (CSP) e header `Content-Security-Policy`. ([MDN Web Docs][4])
* OWASP Cheat Sheet Series — CSP como camada adicional de mitigação (visão defensiva). ([cheatsheetseries.owasp.org][7])

[1]: https://web.dev/articles/vitals?utm_source=chatgpt.com "Web Vitals | Articles"
[2]: https://developer.chrome.com/docs/lighthouse/overview?utm_source=chatgpt.com "Introduction to Lighthouse - Chrome for Developers"
[3]: https://developers.google.com/search/docs/appearance/snippet?utm_source=chatgpt.com "How to Write Meta Descriptions | Google Search Central"
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP?utm_source=chatgpt.com "Content Security Policy (CSP) - HTTP - MDN Web Docs"
[5]: https://developers.google.com/search/docs/fundamentals/seo-starter-guide?utm_source=chatgpt.com "Search Engine Optimization (SEO) Starter Guide"
[6]: https://developers.google.com/search/blog/2023/05/introducing-inp?utm_source=chatgpt.com "Introducing INP to Core Web Vitals"
[7]: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html?utm_source=chatgpt.com "Content Security Policy - OWASP Cheat Sheet Series"
