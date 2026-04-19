---
title: Modelagem e Arquitetura de Software
description: Como pensar e implementar um sistema
category: Backend
order: 8
---

# 7.0. Visão Geral: Modelagem e Arquitetura

Bem-vindo à **Parte 3**. Até agora, falamos sobre *como* construir APIs (HTTP, REST, JSON). Agora, vamos falar sobre *como* organizar sistemas para que eles sobrevivam ao tempo e ao crescimento.

Arquitetura de Software não é sobre desenhar caixas e setas. É sobre tomar decisões difíceis que serão caras de mudar no futuro. É sobre controlar a complexidade.



## O que você vai aprender neste módulo?

Este módulo (Seção 7) foi estruturado para te dar as ferramentas mentais de um Arquiteto de Software.

### 1. As Fundações

* **Seção 7.1:** Entenderemos a diferença entre o que o sistema *faz* (Funcional) e *como* ele se comporta (Não Funcional). Performance, segurança e escalabilidade nascem aqui.
* **Seção 7.2:** Como definir fronteiras? Onde termina o módulo de "Vendas" e começa o de "Logística"? Vamos falar de **Bounded Contexts**.
* **Seção 7.3:** Os dois conceitos mais importantes da engenharia de software: **Coesão** (fazer uma coisa bem feita) e **Acoplamento** (depender pouco dos outros).

### 2. A Estrutura Macro (Deployment)

* **Seção 7.4:** A eterna briga: **Monólito vs Microserviços**. Quando quebrar? Quando manter junto? Vamos desmistificar o hype.
* **Seção 7.5:** Como as peças conversam? Síncrono (HTTP) ou Assíncrono (Filas)? Entenderemos os trade-offs de resiliência.

### 3. A Estrutura Micro (Código)

* **Seção 7.6:** Como organizar suas pastas e classes? Vamos ver **Clean Architecture** e **Ports & Adapters** para criar sistemas testáveis e independentes de framework.

### 4. A Comunicação (Documentação)

* **Seção 7.7 e 7.8:** Como explicar sua arquitetura para outros devs sem desenhar diagramas gigantes que ninguém lê? Conheceremos o **Modelo C4** e os **ADRs** (Registros de Decisão).



## Por que isso é importante?

Você pode escrever o melhor código Python do mundo, mas se a arquitetura for ruim (alto acoplamento, limites difusos), o sistema vai virar um "Grande Bola de Lama" (Big Ball of Mud).

Arquitetura é o que permite que 50 desenvolvedores trabalhem no mesmo produto sem um quebrar o código do outro.

---
# 7.1. Requisitos funcionais e não funcionais

Quando começamos a desenhar um sistema, a primeira pergunta é: "O que ele deve fazer?". Mas tão importante quanto isso é: "Como ele deve se comportar?".

![image_iceberg](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/iceberg.png)
*Imagem gerada por IA*



## Requisitos Funcionais (O "O Quê")

Descrevem as funções que o software deve executar. São testáveis diretamente pelo usuário final.

*   **Exemplos:**
    *   "O usuário deve conseguir fazer login com email e senha."
    *   "O sistema deve gerar um PDF do boleto."
    *   "O carrinho deve somar o valor total dos itens."

## Requisitos Não Funcionais (O "Como")

Descrevem a qualidade e as restrições do sistema. Geralmente acabam com "idade" (Disponibilidade, Escalabilidade, Segurança).

*   **Performance:** "A tela de login deve carregar em menos de 500ms."
*   **Escalabilidade:** "O sistema deve suportar 10.000 usuários simultâneos na Black Friday."
*   **Segurança:** "As senhas devem ser criptografadas com bcrypt."



## A Sopa de Letrinhas: SLA, SLO e SLI

Para medir a qualidade (Requisitos Não Funcionais), usamos três métricas que muitas vezes são confundidas:

1.  **SLA (Service Level Agreement):** O contrato com o cliente. Se não cumprir, paga multa.
    *   Ex: "Garantimos 99.9% de disponibilidade no mês."
2.  **SLO (Service Level Objective):** A meta interna do time de engenharia (mais rígida que o SLA).
    *   Ex: "Vamos tentar manter 99.95% de disponibilidade."
3.  **SLI (Service Level Indicator):** A métrica real medida agora.
    *   Ex: "Neste momento, a disponibilidade está em 99.92%."

**A Regra dos Noves (Disponibilidade):**
*   99% = 3 dias fora do ar por ano.
*   99.9% = 8 horas fora do ar por ano.
*   99.99% = 52 minutos fora do ar por ano.
*   99.999% = 5 minutos fora do ar por ano. (Nível Google/AWS).

Cada "9" extra custa exponencialmente mais caro em infraestrutura e complexidade.



## Trade-offs: O Teorema CAP

Você nunca terá tudo. Arquitetura é sobre escolher o que sacrificar.

![image_teorema_cap](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/teorema-cap.png)

Em sistemas distribuídos (como microserviços ou bancos replicados), o Teorema CAP diz que você só pode ter 2 de 3:

1.  **C (Consistency):** Todos os nós veem os mesmos dados ao mesmo tempo.
2.  **A (Availability):** Todo pedido recebe uma resposta (sem erro), mesmo que o dado esteja velho.
3.  **P (Partition Tolerance):** O sistema continua funcionando se a rede entre os servidores cair.

**Na prática, P é obrigatório na nuvem.** Então sua escolha real é entre **CP** ou **AP**:
*   **CP (Consistência):** Se a rede cair, eu travo o sistema (erro) para não entregar dado velho. (Ex: Transferência Bancária).
*   **AP (Disponibilidade):** Se a rede cair, eu respondo com o que tenho, mesmo que desatualizado. (Ex: Feed do Instagram, Likes).

---
# 7.2. Limites, contexto e responsabilidades

O maior erro em sistemas grandes não é técnico, é semântico. Quando a palavra "Produto" significa coisas diferentes para o time de Vendas e para o time de Logística, você tem um problema.

Para resolver isso, usamos o conceito de **Bounded Contexts** (Contextos Delimitados) do DDD (Domain-Driven Design).

![image_mapa_de_contexto](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/mapa-de-contexto.png)



## O que é um Bounded Context?

É uma fronteira linguística e arquitetural. Dentro dessa fronteira, cada termo tem um significado único e preciso. Isso define a **Ubiquitous Language** (Linguagem Onipresente) daquele time.

### Exemplo: A entidade "Cliente"

1.  **Contexto de Vendas:** Cliente é alguém com Potencial de Compra, Histórico de leads.
2.  **Contexto de Suporte:** Cliente é alguém com um Ticket aberto e um nível de SLA.
3.  **Contexto Financeiro:** Cliente é um CNPJ com status de inadimplência.

Em vez de criar uma classe `Cliente` gigante com 200 campos (`limite_credito`, `lista_tickets`, `historico_leads`), você cria modelos separados para cada contexto.



## Mapeamento de Contextos (Patterns)

Como esses contextos conversam?

1.  **Partnership:** Dois times trabalham juntos e sincronizados. Se um muda a API, avisa o outro.
2.  **Customer/Supplier:** Um time (Supplier) fornece uma API para o outro (Customer). O Supplier tem poder de veto.
3.  **Anti-Corruption Layer (ACL):** O padrão mais importante para integrar com sistemas legados (messy).

### Anti-Corruption Layer (ACL)

Você cria uma camada de tradução para não "sujar" seu modelo novo com o modelo velho.

```python
# Modelo do Legado (O "Corrupto") - Vem de um XML horrível
class SistemaLegadoXML:
    def get_data(self):
        return {"COD_CLI_XYZ": "123", "VAL_TOT_PG": "99.90"}

# Seu Modelo Limpo (O "Puro")
class Pedido(BaseModel):
    id: int
    valor: float

# A Camada ACL (Adaptador)
class LegadoAdapter:
    def buscar_pedido(self, id: int) -> Pedido:
        # Traduz o "idiomês" do legado para o seu
        xml = SistemaLegadoXML().get_data()
        return Pedido(
            id=int(xml["COD_CLI_XYZ"]), 
            valor=float(xml["VAL_TOT_PG"])
        )
```

Graças à ACL, sua regra de negócio só conhece `Pedido` e nem sabe que o XML existe. Se o legado mudar, você só arruma o `Adapter`.

---
# 7.3. Coesão e acoplamento

Estes são os dois pilares fundamentais da qualidade de software. Se você entender isso, entenderá porque microserviços, classes ou funções são bons ou ruins.

![image_coesao_acomplamento](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/acomplamento-coesao.png)



## Acoplamento (Coupling) -> QUEREMOS BAIXO

Mede o quanto um módulo depende de outro para funcionar. Se você muda A, e B quebra, eles estão fortemente acoplados.

### Tipos de Acoplamento (Do pior para o melhor)

1.  **Content Coupling (Pior):** Um módulo mexe direto nos dados privados do outro (ex: acessar variável global ou banco direto).
2.  **Control Coupling:** Um módulo manda flags (`true/false`) para controlar a lógica interna do outro.
3.  **Data Coupling (Melhor):** Módulos trocam apenas os dados necessários via parâmetros de função.

### Exemplo de Refatoração: Do Alto para o Baixo Acoplamento

**Cenário Ruim:** A classe conhece o Banco de Dados.
```python
class RelatorioVendas:
    def gerar(self):
        # A classe Relatorio conhece detalhes intimos do MySQL
        # Se mudar a senha do banco, essa classe quebra.
        conexao = MySQL("localhost", "root", "123")
        dados = conexao.query("SELECT * FROM vendas")
        return pdf.create(dados)
```

**Cenário Bom:** Inversão de Dependência.
```python
class RelatorioVendas:
    def __init__(self, repositorio_vendas):
        # Injeção de Dependência: Não sei de onde vem os dados (MySQL? Arquivo? API?)
        self.repo = repositorio_vendas

    def gerar(self):
        dados = self.repo.buscar_todas()
        return pdf.create(dados)
```

Agora `RelatorioVendas` não quebra se mudarmos o banco para PostgreSQL.



## Coesão (Cohesion) -> QUEREMOS ALTA

Mede o quanto as responsabilidades dentro de um módulo "fazem sentido juntas". Uma classe deve fazer uma coisa bem feita.

### Exemplo de Baixa Coesão (God Class)

```python
class SuperUtils:
    def validar_cpf(self): ...
    def enviar_email(self): ...
    def conectar_banco(self): ...
    def redimensionar_imagem(self): ...
```
Isso é ruim porque qualquer mudança no sistema (email, banco, regras de cpf) obriga você a mexer na mesma classe.

### O Conceito de "Connascence" (Conascença)

É uma métrica moderna para acoplamento. Duas componentes têm connascence se, ao mudar um, você **precisa** mudar o outro para manter o sistema correto.
*   **Connascence of Name:** Mudar o nome de uma função obriga a mudar quem chama. (Inevitável e aceitável).
*   **Connascence of Meaning:** "O valor -1 significa erro". Se você mudar para `None`, quebra quem espera `-1`. (Perigoso).

---
# 7.4. Monólitos, monólitos modulares e microserviços

A decisão de "quebrar" um sistema é uma das mais caras e arriscadas. Não faça por hype.

![image_monolito_microsservicos](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/monolito-microsservicos.png)



## 1. Monólito (O Clássico)

Todo o código (Frontend, Backend, Jobs) roda no mesmo processo ou deploy.

* **Vantagens:** Simples de desenvolver, testar e deployar no início. Zero latência de rede.
* **Desvantagens:** Se crescer muito, vira um pesadelo de manutenção. "Spaghetti Code".

## 2. Microserviços (A Distribuição)

Sistemas pequenos e autônomos que se conversam via rede (HTTP/gRPC).

* **Vantagens:** Escalabilidade independente, times independentes, tecnologias diferentes.
* **Desvantagens:** **Complexidade brutal.** Latência de rede, falhas parciais, monitoramento difícil (Tracing).

## 3. O Pior dos Mundos: O Monólito Distribuído

Acontece quando você tenta fazer microserviços mas cria **Alto Acoplamento**.

* **Sintoma:** Para mudar uma funcionalidade, você precisa deployar o Serviço A, B e C juntos e na ordem certa.
* **Resultado:** Você tem a complexidade dos microserviços e a rigidez do monólito.



## Estratégia de Migração: Strangler Fig Pattern

Não reescreva tudo do zero ("Big Bang Rewrite"). Quase sempre falha.
Use o padrão da **Figueira Estranguladora**:

1. Coloque um Proxy/Gateway na frente do Monólito.
2. Crie o novo Microserviço (ex: Pagamentos) separado.
3. No Gateway, redirecione apenas a rota `/pagamentos` para o novo serviço.
4. O Monólito continua cuidando do resto (`/usuarios`, `/produtos`).
5. Repita até o monólito sumir (ser estrangulado).



## Checklist: Você é alto o suficiente para andar neste brinquedo?

Não use microserviços se você não tiver:

1. **Provisionamento Rápido:** Consegue subir um servidor novo em minutos?
2. **Monitoramento Básico:** Sabe quando e porque o serviço caiu sem logar na máquina?
3. **Automação de Deploy (CI/CD):** Se o deploy é manual, microserviços serão um inferno.

---
# 7.5. Comunicação síncrona e assíncrona

Como seus serviços conversam define a resiliência do sistema.

![image_sync_assync](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/sync-assync.png)



## Comunicação Síncrona (Request/Response)
O cliente espera a resposta.
*   **Protocolos:** HTTP (REST), gRPC.
*   **Problema:** Acoplamento temporal. Se o Estoque cair, o Checkout cai.

## Comunicação Assíncrona (Event-Driven)
O cliente manda uma mensagem e não espera.
*   **Protocolos:** AMQP (RabbitMQ), Kafka.
*   **Vantagem:** Se o serviço de Email cair, o Checkout continua vendendo. A mensagem espera na fila.



## Modos de Falha e Backpressure

O que acontece no assíncrono se o consumidor for mais lento que o produtor?
Imagine que você gera 1000 pedidos/seg, mas só processa 100/seg.
1.  **A fila cresce:** A memória do Broker enche.
2.  **Backpressure (Contrapressão):** O sistema precisa saber dizer "Pare de mandar". O consumidor avisa o produtor para desacelerar, ou o Broker rejeita novas mensagens.



## Pattern: Transactional Outbox

Um problema clássico em sistemas distribuídos: Como salvar no Banco E mandar mensagem na Fila de forma atômica?
Se você salvar no banco e a fila falhar, o sistema fica inconsistente.

**Solução (Outbox):**
1.  Na mesma transação do banco (ACID), você salva o Pedido na tabela `Orders` E o evento na tabela `Outbox` (mensagens a enviar).
2.  Um processo separado (Worker) lê a tabela `Outbox` e envia para o RabbitMQ/Kafka.
3.  Se enviar com sucesso, apaga da tabela `Outbox`.

```python
# Pseudo-código Outbox
def criar_pedido(pedido):
    with db.transaction():
        db.save(pedido) # Salva o negócio
        db.save_outbox({ # Salva a intenção de enviar evento
            "topic": "pedidos",
            "payload": pedido.to_json(),
            "status": "PENDING"
        })
# O pedido está salvo com segurança. O envio acontece depois, garantido.
```

---
# 7.6. Padrões arquiteturais em APIs

Não jogue código solto no `main.py`. Use padrões para organizar a casa.

![image_clean_arch](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/clean-arch.png)



## MVC (Model-View-Controller) vs Clean Architecture

*   **MVC:** Ótimo para apps monolíticos web (Django, Rails). Mas tende a acoplar a regra de negócio com o framework. Os "Controllers" ficam gordos.
*   **Clean Architecture:** Foca em isolar o domínio. Frameworks são detalhes.



## Clean Architecture: A Regra da Dependência

A regra de ouro é: **Dependências só apontam para dentro.**
*   O círculo de fora (Web, DB, UI) conhece o círculo de dentro (Regra de Negócio).
*   O círculo de dentro **NÃO** conhece o de fora.

Isso significa que sua classe `CriarUsuario` (Use Case) não pode importar `FastAPI` ou `SQLAlchemy`. Ela deve usar interfaces puras.

### Exemplo de Estrutura de Pastas (Python)

```text
src/
├── core/                  # O DOMÍNIO (Puro Python)
│   ├── entities/          # User, Product (Classes simples)
│   ├── use_cases/         # CreateUser, GetProduct (Regras)
│   └── interfaces/        # UserRepositoryProtocol (Contratos)
│
├── infrastructure/        # O MUNDO REAL (Frameworks)
│   ├── database/          # SQLAlchemy implementation of Repository
│   ├── web/               # FastAPI Routers, Pydantic DTOs
│   └── external/          # Clients para Stripe, AWS S3
│
└── main.py                # Onde injetamos as dependências
```

### O Fluxo de Controle vs Fluxo de Dependência

1.  **Controle:** O `Controller` (Web) chama o `UseCase` (Core), que chama o `Repository` (DB).
2.  **Dependência:** O `Controller` depende do `UseCase`. O `Repository` (implementação) depende da `Interface` definida no Core.
    *   O Core **não depende** do Repository concreto. Ele depende de uma abstração. Isso é a **Inversão de Dependência**.

---
# 7.7. Modelos de documentação arquitetural (C4)

Como documentar arquitetura sem criar diagramas gigantes que ninguém entende? O Modelo C4 resolve isso usando níveis de zoom, como o Google Maps.

![image_c4_model](/api/materiais-assets/backend/modelagem-e-arquitetura-de-software/assets/c4-model.png)


## Nível 1: Context (O Mapa Mundi)
*   **Foco:** Quem usa o sistema e com quem ele fala.
*   **Público:** Todos (Clientes, POs, Devs).
*   **Caixas:** "Sistema de Vendas", "Usuário", "Sistema de Email (Externo)".

## Nível 2: Container (O Mapa da Cidade)
*   **Foco:** As unidades deployáveis.
*   **Público:** Arquitetos e Devs.
*   **Caixas:** "API Backend (Python)", "SPA (React)", "Banco de Dados (Postgres)", "Mobile App".
*   **Linhas:** Protocolos (HTTPS, JDBC).

## Nível 3: Component (O Mapa do Bairro)
*   **Foco:** A organização interna de um Container (só Backend, por exemplo).
*   **Público:** Devs do time.
*   **Caixas:** "PaymentController", "FraudService", "UserRepository".

## Nível 4: Code (A Planta da Casa)
*   **Foco:** Classes e Interfaces (UML).
*   **Dica:** **Evite fazer.** Ele desatualiza no minuto seguinte. Só faça se a lógica for muito complexa e específica.



## Docs as Code (Structurizr)

Diagramas no Visio/Draw.io morrem. O ideal é usar **Diagrams as Code**.
Ferramentas como **Structurizr** permitem escrever o modelo C4 em código (DSL) e gerar os desenhos automaticamente. Assim, a arquitetura fica versionada no Git.

---
# 7.8. Registros de decisão arquitetural (ADR)

Você já entrou num projeto e pensou: *"Por que diabos escolheram MongoDB para um sistema financeiro?"*
Sem documentação, isso vira "conhecimento tribal" ou crítica vazia. O ADR (Architecture Decision Record) serve para registrar o **contexto** e a **decisão** no momento em que ela foi tomada.

**"O código diz COMO. O ADR diz PORQUÊ."**



## O Ciclo de Vida de um ADR

Um ADR não é estático. Ele tem status:
1.  **Proposed:** Estamos discutindo.
2.  **Accepted:** Decidimos e vamos implementar.
3.  **Deprecated:** A decisão era boa em 2020, mas agora em 2025 mudamos para outra coisa (que terá um novo ADR).



## Modelo de um ADR (Template Completo)

Sempre que tomar uma decisão estrutural importante, crie um arquivo Markdown no repo: `docs/adr/001-escolha-banco.md`.

```markdown
# ADR 001: Uso de PostgreSQL como banco principal

**Status:** Aceito
**Data:** 2024-01-15
**Decisores:** Time de Backend

## Contexto
Precisamos de um banco de dados para armazenar as transações financeiras.
Requisitos:
1. Consistência forte (ACID) é obrigatória.
2. Relatórios complexos (Joins) serão necessários.
3. O time tem experiência prévia com SQL.

Opções consideradas:
* MongoDB: Flexível, mas sem ACID multi-documento nativo simples.
* PostgreSQL: Robusto, ACID, relacional.

## Decisão
Vamos usar PostgreSQL versão 15.

## Consequências
*   (+) Garante transações financeiras seguras.
*   (+) Ecossistema maduro e hospedagem barata (RDS, CloudSQL).
*   (-) Escalar escrita horizontalmente (Sharding) será mais difícil que um NoSQL, mas nossa volumetria prevista para 2 anos não exige isso.
```
