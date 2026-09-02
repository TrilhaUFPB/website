---
title: 3. Bancos de Dados Não-Relacionais
description: Quais as principais características dos bancos de dados NoSQL?
category: Banco de Dados
order: 3
---

## Sumário

- [3.1. Introdução](#31-introducao)
- [3.2. Bancos de Documentos](#32-bancos-de-documentos)
- [3.3. Bancos Chave-Valor](#33-bancos-chave-valor)
- [3.4. Bancos de Grafos](#34-bancos-de-grafos)
- [3.5. Bancos Vetoriais](#35-bancos-vetoriais)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Nem todo dado nasceu pra virar linha de tabela. Uma rede de amizades, um cache que precisa responder em microssegundos, ou o significado por trás de uma frase — forçar isso num esquema rígido de linhas e colunas custa mais do que resolve.

Como vimos no tópico anterior, **NoSQL = Not Only SQL**: um mundo à parte de bancos que fogem do modelo tradicional de tabelas. A grande sacada é que existem diversos tipos diferentes, cada um otimizado para um tipo específico de problema. Vamos explorar os quatro principais: documentos, chave-valor, grafos e vetoriais.

---

# 3.1. Introdução

![Imagem 7](/api/materiais-assets/5-banco-de-dados/3-bancos-nosql/assets/imagem7.webp)

Cada tipo de banco NoSQL nasceu para resolver um problema que o modelo relacional resolve mal: estrutura que muda o tempo todo, buscas por chave em microssegundos, relacionamentos profundos entre entidades, ou similaridade entre conteúdos. Nas próximas seções, vamos ver como cada um funciona, quando vale a pena usar, e quais bancos são referência em cada categoria.

---

# 3.2. Bancos de Documentos

## O que são?

Armazenam dados em **documentos** (geralmente JSON ou BSON — Binary JSON). Cada documento é como um dicionário Python: pode ter uma estrutura diferente dos outros documentos da mesma coleção.

## Como funcionam?

Em vez de tabelas com linhas, você tem **coleções** com **documentos**, como no exemplo abaixo:

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

## Vantagens e desvantagens

- ✅ Flexível — cada documento pode ter campos diferentes
- ✅ Rápido para leitura/escrita de documentos completos
- ✅ Fácil de mapear para objetos na programação
- ✅ Escala horizontalmente bem
- ✅ Bom para dados semi-estruturados
- ❌ Queries complexas com múltiplas coleções são menos eficientes
- ❌ Pode ter redundância de dados (desnormalização)
- ❌ Menos garantias de consistência que SQL
- ❌ Pode ocupar mais espaço (documentos maiores)

## Exemplos de bancos

- **MongoDB**: o mais popular
- **Firestore**: do Google, para apps mobile/web

---

# 3.3. Bancos Chave-Valor

## O que são?

O modelo **mais simples** de NoSQL. Funciona exatamente como um dicionário Python:

```python
{
    "usuario:123:sessao": "abc123xyz",
    "produto:456:estoque": 150,
    "post:789:curtidas": 1523,
    "cache:homepage": "<html>...</html>"
}
```

Você tem uma **chave única** e um **valor**. Como é um dicionário, a busca é extremamente rápida — feita em tempo constante.

## Como funcionam?

- Você salva um valor com uma chave
- Você busca o valor pela chave
- Não tem busca por conteúdo, só pela chave exata
- Geralmente armazenam tudo em memória RAM (por isso são tão rápidos)

## Vantagens e desvantagens

- ✅ **Extremamente rápido** — operações em microssegundos
- ✅ Simples de usar — GET e SET basicamente
- ✅ Escala horizontalmente muito bem
- ✅ Perfeito para cache
- ❌ Não tem queries complexas — só busca por chave
- ❌ Não tem relacionamentos
- ❌ Estrutura muito limitada

## Exemplos de bancos

- **Redis**: o mais popular, super versátil
- **Memcached**: focado em cache
- **DynamoDB**: da Amazon, serverless

---

# 3.4. Bancos de Grafos

## O que são?

Bancos otimizados para armazenar **redes de relacionamentos**. Eles guardam **nós** (entidades) e **arestas** (relações entre elas).

Pensa em uma rede social: você tem pessoas (nós) e amizades (arestas). Perguntas do tipo "quem são os amigos dos meus amigos?" são super rápidas em bancos de grafos!

## Como funcionam?

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

## Vantagens e desvantagens

- ✅ **Queries de relacionamento são muito rápidas**
- ✅ Visualização intuitiva de dados conectados
- ✅ Fácil adicionar novos tipos de relacionamentos
- ✅ Encontra padrões em redes complexas
- ❌ Complexo
- ❌ Não é bom para dados sem relacionamentos
- ❌ Menos opções de ferramentas que SQL ou MongoDB

## Exemplos de bancos

- **Neo4j**: o mais popular, usado por NASA, eBay, Walmart
- **Amazon Neptune**: serverless da AWS

---

# 3.5. Bancos Vetoriais

## O que são?

Com o avanço das tecnologias de linguagem larga (como ChatGPT e Gemini), esses bancos estão se tornando extremamente populares. Eles armazenam **vetores** (arrays de números) e fazem **busca por similaridade**.

## Como funcionam?

Em IA/Machine Learning, textos, imagens e áudios são transformados em vetores (embeddings):

```
Texto: "cachorro fofo"
Vetor: [0.2, 0.8, 0.1, -0.3, 0.5, ...]  // centenas ou milhares de dimensões

Texto: "filhote de cachorro"
Vetor: [0.19, 0.79, 0.12, -0.31, 0.48, ...]  // muito similar!

Texto: "carro esportivo"
Vetor: [-0.5, 0.1, 0.9, 0.7, -0.2, ...]  // bem diferente
```

O banco vetorial calcula a **distância** entre vetores e encontra os mais próximos (mais similares).

É muito utilizado na técnica de **RAG** (Retrieval-Augmented Generation), usada para melhorar a "memória" e o "conhecimento" das LLMs.

## Vantagens e desvantagens

- ✅ **Busca semântica** (por significado, não por texto exato)
- ✅ Super rápido para encontrar itens similares
- ✅ Essencial para aplicações de IA
- ✅ Funciona com qualquer tipo de dado (texto, imagem, áudio)
- ❌ Difícil entendimento na geração dos embeddings (muito abstrato)
- ❌ Pode ser caro (computação pesada)
- ❌ Não substitui bancos tradicionais

## Exemplos de bancos

- **Chroma**: leve, para desenvolvimento
- **Pgvector**: extensão do PostgreSQL
- **ElasticSearch**: motor de busca com suporte a vetores

---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre bancos de dados NoSQL, confira o seguinte recurso:

- [NoSQL Databases - IBM](https://www.ibm.com/think/topics/nosql-databases?utm_medium=OSocial&utm_source=Youtube&utm_content=WOOWW&utm_id=YT-201-How-to-be-a-NoSQL-expert)

```quiz
- tipo: single
  pergunta: Por que dois documentos na mesma coleção MongoDB podem ter campos diferentes entre si?
  opcoes:
    - texto: Porque bancos de documentos não seguem um esquema fixo — cada documento pode ter sua própria estrutura
      correta: true
      explicacao: Exato! Diferente do modelo relacional, onde toda linha de uma tabela segue as mesmas colunas, um banco de documentos não exige que todos os documentos de uma coleção tenham os mesmos campos.
      explicacao_erro: Bancos de documentos não têm esquema fixo. Cada documento de uma coleção pode ter campos próprios — é isso que dá a flexibilidade de armazenar, por exemplo, um usuário com telefone e outro sem.
    - texto: Porque o MongoDB corrompe os dados quando o volume cresce
      correta: false
      explicacao: Não tem relação com corrupção de dados. Documentos com campos diferentes numa mesma coleção são um comportamento normal e esperado do modelo, não um erro.
    - texto: Porque cada documento fica em um banco de dados diferente
      correta: false
      explicacao: Documentos de uma mesma coleção ficam armazenados juntos, no mesmo banco. A flexibilidade de estrutura não tem relação com onde os dados são fisicamente armazenados.
    - texto: Porque o JSON obriga todo campo a ser opcional
      correta: false
      explicacao: O formato JSON em si não impõe isso — é uma decisão de design do banco de documentos não exigir um esquema fixo, permitindo que cada documento declare só os campos que precisa.

- tipo: single
  pergunta: O que explica a velocidade extrema de bancos chave-valor como o Redis?
  opcoes:
    - texto: Eles funcionam como um dicionário — busca por chave exata em tempo constante, geralmente com os dados em memória RAM
      correta: true
      explicacao: Exato! Sem precisar varrer registros ou percorrer relacionamentos, a busca por uma chave é direta, e manter os dados em RAM (em vez de disco) reduz a latência para microssegundos.
      explicacao_erro: A velocidade vem da simplicidade do modelo — busca por chave exata, sem joins ou queries complexas — combinada com o fato de os dados costumarem ficar em memória RAM.
    - texto: Eles usam queries SQL otimizadas para busca por conteúdo
      correta: false
      explicacao: Bancos chave-valor não usam SQL nem fazem busca por conteúdo — só localizam um valor a partir da chave exata. É justamente por abrir mão dessa busca por conteúdo que ganham velocidade.
    - texto: Eles distribuem cada chave em um servidor diferente, sempre
      correta: false
      explicacao: A distribuição entre servidores (escalabilidade horizontal) é possível, mas não é o motivo principal da velocidade — mesmo rodando em um único servidor, a busca por chave em memória já é extremamente rápida.
    - texto: Eles armazenam os dados já ordenados por valor
      correta: false
      explicacao: Bancos chave-valor não organizam os dados por valor — a busca é sempre pela chave, não pelo conteúdo armazenado.

- tipo: single
  pergunta: Por que bancos de grafos respondem muito mais rápido do que bancos relacionais a perguntas como "quem são os amigos dos meus amigos?"
  opcoes:
    - texto: Porque os relacionamentos (arestas) já são armazenados como parte da estrutura, sem precisar de múltiplos JOINs entre tabelas
      correta: true
      explicacao: Exato! Num banco relacional, essa pergunta exigiria vários JOINs entre tabelas de usuários e amizades. Num banco de grafos, as arestas conectando os nós já existem fisicamente armazenadas, tornando a travessia direta.
      explicacao_erro: A vantagem dos bancos de grafos é guardar nós e arestas como estrutura nativa — percorrer relacionamentos vira uma travessia direta, em vez de múltiplos JOINs entre tabelas como num banco relacional.
    - texto: Porque bancos de grafos não guardam propriedades, só as conexões
      correta: false
      explicacao: Bancos de grafos guardam propriedades tanto nos nós quanto nas arestas (como a data de início numa amizade) — não é essa a fonte da velocidade.
    - texto: Porque eles convertem automaticamente o grafo em uma tabela relacional otimizada
      correta: false
      explicacao: Não há essa conversão — bancos de grafos mantêm nós e arestas como sua própria estrutura de armazenamento, sem passar por um modelo relacional.
    - texto: Porque grafos só funcionam com poucos registros, então a busca é sempre pequena
      correta: false
      explicacao: Bancos de grafos como o Neo4j são usados por empresas como NASA, eBay e Walmart, justamente em redes grandes e complexas — a rapidez vem da estrutura, não do tamanho reduzido dos dados.

- tipo: single
  pergunta: O que um banco de dados vetorial encontra quando você faz uma busca?
  opcoes:
    - texto: Os itens cujo vetor (embedding) está mais próximo do vetor da busca, ou seja, os mais similares em significado
      correta: true
      explicacao: Exato! O banco calcula a distância entre vetores. Como embeddings de conteúdos parecidos ficam próximos no espaço vetorial, a busca retorna os itens mais similares — não uma correspondência exata de texto.
      explicacao_erro: Bancos vetoriais fazem busca por similaridade, não por correspondência exata. Eles calculam a distância entre o vetor buscado e os vetores armazenados, retornando os mais próximos.
    - texto: Os registros que têm exatamente o mesmo texto da busca
      correta: false
      explicacao: Essa é uma busca por correspondência exata, que bancos tradicionais já fazem bem. O diferencial do banco vetorial é justamente encontrar itens parecidos, mesmo sem o mesmo texto.
    - texto: Os itens mais recentes cadastrados no banco
      correta: false
      explicacao: Recência não é o critério de busca de um banco vetorial — o critério é a proximidade (similaridade) entre vetores no espaço de embeddings.
    - texto: Os itens armazenados na mesma coleção JSON
      correta: false
      explicacao: Isso descreve uma característica de bancos de documentos, não vetoriais. Bancos vetoriais organizam a busca pela distância entre vetores, não por coleções de documentos.

- tipo: single
  pergunta: |
    Um time precisa de um cache que responda em microssegundos para guardar a sessão de login dos usuários — sem consultas complexas, só "salvar por uma chave" e "buscar por essa chave".
    Qual tipo de banco NoSQL é o mais adequado?
  opcoes:
    - texto: Banco chave-valor
      correta: true
      explicacao: Exato! É exatamente o caso de uso ideal de um banco chave-valor como o Redis — velocidade extrema, operações simples de GET/SET, e nenhuma necessidade de queries complexas ou relacionamentos.
      explicacao_erro: O cenário descreve busca simples por chave exata, sem relacionamentos nem queries complexas — o encaixe perfeito de um banco chave-valor, não dos outros modelos NoSQL.
    - texto: Banco de grafos
      correta: false
      explicacao: Bancos de grafos brilham quando o problema envolve relacionamentos entre entidades (como amizades). O cenário descrito não tem relacionamentos — é busca simples por chave, o caso de uso de um banco chave-valor.
    - texto: Banco de documentos
      correta: false
      explicacao: Bancos de documentos são ótimos para dados semi-estruturados com campos variáveis, mas para um cache simples de "chave → valor" sem essa variação de estrutura, um banco chave-valor é mais direto e mais rápido.
    - texto: Banco vetorial
      correta: false
      explicacao: Bancos vetoriais servem para busca por similaridade semântica, não para guardar e buscar uma sessão por uma chave exata. Esse é o cenário clássico de um banco chave-valor.
```
