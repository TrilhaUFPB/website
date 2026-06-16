---
title: 3. Tipos de Dados e Operações
subtitle: Os blocos de construção e as regras do seu código
description: Compreender o que são valores, como o Python classifica dados, quais operações podem ser feitas sobre eles e como essas operações são avaliadas
category: Programação
order: 3
---

## Sumário

- [3.1. Valores e Tipos](#31-valores-e-tipos)
- [3.2. Operadores Aritméticos](#32-operadores-aritmeticos)
- [3.3. Ordem das Operações (PEMDAS)](#33-ordem-das-operacoes)
- [3.4. Operações com Strings](#34-operacoes-com-strings)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Em programação, **todo dado** é um **valor** e pertence a um **tipo**.


---

# 3.1. Valores e Tipos

Um **valor** é uma das coisas mais básicas que um programa manipula, como números e textos. Cada valor pertence a um **tipo**, que define quais operações podem ser realizadas sobre ele.

**Os tipos fundamentais são:**

- __`int`:__ Números inteiros como `3`, `-7`, `42`.
- __`float`:__ Números com ponto decimal como `3.14`, `-0.5`, `2.0`.
- __`str`:__ Sequências de caracteres (strings) como `"Olá"`, `'Python'`.

---

# 3.2. Operadores Aritméticos

Operadores são símbolos que representam operações. Além dos operadores matemáticos tradicionais, o Python usa alguns operadores importantes:

- __`+` (Adição):__ 
- __`-` (Subtração):__ 
- __`*` (Multiplicação):__ 
- __`/` (Divisão):__  (Sempre retorna um tipo `float`)
- __`**` (Exponenciação):__ 
- __`//` (Divisão Inteira):__ (retorna o quociente inteiro, arredondando para baixo)
- __`%` (Módulo):__ Retorna o resto da divisão inteira

---

# 3.3. Ordem das Operações

Quando uma expressão contém vários operadores, o Python segue a **ordem padrão da matemática**, conhecida pela sigla **PEMDAS**:

1. **Parênteses**
2. **Exponenciação**
3. **Multiplicação e Divisão**
4. **Adição e Subtração**

> Usar parênteses é recomendado, eles tornam o código mais legível e evitam ambiguidades.

---

# 3.4. Operações com Strings

Strings são sequências de caracteres e possuem **operações e métodos próprios** para manipulação de texto, fundamentais para processamento de dados e entrada de informações.

As principais operações são:

* **Combinar (concatenação)**

  O operador `+` une strings, criando uma nova sequência.

  > *Exemplo:* `"Olá" + " Mundo"` → `"Olá Mundo"`

* **Dividir (split)**

  O método `split()` quebra uma string em partes menores com base em um separador.

  > *Muito usado para processar textos, linhas de arquivos e entradas do usuário.*

* **Substituir (replace)**

  O método `replace()` troca partes da string por outras.

  > *Útil para limpeza de dados e padronização de texto.*

* **Extrair (fatiamento / slicing)**

  O fatiamento permite extrair partes específicas de uma string usando índices.

  > *Strings são indexadas e permitem acesso controlado a subconjuntos de caracteres.*

* **Alterar maiúsculas/minúsculas**

  * `upper()` — converte para maiúsculas
  * `lower()` — converte para minúsculas

  > *Essencial para comparações consistentes e normalização de dados.*

* **Verificar conteúdo**

  * `in` — verifica se um trecho está contido na string
  * `startswith()` — verifica se a string começa com determinado padrão
  * `endswith()` — verifica se a string termina com determinado padrão

> Strings são **imutáveis**: nenhuma dessas operações altera a string original; todas produzem novos valores.


---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre tipos de dados e operações, confira os seguintes recursos:

 [Python for Beginners: Data Types - The New Stack](https://thenewstack.io/python-for-beginners-data-types/)
 [String methods in Python are easy! - Bro Code](https://youtu.be/tb6EYiHtcXU?si=ZQHcEYagaH2iMJ0k)
 [Python Tutorial: Strings - Working with Textual Data - Corey Schafer](https://youtu.be/k9TUPpGqYTo?si=c4rdceQ1iH4blUWJ)

```quiz
- tipo: single
  pergunta: Sabendo que o Python segue a ordem PEMDAS, qual é o resultado da expressão matemática `10 + 2 * 5`?
  opcoes:
    - texto: "60"
      correta: false
      explicacao: Incorreto. Isso aconteceria se a adição fosse executada primeiro, o que quebra a precedência matemática.
    - texto: "20"
      correta: true
      explicacao: Perfeito! A multiplicação (`2 * 5 = 10`) tem prioridade sobre a adição, resultando depois em `10 + 10 = 20`.
      explicacao_erro: Lembre-se da regra PEMDAS. A operação de multiplicação (`*`) deve ser processada obrigatoriamente antes da adição (`+`).
    - texto: "14"
      correta: false
      explicacao: Incorreto. O interpretador não realiza os cálculos de forma aleatória. Multiplicações vêm antes de somas.
    - texto: "O Python retornará um erro de sintaxe."
      correta: false
      explicacao: A expressão é perfeitamente válida e numérica, sendo processada sem problemas pelo interpretador.

- tipo: single
  pergunta: O que significa dizer que as strings em Python são "imutáveis"?
  opcoes:
    - texto: Que uma vez criada, os métodos chamados nela criam novos textos, mantendo a string original inalterada na memória.
      correta: true
      explicacao: Exato! Métodos como `.replace()` ou `.upper()` geram uma nova string como resposta, sem modificar a variável original.
      explicacao_erro: Imutabilidade significa que o objeto original não pode ser modificado diretamente. Qualquer operação de texto gera um novo resultado limpo na memória.
    - texto: Que não é possível concatenar ou somar textos usando o operador `+`.
      correta: false
      explicacao: A concatenação é permitida, mas ela gera uma terceira string nova, mantendo as originais intactas.
    - texto: Que variáveis de texto só podem receber atribuições uma única vez no script.
      correta: false
      explicacao: A variável em si pode ser reatribuída com um novo valor, mas o objeto caractere antigo na memória não se modifica.
    - texto: Que elas não aceitam letras maiúsculas através de métodos.
      correta: false
      explicacao: Métodos alteram a caixa do texto de saída perfeitamente, o conceito de imutabilidade se refere à preservação do dado original na memória.