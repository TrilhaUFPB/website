---
title: 5. REST e Design de APIs
description: Visão geral sobre APIs Restful
category: Backend
order: 6
---

# 5.1. REST como estilo arquitetural

Muitas pessoas acham que REST é apenas "retornar JSON em vez de XML" ou "usar URLs bonitas". Mas REST (**Re**presentational **S**tate **T**ransfer) é muito mais profundo que isso.

Criado por **Roy Fielding** em sua tese de doutorado (2000), o REST não é um protocolo (como o HTTP) nem uma biblioteca. Ele é um **estilo arquitetural**.

Isso significa que o REST é um conjunto de **restrições** (regras) que, se você seguir, seu sistema terá propriedades desejáveis para a Web, como escalabilidade, modificabilidade e visibilidade.



## A Origem: Por que REST existe?

Antes do REST, sistemas distribuídos usavam protocolos complexos como SOAP e CORBA, que tentavam esconder a rede (RPC - Remote Procedure Call). Eles fingiam que chamar um serviço remoto era igual a chamar uma função local.

O REST abraça a Web. Ele diz: "A Web funciona bem. Vamos construir sistemas *como* a Web funciona."

*   **RPC (SOAP/XML-RPC):** Foca em **ações** (verbos).
    *   `POST /createUser`
    *   `POST /deleteProduct`
*   **REST:** Foca em **recursos** (substantivos).
    *   `POST /users`
    *   `DELETE /products/123`



## O Modelo Mental do REST

Imagine a Web. Você acessa uma URL, recebe uma representação (HTML) do estado atual daquela página. Você clica num link, e transfere seu estado para outra página.

Uma API REST faz a mesma coisa, mas para máquinas:
1.  O cliente acessa um Recurso (`/pedidos/10`).
2.  O servidor entrega uma **Representação** desse recurso (JSON).
3.  Essa representação contém o **Estado** atual do pedido ("pendente").
4.  O cliente envia uma mensagem para mudar esse estado (Transferência).



## REST vs RESTful

*   **REST:** É a teoria, o conjunto de restrições arquiteturais definidas por Fielding.
*   **RESTful:** É o adjetivo dado a sistemas que implementam (ou tentam implementar) essas restrições na prática.

A maioria das APIs que se dizem REST hoje em dia não implementam 100% da teoria (especialmente HATEOAS), mas seguem os princípios básicos de recursos e verbos HTTP. São chamadas de "APIs Pragmáticas REST".



## Checklist rápido

*   [ ] Entendi que REST não é uma tecnologia, mas um estilo de arquitetura.
*   [ ] Entendi a diferença fundamental entre RPC (foco em ação) e REST (foco em recurso).
*   [ ] Sei que o objetivo do REST é criar sistemas escaláveis como a Web.



## Fontes

*   **[Fielding]:** [Architectural Styles and the Design of Network-based Software Architectures (Tese Original)](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
*   **[Red Hat]:** [O que é uma API REST?](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api)
*   **[Oracle]:** [Definição de REST](https://www.oracle.com/br/cloud/what-is-rest/)

---
# 5.10. HATEOAS

**HATEOAS** (Hypermedia As The Engine Of Application State) é a restrição final do REST, aquela que separa "APIs HTTP" de "APIs verdadeiramente REST".
É também a mais ignorada.



## O Conceito

Imagine que você entra num site e não tem links. Para ir para a página de contato, você tem que digitar `/contato` na barra do navegador.
É assim que a maioria das APIs funciona hoje: o cliente tem que ler a documentação para saber as URLs.

Com HATEOAS, a API fornece os **links** para as próximas ações possíveis junto com a resposta.

### Exemplo sem HATEOAS (Padrão)
```json
{
  "id": 10,
  "status": "pendente",
  "valor": 100
}
```
O cliente precisa saber "hardcoded" que para pagar deve chamar `POST /pedidos/10/pagar`.

### Exemplo com HATEOAS
```json
{
  "id": 10,
  "status": "pendente",
  "valor": 100,
  "_links": {
    "self": { "href": "/pedidos/10" },
    "pagar": { "href": "/pedidos/10/pagar", "method": "POST" },
    "cancelar": { "href": "/pedidos/10", "method": "DELETE" }
  }
}
```
Se o pedido mudar para "pago", a API para de enviar o link de "pagar". O front-end poderia (teoricamente) apenas renderizar os botões baseados nos links que recebeu, sem lógica de negócio duplicada (`if status == pendente then show button`).



## A Realidade Prática

Embora lindo na teoria, HATEOAS adiciona complexidade e tamanho ao payload.
Grandes APIs públicas (PayPal) usam.
APIs internas e de startups raramente usam, pois o acoplamento entre front e back já é alto e conhecido via documentação (OpenAPI).

**Vale a pena?**
Para APIs públicas de longa vida: Sim.
Para seu backend interno do app mobile: Provavelmente não (Overengineering). O OpenAPI costuma ser suficiente como contrato.



## Checklist rápido

*   [ ] Entendi que HATEOAS significa a API "guiar" o cliente através de links?
*   [ ] Sei que isso permite que o servidor mude URLs sem quebrar o cliente?
*   [ ] Avaliei se a complexidade extra vale a pena para o meu projeto?



## Fontes

*   **[Fielding]:** [REST APIs must be hypertext-driven](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)
*   **[Spring]:** [Understanding HATEOAS](https://spring.io/understanding/HATEOAS)
*   **[PayPal]:** [HATEOAS in PayPal API](https://developer.paypal.com/api/rest/responses/#hateoas-links)

---
# 5.11. Checklist de design REST

Antes de entregar sua API, passe por este checklist. Ele resume as boas práticas discutidas em todo o capítulo.



## URIs e Recursos
*   [ ] **Substantivos:** Usei substantivos em vez de verbos? (`/users` ✅, `/getUsers` ❌)
*   [ ] **Plural:** Usei plural para coleções? (`/users` ✅)
*   [ ] **Kebab-case:** Usei hífens para separar palavras? (`/customer-orders` ✅)
*   [ ] **Hierarquia:** O aninhamento faz sentido? (`/users/1/orders` ✅)

## Métodos HTTP (Verbos)
*   [ ] **GET:** Usado para leitura (safe)? Retorna 200 OK?
*   [ ] **POST:** Usado para criar (não idempotente)? Retorna 201 Created?
*   [ ] **PUT:** Usado para substituição completa (idempotente)?
*   [ ] **PATCH:** Usado para atualização parcial?
*   [ ] **DELETE:** Usado para remover? Retorna 204 No Content?

## Respostas e Códigos
*   [ ] **Status Codes:** Uso os códigos corretos (200, 201, 204, 400, 401, 403, 404, 500)?
*   [ ] **JSON:** O Content-Type é `application/json`?
*   [ ] **Envelope:** Evitei envelope desnecessário (`{ "data": ... }`) exceto para paginação/meta?

## Segurança e Performance
*   [ ] **Filtros:** Estão na query string? (`?status=active`)
*   [ ] **Paginação:** Existe limite padrão (limit) para não quebrar o banco?
*   [ ] **Stateless:** A API não depende de sessão na memória?
*   [ ] **HTTPS:** A API roda exclusivamente sobre HTTPS?



Este checklist não garante que sua API é perfeita, mas garante que ela está nos 10% melhores em termos de consistência e padrão de mercado.



## Fontes Gerais de Design

*   **[Microsoft]:** [REST API Design Guidelines](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)
*   **[Google]:** [Google Cloud API Design Guide](https://cloud.google.com/apis/design)
*   **[Zalando]:** [Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/)

---
# 5.12. Implementação Prática com FastAPI

Esta seção consolida os conceitos de Recursos, Verbos, Status Codes e Contratos que vimos até aqui em um exemplo prático e funcional usando FastAPI.



## Estrutura do Projeto

Vamos imaginar um cenário simples de cadastro de usuários. Em um projeto real, você organizaria em múltiplos arquivos, mas para fins didáticos, faremos tudo em um `main.py`.

```text
meu_projeto/
├── main.py       # Código da API
└── requirements.txt
```

**Instalação:**
```bash
pip install fastapi uvicorn
```



## Código da Implementação

Copie este código para seu arquivo `main.py`. Ele implementa um CRUD completo de Usuários seguindo os princípios REST.

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from random import randint

app = FastAPI()

#  1. CONTRATOS (Modelos Pydantic) 
# Define o formato dos dados (Schema)

class UserBase(BaseModel):
    name: str
    email: str
    is_active: bool = True

class UserCreate(UserBase):
    # Herdamos de UserBase. 
    # Usado no POST. A senha seria adicionada aqui num caso real.
    pass

class UserResponse(UserBase):
    # Usado na resposta (GET/POST).
    # Adicionamos o ID que é gerado pelo servidor.
    id: int

    class Config:
        from_attributes = True

#  2. BANCO DE DADOS FAKE 
# Em memória, apenas para exemplo
fake_db = []

#  3. IMPLEMENTAÇÃO REST 

# GET /users (Coleção)
@app.get("/users", response_model=List[UserResponse])
def list_users(skip: int = 0, limit: int = 10):
    # Implementa paginação via Query Params
    return fake_db[skip : skip + limit]

# GET /users/{user_id} (Recurso Singular)
@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    # Procura o usuário
    for user in fake_db:
        if user["id"] == user_id:
            return user
    
    # Se não achar, retorna 404 (Erro do Cliente)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, 
        detail="User not found"
    )

# POST /users (Criação)
@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user(user: UserCreate):
    # Simula geração de ID
    new_id = randint(1, 1000)
    
    # Transforma o modelo Pydantic em dicionário e adiciona ID
    user_dict = user.model_dump()
    user_dict["id"] = new_id
    
    # Salva no "banco"
    fake_db.append(user_dict)
    
    # Retorna o recurso criado (com ID) e Status 201
    return user_dict

# DELETE /users/{user_id} (Remoção)
@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int):
    # Procura e remove
    for index, user in enumerate(fake_db):
        if user["id"] == user_id:
            fake_db.pop(index)
            return # Retorna vazio (204)
            
    # Se não existir, 404
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, 
        detail="User not found"
    )

# PUT /users/{user_id} (Atualização Completa)
@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserCreate):
    for index, user in enumerate(fake_db):
        if user["id"] == user_id:
            # Substitui os dados
            updated_user = user_update.model_dump()
            updated_user["id"] = user_id # Mantém o mesmo ID
            fake_db[index] = updated_user
            return updated_user
            
    raise HTTPException(status_code=404, detail="User not found")
```



## Como testar

O FastAPI gera automaticamente uma documentação interativa (Swagger UI) que é perfeita para testar APIs REST.

1.  Rode o servidor:
    ```bash
    uvicorn main:app --reload
    ```
2.  Abra no navegador:
    `http://127.0.0.1:8000/docs`

### O que observar:

1.  **POST:** Tente criar um usuário. Veja que a resposta vem com `id` e o status é `201`.
2.  **GET (Lista):** Veja que retorna um Array `[]`.
3.  **GET (Item):** Tente buscar um ID inexistente e veja o erro `404`.
4.  **DELETE:** Apague um usuário e veja que a resposta não tem corpo (Body), apenas o status `204`.

Esta implementação cobre 90% dos casos de uso de uma API REST moderna.

---
# 5.2. Restrições do REST

Para um sistema ser considerado verdadeiramente REST, ele deve aderir a 6 restrições arquiteturais. Cada uma delas existe para garantir escalabilidade e simplicidade.



## Cliente-Servidor (Client-Server)

Separação clara de responsabilidades.

* O cliente não se preocupa com armazenamento de dados.
* O servidor não se preocupa com interface de usuário ou estado da sessão do cliente.
* **Benefício:** Evolução independente. Você pode trocar o front-end (React para Mobile) sem tocar no banco de dados.

## Stateless (Sem Estado)

Esta é a restrição mais importante e mais difícil para iniciantes.
**Regra:** Cada requisição do cliente para o servidor deve conter **todas** as informações necessárias para entender e processar o pedido.

* O servidor não pode guardar "sessão do usuário" na memória entre requisições.
* Se o usuário está logado, o token de autenticação deve ir em **toda** requisição.
* **Benefício:** Escalabilidade horizontal. Qualquer servidor do cluster pode atender qualquer requisição, pois nenhum deles guarda estado "preso" na memória.

## Cacheável (Cacheable)

As respostas devem definir explicitamente se podem ou não ser cacheadas (pelo cliente ou por intermediários).

* Se o dado não muda muito (ex: lista de produtos), o cliente não deve perguntar ao servidor toda vez.
* **Benefício:** Reduz tráfego de rede e latência.

## Interface Uniforme (Uniform Interface)

O contrato entre cliente e servidor deve ser genérico e padronizado.
Isso simplifica e desacopla a arquitetura.
Inclui:

* Identificação de recursos (URIs).
* Manipulação via representações (JSON/XML).
* Mensagens autodescritivas (Headers, Content-Type).
* HATEOAS (Hypermedia as the Engine of Application State) -> Para mais detalhes, veja a seção 5.10.

## Sistema em Camadas (Layered System)

O cliente não precisa saber se está conectado diretamente ao servidor final ou a um intermediário (Load Balancer, CDN, Gateway).

* **Benefício:** Segurança e balanceamento de carga transparentes.

## Código sob Demanda (Code on Demand) - *Opcional*

O servidor pode estender a funcionalidade do cliente enviando código executável (ex: JavaScript). É a única restrição opcional e menos relevante para APIs puras de dados.



## O Desafio do Stateless na Prática

Muitos desenvolvedores violam o REST criando APIs que dependem de "sessão no servidor" (Sticky Sessions). Isso funciona com poucos usuários, mas quebra quando você precisa escalar para 10 servidores e o usuário cai num servidor que não tem a sessão dele.

> **No REST:** O estado da sessão fica no **Cliente** (no Token ou Cookie), não no Servidor.



## Checklist rápido

* [ ] Minha API guarda estado de navegação do usuário na memória do servidor? (Se sim, não é REST).
* [ ] As respostas da minha API informam cache?
* [ ] Posso colocar um Load Balancer na frente sem quebrar a lógica?



## Fontes

* **[RestfulAPI]:** [What is REST](https://restfulapi.net/)
* **[MDN]:** [HTTP Caching](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Caching)
* **[AWS]:** [Statelessness in REST](https://aws.amazon.com/what-is/restful-api/)

---
# 5.3.1. Anatomia Prática de uma Requisição REST

Agora que você entendeu o conceito abstrato de **Recurso** (Seção 5.3), vamos descer para a prática. Como transformar um recurso abstrato em uma requisição HTTP concreta?

Uma chamada REST bem desenhada faz uso preciso dos componentes do protocolo HTTP.



## O Path (Caminho): Path vs Query Params

Uma das dúvidas mais comuns é: "Coloco o dado na URL ou depois do `?`?"

### Path Params (Parâmetros de Caminho)

* **O que são:** Parte da estrutura da URL.
* **Quando usar:** Quando o valor é **obrigatório** para identificar o recurso. Se você tirar o parâmetro, a rota não faz sentido ou vira outra coisa.
* **Exemplo:** `/users/123`.
  * `123` é o ID. Sem ele, vira `/users` (que é a coleção inteira, não um item).

### Query Params (Parâmetros de Consulta)

* **O que são:** Pares chave=valor após o `?`.
* **Quando usar:** Quando o parâmetro é **opcional**, usado para filtrar, ordenar ou paginar. A rota base continua funcionando sem eles.
* **Exemplo:** `/users?active=true&sort=name`.
  * Se você remover `?active=true`, ainda acessa `/users`, apenas sem filtro.



## Como fazer isso com FastAPI

O FastAPI diferencia automaticamente Path de Query params baseado na declaração da função.

```python
from fastapi import FastAPI

app = FastAPI()

# 1. PATH PARAM: Declarado na rota como {item_id}
@app.get("/items/{item_id}")
def read_item(item_id: int):
    # O FastAPI sabe que item_id vem da URL porque está no path da rota
    return {"item_id": item_id}

# 2. QUERY PARAM: Declarado apenas como argumento da função
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    # O FastAPI sabe que skip/limit são query params (?skip=0&limit=10)
    # porque NÃO estão no path da rota
    return {"skip": skip, "limit": limit}
```



## Headers Essenciais e Content Negotiation

No REST, os headers definem o "contrato" da comunicação. Não basta mandar dados, é preciso dizer *o que* você está mandando e *o que* você aceita receber.

### `Content-Type: application/json`

* **Quem manda:** Quem está enviando dados (Client no POST, Server na Resposta).
* **O que diz:** "O pacote que estou te mandando agora é um JSON".
* **Por que importa:** Sem isso, o servidor pode tentar ler os bytes como texto puro, XML ou form-data e falhar.

### `Accept: application/json`

* **Quem manda:** O Cliente (Navegador/App).
* **O que diz:** "Por favor, me responda em JSON. Se você me mandar XML, eu não sei ler".
* **Negociação de Conteúdo:** Se o servidor só fala XML e recebe esse header, ele deve retornar erro `406 Not Acceptable`.



## Como o FastAPI lida com Headers por padrão

O FastAPI já cuida de boa parte do trabalho pesado com headers automaticamente. Você não precisa configurar nada para o básico funcionar.

### Resposta: `Content-Type` automático

* **O que acontece:** Quando você retorna um `dict` ou um modelo Pydantic, o FastAPI automaticamente serializa para JSON e adiciona o header `Content-Type: application/json`.
* **Você não precisa fazer nada:** Basta retornar o dado.

### Requisição: Parsing automático do Body

* **O que acontece:** Quando você declara um parâmetro com um [modelo Pydantic]() ou usa `Body()`, o FastAPI lê o header `Content-Type` da requisição e faz o parse do JSON automaticamente.
* **Se o JSON for inválido:** Retorna `422 Unprocessable Entity` com detalhes do erro.

### Header `Accept` não é validado por padrão

* **Atenção:** O FastAPI **não** valida o header `Accept` automaticamente. Ele sempre responde JSON por padrão, independente do que o cliente pedir.
* **Consequência:** Não retorna `406 Not Acceptable`. Se você precisa desse comportamento, terá que implementar manualmente.

### Exemplo Prático

## O Método e o Payload (Corpo)

A escolha do método define se você precisa enviar dados (payload) e como.

| Método          | Tem Body? | Função no REST                                                                   | Exemplo de Payload                                                     |
| : | :-- | : | : |
| **GET**    | Não      | Ler dados. Nunca envie JSON no corpo de um GET. Alguns clientes HTTP nem permitem. | N/A                                                                    |
| **POST**   | Sim       | Criar um novo recurso ou processar dados.                                          | `{ "nome": "João", "email": "j@test.com" }`                         |
| **PUT**    | Sim       | Substituir um recurso inteiro.                                                     | `{ "nome": "João Silva", "email": "j@test.com" }` (Objeto completo) |
| **PATCH**  | Sim       | Atualizar parcialmente um recurso.                                                 | `{ "nome": "João Silva" }` (Só o campo que mudou)                  |
| **DELETE** | Não*     | Remover um recurso.                                                                | Geralmente vazio (*alguns permitem, mas evite).                        |



## Status Codes no Contexto REST

O HTTP tem dezenas de códigos, mas no dia a dia REST você usará estes 90% do tempo:

### Sucesso

* **200 OK:** "Deu certo" (Genérico). Usado em GET, PUT, PATCH.
* **201 Created:** "Criei com sucesso". **Obrigatório** para POST de criação.
* **204 No Content:** "Deu certo, mas não tenho nada para te devolver". Comum em DELETE.

### Erro do Cliente (4xx)

* **400 Bad Request:** "Sua requisição está mal formatada" (Ex: faltou o campo email no JSON).
* **401 Unauthorized:** "Quem é você?" (Faltou token de login).
* **403 Forbidden:** "Sei quem é, mas você não tem permissão".
* **404 Not Found:** "O recurso não existe".

### Erro do Servidor (5xx)

* **500 Internal Server Error:** "Bug no servidor". Nunca deve ser retornado intencionalmente.



## Checklist Prático

1. [ ] Se é **GET**, não mande body. Use Query Params.
2. [ ] Se é **POST/PUT**, mande o header `Content-Type: application/json`.
3. [ ] Vai criar? Retorne **201**.
4. [ ] Não encontrou? Retorne **404** (não retorne 200 com array vazio se pediu um ID específico).

---
# 5.3. Recursos, coleções e identificadores

No coração do REST está o conceito de **Recurso**.
Esqueça as tabelas do banco de dados por um momento. Pense no que sua API expõe para o mundo.



## O que é um Recurso?

Um recurso é qualquer coisa que possa ser nomeada e manipulada. É um conceito abstrato, não necessariamente uma linha no banco.

* Um usuário (`joao`)
* Uma coleção de usuários (`todos os usuários`)
* Um resultado de busca
* Um processo (ex: `inscrição`)

## Substantivos, não Verbos

URLs RESTful devem ser baseadas em **substantivos** (coisas), nunca em verbos (ações). A ação é definida pelo método HTTP (GET, POST, DELETE), não pela URL.

* **Errado\* (RPC):**
  * `GET /getUsers`
  * `POST /createUser`
  * `POST /deleteUser?id=1`
* **Certo\* (REST):**
  * `GET /users`
  * `POST /users`
  * `DELETE /users/1`

\* Note que certo e errado aqui é referente a estar de acordo com os padrões REST, mas não significa que a abordagem RPC não deva ser utilizada. Se quiser se aprofundar um pouco mais, você pode dar uma olhada nesse [artigo](https://medium.com/lfdev-blog/e-agora-api-rest-ou-rpc-c24664d4755b)

## Coleções vs Documentos

As URIs geralmente seguem um padrão hierárquico:

1. **Coleção:** Uma lista de recursos.

   * URI: `/produtos`
   * Semântica: "O catálogo inteiro de produtos".
2. **Documento (Recurso Singular):** Um item específico dentro da coleção.

   * URI: `/produtos/123`
   * Semântica: "O produto com ID 123".



## Singleton Resources (Recursos Únicos)

Às vezes, um recurso só existe uma vez dentro de um contexto.
Exemplo: "O perfil do usuário logado".

* `/me` ou `/user/profile`
  * Não precisa de ID, pois o token de autenticação já diz quem é o usuário.



## Identificadores

O identificador (ID) é crucial para alcançar um recurso específico.

* **IDs Numéricos:** `/users/105` (Fácil, legível, mas expõe quantos usuários você tem).
* **UUIDs:** `/users/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` (Seguro, único globalmente, mas feio na URL).
* **Slugs:** `/artigos/como-aprender-backend` (Ótimo para SEO e legibilidade).



## Como fazer isso com FastAPI

No FastAPI, nós definimos a **estrutura do recurso** usando modelos Pydantic. Isso cria o contrato de dados (Schema).

```python
from pydantic import BaseModel
from typing import List

# Definindo o "Recurso" Produto
class Product(BaseModel):
    id: int
    name: str
    price: float
    in_stock: bool

# Endpoint que retorna uma Coleção (Lista de Produtos)
# Note o List[Product] - O FastAPI entende que é uma coleção
@app.get("/products", response_model=List[Product])
def get_products():
    return [
        {"id": 1, "name": "Teclado", "price": 100.0, "in_stock": True},
        {"id": 2, "name": "Mouse", "price": 50.0, "in_stock": False}
    ]

# Endpoint que retorna um Recurso Singular (Um Produto)
@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    return {"id": product_id, "name": "Teclado", "price": 100.0, "in_stock": True}
```



## Checklist rápido

* [ ] Minhas URLs usam apenas substantivos? (Nada de `/calcularFrete`).
* [ ] Consigo distinguir claramente Coleções (`/users`) de Recursos (`/users/1`)?
* [ ] Meus IDs são estáveis (não mudam com o tempo)?



## Fontes

* **[Microsoft]:** [REST API Design Guidelines - Resources](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#organize-the-api-design-around-resources)
* **[Google AIP]:** [Resource Names](https://google.aip.dev/122)

---
# 5.4. Convenções de rotas RESTful

Desenhar URLs é uma arte. Uma URL bem desenhada é intuitiva: um desenvolvedor consegue "adivinhar" como acessar um recurso sem ler a documentação.



## Use Plural para Coleções
Existe um debate eterno (Singular vs Plural), mas o **Plural** venceu na indústria.
*   **Bom:** `/users`, `/products`, `/orders`
*   **Ruim:** `/user`, `/product`, `/order`

Por que? Porque `/users` (no plural) deixa claro que é uma coleção que contém vários itens.
E quando você acessa `/users/1`, semanticamente você está dizendo "Da coleção de usuários, pegue o item 1".

## Hierarquia e Aninhamento
Use barras `/` para indicar hierarquia (pai/filho).

*   **Cenário:** Pedidos pertencem a um Usuário.
*   **Rota:** `GET /users/123/orders`
    *   Significado: "Pegue todos os pedidos do usuário 123".

*   **Rota:** `GET /users/123/orders/5`
    *   Significado: "Pegue o pedido 5 do usuário 123".

**Cuidado com aninhamento profundo:**
Evite: `/users/1/orders/5/items/10/details`
Se o recurso é único globalmente, prefira achatar a URL:
`GET /order-items/10`

## kebab-case nas URLs
Para nomes compostos em URLs, o padrão da web é usar hífen (kebab-case).
*   **Bom:** `/customer-orders`, `/api-keys`
*   **Ruim:** `/customerOrders` (camelCase), `/customer_orders` (snake_case).
*   **Por que?** Google e mecanismos de busca tratam o hífen como separador de palavras, mas o underscore não. Além disso, é mais fácil de ler.

## Query Params para filtros
Não crie rotas novas para filtrar coisas. Use a query string (depois do `?`).

*   **Errado:** `/users/active` (Parece um ID "active" ou sub-recurso).
*   **Certo:** `/users?status=active`



## Ações que não são CRUD

Às vezes você precisa de uma ação que não cabe perfeitamente em "Criar, Ler, Atualizar, Deletar". Ex: "Ativar", "Cancelar", "Calcular".

**Abordagem 1: Tratar como campo (O jeito mais REST)**
Em vez de "cancelar", você "atualiza o status para cancelado".
`PATCH /orders/123` com body `{ "status": "canceled" }`

**Abordagem 2: Sub-recurso de ação (Pragmático)**
Trate a ação como um recurso funcional.
`POST /orders/123/cancellation`
(Você está "criando um cancelamento").



## Como fazer isso com FastAPI

Para organizar rotas em larga escala e manter as convenções (como prefixos plurais), o FastAPI usa o conceito de `APIRouter`.

```python
from fastapi import FastAPI, APIRouter

app = FastAPI()

# Criamos um "grupo de rotas" para usuários
# O prefixo "/users" garante o plural e evita repetir código
router = APIRouter(prefix="/users")

@router.get("/")
def get_users():
    # Rota final: GET /users
    return []

@router.get("/{user_id}")
def get_user(user_id: int):
    # Rota final: GET /users/1
    return {"user_id": user_id}

@router.get("/{user_id}/orders")
def get_user_orders(user_id: int):
    # Rota final: GET /users/1/orders
    return []

# Registramos o router no app principal
app.include_router(router)
```

**Dica de Clean Code:** Com `APIRouter`, você pode colocar todo o código de usuários em um arquivo `users.py` separado, mantendo seu projeto limpo.



## Checklist rápido

*   [ ] Estou usando plural nas coleções (`/users`)?
*   [ ] Uso hífens para separar palavras na URL?
*   [ ] Evitei verbos na URL?
*   [ ] Meus filtros estão na query string (`?tipo=X`) e não no path?



## Fontes

*   **[RestfulAPI]:** [Resource Naming](https://restfulapi.net/resource-naming/)
*   **[Zalando]:** [RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/#naming)

---
# 5.5. CRUD mapeado para HTTP

Uma das maiores vantagens do REST é aproveitar a semântica que o protocolo HTTP já possui. Não reinvente a roda.

Mapeamento básico de operações de Banco de Dados (CRUD) para verbos HTTP:



## Create (Criar) -> POST
Use **POST** em uma coleção para criar um novo item nela.
*   **Rota:** `POST /users`
*   **Comportamento:** O servidor gera o ID do novo recurso.
*   **Retorno:** Status `201 Created` + Header `Location: /users/50` + JSON do criado.

## Read (Ler) -> GET
Use **GET** para ler dados.
*   **Coleção:** `GET /users` (Lista todos ou filtra).
*   **Recurso:** `GET /users/50` (Pega detalhes de um).
*   **Importante:** GET deve ser **Safe** (Seguro). Ele nunca deve alterar dados no servidor. Você pode rodar um GET 1000 vezes e o banco de dados continua igual.

## Update (Atualizar) -> PUT ou PATCH
Aqui existe uma distinção crucial.

### PUT (Substituição Completa)
Use **PUT** quando você está enviando o recurso **inteiro** para substituir o que está lá.
*   **Rota:** `PUT /users/50`
*   **Body:** `{ "nome": "Ana", "email": "ana@mail.com", "idade": 30 }`
*   **Regra:** Se você esquecer de mandar o campo "idade", o servidor deve entender que a idade agora é `null` ou vazia. O PUT substitui tudo.

### PATCH (Atualização Parcial)
Veja a próxima seção (5.7) para detalhes. É usado para mudar apenas um campo.

## Delete (Apagar) -> DELETE
Use **DELETE** para remover um recurso.
*   **Rota:** `DELETE /users/50`
*   **Retorno:** `204 No Content` (Sucesso, sem corpo) ou `200 OK` (se quiser retornar json).



## Tabela Resumo

| Verbo | Operação | Rota Exemplo | Sucesso Típico |
| : | : | : | : |
| **GET** | Ler | `/users` ou `/users/1` | 200 OK |
| **POST** | Criar | `/users` | 201 Created |
| **PUT** | Substituir | `/users/1` | 200 OK ou 204 |
| **PATCH** | Modificar | `/users/1` | 200 OK |
| **DELETE** | Remover | `/users/1` | 204 No Content |



## Erro Comum: Tunneling (Túnel)

Algumas APIs usam `POST` para tudo (ler, apagar, atualizar). Isso chama-se "HTTP Tunneling" e perde todos os benefícios de cache, visibilidade e semântica da Web.
Se sua API só usa POST, ela **não é REST**, é RPC sobre HTTP.



## Como fazer isso com FastAPI

O FastAPI mapeia os verbos através dos "decorators" das rotas.

```python
from fastapi import FastAPI, status

app = FastAPI()

# 1. READ (GET)
# Status 200 é o padrão, não precisa declarar
@app.get("/items")
def read_items():
    return [{"name": "Item 1"}]

# 2. CREATE (POST)
# status.HTTP_201_CREATED garante o retorno correto
@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(item: dict):
    return item

# 3. UPDATE (PUT)
@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    return {"item_id": item_id, **item}

# 4. DELETE (DELETE)
# status.HTTP_204_NO_CONTENT para respostas vazias
@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int):
    # Lógica de deletar...
    return # Retorna nada, pois é 204
```



## Checklist rápido

*   [ ] O GET apenas lê dados (não muda nada)?
*   [ ] O POST é usado para criar novos recursos na coleção?
*   [ ] O DELETE realmente apaga (ou desativa) o recurso?
*   [ ] Estou retornando 201 Created quando crio algo?



## Fontes

*   **[MDN]:** [HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
*   **[RFC 7231]:** [Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://datatracker.ietf.org/doc/html/rfc7231#section-4)

---
# 5.6. Filtros, paginação e ordenação

APIs reais lidam com muitos dados. Retornar `GET /users` e devolver 1 milhão de linhas vai derrubar seu banco e a rede do cliente. Você precisa limitar e organizar isso.



## Filtros (Filtering)
Use parâmetros de Query String (`?`) para filtrar.
*   `GET /cars?color=red`
*   `GET /cars?color=red&brand=ferrari`

**Para operadores avançados:**
Existem vários padrões, escolha um e seja consistente:
*   `price[gte]=100` (Greater Than or Equal - estilo inspirado em MongoDB/Rails)
*   `price_min=100` (Simples e legível)

## Ordenação (Sorting)
Permita que o cliente decida a ordem.
*   Padrão comum: parâmetro `sort` ou `order_by`.
*   Crescente: `?sort=price`
*   Decrescente: `?sort=-price` (sinal de menos) ou `?sort=price,desc`

## Paginação (Pagination)
Nunca retorne listas ilimitadas. Pagine por padrão.

### Estilo 1: Offset/Limit (Página e Tamanho)
O mais comum e fácil de implementar.
*   `GET /users?page=1&limit=20` (Página 1, 20 itens)
*   `GET /users?page=2&limit=20` (Pula 20, pega mais 20)
*   **Problema:** Em bases gigantes, o banco sofre para fazer `OFFSET 1000000` (ele lê 1 milhão de linhas para jogar fora e pegar as próximas 10).

### Estilo 2: Cursor (Token)
Mais performático e robusto para feeds infinitos (como Instagram/Twitter).
*   `GET /posts?limit=10` -> Retorna itens e um `next_cursor: "xyz"`
*   `GET /posts?cursor=xyz`
*   O cursor geralmente aponta para o ID ou Timestamp do último item visto. O banco vai direto ao ponto (`WHERE id > ultimo_id`).



## Estrutura de Resposta Paginada

Seus metadados de paginação devem ir no corpo da resposta (envelope) ou nos Headers (`Link` header). A abordagem de envelope é mais fácil para iniciantes.

```json
{
  "data": [ ... array de itens ... ],
  "meta": {
    "total_items": 150,
    "current_page": 1,
    "total_pages": 8,
    "per_page": 20
  }
}
```



## Checklist rápido

*   [ ] Todas as minhas coleções têm paginação padrão (default limit)?
*   [ ] Meus nomes de filtro batem com os nomes dos campos (`?status` filtra o campo `status`)?
*   [ ] Decidi como indicar ordenação decrescente (ex: `-campo`)?



## Fontes

*   **[Stripe]:** [API Pagination Design](https://stripe.com/docs/api/pagination)
*   **[Microsoft]:** [Paging and Filtering Best Practices](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#filtering-and-pagination)

---
# 5.7. Atualizações parciais e PATCH

Muitas vezes o cliente quer mudar apenas o `status` de um pedido, sem precisar reenviar o endereço, lista de produtos e valor total. É aqui que entra o **PATCH**.



## PUT vs PATCH

A confusão é comum, mas a regra é técnica e semântica:

*   **PUT:** É uma **substituição completa**.
    *   Cliente: "Tome este objeto. O estado novo do recurso 50 deve ser EXATAMENTE este aqui."
    *   Se o cliente mandar um JSON só com `{ "nome": "Novo" }` num PUT, o servidor deveria (teoricamente) apagar o resto dos campos e deixar só o nome. (Na prática, muitos frameworks fazem merge, violando a semântica estrita do PUT).

*   **PATCH:** É uma **modificação parcial**.
    *   Cliente: "No recurso 50, mude apenas o campo 'nome' para 'Novo' e mantenha o resto como está."



## Como implementar PATCH corretamente?

Existem duas formas principais:

### JSON Merge Patch (RFC 7396) - O mais simples
É o que a maioria usa. Você envia um JSON parcial.
*   **Request:** `PATCH /users/1`
*   **Body:** `{ "email": "novo@email.com" }`

**O Problema do Null:**
Como deletar um campo opcional?
*   `{ "apelido": null }` -> Significa "defina apelido como nulo".
*   `{ }` (sem a chave) -> Significa "não toque no apelido".

Para isso funcionar, seu backend precisa distinguir `null` de `undefined` (chave ausente).

### JSON Patch (RFC 6902) - O "avançado"
Define uma lista de operações a serem executadas.
```json
[
  { "op": "replace", "path": "/email", "value": "novo@email.com" },
  { "op": "remove", "path": "/apelido" }
]
```
É poderoso, mas complexo de implementar e pouco usado em APIs simples.



## Recomendação Prática

Use **PATCH** com a estratégia simples (Merge Patch).
Aceite um JSON parcial, valide apenas os campos que vieram, e atualize no banco apenas essas colunas.



## Checklist rápido

*   [ ] Minha API suporta mudar apenas um campo sem enviar o objeto todo?
*   [ ] Consigo limpar um campo enviando `null` no PATCH?
*   [ ] Entendi que PUT substitui o objeto todo?



## Fontes

*   **[RFC 7396]:** [JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396)
*   **[RFC 5789]:** [PATCH Method for HTTP](https://datatracker.ietf.org/doc/html/rfc5789)
*   **[William Durand]:** [Please don't use PUT (Use PATCH)](https://williamdurand.fr/2014/02/14/please-do-not-use-put-always-use-patch/)

---
# 5.8. Idempotência e retries

Na Web, a rede falha. O cliente envia uma requisição, o servidor processa, cobra o cartão de crédito, mas a resposta se perde na volta (timeout).
O cliente não sabe se deu certo. O que ele faz? Tenta de novo (Retry).

Se a sua API não for **Idempotente**, o cliente vai cobrar o cartão duas vezes.



## O que é Idempotência?

Uma operação é idempotente se fazê-la **uma vez** ou **várias vezes** produz o mesmo efeito no estado do servidor.

*   **Idempotente (Seguro):**
    *   `GET /pedidos/10` -> Retorna o pedido. Se chamar 10 vezes, nada muda.
    *   `PUT /pedidos/10` -> Atualiza o pedido para o estado X. Se chamar 10 vezes com o mesmo body, o pedido continua no estado X. (Na primeira atualiza, nas outras sobrescreve com o mesmo valor).
    *   `DELETE /pedidos/10` -> Apaga. Se chamar de novo, dá 404, mas o estado do servidor é o mesmo (o pedido não existe mais).

*   **NÃO Idempotente (Perigoso):**
    *   `POST /pedidos` -> Cria um pedido novo. Se o cliente tentar de novo (retry), cria **outro** pedido duplicado.
    *   `PATCH /pedidos/10` -> Depende. Se for "adicionar +1 item", não é idempotente. Se for "definir status=pago", é idempotente.



## Como tornar o POST seguro? (Idempotency Keys)

Para operações críticas (pagamentos, criação de pedidos), usamos **Chaves de Idempotência**.

1.  O cliente gera um ID único (UUID) para aquela ação: `Idempotency-Key: abc-123`.
2.  O cliente envia o `POST /pagar` com esse Header.
3.  O servidor recebe.
    *   Se nunca viu a chave `abc-123`: Processa o pagamento e salva a chave + resposta no banco.
    *   Se já viu a chave `abc-123`: **Não processa de novo**. Apenas retorna a resposta salva anteriormente.

Dessa forma, o cliente pode tentar de novo (retry) quantas vezes quiser sem medo de duplicar a cobrança.



## Checklist rápido

*   [ ] Meus endpoints PUT e DELETE são idempotentes?
*   [ ] Tenho mecanismos para evitar duplicidade em POSTs críticos (pagamentos)?
*   [ ] O cliente sabe que pode tentar de novo em caso de erro de rede (Network Error)?



## Fontes

*   **[Stripe]:** [Designing robust APIs with Idempotency](https://stripe.com/blog/idempotency)
*   **[MDN]:** [Idempotent Methods](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)
*   **[RFC 7231]:** [Idempotent Methods definition](https://datatracker.ietf.org/doc/html/rfc7231#section-4.2.2)

---
# 5.9. Versionamento de APIs

Toda API de sucesso um dia vai precisar mudar de forma incompatível (Breaking Change). Quando isso acontece, você precisa de versionamento.



## Quando versionar?

Apenas quando você quebra o contrato (remove campos, muda tipos, muda lógica obrigatória).
Adicionar campos novos **não requer** versão nova (veja Seção 4.5).



## Estratégias de Versionamento

Existem 3 formas principais. Nenhuma é perfeita, escolha uma e siga.

### Versionamento na URI (Path Versioning) - **Mais Comum**
Coloca a versão explicitamente na URL.
*   `GET /v1/users`
*   `GET /v2/users`

**Prós:** Extremamente claro. Fácil de testar no navegador. Fácil de configurar no roteador do framework.
**Contras:** Tecnicamente, você está dizendo que `/v1/users` e `/v2/users` são recursos diferentes, o que fere o purismo REST. (Mas todo mundo faz: Google, Twitter, Stripe).

### Versionamento no Header (Header Versioning)
O cliente pede a versão num cabeçalho customizado.
*   Header: `X-API-Version: 2`

**Prós:** URL fica limpa (`/users`). Mantém a semântica de que o recurso é o mesmo.
**Contras:** Mais difícil de testar (precisa de ferramentas como Postman). Caches intermediários podem se confundir se não configurados corretamente (`Vary` header).

### Content Negotiation (Accept Header)
A forma "Pura REST". O cliente pede a versão no tipo de conteúdo.
*   Header: `Accept: application/vnd.minhaempresa.v2+json`

**Prós:** A mais correta academicamente.
**Contras:** A mais chata de implementar e usar.



## Recomendação: URI Versioning (`/v1/`)

Para a maioria dos projetos, a simplicidade do `/v1/` na URL vence qualquer argumento purista. É fácil de ver, fácil de debugar e funciona em qualquer lugar.

> **Dica:** Comece seu projeto já com `/v1/` na URL, mesmo que não tenha a v2. É mais fácil do que tentar colocar depois que já tem cliente usando sem prefixo.



## Checklist rápido

*   [ ] Minha API tem uma estratégia de versionamento definida?
*   [ ] Se eu mudar a versão, mantenho a antiga rodando por um tempo (Deprecation Policy)?
*   [ ] Escolhi um método (URI, Header) e mantive consistente?



## Fontes

*   **[Microsoft]:** [API Versioning](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#versioning-a-restful-web-api)
*   **[Stripe]:** [Versioning Strategy (Eles usam Data)](https://stripe.com/docs/api/versioning)
*   **[RestfulAPI]:** [Versioning REST APIs](https://restfulapi.net/versioning/)
