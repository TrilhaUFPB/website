---
title: 7. Depuração
description: Compreender o que são os tipos de erros de código, saber como identificar esses erros e como corrigí-los
category: Programação
order: 7
---

Programar exige lidar com erros, chamados de _bugs_. O processo de encontrá-los e corrigi-los é a depuração (_debugging_).

# 7.1. Erro de Sintaxe
Problemas na estrutura do código que impedem o programa de rodar.

__Exemplo de erro de sintaxe:__
```python
def soma(a, b) # Erro
    return a + b
```
Erro: falta dos dois pontos (:) após os parâmetros.
___
# 7.2. Erro de Tempo de Execução (Exceção)
O programa começa a rodar, mas algo inesperado acontece e ele para.

__Exemplo de erro de tempo de execução:__
```python
x = 10
y = 0
print(x / y) # Erro
```
Erro: divisão por zero (ZeroDivisionError).
___
# 7.3. Erro de Lógica
O programa roda sem erros, mas produz um resultado incorreto.

__Exemplo de erro de lógica:__
```python
def media(a, b):
    return a + b / 2
print(media(4, 6))  # Resultado errado
```
O código roda, mas a lógica está incorreta. O correto seria:
```python
return (a + b) / 2
```

# 7.4. Dica final
Pense no computador como um funcionário extremamente __rápido e preciso__, mas __sem empatia ou discernimento__. Ele não entende o que você quis dizer, apenas o que você escreveu.

1. Observar o problema (resultado inesperado ou erro).
2. Formular uma hipótese sobre o que está errado.
3. Alterar o código (experimento).
4. Testar novamente e verificar se a hipótese estava correta.
5. Esse processo transforma erros em aprendizado e é uma das habilidades mais importantes na programação.