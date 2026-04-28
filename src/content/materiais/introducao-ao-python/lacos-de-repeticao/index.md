---
title: Laços de Repetição
description: Compreender o que são laços de repetição, repetição por condição, repetição por iteração, controle de fluxo e como utilizá-los
category: Programação
order: 5
---

Em computação, a capacidade de executar um bloco de instruções repetidamente é chamada de **iteração**. O Python oferece duas ferramentas principais para isso: os laços _while_ e _for_.

___
### 1. Instrução while (repetição por condição)

A instrução _while_ é usada para repetir um código enquanto uma condição for verdadeira. Seu fluxo de execução funciona da seguinte forma:

1. Avalia se a condição é True ou False.
2. Se for False, sai da instrução e continua a execução do programa.
3. Se for True, executa o corpo do loop e volta ao passo 1 para testar a condição novamente.

__Exemplo clássico:__ Um contador regressivo que subtrai 1 a cada volta até chegar a zero.
```python
i = 10

while i >= 0:
    print(f"O número é {i}")
    i -= 1 (ou i = i-1)
```
> Saída:\
O número é 10\
O número é 9\
O número é 8\
O número é 7\
O número é 6\
O número é 5\
O número é 4\
O número é 3\
O número é 2\
O número é 1\
O número é 0

**O Perigo do Loop Infinito:** O corpo do loop deve alterar o valor de uma ou mais variáveis para que, eventualmente, a condição se torne falsa. Se a variável testada nunca mudar, o programa entrará em um loop infinito, repetindo-se para sempre (ou até o computador travar).


__Exemplo de Loop Infinito:__
```python
i = 1

while i == 1:
    print("Hello World!")
```
> Saída:\
Hello World!\
Hello World!\
Hello World!\
Hello World!\
Hello World!\
Hello World!\
Hello World!\
...
___
### 2. Instrução for (repetição por iteração)

Diferente do _while_, o laço __for__ é frequentemente usado quando se quer percorrer os elementos de uma sequência ou repetir uma ação um número específico de vezes.

- __Travessia de Sequências:__ Processar um caractere de cada vez em uma string é chamado de travessia. O for facilita isso: a cada volta, ele atribui o próximo caractere da string a uma variável até que não sobre nenhum.

__Exemplo de Travessia de Sequências:__
```python
palavra = "Python"

for letra in palavra:
    print(letra)
```
> Saída:\
P\
y\
t\
h\
o\
n

- __Uso com range:__ Para repetir uma ação um número fixo de vezes (como desenhar os 4 lados de um quadrado), usamos a função range(n), que gera uma sequência de números de 0 a n−1.

__Exemplo de uso com range:__
```python
for i in range(5):
    print(f"O número é {i}")
```
> Saída:\
O número é 0\
O número é 1\
O número é 2\
O número é 3\
O número é 4

#### Diferença Fundamental:

- Use __for__ quando souber o número de repetições ou quando estiver percorrendo uma lista/string.

- Use __while__ quando a repetição depender de uma condição que pode mudar a qualquer momento.
___
### 3. Controle de Fluxo: A instrução break

Às vezes, você não sabe que o loop deve terminar até chegar à metade do código. Nesses casos, utiliza-se a instrução __break__ para sair do laço imediatamente. É muito comum ver o __break__ sendo usado em estruturas do tipo _while True_ (um loop que seria tecnicamente infinito), onde uma entrada do usuário ou uma verificação interna decide o momento exato da parada. Assim que o break é executado, o Python salta para a instrução logo após o bloco do loop.

__Exemplo da instrução break:__
```python
for i in range(10):
    if i == 5:
        break
    print(i)
```
> Saída:\
0\
1\
2\
3\
4

---
## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre estruturas condicionais, confira os seguintes recursos:

- [Loops em PYTHON sem enrolação pra facilitar sua vida (for e while) - Lan Code](https://youtu.be/n5ETibjJcAE?si=uAP4N9YeIQQHOCLL)
- [Python while Loops: Repeating Tasks Conditionally - Real Python](https://realpython.com/python-while-loop/)
- [Python for Loops: The Pythonic Way - Real Python](https://realpython.com/python-for-loop/#the-guts-of-the-python-for-loop)