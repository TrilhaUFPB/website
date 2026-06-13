---
title: 7. Erros e Exceções
description: Compreender o que são os tipos de erros de código, saber como identificá-los, corrigi-los e como usar try/except para tratá-los com segurança.
category: Programação
order: 7
---
## Sumário

- [7.1. Tipos de Erros](#7.1-Tipos-de-Erros)
- [7.2. Tratamento de Erros: try/except](#7.2-Tratamento-de-Erros-try/except)
- [1.3. Modos de Execução: Interativo vs. Script](#13-modos-de-execucao-interativo-vs-script)
- [1.4. Execução no Navegador](#14-execucao-no-navegador)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

Programar é, em grande parte, lidar com erros. Qualquer programador, do iniciante ao experiente, comete erros o tempo todo. A diferença está em saber **identificar, entender e corrigir** esses erros com rapidez.

Esse processo se chama **depuração** (_debugging_). O nome vem de _bug_, que é como chamamos um erro em um programa. A lenda conta que, em 1947, uma das primeiras computadoras do mundo parou de funcionar porque um inseto (bug, em inglês) ficou preso dentro do hardware. Desde então, o termo ficou.

Ao longo desse módulo você vai ver que os erros são seus aliados: eles te dizem exatamente o que está errado e onde. Aprender a lê-los é uma das habilidades mais valiosas da programação.

# 7.1. Tipos de Erros

Existem três categorias principais de erros em Python. Conhecê-las ajuda a identificar rapidamente onde está o problema.

## 7.1.1. Erro de Sintaxe

O erro de sintaxe acontece quando o Python não consegue nem começar a executar o código, porque a estrutura está incorreta. É como escrever uma frase em português com a gramática completamente errada: o leitor não consegue entender.

**Exemplo:**

```python
def soma(a, b)  # Erro: falta o ":"
    return a + b
```

O Python vai recusar esse código antes de rodar qualquer linha. A mensagem de erro vai indicar exatamente a linha e o caractere do problema:

```
SyntaxError: expected ':'
```

Erros de sintaxe são, na prática, os mais fáceis de corrigir porque o Python aponta exatamente onde está o problema.

## 7.1.2. Erro de Tempo de Execução (Exceção)

Esse tipo de erro acontece enquanto o programa está rodando. O código está sintaticamente correto, mas algo inesperado ocorre durante a execução e o programa para abruptamente.

**Exemplo:**

```python
x = 10
y = 0
print(x / y)  # Erro: divisão por zero
```

O Python vai rodar o código normalmente até chegar nessa linha, e então vai parar e exibir:

```
ZeroDivisionError: division by zero
```

Outros exemplos comuns de exceções:

- `NameError` — tentar usar uma variável que não foi definida
- `TypeError` — tentar fazer uma operação com tipos incompatíveis (ex.: somar um número com uma string)
- `IndexError` — tentar acessar um índice que não existe em uma lista
- `FileNotFoundError` — tentar abrir um arquivo que não existe

Esses erros são muito comuns e fazem parte do dia a dia do programador. A boa notícia é que o Python nos dá ferramentas para **tratar** esses erros de forma elegante, sem deixar o programa travar. Vamos ver isso na seção 7.2.

## 7.1.3. Erro de Lógica

Esse é o mais traiçoeiro dos três. O programa roda sem nenhum erro, mas o **resultado está errado**. O Python não consegue detectar esse tipo de problema porque, para ele, o código está perfeito. O problema é que a lógica do programador está incorreta.

**Exemplo:**

```python
def media(a, b):
    return a + b / 2  # Erro de lógica

print(media(4, 6))  # Exibe 7.0, mas deveria ser 5.0
```

O código roda sem reclamar. Mas a divisão está sendo aplicada apenas ao `b`, e não à soma. O correto seria:

```python
def media(a, b):
    return (a + b) / 2
```

Para encontrar erros de lógica, é preciso **testar o programa com valores que você já sabe a resposta**. Se o resultado esperado for `5.0` e o programa retornar `7.0`, algo está errado na lógica, e você precisa revisar o raciocínio passo a passo.

# 7.2. Tratamento de Erros: try/except

Vimos que erros de tempo de execução (exceções) podem travar o programa de forma abrupta. Mas imagine um programa que lê um arquivo do usuário: se o arquivo não existir, faz sentido o programa parar completamente? Provavelmente não. O ideal seria exibir uma mensagem amigável e deixar o usuário tentar novamente.

É para isso que existe o `try/except`: ele permite que você **antecipe** possíveis erros e decida o que fazer quando eles acontecerem, sem deixar o programa travar.

## 7.2.1. A estrutura básica

Você já conhece as estruturas condicionais: com `if/else`, você verifica uma condição _antes_ de executar o código, e decide qual caminho seguir dependendo do resultado.

O `try/except` tem uma ideia parecida, mas com uma diferença importante: em vez de verificar uma condição antes, você deixa o código _tentar_ executar — e, se um erro acontecer no meio do caminho, o `except` entra em ação. É como dizer ao Python: **"tente fazer isso; se der errado, faça aquilo"**.

```
if/else     → verifica uma condição antes de agir
try/except  → tenta executar e reage se der errado
```

A sintaxe em código fica assim:

```python
try:
    # código que pode gerar um erro
except:
    # o que fazer se um erro acontecer
```

O Python tenta executar o bloco `try`. Se um erro ocorrer em qualquer linha dentro dele, a execução pula imediatamente para o bloco `except`. Se nenhum erro ocorrer, o `except` é ignorado completamente.

**Exemplo prático:**

Imagine que você pede ao usuário para digitar um número. Se ele digitar letras, o `int()` vai gerar um erro. Sem tratamento, o programa trava:

```python
numero = int(input("Digite um número: "))  # Se o usuário digitar "abc", o programa trava
print(f"O dobro é: {numero * 2}")
```

Com `try/except`, o programa lida com a situação de forma elegante:

```python
try:
    numero = int(input("Digite um número: "))
    print(f"O dobro é: {numero * 2}")
except:
    print("Isso não é um número válido. Por favor, tente novamente.")
```

Agora, se o usuário digitar "abc", o programa exibe uma mensagem amigável em vez de travar.

## 7.2.2. Capturando erros específicos

É uma boa prática capturar o tipo específico de erro que você espera, em vez de capturar qualquer erro com um `except` genérico. Isso deixa o código mais claro e evita esconder erros inesperados.

```python
try:
    numero = int(input("Digite um número: "))
    resultado = 100 / numero
    print(f"100 dividido por {numero} é {resultado}")
except ValueError:
    print("Erro: você precisa digitar um número inteiro.")
except ZeroDivisionError:
    print("Erro: não é possível dividir por zero.")
```

Nesse exemplo, tratamos dois erros diferentes:

- `ValueError` é lançado quando tentamos converter para `int` algo que não é um número (como "abc")
- `ZeroDivisionError` é lançado quando tentamos dividir por zero

Cada erro recebe uma mensagem específica, o que torna o programa muito mais fácil de usar.

## 7.2.3. O bloco `else`

O bloco `else` é executado **apenas quando nenhum erro aconteceu** no bloco `try`. É uma boa forma de separar o código "de sucesso" do código de tratamento de erros:

```python
try:
    idade = int(input("Digite sua idade: "))
except ValueError:
    print("Valor inválido. Por favor, digite um número inteiro.")
else:
    print(f"Você tem {idade} anos.")
    if idade >= 18:
        print("Você é maior de idade.")
    else:
        print("Você é menor de idade.")
```

Se a conversão para `int` funcionar, o bloco `else` roda e exibe as informações sobre a idade. Se der erro, apenas a mensagem de erro é exibida. O `else` torna o fluxo do código mais legível.

## 7.2.4. O bloco `finally`

O bloco `finally` é executado **sempre**, independente de ter ocorrido um erro ou não. É muito útil para tarefas de limpeza que precisam acontecer de qualquer jeito, como fechar um arquivo ou encerrar uma conexão.

```python
try:
    arquivo = open("dados.txt", "r")
    conteudo = arquivo.read()
    print(conteudo)
except FileNotFoundError:
    print("Arquivo não encontrado!")
finally:
    print("Operação de leitura finalizada.")
```

Mesmo que o arquivo não exista e o `except` seja executado, o `finally` roda ao final. Isso garante que certas ações aconteçam **sempre**, não importa o resultado.

## 7.2.5. Lançando erros com `raise`

Você também pode lançar seus próprios erros quando uma condição não é atendida. Isso é útil quando você quer garantir que uma função receba os dados corretos:

```python
def calcular_raiz_quadrada(numero):
    if numero < 0:
        raise ValueError("Não é possível calcular a raiz quadrada de um número negativo.")
    return numero ** 0.5

try:
    resultado = calcular_raiz_quadrada(-9)
except ValueError as erro:
    print(f"Erro: {erro}")
```

Saída:
```
Erro: Não é possível calcular a raiz quadrada de um número negativo.
```

O `raise` interrompe a execução e lança o erro que você escolher. O `as erro` dentro do `except` captura a mensagem de erro para que você possa exibi-la.

## 7.2.6. Exemplo completo

Vamos juntar tudo em um exemplo prático: um programa que pede ao usuário para digitar dois números e exibe o resultado da divisão, tratando todos os possíveis problemas:

```python
def dividir(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Os dois valores precisam ser números.")
    if b == 0:
        raise ValueError("O divisor não pode ser zero.")
    return a / b

try:
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
    resultado = dividir(num1, num2)
except ValueError as erro:
    print(f"Valor inválido: {erro}")
except TypeError as erro:
    print(f"Tipo inválido: {erro}")
else:
    print(f"Resultado: {resultado:.2f}")
finally:
    print("Obrigado por usar a calculadora!")
```

Esse programa:

1. Tenta converter as entradas do usuário para números com `float()`
2. Chama a função `dividir()`, que verifica as condições antes de calcular
3. Trata `ValueError` (divisão por zero ou entrada inválida) e `TypeError` com mensagens específicas
4. Usa `else` para exibir o resultado apenas quando tudo funcionou
5. Usa `finally` para sempre despedir o usuário, independente do resultado

# 7.3. A mentalidade do depurador

Independente do tipo de erro, o processo de corrigi-lo segue sempre uma lógica parecida:

1. **Observar** o problema: o que está acontecendo de errado?
2. **Ler a mensagem de erro**: o Python costuma indicar o tipo de erro, a linha e uma descrição.
3. **Formular uma hipótese**: por que isso pode estar acontecendo?
4. **Alterar o código** e testar novamente.
5. **Repetir** até o problema estar resolvido.

Pense no computador como um funcionário extremamente **rápido e preciso**, mas **sem empatia ou discernimento**. Ele não entende o que você quis dizer, apenas o que você escreveu. Cada mensagem de erro é um feedback valioso: ele está te dizendo exatamente o que deu errado.

Com o tempo, você vai se familiarizar com os erros mais comuns, vai ler as mensagens mais rápido, e o que hoje parece confuso vai se tornar natural. Erros fazem parte do processo, e lidar bem com eles é uma das habilidades que separa um bom programador de um ótimo programador.

---
## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre erros e tratamento de exceções em Python, confira os seguintes recursos:

- [Python Try Except - W3Schools](https://www.w3schools.com/python/python_try_except.asp)
## quiz
```quiz
- tipo: single
  pergunta: O que melhor define um programa de computador?
  opcoes:
    - texto: Uma sequência de instruções para executar uma operação de computação
      correta: true
      explicacao: Exato! Um programa é composto por instruções que orientam o computador na execução de tarefas.
      explicacao_erro: Um programa é definido como uma sequência de instruções que especifica como executar uma operação de computação.
    - texto: Um conjunto de arquivos armazenados no computador
      correta: false
      explicacao: Arquivos são dados persistidos em disco. Um programa é uma sequência de instruções, não um arquivo em si.
    - texto: Um dispositivo responsável por processar dados
      correta: false
      explicacao: Isso descreve o hardware, como o processador (CPU). Um programa é software, não um componente físico.
    - texto: Uma conexão entre o computador e a internet
      correta: false
      explicacao: Isso se refere a redes de comunicação. Um programa existe independentemente de qualquer conexão.

- tipo: single
  pergunta: Qual característica descreve melhor o Python?
  opcoes:
    - texto: É uma linguagem compilada que precisa ser traduzida integralmente antes da execução
      correta: false
      explicacao: Isso descreve linguagens como C ou C++. O Python não exige uma etapa explícita de compilação.
    - texto: É uma linguagem de baixo nível voltada para hardware
      correta: false
      explicacao: Linguagens de baixo nível, como Assembly, interagem diretamente com o hardware. O Python é de alto nível.
    - texto: É uma linguagem interpretada executada pelo interpretador
      correta: true
      explicacao: Correto! O Python é tradicionalmente tratado como uma linguagem interpretada, executada linha por linha.
      explicacao_erro: O Python é uma linguagem de alto nível classificada como interpretada. O interpretador lê e executa o código diretamente, sem etapa de compilação explícita.
    - texto: É uma linguagem que não precisa de interpretador nem compilador
      correta: false
      explicacao: Todo código precisa ser processado de alguma forma. O Python usa um interpretador para executar o código.

- tipo: single
  pergunta: Qual é uma vantagem do modo interativo do Python?
  opcoes:
    - texto: Permite executar programas maiores de forma mais eficiente
      correta: false
      explicacao: O modo interativo é indicado para trechos pequenos. Para programas maiores, o modo script é o adequado.
    - texto: Exibe automaticamente o conteúdo de qualquer arquivo .py
      correta: false
      explicacao: O modo interativo não lê arquivos automaticamente. Ele aguarda comandos digitados diretamente no prompt.
    - texto: Permite testar pequenos trechos de código e ver o resultado imediatamente
      correta: true
      explicacao: Exatamente! O modo interativo é ideal para experimentação e aprendizado rápido.
      explicacao_erro: O modo interativo permite executar comandos e ver o resultado na hora, sem precisar salvar um arquivo. É ideal para testar pequenos trechos de código.
    - texto: Elimina a necessidade do comando print()
      correta: false
      explicacao: O print() ainda é necessário em scripts. No modo interativo, expressões simples exibem resultado, mas o print() continua sendo usado.
```