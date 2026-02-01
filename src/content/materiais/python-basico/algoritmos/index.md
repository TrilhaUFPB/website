---
title: Algoritmos e Estruturas de Dados
description: Introdução aos principais algoritmos e estruturas de dados
category: Programação
order: 4
---

# Algoritmos e Estruturas de Dados

Entender algoritmos e estruturas de dados é fundamental para escrever código eficiente e resolver problemas complexos.

## Por que Estudar Algoritmos?

- **Eficiência**: Código mais rápido e que usa menos memória
- **Entrevistas**: Tema comum em entrevistas técnicas
- **Base sólida**: Fundamento para qualquer área da computação
- **Resolução de problemas**: Melhora seu raciocínio lógico

## Complexidade de Algoritmos

### Notação Big O

A notação Big O descreve como o tempo de execução cresce conforme o tamanho da entrada aumenta.

| Notação | Nome | Exemplo |
|---------|------|---------|
| O(1) | Constante | Acessar elemento de array |
| O(log n) | Logarítmica | Busca binária |
| O(n) | Linear | Busca linear |
| O(n log n) | Log-linear | Merge sort |
| O(n²) | Quadrática | Bubble sort |
| O(2^n) | Exponencial | Fibonacci recursivo |

### Exemplos Práticos

```python
# O(1) - Constante
def primeiro_elemento(lista):
    return lista[0]  # Sempre executa 1 operação

# O(n) - Linear
def busca_linear(lista, alvo):
    for item in lista:
        if item == alvo:
            return True
    return False  # No pior caso, percorre toda lista

# O(n²) - Quadrática
def bubble_sort(lista):
    n = len(lista)
    for i in range(n):
        for j in range(n - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
    return lista
```

## Estruturas de Dados

### Arrays (Listas)

Coleção ordenada de elementos com acesso por índice.

```python
# Criando lista
numeros = [1, 2, 3, 4, 5]

# Acessando elementos
print(numeros[0])   # 1 (primeiro)
print(numeros[-1])  # 5 (último)

# Operações comuns
numeros.append(6)       # Adiciona no final
numeros.insert(0, 0)    # Insere na posição
numeros.remove(3)       # Remove valor
numeros.pop()           # Remove e retorna último
```

**Complexidade:**
- Acesso: O(1)
- Inserção/Remoção no final: O(1)
- Inserção/Remoção no início: O(n)
- Busca: O(n)

### Pilhas (Stacks)

Estrutura LIFO (Last In, First Out) - o último a entrar é o primeiro a sair.

```python
class Pilha:
    def __init__(self):
        self.itens = []
    
    def push(self, item):
        self.itens.append(item)
    
    def pop(self):
        if not self.esta_vazia():
            return self.itens.pop()
        return None
    
    def topo(self):
        if not self.esta_vazia():
            return self.itens[-1]
        return None
    
    def esta_vazia(self):
        return len(self.itens) == 0

# Uso
pilha = Pilha()
pilha.push(1)
pilha.push(2)
pilha.push(3)
print(pilha.pop())  # 3
print(pilha.topo()) # 2
```

**Aplicações:**
- Desfazer/Refazer (Ctrl+Z)
- Navegação de páginas (botão voltar)
- Validação de parênteses

### Filas (Queues)

Estrutura FIFO (First In, First Out) - o primeiro a entrar é o primeiro a sair.

```python
from collections import deque

class Fila:
    def __init__(self):
        self.itens = deque()
    
    def enfileirar(self, item):
        self.itens.append(item)
    
    def desenfileirar(self):
        if not self.esta_vazia():
            return self.itens.popleft()
        return None
    
    def frente(self):
        if not self.esta_vazia():
            return self.itens[0]
        return None
    
    def esta_vazia(self):
        return len(self.itens) == 0

# Uso
fila = Fila()
fila.enfileirar("A")
fila.enfileirar("B")
fila.enfileirar("C")
print(fila.desenfileirar())  # A
print(fila.frente())         # B
```

**Aplicações:**
- Fila de impressão
- Atendimento em call center
- Processamento de tarefas

### Dicionários (Hash Maps)

Estrutura que mapeia chaves para valores.

```python
# Criando dicionário
aluno = {
    "nome": "João",
    "idade": 20,
    "curso": "Ciência da Computação"
}

# Acessando valores
print(aluno["nome"])  # João

# Adicionando/Modificando
aluno["semestre"] = 3
aluno["idade"] = 21

# Verificando existência
if "nome" in aluno:
    print("Chave existe!")

# Iterando
for chave, valor in aluno.items():
    print(f"{chave}: {valor}")
```

**Complexidade média:**
- Inserção: O(1)
- Busca: O(1)
- Remoção: O(1)

## Algoritmos de Busca

### Busca Linear

Percorre todos os elementos sequencialmente.

```python
def busca_linear(lista, alvo):
    for i, elemento in enumerate(lista):
        if elemento == alvo:
            return i
    return -1

numeros = [5, 2, 8, 1, 9, 3]
print(busca_linear(numeros, 8))  # 2
```

**Complexidade:** O(n)

### Busca Binária

Divide a lista pela metade a cada iteração. **Requer lista ordenada!**

```python
def busca_binaria(lista, alvo):
    inicio = 0
    fim = len(lista) - 1
    
    while inicio <= fim:
        meio = (inicio + fim) // 2
        
        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            inicio = meio + 1
        else:
            fim = meio - 1
    
    return -1

numeros = [1, 2, 3, 5, 8, 9]  # Lista ordenada!
print(busca_binaria(numeros, 8))  # 4
```

**Complexidade:** O(log n)

## Algoritmos de Ordenação

### Selection Sort

Encontra o menor elemento e coloca na posição correta.

```python
def selection_sort(lista):
    n = len(lista)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if lista[j] < lista[min_idx]:
                min_idx = j
        lista[i], lista[min_idx] = lista[min_idx], lista[i]
    return lista

numeros = [64, 25, 12, 22, 11]
print(selection_sort(numeros))  # [11, 12, 22, 25, 64]
```

**Complexidade:** O(n²)

### Merge Sort

Divide a lista em partes menores, ordena e junta.

```python
def merge_sort(lista):
    if len(lista) <= 1:
        return lista
    
    meio = len(lista) // 2
    esquerda = merge_sort(lista[:meio])
    direita = merge_sort(lista[meio:])
    
    return merge(esquerda, direita)

def merge(esq, dir):
    resultado = []
    i = j = 0
    
    while i < len(esq) and j < len(dir):
        if esq[i] <= dir[j]:
            resultado.append(esq[i])
            i += 1
        else:
            resultado.append(dir[j])
            j += 1
    
    resultado.extend(esq[i:])
    resultado.extend(dir[j:])
    return resultado

numeros = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(numeros))  # [3, 9, 10, 27, 38, 43, 82]
```

**Complexidade:** O(n log n)

### Quick Sort

Escolhe um pivô e particiona a lista.

```python
def quick_sort(lista):
    if len(lista) <= 1:
        return lista
    
    pivo = lista[len(lista) // 2]
    menores = [x for x in lista if x < pivo]
    iguais = [x for x in lista if x == pivo]
    maiores = [x for x in lista if x > pivo]
    
    return quick_sort(menores) + iguais + quick_sort(maiores)

numeros = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(numeros))  # [1, 1, 2, 3, 6, 8, 10]
```

**Complexidade média:** O(n log n)

## Recursão

Recursão é quando uma função chama a si mesma.

### Fatorial

```python
def fatorial(n):
    # Caso base
    if n <= 1:
        return 1
    # Caso recursivo
    return n * fatorial(n - 1)

print(fatorial(5))  # 120 (5 * 4 * 3 * 2 * 1)
```

### Fibonacci

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Versão otimizada com memoização
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

print(fibonacci_memo(10))  # 55
```

## Comparação de Algoritmos de Ordenação

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Espaço |
|-----------|-------------|-----------|----------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

## Exercícios

### 1. Inverta uma String

```python
def inverter_string(s):
    # Usando pilha
    pilha = list(s)
    resultado = ""
    while pilha:
        resultado += pilha.pop()
    return resultado

print(inverter_string("trilha"))  # "ahlirt"
```

### 2. Verifique Palíndromo

```python
def eh_palindromo(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(eh_palindromo("arara"))  # True
print(eh_palindromo("trilha")) # False
```

### 3. Encontre Duplicados

```python
def encontrar_duplicados(lista):
    vistos = set()
    duplicados = set()
    
    for item in lista:
        if item in vistos:
            duplicados.add(item)
        vistos.add(item)
    
    return list(duplicados)

print(encontrar_duplicados([1, 2, 3, 2, 4, 3]))  # [2, 3]
```

---

> "Algoritmos + Estruturas de Dados = Programas" - Niklaus Wirth

Continue praticando e implementando esses algoritmos. Com o tempo, você desenvolverá intuição sobre qual usar em cada situação!
