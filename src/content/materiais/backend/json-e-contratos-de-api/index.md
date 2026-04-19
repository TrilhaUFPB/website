---
title: JSON e Contratos de API
description: Introdução a JSON e contratatos
category: Backend
order: 5
---

# 4.0. Visão Geral: Dados e Contratos

Bem-vindo à **Parte 2** da trilha. Na Parte 1, entendemos como o HTTP funciona (o "transporte"). Agora, vamos focar na **carga** que esse transporte leva.

Em um sistema de backend, não basta conectar cabos; é preciso garantir que os dois lados falem a mesma língua e respeitem as mesmas regras. É aqui que entram os **Dados** e os **Contratos**.



## O que você vai aprender neste módulo?

Este módulo (Seção 4) foi desenhado para te levar do "zero" ao "profissional" no que tange à troca de dados em APIs.

### 1. A Base (O Formato)
*   **Seção 4.1 e 4.2:** Vamos dominar o **JSON**. Ele parece simples, mas tem armadilhas de tipagem e estrutura que derrubam sistemas em produção. Você vai aprender a estruturar JSONs limpos e evitar erros comuns.

### 2. A Mecânica (Serialização)
*   **Seção 4.3:** Como seu código Python (dicionários, objetos, listas) vira texto para trafegar na rede? Vamos entender o processo de **Serialização e Deserialização**, o coração de qualquer framework web.

### 3. As Regras (Contratos)
*   **Seção 4.4 e 4.5:** Aqui o nível sobe. Vamos falar sobre **Contratos de Interface**. Como garantir que o frontend mande o que o backend espera? O que acontece se eu mudar um campo na API? Como evoluir sem quebrar quem já usa? (Compatibilidade retroativa).

### 4. A Formalização (OpenAPI)
*   **Seção 4.6:** Você vai aprender sobre **OpenAPI (Swagger)**. Não apenas como uma "documentação bonitinha", mas como um contrato formal que pode gerar código e validar requisições automaticamente.

### 5. O Tratamento de Problemas
*   **Seção 4.7:** Por fim, vamos padronizar como sua API diz que algo deu errado. Modelagem de erros consistente é o que separa APIs amadoras de APIs profissionais.



## Por que isso é importante?

Muitos desenvolvedores focam apenas em "fazer o código funcionar". Mas em sistemas distribuídos (microserviços, frontend separado, mobile), o **acoplamento** se dá pelos dados.

Se você muda o formato de um dado sem aviso, o sistema quebra. Se você não valida o que recebe, seu banco de dados corrompe.

Este módulo vai te dar a mentalidade de **"API First"**: pensar no contrato e nos dados antes mesmo de escrever a primeira linha de lógica de negócio.

---
# 4.1. JSON como formato de troca de dados

No desenvolvimento de backend moderno, sistemas precisam conversar entre si. O **JSON (JavaScript Object Notation)** se tornou a língua universal para essa conversa.

Hoje, estima-se que **mais de 90%** das APIs públicas na web utilizem JSON como formato principal de troca de dados. Ele venceu a guerra contra o XML e se estabeleceu como o padrão *de facto* para comunicação cliente-servidor, mobile-backend e microserviços.

## Ficha Técnica do JSON

Antes de entrar na estrutura, é importante conhecer os "dados de identidade" desse formato:

*   **Extensão de arquivo:** `.json`
*   **MIME Type (Media Type):** `application/json` (Isso é o que vai no header `Content-Type`)
*   **Origem:** Derivado da sintaxe de objetos literais do JavaScript.
*   **Padronização:** RFC 8259.

Embora tenha "JavaScript" no nome, o JSON hoje é **agnóstico de linguagem**. Isso significa que Python, Java, Go, Ruby, C# e praticamente qualquer outra linguagem moderna conseguem ler e gerar JSON nativamente.



## Estrutura do JSON

O JSON é construído sobre duas estruturas fundamentais:

1.  **Objetos:** Uma coleção de pares chave/valor.
    *   Começa com `{` e termina com `}`.
    *   As chaves são strings (sempre entre aspas duplas).
    *   Os valores podem ser qualquer tipo suportado.
2.  **Arrays (Listas):** Uma lista ordenada de valores.
    *   Começa com `[` e termina com `]`.

### Exemplo visual

```json
{
  "nome": "Trilha Backend",
  "ativo": true,
  "tags": ["api", "json", "rest"],
  "meta": {
    "versao": 1.0,
    "criado_em": "2024-01-01"
  }
}
```



## Por que JSON domina o mercado

### 1) Simplicidade e Leveza
Comparado ao XML, o JSON é menos verboso. Não exige tags de fechamento complexas, o que economiza banda de rede e processamento (parse).

### 2) Compatibilidade Nativa
Como nasceu do JavaScript, qualquer navegador processa JSON nativamente. No backend (Python, Java, Go, Node.js), bibliotecas padrão lidam com ele de forma transparente.

### 3) Legibilidade
Um ser humano consegue abrir um arquivo JSON e entender o conteúdo sem precisar de ferramentas complexas.



## Contexto Histórico e Outros Usos

O JSON foi popularizado no início dos anos 2000 por Douglas Crockford. Na época, o XML (com SOAP) era o padrão corporativo, mas era pesado e difícil de manipular no navegador (AJAX). O JSON surgiu como uma alternativa leve.

Hoje, além de APIs, o JSON é usado para:
*   **Arquivos de Configuração:** O famoso `package.json` (Node.js), `composer.json` (PHP) ou configurações do VS Code (`settings.json`).
*   **Bancos de Dados NoSQL:** MongoDB e CouchDB armazenam dados em formatos que são essencialmente JSON (ou BSON).
*   **Logs:** Logs estruturados em servidores geralmente são salvos linha a linha como JSON para facilitar a busca.



## Regras de Ouro (Sintaxe Estrita)

Diferente do JavaScript, o JSON é **estrito**:

*   **Aspas:** Chaves e Strings **devem** usar aspas duplas (`"`). Aspas simples (`'`) causam erro.
*   **Vírgulas:** Não é permitido vírgula após o último elemento (trailing comma).
*   **Comentários:** JSON **não suporta** comentários. Se você precisa comentar, o dado provavelmente não deveria estar ali ou você deveria usar um campo de documentação.



## Exemplo guiado: De objeto para JSON

Imagine que você tem um usuário no seu código Python:

```python
usuario = {
    "id": 1,
    "nome": "Ana",
    "admin": False
}
```

Quando esse dado viaja pela rede, ele é convertido para uma **string** no formato JSON:

```json
"{\"id\": 1, \"nome\": \"Ana\", \"admin\": false}"
```

Note que `False` (Python) virou `false` (JSON). Essa conversão de tipos é automática, mas exige atenção, como veremos no próximo tópico.



## Checklist rápido

*   [ ] Entendi que JSON é texto (string) usado para transportar dados.
*   [ ] Sei que o MIME type correto é `application/json`.
*   [ ] Sei diferenciar um Objeto (`{}`) de um Array (`[]`).
*   [ ] Lembro que chaves precisam de aspas duplas.
*   [ ] Sei que não posso deixar vírgula sobrando no final.



## Fontes

*   **[JSON.org]:** Especificação oficial (json.org)
*   **[MDN]:** Trabalhando com JSON (developer.mozilla.org)
*   **[FAST]:** FastAPI e JSON (fastapi.tiangolo.com)

---
# 4.2. Tipos, estruturas e armadilhas comuns

O JSON parece simples, mas a simplicidade esconde armadilhas que podem causar bugs sérios em produção. O problema principal é a **conversão de tipos**: o que é um número no seu banco de dados nem sempre chega igual no JSON, e vice-versa.



## Os Tipos de Dados do JSON

O padrão JSON define apenas 6 tipos de dados. Todo o resto é invenção ou convenção.

1.  **String:** `"texto"` (Sempre aspas duplas).
2.  **Number:** `10`, `10.5`, `-5` (Inteiros e flutuantes são o mesmo tipo).
3.  **Boolean:** `true` ou `false` (Minúsculo).
4.  **Null:** `null` (Representa ausência de valor).
5.  **Object:** `{ ... }`.
6.  **Array:** `[ ... ]`.



## Armadilhas Comuns (Onde os bugs moram)

### 1) A falta de Data e Hora
JSON **não tem** tipo `Date`.
Se você precisa enviar uma data, deve convertê-la para String ou Number (timestamp).

**Padrão recomendado:** ISO 8601 (String).
*   Bom: `"2024-12-31T23:59:59Z"` (Legível, ordenável, com fuso horário).
*   Ruim: `"31/12/2024"` (Ambíguo dependendo do país).

### 2) Números e Precisão
Em JSON, todo número é tecnicamente um ponto flutuante de dupla precisão (como o `float` em Python ou `double` em C).

**O Perigo:** IDs numéricos muito grandes (ex: IDs do Twitter/X ou de bancos bancários) podem perder precisão quando chegam no JavaScript do navegador.
*   ID real: `9007199254740993`
*   JavaScript lê como: `9007199254740992` (Arredondou!)

**Solução:** Se o número for um identificador grande ou valor monetário crítico, **envie como String**.
```json
{ "id": "9007199254740993", "saldo": "150.50" }
```

### 3) Null vs Ausência de Chave
Existe uma diferença semântica importante entre enviar `null` e não enviar a chave.

*   `"apelido": null` -> "Eu sei que o campo existe, e o valor dele é vazio propositalmente (ex: limpei o apelido)."
*   *(chave ausente)* -> "Não altere esse campo" ou "Dado desconhecido".

Em atualizações parciais (PATCH), essa diferença define se você apaga um dado ou se apenas o ignora.

### 4) Decimais e Dinheiro
Nunca confie em `floats` para dinheiro devido a erros de arredondamento binário (`0.1 + 0.2` muitas vezes não é exatamente `0.3` em computadores).

**Solução:**
*   Envie como inteiros (centavos): `1500` (para R$ 15,00).
*   Ou envie como String: `"15.00"`.



## Exemplo guiado: Um JSON robusto

Vamos ver um JSON mal formatado e como corrigi-lo.

### Ruim (Frágil)
```json
{
  "data_nascimento": "01/02/1990",  // Ambíguo
  "salario": 1200.50,               // Perigo de float
  "filhos": null                    // É null ou array vazio?
}
```

### Bom (Robusto)
```json
{
  "data_nascimento": "1990-02-01",  // ISO 8601
  "salario": "1200.50",             // String para precisão decimal
  "filhos": []                      // Lista vazia é melhor que null
}
```



## Checklist rápido

*   [ ] Estou usando ISO 8601 para datas?
*   [ ] IDs gigantes e valores monetários estão protegidos (string ou inteiros)?
*   [ ] Defini se listas vazias retornam `[]` ou `null`? (Prefira `[]`).
*   [ ] Estou tratando a diferença entre `null` e "chave inexistente"?



## Fontes

*   **[MDN]:** JSON Data Types
*   **[ISO]:** ISO 8601 Date and Time Format
*   **[Google Style]:** JSON Style Guide (Google)

---
# 4.3. Serialização e deserialização

O seu código não "fala" JSON nativamente. Ele fala objetos Python (dicionários, listas, classes). Para que o dado saia da memória do seu servidor e viaje pela rede, ocorre um processo de transformação.



## O Conceito

### Serialização (Marshalling)
É o ato de transformar um objeto em memória (vivo) em uma sequência de bytes (texto) que pode ser salva ou transmitida.
*   **De:** `Object` (Python/Memory)
*   **Para:** `String` (JSON/Wire)

### Deserialização (Unmarshalling)
É o inverso. Pegar um texto recebido e reconstruir o objeto na memória.
*   **De:** `String` (JSON/Wire)
*   **Para:** `Object` (Python/Memory)



## O Custo Oculto

Serializar e deserializar custa CPU. Em APIs de altíssimo tráfego, esse processo pode ser o gargalo.
Frameworks modernos como **FastAPI** (usando Pydantic) são otimizados para fazer isso rápido, mas é importante saber que "não é de graça".

Enviar campos desnecessários no JSON significa gastar CPU à toa serializando dados que ninguém vai usar.



## Convenções de Nomes (Case Styles)

Aqui existe uma briga clássica entre linguagens.

*   **Python/Ruby:** Usam `snake_case` (`nome_usuario`).
*   **JavaScript/JSON:** Costumam usar `camelCase` (`nomeUsuario`).

**O que fazer?**
O padrão de mercado para APIs REST JSON tende ao **snake_case** ou **camelCase**, mas a consistência é o mais importante.
Se seu backend é Python, é comum a API aceitar/retornar `snake_case` para evitar conversões desnecessárias, mas se o time de front-end exigir `camelCase`, você precisará configurar seu serializador para converter automaticamente.

> **Regra:** Escolha um padrão e siga-o na API inteira. Não misture `user_id` com `userId`.



## Segurança na Deserialização

Deserializar dados é perigoso. Você está pegando uma entrada externa e instanciando objetos na memória do seu servidor.

**Riscos:**
1.  **Injeção de Objetos:** Em algumas linguagens (como Java ou Python com `pickle`), deserializar cegamente pode permitir execução de código. **Com JSON padrão (`json.loads`), isso é seguro quanto à execução**, mas ainda exige validação.
2.  **Negação de Serviço (DoS):** Um atacante pode enviar um JSON aninhado profundamente (ex: 10.000 arrays dentro de arrays) para estourar a pilha de memória do seu parser.
3.  **Tipagem Incorreta:** Se você espera um número e recebe um objeto, seu código pode quebrar se não validar.



## Exemplo guiado: Serialização com Pydantic (FastAPI)

O FastAPI usa o Pydantic para garantir que a serialização seja segura e tipada.

```python
from pydantic import BaseModel

# Definição do Modelo (Schema)
class Produto(BaseModel):
    nome: str
    preco: float

# Serialização (Python -> JSON)
meu_produto = Produto(nome="Teclado", preco=150.00)
json_saida = meu_produto.model_dump_json()
# Resultado: '{"nome":"Teclado","preco":150.0}'

# Deserialização (JSON -> Python)
json_entrada = '{"nome": "Mouse", "preco": 50.0}'
produto_novo = Produto.model_validate_json(json_entrada)
# Resultado: Objeto Produto(nome='Mouse', preco=50.0)
```

Se o JSON de entrada estiver errado (ex: `preco` for "abc"), o processo de deserialização falha automaticamente com um erro claro. Isso é segurança.



## Checklist rápido

*   [ ] Entendi que objetos na memória precisam virar texto para viajar na rede.
*   [ ] Defini uma convenção de nomenclatura (snake_case ou camelCase) para o projeto.
*   [ ] Nunca confio cegamente no que foi deserializado (validação é obrigatória).
*   [ ] Evito enviar campos inúteis para economizar processamento.



## Fontes

*   **[FAST]:** Pydantic e Validação
*   **[OWASP]:** Deserialization Cheat Sheet

---
# 4.4. Contratos de entrada e saída

Uma API robusta funciona com base em contratos claros. "Contrato" aqui não é burocracia, é a definição exata do que entra e do que sai.



## Responsabilidades Distintas

### Contrato de Entrada (Input)
*   **Objetivo:** Proteger o servidor.
*   **Filosofia:** Seja rigoroso. Rejeite o que não entende.
*   Se o contrato diz que o campo `idade` é inteiro positivo, rejeite strings, negativos ou nulos. Não tente "adivinhar" ou corrigir dados sujos silenciosamente.

### Contrato de Saída (Output)
*   **Objetivo:** Proteger o cliente.
*   **Filosofia:** Seja previsível e conservador.
*   Garanta que a resposta sempre tenha o mesmo formato, mesmo em caso de erro ou dados parciais. O cliente não deve quebrar porque um campo opcional veio faltando sem aviso.



## Lei de Postel (Princípio da Robustez)

> "Seja conservador no que você faz (envia), seja liberal no que você aceita dos outros."

Na prática moderna de APIs REST/JSON, adaptamos isso:
*   **Saída:** Extremamente conservadora (siga o contrato à risca).
*   **Entrada:** Valide estritamente a estrutura (segurança), mas ignore campos extras desconhecidos (para permitir evolução do cliente sem quebrar o servidor).



## Exemplo Guiado: Cadastro no Trilha

Vamos definir o contrato para criar uma conta.

### Contrato de Entrada (Request Body)
O que o servidor espera receber:

```json
{
  "nome": "string (obrigatório, min 3 chars)",
  "email": "string (obrigatório, formato email válido)",
  "senha": "string (obrigatório, min 8 chars)",
  "newsletter": "boolean (opcional, default false)"
}
```

### Contrato de Saída (Response Body)
O que o servidor promete devolver em caso de sucesso (201 Created):

```json
{
  "id": "uuid (identificador único)",
  "nome": "string",
  "email": "string",
  "criado_em": "datetime (ISO 8601)",
  "status": "string (ex: 'pendente_confirmacao')"
}
```

**Note a diferença:**
1.  A `senha` entrou, mas **não saiu**. (Segurança básica).
2.  Campos de sistema (`id`, `criado_em`, `status`) aparecem na saída, mas não são aceitos na entrada (o servidor decide esses valores, não o cliente).



## DTOs (Data Transfer Objects)

Para implementar isso no código, usamos o padrão DTO (ou Schemas no Pydantic/FastAPI). Você cria classes diferentes para entrada e saída.

*   `UserCreateRequest`: Contém senha. Não contém ID.
*   `UserResponse`: Contém ID. Não contém senha.

Misturar os dois (usar a mesma classe para entrada e saída) é um erro clássico que leva a vazamento de senhas ou a permitir que usuários alterem seus próprios IDs ou permissões de administrador (Mass Assignment Vulnerability).

```python
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

# DTO de Entrada (Request)
class UserCreateRequest(BaseModel):
    nome: str
    email: str
    senha: str
    newsletter: bool = False

# DTO de Saída (Response)
class UserResponse(BaseModel):
    id: UUID
    nome: str
    email: str
    criado_em: datetime
    status: str
```

_Implementação de DTOs usando Pydantic_

- **_UserCreateRequest_** aceita _senha_, mas não aceita _id_ (o servidor gera).
- **_UserResponse_** retorna _id_ e "_criado_em_", mas nunca retorna _senha_.



## Checklist rápido

*   [ ] Tenho modelos separados para Entrada e Saída?
*   [ ] Removi dados sensíveis (senhas) do contrato de saída?
*   [ ] Campos de controle (ID, data criação) são ignorados se enviados na entrada?
*   [ ] O cliente sabe quais campos são opcionais e quais são obrigatórios?



## Fontes

*   **[Fowler]:** Data Transfer Object (DTO) pattern
*   **[FAST]:** Request Body e Response Model
*   **[OWASP]:** Mass Assignment Prevention

---
# 4.5. Evolução de contratos e compatibilidade

Uma API é "para sempre". Diferente de um site que você pode atualizar o HTML e todos os usuários veem a versão nova instantaneamente, uma API tem clientes (apps mobile, integrações de parceiros) que podem demorar meses ou anos para atualizar.

Você precisa evoluir o backend sem quebrar quem ainda usa a versão antiga.



## Breaking Changes (Mudanças de Quebra)

São mudanças que fazem um cliente existente parar de funcionar.

**Exemplos de Quebra:**

1. **Remover um campo** que o cliente espera receber.
2. **Renomear um campo** (para o computador, renomear = remover velho + adicionar novo).
3. **Mudar o tipo** de um campo (ex: de String para Number).
4. **Tornar obrigatório** um parâmetro que antes era opcional.
5. **Mudar a regra de validação** para ser mais restritiva.

## Non-Breaking Changes (Mudanças Compatíveis)

São mudanças que clientes antigos podem ignorar sem erro.

**Exemplos Seguros:**

1. **Adicionar um novo endpoint**.
2. **Adicionar um novo campo na resposta** (clientes velhos apenas ignoram o campo novo).
3. **Adicionar um campo opcional na entrada** (o servidor lida com a ausência dele).
4. **Relaxar uma validação** (ex: aumentar o limite de caracteres de um nome).



## Estratégias de Evolução

### 1) Apenar Adicionar (Additive Changes)

A regra mais simples: nunca delete, nunca renomeie. Apenas adicione.
Se você precisa mudar o nome de `address` para `billing_address`:

1. Crie `billing_address`.
2. Mantenha `address` funcionando (talvez copiando o valor de um para o outro internamente).
3. Marque `address` como **Deprecated** na documentação.

### 2) Padrão Expand-Contract

Usado para migrações complexas de banco de dados e APIs.

1. **Expand:** Suporte o formato novo E o velho simultaneamente.
2. **Migrate:** Espere todos os clientes atualizarem.
3. **Contract:** Remova o suporte ao formato velho.

### 3) Versionamento

Quando a mudança é drástica e impossível de ser retrocompatível, você cria uma nova versão da API.

* `/v1/usuarios`
* `/v2/usuarios`

Isso permite que clientes antigos continuem na v1 enquanto novos usam a v2. (Veremos versionamento em detalhes na seção de REST).



## O Mito do "Vou mudar rapidinho"

Em backend, "mudar rapidinho" um nome de campo pode derrubar o aplicativo móvel de milhares de usuários. Apps móveis dependem da aprovação das lojas (Apple/Google) e da vontade do usuário de atualizar. Um app velho pode continuar rodando por anos.

> **Regra:** Trate seu contrato JSON como se estivesse gravado em pedra.



## Checklist rápido

* [ ] A mudança que vou fazer quebra clientes antigos?
* [ ] Posso resolver adicionando um campo novo em vez de mudar o existente?
* [ ] Se for remover algo, avisei os consumidores com antecedência (Deprecation)?
* [ ] Lembrei que apps mobile antigos continuam existindo?



## Fontes

* **[SemVer]:** Semantic Versioning
* **[Google]:** API Design Guide - Compatibility

---
# 4.6. OpenAPI como contrato formal

Até agora falamos de contratos conceituais. Mas como formalizar isso tecnicamente? Como documentar de um jeito que máquinas e humanos entendam?

A resposta é **OpenAPI** (antigamente conhecido como Swagger).



## O que é OpenAPI?

É uma especificação (um padrão de arquivo JSON ou YAML) que descreve sua API inteira:
*   Quais endpoints existem (`GET /users`, `POST /login`).
*   Quais parâmetros eles aceitam.
*   Qual o formato exato do JSON de entrada e saída.
*   Quais códigos de erro podem retornar.

Ele funciona como um "manual de instruções" legível por máquina.



## Por que usar?

### 1) Documentação Interativa
Ferramentas como **Swagger UI** ou **Redoc** leem o arquivo OpenAPI e geram uma página web bonita onde desenvolvedores podem testar a API direto no navegador. Se você usa FastAPI, isso já vem pronto (`/docs`).

### 2) Geração de Código (SDKs)
Com o contrato OpenAPI, você pode usar ferramentas para gerar automaticamente o código do cliente em TypeScript, Java, Swift, etc. Isso garante que o front-end esteja 100% alinhado com o backend.

### 3) Testes Automatizados
Ferramentas de QA podem ler o OpenAPI e bombardear sua API com dados de teste para verificar se ela realmente respeita o contrato definido.



## Code-First vs Schema-First

Existem duas abordagens para criar esse contrato:

### Code-First (Abordagem do FastAPI)
Você escreve o código Python (com Pydantic) e o framework **gera** o arquivo OpenAPI automaticamente para você.
*   **Vantagem:** Muito rápido de desenvolver. O código e a documentação nunca ficam dessincronizados.
*   **Uso:** Ideal para times ágeis e projetos onde o mesmo time faz front e back.

### Schema-First (Design-First)
Você escreve o arquivo OpenAPI (YAML) primeiro, discute e aprova ele. Só depois escreve o código.
*   **Vantagem:** O contrato é independente da implementação. Permite que front e back trabalhem em paralelo desde o dia zero.
*   **Uso:** Grandes corporações, APIs públicas críticas ou times muito separados.



## Exemplo de OpenAPI (YAML)

Um trecho simplificado de como o contrato se parece:

```yaml
openapi: 3.0.0
info:
  title: Trilha API
  version: 1.0.0
paths:
  /usuarios:
    get:
      summary: Lista usuários
      responses:
        '200':
          description: Sucesso
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    nome:
                      type: string
```



## Checklist rápido

*   [ ] Minha API possui uma documentação OpenAPI acessível?
*   [ ] As descrições dos campos no OpenAPI estão claras para quem vai consumir?
*   [ ] Estou usando o OpenAPI para garantir que front e back falem a mesma língua?



## Fontes

*   **[OpenAPI]:** Openapis.org
*   **[Swagger]:** Swagger.io
*   **[FAST]:** FastAPI e OpenAPI

---
# 4.7. Modelagem consistente de erros

Nada frustra mais um desenvolvedor frontend do que receber um erro `500 Internal Server Error` sem explicação, ou cada endpoint retornar erro num formato diferente.

Erros fazem parte do contrato. Eles precisam ser **previsíveis**.



## O Anti-padrão do "200 OK com erro"

Algumas APIs antigas retornam sempre status `200 OK`, mas no corpo do JSON mandam:
```json
{
  "sucesso": false,
  "erro": "Dados inválidos"
}
```
**Não faça isso.**
Isso quebra ferramentas de monitoramento, proxies e caches que dependem do código HTTP para saber se a requisição falhou.
*   Se falhou, use **4xx** (erro do cliente) ou **5xx** (erro do servidor).
*   Se deu certo, use **2xx**.



## Padronizando o Formato (RFC 7807)

Para evitar que cada API invente seu formato de erro, a indústria criou um padrão: **RFC 7807 - Problem Details for HTTP APIs**.

A recomendação é retornar um JSON com campos padrão:

```json
{
  "type": "https://trilha.com.br/erros/saldo-insuficiente",
  "title": "Saldo Insuficiente",
  "status": 400,
  "detail": "O valor da compra (150.00) excede seu saldo atual (100.00).",
  "instance": "/compras/12345/pagamento"
}
```

### Campos principais:
*   **type:** Uma URI que identifica o tipo do erro (útil para o código do cliente reagir a erros específicos).
*   **title:** Resumo curto e legível por humanos.
*   **status:** O código HTTP (repetido aqui para facilitar).
*   **detail:** Explicação específica daquela ocorrência (variável).
*   **instance:** Onde o erro ocorreu (opcional).



## Erros de Validação (Múltiplos erros)

Quando o usuário erra vários campos num formulário, você deve retornar todos de uma vez, não um por um.
Você pode estender o padrão acima com um campo `errors` ou `issues`:

```json
{
  "type": "about:blank",
  "title": "Erro de Validação",
  "status": 422,
  "detail": "Existem erros nos campos enviados.",
  "issues": [
    {
      "field": "email",
      "message": "E-mail inválido."
    },
    {
      "field": "senha",
      "message": "A senha deve ter no mínimo 8 caracteres."
    }
  ]
}
```

O FastAPI já faz algo muito similar a isso automaticamente para erros de validação (status 422).



## Segurança nos Erros

**Cuidado:** Nunca vaze detalhes de infraestrutura no erro.
*   **Errado:** `DatabaseConnectionError: Connection refused at 192.168.0.5` (Dá munição para hackers).
*   **Certo:** `Erro interno ao processar pagamento. Tente novamente mais tarde.` (Logue o erro real internamente, mostre o genérico para fora).



## Checklist rápido

*   [ ] Meus erros usam os códigos HTTP corretos (400, 401, 403, 404, 500)?
*   [ ] O formato do JSON de erro é igual em toda a API?
*   [ ] Erros de validação retornam qual campo está errado?
*   [ ] Garanti que stack traces e senhas de banco não vazam no JSON de erro?



## Fontes

*   **[RFC 7807]:** Problem Details for HTTP APIs
*   **[MDN]:** HTTP Status Codes
*   **[Google]:** API Errors Design
