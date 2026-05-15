---
title: 2. Tipos de Bancos de Dados
description: 
category: Banco de Dados
order: 2
---

![Imagem 4](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem4.jpg)

# 2.1. Visão Geral

Existem diferentes tipos de bancos de dados que armazenam dados de maneiras diferentes.

Os tipos de bancos de dados são amplamente agrupados em bancos de dados relacionais e não relacionais. Bancos de dados relacionais são altamente estruturados, armazenam dados em tabelas definidas com linhas e colunas, além de compreender uma linguagem de programação chamada SQL (Structured Query Language) [falaremos de forma mais aprofundada sobre bancos relacionais e SQL mais a frente]. Os bancos de dados não relacionais são altamente diversificados, dando suporte a uma variedade de estruturas de dados. Como muitos bancos de dados não relacionais não usam o SQL, eles costumam ser chamados de bancos de dados NoSQL.

Não existe apenas um tipo de banco que serve para tudo. Depende do problema que você deseja resolvar.

> **Não existe o "melhor" banco de dados**, existe o banco **mais adequado** para cada situação. Um banco excelente para uma aplicação de redes sociais pode ser péssimo para um sistemas bancários, e vice-versa.

Os bancos de dados se dividem principalmente em dois grandes grupos:
- **Relacionais (SQL)**: estrutura rígida, tabelas com linhas e colunas
- **Não-Relacionais (NoSQL)**: estrutura flexível, diversos modelos diferentes


---

# 2.2. SQL vs NoSQL

![Imagem 5](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem5.webp)

Ambos os bancos tem suas particularidades e são utilizados para fins diferentes. Bancos de dados SQL(relacional) segue uma estrutura mais fixa e é ideal para dados consistentes e mais complexos, entretanto, isso traz certa complexidde quanto a sua implementação, uso e desempenho. Já bancos NoSQL(não relacional) é mais flexível e simples, usa modelos como documentos, chave valor e é ideal para dados mais simples e de grande volume, como imagens, textos longos, etc.

Iremos nos aprofundar mais nas carecterísticas de cada um nos próximos tópicos.

## Bancos Relacionais (SQL)

SQL vem de "Structured Query Language" (Linguagem de Consulta Estruturada). Esses bancos são baseados em **tabelas** (entidades) que tem colunas (atributos) e linhas (registros). Fazendo uma analogia com POO, as tabelas são as classes, as colunas são os atributos daquela classe e as linhas são os objetos instanciados.

Uma das principais características dos bancos SQL é a capacidade de criar relações entre as tabelas, isso será explicado de forma mais aprofundada no tópico específico sobre bancos de dados relacionais.

### Características principais:

**1. Estrutura rígida (schemas)**
- Você define a estrutura ANTES de inserir dados
- Exemplo: todo usuário(registro da tabela usuário) tem que ter: nome, email, idade (atributos)
- Não pode fugir dessa estrutura
- Os atributos podem ser de diferentes tipos (inteiros, string, booleano, etc) e podem ser opcionais ou obrigatórios

**2. Tabelas com linhas e colunas**
- Tipo uma planilha Excel (um csv)
- Cada linha é um registro (ex: um usuário)
- Cada coluna é um atributo (ex: nome, email)

**3. Relações entre tabelas**
- Tabelas se conectam através de chaves
- Exemplo: tabela de Usuários se relaciona com tabela de Pedidos

**4. ACID**
- **A**tomicidade: uma transação é tratada como uma única "unidade" indivisível; ou todas as suas operações são executadas com sucesso, ou nenhuma é
- **C**onsistência: garante que uma transação leve o banco de dados de um estado válido para outro, sempre respeitando as regras e restrições de integridade.
- **I**solamento: transações simultâneas são executadas de forma isolada, como se fossem sequenciais, sem interferir umas nas outras, prevenindo inconsistências.
- **D**urabilidade: uma vez que uma transação é confirmada (commit), suas alterações são permanentes e persistirão mesmo em caso de falhas no sistema ou queda de energia. 

#### Quando usar SQL?
- Dados estruturados e bem definidos
- Relacionamentos complexos entre entidades
- Precisa de transações fortes (bancos, e-commerce etc)
- Integridade dos dados é crítica
- Consultas mais complexas aos dados

#### Exemplos de bancos SQL:
- PostgreSQL
- MySQL
- Oracle
- SQLite

---

## Bancos Não-Relacionais (NoSQL)

NoSQL significa "Not Only SQL" (Não Apenas SQL), não "sem SQL"! Esses bancos surgiram com a necessidade de lidar com volumes MASSIVOS de dados.

Bancos de dados NoSQL tendem a seguir uma estrutura mais simples, sacrificando vários dos pontos que são cruciais para bancos de dados relacionais afim de deixar as coisas menos complexas (mais flexíveis), mais leves e eficientes.

### Qual utilidade?

- **Big Data**: bilhões de registros que não cabem em um servidor só
- **Escalabilidade horizontal**: adicionar mais servidores baratos em vez de um servidor super caro
- **Flexibilidade**: dados com estruturas variadas ou que mudam com frequência
- **Performance**: em alguns casos, são muito mais rápidos que SQL

### Características principais:

**1. Estrutura flexível**
- Não precisa definir tudo antes
- Cada registro pode ter campos diferentes
- Fácil de adaptar quando os requisitos mudam

**2. Schema-less**
- Você insere os dados e decide a estrutura depois
- Ou cada documento tem sua própria estrutura

**3. Escalabilidade horizontal**
- Distribui os dados entre vários servidores
- Adiciona mais máquinas conforme cresce


### Quando usar NoSQL?
- Grandes volumes de dados (Big Data)
- Estrutura dos dados varia muito
- Precisa escalar horizontalmente
- Leituras/escritas em altíssima velocidade
- Dados não-estruturados ou semi-estruturados
- Consistência eventual é aceitável

### Exemplos de bancos NoSQL:
- MongoDB (documentos)
- Redis (chave-valor)
- Neo4j (grafos)
- Cassandra (colunar)
- Pinecone (vetorial)

---

## Quando escolher SQL vs NoSQL?

| Critério | SQL | NoSQL |
|----------|-----|-------|
| **Estrutura dos dados** | Estruturada, relacional, bem definida | Flexível, diversos modelos, pode variar |
| **Escalabilidade** | Vertical (hardware mais potente) | Horizontal (mais servidores) |
| **Consistência** | Forte  | Eventual |
| **Relacionamentos** | Complexos, com JOINs | Simples ou desnormalizados |
| **Transações** | Suporte robusto | Limitado (depende do banco) |
| **Velocidade** | Rápido para queries complexas | Muito rápido para operações simples |
| **Exemplos** | PostgreSQL, MySQL, SQL Server | MongoDB, Redis, Cassandra, Neo4j |

![Imagem 12](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem12.webp)

**Dica:** Muitas vezes você vai usar AMBOS! Por exemplo:
- PostgreSQL para dados críticos (usuários, pedidos, pagamentos)
- Redis para cache e sessões (temporário, rápido)
- MongoDB para logs e analytics (volumes grandes, estrutura variável)

---

---

# 2.3. Bancos de Dados Não-Relacionais (NoSQL)

![Imagem 6](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem6.webp)

## Introdução

Como falamos antes, **NoSQL = Not Only SQL**. É um mundo a parte de bancos que fogem do modelo tradicional de tabelas.

A grande sacada do NoSQL é que existem diversos tipos diferentes, cada um otimizado para um tipo específico de problema. 

Vamos explorar alguns dos principais tipos!

---

## Tipos de Bancos NoSQL

### Bancos de Documentos

#### O que são?

Armazenam dados em **documentos** (geralmente JSON ou BSON - Binary JSON). Cada documento é como dicionário Python - pode ter estrutura diferente dos outros documentos da mesma coleção.

#### Como funcionam?

Em vez de tabelas com linhas, você tem **coleções** com **documentos**. Como por exemplo:

```json
// Coleção: usuarios
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Guilherme Baldo",
  "email": "guilherme@email.com",
  "idade": 22,
  "enderecos": [
    {
      "tipo": "residencial",
      "rua": "Rua das Flores",
      "numero": 123,
      "cidade": "São Paulo"
    },
    {
      "tipo": "comercial",
      "rua": "Av. Paulista",
      "numero": 1000,
      "cidade": "São Paulo"
    }
  ],
  "interesses": ["engenharia de dados", "escoteiro", "filmes"],
  "premium": true
}

{
  "_id": "507f1f77bcf86cd799439012",
  "nome": "Tiago Trindade",
  "email": "tiago@email.com",
  "idade": 22,
  "telefone": "+55 11 98765-4321",  // perceba, esse campo não existe no documento anterior!
  "empresa": "Maestro"
}
```

#### Vantagens:

✅ Flexível - cada documento pode ter campos diferentes

✅ Rápido para leitura/escrita de documentos completos

✅ Fácil de mapear para objetos na programação

✅ Escala horizontalmente bem

✅ Bom para dados semi-estruturados

#### Desvantagens:

❌ Queries complexas com múltiplas coleções são menos eficientes

❌ Pode ter redundância de dados (desnormalização)

❌ Menos garantias de consistência que SQL

❌ Pode ocupar mais espaço (documentos maiores)

#### Exemplos de bancos:
- **MongoDB**: o mais popular
- **Firestore**: do Google, para apps mobile/web

---

### Bancos Chave-Valor

#### O que são?

O modelo MAIS SIMPLES de NoSQL. Funciona exatamente como um dicionário Python:

```python
{
    "usuario:123:sessao": "abc123xyz",
    "produto:456:estoque": 150,
    "post:789:curtidas": 1523,
    "cache:homepage": "<html>...</html>"
}
```

Você tem uma **chave única** e um **valor**. A busca é extremamente rápida dado que é um dicionário ela é feita em tempo constante.

#### Como funcionam?

- Você salva um valor com uma chave
- Você busca o valor pela chave
- Não tem busca por conteúdo, só pela chave exata
- Geralmente armazenam tudo em memória RAM (por isso são tão rápidos)

#### Vantagens:

✅ **EXTREMAMENTE rápido** - operações em microssegundos

✅ Simples de usar - GET e SET basicamente

✅ Escala horizontalmente muito bem

✅ Perfeito para cache

#### Desvantagens:

❌ Não tem queries complexas - só busca por chave

❌ Não tem relacionamentos

❌ Estrutura muito limitada

#### Exemplos de bancos:
- **Redis**: o mais popular, super versátil
- **Memcached**: focado em cache
- **DynamoDB**: da Amazon, serverless

---

### Bancos de Grafos

#### O que são?

Bancos otimizados para armazenar **redes de relacionamentos**. Eles guardam **nós** (entidades) e **arestas** (relações entre elas).

Pensa em uma rede social: você tem pessoas (nós) e amizades (arestas). Perguntas tipo "quem são os amigos dos meus amigos?" são super rápidas em bancos de grafos!

#### Como funcionam?

```
     [Ana]
      / | \
    /   |   \
[amiga] [segue] [colega]
  /       |        \
[Bruno] [Carla]  [Diego]
  |       |
[irmão] [trabalha_com]
  |       |
[Eduardo] [Fernanda]
```

Cada nó pode ter propriedades:
```
Nó: Ana
Propriedades: {nome: "Ana Silva", idade: 25, cidade: "SP"}

Aresta: Ana -> Bruno
Tipo: "amiga"
Propriedades: {desde: "2020-01-15", melhor_amiga: true}
```

#### Vantagens:

✅ **Queries de relacionamento são MUITO rápidas**

✅ Visualização intuitiva de dados conectados

✅ Fácil adicionar novos tipos de relacionamentos

✅ Encontra padrões em redes complexas

#### Desvantagens:

❌ Complexo

❌ Não é bom para dados sem relacionamentos

❌ Menos opções de ferramentas que SQL ou MongoDB

#### Exemplos de bancos:
- **Neo4j**: o mais popular, usado por NASA, eBay, Walmart
- **Amazon Neptune**: serverless da AWS

---

### Bancos Vetoriais 

#### O que são?

Atualmente devido ao grande avanço das tecnologias de linguagem larga (como chatgpt, gemini etc) esses bancos estão se tornando extremamente populares. Eles armazenam **vetores** (arrays de números) e fazem **busca por similaridade**.

#### Como funcionam?

Em IA/Machine Learning, textos, imagens e áudios são transformados em vetores (embeddings):

```
Texto: "cachorro fofo"
Vetor: [0.2, 0.8, 0.1, -0.3, 0.5, ...]  // centenas ou milhares de dimensões

Texto: "filhote de cachorro"
Vetor: [0.19, 0.79, 0.12, -0.31, 0.48, ...]  // muito similar!

Texto: "carro esportivo"
Vetor: [-0.5, 0.1, 0.9, 0.7, -0.2, ...]  // bem diferente
```

O banco vetorial calcula a **distância** entre vetores e encontra os mais próximos (similares).

Muito utilizado na técnica de RAG (utilizado para melhorar a "memória" e "cinhecimento" das LLMs)

#### Vantagens:

✅ **Busca semântica** (por significado, não por texto exato)

✅ Super rápido para encontrar itens similares

✅ Essencial para aplicações de IA

✅ Funciona com qualquer tipo de dado (texto, imagem, áudio)

#### Desvantagens:

❌ Dificil entendimento na geração das embbedings (muito abstrato)

❌ Pode ser caro (computação pesada)

❌ Não substitui bancos tradicionais

#### Exemplos de bancos:
- **Chroma**: leve, para desenvolvimento
- **Pgvector**: extensão do PostgreSQL
- **ElasticSearch**: motor de busca com suporte a vetores 

---

## Tabela Resumo: Tipos NoSQL

| Tipo | Estrutura | Melhor Para | Velocidade | Exemplos |
|------|-----------|-------------|------------|----------|
| **Documento** | JSON/BSON | Dados semi-estruturados, catálogos | ⚡⚡ Rápido | MongoDB, Firestore |
| **Chave-Valor** | Chave → Valor | Cache, sessões, contadores | ⚡⚡⚡ Muito rápido | Redis, DynamoDB |
| **Grafo** | Nós + Arestas | Relações complexas, redes sociais | ⚡⚡ Rápido para grafos | Neo4j, Neptune |
| **Vetorial** | Vetores/Embeddings | IA, busca semântica, recomendação | ⚡⚡ Rápido para similaridade | Chroma, ElasticSearch |

---

---

# 2.3. Bancos de Dados Relacionais (SQL)

![Imagem 7](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem7.webp)

## Introdução

Agora vamos falar dos bancos **relacionais**. São bancos de dados mais robustos que os Não-relacionais e são os mais utilizados de maneira geral.

A grande força do SQL é a **base teórica sólida** (álgebra relacional) e a **estrutura rígida** que garante integridade dos dados. Enquanto o NoSQL é mais simples e amplo quanto suas regras, o SQL é maisrígido quanto aos dados que serão salvos seguindo uma estrutura fixa de tabela e ordem de dados.

---

## Conceitos Fundamentais

### Tabelas 

Uma **tabela** é como uma planilha Excel/csv: tem linhas e colunas, e cada coluna tem um tipo específico de dado.

```
Tabela: usuarios
+----+--------------+----------------------+---------------------+-------+
| id | nome         | email                | data_cadastro       | ativo |
+----+--------------+----------------------+---------------------+-------+
| 1  | Beatriz      | beatriz@email.com        | 2024-01-15 10:30:00 | true  |
| 2  | Nicholas     | nicholas@email.com     | 2024-02-20 14:45:00 | true  |
| 3  | Maria Clara  | maria@email.com      | 2024-03-10 09:15:00 | false |
+----+--------------+----------------------+---------------------+-------+
```

Cada tabela representa uma **entidade** do seu sistema (usuários, produtos, pedidos, etc).

>Seguindo uma analogia de POO pense na tabela como uma classe.

---

### Registros (Linhas)

Cada **linha** da tabela é um registro. No exemplo acima:
- Linha 1 representa a usuária Ana Cecília
- E assim por diante

Cada registro é **único** - não podem existir duas linhas completamente idênticas (por causa da chave primária, que iremos ver adiante).

>Continuando a analogia de POO, pense num registro como um objeto instanciado de uma classe (tabela).

---

### Colunas (Atributos/Campos)

Cada **coluna** representa um atributo da entidade. No exemplo:
- `id`: identificador único
- `nome`: nome completo
- `email`: endereço de email
- `data_cadastro`: quando a pessoa se cadastrou
- `ativo`: se a conta está ativa ou não

Cada coluna tem:
- Um **nome**
- Um **tipo de dado** (INT, VARCHAR, DATE, BOOLEAN, etc)
- **Restrições** opcionais (NOT NULL, UNIQUE, etc)

>Continuando a analogia com POO, pense nas colunas como os atributos de uma classe.

---

### Chave Primária (Primary Key - PK)

A **chave primária** é o identificador ÚNICO de cada registro. É como o CPF da linha, não pode se repetir.

Exemplo com SQL:
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Chave primária
    nome VARCHAR(100),
    email VARCHAR(100)
);
```

#### Características da PK:

✅ **Única**: não pode repetir

✅ **Não nula**: sempre tem que ter valor

✅ **Imutável**: não deve mudar depois de criada

✅ **Simples**: geralmente um número inteiro

#### Tipos comuns:

**1. INT com AUTO_INCREMENT (MySQL/MariaDB)**
```sql
id INT PRIMARY KEY AUTO_INCREMENT
```
O banco incrementa automaticamente: 1, 2, 3, 4...

**2. SERIAL (PostgreSQL)**
```sql
id SERIAL PRIMARY KEY
```
Equivalente ao AUTO_INCREMENT

**3. UUID (Identificador Universal Único)**
```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```
Gera strings tipo: `550e8400-e29b-41d4-a716-446655440000`

---

### Chave Estrangeira (Foreign Key - FK)

![Imagem 8](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem8.png)

A **chave estrangeira** é o que conecta uma tabela a outra. É a PK de uma tabela aparecendo em outra tabela. É a partir dela que criamos os relacionamentos entre as tabelas, essa é uma das dinâmicas mais importantes dos bancos de ddos relacionais, onde os dados se ligam e conseguimos criar consultas e dados que interagem com diversas tabelas.

Exemplo:

```
Tabela: usuarios                      Tabela: pedidos
+----+-----------+                    +----+------------+--------+------------+
| id | nome      |                    | id | usuario_id | valor  | data       |
+----+-----------+                    +----+------------+--------+------------+
| 1  | Felipe    | <----------------> | 1  | 1          | 150.00 | 2024-01-20 |
| 2  | Daniel    | <--                | 2  | 1          | 200.00 | 2024-01-25 |
+----+-----------+    \               | 3  | 2          | 75.50  | 2024-02-01 |
                       -------------> +----+------------+--------+------------+
                                            ↑
                                      Chave Estrangeira
                                      (referencia usuarios.id)
```

A coluna `usuario_id` na tabela `pedidos` é uma FK que aponta para `id` na tabela `usuarios`.

#### Como criar uma FK:

```sql
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    valor DECIMAL(10,2),
    data DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    --          ^^^^^^^^^^^^ FK         ^^^^^^^^^^^^ referencia
);
```

#### O que a FK garante?

✅ **Integridade referencial**: não pode criar um pedido para um usuário que não existe

✅ **Cascata**: pode configurar para deletar pedidos quando o usuário for deletado

✅ **Consistência**: garante que as relações fazem sentido

---

## Tipos de Relacionamentos

### 1:1 (Um para Um)

Cada registro de uma tabela se relaciona com **apenas um** registro de outra tabela.

**Exemplo: Pessoa ↔ Passaporte**
- Cada pessoa tem apenas 1 passaporte
- Cada passaporte pertence a apenas 1 pessoa

```
Tabela: pessoas                       Tabela: passaportes
+----+--------+                       +----+-----------+-----------+
| id | nome   |                       | id | pessoa_id | numero    |
+----+--------+                       +----+-----------+-----------+
| 1  | Ana    | <-------------------> | 1  | 1         | ABC123456 |
| 2  | Pedro  | <-------------------> | 2  | 2         | XYZ789012 |
+----+--------+                       +----+-----------+-----------+
```

---

### 1:N (Um para Muitos)

Um registro de uma tabela se relaciona com **vários** registros de outra tabela.

**Exemplo: Cliente → Pedidos**
- 1 cliente pode ter vários pedidos
- Cada pedido pertence a apenas 1 cliente

```
Tabela: clientes                      Tabela: pedidos
+----+--------+                       +----+------------+--------+
| id | nome   |                       | id | cliente_id | valor  |
+----+--------+                       +----+------------+--------+
| 1  | Emily  | <-----------------+-- | 1  | 1          | 100.00 |
|    |        | <--------------+  |   | 2  | 1          | 200.00 |
|    |        | <-----------+  |  |   | 3  | 1          | 50.00  |
| 2  | Marcus | <--------+  |  |  |   | 4  | 2          | 300.00 |
+----+--------+          |  |  |  |   +----+------------+--------+
                         |  |  |  |
                         +--+--+--+
                         1  2  3  4
```

---

### N:N (Muitos para Muitos)

Múltiplos registros de uma tabela se relacionam com múltiplos registros de outra.

**Exemplo: Alunos ↔ Cursos**
- 1 aluno pode estar matriculado em vários cursos
- 1 curso pode ter vários alunos

Para implementar N:N, é ideal criar uma **tabela intermediária**, responsável por registrar as ligações entre as duas tabelas:

```
Tabela: alunos          Tabela: matriculas              Tabela: cursos
+----+--------+         +----+-----------+-----------+   +----+-------------+
| id | nome   |         | id | aluno_id  | curso_id  |   | id | nome        |
+----+--------+         +----+-----------+-----------+   +----+-------------+
| 1  | Ana    | <----+  | 1  | 1         | 1         +-> | 1  | Python      |
| 2  | Davi   | <-+  |  | 2  | 1         | 2         +-> | 2  | JavaScript  |
| 3  | Miguel | <-|--+  | 3  | 2         | 1         |   | 3  | SQL         |
+----+--------+   |     | 4  | 2         | 3         +-> |    |             |
                  |     | 5  | 3         | 2         +-+ +----+-------------+
                  +---+ +----+-----------+-----------+
                      +------------------------------+
```

É ideal que seja feita dessa forma e não utilizando uma lista de ids, poise seguindo a implementação de listas isso atrapalha a contrução queries mais complexas, além de diminuir a eficiência das consultas (para descobrirmos as ligações de um registro precisamos iterar por cada um deles e idenficar, ao invés de só buscar pelo registro na tabela intermediária)

A tabela `matriculas` conecta alunos e cursos:
- Ana está em Python e JavaScript
- Bruno está em Python e SQL
- Carla está em JavaScript

```sql
CREATE TABLE matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT,
    curso_id INT,
    data_matricula DATE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
```

---

## Principais Bancos Relacionais

### PostgreSQL

**Características:**
- Open-source e totalmente gratuito
- Super robusto e confiável
- Suporta JSON (!) - pode ser quase um NoSQL
- Extensível - dá para adicionar funcionalidades (como o pgvector)

---

### MySQL

**Características:**
- Open-source 
- Super rápido para leituras
- Muito usado em hospedagens compartilhadas
- Comunidade gigantesca
- Mais simples que PostgreSQL

---

### SQL Server 

**Características:**
- Proprietário (pago), da Microsoft
- Integração perfeita com Windows e .NET
- Ferramentas enterprise robustas
- Performance excelente
- Suporte oficial da Microsoft

---

### SQLite

**Características:**
- **Embedded** (sem servidor separado!)
- Banco inteiro em 1 arquivo
- Zero configuração
- Super leve e rápido
- Open-source
- Perfeito para desenvolvimento

> **Curiosidade:** É o banco de dados mais usado do mundo! Está em todo smartphone, na maioria dos navegadores, em carros, TVs, etc.

---

### Comparação Rápida

| Banco | Custo | Dificuldade | Performance | Melhor Para |
|-------|-------|-------------|-------------|-------------|
| **PostgreSQL** | Gratuito | Média | ⚡⚡⚡ | Apps modernas, startups, dados complexos |
| **MySQL** | Gratuito | Fácil | ⚡⚡⚡ | Web, blogs, e-commerce |
| **SQL Server** | Pago | Média | ⚡⚡⚡ | Empresas Microsoft, .NET |
| **SQLite** | Gratuito | Muito fácil | ⚡⚡ | Mobile, desktop, protótipos |

---

## Use SQL quando você tem


- Dados com estrutura bem definida
- Schema não muda frequentemente
- Relacionamentos entre entidades são importantes
- Precisa fazer queries complexas
