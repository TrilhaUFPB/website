---
title: 5. Tuplas
description: 'Tuplas em Python: imutabilidade, operações e quando usar.'
category: Programação
order: 5
---

# 5.1.Tupla (Tuple)

## O que é uma Tupla? (Estrutura e Características)

Imagine uma tupla como uma **caixa lacrada**. Você coloca os objetos lá dentro, fecha a caixa e, a partir desse momento, ninguém mais pode mudar o que está lá dentro. Você pode olhar e usar o que está dentro, mas nunca trocar um objeto por outro.

## Características principais

- **Imutável:** Uma vez criada, ela não aceita adições, remoções ou alterações. É o que chamamos de dado "somente leitura".
- **Ordenada:** A ordem dos elementos é preservada rigorosamente desde a criação.
- **Sintaxe:** Utilizamos **parênteses** `()` para defini-las, com os itens separados por vírgulas.
- **Heterogênea:** Elas são flexíveis quanto ao conteúdo, permitindo misturar textos, números e booleanos na mesma estrutura.

### **Exercício de Fixação**

Analise as declarações abaixo. Qual delas é uma **Lista** e qual é uma **Tupla**?

```python
var_a = [10, 20, 30]
var_b = (10, 20, 30)

```

Se tentarmos fazer `var_b[0] = 50`, o que acontecerá?

---

# 5.2.Operações Principais

Diferente das listas, as operações em tuplas são focadas em leitura e consulta, já que a estrutura é fixa.

## Acesso por Índice

Para buscar um valor específico, utilizamos o número da posição (índice) entre colchetes logo após o nome da variável. Lembre-se que em Python a contagem sempre começa no zero. No exemplo abaixo, criamos a variável e acessamos a primeira e a segunda posição:

```python
dados_do_usuario = ("Alice", 25, "Engenheira")

nome = dados_do_usuario[0]
idade = dados_do_usuario[1]

print(nome)  # Saída: Alice
print(idade) # Saída: 25

```

## A Tupla de um único item

Existe uma peculiaridade sintática: para o Python entender que uma variável é uma tupla e não apenas um texto comum, você deve colocar uma vírgula após o primeiro item, mesmo que não haja um segundo.

```python
tupla_correta = ("item",)
apenas_texto = ("item")

print(type(tupla_correta)) # Saída: <class 'tuple'>
print(type(apenas_texto))  # Saída: <class 'str'>

```

## Contagem e Localização

Existem dois métodos principais para investigar uma tupla: o `count`, que informa a frequência de um valor, e o `index`, que revela em qual posição um valor aparece pela primeira vez.

```python
dados_do_usuario = (10, 20, 10, 30)

print(dados_do_usuario.count(10)) # Saída: 2
print(dados_do_usuario.index(30)) # Saída: 3

```

### **Exercício de Fixação**

O programador júnior criou uma tupla de notas: `notas = (10)`.
Ao tentar usar `notas.count(10)`, o programa quebrou.

1. Por que o Python diz que `int object has no attribute count`?
2. Como corrigir a declaração da variável `notas`?

---

# 5.3. Uso: Por que não usar apenas Listas?

À primeira vista, tuplas parecem listas com menos recursos. Se a lista pode tudo que a tupla pode (e mais), por que a linguagem mantém as duas? A resposta está em três pontos: **segurança**, **performance** e **semântica**.

## Segurança: dados que não devem mudar

Quando um valor representa algo que **não deveria** ser modificado depois de criado, a tupla impede mudanças acidentais. Pense em coordenadas geográficas, datas de nascimento ou as dimensões de uma tela: são informações que vivem em conjunto e não fazem sentido ser alteradas item por item.

```python
# Coordenadas de uma cidade — latitude e longitude andam juntas
joao_pessoa = (-7.1195, -34.8450)

# Se fosse uma lista, alguém poderia fazer:
# joao_pessoa[0] = 0   # bug silencioso!
# Com tupla, o Python levanta TypeError e protege o dado.
```

## Performance: tuplas são mais rápidas

Por serem imutáveis, tuplas são otimizadas pelo Python: ocupam menos memória e são criadas mais rápido que listas equivalentes. Para conjuntos de dados que serão lidos muitas vezes mas nunca alterados, tuplas levam vantagem.

```python
import sys
lista = [1, 2, 3, 4, 5]
tupla = (1, 2, 3, 4, 5)

print(sys.getsizeof(lista))  # ex: 104 bytes
print(sys.getsizeof(tupla))  # ex: 80 bytes
```

## Tuplas como chaves de dicionário

Esta é, talvez, a vantagem prática mais marcante. Listas **não podem** ser chaves de dicionário (são mutáveis); tuplas **podem**. Isso permite usar pares ou trios de valores como identificadores compostos.

```python
# Quantos alunos existem em cada (curso, período)?
matriculas = {
    ("CDIA", 3): 25,
    ("CC", 5): 30,
    ("EC", 7): 18,
}

print(matriculas[("CDIA", 3)])  # 25
```

## Múltiplos retornos e desempacotamento

Funções em Python costumam retornar várias informações de uma vez usando tuplas. Combinado com o **desempacotamento**, isso fica muito legível:

```python
def estatisticas(numeros):
    return min(numeros), max(numeros), sum(numeros) / len(numeros)

menor, maior, media = estatisticas([8, 5, 9, 7, 10])
print(menor, maior, media)  # 5 10 7.8
```

O mesmo desempacotamento funciona em laços `for`:

```python
pessoas = [("Ana", 25), ("Bruno", 31), ("Carla", 22)]
for nome, idade in pessoas:
    print(f"{nome} tem {idade} anos")
```

## Resumo prático

| Use uma **lista** quando... | Use uma **tupla** quando... |
| --- | --- |
| Os dados podem mudar | Os dados são fixos e não devem mudar |
| A coleção cresce/encolhe | O tamanho é conhecido e estável |
| A ordem é dinâmica | Cada posição tem um significado fixo (ex: `(x, y)`) |
| Você precisa de `append`, `sort`, etc. | Você quer usar como chave de `dict` ou elemento de `set` |

### **Exercício de Fixação**

Para cada situação abaixo, decida se é melhor usar `list` ou `tuple`:

1. Os nomes dos jogadores que entraram em campo numa partida (substituições podem acontecer).
2. As coordenadas (linha, coluna) de uma peça em um tabuleiro de xadrez.
3. A configuração RGB de uma cor: `(255, 128, 0)`.
4. O carrinho de compras de um usuário em um e-commerce.
5. A data de fundação de uma universidade (dia, mês, ano).

---

## Lista de Exercícios

**1. Coordenadas mais ao norte**
Dada uma lista de tuplas `cidades = [("João Pessoa", -7.12, -34.84), ("Recife", -8.05, -34.88), ("Natal", -5.79, -35.20)]` (nome, latitude, longitude), encontre o nome da cidade mais ao norte (maior latitude). Use desempacotamento dentro do `for`.

**2. Função com múltiplos retornos**
Escreva uma função `analisa(numeros)` que receba uma lista de números e retorne uma tupla `(menor, maior, soma, media)`. Em seguida, use desempacotamento para imprimir cada valor com um rótulo amigável.

**3. Tupla como chave**
Você tem uma lista de vendas: `[("São Paulo", "SP", 100), ("Recife", "PE", 50), ("São Paulo", "SP", 75)]`. Use um dicionário com chave `(cidade, estado)` para acumular o total de vendas por cidade.

**4. Imutabilidade aparente**
Considere o código:

```python
t = (1, 2, [3, 4])
t[2].append(5)
print(t)
```

Por que esse código **não** levanta erro, apesar de tuplas serem imutáveis? Explique a diferença entre alterar a tupla e alterar um objeto contido nela.

**5. Conversão e tratamento de erro**
Dada `lista = [1, 2, 3]`, converta para tupla, tente fazer `tupla[0] = 10` e capture a exceção com `try/except`. Imprima uma mensagem amigável quando o erro ocorrer.

**6. Trocando valores sem variável temporária**
Em Python, é possível trocar dois valores em uma única linha usando tuplas: `a, b = b, a`. Implemente uma função que receba uma lista e troque o primeiro com o último elemento usando essa técnica de desempacotamento.