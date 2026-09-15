---
title: 3. Bancos de Dados Não-Relacionais
description: Quais as principais características dos bancos de dados NoSQL?
category: Banco de Dados
order: 3
---

![Imagem 7](/api/materiais-assets/5-banco-de-dados/3-bancos-nosql/assets/imagem7.webp)

# 3.1 Introdução

Como falamos antes, **NoSQL = Not Only SQL**. É um mundo a parte de bancos que fogem do modelo tradicional de tabelas.

A grande sacada do NoSQL é que existem diversos tipos diferentes, cada um otimizado para um tipo específico de problema. 

Vamos explorar alguns dos principais tipos!

# 3.2 Tipos de Bancos NoSQL

## 3.2.1 Bancos de Documentos

### O que são?

Armazenam dados em **documentos** (geralmente JSON ou BSON - Binary JSON). Cada documento é como dicionário Python - pode ter estrutura diferente dos outros documentos da mesma coleção.

### Como funcionam?

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

### Vantagens:

✅ Flexível - cada documento pode ter campos diferentes

✅ Rápido para leitura/escrita de documentos completos

✅ Fácil de mapear para objetos na programação

✅ Escala horizontalmente bem

✅ Bom para dados semi-estruturados

### Desvantagens:

❌ Queries complexas com múltiplas coleções são menos eficientes

❌ Pode ter redundância de dados (desnormalização)

❌ Menos garantias de consistência que SQL

❌ Pode ocupar mais espaço (documentos maiores)

### Exemplos de bancos:
- **MongoDB**: o mais popular
- **Firestore**: do Google, para apps mobile/web

---

## 3.2.2 Bancos Chave-Valor

### O que são?

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

### Como funcionam?

- Você salva um valor com uma chave
- Você busca o valor pela chave
- Não tem busca por conteúdo, só pela chave exata
- Geralmente armazenam tudo em memória RAM (por isso são tão rápidos)

### Vantagens:

✅ **EXTREMAMENTE rápido** - operações em microssegundos

✅ Simples de usar - GET e SET basicamente

✅ Escala horizontalmente muito bem

✅ Perfeito para cache

### Desvantagens:

❌ Não tem queries complexas - só busca por chave

❌ Não tem relacionamentos

❌ Estrutura muito limitada

### Exemplos de bancos:
- **Redis**: o mais popular, super versátil
- **Memcached**: focado em cache
- **DynamoDB**: da Amazon, serverless

---

## 3.2.3 Bancos de Grafos

### O que são?

Bancos otimizados para armazenar **redes de relacionamentos**. Eles guardam **nós** (entidades) e **arestas** (relações entre elas).

Pensa em uma rede social: você tem pessoas (nós) e amizades (arestas). Perguntas tipo "quem são os amigos dos meus amigos?" são super rápidas em bancos de grafos!

### Como funcionam?

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

### Vantagens:

✅ **Queries de relacionamento são MUITO rápidas**

✅ Visualização intuitiva de dados conectados

✅ Fácil adicionar novos tipos de relacionamentos

✅ Encontra padrões em redes complexas

### Desvantagens:

❌ Complexo

❌ Não é bom para dados sem relacionamentos

❌ Menos opções de ferramentas que SQL ou MongoDB

### Exemplos de bancos:
- **Neo4j**: o mais popular, usado por NASA, eBay, Walmart
- **Amazon Neptune**: serverless da AWS

---

## 3.2.4 Bancos Vetoriais 

### O que são?

Atualmente devido ao grande avanço das tecnologias de linguagem larga (como chatgpt, gemini etc) esses bancos estão se tornando extremamente populares. Eles armazenam **vetores** (arrays de números) e fazem **busca por similaridade**.

### Como funcionam?

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

### Vantagens:

✅ **Busca semântica** (por significado, não por texto exato)

✅ Super rápido para encontrar itens similares

✅ Essencial para aplicações de IA

✅ Funciona com qualquer tipo de dado (texto, imagem, áudio)

### Desvantagens:

❌ Dificil entendimento na geração das embbedings (muito abstrato)

❌ Pode ser caro (computação pesada)

❌ Não substitui bancos tradicionais

### Exemplos de bancos:
- **Chroma**: leve, para desenvolvimento
- **Pgvector**: extensão do PostgreSQL
- **ElasticSearch**: motor de busca com suporte a vetores 