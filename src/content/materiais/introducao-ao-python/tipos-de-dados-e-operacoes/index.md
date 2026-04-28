---
title: Tipos de Dados e Operações
description: Compreender o que são valores, como o Python classifica dados, quais operações podem ser feitas sobre eles e como essas operações são avaliadas
category: Programação
order: 3
---

Em programação, **todo dado** é um **valor** e pertence a um **tipo**.

---

### 1. Valores e Tipos

Um **valor** é uma das coisas mais básicas que um programa manipula, como números e textos.
Cada valor pertence a um **tipo**, que define quais operações podem ser realizadas sobre ele.

Os tipos fundamentais são:

- _int:_ Números inteiros, como `3`, `-7`, `42`
- _float:_ Números com ponto decimal, como `3.14`, `-0.5`
- _str:_ Sequências de caracteres (strings), como `"Olá"` ou `"Python"`

> O tipo de um valor determina **como o computador interpreta e manipula aquele dado**. Misturar tipos sem cuidado é um dos erros mais comuns para iniciantes. 

---

### 2. Operadores Aritméticos

Operadores são símbolos que representam operações. Além dos operadores matemáticos tradicionais, o Python usa alguns operadores importantes:

* `+`: Adição
* `-`: Subtração
* `*`: Multiplicação
* `/`: Divisão (sempre retorna um `float`)
* `**`: Exponenciação
* `//`: Divisão inteira (retorna o quociente inteiro, arredondando para baixo)
* `%`: Operador módulo (retorna o resto da divisão)

Esses operadores permitem expressar cálculos de forma legível, mantendo proximidade com a notação matemática tradicional.

---

### 3. Ordem das Operações

Quando uma expressão contém vários operadores, o Python segue a **ordem padrão da matemática**, conhecida pela sigla **PEMDAS**:

1. **Parênteses**
2. **Exponenciação**
3. **Multiplicação e Divisão**
4. **Adição e Subtração**

> Usar parênteses é recomendado, eles tornam o código mais legível e evitam ambiguidades.

---

### 4. Operações com Strings

Strings são sequências de caracteres e possuem **operações e métodos próprios** para manipulação de texto, fundamentais para processamento de dados e entrada de informações.

As principais operações são:

* **Combinar (concatenação)**

  O operador `+` une strings, criando uma nova sequência.

  > Exemplo: `"Olá" + " Mundo"` → `"Olá Mundo"`

* **Dividir (split)**

  O método `split()` quebra uma string em partes menores com base em um separador.

  > Muito usado para processar textos, linhas de arquivos e entradas do usuário.

* **Substituir (replace)**

  O método `replace()` troca partes da string por outras.

  > Útil para limpeza de dados e padronização de texto.

* **Extrair (fatiamento / slicing)**

  O fatiamento permite extrair partes específicas de uma string usando índices.

  > Strings são indexadas e permitem acesso controlado a subconjuntos de caracteres.

* **Alterar maiúsculas/minúsculas**

  * `upper()` — converte para maiúsculas
  * `lower()` — converte para minúsculas

  > Essencial para comparações consistentes e normalização de dados.

* **Verificar conteúdo**

  * `in` — verifica se um trecho está contido na string
  * `startswith()` — verifica se a string começa com determinado padrão
  * `endswith()` — verifica se a string termina com determinado padrão

> Strings são **imutáveis**: nenhuma dessas operações altera a string original; todas produzem novos valores.

---
## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre tipos de dados e operações, confira os seguintes recursos:

- [Python for Beginners: Data Types - The New Stack](https://thenewstack.io/python-for-beginners-data-types/)
- [String methods in Python are easy! - Bro Code](https://youtu.be/tb6EYiHtcXU?si=ZQHcEYagaH2iMJ0k)
- [Python Tutorial for Beginners 2: Strings - Working with Textual Data - Corey Schafer](https://youtu.be/k9TUPpGqYTo?si=c4rdceQ1iH4blUWJ)