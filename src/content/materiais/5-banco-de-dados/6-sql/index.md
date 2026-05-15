---
title: 6. SQL
description: Como funcionam bancos de dados estruturados?
category: Banco de Dados
order: 6
---

![Imagem 12](/api/materiais-assets/5-banco-de-dados/6-sql/assets/imagem12.png)

# 6.1 O que é SQL?

SQL (Structured Query Language - Linguagem de Consulta Estruturada) é a linguagem universal para conversar com bancos de dados relacionais. 

**Características:**
- Linguagem **declarativa** (você diz O QUE quer, não COMO fazer)
- Padrão **ANSI/ISO** (funciona em todos os bancos SQL)
- Relativamente **simples** de aprender

**Exemplo:**
```sql
-- Você diz: "me dê todos os usuários com idade maior que 18"
SELECT * FROM usuarios WHERE idade > 18;

-- O banco decide COMO buscar (índices, otimizações, etc)
```

SQL é dividida em subconjuntos, cada um com um propósito específico:

# 6.2 Subconjuntos do SQL

| Tipo | Função | Comandos Principais |
|------|--------|---------------------|
| **Definição** | Define a estrutura (tabelas, colunas, índices) | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| **Manipulação** | Manipula os dados (CRUD) | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **Controle** | Controla acesso e permissões | `GRANT`, `REVOKE` |
| **Transação** | Controla transações | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

**Vamos focar na busca (manipulação) e na criação (definição)!**

# 6.3 Tipos de Dados SQL

Antes de criar tabelas, você precisa conhecer os tipos de dados disponíveis:

| Categoria | Tipos | Descrição | Exemplos |
|-----------|-------|-----------|----------|
| **Numéricos Inteiros** | `SMALLINT`, `INT`, `BIGINT` | Números inteiros | 42, -100, 999999 |
| **Numéricos Decimais** | `DECIMAL(p,s)`, `NUMERIC`, `FLOAT`, `DOUBLE` | Números com casas decimais | 19.99, 3.14159 |
| **Texto Fixo** | `CHAR(n)` | Texto com tamanho fixo | "AB&nbsp;&nbsp;&nbsp;" (preenche com espaços) |
| **Texto Variável** | `VARCHAR(n)` | Texto com tamanho variável | "Ana", "Hello World" |
| **Texto Longo** | `TEXT`, `MEDIUMTEXT`, `LONGTEXT` | Textos grandes | Artigos, descrições |
| **Data** | `DATE` | Apenas data | 2024-01-15 |
| **Hora** | `TIME` | Apenas hora | 14:30:00 |
| **Data e Hora** | `DATETIME`, `TIMESTAMP` | Data + hora | 2024-01-15 14:30:00 |
| **Booleano** | `BOOLEAN`, `BOOL` | Verdadeiro ou Falso | TRUE, FALSE (1, 0) |
| **Binário** | `BLOB`, `BINARY` | Dados binários | Imagens, arquivos |

**Diferenças importantes:**

**CHAR vs VARCHAR:**
```sql
nome CHAR(10)      -- Sempre ocupa 10 bytes: "Ana       "
nome VARCHAR(10)   -- Ocupa só o necessário: "Ana" (3 bytes)
```

**FLOAT vs DECIMAL:**
```sql
preco FLOAT        -- Pode ter erro de arredondamento (0.1 + 0.2 = 0.30000000004)
preco DECIMAL(10,2) -- Precisão exata (0.10 + 0.20 = 0.30) ← Use para dinheiro!
```

**DATETIME vs TIMESTAMP:**
```sql
criado_em DATETIME    -- Não muda, guarda exatamente o que você passou
criado_em TIMESTAMP   -- Ajusta para timezone, atualiza automaticamente
```

# 6.4 CRUD Completo

![Imagem 13](/api/materiais-assets/5-banco-de-dados/6-sql/assets/imagem13.png)

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete (as 4 operações básicas)

## 6.4.1 CREATE (Criar)

Tem 2 partes: criar a estrutura (DDL) e inserir dados (DML).

### DDL: Criar Tabela

```sql
-- Exemplo completo e comentado
CREATE TABLE usuarios (
    -- Chave primária com auto incremento
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Textos
    nome VARCHAR(100) NOT NULL,              -- Obrigatório, até 100 caracteres
    email VARCHAR(100) UNIQUE NOT NULL,      -- Obrigatório e único
    senha VARCHAR(255) NOT NULL,             -- Hash da senha (nunca guarde senha pura!)
    
    -- Números
    idade SMALLINT CHECK (idade >= 18),      -- Inteiro pequeno, maior de idade
    
    -- Booleano
    ativo BOOLEAN DEFAULT TRUE,              -- Padrão: true
    
    -- Datas
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data atual automática
    ultimo_acesso DATETIME
);
```

**Explicação linha por linha:**

1. `id INT PRIMARY KEY AUTO_INCREMENT` 
   - Identificador único
   - Incrementa automaticamente (1, 2, 3...)
   
2. `nome VARCHAR(100) NOT NULL`
   - Texto variável, até 100 caracteres
   - NOT NULL = obrigatório
   
3. `email VARCHAR(100) UNIQUE NOT NULL`
   - UNIQUE = não pode repetir
   - Perfeito para login
   
4. `idade SMALLINT CHECK (idade >= 18)`
   - SMALLINT = número pequeno (-32768 a 32767)
   - CHECK = validação (só aceita >= 18)
   
5. `ativo BOOLEAN DEFAULT TRUE`
   - Se não passar valor, assume TRUE
   
6. `data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
   - Preenche automaticamente com a data/hora atual

---

### DML: Inserir Dados (INSERT)

**Inserção simples:**
```sql
INSERT INTO usuarios (nome, email, senha, idade) 
VALUES ('Davi Nasiasene', 'davi@email.com', 'hash_da_senha', 25);
```

**Inserção múltipla**:
```sql
INSERT INTO usuarios (nome, email, senha, idade) VALUES
    ('Davi Nasiasene', 'davi@email.com', 'hash123', 25),
    ('Emyle Santos', 'emyle@email.com', 'hash456', 30),
    ('Pedro Kruta', 'pedro@email.com', 'hash789', 28);
```

**Inserção parcial** (usando valores DEFAULT):
```sql
-- Não passa idade nem ativo, usa os valores padrão
INSERT INTO usuarios (nome, email, senha) 
VALUES ('joaquim', 'joaquim@email.com', 'hash999');
-- idade será NULL, ativo será TRUE, data_cadastro será agora
```

**Inserir e retornar o ID gerado:**
```sql
-- MySQL
INSERT INTO usuarios (nome, email, senha) VALUES ('joaquim', 'joaquim@email.com', 'hash');
SELECT LAST_INSERT_ID();  -- Retorna o ID que acabou de ser gerado

-- PostgreSQL
INSERT INTO usuarios (nome, email, senha) VALUES ('joaquim', 'joaquim@email.com', 'hash')
RETURNING id;  -- Mais elegante!
```

---

## 6.4.2 READ (Consultar/Selecionar)

A parte mais importante e complexa do SQL!

### SELECT Básico

```sql
-- Selecionar TODAS as colunas
SELECT * FROM usuarios;

-- Selecionar colunas específicas (mais eficiente!)
SELECT nome, email FROM usuarios;

-- Com alias (apelido para as colunas)
SELECT 
    nome AS "Nome Completo", 
    email AS "E-mail",
    idade AS "Idade em anos"
FROM usuarios;
```

---

### WHERE (Filtrar)

Filtra quais linhas você quer ver:

**Operadores de comparação:**
```sql
-- Igualdade
SELECT * FROM usuarios WHERE idade = 25;

-- Diferente
SELECT * FROM usuarios WHERE idade != 25;
SELECT * FROM usuarios WHERE idade <> 25;  -- Mesmo que !=

-- Maior, menor
SELECT * FROM usuarios WHERE idade > 18;
SELECT * FROM usuarios WHERE idade >= 18;
SELECT * FROM usuarios WHERE idade < 30;
SELECT * FROM usuarios WHERE idade <= 30;
```

**Operadores lógicos:**
```sql
-- AND (E) - ambas as condições têm que ser verdadeiras
SELECT * FROM usuarios 
WHERE idade >= 18 AND ativo = TRUE;

-- OR (OU) - pelo menos uma condição tem que ser verdadeira
SELECT * FROM usuarios 
WHERE idade < 18 OR ativo = FALSE;

-- NOT (NÃO) - inverte a condição
SELECT * FROM usuarios 
WHERE NOT ativo = TRUE;  -- Mesmo que: WHERE ativo = FALSE
```

**LIKE (busca parcial):**
```sql
-- Começa com "Ana"
SELECT * FROM usuarios WHERE nome LIKE 'Ana%';

-- Termina com "Daniel"
SELECT * FROM usuarios WHERE nome LIKE '%Daniel';

-- Contém "Gabriel" em qualquer lugar
SELECT * FROM usuarios WHERE nome LIKE '%Gabriel%';

-- Exatamente 3 caracteres
SELECT * FROM usuarios WHERE nome LIKE '___';  -- 3 underscores

-- Case insensitive (depende do banco)
SELECT * FROM usuarios WHERE nome ILIKE '%ana%';  -- PostgreSQL
```

**IN (múltiplos valores):**
```sql
-- Em vez de: idade = 25 OR idade = 30 OR idade = 35
SELECT * FROM usuarios WHERE idade IN (25, 30, 35);

-- Pode usar com texto também
SELECT * FROM usuarios WHERE nome IN ('Ana', 'Daniel', 'Gabriel');

-- NOT IN (nenhum desses)
SELECT * FROM usuarios WHERE idade NOT IN (18, 19, 20);
```

**IS NULL / IS NOT NULL:**
```sql
-- Valores nulos (vazios, não preenchidos)
SELECT * FROM usuarios WHERE telefone IS NULL;

-- Valores não nulos
SELECT * FROM usuarios WHERE telefone IS NOT NULL;
```

**Combinando tudo:**
```sql
SELECT nome, email, idade
FROM usuarios
WHERE idade BETWEEN 20 AND 40
  AND ativo = TRUE
  AND email LIKE '%@gmail.com'
  AND nome NOT IN ('Admin', 'Test')
ORDER BY idade DESC;
```

---

### ORDER BY (Ordenar)

```sql
-- Ordem crescente (A-Z, 0-9) - padrão
SELECT * FROM usuarios ORDER BY nome;
SELECT * FROM usuarios ORDER BY nome ASC;  -- ASC = ascending (explícito)

-- Ordem decrescente (Z-A, 9-0)
SELECT * FROM usuarios ORDER BY idade DESC;  -- DESC = descending

-- Múltiplas colunas
SELECT * FROM usuarios 
ORDER BY ativo DESC, idade ASC, nome ASC;
-- Primeiro por ativo (true antes de false)
-- Depois por idade (menor para maior)
-- Depois por nome (A-Z)
```

---

### LIMIT e OFFSET (Paginação)

```sql
-- Primeiros 10 registros
SELECT * FROM usuarios LIMIT 10;

-- Pular os primeiros 10, pegar os próximos 10 (página 2)
SELECT * FROM usuarios LIMIT 10 OFFSET 10;

-- Página 3 (pula 20, pega 10)
SELECT * FROM usuarios LIMIT 10 OFFSET 20;

-- Fórmula da paginação:
-- LIMIT = tamanho_da_pagina
-- OFFSET = (numero_da_pagina - 1) * tamanho_da_pagina

-- Exemplo: Página 5, mostrando 20 por página
SELECT * FROM usuarios LIMIT 20 OFFSET 80;  -- (5-1) * 20 = 80
```

---

### GROUP BY

**GROUP BY** agrupa linhas que têm valores iguais:

```sql
-- Quantos usuários de cada idade?
SELECT idade, COUNT(*) as quantidade
FROM usuarios
GROUP BY idade
ORDER BY quantidade DESC;

-- Resultado:
-- idade | quantidade
-- ------|----------
-- 25    | 15
-- 30    | 12
-- 28    | 10
```

```sql
-- Total de pedidos por cliente
SELECT cliente_id, SUM(valor) as total_gasto
FROM pedidos
GROUP BY cliente_id;
```

```sql
-- Valor médio por categoria de produto
SELECT categoria_id, AVG(preco) as preco_medio
FROM produtos
GROUP BY categoria_id;
```

---

## 6.4.3 UPDATE (Atualizar)

Modifica dados existentes. **⚠️ SEMPRE use WHERE, senão atualiza TUDO!**

**Atualizar um campo:**
```sql
-- Atualizar idade do usuário 1
UPDATE usuarios 
SET idade = 26 
WHERE id = 1;
```

**Atualizar múltiplos campos:**
```sql
UPDATE usuarios 
SET 
    nome = 'Ana Paula Silva',
    idade = 26,
    ultimo_acesso = NOW()
WHERE id = 1;
```

**Atualizar com condição:**
```sql
-- Desativar usuários antigos (cadastrados antes de 2020)
UPDATE usuarios 
SET ativo = FALSE 
WHERE data_cadastro < '2020-01-01';
```

**Atualizar com cálculo:**
```sql
-- Aumentar todos os preços em 10%
UPDATE produtos 
SET preco = preco * 1.10 
WHERE categoria_id = 5;
```

**Atualizar com base em outra tabela (JOIN no UPDATE):**
```sql
-- Atualizar saldo do cliente com base nos pedidos
UPDATE clientes c
SET saldo = (
    SELECT SUM(valor) 
    FROM pedidos p 
    WHERE p.cliente_id = c.id
);
```

**⚠️ PERIGO! UPDATE sem WHERE:**
```sql
-- ❌ ISSO ATUALIZA TODOS OS REGISTROS!
UPDATE usuarios SET ativo = FALSE;

-- ✅ Sempre use WHERE (a não ser que realmente queira atualizar tudo)
UPDATE usuarios SET ativo = FALSE WHERE id = 1;
```

**Dica de segurança:** Antes de fazer UPDATE, faça um SELECT com o mesmo WHERE:
```sql
-- 1. Primeiro veja o que vai ser afetado
SELECT * FROM usuarios WHERE data_cadastro < '2020-01-01';

-- 2. Se estiver certo, faça o UPDATE
UPDATE usuarios SET ativo = FALSE WHERE data_cadastro < '2020-01-01';
```

---

## 6.4.4 DELETE (Excluir)

Remove registros. **SEMPRE use WHERE, senão deleta TUDO!**

**Deletar um registro:**
```sql
DELETE FROM usuarios WHERE id = 1;
```

**Deletar com condição:**
```sql
-- Deletar usuários inativos
DELETE FROM usuarios WHERE ativo = FALSE;

-- Deletar pedidos antigos
DELETE FROM pedidos WHERE data < '2020-01-01';
```

**⚠️ PERIGO MÁXIMO! DELETE sem WHERE:**
```sql
-- ❌ ISSO DELETA TODOS OS REGISTROS!
DELETE FROM usuarios;

-- ✅ Sempre use WHERE (a não ser que realmente queira deletar tudo)
DELETE FROM usuarios WHERE id = 1;
```

**Dica de segurança:** Igual ao UPDATE, faça SELECT antes:
```sql
-- 1. Veja o que vai ser deletado
SELECT * FROM usuarios WHERE ativo = FALSE;

-- 2. Se estiver certo, delete
DELETE FROM usuarios WHERE ativo = FALSE;
```
