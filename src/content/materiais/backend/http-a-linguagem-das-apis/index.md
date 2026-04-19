---
title: HTTP a Linguagem das APIs
description: Introdução a HTTP
category: Backend
order: 4
---

# 3.1 O que é HTTP

O HTTP (Hypertext Transfer Protocol) é um protocolo de comunicação para documentos hipermídia como HTTP, utilizado na web e que funciona por meio do modelo cliente-servidor que já foi trabalho anteriormente,  além disso outro ponto importante é o fato dele ser stateless(sem estado), ou seja as respostas do servidor não podem depender de requisições anteriores.

Na prática, quando um aplicativo consome uma API, ele envia uma requisição HTTP. O servidor interpreta essa mensagem, executa alguma lógica e devolve uma resposta HTTP. O cliente então decide o que fazer com essa resposta.

## Por que HTTP existe

A web precisa de um padrão para que sistemas diferentes conversem de forma previsível. Se cada aplicação inventasse seu próprio formato de mensagem, seria muito mais difícil integrar serviços e construir ferramentas interoperáveis.

HTTP resolve isso definindo:

- como o cliente descreve o que quer (requisição)
- como o servidor informa o resultado (resposta)
- como transportar metadados de forma padronizada (cabeçalhos)
- como representar sucesso, erro e redirecionamento (status)

## Características importantes do HTTP

### HTTP é cliente servidor

O cliente sempre inicia a conversa. O servidor espera por requisições e responde.

Em uma API, o cliente pode ser um front-end, um app mobile, outro backend, um script, ou qualquer sistema que consiga formar uma requisição.

### HTTP é orientado a mensagens

HTTP não é um canal contínuo de dados de alto nível. Ele é uma troca de mensagens bem definidas.

A unidade de comunicação é uma mensagem de requisição e, depois, uma mensagem de resposta.

### HTTP é stateless

Stateless significa que, por padrão, cada requisição é independente. O servidor não é obrigado a lembrar o que aconteceu na requisição anterior.

Isso não quer dizer que não existe autenticação, sessão ou carrinho de compras. Quer dizer que, quando isso existe, ele é construído por cima do HTTP usando mecanismos como cookies, tokens e outros dados enviados pelo cliente em cada requisição.

## O que compõe uma requisição HTTP

Uma requisição HTTP costuma ter três partes:

1) Uma linha inicial que diz qual ação o cliente quer executar e em qual caminho.
2) Cabeçalhos que carregam metadados, como o tipo de conteúdo esperado e credenciais.
3) Um corpo opcional com dados, quando faz sentido enviar conteúdo (por exemplo, criar ou atualizar algo).

Você ainda não precisa decorar formatos completos agora. O importante é reconhecer que a requisição não é só o path. Ela é uma mensagem estruturada.

## O que compõe uma resposta HTTP

Uma resposta HTTP também é uma mensagem estruturada, com:

1) Uma linha inicial com um status, que indica o resultado.
2) Cabeçalhos descrevendo metadados, como o tipo de conteúdo devolvido.
3) Um corpo opcional com o conteúdo, como JSON, HTML, arquivo, etc.

O status é uma das partes mais úteis do HTTP porque dá ao cliente um sinal rápido sobre o que aconteceu, antes mesmo de ele interpretar o corpo.

## O papel dos headers

Cabeçalhos HTTP existem para carregar informações que não devem ficar misturadas no corpo. Eles ajudam cliente e servidor a coordenar coisas como:

- formato do conteúdo enviado e recebido
- autenticação e autorização
- cache e validação
- controle de origem e segurança em navegadores

Um mesmo endpoint pode responder de formas diferentes dependendo de headers, o que torna HTTP bastante flexível.

## HTTP e HTTPS

HTTP é o protocolo que define a semântica e o formato das mensagens. HTTPS é o uso desse mesmo HTTP dentro de um canal seguro criado por TLS.

Isso é importante para não confundir responsabilidades:

- HTTP define como a requisição e resposta são organizadas
- TLS define como o canal é protegido contra leitura e alteração em trânsito

## Exemplo

Um cliente quer listar cursos. Ele faz uma requisição pedindo JSON:
>Os detalhes de cada parte estrutural de uma requisição e uma resposta HTTP serão trabalhados em seções adiante, a principío leve esse exemplo apenas para se basear

```http
GET /cursos?pagina=1 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
````

O servidor responde com sucesso e devolve JSON:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    { "id": "curso_01", "titulo": "Backend com Python" },
    { "id": "curso_02", "titulo": "Fundamentos de Redes" }
  ],
  "pagina": 1
}
```

Repare no que esse par de mensagens já comunica, mesmo sem você conhecer o backend por dentro:

* o cliente pediu um recurso específico e deu preferência por JSON
* o servidor indicou sucesso pelo status 200
* o servidor informou o tipo de conteúdo devolvido
* o corpo carrega os dados em um formato que o cliente consegue interpretar

## Checklist rápido

* Eu sei definir HTTP como um protocolo de comunicação baseado em requisição e resposta.
* Eu entendo que HTTP define mensagens estruturadas, não apenas rotas.
* Eu entendo que HTTP é stateless
* Eu sei que status e headers são parte essencial da comunicação.
* Eu sei diferenciar HTTP (mensagens) de HTTPS (mensagens dentro de um canal seguro).

## Fontes 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP) 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview) 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages) 

[https://developer.mozilla.org/pt-BR/docs/Glossary/HTTP](https://developer.mozilla.org/pt-BR/docs/Glossary/HTTP) 

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html) 


---
# 3.10 CORS e políticas de mesma origem

Quando você está construindo uma API, existe um tipo de consumidor muito comum: um front-end rodando no navegador. E o navegador tem regras de segurança próprias que não existem do mesmo jeito em scripts e backends.

A principal dessas regras é a política de mesma origem. Ela existe para impedir que um site malicioso, aberto no navegador do usuário, consiga fazer requisições livres para outro site e ler respostas como se fosse o usuário.

CORS é o mecanismo que permite relaxar essa regra de forma controlada quando você quer que um front-end de uma origem acesse sua API em outra origem.

## O que é origem

Origem é uma combinação de três coisas:

- scheme (http ou https)
- host (domínio)
- porta

Se qualquer uma dessas três muda, a origem muda.

Por exemplo:

- `https://site.com` e `https://site.com:443` são a mesma origem no padrão do HTTPS
- `http://site.com` e `https://site.com` não são a mesma origem
- `https://site.com` e `https://api.site.com` não são a mesma origem
- `https://site.com` e `https://site.com:8443` não são a mesma origem

## O que a política de mesma origem faz

A política de mesma origem, no contexto mais importante para APIs, restringe leitura de respostas por JavaScript quando a requisição é para outra origem.

O navegador ainda consegue fazer a requisição em muitos casos, mas ele bloqueia o acesso do código JavaScript ao conteúdo da resposta se as regras não forem atendidas.

Isso é um detalhe crucial: muitas pessoas pensam que o navegador bloqueia a requisição em si. Em muitos cenários, a requisição sai, o servidor responde, mas o navegador não entrega o conteúdo para o código do front-end.

## Onde CORS entra

CORS é um conjunto de headers e regras que permitem ao servidor dizer:

eu autorizo que esta origem específica leia esta resposta

Em vez de liberar tudo, CORS permite liberar de forma seletiva.

O header mais conhecido é:

- `Access-Control-Allow-Origin`

Ele pode indicar uma origem específica permitida ou, em alguns casos, liberar para qualquer origem.

## Preflight: por que às vezes aparece uma requisição OPTIONS

Em algumas situações, antes da requisição real, o navegador envia uma requisição de verificação, chamada preflight.

Essa verificação usa o método OPTIONS e pergunta ao servidor se ele permite:

- aquele método (por exemplo POST ou PATCH)
- aqueles headers (por exemplo Authorization)
- aquela origem

Se o servidor não responder com os headers corretos, o navegador não prossegue com a requisição real.

Isso explica um comportamento comum em APIs: você jura que está chamando POST, mas vê um OPTIONS antes.

## O que o servidor precisa responder em CORS

Em uma configuração típica, o servidor precisa informar:

- qual origem pode acessar: `Access-Control-Allow-Origin`
- quais métodos são permitidos: `Access-Control-Allow-Methods`
- quais headers o cliente pode usar: `Access-Control-Allow-Headers`

Se você usa cookies e sessão em chamadas entre origens, entra mais um detalhe importante:

- `Access-Control-Allow-Credentials`

Nesse cenário, também não é permitido usar `*` em `Access-Control-Allow-Origin`. O servidor precisa listar uma origem explícita.

## Exemplo

Você tem um front-end rodando em:

```text
https://app.exemplo.com
````

E uma API em:

```text
https://api.exemplo.com
```

Como são hosts diferentes, são origens diferentes. Se o front-end tentar chamar a API com JavaScript, o navegador aplica a política de mesma origem.

Uma resposta que permite acesso poderia incluir:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://app.exemplo.com

{
  "items": [
    { "id": "curso_01", "titulo": "Backend com Python" }
  ]
}
```

Agora um exemplo de preflight. O navegador quer fazer um POST com JSON e Authorization, então ele pode enviar:

```http
OPTIONS /inscricoes HTTP/1.1
Host: api.exemplo.com
Origin: https://app.exemplo.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
```

E o servidor precisa responder algo como:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.exemplo.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: content-type, authorization
```

A partir daí, o navegador autoriza a requisição real.

## Problemas clássicos de iniciante

* Achar que CORS é um mecanismo de segurança da API. Ele é uma política do navegador. Scripts e backends não têm essa restrição.
* Liberar `Access-Control-Allow-Origin: *` para resolver rápido e depois descobrir que credenciais não funcionam ou que você abriu demais.
* Esquecer que `http` e `https` são origens diferentes.
* Não tratar OPTIONS e achar que a API está recebendo chamadas duplicadas.
* Configurar CORS no lugar errado quando existe reverse proxy na frente.

## Checklist rápido

* Eu sei definir origem como scheme, host e porta.
* Eu sei explicar o que a política de mesma origem bloqueia no navegador.
* Eu sei que CORS é o servidor dizendo quais origens podem ler respostas.
* Eu entendo por que existe preflight com OPTIONS em alguns casos.
* Eu sei que credenciais entre origens exigem configurações específicas.

## Fontes (para leitura)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

[https://developer.mozilla.org/pt-BR/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/pt-BR/docs/Web/Security/Same-origin_policy)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/OPTIONS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/OPTIONS)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Origin](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Headers](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)

[https://www.rfc-editor.org/rfc/rfc6454](https://www.rfc-editor.org/rfc/rfc6454)


---
# 3.11 HTTP/1.1, HTTP/2 e HTTP/3

Até aqui você aprendeu o que é HTTP e como ele organiza requisições e respostas. Agora entra uma dúvida comum quando você começa a olhar ferramentas, logs e configurações de deploy: se HTTP é HTTP, por que existem versões diferentes.

A resposta é que as versões mudam principalmente a forma como as mensagens são transportadas e otimizadas na rede. A semântica que você já aprendeu, como métodos, status codes, headers, cache e negociação de conteúdo, continua valendo. O que muda é desempenho, eficiência e como o protocolo lida com conexões.

## O que muda entre as versões, em uma frase

- HTTP/1.1: funciona bem, mas lida pior com muitas requisições concorrentes.
- HTTP/2: mantém o mesmo HTTP, mas melhora a eficiência com multiplexação e frames binários.
- HTTP/3: busca os benefícios do HTTP/2, mas muda a base de transporte para lidar melhor com perdas e latência em redes reais.

## HTTP/1.1

HTTP/1.1 é a versão mais conhecida e até hoje é o padrão dominante. Ele é baseado em mensagens de texto e, na prática, funciona assim: o cliente faz uma requisição, o servidor responde, e isso se repete na mesma conexão quando possível.

O problema clássico do HTTP/1.1 não é que ele é ruim. É que ele sofre quando você precisa fazer muitas requisições ao mesmo tempo.

Alguns efeitos comuns:

- para paralelizar, clientes abrem várias conexões ao mesmo servidor
- numa mesma conexão, as respostas precisam respeitar ordem, o que pode travar requisições seguintes quando uma resposta demora
- headers repetidos em muitas requisições viram custo extra

## HTTP/2

HTTP/2 foi criado para resolver gargalos práticos do HTTP/1.1 sem mudar o modelo mental de requisição e resposta.

A ideia central é que HTTP/2 permite múltiplas requisições e respostas compartilharem a mesma conexão de forma eficiente.

O que torna isso possível:

- mensagens deixam de ser enviadas como texto direto na rede e passam a ser divididas em frames binários
- uma única conexão consegue carregar vários streams ao mesmo tempo, o que reduz a necessidade de abrir várias conexões
- headers são comprimidos de forma mais eficiente, reduzindo repetição

O efeito prático é que páginas e aplicações que fazem muitas chamadas para uma API costumam se beneficiar, principalmente em ambientes com latência.

Um cuidado importante: HTTP/2 melhora muito a camada HTTP, mas ainda depende de TCP por baixo. Em redes com perda, existe um tipo de travamento que pode aparecer no transporte, mesmo com streams no HTTP/2.

## HTTP/3

HTTP/3 mantém a semântica do HTTP, mas muda a base de transporte. Em vez de usar TCP, ele usa [QUIC](https://en.wikipedia.org/wiki/QUIC), que roda sobre UDP.

O motivo disso é reduzir problemas clássicos em redes reais, como Wi-Fi instável e redes móveis, onde perda e variação de latência acontecem com frequência.

O que isso melhora na prática:

- streams não ficam presos do mesmo jeito quando existe perda em um fluxo específico
- estabelecimento de conexão tende a ser mais rápido em cenários comuns
- comportamento sob perda costuma ser mais suave em comparação com TCP em alguns casos

Isso não significa que HTTP/3 é sempre melhor para tudo. Ele é mais recente, depende de suporte no cliente e no servidor, e pode ter custo extra de configuração em alguns ambientes.

## O que muda para você como quem constrói APIs

A parte mais importante é esta: quase sempre você não muda o design da API porque passou de HTTP/1.1 para HTTP/2 ou HTTP/3. Você continua pensando em:

- rotas, métodos e status
- headers de conteúdo e autenticação
- cache e negociação de conteúdo
- erros previsíveis

O que muda é o que você pode esperar de performance e comportamento de rede.

Em sistemas reais, muitas vezes o que acontece é:

- o cliente fala HTTP/2 ou HTTP/3 com um gateway ou reverse proxy
- o proxy fala HTTP/1.1 com o backend internamente

Isso é comum e válido. O importante é entender que a versão vista pelo cliente e a versão interna podem ser diferentes.

## Exemplo

Um ponto que confunde iniciantes é que a mensagem que você vê em exemplos HTTP costuma ter cara de HTTP/1.1, mesmo quando a conexão real é HTTP/2 ou HTTP/3.

Você pode ver isso na prática usando ferramentas comuns.

Exemplo de requisição que, conceitualmente, é a mesma em qualquer versão:

```http
GET /cursos?pagina=1 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
````

Em HTTP/2 e HTTP/3, essa requisição não trafega como texto desse jeito na rede. Ela é representada internamente por frames e streams. Mas para você como desenvolvedor, ela continua sendo uma requisição com método, alvo e headers.

A diferença aparece mais no transporte e na observabilidade da conexão do que na lógica da API.

## Quando faz sentido se preocupar com isso

* você tem muitas chamadas pequenas para a mesma API e quer reduzir custo de conexões
* seu público usa rede móvel e você quer melhorar estabilidade e latência
* você está configurando infraestrutura, proxy ou CDN e precisa decidir o que habilitar

Se você está apenas começando, o mais produtivo é dominar bem a semântica e os elementos do HTTP. As versões entram como otimização e configuração de ambiente, não como mudança de contrato.

## Problemas clássicos de iniciante

* achar que HTTP/2 muda regras de cache, status code ou métodos. Ele não muda.
* assumir que habilitar HTTP/2 ou HTTP/3 resolve lentidão que na verdade é do backend.
* confundir a versão usada pelo cliente com a versão usada internamente após um proxy.
* ficar preso em detalhes de transporte cedo demais e perder foco no contrato da API.

## Checklist rápido

* Eu sei que as versões mudam principalmente o transporte e a eficiência, não a semântica do HTTP.
* Eu sei que HTTP/2 melhora concorrência usando uma única conexão com streams.
* Eu sei que HTTP/3 usa QUIC e busca melhorar comportamento em redes com perda e latência variável.
* Eu sei que a API pode estar atrás de proxy, e a versão externa pode ser diferente da interna.
* Eu sei quando vale a pena olhar para versões como otimização, não como requisito de design.

## Fontes (para leitura)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Basics_of_HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Basics_of_HTTP)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Versioning](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Versioning)

[https://developer.mozilla.org/pt-BR/docs/Glossary/HTTP_2](https://developer.mozilla.org/pt-BR/docs/Glossary/HTTP_2)

[https://developer.mozilla.org/pt-BR/docs/Glossary/HTTP_3](https://developer.mozilla.org/pt-BR/docs/Glossary/HTTP_3)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)

[https://www.rfc-editor.org/rfc/rfc9114.html](https://www.rfc-editor.org/rfc/rfc9114.html)

[https://www.rfc-editor.org/rfc/rfc9000.html](https://www.rfc-editor.org/rfc/rfc9000.html)



---

# 3.2 Estrutura de uma requisição HTTP

Quando um cliente acessa uma API, existe um caminho por trás: ele precisa localizar o servidor, abrir uma conexão e, em muitos casos, estabelecer um canal seguro. Depois que esse caminho está pronto, o que efetivamente viaja entre cliente e servidor é uma mensagem HTTP.

Essa mensagem é a requisição. Ela é o pacote de intenções do cliente: qual ação ele quer executar, em qual recurso, com quais preferências e, se necessário, com quais dados.

Entender a estrutura da requisição é um passo essencial por três motivos:

- você consegue ler chamadas com mais precisão
- você passa a saber onde cada informação deve ficar (caminho, parâmetros, cabeçalhos, corpo)
- você evita erros comuns de integração, mesmo quando cliente e servidor são feitos por times diferentes

## Visão geral da mensagem

Uma requisição HTTP é composta por partes bem definidas, sempre na mesma ordem:

1) linha inicial  
2) cabeçalhos  
3) uma linha em branco separando cabeçalhos do corpo  
4) corpo (opcional)

O endereço da API vira o alvo da requisição, e metadados importantes (como formato esperado e credenciais) ficam nos cabeçalhos, não misturados no corpo.



## Linha inicial

A linha inicial resume o objetivo da requisição. Ela tem três peças:

- método
- alvo da requisição
- versão do protocolo

### Método

O método expressa a intenção do cliente. Ele define como o servidor e ferramentas ao redor costumam interpretar a chamada.

No começo, pense assim:

- GET: o cliente quer ler dados
- POST: o cliente quer enviar dados para criar algo ou disparar um processamento
- PUT e PATCH: o cliente quer atualizar
- DELETE: o cliente quer remover
- PATCH: altera apenas um campo específico

Existem também outros dois que não são tão usuais mas que valem a menção que são os métodos OPTIONS e HEAD.

Os detalhes de semântica e boas práticas vão aparecer em tópicos seguintes, mas a ideia de intenção já é suficiente aqui.

### Alvo da requisição

O alvo normalmente é o caminho dentro do servidor, é possível incluir query string.

Exemplos de alvo:

- `/cursos/curso_01`
- `/cursos?pagina=2&ordenar=nome`

Uma forma segura de pensar:

- o caminho aponta o recurso
- a query string ajusta como você quer ver ou filtrar esse recurso

### Versão do HTTP

Você vai ver `HTTP/1.1` em muitos exemplos. Mesmo que existam versões mais novas, a ideia de método, alvo e cabeçalhos continua existindo.



## Cabeçalhos

Cabeçalhos são metadados no formato `Nome: valor`. Eles carregam contexto e regras da comunicação.

Alguns aparecem o tempo todo em APIs:

- `Host`: qual domínio o cliente está tentando acessar
- `Accept`: qual formato de resposta o cliente prefere receber
- `Content-Type`: qual formato está sendo enviado no corpo, quando há corpo
- `Authorization`: credenciais ou token, quando a API exige autenticação

Um ponto importante para não confundir: cabeçalhos não são o lugar para dados de negócio. Eles existem para descrever a comunicação, não para carregar o conteúdo principal do domínio.



## Linha em branco

Depois do último cabeçalho, existe uma linha em branco. Ela é o separador que indica: acabou o cabeçalho, se houver corpo, ele começa agora.

Esse detalhe parece pequeno, mas é parte do que torna HTTP uma mensagem estruturada e previsível.



## Corpo

O corpo é opcional. Ele aparece quando você precisa enviar dados, como em criação e atualização.

Quando existe corpo, o `Content-Type` deixa de ser detalhe e vira regra: ele diz ao servidor como interpretar aqueles bytes.

Em APIs, o formato mais comum é JSON (`application/json`), mas existem outros formatos em casos como formulários e upload.



## Exemplo

### Exemplo 1: requisição sem corpo (leitura)

Aqui o cliente quer listar cursos. Repare que não existe corpo.

![exemplo de request](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-request.png)

O que essa mensagem comunica de forma organizada:

* intenção: ler dados (GET)
* alvo: coleção de cursos com paginação
* contexto: o cliente quer resposta em JSON

### Exemplo 2: requisição com corpo (criação)

Aqui o cliente quer criar uma inscrição. Repare que agora existe corpo e, por isso, `Content-Type` aparece.

![exemplo de request](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-request2.png)

O que muda em relação ao primeiro exemplo:

* método indica uma intenção diferente
* existe um corpo com dados
* `Content-Type` define como o servidor deve interpretar o corpo



## Problemas clássicos de iniciante

* Enviar JSON no corpo e esquecer `Content-Type: application/json`.
* Colocar dados grandes ou sensíveis na URL em vez de usar corpo ou cabeçalhos adequados.
* Confundir o papel do `Accept` (o que eu quero receber) com `Content-Type` (o que eu estou enviando).
* Montar a rota correta, mas usar host diferente do esperado, especialmente quando existem múltiplos domínios no mesmo servidor.



## Checklist rápido

* Eu sei identificar método, alvo e versão na linha inicial.
* Eu sei explicar a diferença entre cabeçalhos e corpo.
* Eu sei quando `Content-Type` é obrigatório.
* Eu sei que `Accept` indica o formato preferido da resposta.
* Eu consigo ler uma requisição e dizer onde estão intenção, alvo, contexto e dados.



## Fontes

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/Host](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/Host)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/Accept](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/Accept)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/Content-Type](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/Content-Type)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)



---
# 3.3 Estrutura de uma resposta HTTP

Depois que o servidor recebe uma requisição e decide o que fazer com ela, ele devolve uma resposta HTTP. Essa resposta é a forma padronizada de dizer ao cliente duas coisas:

- qual foi o resultado da tentativa
- quais dados, se houver, estão sendo devolvidos

Assim como a requisição, a resposta também é uma mensagem com estrutura fixa. Entender essa estrutura ajuda você a depurar integrações, interpretar erros corretamente e construir respostas mais consistentes para quem consome sua API.

## Visão geral da mensagem

Uma resposta HTTP é composta por partes bem definidas, nessa ordem:

1) linha inicial  
2) cabeçalhos  
3) uma linha em branco separando cabeçalhos do corpo  
4) corpo (opcional)

O corpo nem sempre existe. Em alguns casos o resultado é comunicado apenas pelo status e pelos cabeçalhos.



## Linha inicial

A linha inicial da resposta informa o resultado de forma rápida e padronizada. Ela tem três elementos:

- versão do HTTP
- status code
- motivo curto (texto humano)

Exemplo de linha inicial:

```text
HTTP/1.1 200 OK
````

O que importa mais na prática é o status code, porque ele é o sinal que ferramentas e clientes usam para decidir o que fazer. O texto do final é apenas um complemento legível.

Você não precisa decorar códigos agora, mas vale guardar a ideia:

* 2xx costuma indicar sucesso
* 3xx costuma indicar redirecionamento
* 4xx costuma indicar erro causado pela requisição do cliente
* 5xx costuma indicar erro inesperado no servidor

Os códigos e suas regras serão aprofundados nos próximos tópicos.



## Cabeçalhos

Cabeçalhos na resposta descrevem o que está sendo devolvido e como o cliente deve interpretar aquela resposta.

Alguns dos mais comuns em APIs:

* `Content-Type`: diz o formato do corpo, como `application/json`
* `Content-Length`: tamanho do corpo, em alguns cenários
* `Cache-Control`: regras de cache, quando aplicável
* `Set-Cookie`: define cookies, quando a aplicação usa esse mecanismo

Um ponto importante: cabeçalhos são a forma correta de transmitir metadados de comunicação. Dados de negócio, como lista de cursos ou detalhes de um usuário, ficam no corpo.



## Linha em branco

Depois dos cabeçalhos, existe uma linha em branco que marca o fim dessa seção. Se houver um corpo, ele começa depois dessa linha.



## Corpo

O corpo é onde os dados costumam aparecer. Em APIs, o formato mais comum é JSON.

Se o servidor devolve um corpo, ele precisa deixar claro como interpretar esse conteúdo. Por isso `Content-Type` é tão importante.

Nem toda resposta tem corpo. Existem respostas em que isso não faz sentido, como quando o servidor só precisa confirmar que uma ação foi aceita ou que não há conteúdo para devolver.



## Exemplo

### Exemplo 1: sucesso com corpo JSON

![exemplo de response](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-response.png)

O que essa resposta comunica:

* o resultado foi sucesso
* o corpo está em JSON
* o corpo contém os dados solicitados

### Exemplo 2: erro com corpo JSON

![exemplo de response](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-response2.png)

O que essa resposta comunica:

* a tentativa falhou porque o recurso não foi encontrado
* o erro tem um formato previsível, o que facilita tratamento no cliente

### Exemplo 3: sucesso sem corpo

```http
HTTP/1.1 204 No Content
```

Aqui não existe corpo. O status já comunica que a operação deu certo e que não há conteúdo para devolver.



## Problemas clássicos de iniciante

* Responder JSON e esquecer `Content-Type: application/json`, fazendo o cliente interpretar de forma errada.
* Colocar detalhes internos no corpo de erro, como stack trace ou mensagens do banco.
* Usar sempre o mesmo status code para tudo, obrigando o cliente a adivinhar o que ocorreu lendo apenas o corpo.
* Criar formatos de erro diferentes em cada endpoint, tornando o cliente um conjunto de exceções.



## Checklist rápido

* Eu sei que uma resposta tem linha inicial, cabeçalhos e corpo opcional.
* Eu sei que o status code é o sinal principal do resultado.
* Eu sei que `Content-Type` define como interpretar o corpo.
* Eu sei que nem toda resposta tem corpo.
* Eu consigo ler uma resposta e separar resultado, metadados e dados.



## Fontes 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Status](https://developer.mozilla.org/pt-BR/docs/Glossary/Status)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)



---
# 3.4 Métodos HTTP e semântica

Na estrutura de uma requisição, o método aparece logo no começo. Ele não é um detalhe de sintaxe. Ele é a forma padrão de expressar a intenção do cliente.

Quando você escolhe um método corretamente, você ajuda três tipos de gente e ferramenta:

- quem consome a API, porque entende o que esperar
- quem mantém a API, porque ganha consistência
- a infraestrutura, porque cache, proxies e ferramentas de observabilidade conseguem se comportar melhor

Essa é a ideia de semântica: o método não é apenas um nome. Ele carrega expectativas sobre comportamento.

## O que significa semântica em HTTP

Semântica é o significado que um método carrega e o comportamento esperado associado a ele.

Quando um cliente envia um GET, a expectativa é leitura. Quando envia um POST, a expectativa é criar ou processar algo. Isso não é uma regra física, é uma convenção padronizada que torna integrações previsíveis.

Se você ignora essa semântica e usa POST para tudo, a API até pode funcionar, mas fica mais difícil de entender, debugar e evoluir.

## Métodos mais comuns em APIs

### GET

GET é usado para leitura.

É o método típico para listar recursos e obter detalhes. Uma característica importante é que GET deve ser seguro no sentido de não causar efeitos colaterais relevantes no servidor. Ele pode gerar logs e métricas, mas não deve alterar estado de negócio.

### POST

POST é usado quando o cliente quer enviar dados para criação ou para processamento.

Ele é muito usado para criar um novo recurso, como uma inscrição, ou para acionar uma operação que não se encaixa bem como atualização simples.

POST é flexível, mas por isso mesmo é fácil abusar. O uso correto tende a ser quando a intenção não é apenas atualizar algo existente de forma direta.

### PUT

PUT é usado para substituir um recurso por completo.

A ideia é que o cliente envie uma representação completa do recurso e o servidor passe a considerar aquilo como o estado atual.

Na prática, PUT é mais comum em APIs que têm uma representação clara e completa do recurso. Quando isso não acontece, PUT tende a virar um POST disfarçado.

### PATCH

PATCH é usado para atualização parcial.

Ele existe para quando você quer mudar apenas um pedaço do recurso sem precisar reenviar tudo.

PATCH costuma ser usado quando a representação completa é grande, ou quando faz sentido atualizar campos específicos como status, nome ou configurações.

### DELETE

DELETE é usado para remoção.

Nem sempre isso significa deletar de verdade do banco. Pode significar marcar como removido, desativar ou arquivar. O importante é que, para o consumidor, a intenção é remover o recurso da visão normal de uso.

### Métodos menos usuais, mas que vale menção

#### OPTIONS
Usado para verificar quais métodos HTTP um recurso suporta. É muito comum em CORS, quando o browser faz requisições de pré-verificação.

#### HEAD
Semelhante ao GET, mas retorna apenas os headers, sem corpo. Útil para checar existência de um recurso ou metadados.


## Duas propriedades que ajudam a entender métodos

Além da semântica geral, dois conceitos ajudam a tornar o uso mais consistente: segurança e idempotência.

### Segurança

Um método seguro é aquele que não deve causar mudanças relevantes no estado do servidor.

GET é o exemplo clássico. Se um GET altera estado de negócio, você está criando uma API difícil de prever e mais perigosa de usar.

### Idempotência

Um método idempotente é aquele em que repetir a mesma requisição várias vezes produz o mesmo efeito final.

Isso importa porque clientes podem repetir requisições em falhas de rede. Quando um método é idempotente, repetir tende a ser seguro.

De forma geral:

- GET tende a ser idempotente
- PUT tende a ser idempotente
- DELETE tende a ser idempotente no efeito final
- POST geralmente não é idempotente
- PATCH depende do formato e do tipo de atualização

Essa discussão vai ficar mais concreta quando você tratar de retries e falhas, mas já vale guardar a ideia.

## Exemplo

### Exemplo 1: leitura com GET

![exemplo de request](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-request.png)

Aqui o cliente só quer ler. A expectativa é que chamar várias vezes não mude nada no servidor.

### Exemplo 2: criação com POST

![exemplo de request](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-request2.png)

Aqui existe chance real de duplicar se o cliente repetir. Por isso, em APIs reais, é comum precisar de cuidado extra com criação.

### Exemplo 3: atualização parcial com PATCH

![exemplo de request](/api/materiais-assets/backend/http-a-linguagem-das-apis/assets/http-request3.png)


A intenção é mudar apenas um campo sem reenviar todo o recurso.

## Problemas clássicos de iniciante

* Usar POST para leitura porque é mais fácil enviar dados no corpo.
* Criar endpoints que fazem várias ações diferentes dependendo do corpo, sem uma semântica clara.
* Alterar estado de negócio em GET, quebrando expectativa do consumidor.
* Misturar PUT e PATCH sem uma regra, o que gera inconsistência.
* Ignorar idempotência e sofrer com duplicação quando há retries.

## Checklist rápido

* Eu sei que o método comunica intenção.
* Eu consigo explicar o uso típico de GET, POST, PUT, PATCH e DELETE.
* Eu sei o que significa um método ser seguro.
* Eu sei o que significa um método ser idempotente.
* Eu entendo por que usar POST para tudo reduz previsibilidade da API.

## Fontes

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Idempotent](https://developer.mozilla.org/pt-BR/docs/Glossary/Idempotent)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Safe](https://developer.mozilla.org/pt-BR/docs/Glossary/Safe)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)

[https://www.rfc-editor.org/rfc/rfc5789](https://www.rfc-editor.org/rfc/rfc5789)



---
# 3.5 Códigos de status HTTP

Quando o servidor responde, a primeira informação que o cliente costuma olhar é o status code. Ele é um número que resume o resultado da requisição de forma padronizada, antes mesmo do cliente ler o corpo.

Isso tem um efeito prático: o cliente não precisa adivinhar o que aconteceu. Ele consegue decidir rapidamente o próximo passo, como tratar sucesso, repetir uma tentativa, pedir autenticação ou mostrar uma mensagem de erro.

## Como ler status code

Status codes são agrupados por faixa:

- 1xx: informativo (raros em APIs do dia a dia)
- 2xx: sucesso
- 3xx: redirecionamento
- 4xx: erro do lado do cliente (a requisição tem problema ou não tem permissão)
- 5xx: erro do lado do servidor (o servidor falhou ao processar)

Essa classificação não é só teoria. Ela ajuda a criar um padrão mental de depuração: 4xx normalmente pede ajuste no cliente ou na requisição, 5xx normalmente pede investigação no servidor.

## 2xx: sucesso

### 200 OK

Uso comum: leitura bem sucedida ou ação que devolve conteúdo.

Um GET que lista cursos costuma responder 200 com um corpo JSON.

### 201 Created

Uso comum: criação bem sucedida.

O servidor criou um novo recurso. Frequentemente é acompanhado de um header `Location` apontando para o endereço do recurso criado.

### 204 No Content

Uso comum: sucesso sem corpo.

Serve bem para ações em que você não precisa devolver conteúdo, como uma remoção ou uma atualização simples em que o cliente já tem os dados.

## 3xx: redirecionamento

Em APIs puras, 3xx é menos frequente do que em navegação de páginas, mas ainda aparece.

### 301 Moved Permanently e 302 Found

Usados para redirecionar para outra URL. Em APIs, aparecem em migrações, ajustes de rota, ou quando um endpoint foi movido.

Um ponto importante: muitos clientes e bibliotecas seguem redirecionamento automaticamente, então você pode nem perceber que ele aconteceu.

## 4xx: erro do cliente

### 400 Bad Request

Uso comum: o servidor não consegue interpretar a requisição ou ela viola regras básicas.

Exemplos típicos:
- JSON inválido
- campo obrigatório faltando
- formato incorreto

### 401 Unauthorized

Uso comum: falta autenticação válida.

Na prática, significa que o cliente não enviou credenciais ou enviou algo inválido. Muitas vezes vem acompanhado de informações para indicar qual mecanismo de autenticação é esperado.

### 403 Forbidden

Uso comum: o cliente está autenticado, mas não tem permissão.

A diferença essencial: 401 é identidade ausente ou inválida, 403 é identidade reconhecida mas sem autorização.

### 404 Not Found

Uso comum: o recurso não existe, ou o endpoint não foi encontrado.

Em APIs, 404 é um retorno muito frequente em rotas incorretas ou quando um id não existe.

### 409 Conflict

Uso comum: conflito de estado.

Exemplos típicos:
- tentar criar algo que já existe
- tentar confirmar uma inscrição já confirmada, dependendo da regra de negócio

### 422 Unprocessable Content

Muito comum em algumas ferramentas e frameworks, especialmente quando a requisição está bem formada, mas falha validação semântica.

Essa distinção aparece em cenários como validação de campos, regras de formato e constraints de domínio.

## 5xx: erro do servidor

### 500 Internal Server Error

Uso comum: falha inesperada no servidor.

É um status genérico. Idealmente, você não quer depender dele como resposta normal. Ele indica que algo deu errado e o servidor não tratou de forma mais específica.

### 502 Bad Gateway

Comum quando existe intermediário como reverse proxy ou gateway e ele não consegue obter uma resposta válida do backend.

### 503 Service Unavailable

Indica que o serviço está indisponível, muitas vezes por manutenção, sobrecarga, ou porque instâncias estão fora.

Pode vir com headers indicando quando tentar novamente, dependendo da configuração.

### 504 Gateway Timeout

Um intermediário aguardou resposta do backend e não recebeu a tempo.

Esse status é útil para lembrar que nem toda falha é do código de aplicação. Às vezes o backend até está funcionando, mas está lento demais para os limites do caminho.

## Como escolher status codes sem complicar

Para iniciar, o importante é ter consistência e previsibilidade.

Uma regra prática:

- Sucesso de leitura: 200
- Sucesso de criação: 201
- Sucesso sem corpo: 204
- Erro de entrada: 400
- Falta autenticação: 401
- Falta permissão: 403
- Não encontrado: 404
- Conflito: 409
- Erro inesperado: 500

Você pode refinar depois. O erro comum é usar sempre 200 e empurrar o resultado real para o corpo, forçando o cliente a interpretar tudo manualmente.

## Exemplo

### Exemplo 1: criação bem sucedida

O cliente cria uma inscrição:

```http
POST /inscricoes HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json
Accept: application/json

{
  "nome": "Ana",
  "email": "ana@exemplo.com",
  "curso_id": "curso_01"
}
````

Resposta:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /inscricoes/insc_01

{
  "id": "insc_01",
  "status": "pendente"
}
```

### Exemplo 2: tentativa sem autenticação

```http
GET /inscricoes/insc_01 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
```

Resposta:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "NAO_AUTENTICADO",
  "message": "Envie credenciais válidas para acessar este recurso."
}
```

### Exemplo 3: backend lento e timeout no caminho

Se um intermediário esperar demais e estourar o tempo, o cliente pode receber:

```http
HTTP/1.1 504 Gateway Timeout
Content-Type: application/json

{
  "error": "TIMEOUT",
  "message": "O serviço não respondeu a tempo."
}
```

Esse exemplo é útil porque mostra que o status pode refletir um problema na camada de infraestrutura, não necessariamente uma exceção dentro da aplicação.

## Problemas clássicos de iniciante

* Responder 200 para tudo e colocar erro apenas no corpo.
* Usar 500 para erros de validação, confundindo cliente e equipe.
* Misturar 401 e 403 sem regra clara.
* Usar 404 para qualquer erro, perdendo sinalização.
* Criar formatos de erro diferentes em cada endpoint.

## Checklist rápido

* Eu sei ler as faixas 2xx, 4xx e 5xx e o que elas sugerem.
* Eu sei diferenciar 401 de 403.
* Eu sei quando faz sentido 201 e 204.
* Eu entendo que 502, 503 e 504 aparecem por causa de intermediários e tempo.
* Eu consigo escolher um conjunto mínimo de status codes e manter consistência.

## Fontes 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Status](https://developer.mozilla.org/pt-BR/docs/Glossary/Status)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)



---
# 3.6 Cabeçalhos fundamentais para APIs

Até aqui você já viu que a linha inicial da requisição define a intenção do cliente e que o status code resume o resultado. Falta uma peça que amarra o comportamento real da comunicação: os cabeçalhos.

Cabeçalhos HTTP são metadados. Eles não carregam o dado principal do domínio, mas dizem como a mensagem deve ser interpretada, quais formatos estão em jogo, quais credenciais estão sendo usadas e quais regras de operação valem para aquela troca.

Em APIs, cabeçalhos são fundamentais porque a mesma rota pode se comportar de forma diferente dependendo deles.

## O que são cabeçalhos

Um cabeçalho é uma linha no formato `Nome: valor`. Eles aparecem tanto na requisição quanto na resposta.

Uma forma prática de pensar:

- o path diz qual recurso você quer
- o corpo carrega os dados do domínio, quando necessário
- os cabeçalhos descrevem o contexto e as regras da comunicação

## Cabeçalhos mais importantes na requisição

### Host

Indica qual host o cliente está acessando. Ele é essencial em cenários em que um mesmo servidor atende múltiplos domínios.

Em APIs públicas, o cliente normalmente manda `Host` automaticamente, mas entender o papel dele ajuda a debugar casos em que o domínio está errado ou a requisição foi roteada para o serviço incorreto.

### Accept

Expressa o formato de resposta preferido pelo cliente. Em APIs, o mais comum é:

- `Accept: application/json`

Isso não obriga o servidor a responder naquele formato, mas cria uma expectativa. Quando cliente e servidor usam isso de forma consistente, integrações ficam mais previsíveis.

### Content-Type

Diz o formato do corpo que o cliente está enviando. Ele importa quando existe corpo.

O caso mais comum em APIs é:

- `Content-Type: application/json`

Um erro clássico é enviar JSON sem informar Content-Type. Nesse cenário, o servidor pode interpretar o corpo de forma errada ou rejeitar a requisição.

### Authorization

Carrega credenciais de autenticação. Em APIs modernas, é comum usar tokens, por exemplo no formato Bearer.

O ponto importante aqui é conceitual: credenciais tendem a ir em Authorization, não na URL, porque a URL costuma parar com mais facilidade em históricos, caches e logs.

## Cabeçalhos mais importantes na resposta

### Content-Type

Diz ao cliente como interpretar o corpo da resposta. Em APIs, normalmente:

- `Content-Type: application/json`

Mesmo quando o cliente pediu JSON com Accept, o servidor precisa declarar o tipo do que está devolvendo.

### Location

Muito comum em respostas de criação. Ele indica onde está o recurso recém criado.

Quando um servidor responde 201, um Location bem usado ajuda o cliente a saber qual endereço usar para buscar o recurso depois.

### Cache-Control

Define regras de cache. Para APIs, isso pode significar duas coisas:

- permitir cache de respostas que são seguras para cache
- proibir cache quando a resposta é sensível ou varia por usuário

Mesmo que você ainda não esteja otimizando performance, entender Cache-Control evita decisões erradas em produção, especialmente quando existe proxy no caminho.

### ETag e If-None-Match

Esses dois cabeçalhos trabalham juntos para permitir cache com validação.

- o servidor pode responder com um `ETag`, que é um identificador da versão daquele conteúdo
- o cliente pode repetir a requisição enviando `If-None-Match` com o mesmo valor
- se nada mudou, o servidor pode responder 304, economizando transferência de corpo

Você não precisa usar isso agora para construir uma API simples, mas é uma peça importante para entender como web e infraestrutura evitam trabalho repetido.

## Exemplo

### Exemplo 1: cliente pedindo JSON e enviando autenticação

```http
GET /cursos?pagina=1 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
Authorization: Bearer <token>
````

O que esses cabeçalhos deixam explícito:

* qual host o cliente quer acessar
* qual formato de resposta o cliente prefere
* que a chamada exige credenciais

### Exemplo 2: cliente enviando JSON no corpo

```http
POST /inscricoes HTTP/1.1
Host: api.exemplo.com
Accept: application/json
Content-Type: application/json

{
  "nome": "Ana",
  "email": "ana@exemplo.com",
  "curso_id": "curso_01"
}
```

O ponto didático aqui é que Content-Type descreve o corpo. Sem ele, o servidor pode não saber como interpretar os bytes enviados.

### Exemplo 3: criação com Location e resposta em JSON

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /inscricoes/insc_01

{
  "id": "insc_01",
  "status": "pendente"
}
```

Aqui, o status comunica criação, Content-Type comunica formato do corpo e Location comunica onde está o recurso criado.

### Exemplo 4: cache com validação usando ETag

Primeira resposta do servidor:

```http
HTTP/1.1 200 OK
Content-Type: application/json
ETag: "v3"

{
  "id": "curso_01",
  "titulo": "Backend com Python",
  "nivel": "iniciante"
}
```

Uma próxima requisição do cliente:

```http
GET /cursos/curso_01 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
If-None-Match: "v3"
```

Se nada mudou, o servidor pode responder:

```http
HTTP/1.1 304 Not Modified
ETag: "v3"
```

Repare que o cliente consegue confirmar que o conteúdo é o mesmo sem receber o JSON novamente.

## Confusões de iniciantes

* Confundir `Accept` com `Content-Type`. Um diz o que eu quero receber, o outro diz o que eu estou enviando.
* Esquecer `Content-Type` ao enviar JSON.
* Colocar credenciais na URL em vez de usar `Authorization`.
* Responder JSON sem `Content-Type: application/json`.
* Ignorar que caches e proxies existem e depois estranhar comportamento inconsistente em produção.

## Checklist rápido

* Eu sei diferenciar cabeçalhos de dados de negócio.
* Eu sei quando usar `Accept` e quando usar `Content-Type`.
* Eu sei por que `Authorization` é o lugar típico de credenciais.
* Eu sei por que `Location` aparece em criação.
* Eu entendo o papel de `Cache-Control` e a ideia de `ETag` com `If-None-Match`.

## Fontes 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Host](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Host)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Authorization](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Authorization)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Location](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Location)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cache-Control](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cache-Control)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/ETag](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/ETag)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/If-None-Match](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/If-None-Match)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/304](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/304)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)


---
# 3.7 Negociação de conteúdo

Até aqui você já viu que cabeçalhos como `Accept` e `Content-Type` dão contexto para a comunicação. Negociação de conteúdo é exatamente a parte do HTTP que usa esses cabeçalhos para responder a uma pergunta simples:

Qual formato o cliente quer receber e qual formato o servidor consegue entregar.

Em APIs, isso aparece principalmente em dois cenários:

- o cliente pode aceitar mais de um formato de resposta
- o servidor pode responder em mais de um formato, ou pode variar idioma e compressão

A ideia não é complicar. É só entender como cliente e servidor chegam a um acordo sobre a representação dos dados.

## O que o cliente informa

O cliente negocia principalmente por meio destes cabeçalhos.

### Accept

`Accept` diz quais tipos de conteúdo o cliente prefere receber.

O caso mais comum em APIs é JSON:

```http
Accept: application/json
````

Mas o cliente pode informar mais de um tipo, e até preferências. O servidor usa isso para escolher a melhor resposta possível dentro do que ele suporta.

### Accept-Language

`Accept-Language` permite que o cliente indique o idioma preferido para textos de interface, mensagens, descrições e outros conteúdos que dependem de idioma.

Isso é comum quando a API devolve mensagens legíveis por humanos, como descrições ou mensagens de erro.

### Accept-Encoding

`Accept-Encoding` indica quais formas de compressão o cliente aceita, como gzip ou br.

Isso não muda o formato lógico dos dados, continua sendo JSON por exemplo, mas muda como os bytes são enviados para reduzir tamanho e acelerar transferência.

## O que o servidor confirma

Do lado do servidor, a resposta também informa escolhas importantes.

### Content-Type

`Content-Type` diz qual foi o formato escolhido para o corpo da resposta.

Mesmo que o cliente peça JSON, o servidor deixa explícito qual formato está entregando. Isso evita ambiguidade para bibliotecas e ferramentas.

### Content-Language e Content-Encoding

Se a resposta tiver variação de idioma ou compressão, o servidor pode declarar isso com cabeçalhos apropriados, deixando claro como o cliente deve interpretar e decodificar.

## Como o servidor decide

Em uma negociação saudável, o servidor escolhe o melhor formato que ele suporta e que o cliente aceita.

Quando não existe interseção entre o que o cliente quer e o que o servidor pode entregar, o servidor pode responder com um erro. O status mais associado a isso é 406, indicando que não há uma representação aceitável para o cliente.

No dia a dia de APIs, é comum simplificar:

* a API suporta apenas JSON
* o cliente sempre pede JSON
* negociação vira mais um mecanismo de clareza do que de escolha real

Mesmo assim, entender o conceito é útil porque você vai encontrar `Accept` em clientes, ferramentas, proxies e documentação.

## Exemplo

### Exemplo 1: o cliente pede JSON e o servidor responde JSON

Requisição:

```http
GET /cursos/curso_01 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
```

Resposta:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "curso_01",
  "titulo": "Backend com Python",
  "nivel": "iniciante"
}
```

Aqui, não há surpresa. O cliente pediu JSON e o servidor confirmou no Content-Type.

### Exemplo 2: o mesmo recurso em outro formato

Requisição:

```http
GET /cursos/curso_01 HTTP/1.1
Host: api.exemplo.com
Accept: application/xml
```

Se o servidor suportar XML, ele poderia responder:

```http
HTTP/1.1 200 OK
Content-Type: application/xml

<curso>
  <id>curso_01</id>
  <titulo>Backend com Python</titulo>
  <nivel>iniciante</nivel>
</curso>
```

O ponto didático é que a rota e o recurso são os mesmos. O que muda é a representação.

Se o servidor não suportar XML, ele pode escolher responder com JSON mesmo assim, ou pode recusar quando a negociação é estrita, dependendo da política do serviço.

### Exemplo 3: idioma preferido para mensagens

Requisição:

```http
GET /cursos/curso_inexistente HTTP/1.1
Host: api.exemplo.com
Accept: application/json
Accept-Language: pt-BR
```

Resposta:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Language: pt-BR

{
  "error": "CURSO_NAO_ENCONTRADO",
  "message": "O curso solicitado não existe."
}
```

Aqui, o dado principal do erro é o código `error`. A mensagem pode variar por idioma sem quebrar o consumo, desde que o contrato mantenha campos estáveis.

## Problemas clássicos de inicante

* Confundir `Accept` com `Content-Type`. `Accept` é o que eu quero receber. `Content-Type` é o que está sendo enviado.
* Esquecer de responder com `Content-Type`, deixando o cliente adivinhar o formato.
* Variar respostas por idioma ou compressão e depois estranhar comportamentos inconsistentes em ferramentas de teste, porque o cliente mudou headers sem perceber.
* Projetar a API para suportar muitos formatos cedo demais, gerando custo e inconsistência, quando um único formato bem definido já resolveria.

## Checklist rápido

* Eu sei explicar negociação de conteúdo como um acordo de formato entre cliente e servidor.
* Eu sei o papel de `Accept` e `Content-Type`.
* Eu sei que idioma e compressão também entram na negociação via headers.
* Eu consigo olhar uma requisição e prever qual representação faz sentido responder.
* Eu sei que muitas APIs simplificam e suportam apenas JSON, mas ainda usam os headers para clareza.

## Fontes 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Content_negotiation](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Content_negotiation)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept-Language](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept-Language)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept-Encoding](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Accept-Encoding)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Language](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Language)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Encoding](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Encoding)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/406](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/406)

[https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html)

---
# 3.8 Caching em APIs HTTP

Em HTTP, cache é uma estratégia para evitar trabalho repetido. Se uma resposta pode ser reutilizada, o cliente ou algum intermediário pode guardar essa resposta e evitar pedir a mesma coisa de novo.

Em APIs, isso costuma ter dois objetivos:

- reduzir latência para quem consome
- reduzir carga no servidor

Mesmo quando você não configura cache ativamente, ele pode existir. Navegadores, clientes HTTP e proxies podem armazenar respostas dependendo dos headers. Por isso, entender cache é parte de evitar comportamento inesperado.

## O que significa uma resposta ser cacheável

Uma resposta cacheável é uma resposta que pode ser guardada e reutilizada para responder requisições futuras equivalentes.

O ponto importante é que cache não é apenas performance. Cache também é correção. Se você cacheia algo que não deveria ser cacheado, você pode entregar dados errados ou dados de outro usuário.

Por isso, em APIs, cache quase sempre precisa de regras explícitas.

## Cache em três lugares

### Cache no cliente

O próprio cliente pode guardar respostas. Isso é comum em navegadores, apps e bibliotecas que implementam cache.

### Cache em intermediários

Se houver reverse proxy, gateway ou CDN, eles podem armazenar respostas e responder sem envolver o backend.

### Cache no servidor

O servidor pode usar cache interno em memória ou em banco para acelerar processamento. Isso não é cache HTTP propriamente dito, mas é comum que ele seja usado junto.

Nesta seção o foco é cache HTTP, porque ele envolve comportamento entre sistemas, não apenas dentro da aplicação.

## Cabeçalhos que controlam cache

### Cache-Control

Esse é o principal cabeçalho para controlar cache. Ele define diretivas que dizem se pode cachear e por quanto tempo.

Algumas diretivas úteis para entender o básico:

- `no-store`: não guarde essa resposta em nenhum cache
- `no-cache`: pode guardar, mas precisa revalidar antes de reutilizar
- `max-age=60`: a resposta pode ser reutilizada por 60 segundos
- `private`: só o cliente final deve cachear, intermediários não
- `public`: qualquer cache pode armazenar, inclusive intermediários

Você não precisa decorar todas agora. O essencial é perceber que existe diferença entre permitir cache em qualquer lugar e permitir cache apenas no cliente.

### Expires

É uma forma mais antiga de indicar até quando a resposta é válida, usando data. Em APIs modernas, Cache-Control costuma ser preferível, mas você ainda vai ver Expires em sistemas legados e algumas configurações.

## Revalidação: cache sem entregar coisa velha

O mecanismo mais seguro e comum para não entregar conteúdo desatualizado é revalidar.

A ideia é: o cliente guarda uma resposta, mas antes de reutilizar ele pergunta ao servidor se aquela versão ainda é válida. Se ainda for, o servidor responde sem corpo, economizando banda.

Os cabeçalhos mais comuns para isso são:

- `ETag`, que identifica uma versão de conteúdo
- `If-None-Match`, que o cliente manda para perguntar se ainda é a mesma versão

Se o conteúdo não mudou, o servidor responde 304. Se mudou, responde 200 com o novo corpo.

Esse mecanismo é bem comum porque dá economia sem sacrificar atualização.

## Cache e segurança em APIs

Aqui está um cuidado importante.

Respostas personalizadas por usuário, que dependem de autenticação, geralmente não devem ser cacheadas por intermediários. Caso contrário, existe risco de uma resposta de um usuário ser entregue para outro.

Por isso, é comum ver:

- `Cache-Control: private` para permitir cache apenas no cliente
- ou `Cache-Control: no-store` para proibir qualquer cache em dados sensíveis

Em APIs, a regra prática para começar é:

- cacheie apenas o que é realmente público e seguro
- seja explícito quando não quer cache

## Exemplo

### Exemplo 1: resposta pública com validade curta

Uma lista pública de cursos pode ser cacheada por um minuto.

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=60

{
  "items": [
    { "id": "curso_01", "titulo": "Backend com Python" },
    { "id": "curso_02", "titulo": "Fundamentos de Redes" }
  ]
}
````

Nesse caso, clientes e intermediários podem reutilizar a resposta por 60 segundos sem perguntar de novo ao backend.

### Exemplo 2: revalidação com ETag

Primeira resposta:

```http
HTTP/1.1 200 OK
Content-Type: application/json
ETag: "v3"
Cache-Control: private, max-age=0

{
  "id": "curso_01",
  "titulo": "Backend com Python"
}
```

O cliente guarda. Na próxima vez, ele pede revalidação:

```http
GET /cursos/curso_01 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
If-None-Match: "v3"
```

Se nada mudou, o servidor responde:

```http
HTTP/1.1 304 Not Modified
ETag: "v3"
```

Isso reduz tráfego sem correr risco de entregar conteúdo antigo.

### Exemplo 3: dados sensíveis sem cache

Um endpoint que devolve dados pessoais deve evitar cache:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{
  "id": "user_01",
  "nome": "Ana",
  "email": "ana@exemplo.com"
}
```

Aqui a regra é clara: não guarde.

## Problemas clássicos de iniciante

* Permitir cache em resposta que depende de usuário, gerando vazamento.
* Não configurar nada e depois estranhar respostas antigas por causa de cache em intermediários.
* Usar cache longo em dados que mudam com frequência e criar inconsistência percebida pelo usuário.
* Tentar cachear cedo demais sem ter clareza do que é público e do que é privado.

## Checklist rápido

* Eu sei explicar cache como reutilização de respostas para reduzir latência e carga.
* Eu sei que cache pode existir no cliente e em intermediários.
* Eu sei que `Cache-Control` define as regras principais.
* Eu sei que `ETag` e `If-None-Match` permitem revalidar e receber 304 quando não mudou.
* Eu sei que dados sensíveis devem evitar cache, muitas vezes com `no-store`.

## Fontes 

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Caching](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Caching)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cache-Control](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cache-Control)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/ETag](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/ETag)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/If-None-Match](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/If-None-Match)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/304](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/304)

[https://www.rfc-editor.org/rfc/rfc9111.html](https://www.rfc-editor.org/rfc/rfc9111.html)



---
# 3.9 Cookies, sessões e APIs

HTTP é stateless por padrão. Isso significa que cada requisição chega ao servidor como uma mensagem independente. Para muitas APIs, isso é ótimo: o cliente envia tudo o que o servidor precisa em cada chamada e pronto.

Mas existem cenários em que o servidor precisa reconhecer que várias requisições pertencem ao mesmo usuário ou ao mesmo navegador, sem exigir que o cliente reenviar credenciais completas toda vez. É aí que entram cookies e sessões.

A ideia desta seção é entender o que cada coisa é, por que existe e como isso se encaixa em APIs.

## O que é um cookie

Um cookie é um pequeno pedaço de texto que o servidor pede para o cliente guardar e enviar de volta nas próximas requisições.

O fluxo básico é:

- o servidor envia `Set-Cookie` na resposta
- o cliente guarda o cookie
- nas próximas requisições para o mesmo domínio, o cliente envia `Cookie` automaticamente

O ponto prático: cookie é um mecanismo do lado do cliente para carregar um identificador ou informação curta de volta para o servidor.

Em navegadores isso acontece de forma automática, o que explica por que cookies são tão usados em aplicações web tradicionais.

## O que é uma sessão

Sessão é um estado mantido no servidor que representa um usuário logado ou um contexto de navegação.

O servidor cria uma sessão e associa a ela um identificador. Esse identificador é o que costuma ser enviado ao cliente, frequentemente dentro de um cookie.

Uma forma simples de pensar:

- cookie é o que o cliente carrega
- sessão é o que o servidor guarda

Em vez de colocar dados sensíveis no cookie, o cookie carrega apenas um id. O servidor usa esse id para encontrar a sessão e descobrir quem é o usuário e quais permissões ele tem.

## Por que cookie e sessão aparecem juntos

Porque eles se complementam.

O servidor precisa de um jeito de reconhecer o cliente entre requisições. O navegador precisa de um jeito padronizado de enviar esse reconhecimento automaticamente.

O cookie carrega o identificador. A sessão guarda o estado.

## Como isso se aplica em APIs

Aqui depende muito de quem é o cliente.

### Quando faz sentido usar cookies e sessão

É comum em APIs usadas por navegador, especialmente quando a API e o front-end estão no mesmo domínio ou em domínios controlados pelo mesmo time.

O motivo é simples: o navegador já tem suporte natural a cookies e envia de volta automaticamente, o que facilita login e navegação.

### Quando isso pode ser ruim ou limitante

Em APIs consumidas por apps mobile, integrações entre sistemas ou scripts, o modelo de cookie e sessão pode ser menos conveniente.

Nesses cenários, é mais comum o cliente enviar um token explicitamente em cada requisição, porque isso dá mais controle e não depende de comportamento de navegador.

Mesmo sem entrar em detalhes de tokens agora, o ponto importante é entender que existem dois estilos comuns:

- manter estado no servidor e identificar o cliente via cookie
- manter a API mais stateless e enviar credenciais por requisição

## Cookies e segurança

Cookies podem ser usados de forma insegura se você não controlar bem como são enviados.

Dois atributos importantes que você vai ver com frequência:

- `HttpOnly`: impede acesso ao cookie via JavaScript, reduzindo risco de roubo por scripts
- `Secure`: garante que o cookie só é enviado em HTTPS

Outro ponto importante é que cookies são enviados automaticamente pelo navegador. Isso traz conveniência, mas também abre espaço para ataques de requisições feitas de forma indireta se não houver proteção adequada.

Você não precisa dominar isso agora, mas precisa saber que cookie é um mecanismo sensível e exige cuidado.

## Exemplo

### Exemplo 1: servidor criando um cookie de sessão

O cliente envia credenciais para login:

```http
POST /login HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json
Accept: application/json

{
  "email": "ana@exemplo.com",
  "senha": "********"
}
````

O servidor valida e cria uma sessão. Na resposta ele envia um cookie com o id da sessão:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session_id=sess_123; HttpOnly; Secure

{
  "status": "ok"
}
```

A partir daí, o navegador passa a enviar automaticamente:

```http
GET /inscricoes/minhas HTTP/1.1
Host: api.exemplo.com
Accept: application/json
Cookie: session_id=sess_123
```

O servidor usa `sess_123` para encontrar a sessão e identificar o usuário.

### Exemplo 2: por que um cookie não deve carregar dados sensíveis

Se você colocasse algo como email e permissões diretamente no cookie, você aumentaria risco, porque o cookie fica armazenado no cliente e pode vazar por múltiplos caminhos.

A abordagem comum é manter dados sensíveis no servidor e usar o cookie apenas como identificador.

## Problemas clássicos de iniciante

* Guardar dados sensíveis no cookie em vez de usar id de sessão.
* Não usar HTTPS e, ainda assim, depender de cookies de autenticação.
* Esquecer de configurar `HttpOnly` e permitir acesso por JavaScript em casos em que isso não é necessário.
* Confundir sessão com cookie e achar que são a mesma coisa.
* Ter o backend em um domínio e o front-end em outro e estranhar que o cookie não está sendo enviado por padrão.

## Checklist rápido

* Eu sei definir cookie como dado armazenado no cliente e enviado automaticamente.
* Eu sei definir sessão como estado armazenado no servidor.
* Eu entendo por que cookie costuma carregar apenas um id de sessão.
* Eu sei que `Set-Cookie` cria cookie e `Cookie` envia cookie de volta.
* Eu sei que cookies de autenticação exigem HTTPS e atributos de segurança.

## Fontes 
[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Set-Cookie](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Set-Cookie)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cookie](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cookie)

[https://developer.mozilla.org/pt-BR/docs/Web/Security/Types_of_attacks](https://developer.mozilla.org/pt-BR/docs/Web/Security/Types_of_attacks)

[https://www.rfc-editor.org/rfc/rfc6265](https://www.rfc-editor.org/rfc/rfc6265)
