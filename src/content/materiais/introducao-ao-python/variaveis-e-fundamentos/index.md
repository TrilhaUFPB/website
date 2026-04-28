---
title: Variáveis e fundamentos
description: Compreender como funcionam instruções de atribuição, diagramas de estado, como nomear variáveis e a importância das palavras chave
category: Programação
order: 2
---

Uma das características mais importantes de uma linguagem de programação é a capacidade de __manipular variáveis__. 
___
### 1. Instruções de atribuição

**Uma variável é definida como um nome que se refere a um valor.**

Para criar uma nova variável e associá-la a um dado específico, utilizamos uma instrução de atribuição.

**No Python, o símbolo = é o operador de atribuição. Por exemplo:**

- _n = 17:_ Atribui o número inteiro 17 à variável n.

- _pi = 3.14159:_ Atribui um valor de ponto flutuante à variável pi.

- _message = 'And now for something...':_ Atribui uma string à variável message.

> É importante notar que, em programação, a atribuição não é uma equação matemática de igualdade; enquanto na matemática a = 7 implica que 7 = a, no Python a instrução 7 = a resultaria em um erro, pois o lado esquerdo de uma atribuição deve ser sempre um nome de variável.
___
### 2. Diagrama de Estado
Uma forma eficiente de representar o que acontece na memória do computador é através de um __diagrama de estado__. 

![Diagrama de Estado](./images/diagrama_aula1.png)

Este diagrama é uma representação gráfica que mostra cada variável acompanhada por uma flecha que aponta para o seu valor correspondente.

> O objetivo do diagrama é mostrar o "estado" atual do programa, permitindo que o programador visualize para quais dados cada nome está apontando em um determinado momento da execução. Quando uma variável é reatribuída, o diagrama de estado muda para refletir que o nome agora se refere a um novo objeto, deixando de apontar para o valor anterior.
___
### 3. Nomes de Variáveis e Palavras-chave

A escolha dos nomes das variáveis é uma parte crucial da programação, pois bons nomes ajudam a documentar o código e torná-lo legível. 

__Existem regras estritas e convenções para a nomeação:__

- _Composição:_ Nomes podem ser longos e conter letras e números, mas nunca podem começar com um número.

- _Símbolos:_ O caractere de sublinhar (_) é permitido e frequentemente usado para separar palavras em nomes compostos, como meu_nome ou velocidade_atual. Símbolos como @ ou $ são ilegais e geram erros de sintaxe.

- _Convenção:_ Embora letras maiúsculas sejam permitidas, a convenção padrão em Python é usar apenas letras minúsculas para nomes de variáveis.

Além dessas regras, o Python reserva certas palavras-chave que não podem ser usadas como nomes de variáveis. O interpretador utiliza essas palavras para reconhecer a estrutura do programa. 

__Exemplos incluem:__

- _if, else, elif_ (condicionais).

- _while, for, break_ (repetição).

- _def, return, class_ (definições).

> Na maioria dos editores de código, essas palavras-chave aparecem em cores diferentes para alertar o programador de que elas possuem um significado especial na linguagem.
___

## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre introdução ao ambiente e execução, confira os seguintes recursos:

- [Data Types & Variables in Python - Neso Academy](https://youtube.com/playlist?list=PLBlnK6fEyqRhN-sfWgCU1z_Qhakc1AGOn&si=HHME8gy1ldOQNGPS)
- [Python for Beginners: Data Types - The New Stack](https://thenewstack.io/python-for-beginners-data-types/)