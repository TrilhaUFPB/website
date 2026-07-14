---
title: 3. Tabelas de Dispersão ou Dicionários
description: Entenda como as Tabelas de Dispersão (Hash Tables) funcionam internamente e como o Python as implementa nativamente através dos Dicionários.
category: Programação
order: 3
---

## Sumário

- [3.1. Tabelas de Dispersão](#31-tabelas-de-dispersao)
- [3.2. Dicionários em Python](#32-dicionarios-em-python)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Listas e arrays são ótimas para sequências, mas e quando precisamos buscar um valor específico entre milhares de registros? Com uma lista, o Python verificaria elemento por elemento até encontrar o certo — podendo levar O(n) no pior caso. As Tabelas de Dispersão resolvem esse problema com uma abordagem elegante: em vez de procurar sequencialmente, elas **calculam** onde o dado está e vão direto lá.

---

# 3.1. Tabelas de Dispersão

## O Problema

Imagine que você precisa organizar os arquivos de **100 empregados** de uma empresa. Se você usar uma lista simples, para encontrar o empregado número 99, você teria que passar por todos os anteriores. Isso é **lento**.

A **Tabela de Dispersão** (Hash Table) é uma estrutura criada para resolver esse problema de acesso, em que buscar e armazenar valores é feito com uma complexidade constante **O(1)**.

---

## Componentes Principais

Ela é composta basicamente por dois elementos:

- **A Tabela (Array):** Um vetor com tamanho fixo onde os dados serão armazenados. Cada espaço dessa tabela é chamado de **coletor** (bucket).
- **A Função de Dispersão (Hash Function):** Uma fórmula matemática que pega a "chave" do dado (como o ID do empregado) e calcula exatamente em qual índice da tabela ele deve ser guardado.

O objetivo da função de dispersão é **transformar uma chave** (que pode ser um número inviavelmente grande, ou até um texto) em um **índice existente** do vetor.

> **Exemplo:** O sistema tem um dado referente ao funcionário que funciona como a chave (ex: ID 3809). A partir disso, a função de dispersão calcula qual seria o índice correspondente.

<img src="/api/materiais-assets/2-estruturas-de-dados/3-tabelas-de-dispersao/assets/hash.png" width=500>

---

## Função de Dispersão

Um exemplo de função de dispersão simples é a **Divisão Modular**, onde se pega o **resto da divisão** da chave pelo tamanho da tabela: `chave mod tamanho`.

> **Exemplo:** Se a tabela tem tamanho 100 e a chave é 3809, o índice é `3809 % 100 = 9`. O dado vai para a posição 9.

Assim, a primeira execução da função hash servirá para identificar onde é possível **armazenar** o dado desejado no vetor, e depois disso ela será utilizada para **encontrar** este valor armazenado.

> **OBS:** Na prática, as funções de dispersão implementadas são mais complexas do que essa, principalmente para garantir **uniformidade** e evitar as **colisões**, que serão explicadas a seguir.

---

## Colisões

Mas, você deve estar se perguntando, **como garantir que duas chaves nunca vão resultar no mesmo índice?**

No exemplo anterior, uma outra chave de número 2709, por exemplo, também resultaria no mesmo índice do array. De fato, na prática é difícil garantir que chaves diferentes gerem índices diferentes sempre, e esse problema precisa de alguma forma ser solucionado.

### Encadeamento (Chaining)

Uma solução para isso é o **Encadeamento** (Chaining), que usa a técnica vista anteriormente: a **lista encadeada**.

Nessa técnica, o coletor não guarda apenas um item, mas sim uma **lista encadeada**. Então, caso haja colisão, o novo item é adicionado a essa lista naquela posição.

> **Questão:** Mas você pode estar se perguntando, como a tabela de dispersão garante ser O(1) se as listas encadeadas têm uma busca em O(n)?

### Caso Médio vs. Pior Caso

A resposta está no comportamento do **Caso Médio** versus o **Pior Caso**. A garantia de O(1) na verdade não é absoluta, mas **estatística**.

Para que a tabela de dispersão funcione com essa rapidez, assumimos que a função de dispersão distribui as chaves de forma **uniforme** por toda a tabela.

Imagine que você tem 100 posições na tabela e insere 100 itens:

- **Cenário Ideal (Boa Função de Hash):** Os itens se espalham. A maioria dos coletores terá apenas 1 item, e talvez alguns tenham 2 ou 3 (uma lista encadeada curtíssima). Buscar em uma lista de 2 itens é tão rápido que consideramos tempo constante **O(1)**.
- **Cenário de Pesadelo (Má Função de Hash):** A função joga todos os 100 itens no índice 5. Agora você tem uma lista encadeada gigante de 100 itens. Nesse cenário, a busca degrada para **O(n)**.

Portanto, a tabela de dispersão é **O(1)** na média porque desenhamos a estrutura para manter essas listas encadeadas (os coletores) sempre **curtas**. A função escolhida deve ter a propriedade de **uniformidade** — ela precisa espalhar os dados aleatoriamente para evitar que se formem "agrupamentos" ou listas longas em um único índice.

---

## Acesso e Complexidade

Diferente de uma lista sequencial onde você percorre item por item, na tabela de dispersão o acesso é direto: você calcula o endereço e vai lá.

- **Caso Médio:** A complexidade é **O(1)** (tempo constante). O tempo para achar um item é praticamente o mesmo, não importa se a tabela tem 10 elementos ou 1 bilhão.
- **Pior Caso:** Se a função de dispersão for ruim e jogar todos os dados no mesmo índice, a complexidade degrada para **O(n)** (tempo linear). Nesse caso, a tabela fica tão lenta quanto uma lista comum.

---

## Vantagens e Desvantagens

A grande vantagem dessa estrutura é que a busca é, em média, **O(1)**, o que a torna extremamente eficiente para operações de acesso, inserção e remoção. No entanto, como toda estrutura de dados, ela apresenta desvantagens:

- **Colisões:** É matematicamente difícil **garantir** que chaves diferentes caiam em lugares diferentes. O sistema precisa gastar processamento extra para resolver esses conflitos.
- **Desperdício de Memória:** Para que a tabela seja rápida, ela precisa ter "espaço de sobra". Se você tem 100 itens, talvez precise de uma tabela de tamanho 200 para evitar colisões. Isso consome mais memória RAM do que uma lista simples compacta.
- **Ausência de Ordenação:** Diferentemente de listas ou vetores, as tabelas de dispersão não mantêm os elementos em uma ordem lógica ou sequencial. Isso dificulta operações que dependem de sequenciamento, como percorrer os elementos de forma ordenada ou realizar buscas por intervalo.

---

# 3.2. Dicionários em Python

O Python possui uma estrutura de dados nativa que implementa o conceito de tabelas de dispersão: o **Dicionário** (`dict`). Um dicionário é delimitado por chaves `{}`. Cada elemento é composto por um par `chave: valor`.

```python
# dicionário vazio
d = {}

# dicionário com elementos
alunos = {
    "Ana": 8.5,
    "Bruno": 7.0,
    "Carla": 9.2
}
```

As **chaves** devem ser imutáveis (como `int`, `float`, `str` ou `tuple`), enquanto os **valores** podem ser de qualquer tipo.

---

## Operações Básicas

**Acesso:** Para recuperar um valor, utilizamos a chave entre colchetes, similar ao índice de uma lista.

```python
print(alunos["Ana"])  # Saída: 8.5
```

**Adição e Modificação:** Ao atribuir um valor a uma chave, há duas possibilidades:

```python
alunos["Roberta"] = 6.8
```

- Se a chave **não existe**, um novo par chave-valor é criado.
- Se a chave **já existe**, o valor é atualizado.

**Remoção:** Para apagar um item, utilizamos a instrução `del`.

```python
del alunos["Ana"]
```

---

## Verificação de Erros

Para evitar o erro `KeyError` ao tentar acessar algo que talvez não exista, utilizamos o operador `in`. Ele verifica se a chave pertence ao dicionário.

```python
aluno = "Cecília"
if aluno in alunos:
    print(alunos[aluno])
else:
    print("Aluno não encontrado!")
```

Além disso, é possível se previnir de erros através do `.get()`, que retorna um valor padrão caso a chave não exista.

```python
# Retorna None se a chave não existir
nota = alunos.get("Cecília")

# Retorna o valor padrão se a chave não existir
nota = alunos.get("Cecília", "Aluno não encontrado!")
```

---

## Métodos de Iteração

Frequentemente precisamos percorrer o dicionário. O Python oferece métodos para acessar apenas as chaves, apenas os valores ou ambos.

- `.keys()` — Retorna as chaves.
- `.values()` — Retorna os valores.
- `.items()` — Retorna tuplas `(chave, valor)`, ideal para usar em loops `for`.

```python
for aluno, nota in alunos.items():
    print(f"O aluno {aluno} tirou {nota} na prova")
```

---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre Tabelas de Dispersão e Dicionários, confira os seguintes recursos:

 [Estruturas de Dados - Conceitos de Tabela Hash - UNIVESP](https://youtu.be/jQ0r7P8rC1M)

 [Curso Python #19 - Dicionários - Curso em Vídeo](https://youtu.be/ZWj8o692qGY)

```quiz
- tipo: single
  pergunta: Por que a busca em uma Tabela de Dispersão é geralmente O(1), enquanto a busca em uma lista é O(n)?
  opcoes:
    - texto: Porque ela ordena os elementos automaticamente antes de buscar
      correta: false
      explicacao: Tabelas de Dispersão não ordenam os dados. O ganho de eficiência vem do cálculo direto do índice, não de ordenação.
    - texto: Porque ela calcula diretamente o índice onde o dado está armazenado
      correta: true
      explicacao: Correto! A função de hash transforma a chave em um índice e vai direto ao coletor correspondente, sem precisar percorrer a estrutura elemento por elemento.
      explicacao_erro: A eficiência O(1) vem da função de dispersão, que calcula o índice do dado diretamente. Uma lista precisaria percorrer todos os elementos no pior caso.
    - texto: Porque ela usa dois ponteiros para dividir o problema ao meio
      correta: false
      explicacao: Isso descreve a busca binária, que opera em O(log n) em listas ordenadas. A Tabela de Dispersão usa uma função hash para acesso direto.
    - texto: Porque ela percorre a tabela com um loop otimizado pelo Python
      correta: false
      explicacao: Não há loop de percorrimento. A eficiência vem do cálculo direto do índice pela função de hash.

- tipo: single
  pergunta: Qual é a principal causa de uma Tabela de Dispersão degradar de O(1) para O(n)?
  opcoes:
    - texto: A tabela ser criada com tamanho zero
      correta: false
      explicacao: Uma tabela de tamanho zero geraria erro de inicialização. A degradação de performance está relacionada à distribuição dos dados, não ao tamanho inicial.
    - texto: Muitas colisões causadas por uma função de hash com distribuição ruim
      correta: true
      explicacao: Correto! Se a função de hash concentrar muitas chaves no mesmo índice, o coletor forma uma lista encadeada longa. Percorrer essa lista é O(n), eliminando a vantagem da estrutura.
      explicacao_erro: O pior caso O(n) ocorre quando uma má função de hash gera muitas colisões, concentrando todos os dados no mesmo coletor e criando uma lista encadeada longa.
    - texto: O uso de chaves do tipo string em vez de inteiro
      correta: false
      explicacao: Chaves do tipo string são perfeitamente válidas em tabelas de dispersão. O Python, por exemplo, aceita strings como chaves de dicionários sem perda de performance.
    - texto: Acessar a tabela com o operador in em vez de colchetes
      correta: false
      explicacao: O operador in é igualmente eficiente para dicionários em Python. A degradação de performance se deve à qualidade da função de hash, não ao operador usado.

- tipo: single
  pergunta: Em Python, qual método de dicionário retorna pares (chave, valor) e é ideal para uso em loops for?
  opcoes:
    - texto: .keys()
      correta: false
      explicacao: .keys() retorna apenas as chaves do dicionário, sem os valores associados.
    - texto: .values()
      correta: false
      explicacao: .values() retorna apenas os valores do dicionário, sem as chaves associadas.
    - texto: .items()
      correta: true
      explicacao: Correto! .items() retorna tuplas (chave, valor), permitindo acessar ambos simultaneamente no loop — por isso é o método mais utilizado para iterar sobre um dicionário.
      explicacao_erro: O método .items() é o correto. Ele retorna tuplas (chave, valor) que podem ser desempacotadas diretamente no for, como em "for chave, valor in d.items()".
    - texto: .pairs()
      correta: false
      explicacao: O método .pairs() não existe em Python. Para obter pares (chave, valor), usa-se .items().
```
