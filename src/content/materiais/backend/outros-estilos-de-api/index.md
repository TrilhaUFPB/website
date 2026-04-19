---
title: Outros Estilos de API
description: Implementações diferentes para solucionas o problema da comunicação da internet
category: Backend
order: 7
---

# 6.1. Limitações do REST

O REST é o "padrão ouro" para APIs públicas e CRUDs tradicionais. Ele é previsível, cacheável e funciona muito bem com a infraestrutura da Web. Porém, **não é uma bala de prata**. Existem cenários onde o REST se torna ineficiente ou complexo demais.



## 1. Overfetching (Buscar dados demais)

No REST, o servidor define o que retorna. Se o cliente precisa apenas do *nome* de um usuário, mas o endpoint `/users/1` retorna um JSON gigante com 50 campos (endereço, histórico, preferências), você está desperdiçando banda e processamento.

*   **Problema:** Tráfego de rede desnecessário.
*   **Solução REST:** Criar DTOs específicos ou usar query params (`/users/1?fields=name`), mas isso adiciona complexidade no backend.

## 2. Underfetching (Buscar dados de menos)

Imagine que você precisa mostrar o **Perfil do Usuário**, seus **Últimos Pedidos** e suas **Notificações** na mesma tela.

No REST puro, você provavelmente precisaria de 3 requisições:
1.  `GET /users/1`
2.  `GET /users/1/orders`
3.  `GET /users/1/notifications`

*   **Problema:** Latência. O cliente tem que esperar 3 "idas e voltas" (round-trips) ao servidor. Em redes móveis (4G/5G), isso torna o app lento.
*   **Solução REST:** Criar um endpoint "BFF" (Backend for Frontend) que agrega tudo, ex: `GET /dashboard-data`. Mas isso acopla o backend à tela específica do frontend.

## 3. Ações que não são CRUD

REST é orientado a recursos (Substantivos). Mas e quando você precisa executar uma ação complexa (Verbo)?

*   *Calcular Risco de Empréstimo*
*   *Reiniciar Servidor*
*   *Processar Transação em Lote*

Tentar forçar isso em verbos HTTP fica estranho:
*   `POST /loan-risk-calculation` (Criar um cálculo?)
*   `PATCH /server/restart` (Atualizar o status para reiniciado?)

Às vezes, você só quer chamar uma função no servidor (RPC).

## 4. Comunicação em Tempo Real

O HTTP (protocolo base do REST) é **Request-Response**. O cliente pergunta, o servidor responde. O servidor nunca pode "falar primeiro".

Se você está criando um chat, um placar de futebol ao vivo ou um monitor de ações, o REST obriga o cliente a ficar perguntando a cada segundo ("Tem novidade? Tem novidade?"). Isso se chama **Polling** e é extremamente ineficiente.



## Conclusão

O REST brilha na **organização de recursos** e **cacheabilidade**.
Ele falha em **flexibilidade de consulta** (Resolvido por GraphQL) e **tempo real** (Resolvido por WebSockets).

Entender essas limitações é o primeiro passo para escolher a ferramenta certa para o trabalho.

---
# 6.2. Classificação de estilos de API

Quando saímos do mundo REST, nos deparamos com uma sopa de letrinhas: gRPC, GraphQL, SOAP, Webhooks. Para organizar o pensamento, podemos classificar as APIs em quatro grandes estilos arquiteturais baseados em **"como elas expõem seus recursos"**.



## 1. Resource-Oriented (Orientado a Recursos) - REST
O foco está nas "coisas" (Substantivos).
*   **Unidade:** O Recurso (Usuário, Pedido).
*   **Interação:** Verbos HTTP padronizados (GET, POST, PUT, DELETE).
*   **Exemplo:** `GET /users/1`
*   **Quando usar:** CRUDs, APIs públicas, serviços onde o cache é importante.

## 2. Function-Oriented (Orientado a Funções) - RPC
O foco está nas "ações" (Verbos). Você chama uma função no servidor como se fosse uma função local.
*   **Unidade:** O Procedimento (Calcular, Processar, Enviar).
*   **Interação:** Nome da função + Argumentos.
*   **Exemplo:** `POST /rpc` com body `{ "method": "calcular_frete", "params": [10, 20] }`
*   **Tecnologias:** gRPC, JSON-RPC, SOAP.
*   **Quando usar:** Ações complexas, microsserviços internos de alta performance (gRPC).

## 3. Query-Oriented (Orientado a Consultas) - GraphQL
O foco está na "flexibilidade do cliente". O servidor expõe um grafo de dados e o cliente pede exatamente o que quer.
*   **Unidade:** O Grafo (Nós e Arestas).
*   **Interação:** Uma Query Language (Linguagem de consulta).
*   **Exemplo:** `query { user(id: 1) { name, orders { total } } }`
*   **Quando usar:** Frontends complexos (Mobile/Web), agregação de múltiplas fontes de dados.

## 4. Event-Driven (Orientado a Eventos) - Async
O foco está no "o que aconteceu" (Passado). O servidor avisa os interessados quando algo muda. Não é o cliente que pergunta, é o servidor que avisa (Push).
*   **Unidade:** O Evento (UserCreated, PaymentApproved).
*   **Interação:** Assinatura (Subscribe) e Publicação (Publish).
*   **Tecnologias:** Webhooks, WebSockets, Kafka, RabbitMQ.
*   **Quando usar:** Notificações em tempo real, processos assíncronos, desacoplamento de sistemas.



## Tabela Comparativa

| Estilo | Quem manda? | Acoplamento | Performance | Flexibilidade |
| : | : | : | : | : |
| **REST** | Servidor define o formato | Médio | Alta (Cache) | Baixa (Overfetching) |
| **RPC** | Servidor define a função | Alto | Altíssima (gRPC) | Baixa (Rígido) |
| **GraphQL** | Cliente define o formato | Baixo | Média (Sem Cache nativo) | Altíssima |
| **Eventos**| Servidor empurra dados | Baixíssimo | Alta (Assíncrono) | N/A |

Nos próximos capítulos, vamos mergulhar em cada um desses estilos com exemplos em Python.

---
# 6.3. RPC sobre HTTP

RPC (Remote Procedure Call) é o estilo mais antigo e intuitivo de API. A ideia é simples: **fazer uma chamada de função em outro computador parecer uma chamada de função local.**

Diferente do REST, que se preocupa com Recursos e Verbos HTTP, o RPC se preocupa apenas com **Ação** e **Resultado**. Geralmente usa apenas `POST` e o endpoint é único (ex: `/api`).



## JSON-RPC: A simplicidade do RPC

O JSON-RPC é um protocolo leve que define como enviar o comando.
O body da requisição sempre segue este formato:

```json
{
  "jsonrpc": "2.0",
  "method": "somar",
  "params": [42, 23],
  "id": 1
}
```

## Implementação Prática com FastAPI

Embora o FastAPI seja desenhado para REST, podemos implementar um endpoint estilo RPC facilmente.

### Exemplo: Calculadora RPC

Imagine que queremos expor funções matemáticas que não fazem sentido como "Recursos REST".

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Any, Optional

app = FastAPI()

# Modelo da Requisição JSON-RPC
class RPCRequest(BaseModel):
    jsonrpc: str = "2.0"
    method: str
    params: Optional[List[Any]] = []
    id: int

# Funções "Locais" que o servidor sabe executar
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

# Endpoint Único (Gateway RPC)
@app.post("/rpc")
def rpc_endpoint(request: RPCRequest):
    # Roteamento baseado no nome do método (Action-Based)
    if request.method == "somar":
        result = somar(request.params[0], request.params[1])
    elif request.method == "subtrair":
        result = subtrair(request.params[0], request.params[1])
    else:
        return {"error": "Method not found", "id": request.id}
  
    # Resposta padrão RPC
    return {
        "jsonrpc": "2.0",
        "result": result,
        "id": request.id
    }
```

### Como testar

Envie um POST para `/rpc`:

```json
{
  "jsonrpc": "2.0",
  "method": "somar",
  "params": [10, 5],
  "id": 100
}
```

**Resposta:**

```json
{
  "jsonrpc": "2.0",
  "result": 15,
  "id": 100
}
```



## gRPC: O RPC Moderno

Enquanto JSON-RPC é texto (legível), o **gRPC** (do Google) usa **Protobuf**, um formato binário extremamente eficiente.

* **Vantagens:** Muito mais rápido e leve que JSON. Contratos fortes (tipagem estrita).
* **Desvantagens:** Requer ferramentas específicas (não dá para ler no navegador ou curl facilmente).
* **Uso:** Comunicação entre microserviços internos onde milissegundos importam.

No mundo Python, o gRPC é amplamente usado, mas requer uma biblioteca separada (`grpcio`) e arquivos `.proto` para definir os contratos. Ele foge um pouco do escopo "Web API padrão", mas é vital conhecer sua existência.

---
# 6.4. GraphQL

O GraphQL (criado pelo Facebook) resolve os problemas de **Overfetching** e **Underfetching** do REST. Em vez de ter múltiplos endpoints fixos (`/users`, `/orders`), você tem **um único endpoint** inteligente que aceita uma "query".

O cliente descreve exatamente a estrutura do JSON que quer receber.



## Conceitos Chave

1. **Schema:** O contrato forte que define o que *pode* ser consultado. É tipado (String, Int, User, Order).
2. **Query:** A consulta de leitura (equivalente ao GET).
3. **Mutation:** A operação de escrita (equivalente ao POST/PUT/DELETE).
4. **Resolver:** A função Python que busca os dados para um campo específico.



## Implementação Prática com Strawberry + FastAPI

Vamos usar a biblioteca `strawberry-graphql`, uma das mais modernas para Python.

**Instalação:** `pip install strawberry-graphql fastapi uvicorn`

```python
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from typing import List

# 1. Definindo os Tipos (Schema)
@strawberry.type
class User:
    id: int
    name: str
    age: int

# Banco de dados fake
users_db = [
    User(id=1, name="Ana", age=25),
    User(id=2, name="Bruno", age=30),
]

# 2. Definindo as Consultas (Query)
@strawberry.type
class Query:
    @strawberry.field
    def all_users(self) -> List[User]:
        return users_db

    @strawberry.field
    def user(self, id: int) -> User | None:
        return next((u for u in users_db if u.id == id), None)

# 3. Criando o App
schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")
```



## Como testar

Rode o servidor e acesse `http://localhost:8000/graphql`.
O Strawberry fornece uma interface gráfica (GraphiQL) para testar queries.

### Teste 1: Pegar tudo

```graphql
query {
  allUsers {
    name
    age
  }
}
```

*Note que não pedi o ID. O servidor não vai me mandar o ID.*

### Teste 2: Pegar um usuário específico

```graphql
query {
  user(id: 1) {
    name
  }
}
```



## Quando usar GraphQL?

* **Sim:** Seu app Mobile/Frontend precisa de telas muito diferentes e flexíveis.
* **Sim:** Você está agregando dados de muitos microserviços.
* **Cuidado:** O cache HTTP não funciona bem (tudo é POST no mesmo endpoint). Consultas muito complexas podem derrubar o banco de dados ([Problema N+1](https://dev.to/danielcamucatto/entendendo-o-problema-n1-um-guia-pratico-para-desenvolvedores-4ocb)).

---
# 6.5. WebSockets e Server-Sent Events

Até agora, toda comunicação partiu do Cliente. Mas e se o servidor precisar mandar uma atualização em tempo real (ex: cotação do dólar ou nova mensagem no chat)?



## 1. WebSockets (Bidirecional)

O WebSocket cria um túnel TCP persistente entre cliente e servidor. Ambos podem mandar mensagens a qualquer momento.

### Exemplo Prático: Chat Simples com FastAPI

```python
from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # 1. Aceita a conexão (Handshake)
    await websocket.accept()
    
    try:
        while True:
            # 2. Espera uma mensagem do cliente
            data = await websocket.receive_text()
            
            # 3. Responde algo (Echo)
            await websocket.send_text(f"Servidor recebeu: {data}")
    except Exception:
        print("Cliente desconectou")
```

**Como testar:** Você pode usar sites como [websocket.org/echo.html](https://websocket.org/tools/websocket-echo-server) apontando para `ws://localhost:8000/ws` ou usar código JS no console do navegador:

```javascript
let ws = new WebSocket("ws://localhost:8000/ws");
ws.onmessage = (event) => console.log(event.data);
ws.send("Olá servidor!");
```



## 2. Server-Sent Events (SSE) (Unidirecional)

Às vezes você não precisa falar, só ouvir. Ex: Placar de jogo, Feed de notícias.
O SSE é mais simples que WebSocket. É uma conexão HTTP "infinita" onde o servidor vai mandando pedaços de texto.

### Vantagens do SSE:
*   Funciona com HTTP padrão (Firewalls amam).
*   Reconecta automaticamente se a net cair (nativo do navegador).
*   Simples de implementar.

### Exemplo Prático: Contador Infinito

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio
import time

app = FastAPI()

# Gerador de eventos
async def fake_event_generator():
    count = 0
    while True:
        # Formato obrigatório do SSE: "data: mensagem\n\n"
        yield f"data: Contagem {count}\n\n"
        count += 1
        await asyncio.sleep(1) # Espera 1 segundo

@app.get("/stream")
async def stream_events():
    return StreamingResponse(fake_event_generator(), media_type="text/event-stream")
```

**Como testar:** Abra o navegador em `http://localhost:8000/stream`. Você verá a contagem aumentando linha a linha sem precisar dar F5.



## Quando escolher qual?

*   **WebSockets:** Jogos multiplayer, Chats, Edição colaborativa (Google Docs).
*   **SSE:** Dashboards, Notificações, Status de progresso, Tickers financeiros.

---
# 6.6. Webhooks

Webhooks são a forma mais comum de integração entre sistemas na web moderna. Eles são frequentemente chamados de **"Reverse APIs"** (APIs Reversas) ou **HTTP Callbacks**.

Em vez de você ligar para o servidor (`Polling`) perguntando "E aí, tem novidade?" a todo momento, você diz para o servidor: *"Aqui está minha URL (meu 'número de telefone'). Quando algo acontecer, você me chama."*

### A Analogia da Pizza

Imagine que você pediu uma pizza:
1.  **Sem Webhook (Polling):** Você liga para a pizzaria a cada 5 minutos.
    *   "Já saiu?" -> "Não."
    *   "Já saiu?" -> "Não."
    *   "Já saiu?" -> "Sim, saiu agora."
    *   *Resultado:* Você perde tempo ligando, a pizzaria perde tempo atendendo.
2.  **Com Webhook:** Você faz o pedido e diz: "Quando o motoboy sair, toque o interfone".
    *   Você vai assistir TV.
    *   O motoboy toca o interfone.
    *   *Resultado:* Eficiência total. Ninguém perde tempo esperando.



## O Elo Perdido: O Cadastro (Subscription)

Antes de qualquer código rodar, existe uma etapa de configuração. O Sistema A (Stripe) não adivinha a URL do Sistema B (Sua Loja). **Você precisa contar para ele.**

Na vida real, isso acontece no painel administrativo do serviço:

1.  Você faz login no dashboard do Stripe/GitHub.
2.  Vai em "Settings > Webhooks".
3.  Clica em "Add Endpoint".
4.  Digita a URL da sua API: `https://minha-loja.com/api/webhook`.
5.  Seleciona quais eventos quer ouvir: `payment_success`, `payment_failed`.

O Stripe salva isso no banco de dados dele:
> *"O cliente X pediu para ser avisado na URL Y sempre que o evento Z acontecer."*



## Implementação Prática

Vamos simular o ciclo completo, incluindo a parte que o Stripe faz internamente.

### Passo 1: O Receiver (Sua Loja - Passivo)

Sua API não "sabe" que será chamada. Ela apenas expõe uma rota pública e espera. Se ninguém chamar, nada acontece.

```python
from fastapi import FastAPI, Request

app = FastAPI()

# Esta é a URL que você vai copiar e colar no painel do Stripe
# URL Pública: http://seuservidor.com/webhook/stripe
@app.post("/webhook/stripe")
async def listen_for_stripe(request: Request):
    """
    Este endpoint fica "ouvindo".
    Ele não sabe QUANDO vai tocar, mas sabe O QUE fazer quando tocar.
    """
    payload = await request.json()
    event_type = payload.get("event")
    
    print(f"📞 O telefone tocou! Evento: {event_type}")
    
    if event_type == "payment_confirmed":
        print("✅ Liberando produto para o cliente...")
        # Lógica de liberar pedido...
        
    return {"status": "recebido"}
```

### Passo 2: O Sender (Simulando o Stripe - Ativo)

Aqui vamos simular o que acontece dentro dos servidores do Stripe quando um pagamento é aprovado. Eles consultam o banco de dados de "Webhooks Cadastrados" e disparam os avisos.

```python
import httpx
import asyncio

# Imagine que isso é o banco de dados interno do Stripe
# Onde ficam guardadas as configurações que os usuários fizeram no painel
banco_de_webhooks_do_stripe = [
    {
        "cliente_id": 1,
        "url_destino": "http://localhost:8000/webhook/stripe", # A URL da sua loja
        "eventos_assinados": ["payment_confirmed"]
    }
]

async def processar_pagamento_real(cliente_id: int):
    print(" INICIANDO PROCESSAMENTO NO STRIPE ")
    print("1. Processando cartão de crédito...")
    await asyncio.sleep(1)
    print("2. Pagamento Aprovado!")
    
    # OCORREU UM EVENTO! AGORA O STRIPE VAI PROCURAR QUEM AVISAR
    evento_atual = "payment_confirmed"
    
    print("3. Verificando se o cliente quer ser avisado (Webhook)...")
    
    # O Stripe varre o banco procurando configurações desse cliente
    for config in banco_de_webhooks_do_stripe:
        if config["cliente_id"] == cliente_id and evento_atual in config["eventos_assinados"]:
            
            target_url = config["url_destino"]
            print(f"4. Configuração encontrada! Disparando para: {target_url}")
            
            # Aqui acontece o disparo HTTP
            async with httpx.AsyncClient() as client:
                payload = {"event": evento_atual, "valor": 100.00, "moeda": "BRL"}
                try:
                    # O Stripe "liga" para a sua API
                    response = await client.post(target_url, json=payload)
                    print(f"5. A loja respondeu com código: {response.status_code}")
                except Exception as e:
                    print(f"5. Falha ao contatar a loja: {e}")

if __name__ == "__main__":
    # Simulando um pagamento acontecendo agora
    asyncio.run(processar_pagamento_real(cliente_id=1))
```



## Resumo do Fluxo

1.  **Configuração (Manual):** Você cadastra `http://localhost:8000/webhook/stripe` no banco do Sender.
2.  **Espera (Passiva):** Sua API (`Receiver`) fica rodando, mas parada, sem fazer nada.
3.  **Evento (Ativo):** Acontece o pagamento no Sender.
4.  **Lookup:** O Sender olha no banco: "Quem eu preciso avisar sobre isso?".
5.  **Disparo:** O Sender pega a URL do banco e faz o POST.
6.  **Reação:** Sua API recebe o POST e executa a lógica.



## Boas Práticas de Segurança

Como seu endpoint de webhook é público, qualquer um pode mandar um POST falso fingindo ser o Stripe.

1.  **Segredo Compartilhado (HMAC):** O Stripe assina a mensagem com uma senha secreta. Você valida a assinatura antes de processar.
2.  **HTTPS:** Obrigatório.
3.  **Idempotência:** Se o Stripe te mandar o mesmo aviso duas vezes (por erro de rede), seu código deve ser esperto o suficiente para não cobrar o cliente duas vezes ou enviar dois produtos.

---
# 6.7. Mensageria e sistemas orientados a eventos

Quando seus sistemas crescem, chamadas HTTP diretas (síncronas) entre microserviços podem criar um efeito dominó de falhas. Se o Serviço A chama o B, que chama o C, e o C cai... tudo cai.

Para resolver isso, usamos **Mensageria Assíncrona** com **Message Brokers** (Corretores de Mensagem).



## Conceitos Básicos

*   **Producer (Produtor):** Quem cria a mensagem (ex: API de Pedidos).
*   **Broker:** O correio. Recebe, guarda e distribui (ex: RabbitMQ, Kafka, Redis, Amazon SQS).
*   **Consumer (Consumidor):** Quem processa a mensagem (ex: Worker de Envio de Email).
*   **Queue (Fila):** Onde a mensagem fica esperando.

A grande vantagem: Se o Consumidor (Email) estiver fora do ar, a mensagem fica guardada na Fila. O Pedido não falha. Quando o sistema de email voltar, ele processa as mensagens acumuladas.



## Por que usar Brokers e não Filas Internas?

Uma dúvida comum de quem começa é: *"Por que eu preciso instalar um RabbitMQ se o Python tem a classe `queue.Queue` ou listas?"*

Aqui estão as 4 diferenças fundamentais:

### 1. Persistência e Durabilidade
*   **Fila Python (Memória):** Se a sua API reiniciar (deploy, crash, falta de luz), **todas as mensagens na memória somem**. Os pedidos dos clientes são perdidos para sempre.
*   **Broker (RabbitMQ/Kafka):** Ele escreve as mensagens no disco. Se o servidor cair e voltar, as mensagens ainda estão lá. Nada se perde.

### 2. Escalabilidade (Múltiplos Consumidores)
*   **Fila Python:** Só funciona dentro do mesmo processo. Se você subir 5 instâncias da sua API (em containers ou servidores diferentes), cada uma terá sua própria fila isolada.
*   **Broker:** É centralizado. Você pode ter 1 Produtor enviando mensagens e 50 Consumidores (Workers) em 50 servidores diferentes lendo da mesma fila. O Broker distribui a carga (Load Balancing) automaticamente.

### 3. Desacoplamento de Linguagem
*   **Fila Python:** Só o Python entende.
*   **Broker:** O Produtor pode ser um código em **Python** (sua API) e o Consumidor pode ser um serviço legado em **Java** ou um script em **Node.js**. Eles se comunicam através do Broker (JSON/Protobuf), sem saber qual linguagem o outro usa.

### 4. Visibilidade e Monitoramento
*   **Fila Python:** É uma caixa preta. Você não sabe quantas mensagens estão lá sem escrever código para "printar".
*   **Broker:** Possui painéis de controle (ex: RabbitMQ Management UI). Você vê gráficos: "Tem 5.000 emails na fila e o Consumer está processando 10 por segundo". Se a fila encher, você recebe alertas.



## Implementação Prática (Simulada com Memória)

Para não precisarmos instalar o RabbitMQ agora, vamos simular o conceito usando estruturas do Python.

```python
import asyncio
from fastapi import FastAPI, BackgroundTasks
from typing import List

app = FastAPI()

# Nossa "Fila" (Em um sistema real, seria o RabbitMQ/Redis)
fake_queue: List[str] = []

#  CONSUMER (O Worker) 
async def process_email_queue(email: str):
    """Simula um trabalho demorado de background"""
    print(f"[Worker] Iniciando envio para {email}...")
    await asyncio.sleep(5) # Simula delay de rede SMTP
    print(f"[Worker] Email enviado para {email}!")

#  PRODUCER (A API) 
@app.post("/send-email")
async def send_email_endpoint(email: str, background_tasks: BackgroundTasks):
    # Em vez de esperar o email ser enviado, nós apenas "enfileiramos" a tarefa.
    # O FastAPI tem um mini-sistema de mensageria embutido chamado BackgroundTasks.
    
    background_tasks.add_task(process_email_queue, email)
    
    # Respondemos IMEDIATAMENTE para o usuário
    return {"status": "Email enfileirado. Será enviado em breve."}
```

### O que acontece aqui?

1.  O usuário chama `POST /send-email`.
2.  A API retorna "Email enfileirado" em milissegundos.
3.  O usuário segue a vida dele feliz.
4.  No servidor, *depois* da resposta ser enviada, a função `process_email_queue` roda e demora 5 segundos.

Isso é a essência da arquitetura orientada a eventos: **Desacoplamento temporal**. Quem pede não precisa esperar quem faz terminar.



## Tecnologias Populares

*   **RabbitMQ:** O clássico. Ótimo para filas de tarefas (Task Queues).
*   **Apache Kafka:** Para streaming de eventos em escala massiva (Big Data).
*   **Redis (Pub/Sub):** Simples e muito rápido, bom para comunicações efêmeras.
*   **Celery (Python):** A biblioteca padrão do Python para gerenciar Workers e Filas.

---
# 6.8. Critérios para escolha do estilo de API

Agora que você conhece as opções, como escolher?
Não existe "melhor estilo", existe o melhor para o **contexto**.

Use esta matriz de decisão para guiar sua escolha arquitetural.



## Matriz de Decisão

| Critério | REST | GraphQL | RPC (gRPC) | WebSockets/SSE | Eventos (Msg) |
| : | : | : | : | : | : |
| **Simplicidade (Dev)** | Alta | Média | Média | Média | Baixa |
| **Cacheabilidade** | **Excelente** | Ruim | Ruim | N/A | N/A |
| **Performance (Latência)** | Média | Boa | **Excelente** | **Excelente** | N/A (Assíncrono) |
| **Flexibilidade (Dados)** | Baixa | **Excelente** | Baixa | Baixa | N/A |
| **Acoplamento** | Baixo | Baixo | Alto | Alto | **Baixíssimo** |



## Guia Prático: "Eu devo usar..."

### Use REST quando:
*   Você está construindo uma API Pública para terceiros.
*   Você precisa de Cache HTTP (CDNs, Cache de navegador).
*   Seu modelo de dados é simples e estável.
*   Sua equipe já conhece o padrão (menor curva de aprendizado).

### Use GraphQL quando:
*   Você tem clientes muito diversos (Web, iOS, Android, Watch) com necessidades de dados diferentes.
*   Você quer evitar múltiplos round-trips (Underfetching).
*   Sua API serve apenas ao seu próprio Frontend (Backend for Frontend).

### Use RPC (gRPC) quando:
*   Você tem comunicação interna entre microserviços (Backend-to-Backend).
*   Performance é crítica (streaming de vídeo, jogos, alta frequência).
*   Você precisa de contratos rigorosos entre linguagens diferentes (ex: Serviço em Go chamando Serviço em Python).

### Use WebSockets/SSE quando:
*   O dado muda o tempo todo e o usuário precisa ver na hora (Chats, Dashboards, GPS).

### Use Mensageria/Eventos quando:
*   A ação demora muito para processar (Emails, Relatórios, Processamento de Vídeo).
*   Você precisa garantir que nada se perca se um serviço cair.
*   Você quer desacoplar completamente o Produtor do Consumidor.



## Conclusão da Parte 2

Você agora tem um arsenal completo. Começamos com JSON, passamos pelo design rigoroso do REST e exploramos as alternativas para quando o REST não for suficiente.

Na próxima parte, vamos subir o nível e falar sobre a **Arquitetura** que sustenta tudo isso.
