---
title: 7. Erros e Exceções
description: Entender a diferença entre erros, bugs e exceções, saber como ler mensagens de erro, tratar exceções com try/except e depurar bugs de forma sistemática.
category: Programação
order: 7
---

Programar é, em grande parte, lidar com problemas no código. Qualquer programador, do iniciante ao experiente, se depara com eles o tempo todo. O que muda com a experiência não é a frequência com que eles aparecem — é a velocidade com que você os resolve.

Nessa aula você vai aprender duas habilidades distintas, mas complementares:

- **Identificar e entender erros**: quando o Python detecta um problema, ele para o programa e exibe uma mensagem de erro com o tipo do problema, a linha e uma descrição. Saber ler essas mensagens é a habilidade mais básica — e mais útil — de quem está começando.

- **Tratar erros com segurança** (_error handling_): nem todo erro deve travar o programa. Com `try/except`, você antecipa situações problemáticas e decide o que fazer quando elas ocorrem, mantendo o programa em execução de forma controlada.

Existe ainda um terceiro tipo de problema, que não gera nenhuma mensagem: o **bug**. O programa executa normalmente, mas produz um resultado errado. Bugs são silenciosos — o Python não sabe que existe um problema. Encontrá-los exige investigação, e esse processo se chama **depuração** (_debugging_). A lenda conta que, em 1947, uma das primeiras computadoras do mundo parou de funcionar porque um inseto (_bug_, em inglês) ficou preso dentro do hardware. Desde então, o termo ficou.

Vamos explorar cada um desses cenários ao longo dessa aula.

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

Erros de sintaxe são, na prática, os mais fáceis de corrigir porque o Python os detecta antes de executar qualquer linha do programa, apontando exatamente onde está o problema.

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

## 7.1.3. Bug (Erro de Lógica)

Esse é o mais traiçoeiro dos três — e é o que tecnicamente merece o nome de **bug**. O programa roda sem nenhuma mensagem de erro, mas o **resultado está errado**. O Python não consegue detectar esse tipo de problema porque, para ele, o código está sintaticamente correto e executou sem exceções. O problema está na lógica do programador, não na estrutura do código.

> **Erro vs. Bug:** nos tipos anteriores (sintaxe e execução), o Python detecta o problema e te avisa com uma mensagem clara dizendo o que e onde. No bug, o Python não tem a menor ideia de que algo está errado — ele executou exatamente o que você mandou. Por isso bugs são os mais perigosos: eles não avisam que existem.

**Exemplo:**

```python
def media(a, b):
    return a + b / 2  # Bug: divisão aplicada só no b

print(media(4, 6))  # Exibe 7.0, mas deveria ser 5.0
```

O código roda sem reclamar. Mas a divisão está sendo aplicada apenas ao `b`, e não à soma. O correto seria:

```python
def media(a, b):
    return (a + b) / 2
```

Para encontrar bugs, é preciso **testar o programa com valores que você já sabe a resposta**. Se o resultado esperado for `5.0` e o programa retornar `7.0`, algo está errado na lógica, e você precisa revisar o raciocínio passo a passo.

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

# 7.3. A mentalidade do caçador de bugs

Para erros de sintaxe e exceções, o trabalho é relativamente direto: o Python já aponta o tipo do erro, a linha e uma descrição. Você lê a mensagem, entende o problema e corrige.

**Bugs são outra história.** Como o Python não detecta o problema, você precisa agir como um detetive: o programa "funciona", mas algo está errado, e cabe a você descobrir onde e por quê. Esse processo de investigar e corrigir bugs é o que chamamos de **depuração** (_debugging_).

O método mais eficaz segue uma lógica parecida com o método científico:

1. **Reproduzir** o problema: execute o programa com entradas cujo resultado correto você já conhece de antemão.
2. **Observar** o comportamento: o que o programa retornou? Em que difere do esperado?
3. **Formular uma hipótese**: qual parte do código poderia estar causando esse resultado incorreto?
4. **Testar a hipótese**: adicione `print()` em pontos estratégicos para inspecionar o valor das variáveis durante a execução, ou altere o código e observe o efeito.
5. **Repetir** até encontrar a causa raiz e corrigi-la.

Pense no computador como um funcionário extremamente **rápido e preciso**, mas **sem empatia ou discernimento**. Ele não entende o que você _quis_ dizer, apenas o que você _escreveu_. Se o resultado está errado, a lógica que você expressou no código está errada — mesmo que na sua cabeça fizesse todo o sentido.

Quanto mais você programar, mais rápido vai encontrar bugs. Você vai desenvolver intuição para os padrões mais comuns, vai saber onde olhar primeiro, e o que hoje parece difícil vai se tornar natural. Saber depurar bem é uma das habilidades que separa um bom programador de um ótimo programador.

---
## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre erros e tratamento de exceções em Python, confira os seguintes recursos:

- [Python Try Except - W3Schools](https://www.w3schools.com/python/python_try_except.asp)
