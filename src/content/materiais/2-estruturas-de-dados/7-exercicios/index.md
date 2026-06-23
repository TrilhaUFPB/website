---
title: 7. Exercícios
description: 
category: Programação
order: 7
---

# 7.1. Sugestão de exercícios do Leet Code

## Conjuntos

**1. O Analista de Texto (Vocabulary Size)**
Dada uma string longa (um parágrafo de texto), escreva um código que normalize o texto (tudo minúsculo) e retorne o número de palavras **únicas** presentes nele. Use `split()` e `set()`.

**2. Verificação de Pangrama**
Um pangrama é uma frase que contém todas as letras do alfabeto (ex: "The quick brown fox jumps over the lazy dog"). Dada uma string, verifique se ela é um pangrama utilizando conjuntos.
*Dica:* Compare o set da string com o set do alfabeto.

**3. Recomendação de Amigos (Intersecção)**
Você tem dois dicionários representando as listas de amigos de dois usuários:
`user1_amigos = {"Alice", "Bob", "Charlie"}`
`user2_amigos = {"Bob", "David", "Edward"}`
Escreva uma função que retorne os "Amigos em Comum" para sugerir conexões.

**4. A Lista Negra (Performance)**
Você tem uma lista de 10.000 IPs bloqueados (`blacklist`). O servidor recebe uma requisição de um IP novo.
Explique, usando notação Big O, a diferença de performance entre armazenar a `blacklist` como uma lista Python ou como um set Python ao fazer a checagem `if ip in blacklist`.

**5. Elementos Exclusivos (Diferença Simétrica)**
Dadas duas listas de produtos: `estoque_loja_A` e `estoque_loja_B`. Gere um conjunto contendo apenas os produtos que são vendidos em **uma** das lojas, mas **não em ambas** (exclusivos de cada filial).

**6. O CPF Único**
Um banco de dados corrompido gerou uma lista onde todos os CPFs aparecem duas vezes, exceto um, que aparece apenas uma vez.
Encontre o CPF "solitário".
*Dica Hard:* Tente resolver isso matematicamente usando conjuntos: . Por que essa fórmula funciona?

**7. Validação de Senha Forte**
Uma senha forte deve conter caracteres de pelo menos 3 grupos diferentes: minúsculas, maiúsculas, números e símbolos.
Crie uma função que receba uma senha e use conjuntos para verificar se ela atende aos requisitos. (Crie sets de referência para cada grupo).

**8. Jaccard Index (OPCIONAL)**
O Índice de Jaccard é uma métrica usada para medir a similaridade entre dois conjuntos. A fórmula é:

Implemente uma função que receba duas frases, transforme-as em conjuntos de palavras e retorne o nível de similaridade (entre 0 e 1).

**9. Sets dentro de Sets (Frozenset)**
Como vimos, sets não podem conter elementos mutáveis (como outros sets). Mas e se precisarmos de um conjunto de conjuntos?
Pesquise sobre o `frozenset` e crie um conjunto que contenha os seguintes elementos: `{ {1, 2}, {3, 4} }` (Use a sintaxe correta).

**10. O Problema da Festa (Lógica)**
Em uma festa com 100 convidados:

- 50 beberam cerveja.
- 30 beberam refrigerante.
- 10 beberam ambos.
Usando operações de conjuntos e a função `len()`, responda via código:

> A) Quantos beberam **apenas** cerveja?
> B) Quantos beberam **apenas** refrigerante?
> C) Quantos não beberam nada (considerando o total de 100)?

---

### LeetCode 217 — Contains Duplicate  

Verifique se um array contém elementos duplicados.

🔗 [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/description/?envType=problem-listv2&envId=hash-table)

### LeetCode 643 — Maximum Average Subarray I  

Dado um array e um inteiro `k`, encontre a média máxima de qualquer subarray contínuo de tamanho `k`.

🔗 [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/description/?envType=study-planv2&envId=leetcode-75)

### LeetCode 169 — Majority Element  

Encontre o elemento que aparece mais da metade das vezes em um array.

🔗 [Majority Element](https://leetcode.com/problems/majority-element/description/?envType=problem-listv2&envId=hash-table)

### LeetCode 268 — Missing Number  

Dado um array contendo números distintos no intervalo `[0, n]`, encontre o número que está faltando.

🔗 [Missing Number](https://leetcode.com/problems/missing-number/description/?envType=problem-listv2&envId=hash-table)

### LeetCode 48 — Rotate Image  

Dada uma matriz quadrada, rotacione-a em 90 graus no sentido horário *in-place*.

🔗 [Rotate Image](https://leetcode.com/problems/rotate-image/description/)

