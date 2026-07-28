---
title: 2. Variáveis e fundamentos
description: Compreenda como funcionam instruções de atribuição, diagramas de estado, como nomear variáveis e a importância das palavras chave
category: Programação
order: 2
---

## Sumário

- [2.1. Instruções de atribuição](#21-instrucoes-de-atribuicao)
- [2.2. Diagrama de Estado](#22-diagrama-de-estado)
- [2.3. Nomes de Variáveis e Palavras-chave](#23-nomes-de-variaveis-e-palavras-chave)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

Uma das características mais importantes de uma linguagem de programação é a capacidade de __manipular variáveis__. 
---

# 2.1. Instruções de atribuição

**Uma variável é definida como um nome que se refere a um valor.**

Para criar uma nova variável e associá-la a um dado específico, utilizamos uma instrução de atribuição.

**No Python, o símbolo = é o operador de atribuição. Por exemplo:**

- _n = 17:_ Atribui o número inteiro 17 à variável n.

- _pi = 3.14159:_ Atribui um valor de ponto flutuante à variável pi.

- _message = 'And now for something...':_ Atribui uma string à variável message.

> É importante notar que, em programação, a atribuição não é uma equação matemática de igualdade; enquanto na matemática a = 7 implica que 7 = a, no Python a instrução 7 = a resultaria em um erro, pois o lado esquerdo de uma atribuição deve ser sempre um nome de variável.
___
# 2.2. Diagrama de Estado
Uma forma eficiente de representar o que acontece na memória do computador é através de um __diagrama de estado__. 

![Diagrama de Estado](/api/materiais-assets/1-introducao-ao-python/2-variaveis-e-fundamentos/assets/diagrama_aula1.png)

Este diagrama é uma representação gráfica que mostra cada variável acompanhada por uma flecha que aponta para o seu valor correspondente.

> O objetivo do diagrama é mostrar o "estado" atual do programa, permitindo que o programador visualize para quais dados cada nome está apontando em um determinado momento da execução. Quando uma variável é reatribuída, o diagrama de estado muda para refletir que o nome agora se refere a um novo objeto, deixando de apontar para o valor anterior.
___
# 2.3. Nomes de Variáveis e Palavras-chave

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
---

# Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre introdução ao ambiente e execução, confira os seguintes recursos:

 [Data Types & Variables in Python - Neso Academy](https://youtu.be/R83OfbQeB7M?si=djA5FtbG1m8P3UiV)

```quiz
- tipo: single
  pergunta: |
    Com base no conceito de instrução de atribuição em Python, o que acontece se um programador tentar executar a linha de código `25 = idade`?
  opcoes:
    - texto: "O interpretador gera um erro de sintaxe, pois o lado esquerdo deve ser sempre um nome de variável."
      correta: true
      explicacao: |
        Exato! Em Python, o sinal de '=' é um operador de atribuição. O lado esquerdo define onde o valor será guardado, portanto precisa ser um identificador/variável válido, nunca um valor bruto como o número 25.
      explicacao_erro: |
        Lembre-se que em programação a atribuição não é uma igualdade matemática bidirecional. O lado esquerdo precisa ser obrigatoriamente um nome de variável.
    - texto: "O valor da variável idade passa a ser 25."
      correta: false
      explicacao: |
        Incorreto. Para atribuir o valor 25 à variável, a sintaxe correta obrigatoriamente teria que ser invertida: `idade = 25`.
    - texto: "O Python cria automaticamente uma constante na memória."
      correta: false
      explicacao: |
        Incorreto. O Python não cria constantes automaticamente dessa forma e números inteiros puros não podem receber atribuições.
    - texto: "O código é executado normalmente invertendo os valores."
      correta: false
      explicacao: |
        Incorreto. Essa linha causará um erro imediato de sintaxe (SyntaxError) e impedirá a execução do seu script.

- tipo: single
  pergunta: |
    Qual é o principal objetivo de utilizar um diagrama de estado ao analisar a execução de um programa?
  opcoes:
    - texto: "Visualizar graficamente o estado atual da memória, mostrando para quais valores cada nome de variável está apontando."
      correta: true
      explicacao: |
        Perfeito! O diagrama de estado funciona como um mapa visual da memória. Ele mostra cada variável acompanhada por uma flecha que aponta para o seu valor correspondente naquele momento da execução.
      explicacao_erro: |
        O diagrama de estado não serve para analisar a estrutura física do computador ou o código estático, mas sim para acompanhar de forma gráfica como as variáveis apontam para seus dados na memória durante a execução.
    - texto: "Contar automaticamente quantas linhas de código foram escritas pelo programador."
      correta: false
      explicacao: |
        A contagem de linhas é uma métrica simples de texto e não tem relação com o mapeamento visual de variáveis na memória.
    - texto: "Medir a velocidade de processamento e o consumo de hardware do computador."
      correta: false
      explicacao: |
        A medição de performance de hardware (como uso de CPU ou RAM) é feita por ferramentas de monitoramento, não por um diagrama de estados de variáveis.
    - texto: "Listar em ordem alfabética todas as palavras-chave reservadas da linguagem."
      correta: false
      explicacao: |
        As palavras-chave são fixas da estrutura do Python. O diagrama de estado mapeia os dados dinâmicos que você cria e altera no programa.

- tipo: single
  pergunta: |
    Qual das opções abaixo é uma palavra-chave reservada do Python e não pode ser usada como nome de variável?
  opcoes:
    - texto: "`nome`"
      correta: false
      explicacao: |
        `nome` é um identificador comum e pode ser usado como nome de variável normalmente dentro do programa.
    - texto: "`total_vendas`"
      correta: false
      explicacao: |
        `total_vendas` é um nome válido de variável em Python. O uso de sublinhar (_) para separar palavras (padrão conhecido como snake_case) é a convenção recomendada.
    - texto: "`def`"
      correta: true
      explicacao: |
        Perfeito! `def` é uma palavra-chave reservada pelo interpretador do Python utilizada exclusivamente para a definição de funções. Tentar usá-la como variável quebra a estrutura da linguagem.
      explicacao_erro: |
        A palavra `def` tem um propósito estrutural fixo no Python para criar funções e não pode ser reaproveitada como nome de variável, gerando erro de sintaxe.
    - texto: "`contador2`"
      correta: false
      explicacao: |
        `contador2` é um nome de variável válido. Números podem aparecer na composição dos identificadores, desde que não sejam colocados como o primeiro caractere do nome.
```