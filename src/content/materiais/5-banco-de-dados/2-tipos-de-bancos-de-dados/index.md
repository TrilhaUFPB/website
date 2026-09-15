---
title: 2. Tipos de Bancos de Dados
description: Quais os diferentes tipos de bancos de dados e suas principais diferenças?
category: Banco de Dados
order: 2
---

## Sumário

- [2.1. Visão Geral](#21-visao-geral)
- [2.2. SQL vs NoSQL](#22-sql-vs-nosql)
- [2.2.1. Bancos Relacionais (SQL)](#221-bancos-relacionais-sql)
- [2.2.2. Bancos Não-Relacionais (NoSQL)](#222-bancos-nao-relacionais-nosql)
- [2.3. Quando escolher SQL vs NoSQL?](#23-quando-escolher-sql-vs-nosql)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

![Imagem 4](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem4.jpg)

# 2.1 Visão Geral

Existem diferentes tipos de bancos de dados que armazenam dados de maneiras diferentes. Os tipos de bancos de dados são amplamente agrupados em **bancos de dados relacionais** e **não relacionais**. 

**Bancos de dados relacionais** são *altamente estruturados*, armazenam dados em ***tabelas*** definidas com ***linhas*** e ***colunas***, além de compreender uma linguagem de programação chamada **SQL** (Structured Query Language) [falaremos de forma mais aprofundada sobre bancos relacionais e SQL mais a frente]. 

**Bancos de dados não relacionais** são altamente diversificados, dando suporte a uma variedade de estruturas de dados. Como muitos bancos de dados não relacionais não usam o SQL, eles costumam ser chamados de bancos de dados NoSQL.

> **Não existe o "melhor" banco de dados**, existe o banco **mais adequado** para cada situação. Um banco excelente para uma aplicação de redes sociais pode ser péssimo para um sistemas bancários, e vice-versa. Não existe apenas um tipo de banco que serve para tudo.

Em resumo os bancos de dados se dividem principalmente em dois grandes grupos:
- **Relacionais (SQL)**: estrutura rígida, tabelas com linhas e colunas
- **Não-Relacionais (NoSQL)**: estrutura flexível, diversos modelos diferentes

---

# 2.2 SQL vs NoSQL

![Imagem 5](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem5.webp)

Ambos os bancos tem suas particularidades e são utilizados para fins diferentes. 

**Bancos de dados SQL**(relacional) seguem uma *estrutura mais fixa* e é ideal para dados consistentes e mais complexos, entretanto, isso traz certa complexidde quanto a sua implementação, uso e desempenho. 

Já **bancos NoSQL**(não relacional) é *mais flexível* e simples, usa modelos como documentos, chave valor e é ideal para dados mais simples e de grande volume, como imagens, textos longos, etc.

## 2.2.1 Bancos Relacionais (SQL)

SQL vem de "Structured Query Language" (Linguagem de Consulta Estruturada). Esses bancos são baseados em **tabelas** (entidades) que tem **colunas** (atributos) e **linhas** (registros). Fazendo uma analogia com POO, as ***tabelas são as classes***, as ***colunas são os atributos*** daquela classe e as ***linhas são os objetos instanciados***.

Uma das principais características dos bancos SQL é a capacidade de criar **relações entre as tabelas**, isso será explicado de forma mais aprofundada no tópico específico sobre bancos de dados relacionais.

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

## 2.2.2 Bancos Não-Relacionais (NoSQL)

NoSQL significa "Not Only SQL" (Não Apenas SQL), não "sem SQL"! Esses bancos surgiram com a necessidade de lidar com volumes MASSIVOS de dados.

Bancos de dados NoSQL tendem a seguir uma estrutura mais simples, sacrificando vários dos pontos que são cruciais para bancos de dados relacionais afim de deixar as coisas menos complexas (mais flexíveis), **mais leves e eficientes**.

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

# 2.3 Quando escolher SQL vs NoSQL?

| Critério | SQL | NoSQL |
|----------|-----|-------|
| **Estrutura dos dados** | Estruturada, relacional, bem definida | Flexível, diversos modelos, pode variar |
| **Escalabilidade** | Vertical (hardware mais potente) | Horizontal (mais servidores) |
| **Relacionamentos** | Complexos, com JOINs | Simples ou desnormalizados |
| **Velocidade** | Rápido para queries complexas | Muito rápido para operações simples |
| **Exemplos** | PostgreSQL, MySQL, SQL Server | MongoDB, Redis, Cassandra, Neo4j |

![Imagem 6](/api/materiais-assets/5-banco-de-dados/2-tipos-de-bancos-de-dados/assets/imagem6.webp)

> Obs: Apesar de associarmos bancos SQL à escalabilidade vertical e NoSQL à horizontal, bancos relacionais modernos também suportam escalabilidade horizontal por meio de técnicas como **read replicas** e **sharding**. A questão da doiferença entre ambos fica mais quanto a flexibilidade dos dados.

**Dica:** Muitas vezes você vai usar AMBOS! Por exemplo:
- PostgreSQL para dados críticos (usuários, pedidos, pagamentos)
- Redis para cache e sessões (temporário, rápido)
- MongoDB para logs e analytics (volumes grandes, estrutura variável)

## Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre Tipos de Bancos de Dados, confira o seguinte recurso:

- [SQL vs. NoSQL: What's the difference?](https://www.youtube.com/watch?v=Q5aTUc7c4jg)

```quiz
- tipo: single
  pergunta: Qual é a principal diferença de estrutura entre bancos SQL e NoSQL?
  opcoes:
    - texto: NoSQL não permite armazenar texto ou números, apenas imagens
      correta: false
      explicacao: Bancos NoSQL armazenam qualquer tipo de dado (texto, números, documentos, etc.), assim como bancos SQL. A diferença está na flexibilidade da estrutura, não no tipo de conteúdo.
    - texto: SQL só funciona em memória e perde os dados ao reiniciar o servidor
      correta: false
      explicacao: Bancos SQL persistem os dados em disco normalmente, como qualquer banco de dados. Isso não tem relação com a diferença entre SQL e NoSQL.
    - texto: NoSQL é apenas um apelido para bancos SQL mais antigos
      correta: false
      explicacao: NoSQL significa "Not Only SQL" e representa uma categoria de bancos com modelos de dados diferentes dos relacionais, não uma versão antiga do SQL.
    - texto: SQL exige uma estrutura rígida definida antes de inserir dados, enquanto NoSQL aceita estruturas flexíveis que podem variar entre registros
      correta: true
      explicacao: Exato! Nos bancos SQL você define o schema (tabelas, colunas, tipos) antes de inserir dados. Já nos bancos NoSQL cada registro pode ter uma estrutura diferente, o que dá mais flexibilidade.
      explicacao_erro: A diferença central é a rigidez do schema. SQL exige que a estrutura seja definida antes de inserir dados; NoSQL permite estruturas flexíveis, que podem até variar de registro para registro.

- tipo: single
  pergunta: O que a propriedade "Isolamento" do ACID garante em um banco relacional?
  opcoes:
    - texto: Que transações simultâneas sejam executadas como se fossem sequenciais, sem interferir umas nas outras
      correta: true
      explicacao: Exato! O Isolamento evita que transações concorrentes vejam resultados parciais umas das outras, prevenindo inconsistências mesmo quando várias operações acontecem ao mesmo tempo.
      explicacao_erro: Isolamento é a garantia de que transações simultâneas não interfiram umas nas outras, como se fossem executadas em sequência, uma de cada vez.
    - texto: Que os dados fiquem isolados em um servidor sem backup
      correta: false
      explicacao: Isolamento não tem relação com backup ou distribuição física dos dados. Ele trata do comportamento de transações concorrentes.
    - texto: Que uma transação nunca possa ser desfeita
      correta: false
      explicacao: Essa característica está mais próxima da Durabilidade (mudanças confirmadas persistem). O Isolamento trata de como transações simultâneas se comportam entre si.
    - texto: Que apenas um usuário por vez possa se conectar ao banco
      correta: false
      explicacao: Bancos relacionais suportam múltiplas conexões simultâneas normalmente. O Isolamento garante apenas que transações concorrentes não interfiram no resultado umas das outras.

- tipo: single
  pergunta: Por que bancos NoSQL costumam escalar horizontalmente com mais facilidade do que bancos SQL tradicionais?
  opcoes:
    - texto: Porque bancos NoSQL não guardam dados em disco
      correta: false
      explicacao: Bancos NoSQL também persistem dados em disco. A facilidade de escalar horizontalmente vem da ausência de relações rígidas entre os dados, não de como eles são armazenados fisicamente.
    - texto: Porque bancos SQL não podem rodar em mais de um servidor
      correta: false
      explicacao: Bancos SQL modernos também suportam escalabilidade horizontal (via read replicas e sharding, por exemplo), mas isso costuma ser mais complexo por causa dos relacionamentos rígidos entre tabelas.
    - texto: Porque, sem relações rígidas entre tabelas, é mais simples distribuir os dados entre vários servidores
      correta: true
      explicacao: Exato! Como os dados não dependem de relacionamentos complexos entre tabelas, é mais fácil particioná-los e distribuí-los entre várias máquinas.
      explicacao_erro: A ausência de relações rígidas entre tabelas facilita particionar e distribuir os dados entre múltiplos servidores, o que torna a escalabilidade horizontal mais natural em bancos NoSQL.
    - texto: Porque bancos NoSQL sempre usam menos espaço em disco
      correta: false
      explicacao: O espaço em disco depende do volume e formato dos dados, não do modelo (SQL ou NoSQL). A facilidade de escalar horizontalmente vem da flexibilidade estrutural.
```
