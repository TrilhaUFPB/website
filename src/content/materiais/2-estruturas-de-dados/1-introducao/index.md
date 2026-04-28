---
title: 1. Introdução
description: Introdução a conceitos e o são estruturas de dados
category: Programação
order: 1
---

# 1.1. Big O Notation: Entendendo a Eficiência dos Algoritmos

## O que é Big O?

**Big O** é uma forma de medir quão rápido um algoritmo cresce conforme a quantidade de dados aumenta. Não é sobre segundos ou milissegundos, mas sobre **como o tempo de execução escala**.

> **Pense assim:** Se você tem 10 elementos e seu código demora 1 segundo, quanto tempo vai demorar com 100 elementos? Com 1000? Big O responde isso.

## Uma Analogia do Dia a Dia

Imagine que você precisa encontrar um livro na biblioteca:

**Cenário 1 - O(1):** Você sabe exatamente onde está (prateleira 3, posição 7). Você vai direto lá. Não importa se a biblioteca tem 100 ou 10.000 livros - você sempre faz a mesma coisa. Isso é **O(1) - tempo constante**.

**Cenário 2 - O(n):** Você não sabe onde está, então examina livro por livro até encontrar. Se a biblioteca tem 1000 livros, no pior caso você olha 1000 livros. Isso é **O(n) - tempo linear**.

**Cenário 3 - O(n²):** Para cada livro que você pega, precisa conferir todos os outros para comparar. Com 100 livros, você faz 10.000 comparações (100 × 100). Isso é **O(n²) - tempo quadrático**.

## As Principais Complexidades

### O(1) - Constante: Sempre a mesma velocidade

```python
def pegar_primeiro(lista):
    return lista[0]  # Sempre uma operação
```

### O(n) - Linear: Cresce proporcionalmente

```python
def imprimir_todos(lista):
    for item in lista:  # Passa por cada elemento
        print(item)
```

### O(n²) - Quadrática: Cresce muito rápido

```python
def comparar_todos(lista):
    for i in lista:
        for j in lista:  # Loop dentro de loop
            print(i, j)
```

### O(log n) - Logarítmica: Muito eficiente, divide o problema

Aqui entra a **busca binária**, um exemplo perfeito de O(log n)! Veremos a implementação detalhada mais adiante, após entendermos listas em Python.

## Regras Simples

1. **Ignoramos constantes:** O(2n) vira O(n)
2. **Pegamos o pior termo:** O(n² + n) vira O(n²)
3. **Pensamos em grandes volumes:** Big O descreve o comportamento com muitos dados

## Dica Final

Quando estiver programando, pergunte-se: *"Se meus dados dobrarem, quanto mais tempo isso vai levar?"*

- Se a resposta for **"o dobro"**, você tem **O(n)**
- Se for **"quatro vezes mais"**, é **O(n²)**
- Se for **"só mais uma operação"**, é **O(log n)**
- Se for **"nenhum tempo a mais"**, pode ser **O(1)**

# 1.2. O que é Estrutura de Dados?

**Estrutura de dados** é a forma como organizamos, armazenamos e acessamos informações na memória do computador. Em termos simples, ela busca responder à seguinte pergunta:

> *Qual é a melhor forma de armazenar um dado (ou conjunto de dados) na memória para que possamos usá-lo de maneira eficiente?*

Já sabemos que podemos armazenar informações por meio da **declaração de variáveis**, em que:
<div style="display: flex; align-items: center; gap: 20px;">

  <div>
    <ul>
      <li>Uma variável ocupa uma posição na memória</li>
      <li>Cada posição possui um <b>endereço</b></li>
      <li>Nesse endereço, um <b>valor</b> é armazenado</li>
    </ul>
  </div>

  <div>
    <img src="images/memoria.png" width="300">
  </div>

</div>

Esse modelo funciona bem quando temos poucos dados. Porém, quando a quantidade de informações cresce, é necessário estruturas de dados adequadas para o armazenamento dessas informações, para facilitação de acesso, organização, eficiência etc..