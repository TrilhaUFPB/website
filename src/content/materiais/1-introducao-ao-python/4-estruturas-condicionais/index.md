---
title: 4. Estruturas Condicionais
description: Compreender o que são estruturas condicionais, expressões booleanas, como utilizar if, else e elif e como usar operadores lógicos
category: Programação
order: 4
---

# 4.1. Expressões Booleanas

Uma expressão booleana é uma expressão que pode ser avaliada como **verdadeira (True)** ou **falsa (False)**. No Python, esses valores pertencem ao tipo especial *bool* e não são strings.

Para criar essas expressões, utilizamos os operadores relacionais:

- `X == Y`: X é igual a Y 

- `X != Y`: X é diferente de Y

- `X > Y`: X é maior que Y

- `X < Y`: X é menor que Y

- `X >= Y`: X é maior ou igual a Y

- `X <= Y`: X é menor ou igual a Y

> Note o uso de dois sinais de igual; um sinal único = é para **atribuição**.

___

# 4.2. Operadores Lógicos

Existem três operadores lógicos que permitem combinar ou negar expressões booleanas, funcionando de forma muito semelhante ao sentido das palavras em português:

- *and (e):* A expressão só é verdadeira se ambas as condições forem verdadeiras (ex: `X > 0 and X < 10`).

- *or (ou):* A expressão é verdadeira se pelo menos uma das condições for verdadeira.

- *not (não):* Nega a expressão booleana; o que era True torna-se False e vice-versa.

___

# 4.3. Execução Condicional (if, else, elif)

As instruções condicionais permitem que o programa mude seu comportamento de acordo com o estado das variáveis.

- *if:* É a forma mais simples. Se a condição (expressão booleana) for **verdadeira**, o bloco de código indentado abaixo dela é executado. Se for falsa, nada acontece.

- *else:* Usada quando existem duas possibilidades e a condição determina qual delas será seguida. Nesse caso, temos dois ramos no fluxo de execução, e exatamente um deles será executado.

- *elif:* Abreviação de "else if", é utilizada quando há mais de duas possibilidades. O Python verifica cada condição em ordem: se a primeira for falsa, verifica a próxima, e assim por diante. Apenas o primeiro ramo cuja condição for verdadeira será executado.

---
## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre estruturas condicionais, confira os seguintes recursos:

- [Conditional Statements in Python - Real Python](https://realpython.com/python-conditional-statements/)
- [Coding Basics: If Statements, If Else, Else - Transcode](https://youtu.be/HQ3dCWjfRZ4?si=Az5sBmkDaL05rl1e)