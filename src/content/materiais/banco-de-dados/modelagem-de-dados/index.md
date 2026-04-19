---
title: Modelagem de Dados
description: 
category: Banco de Dados
order: 3
---

# Modelagem de Dados

## Introdução

**Modelagem de dados** é o processo de planejar como seus dados serão estruturados no banco de dados. É tipo fazer a planta de uma casa antes de construir.

### Por que é importante planejar antes?

Imagina criar um e-commerce sem planejar:
- Você coloca tudo em uma tabela gigante
- Depois percebe que precisa de categorias
- Surge a necessidade precisa mudar tudo
- Descobre-se que tem dados duplicados
- E tem que refazer tudo de novo

**Consequências de uma modelagem ruim:**

❌ **Redundância** - mesma informação repetida em vários lugares
```
Pedido 1: cliente_nome="Ana Silva", cliente_cpf="111.111.111"
Pedido 2: cliente_nome="Ana Silva", cliente_cpf="111.111.111"  // Repetido!
```

❌ **Inconsistência** - informações contraditórias
```
Pedido 1: cliente_email="ana@email.com"
Pedido 2: cliente_email="ana@gmail.com"  // Qual é o certo?
```

❌ **Performance ruim** - queries lentas e ineficientes

❌ **Dificuldade de manutenção** - qualquer mudança vira um pesadelo

❌ **Bugs e erros** - dados corrompidos, relatórios errados

❌ **Desperdício de espaço** - dados duplicados ocupam mais espaço


> **Tempo investido em modelagem = tempo economizado depois!**

---

## Entidades, Atributos e Relacionamentos

Esses são os 3 conceitos fundamentais da modelagem. Vamos entender cada um:

### Entidades

**Entidade** é qualquer "coisa" do mundo real que você quer guardar informações. Pode ser uma pessoa, objeto, conceito, evento...

**Exemplos:**
- Cliente
- Produto  
- Pedido
- Categoria
- Fornecedor
- Pagamento

**Como identificar entidades?**
- Geralmente são substantivos
- São coisas sobre as quais você precisa guardar dados
- Vão virar tabelas no banco

**Dica:** Pegue uma descrição do sistema e circule todos os substantivos. A maioria vai ser uma entidade!

```
"O CLIENTE faz um PEDIDO contendo vários PRODUTOS. 
Cada PRODUTO pertence a uma CATEGORIA."

Entidades: Cliente, Pedido, Produto, Categoria
```

---

### Atributos

**Atributos** são as características/propriedades de uma entidade. São as informações que você quer guardar sobre ela.

**Exemplo:**
```
Entidade: Cliente

Atributos:
- nome
- email
- CPF
- telefone
- data_nascimento
- endereco
```

**Atributos vão virar colunas** na tabela!

---

### Relacionamentos

**Relacionamentos** são as conexões entre entidades. Como elas se relacionam?

**Exemplos:**
- Cliente **faz** Pedido
- Produto **pertence a** Categoria
- Aluno **cursa** Disciplina
- Autor **escreve** Livro

**Cardinalidade** define "quantos de cada lado":
- **1:1** (um para um) - Pessoa ↔ Passaporte
- **1:N** (um para muitos) - Cliente → Pedidos
- **N:N** (muitos para muitos) - Alunos ↔ Cursos

---

## Normalização

Agora chegamos em um dos conceitos mais importantes da modelagem: **normalização**!

### O Problema: Dados Desnormalizados

Imagina que você fez essa tabela (ruim):

```
Tabela: pedidos_completos
+----+-------------+-------------+-------------+-----------------------------+
| id | cliente_nome| cliente_cpf | cliente_end | produtos                     |
+----+-------------+-------------+-------------+-----------------------------+
| 1  | Ana Silva   | 111.111.111 | Rua A, 123  | Notebook Dell, Mouse Logitech|
| 2  | Ana Silva   | 111.111.111 | Rua A, 123  | Teclado Mecânico             |
| 3  | Bruno Costa | 222.222.222 | Rua B, 456  | Mouse Logitech               |
+----+-------------+-------------+-------------+-----------------------------+
```

**Problemas dessa tabela:**

🔴 **Redundância**
- Dados de Ana repetidos 2 vezes (nome, CPF, endereço)
- Quanto mais pedidos, mais repetição!

🔴 **Anomalia de Atualização**
- Ana mudou de endereço? Tem que atualizar em TODAS as linhas
- Se esquecer uma, fica inconsistente

🔴 **Anomalia de Inserção**
- E se quiser cadastrar um cliente que ainda não fez pedido?
- Não dá, porque a tabela é de pedidos!

🔴 **Anomalia de Exclusão**
- Se Ana cancelar todos os pedidos e deletarmos, perdemos os dados dela
- Ela deixa de existir no sistema!

🔴 **Múltiplos valores em uma célula**
- "Notebook Dell, Mouse Logitech" - como dito antes, manipular listas em bancos é algo ruim!
- Como contar quantos produtos? Como buscar um produto específico?

---

### A Solução: Formas Normais

A **normalização** é um processo de organizar os dados para eliminar esses problemas. Vamos passar pelas 3 primeiras formas normais, existem outras, mas essas são as mais importantes:

![Imagem 9](images/imagem9.png)

---

#### 1ª Forma Normal (1FN)

**Regra:** Eliminar atributos multivalorados - cada célula deve ter APENAS um valor.

**ANTES (Errado):**
```
+----+-------------+-------------------------------------+
| id | cliente_nome| produtos                             |
+----+-------------+-------------------------------------+
| 1  | Ana Cecília | Notebook Dell, Mouse Logitech        |  ❌ Múltiplos valores
+----+-------------+-------------------------------------+
```

**DEPOIS (1FN):**
```
+----+-------------+-------------------+
| id | cliente_nome| produto            |
+----+-------------+-------------------+
| 1  | Ana Cecília | Notebook Dell      |  ✅ Um valor por célula
| 1  | Ana Cecília | Mouse Logitech     |  ✅ Um valor por célula
+----+-------------+-------------------+
```

**Mas ainda tem o problema da redundância!** Vamos para a 2FN...

---

#### 2ª Forma Normal (2FN)

**Regra:** Deve estar em 1FN + eliminar dependências parciais.

**Dependência parcial** = quando um atributo depende só de PARTE da chave primária.

**ANTES (só 1FN):**
```
+-------------+-------------+-------------------+---------------+
| pedido_id   | produto_id  | produto_nome      | cliente_nome  |
+-------------+-------------+-------------------+---------------+
| 1           | 10          | Notebook Dell     | Ana Cecília   |
| 1           | 20          | Mouse Logitech    | Ana Cecília   |
+-------------+-------------+-------------------+---------------+
Chave primária composta: (pedido_id, produto_id)
```

Problema: `produto_nome` depende só de `produto_id` (não do pedido!)
E `cliente_nome` depende só de `pedido_id` (não do produto!)

**DEPOIS (2FN):** Separar em tabelas diferentes!

```
Tabela: pedidos
+-----------+---------------+
| pedido_id | cliente_nome  |
+-----------+---------------+
| 1         | Ana Cecília   |
+-----------+---------------+

Tabela: produtos
+-------------+-------------------+
| produto_id  | produto_nome      |
+-------------+-------------------+
| 10          | Notebook Dell     |
| 20          | Mouse Logitech    |
+-------------+-------------------+

Tabela: pedidos_produtos (intermediária)
+-----------+-------------+----------+
| pedido_id | produto_id  | quantidade|
+-----------+-------------+----------+
| 1         | 10          | 1        |
| 1         | 20          | 1        |
+-----------+-------------+----------+
```

**Melhor, mas ainda tem problema!** O cliente está na tabela de pedidos...

---

#### 3ª Forma Normal (3FN)

**Regra:** Deve estar em 2FN + eliminar dependências transitivas.

**Dependência transitiva** = quando um atributo não-chave depende de outro atributo não-chave.

**ANTES (só 2FN):**
```
Tabela: pedidos
+-----------+---------------+-------------+-------------------+
| pedido_id | cliente_nome  | cliente_cpf | cliente_endereco  |
+-----------+---------------+-------------+-------------------+
| 1         | Ana Cecília   | 111.111.111 | Rua A, 123        |
| 2         | Ana Cecília   | 111.111.111 | Rua A, 123        |  ❌ Redundância
+-----------+---------------+-------------+-------------------+
```

Problema: `cliente_nome`, `cliente_cpf` e `cliente_endereco` dependem uns dos outros (transitivo), não do `pedido_id` diretamente!

**DEPOIS (3FN):** Criar tabela separada para clientes!

```
Tabela: clientes
+------------+---------------+-------------+-------------------+
| cliente_id | nome          | cpf         | endereco          |
+------------+---------------+-------------+-------------------+
| 1          | Ana Cecíli    | 111.111.111 | Rua A, 123        |
| 2          | Felipe Duarte | 222.222.222 | Rua B, 456        |
+------------+---------------+-------------+-------------------+

Tabela: pedidos
+-----------+------------+-------------+--------+
| pedido_id | cliente_id | data        | valor  |
+-----------+------------+-------------+--------+
| 1         | 1          | 2024-01-15  | 250.00 |
| 2         | 1          | 2024-01-20  | 150.00 |
| 3         | 2          | 2024-01-22  | 75.00  |
+-----------+------------+-------------+--------+

Tabela: produtos
+------------+-------------------+--------+
| produto_id | nome              | preco  |
+------------+-------------------+--------+
| 10         | Notebook Dell     | 200.00 |
| 20         | Mouse Logitech    | 50.00  |
+------------+-------------------+--------+

Tabela: pedidos_produtos
+-----------+------------+----------+
| pedido_id | produto_id | qtd      |
+-----------+------------+----------+
| 1         | 10         | 1        |
| 1         | 20         | 1        |
| 2         | 20         | 3        |
+-----------+------------+----------+
```

**Agora sim! ✅** Dados organizados, sem redundância, sem anomalias!

---

### Resultado Final: Estrutura Normalizada

Conseguimos separar tudo em tabelas coesas:

1. **clientes** - informações dos clientes
2. **produtos** - catálogo de produtos
3. **pedidos** - pedidos feitos (com FK para cliente)
4. **pedidos_produtos** - quais produtos em cada pedido (tabela N:N)

**Benefícios:**
✅ Zero redundância
✅ Fácil atualizar dados (muda em 1 lugar só)
✅ Integridade garantida
✅ Flexível para crescer
✅ Performance otimizada

**Quando NÃO normalizar?**
- Data warehouses e analytics (desnormalização proposital para queries rápidas)
- Sistemas que priorizam leitura sobre escrita
- Quando a performance de leitura é crítica

---

## Boas Práticas

### Nomenclatura

**Nomes de tabelas:**

✅ **BOM:**
```sql
-- Escolha um padrão e mantenha!
usuarios        -- plural em minúsculo
produtos
pedidos
```

❌ **RUIM:**
```sql
usuario         -- Mistura singular/plural
Produtos        -- Mistura maiúscula/minúscula  
PEDIDOS
tbl_cliente     -- Prefixo desnecessário
```

**Nomes de colunas:**

✅ **BOM:**
```sql
-- Use snake_case (palavras separadas por underline)
data_cadastro
preco_total
usuario_id
primeiro_nome
```

❌ **RUIM:**
```sql
dataCadastro    -- camelCase não é padrão SQL
PrecoTotal      -- PascalCase também não
usuarioid       -- Difícil de ler
nome1           -- Use nomes descritivos!
```

---

### Tipos de Dados

**Escolher o tipo certo economiza espaço e melhora performance!**

| Dado | ❌ Tipo RUIM | ✅ Tipo BOM | Por quê |
|------|--------------|-------------|---------|
| CPF | `VARCHAR(100)` | `CHAR(11)` ou `VARCHAR(14)` | Tamanho fixo e conhecido |
| Idade | `VARCHAR(10)` | `SMALLINT` | É um número, não texto! |
| Preço | `FLOAT` | `DECIMAL(10,2)` | FLOAT tem erro de arredondamento |
| Ativo/Inativo | `VARCHAR(10)` | `BOOLEAN` | Booleano é mais eficiente |
| Descrição curta | `TEXT` | `VARCHAR(255)` | TEXT é para textos longos |
| Descrição longa | `VARCHAR(255)` | `TEXT` | VARCHAR tem limite pequeno |
| Data de nascimento | `VARCHAR(20)` | `DATE` | Use tipo específico! |
| Email | `VARCHAR(50)` | `VARCHAR(255)` | Emails podem ser grandes |

**Exemplo prático:**

❌ **RUIM:**
```sql
CREATE TABLE produtos (
    id VARCHAR(100),              -- ID deveria ser INT
    nome TEXT,                    -- Nome não precisa ser TEXT  
    preco FLOAT,                  -- FLOAT tem erro de arredondamento!
    quantidade VARCHAR(10),       -- Quantidade é número
    ativo VARCHAR(10),            -- Ativo/Inativo é booleano
    data_cadastro VARCHAR(50)     -- Data como texto? Não!
);
```

✅ **BOM:**
```sql
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
    quantidade INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Dica:** Pergunte sempre:
- Esse dado é numérico? → Use INT, DECIMAL, etc
- Tem tamanho fixo? → Use CHAR
- Tamanho variável? → Use VARCHAR  
- Texto grande? → Use TEXT
- Data/hora? → Use DATE, TIMESTAMP, etc
- Sim/Não? → Use BOOLEAN

---

### Constraints (Restrições)

**Constraints** são regras que garantem a integridade dos dados:

#### NOT NULL
"Este campo é obrigatório!"

```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,      -- Obrigatório
    email VARCHAR(100) NOT NULL,     -- Obrigatório
    telefone VARCHAR(20)             -- Opcional
);
```

#### UNIQUE
"Este valor não pode repetir!"

```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,       -- Não pode ter 2 emails iguais
    cpf VARCHAR(11) UNIQUE           -- Não pode ter 2 CPFs iguais
);
```

#### CHECK
"O valor tem que seguir esta regra!"

```sql
CREATE TABLE produtos (
    id INT PRIMARY KEY,
    preco DECIMAL(10,2) CHECK (preco > 0),        -- Preço tem que ser positivo
    estoque INT CHECK (estoque >= 0),              -- Estoque não pode ser negativo
    desconto INT CHECK (desconto BETWEEN 0 AND 100) -- Desconto entre 0 e 100%
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    idade INT CHECK (idade >= 18),                 -- Só maiores de idade
    email VARCHAR(100) CHECK (email LIKE '%@%')    -- Tem que ter @ no email
);
```

#### DEFAULT
"Se não passar valor, usa este!"

```sql
CREATE TABLE produtos (
    id INT PRIMARY KEY,
    estoque INT DEFAULT 0,                         -- Se não informar, estoque = 0
    ativo BOOLEAN DEFAULT TRUE,                    -- Se não informar, ativo = true
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data atual automaticamente
);
```

#### Exemplo completo com todas as constraints:

```sql
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,                    -- Obrigatório
    sku VARCHAR(50) UNIQUE NOT NULL,               -- Obrigatório e único
    preco DECIMAL(10,2) NOT NULL CHECK (preco > 0),-- Obrigatório e positivo
    estoque INT DEFAULT 0 CHECK (estoque >= 0),    -- Padrão 0, não pode ser negativo
    ativo BOOLEAN DEFAULT TRUE,                    -- Padrão ativo
    categoria_id INT NOT NULL,                     -- Obrigatório
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)  -- Integridade referencial
);
```

**Benefícios das constraints:**
✅ Dados sempre válidos
✅ Menos bugs
✅ Integridade garantida pelo banco (não depende do código)
✅ Documentação automática (deixa claro as regras)
