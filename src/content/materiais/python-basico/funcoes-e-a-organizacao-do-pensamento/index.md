---
title: Funções e a Organização do Pensamento
description: Compreender o que é uma função, a diferença entre parâmetros e argumentos e a diferença entre funções com resultado e funções nulas
category: Programação
order: 6
---

No contexto da programação, uma função é uma sequência nomeada de instruções que executa uma operação de computação.

___
### 1. Definição e Chamada de Funções

Para criar uma nova função, utilizamos a palavra-chave _def_, definindo um cabeçalho (que termina em dois pontos) e um corpo indentado.

- __Chamada:__ Uma vez definida, a função só é executada quando é chamada pelo nome seguido de parênteses.

- __Encapsulamento:__ Colocar código dentro de uma função é chamado de encapsulamento. Isso ajuda a organizar o programa, dar nome a uma ideia e funciona como uma forma de documentação.

__Exemplo de função:__
```python 
def saudacao():
    print("Olá, mundo!")

# A função só executa quando é chamada
saudacao()
```
>Saída:\
Olá, mundo!
___
### 2. Fluxo de Execução

Para entender como um programa funciona, é preciso seguir a ordem em que as instruções são executadas, chamada de _fluxo de execução_.

- A execução sempre começa na __primeira instrução__ do programa. 

- As definições de função não alteram o fluxo __até que a função seja chamada.__

Uma chamada de função funciona como um desvio. O fluxo “salta” para o corpo da função, executa suas instruções e depois retorna para continuar o programa.

Exemplo:
```python 
def mostrar_msg():
    print("Dentro da função")
print("Antes da função")
mostrar_msg()
print("Depois da função")
```

Ordem de saída:
Antes da função
Dentro da função
Depois da função
___
### 3. Parâmetros e Argumentos
As funções podem exigir valores para realizar seu trabalho.

- __Argumento:__ É o valor fornecido à função no momento da chamada.

- __Parâmetro:__ É o nome usado dentro da função para se referir ao valor recebido.

__Exemplo de parâmetro e argumento:__
```python 
def print_twice(bruce):
    print(bruce)
    print(bruce)
print_twice('Spam')
```

Nesse exemplo:
_spam_ é o argumento e _bruce_ é o parâmetro.
___
### 4. Variáveis e Parâmetros são Locais
Variáveis criadas dentro de uma função são _locais_, ou seja, existem apenas enquanto a função está sendo executada. Quando a função termina, essas variáveis são destruídas.

__Exemplo de Erro (NameError):__
```python
def juntar_palavras(part1, part2):
    cat = part1 + part2
    return cat
juntar_palavras("py", "thon")
print(cat)  # ERRO
```

O erro ocorre porque cat é uma variável local da função e não existe fora dela.
___
### 5. Funções com Resultado vs. Funções Nulas
Nem toda função devolve um valor para quem a chamou.
Funções com Resultado
Utilizam a instrução return para devolver um valor.

__Exemplo de função com resultado:__
```python 
import math
def area_circulo(radius):
    return math.pi * radius**2
area = area_circulo(3)
print(area)
````

- __Funções Nulas:__ Executam uma ação, mas não retornam um valor útil. Nesse caso, o valor retornado é _None_.

__Exemplo de função nula:__
```python
def mostrar_nome(nome):
    print(nome)
resultado = mostrar_nome("Maria")
print(resultado)  # None
```