---
title: 5. Laços de Repetição
description: Compreender o que são laços de repetição, repetição por condição, repetição por iteração, controle de fluxo e como utilizá-los
category: Programação
order: 5
---

## Sumário

- [5.1. Instrução while (repetição por condição)](#51-instrucao-while-repeticao-por-condicao)
- [5.2. Instrução for (repetição por iteração)](#52-instrucao-for-repeticao-por-iteracao)
- [5.3. Controle de Fluxo: A instrução break](#53-controle-de-fluxo-a-instrucao-break)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---
> Em computação, a capacidade de executar um bloco de instruções repetidamente é chamada de **iteração**. O Python oferece duas ferramentas principais para isso: os laços _while_ e _for_.

---
# 5.1. Instrução while (repetição por condição)

A instrução _while_ é usada para repetir um código enquanto uma condição for verdadeira. Seu fluxo de execução funciona da seguinte forma:

1. Avalia se a condição é True ou False.
2. Se for False, sai da instrução e continua a execução do programa.
3. Se for True, executa o corpo do loop e volta ao passo 1 para testar a condição novamente.

__Exemplo clássico:__ Um contador regressivo que subtrai 1 a cada volta até chegar a zero.
```python-run
i = 10

while i >= 0:
    print(f"O número é {i}")
    i -= 1 # (ou i = i-1)
```

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
---
# 5.2. Instrução for (repetição por iteração)

Diferente do _while_, o laço __for__ é frequentemente usado quando se quer percorrer os elementos de uma sequência ou repetir uma ação um número específico de vezes.

- __Travessia de Sequências:__ Processar um caractere de cada vez em uma string é chamado de travessia. O for facilita isso: a cada volta, ele atribui o próximo caractere da string a uma variável até que não sobre nenhum.

__Exemplo de Travessia de Sequências:__
```python-run
palavra = "Python"

for letra in palavra:
    print(letra)
```

- __Uso com range:__ Para repetir uma ação um número fixo de vezes (como desenhar os 4 lados de um quadrado), usamos a função range(n), que gera uma sequência de números de 0 a n−1.

__Exemplo de uso com range:__
```python-run
for i in range(5):
    print(f"O número é {i}")
```

## Diferença Fundamental:

- Use __for__ quando souber o número de repetições ou quando estiver percorrendo uma lista/string.

- Use __while__ quando a repetição depender de uma condição que pode mudar a qualquer momento.
---
# 5.3. Controle de Fluxo: A instrução break

Às vezes, você não sabe que o loop deve terminar até chegar à metade do código. Nesses casos, utiliza-se a instrução __break__ para sair do laço imediatamente. É muito comum ver o __break__ sendo usado em estruturas do tipo _while True_ (um loop que seria tecnicamente infinito), onde uma entrada do usuário ou uma verificação interna decide o momento exato da parada. Assim que o break é executado, o Python salta para a instrução logo após o bloco do loop.

__Exemplo da instrução break:__
```python-run
for i in range(10):
    if i == 5:
        break
    print(i)
```

---
# Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre laços de repetição, confira os seguintes recursos:

[Loops em PYTHON sem enrolação pra facilitar sua vida (for e while) - Lan Code](https://youtu.be/n5ETibjJcAE?si=uAP4N9YeIQQHOCLL)

```quiz
- tipo: single
  pergunta: Qual é a principal diferença entre o laço "for" e o laço "while"?
  opcoes:
    - texto: O "for" é usado para percorrer sequências ou repetir um número fixo de vezes, enquanto o "while" repete enquanto uma condição for verdadeira
      correta: true
      explicacao: Exato! O "for" é ideal quando você sabe quantas repetições serão feitas, já o "while" depende de uma condição que pode mudar a qualquer momento.
      explicacao_erro: O "for" é usado quando se conhece o número de repetições ou se percorre uma sequência. O "while" repete enquanto uma condição for verdadeira.
    - texto: O "while" só funciona com números, enquanto o "for" funciona com qualquer tipo de dado
      correta: false
      explicacao: Isso não é verdade. O "while" funciona com qualquer condição booleana, não apenas com números.
    - texto: O "for" sempre executa pelo menos uma vez, enquanto o "while" pode não executar nenhuma vez
      correta: false
      explicacao: Na verdade, o "for" também pode não executar nenhuma vez, por exemplo se a sequência estiver vazia.
    - texto: Não há diferença, os dois fazem exatamente a mesma coisa
      correta: false
      explicacao: Há sim uma diferença fundamental. O "for" itera sobre sequências ou um número fixo de vezes, enquanto o "while" depende de uma condição.

- tipo: single
  pergunta: O que acontece quando a instrução "break" é executada dentro de um laço?
  opcoes:
    - texto: O laço é encerrado imediatamente, e o programa continua na instrução após o bloco do loop
      correta: true
      explicacao: Correto! O "break" interrompe o laço na hora, independente da condição ou de quantas iterações ainda restariam.
      explicacao_erro: O "break" encerra o laço imediatamente, pulando para a primeira instrução fora do bloco do loop.
    - texto: A iteração atual é pulada e o laço continua da próxima
      correta: false
      explicacao: Isso descreve o comportamento do "continue", não do "break". O "break" encerra o laço completamente.
    - texto: O programa volta ao início do laço e reinicia a contagem
      correta: false
      explicacao: O "break" não reinicia nada. Ele encerra o laço e o programa segue para o que vem depois dele.
    - texto: O "break" só funciona dentro de laços "while", não dentro de laços "for"
      correta: false
      explicacao: O "break" funciona tanto no "for" quanto no "while". Ele encerra qualquer tipo de laço imediatamente.

- tipo: single
  pergunta: O que a função range(5) gera quando usada em um laço "for"?
  opcoes:
    - texto: Uma sequência de números de 0 a 4
      correta: true
      explicacao: Isso mesmo! O range(n) gera números de 0 até n-1, ou seja, range(5) gera 0, 1, 2, 3 e 4.
      explicacao_erro: O range(n) começa em 0 e vai até n-1. Então range(5) gera os números 0, 1, 2, 3 e 4.
    - texto: Uma sequência de números de 1 a 5
      correta: false
      explicacao: Cuidado! O range começa em 0, não em 1. range(5) gera 0, 1, 2, 3 e 4.
    - texto: Uma sequência de números de 0 a 5
      correta: false
      explicacao: O range(n) vai até n-1, não até n. Então range(5) para em 4, não em 5.
    - texto: Repete o laço infinitamente até o programa ser encerrado
      correta: false
      explicacao: O range gera uma sequência finita de números. Para loops infinitos usaríamos "while True", por exemplo.
```