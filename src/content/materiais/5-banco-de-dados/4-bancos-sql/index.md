---
title: 4. Bancos de Dados Relacionais
description: Quais as principais características dos bancos de dados relacionais?
category: Banco de Dados
order: 4
---
- [4.1 Comunicação síncrona e assíncrona](#41-introducao)
- [4.2 Workloads CPU-bound e I/O-bound](#42-conceitos-fundamentais)
- [4.3 Limites, contexto e responsabilidades](#43-tipos-de-relacionamentos)
- [4.4 Limites, contexto e responsabilidades](#44-principais-bancos-relacionais)
- [4.4 Limites, contexto e responsabilidades](#45-use-sql-quando-voce-tem)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

![Imagem 8](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/imagem8.webp)

# 4.1 Introdução

Agora vamos falar dos bancos **relacionais**. São bancos de dados mais robustos que os Não-relacionais e são os mais utilizados de maneira geral.

A grande força do SQL é a **base teórica sólida** (álgebra relacional) e a **estrutura rígida** que garante integridade dos dados. Enquanto o NoSQL é mais simples e amplo quanto suas regras, o SQL é maisrígido quanto aos dados que serão salvos seguindo uma estrutura fixa de tabela e ordem de dados.

# 4.2 Conceitos Fundamentais

## 4.2.1 Tabelas 

Uma **tabela** é como uma planilha Excel/csv: tem linhas e colunas, e cada coluna tem um tipo específico de dado.

![Imagem 1](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/tabela_1.png)

Cada tabela representa uma **entidade** do seu sistema (usuários, produtos, pedidos, etc).

>Seguindo uma analogia de POO pense na tabela como uma classe.

---

## 4.2.2 Registros (Linhas)

Cada **linha** da tabela é um registro. No exemplo acima:
- Linha 1 representa a usuária Beatriz
- E assim por diante

Cada registro é **único** - não podem existir duas linhas completamente idênticas (por causa da chave primária, que iremos ver adiante).

>Continuando a analogia de POO, pense num registro como um objeto instanciado de uma classe (tabela).

---

## 4.2.3 Colunas (Atributos/Campos)

Cada **coluna** representa um atributo da entidade. No exemplo:
- `id`: identificador único
- `nome`: nome completo
- `email`: endereço de email
- `data_cadastro`: quando a pessoa se cadastrou
- `ativo`: se a conta está ativa ou não

Cada coluna tem:
- Um **nome** da coluna
- Um **tipo de dado** (INT, VARCHAR, DATE, BOOLEAN, etc)
- **Restrições** opcionais (NOT NULL, UNIQUE, etc)

>Continuando a analogia com POO, pense nas colunas como os atributos de uma classe.

---

## 4.2.4 Chave Primária (Primary Key - PK)

A **chave primária** é o identificador ÚNICO de cada registro. É como o CPF da linha, não pode se repetir.

Exemplo com SQL:
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Chave primária
    nome VARCHAR(100),
    email VARCHAR(100)
);
```

### Características da PK:

 - **Única**: não pode repetir

 - **Não nula**: sempre tem que ter valor

 -  **Imutável**: não deve mudar depois de criada

 -  **Simples**: geralmente um número inteiro

### Tipos comuns:

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

## 4.2.5 Chave Estrangeira (Foreign Key - FK)

![Imagem 9](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/imagem9.png)

A **chave estrangeira** é o que conecta uma tabela a outra. É a PK de uma tabela aparecendo em outra tabela. 

É a partir dela que criamos os **relacionamentos entre as tabelas**, essa é uma das dinâmicas mais importantes dos bancos de ddos relacionais, onde os dados se ligam e conseguimos criar consultas e dados que interagem com diversas tabelas.

Exemplo:

![Imagem 1](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/tabela_2.png)

A coluna `usuario_id` na tabela `pedidos` é uma FK que aponta para `id` na tabela `usuarios`.

### Como criar uma FK:

```sql
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    valor DECIMAL(10,2),
    data DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    --          ^^^^^^^^^^^^ FK         ^^^^^^^^^^^^ referencia PK
);
```

### O que a FK garante?

 - **Integridade referencial**: não pode criar um pedido para um usuário que não existe

 - **Cascata**: pode configurar para deletar pedidos quando o usuário for deletado

 - **Consistência**: garante que as relações fazem sentido

# 4.3 Tipos de Relacionamentos

A partir do uso de chaves primárias e estrangeiras é possível criar relacionamentos entre diferentes entidades.

## 1:1 (Um para Um)

Cada registro de uma tabela se relaciona com **apenas um** registro de outra tabela.

**Exemplo: Pessoa ↔ Passaporte**
- Cada pessoa tem apenas 1 passaporte
- Cada passaporte pertence a apenas 1 pessoa

![Imagem 1](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/tabela_3.png)

## 1:N (Um para Muitos)

Um registro de uma tabela se relaciona com **vários** registros de outra tabela.

**Exemplo: Cliente → Pedidos**
- 1 cliente pode ter vários pedidos
- Cada pedido pertence a apenas 1 cliente

![Imagem 1](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/tabela_4.png)

---

## N:N (Muitos para Muitos)

Múltiplos registros de uma tabela se relacionam com múltiplos registros de outra.

**Exemplo: Alunos ↔ Cursos**
- 1 aluno pode estar matriculado em vários cursos
- 1 curso pode ter vários alunos

Para implementar N:N, é ideal criar uma **tabela intermediária**, responsável por registrar as ligações entre as duas tabelas:

![Imagem 1](/api/materiais-assets/5-banco-de-dados/4-bancos-sql/assets/tabela_5.png)

É ideal que seja feita dessa forma e não utilizando uma lista de ids, pois seguindo a implementação de listas acaba atrapalhando a contrução de queries mais complexas, além de diminuir a sua eficiência (para descobrirmos as ligações de um registro precisariamos iterar a lista atrelada a ele para cada um dos valores e idenficar esses ids na outra tabela, ao invés de só buscar pelo registro na tabela intermediária)

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

# 4.4 Principais Bancos Relacionais

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

> **Curiosidade:** É o banco de dados mais usado do mundo. Está em todo smartphone, na maioria dos navegadores, em carros, TVs, etc.

---

# 4.5 Use SQL quando você tem

- Dados com estrutura bem definida
- Schema não muda frequentemente
- Relacionamentos entre entidades são importantes
- Precisa fazer queries complexas

```quiz
- tipo: single
  pergunta: "Você está criando a tabela 'usuarios' e precisa definir a Chave Primária (PK). Por questões de segurança, você não quer que os IDs sejam previsíveis (como 1, 2, 3), preferindo uma string complexa gerada automaticamente pelo banco. Qual tipo de chave primária, citado no material, resolve esse problema?"
  opcoes:
    - texto: "INT com AUTO_INCREMENT."
      correta: false
      explicacao: "O AUTO_INCREMENT gera números sequenciais e totalmente previsíveis (1, 2, 3...), o que vai contra o requisito de segurança descrito na pergunta."
    - texto: "UUID."
      correta: true
      explicacao: "Exato O UUID gera strings únicas e complexas (ex: '550e8400-e29b-41d4-a716-446655440000'), evitando a previsibilidade dos números inteiros sequenciais."
      explicacao_erro: "O UUID é o tipo ideal para gerar identificadores complexos em formato de string, substituindo o tradicional número sequencial."
    - texto: "SERIAL."
      correta: false
      explicacao: "SERIAL é apenas a nomenclatura do PostgreSQL equivalente ao AUTO_INCREMENT, ou seja, também gera números sequenciais previsíveis."
    - texto: "VARCHAR com NOT NULL."
      correta: false
- tipo: single
  pergunta: "Você possui a tabela 'usuarios' e a tabela 'pedidos' conectadas por uma Chave Estrangeira (FK). Você quer configurar o banco para que, caso um usuário seja excluído do sistema, todos os pedidos vinculados a ele sejam automaticamente apagados, evitando deixar os dados referentes a ele no banco. Qual característica da Chave Estrangeira permite isso?"
  opcoes:
    - texto: "A configuração de exclusão em Cascata."
      correta: true
      explicacao: "Exatamente! A Foreign Key pode ser configurada com ações em 'Cascata' (CASCADE). Isso faz com que operações feitas na tabela principal, como deleções, reflitam automaticamente nas tabelas dependentes, mantendo a consistência e economizando trabalho no código da aplicação."
      explicacao_erro: "A exclusão em Cascata é o recurso específico da Chave Estrangeira que automatiza a deleção de registros associados em outras tabelas."
    - texto: "A Integridade Referencial restrita."
      correta: false
      explicacao: "A integridade referencial padrão do banco bloqueia a exclusão para evitar dados órfãos (o que geraria um erro)."
    - texto: "O uso da restrição UNIQUE na Chave Estrangeira, forçando a exclusão dupla."
      correta: false
      explicacao: "A restrição UNIQUE (Única) serve para impedir dados repetidos em uma mesma coluna. Ela não tem função de apagar registros em outras tabelas."
    - texto: "A conversão da Chave Estrangeira (FK) em uma Chave Primária (PK) do tipo AUTO_INCREMENT."
      correta: false
      explicacao: "Chaves Primárias servem para identificar registros dentro de sua própria tabela. Mudar a FK para PK não cria mecanismos de deleção automática entre tabelas diferentes."



```