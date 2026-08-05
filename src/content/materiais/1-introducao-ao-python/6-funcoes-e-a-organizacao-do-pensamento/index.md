---
title: 6. Funções e a Organização do Pensamento
description: Compreender o que é uma função, a diferença entre parâmetros e argumentos e a diferença entre funções com resultado e funções nulas
category: Programação
order: 6
---

## Sumário

- [6.1. Definição e Chamada de Funções](#61-definicao-e-chamada-de-funcoes)
- [6.2. Fluxo de Execução](#62-fluxo-de-execucao)
- [6.3. Parâmetros e Argumentos](#63-parametros-e-argumentos)
- [6.4. Variáveis e Parâmetros são Locais](#64-variaveis-e-parametros-sao-locais)
- [6.5. Funções com Resultado vs. Funções Nulas](#65-funcoes-com-resultado-vs-funcoes-nulas)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---
> No contexto da programação, uma função é uma sequência nomeada de instruções que executa uma operação de computação.

---
# 6.1. Definição e Chamada de Funções

Para criar uma nova função, utilizamos a palavra-chave _def_, definindo um cabeçalho (que termina em dois pontos) e um corpo indentado.

- __Chamada:__ Uma vez definida, a função só é executada quando é chamada pelo nome seguido de parênteses.

- __Encapsulamento:__ Colocar código dentro de uma função é chamado de encapsulamento. Isso ajuda a organizar o programa, dar nome a uma ideia e funciona como uma forma de documentação.

__Exemplo de função:__
```python-run 
def saudacao():
    print("Olá, mundo!")

# A função só executa quando é chamada
saudacao()
```
---
# 6.2. Fluxo de Execução

Para entender como um programa funciona, é preciso seguir a ordem em que as instruções são executadas, chamada de _fluxo de execução_.

- A execução sempre começa na __primeira instrução__ do programa. 

- As definições de função não alteram o fluxo __até que a função seja chamada.__

Uma chamada de função funciona como um desvio. O fluxo “salta” para o corpo da função, executa suas instruções e depois retorna para continuar o programa.

Exemplo:
```python-run 
def mostrar_msg():
    print("Dentro da função")
print("Antes da função")
mostrar_msg()
print("Depois da função")
```
---
# 6.3. Parâmetros e Argumentos
As funções podem exigir valores para realizar seu trabalho.

- __Argumento:__ É o valor fornecido à função no momento da chamada.

- __Parâmetro:__ É o nome usado dentro da função para se referir ao valor recebido.

__Exemplo de parâmetro e argumento:__
```python-run
def print_twice(bruce):
    print(bruce)
    print(bruce)
print_twice('Spam')
```

Nesse exemplo:
_spam_ é o argumento e _bruce_ é o parâmetro.
---
# 6.4. Variáveis e Parâmetros são Locais
Variáveis criadas dentro de uma função são _locais_, ou seja, existem apenas enquanto a função está sendo executada. Quando a função termina, essas variáveis são destruídas.

__Exemplo de Erro (NameError):__
```python-run
def juntar_palavras(part1, part2):
    cat = part1 + part2
    return cat
juntar_palavras("py", "thon")
print(cat)  # ERRO
```

O erro ocorre porque cat é uma variável local da função e não existe fora dela.
---
# 6.5. Funções com Resultado vs. Funções Nulas
Nem toda função devolve um valor para quem a chamou.
Funções com Resultado
Utilizam a instrução return para devolver um valor.

__Exemplo de função com resultado:__
```python-run 
import math
def area_circulo(radius):
    return math.pi * radius**2
area = area_circulo(3)
print(area)
````

- __Funções Nulas:__ Executam uma ação, mas não retornam um valor útil. Nesse caso, o valor retornado é _None_.

__Exemplo de função nula:__
```python-run
def mostrar_nome(nome):
    print(nome)
resultado = mostrar_nome("Maria")
print(resultado)  # None
```

# Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre funções, confira os seguintes recursos:

[Funções em Python (def, parâmetros e retorno) - Python do Zero](https://www.youtube.com/watch?v=CSWx1Mr2xms)

```quiz
- tipo: single
  pergunta: O que é um parâmetro em uma função Python?
  opcoes:
    - texto: É o nome usado dentro da função para se referir ao valor recebido
      correta: true
      explicacao: Exato! O parâmetro é como a função "chama" o valor que recebe internamente.
      explicacao_erro: O parâmetro é o nome usado dentro da função para se referir ao valor recebido, não o valor em si que você passa na chamada.
    - texto: É o valor fornecido à função no momento da chamada
      correta: false
      explicacao: Isso descreve o argumento, não o parâmetro. O argumento é o valor que você passa; o parâmetro é o nome que a função usa para recebê-lo.
    - texto: É o resultado devolvido pela função após a execução
      correta: false
      explicacao: Isso descreve o valor de retorno, definido pela instrução return. O parâmetro é o nome da variável que recebe o valor passado à função.
    - texto: É o nome dado à função no momento em que ela é definida
      correta: false
      explicacao: Isso descreve o nome da função, definido após a palavra-chave def. O parâmetro fica entre os parênteses da definição.

- tipo: single
  pergunta: O que é um argumento em uma função Python?
  opcoes:
    - texto: É o valor fornecido à função no momento da chamada
      correta: true
      explicacao: Exato! O argumento é o valor concreto que você passa quando chama a função.
      explicacao_erro: O argumento é o valor fornecido na chamada da função, enquanto o parâmetro é o nome usado dentro dela para receber esse valor.
    - texto: É o nome usado dentro da função para se referir ao valor recebido
      correta: false
      explicacao: Isso descreve o parâmetro. O argumento é o valor real passado na chamada, como print_twice('Spam'), onde 'Spam' é o argumento.
    - texto: É uma variável criada automaticamente quando a função termina
      correta: false
      explicacao: Variáveis não são criadas quando a função termina, pelo contrário, elas são destruídas. O argumento é o valor passado no momento da chamada.
    - texto: É o nome da função definido com a palavra-chave def
      correta: false
      explicacao: Isso descreve o nome da função. O argumento é o valor que você passa entre os parênteses ao chamar a função.

- tipo: single
  pergunta: O que acontece com uma variável local quando a função termina?
  opcoes:
    - texto: Ela é destruída e deixa de existir fora da função
      correta: true
      explicacao: Exato! Variáveis locais existem apenas durante a execução da função. Tentar acessá-las fora causa um NameError.
      explicacao_erro: Variáveis locais são destruídas quando a função termina. Elas existem apenas dentro do escopo da função enquanto ela está sendo executada.
    - texto: Ela continua existindo e pode ser usada no resto do programa
      correta: false
      explicacao: Esse é um erro comum! Variáveis locais são destruídas ao fim da função. Tentar usá-las fora gera um NameError.
    - texto: Ela é automaticamente convertida em uma variável global
      correta: false
      explicacao: Isso não acontece automaticamente. Para que uma variável exista fora da função, ela precisaria ser declarada com a palavra-chave global, o que é considerado má prática.
    - texto: Ela é salva na memória para ser usada na próxima chamada da função
      correta: false
      explicacao: Variáveis locais não persistem entre chamadas. A cada nova chamada da função, elas são criadas do zero e destruídas ao fim.
```