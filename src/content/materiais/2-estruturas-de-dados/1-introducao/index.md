---
title: 1. Introdução
description: Introdução a conceitos e o são estruturas de dados
category: Programação
order: 1
---

## Sumário

- [1.1. Big O Notation: Entendendo a Eficiência dos Algoritmos](#11-big-o-notation-entendendo-a-eficiencia-dos-algoritmos)
- [1.2. O que é Estrutura de Dados?](#12-o-que-e-estrutura-de-dados)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Imagine uma biblioteca com um milhão de livros jogados no chão — sem ordem, sem prateleiras, sem índice. Você poderia encontrar qualquer livro, mas levaria horas. As **estruturas de dados** são as prateleiras e os índices dessa biblioteca: elas determinam com que eficiência um programa consegue armazenar, buscar e manipular informações.

<div style="background: #0B1230; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
  <h4 style="margin-top: 0; color: white;">"Algoritmos + Estruturas de Dados = Programas."</h4>
  <p style="color: rgb(180, 188, 201); margin-bottom: 0; text-align: right; font-style: italic;">— Niklaus Wirth</p>
</div>

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
    <img src="/api/materiais-assets/2-estruturas-de-dados/1-introducao/assets/memoria.png" width="300">
  </div>

</div>

Esse modelo funciona bem quando temos poucos dados. Porém, quando a quantidade de informações cresce, é necessário estruturas de dados adequadas para o armazenamento dessas informações, para facilitação de acesso, organização, eficiência etc..

---

# Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre Big O e Estruturas de Dados, confira os seguintes recursos:

- [O que é a notação Big O: complexidade de tempo e de espaço - freeCodeCamp](https://www.freecodecamp.org/portuguese/news/o-que-e-a-notacao-big-o-complexidade-de-tempo-e-de-espaco/)

```quiz
- tipo: single
  pergunta: O que a notação Big O mede em um algoritmo?
  opcoes:
    - texto: Como o tempo de execução cresce conforme a quantidade de dados aumenta
      correta: true
      explicacao: Exato! Big O não mede segundos, mas sim como o algoritmo se comporta quando o volume de dados escala.
      explicacao_erro: Big O não mede o tempo em segundos, mas sim como o tempo de execução cresce proporcionalmente à quantidade de dados.
    - texto: Quantos segundos um algoritmo leva para executar
      correta: false
      explicacao: Big O não mede tempo absoluto. Um algoritmo O(n) pode ser mais rápido ou mais lento que outro dependendo do hardware, mas Big O descreve apenas o crescimento.
    - texto: Quantos erros um algoritmo pode ter
      correta: false
      explicacao: Big O não tem relação com erros. Ele descreve a eficiência e escalabilidade de um algoritmo conforme o volume de dados cresce.
    - texto: Quanta memória RAM o computador possui
      correta: false
      explicacao: Big O descreve o comportamento do algoritmo, não uma característica do hardware. Ele responde à pergunta - se os dados dobrarem, quanto mais tempo vai levar?

- tipo: single
  pergunta: Qual é a complexidade Big O de um loop dentro de outro loop, onde ambos percorrem a mesma lista de tamanho n?
  opcoes:
    - texto: O(n²)
      correta: true
      explicacao: Correto! Para cada elemento do loop externo, o loop interno percorre todos os n elementos. Isso resulta em n × n = n² operações.
      explicacao_erro: Quando há um loop dentro de outro, multiplicamos as complexidades. Como cada loop é O(n), o resultado é O(n × n) = O(n²).
    - texto: O(n)
      correta: false
      explicacao: O(n) seria correto se houvesse apenas um loop. Com dois loops aninhados percorrendo a mesma lista, a complexidade é O(n²).
    - texto: O(1)
      correta: false
      explicacao: O(1) indica tempo constante, ou seja, o algoritmo sempre faz o mesmo número de operações independente do tamanho dos dados. Dois loops aninhados crescem com n².
    - texto: O(2n)
      correta: false
      explicacao: O(2n) simplifica para O(n) pelas regras do Big O. Dois loops aninhados resultam em O(n²), não em uma soma.

- tipo: single
  pergunta: O que é uma Estrutura de Dados?
  opcoes:
    - texto: A forma como organizamos, armazenamos e acessamos informações na memória do computador
      correta: true
      explicacao: Exato! Uma estrutura de dados busca responder qual é a melhor forma de armazenar um dado para que possamos usá-lo de maneira eficiente.
      explicacao_erro: Estrutura de dados é a forma como organizamos e armazenamos informações na memória, buscando eficiência no acesso e na manipulação dos dados.
    - texto: Um tipo de variável que armazena apenas números inteiros
      correta: false
      explicacao: Isso descreve um tipo primitivo de dado, como int. Uma estrutura de dados é um conceito mais amplo que define como organizar e acessar conjuntos de informações.
    - texto: Uma linguagem de programação voltada para banco de dados
      correta: false
      explicacao: Isso descreve linguagens como SQL. Estrutura de dados é um conceito de organização de informações na memória, independente de linguagem.
    - texto: Um algoritmo que ordena elementos de uma lista
      correta: false
      explicacao: Isso descreve um algoritmo de ordenação, como o Bubble Sort. Uma estrutura de dados define como os dados são organizados, não como são processados.
```