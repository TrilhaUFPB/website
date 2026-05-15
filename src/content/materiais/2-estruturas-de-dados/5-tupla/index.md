---
title: 5. Tuplas
description: 
category: Programação
order: 5
---

# 5.1.Tupla (Tuple)

## O que é uma Tupla? (Estrutura e Características)

Imagine uma tupla como uma **caixa lacrada**. Você coloca os objetos lá dentro, fecha a caixa e, a partir desse momento, ninguém mais pode mudar o que está lá dentro. Você pode olhar e usar o que está dentro, mas nunca trocar um objeto por outro.

## Características principais

- **Imutável:** Uma vez criada, ela não aceita adições, remoções ou alterações. É o que chamamos de dado "somente leitura".
- **Ordenada:** A ordem dos elementos é preservada rigorosamente desde a criação.
- **Sintaxe:** Utilizamos **parênteses `()**` para defini-las, com os itens separados por vírgulas.
- **Heterogênea:** Elas são flexíveis quanto ao conteúdo, permitindo misturar textos, números e booleanos na mesma estrutura.

#### **Exercício de Fixação**

Analise as declarações abaixo. Qual delas é uma **Lista** e qual é uma **Tupla**?

```python
var_a = [10, 20, 30]
var_b = (10, 20, 30)

```

Se tentarmos fazer `var_b[0] = 50`, o que acontecerá?

---

# 5.2.Operações Principais

Diferente das listas, as operações em tuplas são focadas em leitura e consulta, já que a estrutura é fixa.

## Acesso por Índice

Para buscar um valor específico, utilizamos o número da posição (índice) entre colchetes logo após o nome da variável. Lembre-se que em Python a contagem sempre começa no zero. No exemplo abaixo, criamos a variável e acessamos a primeira e a segunda posição:

```python
dados_do_usuario = ("Alice", 25, "Engenheira")

nome = dados_do_usuario[0]
idade = dados_do_usuario[1]

print(nome)  # Saída: Alice
print(idade) # Saída: 25

```

## A Tupla de um único item

Existe uma peculiaridade sintática: para o Python entender que uma variável é uma tupla e não apenas um texto comum, você deve colocar uma vírgula após o primeiro item, mesmo que não haja um segundo.

```python
tupla_correta = ("item",)
apenas_texto = ("item")

print(type(tupla_correta)) # Saída: <class 'tuple'>
print(type(apenas_texto))  # Saída: <class 'str'>

```

## Contagem e Localização

Existem dois métodos principais para investigar uma tupla: o `count`, que informa a frequência de um valor, e o `index`, que revela em qual posição um valor aparece pela primeira vez.

```python
dados_do_usuario = (10, 20, 10, 30)

print(dados_do_usuario.count(10)) # Saída: 2
print(dados_do_usuario.index(30)) # Saída: 3

```

### **Exercício de Fixação**

O programador júnior criou uma tupla de notas: `notas = (10)`.
Ao tentar usar `notas.count(10)`, o programa quebrou.

1. Por que o Python diz que `int object has no attribute count`?
2. Como corrigir a declaração da variável `notas`?

---

# 5.3.Uso: Por que não usar apenas Listas?