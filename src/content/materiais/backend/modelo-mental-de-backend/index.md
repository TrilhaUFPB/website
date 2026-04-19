---
title: Modelo Mental de Backend
description: Visão geral do que significa o 'backend'
category: Backend
order: 2
---

# 1.1 Cliente–Servidor: responsabilidades e limites

Backend existe porque, na Web, quase tudo acontece como uma **conversa entre duas partes**:

* o **cliente**, que inicia a interação (ex.: navegador, app mobile, outra API)
* o **servidor**, que recebe a solicitação, executa o trabalho necessário e devolve uma resposta

Esse modelo é a base de como páginas e APIs funcionam no dia a dia: você clica, envia um formulário, faz uma busca  e uma requisição é enviada para algum servidor, que responde com dados ou com uma página. ([MDN Web Docs][1])

## O que é cliente e o que é servidor

### Cliente

É o lado que:

* **interage com o usuário**
* **inicia requisições** (pedidos) para obter algo do servidor
* **mostra o resultado** (tela, mensagem, lista, erro)

Na prática, “cliente” costuma ser o navegador, mas também pode ser um app mobile, um script, ou até outro serviço.

### Servidor

É o lado que:

* **recebe requisições**
* **processa a lógica necessária**
* **acessa dados** (quando preciso)
* **retorna uma resposta**

Servidor não é apenas um computador: normalmente existe um **software servidor** rodando, responsável por responder às requisições (por exemplo, um servidor web). ([MDN Web Docs][2])

## Responsabilidades: o que pertence a cada lado

Um erro comum de quem está começando é achar que cliente e servidor fazem a mesma coisa. Não fazem. Eles têm responsabilidades diferentes  e isso é intencional.

### Responsabilidades do cliente

Foco em **experiência** e **apresentação**:

* Coletar entradas do usuário (formulário, cliques, navegação)
* Validar o mínimo por UX (campos vazios, formato de e-mail, máscara)
* Exibir estados e mensagens (carregando, sucesso, falha, tentar novamente)
* Organizar o que veio do servidor para mostrar na tela

### Responsabilidades do servidor

Foco em **garantias** e **consistência**:

* Aplicar validações definitivas (o que é aceito ou rejeitado de verdade)
* Implementar regras de negócio (o que pode, quando pode, com quais condições)
* Persistir e consultar dados (banco de dados, cache, etc.)
* Retornar respostas previsíveis (sucesso vs erro, com informação útil)

> O cliente melhora a experiência.
> O servidor garante a regra.

## Limites do modelo cliente–servidor

Entender os limites evita frustrações e te dá maturidade técnica desde cedo.

### 1) A rede falha

Entre cliente e servidor existe rede: latência, timeout, perda de conexão e instabilidade acontecem. Por isso o cliente precisa saber lidar com “tentar novamente”, “aguarde”, “não foi possível conectar”, etc. ([MDN Web Docs][3])

### 2) O cliente não é confiável

O usuário controla o ambiente do cliente. Mesmo que exista validação na interface, alguém pode enviar uma requisição na mão (sem passar pela tela). Portanto:

* validação no cliente é **conveniência**
* validação no servidor é **obrigação**

### 3) Estado não “vem de graça”

No fluxo tradicional, cada requisição é um evento separado. Se você quer lembrar algo (ex.: sessão, login), isso exige mecanismos adicionais (cookies/tokens), que serão vistos mais à frente. ([MDN Web Docs][4])

### 4) No fluxo tradicional, o servidor responde a pedidos

No modelo clássico, o cliente inicia a requisição e espera resposta; o servidor responde a esse pedido. (Quando você precisa de comunicação contínua/tempo real, entram outros estilos, que aparecem na Parte II.) ([MDN Web Docs][5])

## Exemplo guiado: inscrição no Trilha

Agora que o conceito está claro, vamos aplicar em um cenário simples e realista.

### Cenário

Uma pessoa quer **se inscrever no Trilha** preenchendo:

* nome
* e-mail
* curso/período (opcional, dependendo do seu processo)

### Fluxo (passo a passo)

```text
1) Usuário preenche o formulário de inscrição no site/app
2) Cliente faz validações básicas (UX)
3) Cliente envia uma requisição para o servidor (pedido de inscrição)
4) Servidor valida de verdade + aplica regras do programa
5) Servidor registra a inscrição (persistência)
6) Servidor retorna sucesso (ou erro)
7) Cliente mostra o resultado para o usuário
```

### O que fica no cliente (e por quê)

* Checar se campos obrigatórios estão vazios
* Avisar que o e-mail está mal formatado (ex.: sem @)
* Mostrar “enviando…” e bloquear o botão para evitar múltiplos cliques
* Mostrar mensagem de sucesso/erro de forma amigável

### O que fica no servidor (e por quê)

* Confirmar se o e-mail é válido de verdade (regras completas)
* Impedir duplicidade: “já existe inscrição com esse e-mail”
* Verificar regras do processo (ex.: período de inscrição aberto, número de vagas, critérios mínimos)
* Registrar a inscrição e retornar um identificador/resultado

> Regra de negócio no cliente vira regra “de mentirinha”.
> Regra de negócio no servidor vira regra “de verdade”.

### Três resultados comuns (o que o cliente deve mostrar)

#### (1) Sucesso

* Servidor aceita e registra
* Cliente mostra confirmação e próximos passos

#### (2) Erro de validação

* Ex.: faltou nome
* Cliente mostra: “Preencha seu nome para continuar”
* Mesmo assim, o servidor também precisa rejeitar, caso uma requisição chegue incompleta

#### (3) Conflito / duplicidade

* Ex.: e-mail já cadastrado
* Cliente mostra: “Já existe inscrição com esse e-mail. Quer recuperar/atualizar?”

---

## Checklist rápido (para você revisar seu próprio entendimento)

* [ ] Eu consigo explicar, em uma frase, a diferença entre cliente e servidor.
* [ ] Eu sei dizer por que validação no cliente não é suficiente.
* [ ] Eu consigo listar pelo menos 3 falhas reais de rede e o impacto na experiência.
* [ ] Eu consigo justificar por que o servidor é a “fonte de verdade”.

## Fontes (para leitura)

**Leituras principais (fundamentos):** ([MDN Web Docs][1])

```text
https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Session
https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server
https://developer.mozilla.org/pt-BR/docs/Web/HTTP
```

**Leitura complementar (para reforçar “lado servidor” e por que ele existe):** ([MDN Web Docs][6])

```text
https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction
https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps
```

[1]: https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview?utm_source=chatgpt.com "Visão geral do cliente-servidor - MDN Web Docs - Mozilla"
[2]: https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server?utm_source=chatgpt.com "O que é um servidor web (web server)? - MDN Web Docs"
[3]: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Session?utm_source=chatgpt.com "Uma típica sessão HTTP - MDN Web Docs - Mozilla"
[4]: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview?utm_source=chatgpt.com "Uma visão geral do HTTP - MDN Web Docs"
[5]: https://developer.mozilla.org/pt-BR/docs/Web/HTTP?utm_source=chatgpt.com "HTTP - MDN Web Docs - Mozilla"
[6]: https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction?utm_source=chatgpt.com "Introdução ao lado servidor - Aprendendo desenvolvimento web"

---

# 1.2 Onde o backend roda (processo, porta, host)

Na seção anterior, vimos que o servidor é o responsável por processar as regras e devolver respostas. Mas, para que ele consiga fazer isso, ele não pode ser apenas um código parado no disco. Ele precisa virar um programa ativo, ocupando um lugar no sistema operacional e na rede.

Quando você coloca um backend no ar, você está lidando com três conceitos físicos que permitem que aquela "conversa" aconteça:

* **processo**: o programa em execução (o código vivo)
* **host**: “onde” ele está acessível (o endereço da máquina)
* **porta**: “qual serviço” dentro daquele endereço (o canal de escuta)

Se você dominar esses três termos, você resolve a maior parte dos problemas clássicos de infraestrutura inicial, como “não abre no navegador”, “porta em uso” ou “funciona no meu PC mas não no celular”.

## O que significa quando o backend está rodando

### Processo

Um **processo** é uma instância de um programa em execução no sistema operacional.

No contexto de backend, o seu código (rotas e lógica) normalmente é carregado por um **programa servidor** (por exemplo, um servidor HTTP/ASGI) que:

* inicia a aplicação
* fica escutando requisições
* processa cada requisição e devolve respostas

Em outras palavras: backend no ar significa, na prática, que **existe um processo ativo** responsável por atender requests.

### Servidor pode significar duas coisas

No dia a dia, a palavra *servidor* pode se referir tanto a:

* a **máquina** (física/virtual) onde o sistema roda
* o **programa servidor** (o processo) que está rodando naquela máquina

Essa ambiguidade é comum e você vai ouvir os dois usos. O importante é aprender a reconhecer pelo contexto.

## Host e porta: onde o processo “escuta”

### Porta

A **porta** serve para diferenciar serviços dentro de uma mesma máquina.

Pense assim:

* o **host** te leva até a máquina
* a **porta** te leva até o serviço/processo certo *dentro* dela

Isso permite que a mesma máquina rode várias coisas ao mesmo tempo (por exemplo: um backend, um banco de dados, um painel de admin), cada uma em sua porta.

### Host

O **host** é o endereço pelo qual o servidor pode ser acessado. Ele pode ser:

* um **domínio** (ex.: `api.meuprojeto.com`)
* um **IP** (ex.: `192.168.0.10`)
* um endereço local (ex.: `127.0.0.1`)

Em desenvolvimento, dois casos aparecem o tempo todo:

* `127.0.0.1` / `localhost`: acessível **apenas na sua máquina**
* `0.0.0.0`: significa que o servidor vai escutar em **todas as interfaces de rede** (isso abre a possibilidade de acesso externo, dependendo da rede e do firewall)

## Como ler host e porta em um endereço

Considere este endereço:

```text
http://127.0.0.1:8000
```

Interpretação:

* `http` → protocolo (você aprofunda no tópico 3)
* `127.0.0.1` → host
* `8000` → porta

Se a porta não aparece no endereço, normalmente é porque existe uma **porta padrão** para aquele protocolo (isso fica mais intuitivo depois, quando você estudar HTTP/HTTPS).

## Limites e problemas clássicos (que você vai ver na prática)

### 1) “Abri no navegador e não carregou”

Na maioria das vezes, é um destes casos:

* o processo **não está rodando**
* você está acessando **host/porta errados**
* o processo está rodando, mas está “escutando” em outro endereço do que você imagina

### 2) “Porta já está em uso”

Uma porta só pode ser ocupada por um processo por vez.

Se você tentar subir o backend na porta `8000` e já existir outro processo usando `8000`, o servidor não consegue iniciar daquele jeito. Soluções comuns:

* encerrar o processo antigo
* trocar a porta

### 3) “Funciona no meu PC, mas não no celular (mesma rede)”

Isso costuma acontecer quando você está usando `127.0.0.1`, que significa “só a própria máquina”.

Para outro dispositivo acessar, normalmente você precisa:

* fazer o servidor escutar em `0.0.0.0`
* acessar usando o **IP real** do seu computador na rede (ex.: `192.168.x.x`)
* garantir que firewall/rede permitem a conexão
* Iniciar o processo do servidor

### 4) “Eu confundi máquina com programa servidor”

Você pode ter a máquina ligada e acessível, mas o **processo do servidor** (programa) pode não estar rodando, pode ter caído, ou pode estar escutando em outra porta.

## Exemplo na prática

Agora vamos aplicar os conceitos em um cenário simples.

### Cenário

Você está construindo uma pequena API de lista de tarefas para testar no navegador:

* listar tarefas
* criar uma tarefa
* marcar como concluída

### O que você espera ver quando sobe o backend

Quando você inicia o servidor em desenvolvimento, é comum aparecer no terminal algo como:

```text
Uvicorn running on http://127.0.0.1:8000
```

> Uvicorn é um servidor web ASGI, feito em python e com o objetivo de hospedar o HTTP 
>em Frameworks como FastAPI (que iremos utilizar mais para frente)

Essa linha te dá as três informações essenciais:

* existe um **processo** rodando (o servidor)
* ele está acessível no **host** `127.0.0.1`
* e na **porta** `8000`

### Testando no navegador (mesma máquina)

Se você abrir no navegador:

```text
http://127.0.0.1:8000
```

o navegador (cliente) vai enviar uma requisição para exatamente esse host e porta e você consegue validar se o processo está respondendo.


## Checklist rápido (para depurar sem sofrer)

* [ ] O processo do servidor está rodando (terminal não encerrou com erro)?
* [ ] Eu sei qual host e porta ele está usando ?
* [ ] Eu estou acessando exatamente o mesmo host e porta no navegador?
* [ ] Se deu “porta em uso”, eu parei o processo antigo ou troquei a porta?

## Fontes (para leitura)

**MDN (fundamentos e glossário):**

```text
https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server
https://developer.mozilla.org/pt-BR/docs/Glossary/Port
https://developer.mozilla.org/pt-BR/docs/Glossary/IP_Address
https://developer.mozilla.org/pt-BR/docs/Glossary/Origin
https://developer.mozilla.org/pt-BR/docs/Web/API/URL
https://developer.mozilla.org/pt-BR/docs/Web/API/URL/host
https://developer.mozilla.org/pt-BR/docs/Web/API/URL/hostname
https://developer.mozilla.org/pt-BR/docs/Web/API/URL/port
```

---

# 1.3 Backend como produto: API como contrato

Ter um servidor rodando e escutando em uma porta é apenas a parte técnica da conexão. O problema real começa quando o cliente tenta falar com ele: que formato de dados ele deve enviar? O que ele vai receber de volta? O que acontece se der erro?

Se essas regras não estiverem claras, a integração vira um jogo de adivinhação.

Por isso, quando você constrói um backend, o foco muda. Você não está apenas escrevendo endpoints; você está entregando um produto (a API) que precisa ser previsível para quem consome. Para garantir essa estabilidade, tratamos a API como um **contrato**.

Contrato significa que existe um acordo explícito sobre:
- o que o cliente pode enviar
- o que o servidor vai responder
- quais erros podem acontecer e como aparecem
- o que é considerado compatível quando a API evolui

## O que significa API ser um contrato

Um contrato de API é o conjunto de regras que permite que dois lados diferentes trabalhem juntos sem precisar conhecer a implementação interna um do outro.

### O que um contrato normalmente inclui

- Endpoints disponíveis e seus objetivos
- Formato das entradas
- Formato das saídas
- Regras de validação e invariantes
- Códigos de status e comportamento em erro
- Regras de autenticação e autorização, quando aplicável

### Por que isso é importante

Sem um contrato claro, o cliente precisa adivinhar como integrar, e qualquer mudança pequena pode quebrar fluxos existentes.

Com contrato, o cliente consegue:
- implementar com confiança
- tratar erros de forma previsível
- atualizar com segurança quando houver mudanças compatíveis

## Backend como produto

Quando você trata o backend como produto, você começa a se preocupar com coisas que iniciantes muitas vezes ignoram, mas que definem a qualidade da API.

### Características de um backend que se comporta como produto

- Clareza: nomes, formatos e regras fáceis de entender
- Consistência: padrões repetidos em toda a API
- Estabilidade: mudanças controladas e compatíveis quando possível
- Observabilidade: capacidade de entender falhas e comportamento em produção
- Operação: previsibilidade sob carga, latência e disponibilidade

## Limites e problemas clássicos (quando o contrato não existe ou não é respeitado)

### 1) Mudanças quebram clientes

Se você muda um campo, renomeia uma rota ou altera um formato de resposta sem planejamento, integrações existentes podem parar de funcionar.

Isso é um problema típico quando a API é tratada como extensão informal do código, em vez de contrato.

### 2) Erros viram adivinhação

Quando erros não seguem um padrão, o cliente não sabe como tratar.
Exemplos de problemas comuns:
- mensagens diferentes para o mesmo erro
- campos de erro inconsistentes
- uso imprevisível de códigos de status

### 3) Acoplamento indevido com detalhes internos

Quando o contrato expõe a estrutura interna do sistema, qualquer refatoração vira risco.
Isso costuma acontecer quando respostas refletem diretamente tabelas do banco ou estruturas internas do código.

### 4) Falta de estratégia de evolução

APIs mudam com o tempo. Novos campos, novas regras, novos fluxos.
Sem estratégia, qualquer evolução vira quebra ou duplicação descontrolada.

## Exemplo guiado: API de catálogo de cursos

Agora vamos aplicar a ideia de contrato com um exemplo simples e fácil de visualizar.
> O formato das requisições, como funciona os métodos HTTP e o que são os JSONs será trabalhado mais para frente. Portanto esses exemplos são apenas para entendimento geral do por que a APIs devem ser tratadas como contratos e por isso é recomendado rever esses exemplos após entender melhor os conceitos

### Cenário

Um site exibe um catálogo de cursos e módulos.
O front-end precisa listar cursos e mostrar detalhes de um curso específico.

### Parte 1: contrato de resposta previsível

O cliente precisa saber exatamente o que esperar.

Exemplo de resposta para listar cursos:

```http
EXEMPLO DE REQUISIÇÃO FEITA PELO CLIENTE:

GET /cursos HTTP/1.1
Accept: application/json
````

```http
EXEMPLO DE RESPOSTA FEITA PELO SERVIDOR:

HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "id": "curso_01",
      "titulo": "Backend com Python",
      "nivel": "iniciante"
    },
    {
      "id": "curso_02",
      "titulo": "Fundamentos de Redes",
      "nivel": "iniciante"
    }
  ]
}
```

Esse contrato diz:

* existe um campo `items`
* cada item tem `id`, `titulo`, `nivel`
* o conteúdo é JSON
* o status 200 indica sucesso

### Parte 2: contrato de erro consistente

Agora um caso de erro: o cliente pede um curso que não existe.

```http
EXEMPLO DE REQUISIÇÃO FEITA PELO CLIENTE:

GET /cursos/curso_inexistente HTTP/1.1
Accept: application/json
```

Resposta de erro com padrão fixo:

```http
EXEMPLO DE RESPOSTA FEITA PELO SERVIDOR:

HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "CURSO_NAO_ENCONTRADO",
  "message": "O curso solicitado não existe.",
  "details": {
    "id": "curso_inexistente"
  }
}
```

Mesmo que você mude a implementação interna, o cliente continua funcionando porque o contrato permanece estável.

### Parte 3: evolução do contrato sem quebrar o cliente

Você quer adicionar o campo `carga_horaria`.

Mudança compatível:

* adicionar um novo campo opcional normalmente não quebra clientes existentes

```json
{
  "id": "curso_01",
  "titulo": "Backend com Python",
  "nivel": "iniciante",
  "carga_horaria": 24
}
```

Mudanças com alto risco de quebra:

* renomear `titulo` para `nome`
* trocar `items` por `data`
* mudar tipos, por exemplo número para string
* mudar semântica, por exemplo `nivel` passar a ter valores diferentes

## Checklist rápido (para revisar se sua API está sendo tratada como contrato)

* [ ] Eu consigo descrever entradas e saídas sem falar de implementação interna.
* [ ] A API tem padrões consistentes de sucesso e erro.
* [ ] Mudanças planejadas evitam quebra de clientes.
* [ ] Eu sei diferenciar mudanças compatíveis e mudanças que quebram contrato.

## Fontes

Leituras principais:

```text
[MAPI] Mastering API Architecture (O'Reilly)
  Parte I (Designing, Building, and Testing APIs)
    Capítulo 1: Design, Build, and Specify APIs
      - Summary (Key takeaways): consistência para consumidores; OpenAPI como forma de compartilhar estrutura; versionamento como decisão de produto
      - Seção: Specifying REST APIs Using OpenAPI (como usar especificação para documentar e alinhar expectativas de request/response)
      - Seções: Code Generation; OpenAPI Validation (uso prático do OpenAPI para automatizar e validar o contrato)

[LAPI] Learning API Styles (O'Reilly)
  Capítulo 5: REST
    - Seção: OpenAPI Specification (API specification como contract; OAS como padrão para documentar APIs HTTP; ferramentas e uso em frameworks)
  Capítulo 2: Design Patterns
    - Seção: API Versioning (estratégias de versionamento, incluindo path, query parameter e header; impactos em debugging e roteamento)
```

---

# 1.4 Separação entre transporte, regra de negócio e persistência

Para manter o contrato da API estável (como vimos na seção anterior), o código interno precisa ser organizado. Se a lógica de recepção, as regras de validação e o acesso ao banco estiverem misturados no mesmo bloco, fica quase impossível evoluir o sistema sem quebrar acidentalmente o que foi combinado com o cliente.

Por isso, por baixo dos panos, dividimos o processamento de uma requisição em pelo menos três preocupações distintas:

* **Transporte**: como a requisição chega e como a resposta volta (HTTP, headers, status code, JSON).
* **Regra de negócio**: o que o sistema realmente decide e garante (validações definitivas, permissões, regras do domínio).
* **Persistência**: como os dados são lidos e gravados (banco, consultas, transações, cache).

Separar essas partes é o que permite que você troque o banco de dados sem reescrever a regra de negócio, ou adicione um novo endpoint sem duplicar a lógica de validação.

## O que é cada parte na prática

### Transporte

É a camada que lida com o mundo externo. Ela responde perguntas como:

* Qual rota foi chamada?
* Qual método HTTP foi usado?
* Como ler o corpo da requisição?
* Que status code devolver?
* Como formatar a resposta em JSON?

Ela não deveria decidir regras do domínio. O papel dela é traduzir o mundo HTTP para uma chamada interna e traduzir o resultado interno para HTTP de volta.

### Regra de negócio

É onde ficam as decisões que definem o comportamento do produto, por exemplo:

* pode se inscrever fora do período?
* pode se inscrever duas vezes com o mesmo e-mail?
* existe limite de vagas?
* o usuário tem permissão para fazer isso?

Essa camada deve ser independente do transporte. A mesma regra deveria funcionar mesmo que amanhã você troque HTTP por outro estilo ou use a mesma lógica em uma fila de eventos.

### Persistência

É a parte que fala com o armazenamento:

* consultar dados por id
* verificar existência
* salvar uma entidade
* garantir consistência (por exemplo, transações)

Persistência não deveria conter regra de negócio. Ela deve expor operações de leitura e escrita e deixar as decisões para a camada de regra.

## Por que separar melhora o seu backend

### 1) Você evita duplicar regra

Se a regra está na rota HTTP, você tende a copiar e colar quando surgir outra rota parecida. Isso cria inconsistência.

### 2) Você testa com menos esforço

Se a regra de negócio depende de HTTP, testar exige simular requisições. Quando a regra fica separada, você testa como uma função normal.

### 3) Você reduz acoplamento com o banco

Quando a rota já monta SQL ou já conhece o formato das tabelas, qualquer mudança no banco vira uma mudança grande na API.

### 4) Você deixa o código mais legível para iniciantes

Cada parte passa a ter uma pergunta clara:

* transporte: como traduzir HTTP para chamadas internas?
* regra: o que é permitido e o que deve acontecer?
* persistência: como ler e gravar isso?

## Limites e problemas clássicos (quando tudo fica misturado)

### 1) Rotas viram um bloco gigante

Um único endpoint passa a fazer parsing de request, validação de regra, query no banco, formatação de resposta e tratamento de erro, tudo junto.

### 2) Mudanças simples ficam arriscadas

Adicionar uma regra nova pode quebrar a resposta HTTP sem você perceber, porque está tudo no mesmo lugar.

### 3) Você não consegue reaproveitar lógica

Se amanhã você quiser criar um job, um script ou uma fila para executar o mesmo processo, você não consegue sem reescrever.

## Exemplo: criar uma inscrição para um evento

Vamos ver como essa teoria funciona na prática. Imagine um cenário onde existe um endpoint para criar inscrição em um evento presencial.

Seu objetivo é receber os dados do participante, aplicar as regras (como checar se o evento existe e se não há duplicidade) e registrar a inscrição. Se fizéssemos tudo junto, seria um código confuso. Separando, temos um fluxo claro:

### Visão geral do fluxo

```text
HTTP request
  ↓
Transporte (rota HTTP)
  ↓
Regra de negócio (service)
  ↓
Persistência (repository)
  ↓
Retorno para o transporte
  ↓
HTTP response
```

### 1) Transporte: a rota só traduz HTTP para uma chamada interna

A rota deve:

* ler o payload vindo do cliente
* chamar a regra de negócio
* devolver a resposta

Ela não deve:

* decidir regras do domínio
* falar diretamente com banco

```python
# transporte (rota HTTP)
@app.post("/inscricoes")
def criar_inscricao(payload: dict):
    service = InscricaoService(repo=InscricaoRepository())

    inscricao = service.criar_inscricao(
        nome=payload["nome"],
        email=payload["email"],
        evento_id=payload["evento_id"],
    )

    return inscricao
```

### 2) Regra de negócio: o service decide o que pode acontecer

O service deve:

* aplicar regras e validar invariantes do domínio
* decidir se cria ou rejeita a inscrição

Ele não deve:

* conhecer detalhes de SQL
* montar resposta HTTP (status code, headers, etc.)

```python
# regra de negócio (service)
class InscricaoService:
    def __init__(self, repo):
        self.repo = repo

    def criar_inscricao(self, nome: str, email: str, evento_id: str):
        if not self.repo.evento_existe(evento_id):
            raise RegraDeNegocio("EVENTO_NAO_ENCONTRADO")

        if self.repo.ja_inscrito(email=email, evento_id=evento_id):
            raise RegraDeNegocio("INSCRICAO_DUPLICADA")

        inscricao = self.repo.salvar_inscricao(
            nome=nome,
            email=email,
            evento_id=evento_id,
        )

        return inscricao
```

### 3) Persistência: o repository esconde o armazenamento

O repository deve:

* consultar e salvar dados
* esconder detalhes do banco

Ele não deve:

* tomar decisões de regra de negócio

```python
# persistência (repository)
class InscricaoRepository:
    def evento_existe(self, evento_id: str) -> bool:
        ...

    def ja_inscrito(self, email: str, evento_id: str) -> bool:
        ...

    def salvar_inscricao(self, nome: str, email: str, evento_id: str) -> dict:
        ...
```

### O que você deve observar neste exemplo

* A rota é curta e só encaminha.
* As regras estão concentradas no service.
* O repository é a única parte que conhece detalhes de persistência.
* Se você trocar o banco, você muda o repository e mantém o resto.
* Se você trocar o formato do HTTP, você muda a rota e mantém as regras.

## Checklist rápido (para revisar sua separação)

* [ ] A rota HTTP está pequena e faz só tradução e encaminhamento.
* [ ] As regras do domínio não dependem de HTTP, headers ou status code.
* [ ] A regra de negócio não conhece detalhes de SQL ou tabelas.
* [ ] A persistência não decide regras do produto.
* [ ] Existe um ponto claro onde validar regra e um ponto claro onde salvar dados.

## Fontes 

Leituras principais:

```text
[MAPI] Mastering API Architecture (O’Reilly)
- Introdução: From Tiered Architecture to Modeling APIs
- Part I (Designing, Building, and Testing APIs)
  - Chapter 1: Design, Build, and Specify APIs (visão de produtor/consumidor e estruturação de APIs)
```

complementar:

```text
[LAPI] Learning API Styles (O’Reilly)
- Chapter 3: TCP (base de conexão e modelo em camadas)
- Chapter 4: HTTP (mensagens, headers, request/response)
- Chapter 5: REST (uniform interface e mensagens auto descritivas, úteis para separar transporte do domínio)
```

FastAPI:

```text
[FAST] FastAPI
- Bigger Applications (organização do projeto e separação de responsabilidades):
  https://fastapi.tiangolo.com/tutorial/bigger-applications/
- Dependencies (injeção e composição de camadas, útil para services e repositories):
  https://fastapi.tiangolo.com/tutorial/dependencies/
- SQL (exemplos de persistência separada da rota):
  https://fastapi.tiangolo.com/tutorial/sql-databases/
```

# 1.5 Arquitetura em camadas (visão conceitual)

A necessidade de separar transporte, regras e persistência é clara, mas como fazer isso na estrutura das pastas e arquivos do projeto? Se cada desenvolvedor inventar seu próprio jeito de organizar essa divisão, o projeto vira uma colcha de retalhos difícil de entender.

A **Arquitetura em Camadas** é a resposta padrão para esse problema. Ela não é um conceito novo, é apenas a formalização da separação de responsabilidades em uma estrutura hierárquica clara.

A ideia central é simples: em vez de uma sequência única onde "tudo acontece misturado", o código é organizado em níveis (camadas), onde cada nível tem uma responsabilidade única e só conhece o que está imediatamente abaixo ou ao lado dele. Isso transforma a "intenção de separar" em "regra de organização".

## O que é arquitetura em camadas

Em camadas, você divide o backend em partes com responsabilidades diferentes. Uma divisão clássica (e suficiente para começar) é:

1. **Transporte (ou apresentação)**

* Recebe HTTP, extrai dados, valida o básico, chama o caso de uso e monta a resposta.
* Exemplo: handler, controller, router.

2. **Aplicação (casos de uso)**

* Orquestra o que precisa acontecer para cumprir um objetivo.
* Não decide formato HTTP, nem faz SQL direto. Ela coordena regras e dependências.

3. **Domínio (regras de negócio)**

* Onde ficam regras que definem o que é permitido ou não no sistema.
* Exemplo: validações de consistência, invariantes, decisões centrais.

4. **Infraestrutura (persistência e integrações)**

* Implementa detalhes de armazenamento e comunicação externa.
* Exemplo: banco de dados, cache, fila, serviços externos.

A regra mais importante é: **cada camada deve conhecer o mínimo possível das outras**. Normalmente, as dependências apontam para dentro: o domínio não depende de HTTP, nem de banco.

## O problema que isso resolve

### 1) Mudança segura

Você consegue trocar detalhes sem reescrever tudo. Exemplo: mudar de SQL para outro banco, ou trocar o framework web, sem mexer na regra de negócio.

### 2) Testes mais fáceis

Regras de negócio e casos de uso ficam testáveis sem precisar subir servidor, configurar rotas ou ter banco real.

### 3) Código mais legível para iniciantes e para o time

Você passa a saber onde procurar cada tipo de decisão:

* regra do negócio: domínio
* sequência do fluxo: aplicação
* formato HTTP: transporte
* SQL e integrações: infraestrutura

## O erro mais comum: camadas só de pasta

Criar pastas chamadas controller, service e repository não garante camadas.

Você só tem arquitetura em camadas de verdade quando:

* regras de negócio não dependem de HTTP
* regra do domínio não faz query no banco
* handler HTTP não contém regra complexa
* infraestrutura não decide regra de negócio

## Exemplo: reserva de sala de estudos

### Cenário

Uma aplicação permite reservar uma sala de estudos por um horário.

Regra do negócio (bem simples):

* Não pode haver duas reservas no mesmo horário para a mesma sala.
* Reserva precisa de sala_id, usuario_id, inicio, fim.

### Visão do fluxo por camadas

```text
HTTP (Transporte)
  -> Caso de uso (Aplicação)
      -> Regras (Domínio)
      -> Persistência (Infraestrutura)
  <- Resposta HTTP (Transporte)
```

A seguir, um esqueleto de como isso fica organizado.

### Camada 1: transporte (handler)

Responsabilidade: ler dados, validar o básico, chamar o caso de uso, transformar retorno em resposta.

```python
# transporte.py

def criar_reserva_http(request_json):
    # validação básica de formato (tipo e presença)
    sala_id = request_json.get("sala_id")
    usuario_id = request_json.get("usuario_id")
    inicio = request_json.get("inicio")
    fim = request_json.get("fim")

    if not sala_id or not usuario_id or not inicio or not fim:
        return {"status": 400, "body": {"error": "DADOS_INVALIDOS"}}

    try:
        reserva = criar_reserva_use_case(
            sala_id=sala_id,
            usuario_id=usuario_id,
            inicio=inicio,
            fim=fim,
        )
        return {"status": 201, "body": reserva}
    except RegraNegocioError as e:
        return {"status": 409, "body": {"error": e.codigo}}
```

O que observar:

* aqui não tem SQL
* aqui não tem regra de conflito em detalhes
* o handler apenas traduz HTTP para chamada de caso de uso e depois traduz o resultado

### Camada 2: aplicação (caso de uso)

Responsabilidade: coordenar passos e dependências.

```python
# aplicacao.py

def criar_reserva_use_case(sala_id, usuario_id, inicio, fim):
    reserva = Reserva.nova(
        sala_id=sala_id,
        usuario_id=usuario_id,
        inicio=inicio,
        fim=fim,
    )

    # consulta o repositório para decidir se pode prosseguir
    if reservas_repo.existe_conflito(sala_id=sala_id, inicio=inicio, fim=fim):
        raise RegraNegocioError(codigo="HORARIO_INDISPONIVEL")

    reservas_repo.salvar(reserva)

    return reserva.to_dict()
```

O que observar:

* o caso de uso define a sequência do fluxo
* ele usa domínio para criar a entidade e infraestrutura para consultar e salvar
* ele não sabe nada sobre HTTP

### Camada 3: domínio (regras)

Responsabilidade: concentrar a lógica que precisa permanecer correta independentemente do transporte e do banco.

```python
# dominio.py

class RegraNegocioError(Exception):
    def __init__(self, codigo):
        self.codigo = codigo

class Reserva:
    def __init__(self, sala_id, usuario_id, inicio, fim):
        self.sala_id = sala_id
        self.usuario_id = usuario_id
        self.inicio = inicio
        self.fim = fim

    @staticmethod
    def nova(sala_id, usuario_id, inicio, fim):
        # regra simples: início deve ser antes do fim
        if inicio >= fim:
            raise RegraNegocioError(codigo="INTERVALO_INVALIDO")
        return Reserva(sala_id, usuario_id, inicio, fim)

    def to_dict(self):
        return {
            "sala_id": self.sala_id,
            "usuario_id": self.usuario_id,
            "inicio": self.inicio,
            "fim": self.fim,
        }
```

O que observar:

* regra do tempo está aqui, não no handler
* domínio não depende de banco nem de HTTP

### Camada 4: infraestrutura (repositório)

Responsabilidade: conversar com banco, cache, fila, serviços externos.

```python
# infraestrutura.py

class ReservasRepoSQL:
    def existe_conflito(self, sala_id, inicio, fim):
        # aqui ficaria a query que detecta sobreposição de horários
        # SELECT 1 FROM reservas WHERE sala_id=? AND ...
        pass

    def salvar(self, reserva):
        # INSERT INTO reservas ...
        pass

reservas_repo = ReservasRepoSQL()
```

O que observar:

* infraestrutura implementa detalhes
* não decide regra de negócio, só executa operações

## Resultado prático

Com essa separação, fica claro onde cada decisão mora:

* erro de intervalo inválido: domínio
* erro de horário indisponível: aplicação (orquestra usando consulta)
* código HTTP 409: transporte
* query para detectar conflito: infraestrutura

Isso reduz o tipo de mudança que vira efeito cascata.

---

## Checklist rápido

* [ ] O handler HTTP não contém regra de negócio relevante.
* [ ] Regras do domínio não dependem de HTTP ou banco.
* [ ] Casos de uso orquestram o fluxo e chamam dependências.
* [ ] Eu consigo testar domínio e aplicação sem subir servidor.

## Fontes (para leitura)

Leituras principais:

```text
[MAPI] Mastering API Architecture (O'Reilly)
- Introdução: From Tiered Architecture to Modeling APIs (três camadas e modelo mental para processar requisições)
- Introdução: trecho do case study que descreve API Controller como ponto de entrada e roteamento interno

[LAPI] Learning API Styles (O'Reilly)
- Capítulo 5: REST
  - seção Origins of REST (motivação: consistência, escalabilidade e intermediários)
  - lista de REST constraints, item 5 Layered system (camadas como forma de encapsular comportamento e permitir gateways/proxies)
```

# 1.6 Anti-padrões comuns em backend iniciante

Mesmo com a arquitetura definida e o contrato estabelecido, é normal cair em armadilhas durante a implementação. O foco em "fazer funcionar logo" muitas vezes cria hábitos que, sem percebermos, quebram a separação de responsabilidades e tornam a API frágil.

Nesta seção, a ideia é criar um radar para esses problemas. Você vai conseguir reconhecer rapidamente quando a implementação está desviando das boas práticas e corrigir o curso cedo, quando a correção ainda é barata.

## Anti-padrões mais comuns e como evitar

### 1) Confiar no cliente como se ele fosse sempre correto

**Sinal:** você valida quase tudo só no front-end e no backend apenas salva.

**Problema:** qualquer cliente pode enviar dados errados, incompletos ou maliciosos. Além disso, clientes diferentes implementam validações diferentes, criando inconsistência.

**Como evitar:**

* valide entrada no servidor
* trate validação como parte do contrato
* padronize o formato de erro para dados inválidos

### 2) Colocar regra de negócio dentro da rota HTTP

**Sinal:** a rota tem muitas decisões, muitos ifs e conversa com banco.

**Problema:** você mistura transporte, regra e persistência. Testar fica difícil, reaproveitar lógica fica difícil e mudanças simples viram efeito cascata.

**Como evitar:**

* mantenha a rota pequena e delegue para um service ou caso de uso
* concentre regras em um lugar, não espalhadas em endpoints

### 3) Erros inconsistentes e difíceis de tratar

**Sinal:** cada endpoint devolve um formato diferente de erro. Às vezes é string, às vezes é objeto, às vezes muda o nome do campo.

**Problema:** o cliente vira um conjunto de exceções e gambiarras. Isso aumenta bugs e reduz previsibilidade.

**Como evitar:**

* defina um formato de erro único para toda a API
* use códigos de status coerentes com o tipo de falha
* mantenha mensagens humanas, mas com um identificador estável de erro

### 4) Usar status code como enfeite

**Sinal:** tudo responde 200 e o erro vem dentro do JSON.

**Problema:** ferramentas, caches, gateways e o próprio cliente perdem sinais importantes. Você reduz a utilidade do HTTP e dificulta observabilidade.

**Como evitar:**

* 2xx para sucesso
* 4xx para erro do cliente (dados inválidos, não autorizado, não encontrado)
* 5xx para erro inesperado no servidor

### 5) Expor detalhes internos na resposta

**Sinal:** você devolve stack trace, mensagens de exceção do banco ou nomes de tabelas.

**Problema:** isso vaza informação sensível e acopla o cliente com detalhes internos. Também aumenta risco de segurança.

**Como evitar:**

* logue detalhes internamente
* responda externamente com erro padronizado e seguro
* nunca envie informações que ajudem alguém a mapear a sua infraestrutura

### 6) Rotas e nomes sem padrão

**Sinal:** você mistura idiomas, plural e singular sem critério, verbos no caminho e padrões diferentes em cada recurso.

**Problema:** a API fica difícil de aprender e manter. O cliente erra mais, o time discute mais, a documentação fica confusa.

**Como evitar:**

* defina convenções simples e siga sempre
* use nomes consistentes, intuitivos e previsíveis
* trate naming como parte do contrato

### 7) Falta de limites básicos e de comportamento defensivo

**Sinal:** endpoints aceitam payload infinito, não há controle de repetição e não há cuidado com excesso de chamadas.

**Problema:** você abre espaço para abuso, lentidão e instabilidade. Mesmo sem ataque, um bug no cliente pode derrubar o sistema.

**Como evitar:**

* imponha limites de tamanho e validações
* tenha estratégia para requisições duplicadas
* considere rate limiting e proteção de recursos desde cedo

## Exemplo: criação de usuário com erros previsíveis

Para visualizar como esses vícios se acumulam no código real, vamos analisar um cenário comum: um endpoint que cria um usuário.

Vamos ver primeiro a versão que viola a separação de responsabilidades e, em seguida, como ela fica refatorada.

Regras básicas do cenário:

* email precisa ser único
* senha precisa ter um mínimo
* resposta de erro deve ser consistente

### Versão ruim: tudo misturado e sem padrão

O que acontece aqui:

* regra, persistência e resposta HTTP estão no mesmo lugar
* status code não ajuda
* erros não têm formato fixo

```python
def criar_usuario(request_json):
    try:
        email = request_json["email"]
        senha = request_json["senha"]

        if len(senha) < 8:
            return {"ok": False, "msg": "senha curta"}  # status e formato indefinidos

        if db.existe("usuarios", email=email):
            return {"erro": "já existe"}  # outro formato

        user_id = db.insert("usuarios", {"email": email, "senha": senha})
        return {"id": user_id}  # sucesso sem contrato claro
    except Exception as e:
        return {"error": str(e)}  # vaza detalhes internos
```

### Versão melhor: separação + contrato de erro estável

Ajustes principais:

* transporte só traduz requisição e resposta
* regras ficam no service
* persistência fica no repository
* erro tem sempre o mesmo formato

#### 1) Formato de erro padronizado

```python
def erro(codigo, mensagem, detalhes=None):
    body = {"error": codigo, "message": mensagem}
    if detalhes is not None:
        body["details"] = detalhes
    return body
```

#### 2) Transporte: handler fino, só orquestra HTTP

```python
def criar_usuario_http(request_json):
    service = UsuarioService(repo=UsuarioRepo())

    try:
        usuario = service.criar_usuario(
            email=request_json.get("email"),
            senha=request_json.get("senha"),
        )
        return {"status": 201, "body": usuario}
    except RegraNegocio as e:
        return {"status": e.http_status, "body": erro(e.codigo, e.mensagem, e.detalhes)}
```

#### 3) Regra de negócio: decisões centralizadas

```python
class RegraNegocio(Exception):
    def __init__(self, codigo, mensagem, http_status=400, detalhes=None):
        self.codigo = codigo
        self.mensagem = mensagem
        self.http_status = http_status
        self.detalhes = detalhes

class UsuarioService:
    def __init__(self, repo):
        self.repo = repo

    def criar_usuario(self, email, senha):
        if not email or not senha:
            raise RegraNegocio(
                codigo="DADOS_INVALIDOS",
                mensagem="email e senha são obrigatórios",
                http_status=400,
            )

        if len(senha) < 8:
            raise RegraNegocio(
                codigo="SENHA_FRACA",
                mensagem="senha deve ter pelo menos 8 caracteres",
                http_status=400,
            )

        if self.repo.email_existe(email):
            raise RegraNegocio(
                codigo="EMAIL_JA_CADASTRADO",
                mensagem="já existe um usuário com esse email",
                http_status=409,
                detalhes={"email": email},
            )

        user_id = self.repo.salvar(email=email, senha=senha)
        return {"id": user_id, "email": email}
```

#### 4) Persistência: detalhes escondidos

```python
class UsuarioRepo:
    def email_existe(self, email):
        return db.existe("usuarios", email=email)

    def salvar(self, email, senha):
        return db.insert("usuarios", {"email": email, "senha": senha})
```

O ganho prático:

* o cliente consegue tratar erros sem adivinhação
* a regra está testável sem HTTP
* a rota não vira um bloco gigante
* você reduz acoplamento e inconsistência

## Checklist rápido

* [ ] Minhas rotas HTTP são pequenas e previsíveis.
* [ ] Eu valido entradas no servidor.
* [ ] Eu uso status code coerente com o tipo de falha.
* [ ] Eu tenho um formato de erro único em toda a API.
* [ ] Eu não exponho detalhes internos em respostas.
* [ ] Eu tenho convenções claras de nomes e rotas.
* [ ] Eu penso em limites básicos e comportamento defensivo.

## Fontes (para leitura)

Leituras principais:

```text
[MAPI] Mastering API Architecture (O'Reilly)
- Part I (Designing, Building, and Testing APIs)
  - Chapter 1: Design, Build, and Specify APIs
    - estratégias para consistência e evitar incompatibilidades
    - padrões e escolhas para reduzir risco de breaking changes
  - Chapter 2: Testing APIs
    - como evitar inconsistência, breaking changes acidentais e feedback ruim para entradas inválidas
```

```text
[LAPI] Learning API Styles (O'Reilly)
- Chapter 2: Design Patterns
  - API Naming (consistência de nomes e convenções)
  - API Versioning (contrato e estratégias de versionamento)
  - Best practices e seções de qualidade: input validation e comunicação de erros com códigos padrão
```
