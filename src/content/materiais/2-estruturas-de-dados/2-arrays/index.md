---
title: 2. Arrays ou Listas
description: Listas, busca binária, slicing, métodos e listas encadeadas.
category: Programação
order: 2
---

## 2.1. Arrays (Vetores)

Imagine uma turma com **4 alunos**, cada um possuindo uma nota. Uma forma simples de armazenar isso seria:

```python
nota1 = 8
nota2 = 7
nota3 = 8.5
nota4 = 10
```

Isso parece funcionar bem para poucos alunos. Mas agora pense: E se fossem 50 alunos? E se fossem 1000 alunos? Teríamos que criar 50 ou 1000 variáveis diferentes: `nota1, nota2, nota3, ..., nota1000`. Além disso, se quiséssemos calcular a soma das notas, teríamos algo como: `nota1 + nota2 + nota3 + ... + nota1000`. Porém, isso é **ineficiente**, **difícil de manter** e **propenso a erros**.

Então surge a pergunta:

> Existe uma forma **mais lógica, eficiente e organizada** de armazenar esse conjunto de dados?

Sim, com arrays. Um **array** é uma **variável estruturada** que armazena vários valores do **mesmo tipo** de forma **contínua na memória** sob **um único nome** com acesso por **índice**. Isso significa que em vez de variáveis separadas, usamos apenas uma estrutura:

![Array indexado](/api/materiais-assets/2-estruturas-de-dados/2-arrays/assets/array.png)

Cada posição do array possui um **índice**, que indica a posição de um elemento. Note que na imagem, os índices do array começam em 0, porque é assim na maioria das linguagens de Programação, como Python, C e Java. Além disso, Para acessar os valores, usamos a notação com colchetes `[]`:

```python
notas[0]  # retorna 8
notas[1]  # retorna 7
notas[2]  # retorna 8.5
notas[3]  # retorna 10
```

Ou seja: `notas[i]` acessa o elemento que está na posição `i`.

Além de tornar os dados mais organizados na memória e fornecer um código mais legível, o uso de arrays permite maior facilidade para diversas operações, como somar, listar e buscar valores, além de possibilitar o uso de laços de repetição, como será apresentado a seguir.

### Arrays em Python

Em Python são chamados de lista e armazenam valores de qualquer tipo. Os valores em uma lista são chamados de elementos, ou, algumas vezes, de itens.

Há algumas formas para criar listas, mas a mais fácil é colocar os elementos entre colchetes (`[` e `]`):

```python
[5, 10, 15, 20, 25]
["ser trilhete é bom demais", "de estudantes para estudantes", "trilha"]

```

O primeiro elemento é uma lista de cinco números inteiros. O segundo é uma lista de três strings. Assim como citado acima, os elementos de uma lista não precisam ser do mesmo tipo. Olhe o próximo exemplo:

```python
[5.0, 3, "olá", [5, 3]]

```

Uma lista dentro de outra lista é chamada de lista aninhada.

Uma lista sem elementos é chamada de lista vazia. É possível criar listas vazias com colchetes vazios `[]`.

Obviamente, podemos atribuir uma lista de valores, vazio ou não, a variáveis:

```python
>>> cursos = ["cdia", "cc", "ec"]
>>> melhor_turma = [25.1]
>>> vazio = []
>>> print(cursos, melhor_turma, vazio)
["cdia", "cc", "ec"] [25.1] []

```

#### **Exercício de Fixação**

Crie uma variável chamada `meus_dados` que contenha uma lista com os seguintes elementos, exatamente nesta ordem:

1. Uma string com seu nome.
2. Um número inteiro com sua idade.
3. Uma lista contendo suas duas cores favoritas.

## 2.2. Busca Binária: O Poder de Dividir pela Metade

Agora que você já entende o que são listas em Python e como trabalhar com elas, vamos explorar um algoritmo clássico e extremamente eficiente para buscar elementos em uma lista ordenada: a **Busca Binária**.

Imagine que você está procurando um nome na lista telefônica (aqueles livros antigos com milhares de nomes em ordem alfabética).

**Busca Linear (O(n)):** Você começa na página 1 e vai folheando página por página até encontrar o nome. Com 1000 páginas, pode levar 1000 tentativas.

**Busca Binária (O(log n)):** Você faz algo muito mais inteligente:

1. Abre bem no meio do livro
2. Verifica: o nome que procuro vem antes ou depois?
3. Descarta metade do livro que não interessa
4. Repete o processo com a metade que sobrou

Veja o código:

```python
def busca_binaria(lista, alvo):
    esquerda = 0
    direita = len(lista) - 1

    while esquerda <= direita:
        meio = (esquerda + direita) // 2  # Sempre pega o meio
        
        if lista[meio] == alvo:
            return meio  # Encontrou!
        
        elif lista[meio] < alvo:
            esquerda = meio + 1  # Descarta metade esquerda
        
        else:
            direita = meio - 1  # Descarta metade direita
    
    return -1  # Não encontrou

# Exemplo de uso
numeros = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]
resultado = busca_binaria(numeros, 23)
print(f"Encontrado na posição: {resultado}")
```

### Por Que Dividir pela Metade é Tão Poderoso?

Vamos ver o que acontece quando buscamos em listas de tamanhos diferentes:

**Com 8 elementos:**

- Tentativa 1: 8 elementos → verifica meio, sobram 4
- Tentativa 2: 4 elementos → verifica meio, sobram 2
- Tentativa 3: 2 elementos → verifica meio, sobra 1
- Tentativa 4: 1 elemento → encontrou!
- **Máximo de 4 tentativas** (log₂ 8 = 3, mais uma verificação)

**Com 1.000 elementos:**

- 1000 → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1
- **Máximo de ~10 tentativas!**

**Com 1.000.000 elementos:**

- **Máximo de ~20 tentativas!**

Percebe o padrão? Cada vez que você **dobra** a quantidade de dados, você só precisa de **mais uma** tentativa! Isso é logarítmico.

### Visualizando a Diferença

```
Busca Linear vs Busca Binária

Para encontrar em 1024 elementos:
Linear:     pode levar até 1024 tentativas
Binária:    leva no máximo 10 tentativas

Para encontrar em 1.048.576 elementos:
Linear:     pode levar até 1.048.576 tentativas
Binária:    leva no máximo 20 tentativas
```

### O Truque: A Lista Precisa Estar Ordenada

Importante: A busca binária só funciona se a lista estiver ordenada! É como a lista telefônica - se os nomes estivessem embaralhados, você não saberia qual metade descartar.

```python
# Funciona - lista ordenada
numeros_ordenados = [1, 3, 5, 7, 9, 11, 13]
busca_binaria(numeros_ordenados, 7)  # Encontra!

# Não funciona corretamente - lista desordenada
numeros_bagunçados = [5, 1, 9, 3, 7, 13, 11]
busca_binaria(numeros_bagunçados, 7)  # Resultado imprevisível
```

### Por Que Isso Importa?

Com 10 elementos, qualquer algoritmo funciona bem. Mas com 1 milhão:

- O(1): 1 operação
- O(log n): ~20 operações ← Busca binária está aqui!
- O(n): 1.000.000 operações
- O(n²): 1.000.000.000.000 operações (um trilhão!)

### Dica Final sobre Busca Binária

Quando estiver programando, pergunte-se: "Se meus dados dobrarem, quanto mais tempo isso vai levar?"

- Se a resposta for "o dobro", você tem O(n)
- Se for "quatro vezes mais", é O(n²)
- Se for "só mais uma operação", é O(log n) - como a busca binária!
- Se for "nenhum tempo a mais", pode ser O(1)

A busca binária é um dos algoritmos mais elegantes da computação: ela transforma um problema que poderia levar milhões de operações em apenas algumas dezenas, simplesmente sendo inteligente sobre como dividir o problema.

---

## 2.3. Listas são Mutáveis

A sintaxe para acessar os elementos de uma lista é a mesma que para acessar os caracteres de uma string: o **operador de colchete** (`[]`). A expressão dentro dos colchetes especifica o **índice**.

> **Lembre-se:** Os índices começam em 0.

### Modificando Elementos

Diferente das strings, **listas são mutáveis**. Quando o operador de colchete aparece do lado esquerdo de uma atribuição, ele identifica o elemento da lista que será modificado:

```python
>>> numeros = [42, 123]
>>> numeros[1] = 5
>>> numeros
[42, 5]
```

O elemento no índice `1` de `numeros`, que costumava ser `123`, agora é `5`.

> **Atenção:** Se tentar ler ou escrever um elemento que não existe, você recebe um `IndexError`. Se um índice tiver valor negativo, ele conta de trás para a frente a partir do final da lista.

### Verificando Pertinência

O operador `in` também funciona com listas:

```python
>>> cursos = ["cdia", "cc", "ec"]
>>> "cdia" in cursos
True
```

#### **Exercício de Fixação**

Dada a lista `notas = [8.0, 5.5, 9.0, 10.0]`:

1. Como você altera a nota `5.5` para `6.0` usando o índice?
2. O que o código `print(notas[-1])` irá imprimir?

---

## 2.4. Percorrendo uma Lista

### Iteração Simples

A forma mais comum de percorrer os elementos em uma lista é com um **loop `for`**:

```python
for curso in cursos:
    print(curso)
```

Isso funciona bem se você precisa apenas **ler** os elementos.

### Iteração com Índices

Mas se você quer **escrever ou atualizar** os elementos, você precisa dos índices. Uma forma comum de fazer isso é combinar as funções integradas `range()` e `len()`:

```python
for i in range(len(numeros)):
    numeros[i] = numeros[i] * 2
```

Este loop percorre a lista e atualiza cada elemento:

- `len()` retorna o número de elementos na lista
- `range()` retorna uma sequência de índices de 0 a n-1

#### **Exercício de Fixação**

Escreva um loop `for` que percorra a lista `precos = [10, 20, 30]` e dê um desconto de 10% em cada item (multiplique por 0.9), atualizando a lista original.

---

## 2.5. Operações com Listas

### Concatenação

O operador `+` **concatena** (junta) listas:

```python
>>> a = [1, 2, 3]
>>> b = [4, 5, 6]
>>> c = a + b
>>> c
[1, 2, 3, 4, 5, 6]
```

### Repetição

O operador `*` **repete** a lista um dado número de vezes:

```python
>>> [0] * 4
[0, 0, 0, 0]

```

#### **Exercício de Fixação**

Sem rodar o código, qual será o resultado de:

```python
lista = [1, 2]
nova_lista = lista * 3 + [3]
print(nova_lista)

```

---

## 2.6. Fatias de Listas (Slicing)

### Extraindo Sublistas

O **operador de fatiamento** também funciona com listas, usando a sintaxe `lista[inicio:fim]`:

```python
>>> t = ["a", "b", "c", "d", "e", "f"]
>>> t[1:3]  # Do índice 1 até o 3 (não inclui o 3)
["b", "c"]
>>> t[:4]   # Do início até o índice 4 (não inclui o 4)
["a", "b", "c", "d"]
```

> **Dica:** Se você omitir ambos os índices (`lista[:]`), a fatia é uma cópia da lista inteira. Como as listas são mutáveis, pode ser útil fazer uma cópia antes de executar operações que as alterem.

### Modificando através de Fatias

Um operador de fatia à esquerda de uma atribuição pode **atualizar vários elementos**:

```python
>>> t[1:3] = ["x", "y"]
>>> t
["a", "x", "y", "d", "e", "f"]
```

#### **Exercício de Fixação**

Dada a lista `semana = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]`, use o fatiamento (slicing) para imprimir apenas os dias do fim de semana ("sab" e "dom").

---

## 2.7. Métodos de Listas

### Adicionando Elementos

O Python oferece métodos que operam em listas:

**`append()`** - Adiciona um novo elemento ao **fim** de uma lista:

```python
>>> t = ["a", "b", "c"]
>>> t.append("d")
>>> t
["a", "b", "c", "d"]
```

**`extend()`** - Toma uma lista como argumento e adiciona **todos** os elementos.

**`sort()`** - Classifica os elementos da lista em ordem ascendente.

> **Atenção Importante:** A maior parte dos métodos de listas são **nulos** (void); eles **alteram** a lista e **retornam `None`**. Se você escrever `t = t.sort()` por acidente, ficará desapontado com o resultado (perderá sua lista).

#### **Exercício de Fixação**

Um aluno escreveu o seguinte código e a lista dele sumiu. Explique o erro:

```python
numeros = [3, 1, 2]
numeros = numeros.sort()
print(numeros)  # Resultado: None
```

---

## 2.8. Mapeamento, Filtragem e Redução

As operações de lista mais comuns podem ser expressas como combinações de **mapeamento**, **filtragem** e **redução**.

### Conceitos

1. **Redução:** Uma operação que **combina** uma sequência de elementos em um **único valor** (como somar todos os números). O Python tem a função `sum()` para isso.

2. **Mapeamento:** **Percorrer** uma lista e **aplicar uma função** em cada elemento (como transformar todas as strings em maiúsculas).

3. **Filtragem:** **Selecionar** alguns elementos e desconsiderar outros (como pegar apenas as strings que já são maiúsculas).

#### **Exercício de Fixação**

Classifique as operações abaixo como **Mapeamento**, **Filtragem** ou **Redução**:

- **A.** Somar o total de vendas do mês.
- **B.** Criar uma nova lista contendo apenas os alunos aprovados.
- **C.** Converter uma lista de preços em Dólar para Real.

---

## 2.9. Como Excluir Elementos

Há **várias formas** de excluir elementos de uma lista.

### Método `pop()`

Se souber o **índice** do elemento que procura, você pode usar `pop()`:

```python
>>> t = ["a", "b", "c"]
>>> x = t.pop(1)  # Remove o elemento no índice 1
>>> t
["a", "c"]
>>> x
"b"
```

- `pop()` **altera** a lista e **retorna** o elemento que foi excluído
- Se você não incluir um índice, ele exclui e retorna o **último elemento**

### Instrução `del`

Se não precisar do valor removido, você pode usar a instrução `del`.

### Método `remove()`

Se souber o **elemento** que quer excluir (mas não o índice), você pode usar `remove()`.

#### **Exercício de Fixação**

Você tem a lista `mochila = ["livro", "caneta", "notebook", "lanche"]`.

1. Como remover "lanche" sabendo apenas o nome do item?
2. Como remover o item na posição 1 e salvar o valor dele em uma variável?

---

## 2.10. Listas e Strings

### Conversão entre Tipos

Uma **string** é uma sequência de caracteres e uma **lista** é uma sequência de valores, mas uma lista de caracteres não é a mesma coisa que uma string.

Para converter uma string em uma lista de caracteres, você pode usar `list()`.

### Método `split()`

Se você quiser **quebrar uma string em palavras**, você pode usar o método `split()`:

```python
>>> s = "eu so durmo com meu ventilador ligado"
>>> t = s.split()
>>> t
["eu", "so", "durmo", "com", "meu", "ventilador", "ligado"]
```

### Método `join()`

`join()` é o **contrário** de `split()`. Ele toma uma lista de strings e **concatena** os elementos.

> **Importante:** `join()` é um método de **string**, então é preciso invocá-lo no delimitador e passar a lista como parâmetro:

```python
>>> t = ["eu", "so", "durmo", "com", "meu", "ventilador", "ligado"]
>>> delimiter = " "
>>> s = delimiter.join(t)
>>> s
"eu so durmo com meu ventilador ligado"
```

#### **Exercício de Fixação**

Converta a data `"25/12/2024"` em uma lista `['25', '12', '2024']` usando o método `split()`. Qual delimitador você deve usar?

---

## 2.11. Objetos e valores

Se executarmos a = 'banana' e b = 'banana', sabemos que a e b se referem a uma string, mas não sabemos se elas se referem à mesma string.

Porém, quando você cria duas listas, você tem dois objetos:

```python
>>> a = [1, 2, 3]
>>> b = [1, 2, 3]
>>> a is b
False

```

Nesse caso, diríamos que as duas listas são **equivalentes** (têm os mesmos elementos), mas não **idênticas** (não são o mesmo objeto).

### Aliasing

Se `a` se refere a um objeto e você atribui `b = a`, então ambas as variáveis se referem ao mesmo objeto.

```python
>>> a = [1, 2, 3]
>>> b = a
>>> b is a
True

```

A associação de uma variável com um objeto é chamada de referência. Neste exemplo, há duas referências ao mesmo objeto. Dizemos que o objeto tem um **alias**.

Se o objeto com alias é mutável, alterações feitas em um alias afetam o outro também:

```python
>>> b[0] = 42
>>> a
[42, 2, 3]

```

Apesar desse comportamento poder ser útil, ele é passível de erros.

### Argumentos de listas

Ao passar uma lista a uma função, a função recebe uma referência à lista. Se a função alterar a lista, quem faz a chamada vê a mudança.

Por exemplo, `delete_head` remove o primeiro elemento de uma lista:

```python
def delete_head(t):
    del t[0]

```

Se usarmos essa função, a variável original é afetada.

É importante distinguir entre operações que alteram listas e operações que criam novas listas. Por exemplo, o método `append` altera a lista, mas o operador `+` cria uma nova lista.

#### **Exercício de Fixação**

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

## Lista de Exercícios

Chegou a hora de testar seus conhecimentos. Estes exercícios exigem que você combine múltiplos conceitos vistos acima.

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

Ao rodar, ele percebeu que a primeira coluna inteira virou 1 ```([[1, 0, 0], [1, 0, 0], [1, 0, 0]]).```

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

## 2.12. Lista Encadeada (Linked List)

### O Problema da Memória

Imagine que você vai ao cinema com 5 amigos. Vocês são um grupo unido e querem sentar juntos.

**Cenário 1 - Cinema Vazio:**  
Se o cinema estiver vazio, fácil! Vocês encontram 6 cadeiras vazias lado a lado e se sentam.

Isso, na computação, é um **Array** (ou a lista padrão do Python). O computador reserva um bloco **contínuo** de memória para vocês.

**Cenário 2 - Cinema Lotado:**  
Mas e se o cinema estiver quase lotado?

Não existem 6 cadeiras juntas. Existe uma vaga na fila A, outra na fila C, outra lá no canto da fila Z...

Como vocês vão assistir ao filme juntos sendo um grupo?

### A Solução da Lista Encadeada

Você senta na fila A. Mas, no seu bolso, você tem um papelzinho que diz: *"O próximo amigo está na cadeira 12 da Fila C"*.

O amigo da fila C tem um papel que diz: *"O próximo está na Fila Z"*.

Vocês estão espalhados, mas **conectados**. Se seguirmos as pistas, encontramos o grupo todo.

> **Moral da História:** Arrays exigem memória vizinha (contígua). Linked Lists aceitam memória espalhada (fragmentada).

![Lista convencional vs linked list](/api/materiais-assets/2-estruturas-de-dados/2-arrays/assets/linked_list.png)

*Em azul está uma lista convencional e em verde uma linked list.*

---

### Anatomia de um Nó (Node)

Na nossa analogia, cada pessoa no cinema é um **Nó** (Node). Para que a mágica aconteça, cada nó precisa carregar **duas coisas** na mochila:

1. **O Valor (Data):** A informação útil (o número, o texto, o usuário).
2. **O Próximo (Next):** O endereço de memória onde vive o próximo nó.

> **Atenção:** Se você perder o endereço do próximo, a corrente se quebra e o resto da lista desaparece da memória para sempre.

#### **Exercício de Fixação**

Se tivermos uma Lista Encadeada com 3 nós: `A -> B -> C`.

1. O que está armazenado no `next` do nó C?
2. Se, por acidente, fizermos `A.next = None`, o que acontece com os nós B e C na memória?

---

### Arrays vs. Linked Lists

**Por que usaríamos Linked Lists se Arrays são tão fáceis de criar em Python (`lista = []`)?**

Tudo se resume a uma troca: **Velocidade de Leitura** vs. **Velocidade de Escrita**.

#### O Cenário da Leitura

Você quer saber quem é o 5º amigo da lista.

| Estrutura | Como Funciona | Complexidade |
|-----------|---------------|-------------|
| **Array** | O computador sabe onde começa e sabe o tamanho de cada cadeira. Ele faz uma conta matemática simples e *BUM!* cai direto no colo do 5º amigo. | **O(1) - Instantâneo** |
| **Linked List** | Você tem que ir no primeiro, ler o papel, ir no segundo, ler o papel... até chegar no quinto. | **O(n) - Lento** |

#### O Cenário da Inserção

Você quer adicionar um novo amigo bem no meio da fila.

| Estrutura | Como Funciona | Complexidade |
|-----------|---------------|-------------|
| **Array** | Você tem que pedir para **todo mundo** que está à direita se levantar e dar um passo para o lado para abrir espaço. Se tiver 1 milhão de itens, o computador tem que mover 1 milhão de coisas. | **O(n) - Lento e cansativo** |
| **Linked List** | Aqui a mágica acontece. Você simplesmente muda o papelzinho do amigo anterior para apontar para o novo, e o novo aponta para o seguinte. Ninguém mais precisa se mexer. | **O(1) - Instantâneo** |

#### **Exercício de Fixação**

Você está criando um sistema de logs de erro onde novos erros são adicionados constantemente (milhares por segundo), mas raramente precisamos ler logs antigos.

Para guardar esses logs, qual estrutura seria mais eficiente na **escrita**: Array ou Linked List? Por quê?

---

### Implementação em Python (Hands On)

Em Python, não temos Linked Lists nativas "puras". Vamos criar uma para entender a engenharia por trás. Vamos dividir em **três atos**.

#### Criando o Nó

Primeiro, criamos a classe que representa o item individual.

```python
class Node:
    def __init__(self, data):
        self.data = data      # O conteúdo (ex: "Batatas")
        self.next = None      # O endereço do próximo (começa apontando para o vazio)
```

#### Criando a Lista

Alguém precisa segurar a ponta da corda. Chamamos isso de `head` (cabeça).

> **Importante:** Se você perder a `head`, perdeu a lista toda.

```python
class LinkedList:
    def __init__(self):
        self.head = None  # A lista nasce vazia
```

### O Método Append

Aqui temos que pensar como o computador.

1. Criamos o novo nó.
2. Se a lista estiver vazia, ele vira a Cabeça.
3. Se a lista já tem gente, temos que caminhar até o último nó e conectar o novo lá.

```python
    # Dentro da classe LinkedList...
    def append(self, data):
        new_node = Node(data)

        # Caso 1: Lista vazia? O novo nó assume a liderança.
        if self.head is None:
            self.head = new_node
            return

        # Caso 2: Lista cheia? Vamos caminhar até o fim.
        current = self.head  # Criamos um "ponteiro temporário" para não perder a head
        while current.next:  # Enquanto houver um próximo...
            current = current.next # ...continue andando.
        
        # Chegamos no último! Agora ele aponta para o novo nó.
        current.next = new_node

```

### Visualizar

```python
    def display(self):
        current = self.head
        while current:
            print(f"[{current.data}] -> ", end="")
            current = current.next
        print("None")

```

**Teste rápido:**

```python
lista = LinkedList()
lista.append("A")
lista.append("B")
lista.display()
# Saída: [A] -> [B] -> None

```

#### **Exercício de Fixação**

Um aluno tentou percorrer a lista para imprimir os valores, mas esqueceu uma linha importante e seu programa entrou em **loop infinito** (travou).

```python
current = self.head
while current:
    print(current.data)
    # O que está faltando aqui?

```

Qual linha de código está faltando dentro do `while`?

---

## 2.13. Doubly Linked Lists

Na lista simples, se você esquecer algo no nó anterior, **já era**. Não dá para voltar. É como descer um rio de canoa: só vai a favor da correnteza.

Para resolver isso, criamos a Lista Duplamente Encadeada.

Cada nó agora tem dois braços: um para segurar o da frente (next) e um para segurar o de trás (prev).

- **Vantagem:** Permite ir e vir (botão Voltar/Avançar do navegador).
- **Custo:** Ocupa mais memória (precisa guardar 2 endereços por item).

![Lista duplamente encadeada](/api/materiais-assets/2-estruturas-de-dados/2-arrays/assets/doubly_linked.png)

## 2.14. O Jeito Pythonico (`collections.deque`)

Na vida real, não reinvente a roda. O Python tem uma estrutura otimizada chamada `deque` (pronuncia-se "deck"). Ela é uma Doubly Linked List pronta para uso.

```python
from collections import deque

# Criando a lista
playlist = deque(['Música 1', 'Música 2', 'Música 3'])

# Inserção Flash no início (O(1))
# Em uma lista normal, isso seria lento!
playlist.appendleft('Música Nova')

# Removendo do final
playlist.pop()

print(playlist)
# deque(['Música Nova', 'Música 1', 'Música 2'])

```

#### **Exercício de Fixação**

Se usarmos uma lista padrão do Python (`lista = []`) e fizermos `lista.insert(0, "Item")`, o Python precisa deslocar todos os outros itens.
Se usarmos `deque` e fizermos `deque.appendleft("Item")`, ele não precisa deslocar ninguém.
Qual dessas operações tem complexidade O(n) e qual tem O(1)?

---

## 2.15. Exercícios Resolvidos: Entendendo os Padrões

Aqui estão 3 problemas clássicos resolvidos para você entender como manipular os ponteiros.

### O Contador (Iteração)

Como saber o tamanho da lista sem usar len()?

A lógica é simples: crie um contador, comece no head e ande até cair no None.

```python
def contar(head):
    count = 0
    atual = head
    while atual: # Enquanto "atual" for um nó de verdade
        count += 1
        atual = atual.next # Pula para o próximo
    return count

```

### A Tartaruga e a Lebre (Detectar Ciclos)

Como saber se a lista tem um loop infinito sem travar o computador?

Usamos dois ponteiros. Um lento (passo 1) e um rápido (passo 2). Se houver um ciclo, o rápido vai dar uma volta e bater nas costas do lento.

```python
def tem_ciclo(head):
    lento = head
    rapido = head
    while rapido and rapido.next:
        lento = lento.next      # 1 passo
        rapido = rapido.next.next # 2 passos
        if lento == rapido:
            return True # Encontrou!
    return False

```

### Inversão (Manipulação de Ponteiros)

Como inverter a direção das setas? A -> B vira A <- B.

O segredo é ter 3 mãos: uma segurando o Anterior, uma no Atual e uma guardando o Próximo (para não perdê-lo).

```python
def inverter(head):
    anterior = None
    atual = head
    while atual:
        proximo_temp = atual.next # 1. Salva o futuro
        atual.next = anterior     # 2. Inverte a seta para trás
        anterior = atual          # 3. Avança o "passado"
        atual = proximo_temp      # 4. Avança o "presente"
    return anterior  # A nova cabeça

```

#### **Exercício de Fixação**

Na função `inverter` acima, o que aconteceria se esquecêssemos de fazer a linha `proximo_temp = atual.next` antes de mudar o `atual.next`?
( ) Nada demais.
( ) Perderíamos o acesso ao resto da lista original para sempre.
( ) A lista ficaria duplicada.

---

## Lista de Exercícios

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