---
title: 5. Tuplas
description: 
category: Programação
order: 5
---
## Sumário

- [5.1. Tupla (Tuple)](#51tupla-tuple)
- [5.2. Operações Principais](#52operacoes-principais)
- [5.3. Por que não usar apenas Listas?](#53-uso-por-que-nao-usar-apenas-listas)
- [Complemente o Aprendizado](#complemente-o-aprendizado)

# 5.1.Tupla (Tuple)

## O que é uma Tupla? (Estrutura e Características)

Imagine uma tupla como uma **caixa lacrada**. Você coloca os objetos lá dentro, fecha a caixa e, a partir desse momento, **ninguém** mais pode mudar o que está lá dentro. Você pode olhar e usar o que está dentro, mas nunca trocar um objeto por outro.

## Características principais

- **Imutável:** Uma vez criada, ela não aceita adições, remoções ou alterações. É o que chamamos de dado "somente leitura".
- **Ordenada:** A ordem dos elementos é preservada rigorosamente desde a criação.
- **Sintaxe:** Utilizamos **parênteses `()**` para defini-las, com os itens separados por vírgulas.
- **Heterogênea:** Elas são flexíveis quanto ao conteúdo, permitindo misturar textos, números e booleanos na mesma estrutura.

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
tupla_correta = ("item",)# Item unico
apenas_texto = ("item")# String

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

# 5.3. Uso: Por que não usar apenas Listas?

- **Eficiência de Memória e Desempenho** As tuplas, por serem imutáveis, têm um tamanho fixo exato alocado na memória no momento da criação. Isso significa que elas ocupam menos espaço e são instanciadas de forma mais rápida.

- **Capacidade de Hash** Por serem imutáveis, as tuplas possuem um valor de hash fixo. Isso permite que elas sejam usadas como chaves em dicionários (dict) ou itens em conjuntos (set), o que é impossível de fazer com listas.

- **Proteção e Segurança de Dados** Por ser imutável, garante que alterações nos dados não sejam realizadas acidentalmente durante a execução do código.

---
```quiz
- tipo: single
  pergunta: |
    Analise as declarações abaixo. Qual delas é uma **Lista** e qual é uma **Tupla**?

    ```python
    var_a = [10, 20, 30]
    var_b = (10, 20, 30)
    ```

    Se tentarmos fazer `var_b[0] = 50`, o que acontecerá?
  opcoes:
    - texto: "`var_a` é uma Tupla e `var_b` é uma Lista. O comando alterará o primeiro valor de `var_b` para 50 com sucesso."
      correta: false
      explicacao: "var_a não é uma Tupla e sim var_b ()."
    - texto: "`var_a` é uma Lista e `var_b` é uma Tupla. O comando resultará em um erro."
      correta: true
      explicacao: "Por `var_b` ser uma Tupla e tuplas serem imutáveis, a associação do valor `50` ao índice `[0]` apresentará um erro."
    - texto: "O primeiro valor da `var_b` continuará sendo 10 sem mudanças e sem erro."
      correta: false
      explicacao: "Apresentará erro já que o `var_b` é uma Tupla imutável."
    - texto: "`var_a` receberá o valor 50 no primeiro valor."
      correta: false
      explicacao: "O direcionamento do valor `50` está apontado para outra variável."

- tipo: single
  pergunta: |
    Ao declarar a variável de configuração `config = (80)`, o programador notou que o tipo da variável reconhecido pelo interpretador Python era `int` e não `tuple`. Como corrigir essa declaração para criar uma tupla de um único elemento?
  opcoes:
    - texto: "Deve-se usar colchetes em vez de parênteses, ficando `config = [80]`."
      correta: false
      explicacao: "Ao usar colchetes, você cria uma lista, não uma tupla."
    - texto: "O Python proíbe tuplas de tamanho um, logo, é impossível fazer essa correção sem adicionar um segundo elemento."
      correta: false
      explicacao: "É possível e comum criar tuplas de um único elemento em Python, basta usar a sintaxe correta."
    - texto: "É obrigatório incluir uma vírgula após o valor, declarando como `config = (80,)`."
      correta: true
      explicacao: "Sem a vírgula, o Python interpreta os parênteses apenas como agrupamento matemático. A vírgula é o que sinaliza ao interpretador que se trata de uma tupla. O erro acontece porque a linguagem prioriza a avaliação matemática dos parênteses. A vírgula isolada, mesmo sem outro elemento depois, mostra que tem espaço a mais do que o necessário."
    - texto: "Basta declarar o número como string para contornar o agrupamento matemático: `config = ('80')`."
      correta: false
      explicacao: "Isso apenas mudaria o tipo da variável de inteiro (`int`) para string (`str`). Para criar uma tupla, a vírgula continuaria sendo obrigatória: `('80',)`."

- tipo: single
  pergunta: |
    Um desenvolvedor precisa criar uma estrutura de dados para armazenar as coordenadas geográficas (Latitude e Longitude) de uma filial da empresa. Esses dados são fixos e não devem ser alterados durante a execução do programa. Qual estrutura é a mais recomendada e por quê?
  opcoes:
    - texto: "Lista, pois permite adicionar novas coordenadas futuramente caso a filial mude de endereço."
      correta: false
      explicacao: "Como os dados são descritos como fixos para a execução atual, o uso de listas abre brechas para modificações acidentais, diminuindo a segurança e integridade do código."
    - texto: "Tupla, porque sua natureza imutável garante proteção contra alterações acidentais e consome menos memória."
      correta: true
      explicacao: "Tuplas servem como registros imutáveis. Elas blindam o dado contra modificações (side effects) e são alocadas com tamanho fixo, economizando recursos. A grande vantagem da tupla nesse cenário é a imutabilidade. Listas ocupariam espaço desnecessário (over-allocation) e permitiriam alterações indesejadas na variável."
    - texto: "Lista, pois coordenadas precisam de cálculos matemáticos e tuplas não suportam operações numéricas."
      correta: false
      explicacao: "Tuplas suportam perfeitamente armazenar inteiros e floats que serão usados em cálculos. A restrição da tupla é apenas não poder alterar seus itens após a criação."
    - texto: "Tupla, porque é a única estrutura em Python capaz de armazenar dados heterogêneos (tipos diferentes juntos)."
      correta: false
      explicacao: "Listas também podem armazenar dados de tipos diferentes. A real motivação aqui é a proteção e eficiência proporcionadas pela imutabilidade da tupla."
```




