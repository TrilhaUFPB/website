---
title: Lógica de Programação
description: Fundamentos de lógica e pensamento computacional
category: Introdução
order: 2
---

# Lógica de Programação

A lógica de programação é a base de todo desenvolvimento de software. Entender como estruturar seu pensamento de forma lógica é essencial para escrever bons programas.

## Pensamento Computacional

O pensamento computacional é uma forma de resolver problemas que envolve:

### Decomposição

Dividir um problema grande em partes menores e mais gerenciáveis.

**Exemplo:** Para criar um sistema de cadastro de usuários:
1. Criar formulário de entrada
2. Validar dados inseridos
3. Salvar no banco de dados
4. Mostrar confirmação

### Reconhecimento de Padrões

Identificar similaridades e padrões em problemas.

**Exemplo:** Calcular a área de diferentes formas geométricas segue o mesmo padrão: aplicar uma fórmula matemática.

### Abstração

Focar no que é importante e ignorar detalhes irrelevantes.

**Exemplo:** Ao criar um sistema de pagamento, não precisamos saber como o banco processa internamente - apenas a interface que ele fornece.

### Algoritmos

Criar uma sequência de passos para resolver o problema.

## Operadores Lógicos

### Operadores de Comparação

| Operador | Significado | Exemplo |
|----------|-------------|---------|
| `==` | Igual a | `5 == 5` → `True` |
| `!=` | Diferente de | `5 != 3` → `True` |
| `>` | Maior que | `5 > 3` → `True` |
| `<` | Menor que | `5 < 3` → `False` |
| `>=` | Maior ou igual | `5 >= 5` → `True` |
| `<=` | Menor ou igual | `3 <= 5` → `True` |

### Operadores Booleanos

#### AND (E)

Retorna `True` apenas se **ambas** as condições forem verdadeiras.

```python
idade = 25
tem_carteira = True

pode_dirigir = idade >= 18 and tem_carteira
print(pode_dirigir)  # True
```

| A | B | A AND B |
|---|---|---------|
| True | True | True |
| True | False | False |
| False | True | False |
| False | False | False |

#### OR (OU)

Retorna `True` se **pelo menos uma** condição for verdadeira.

```python
eh_feriado = False
eh_fim_de_semana = True

pode_descansar = eh_feriado or eh_fim_de_semana
print(pode_descansar)  # True
```

| A | B | A OR B |
|---|---|--------|
| True | True | True |
| True | False | True |
| False | True | True |
| False | False | False |

#### NOT (NÃO)

Inverte o valor lógico.

```python
esta_chovendo = True
pode_sair = not esta_chovendo
print(pode_sair)  # False
```

| A | NOT A |
|---|-------|
| True | False |
| False | True |

## Estruturas Condicionais

### If/Else Simples

```python
nota = 7

if nota >= 7:
    print("Aprovado!")
else:
    print("Reprovado")
```

### If/Elif/Else

Para múltiplas condições:

```python
nota = 8.5

if nota >= 9:
    conceito = "A"
elif nota >= 7:
    conceito = "B"
elif nota >= 5:
    conceito = "C"
else:
    conceito = "D"

print(f"Seu conceito é: {conceito}")
```

### Condicionais Aninhadas

```python
idade = 20
tem_ingresso = True

if idade >= 18:
    if tem_ingresso:
        print("Pode entrar no evento")
    else:
        print("Compre seu ingresso")
else:
    print("Apenas maiores de 18 anos")
```

## Estruturas de Repetição

### For Loop

Ideal quando você sabe quantas vezes quer repetir:

```python
# Contando de 1 a 5
for i in range(1, 6):
    print(i)

# Iterando sobre uma lista
frutas = ["maçã", "banana", "laranja"]
for fruta in frutas:
    print(f"Eu gosto de {fruta}")
```

### While Loop

Ideal quando a repetição depende de uma condição:

```python
# Contagem regressiva
contador = 5
while contador > 0:
    print(contador)
    contador -= 1
print("Lançar!")

# Com condição de saída
senha_correta = "trilha123"
tentativas = 3

while tentativas > 0:
    senha = input("Digite a senha: ")
    if senha == senha_correta:
        print("Acesso permitido!")
        break
    else:
        tentativas -= 1
        print(f"Senha incorreta. {tentativas} tentativas restantes.")
```

### Break e Continue

```python
# Break - interrompe o loop
for i in range(10):
    if i == 5:
        break
    print(i)  # Imprime 0, 1, 2, 3, 4

# Continue - pula para próxima iteração
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # Imprime apenas ímpares: 1, 3, 5, 7, 9
```

## Funções

Funções são blocos de código reutilizáveis:

### Definindo Funções

```python
def saudacao(nome):
    return f"Olá, {nome}!"

# Usando a função
mensagem = saudacao("Maria")
print(mensagem)  # Olá, Maria!
```

### Funções com Múltiplos Parâmetros

```python
def calcular_media(nota1, nota2, nota3):
    soma = nota1 + nota2 + nota3
    media = soma / 3
    return media

resultado = calcular_media(7, 8, 9)
print(f"Média: {resultado}")  # Média: 8.0
```

### Parâmetros Opcionais

```python
def saudacao(nome, saudacao="Olá"):
    return f"{saudacao}, {nome}!"

print(saudacao("João"))           # Olá, João!
print(saudacao("João", "Oi"))     # Oi, João!
```

## Exercícios Práticos

### Exercício 1: Verificador de Número Par

```python
def eh_par(numero):
    return numero % 2 == 0

# Teste
print(eh_par(4))   # True
print(eh_par(7))   # False
```

### Exercício 2: Calculadora Simples

```python
def calculadora(a, b, operacao):
    if operacao == "+":
        return a + b
    elif operacao == "-":
        return a - b
    elif operacao == "*":
        return a * b
    elif operacao == "/":
        if b != 0:
            return a / b
        else:
            return "Erro: divisão por zero"
    else:
        return "Operação inválida"

# Testes
print(calculadora(10, 5, "+"))  # 15
print(calculadora(10, 5, "/"))  # 2.0
```

### Exercício 3: FizzBuzz

Um clássico da programação:

```python
def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

fizzbuzz(15)
```

## Dicas para Desenvolver Lógica

1. **Pratique diariamente**: Resolva pelo menos um problema por dia
2. **Desenhe fluxogramas**: Visualize o fluxo do programa
3. **Escreva pseudocódigo**: Antes de codificar, escreva em português
4. **Quebre problemas**: Divida problemas grandes em partes menores
5. **Leia código de outros**: Aprenda com diferentes abordagens
6. **Não desista**: Problemas difíceis exigem persistência

## Recursos para Praticar

- [Exercism](https://exercism.org) - Exercícios com mentoria
- [HackerRank](https://hackerrank.com) - Desafios de programação
- [URI Online Judge](https://beecrowd.com.br) - Problemas em português
- [Codewars](https://codewars.com) - Katas de programação

---

> "A lógica é o início da sabedoria, não o fim." - Spock

Continue praticando e você verá que a lógica de programação se tornará natural!
