---
title: 7. Exercícios
description: 
category: Programação
order: 7
---

# 7.1. Sugestão de exercícios do Leet Code

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



## Arrays e Listas

**2.1. Arrays (Vetores)**

Crie uma variável chamada `meus_dados` que contenha uma lista com os seguintes elementos, exatamente nesta ordem:

1. Uma string com seu nome.
2. Um número inteiro com sua idade.
3. Uma lista contendo suas duas cores favoritas.

---

**2.3. Listas são Mutáveis**

Dada a lista `notas = [8.0, 5.5, 9.0, 10.0]`:

1. Como você altera a nota `5.5` para `6.0` usando o índice?
2. O que o código `print(notas[-1])` irá imprimir?

---

**2.4. Percorrendo uma Lista**

Escreva um loop `for` que percorra a lista `precos = [10, 20, 30]` e dê um desconto de 10% em cada item (multiplique por 0.9), atualizando a lista original.


---

**2.5. Fatias de Listas (Slicing)**

Dada a lista `semana = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]`, use o fatiamento (slicing) para imprimir apenas os dias do fim de semana ("sab" e "dom").


---

**2.6. Mapeamento, Filtragem e Redução**

Classifique as operações abaixo como **Mapeamento**, **Filtragem** ou **Redução**:

- **A.** Somar o total de vendas do mês.
- **B.** Criar uma nova lista contendo apenas os alunos aprovados.
- **C.** Converter uma lista de preços em Dólar para Real.

---

**2.7. Como Excluir Elementos**

Você tem a lista `mochila = ["livro", "caneta", "notebook", "lanche"]`.

1. Como remover "lanche" sabendo apenas o nome do item?
2. Como remover o item na posição 1 e salvar o valor dele em uma variável?


---

**2.8. Objetos e Valores**

Observe o código abaixo e responda: `lista_original` será alterada? Por que?

```python
def dobrar_lista(t):
    t = t + t # Cria uma nova lista e atribui a 't' localmente
    print(t)

lista_original = [1, 2]
dobrar_lista(lista_original)
print(lista_original)
```

---

**2.9. Anatomia de um Nó (Node)**

Se tivermos uma Lista Encadeada com 3 nós: `A -> B -> C`.

1. O que está armazenado no `next` do nó C?
2. Se, por acidente, fizermos `A.next = None`, o que acontece com os nós B e C na memória?

---

**2.10. Arrays vs. Linked Lists**

Você está criando um sistema de logs de erro onde novos erros são adicionados constantemente (milhares por segundo), mas raramente precisamos ler logs antigos.

Para guardar esses logs, qual estrutura seria mais eficiente na **escrita**: Array ou Linked List? Por quê?

---

**2.11. Implementação — Loop Infinito**

Um aluno tentou percorrer a lista para imprimir os valores, mas esqueceu uma linha importante e seu programa entrou em **loop infinito** (travou).

```python
current = self.head
while current:
    print(current.data)
    # O que está faltando aqui?
```

Qual linha de código está faltando dentro do `while`?

---

**2.12. O Jeito Pythonico (`collections.deque`)**

Se usarmos uma lista padrão do Python (`lista = []`) e fizermos `lista.insert(0, "Item")`, o Python precisa deslocar todos os outros itens.
Se usarmos `deque` e fizermos `deque.appendleft("Item")`, ele não precisa deslocar ninguém.
Qual dessas operações tem complexidade O(n) e qual tem O(1)?

---

### Listas em Python

Estes exercícios exigem que você combine múltiplos conceitos vistos nas seções 2.1 a 2.11.

**1. O Acumulador**
Crie uma lista com 10 números inteiros aleatórios. Escreva um código que percorra essa lista e calcule a "Soma Acumulada". Ou seja, o novo elemento no índice `i` deve ser a soma de todos os elementos originais do índice `0` até `i`.
*Exemplo:* Entrada `[1, 2, 3]` -> Saída `[1, 3, 6]`.

**2. O Verificador de Palíndromos**
Um palíndromo é uma palavra que se lê da mesma forma de trás para frente (ex: "arara"). Dada uma lista de palavras: `palavras = ["arara", "casa", "ovo", "radar", "python"]`, crie um código que filtre e imprima apenas as palavras que são palíndromos. Dica: use fatiamento reverso `[::-1]`.

**3. Remover Duplicatas**
Dada a lista `numeros = [1, 2, 2, 3, 4, 4, 4, 5]`, escreva um algoritmo que remova os elementos duplicados, mantendo apenas a primeira ocorrência de cada número, sem usar a função `set()`. O resultado deve ser `[1, 2, 3, 4, 5]`.

**4. Intercalação de Listas**
Dadas duas listas ordenadas `A = [1, 3, 5]` e `B = [2, 4, 6]`, crie uma nova lista `C` que contenha os elementos de ambas intercalados, ou seja: `[1, 2, 3, 4, 5, 6]`.

**5. Média de Notas Aninhadas**
Você tem uma lista de listas onde cada sublista representa as notas de um aluno:
`notas_turma = [[5.0, 9.0], [2.0, 3.0], [10.0, 9.5]]`.
Calcule a média de cada aluno e armazene em uma nova lista `medias`. Se a média for maior ou igual a 7, imprima "Aprovado", caso contrário "Reprovado".

**6. Rotação de Lista**
Crie uma função que receba uma lista e um número inteiro `k`. A função deve "rotacionar" a lista para a direita `k` vezes.
*Exemplo:* Lista `[1, 2, 3, 4, 5]` e `k=2` -> Resultado `[4, 5, 1, 2, 3]`.

**7. A Maior Palavra**
Dada uma frase (string) inserida pelo usuário, use `split()` para separar as palavras e encontre a palavra com o maior número de caracteres. Imprima a palavra e o seu tamanho.

**8. O Problema da Referência (Depuração)**
Você quer criar uma matriz 3x3 preenchida com zeros. Um aluno fez o seguinte:

```python
linha = [0, 0, 0]
matriz = [linha, linha, linha] # CUIDADO AQUI!
matriz[0][0] = 1
print(matriz)
```

Ao rodar, ele percebeu que a primeira coluna inteira virou 1 `([[1, 0, 0], [1, 0, 0], [1, 0, 0]])`.

Explique por que isso aconteceu (Conceito de Aliasing).

Escreva o código correto para criar a matriz onde alterar um elemento não afete as outras linhas.

**9. Filtragem com List Comprehension (Lógica)**
Embora não tenhamos aprofundado em List Comprehension, tente resolver este problema com um loop normal primeiro: Dada uma lista de números `[1, 2, 3, 4, 5, 6]`, crie uma nova lista contendo o **quadrado** dos números, mas **apenas se o número for par**. Resultado esperado: `[4, 16, 36]`.

**10. Matriz Transposta**
Considere que uma lista de listas representa uma matriz:

```python
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Escreva um código que gere a matriz transposta (transforme linhas em colunas). O resultado deve ser `[[1, 4, 7], [2, 5, 8], [3, 6, 9]]`.

---

### Listas Encadeadas

Estes são exercícios clássicos de entrevistas técnicas em grandes empresas (Google, Amazon, Facebook). Resolva-os desenhando os nós no papel antes de codificar.

**1. O Histórico do Navegador**
Implemente uma classe `Navegador` usando uma **Doubly Linked List**.

- Deve ter os métodos `visitar(url)` (adiciona página e limpa o histórico futuro), `voltar(passos)` e `avancar(passos)`.
- Se o usuário tentar voltar 10 passos mas só houver 2 páginas, volte apenas até a primeira.

**2. O Espião (Middle of Linked List)**
Dada uma lista encadeada simples, encontre o nó que está exatamente no **meio** da lista.

- *Desafio:* Faça isso percorrendo a lista **apenas uma vez** (Dica: Use a estratégia da Tartaruga e da Lebre).

**3. Remover Duplicatas (Versão Hard)**
Dada uma lista ordenada `1 -> 1 -> 2 -> 3 -> 3 -> 4`, remova os nós duplicados de forma que cada elemento apareça apenas uma vez.

- *Resultado:* `1 -> 2 -> 3 -> 4`.
- *Restrição:* Modifique a lista "in-place" (sem criar uma nova lista).

**4. O K-ésimo do Fim**
Encontre o k-ésimo nó contando **do final** para o começo.

- Exemplo: Lista `A -> B -> C -> D` e `k=2`. O nó alvo é o `C` (pois D é o 1º de trás, C é o 2º).
- *Dica:* Use dois ponteiros com uma distância de `k` entre eles.

**5. Fusão Nuclear (Merge Two Sorted Lists)**
Dadas duas listas encadeadas que já estão ordenadas (ex: `L1: 1->2->4` e `L2: 1->3->4`), crie uma função que funda as duas em uma única lista também ordenada: `1->1->2->3->4->4`.

**6. É Palíndromo?**
Verifique se uma Linked List lê a mesma coisa de frente para trás.

- Exemplo: `1 -> 2 -> 2 -> 1` (True).
- *Desafio:* Tente fazer isso com complexidade de espaço O(1) e tempo O(n).

**7. Deletar sem Head**
Você recebe acesso **apenas** a um nó `node` no meio de uma lista (você não tem acesso à `head` da lista).

- Escreva uma função para deletar esse nó específico.
- *Dica:* Você não pode remover o nó da memória, mas pode copiar os dados do próximo nó para este e deletar o próximo.

**8. Ponto de Intersecção (Y-Shape)**
Duas listas encadeadas podem se unir em um determinado ponto, formando um "Y".

- `Lista A: a1 -> a2 -> c1 -> c2`
- `Lista B: b1 -> c1 -> c2`
- Encontre o nó exato onde a intersecção começa (`c1`). Note que a intersecção é baseada em referência de memória, não apenas valor.

**9. Swap em Pares**
Troque os nós adjacentes dois a dois.

- Entrada: `1 -> 2 -> 3 -> 4`
- Saída: `2 -> 1 -> 4 -> 3`
- Você deve trocar os nós de verdade, não apenas os valores dos dados.

**10. A Roleta (Josephus Problem na Lista Circular)**
Implemente uma **Lista Circular** (o último aponta para o primeiro).

- Simule o problema de Josephus: N pessoas em círculo. Começando da primeira, conte `k` pessoas e remova a k-ésima. Repita o processo com o círculo remanescente até sobrar apenas uma pessoa. Retorne o valor do sobrevivente.

---

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