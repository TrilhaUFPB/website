---
title: 3. Tabelas de Dispersão ou Dicionários
description: Hash tables, colisões e dicionários em Python.
category: Programação
order: 3
---

## 3.1. Tabelas de Dispersão (Dicionários em Python)

### O Problema

Imagine que você precisa organizar os arquivos de **100 empregados** de uma empresa. Se você usar uma lista simples, para encontrar o empregado número 99, você teria que passar por todos os anteriores. Isso é **lento**.

A **Tabela de Dispersão** (Hash Table) é uma estrutura criada para resolver esse problema de acesso, em que buscar e armazenar valores é feito com uma complexidade constante **O(1)**.

### Componentes Principais

Ela é composta basicamente por dois elementos:

1. **A Tabela (Array):** Um vetor com tamanho fixo onde os dados serão armazenados. Cada espaço dessa tabela é chamado de **coletor** (bucket).

2. **A Função de Dispersão (Hash Function):** Uma fórmula matemática que pega a "chave" do dado (como o ID do empregado) e calcula exatamente em qual índice da tabela ele deve ser guardado.

O objetivo da função de dispersão é **transformar uma chave** (que pode ser um número inviavelmente grande, ou até um texto) em um **índice existente** do vetor.

> **Exemplo:** O sistema tem um dado referente ao funcionário que funciona como a chave (ex: ID 3809). A partir disso, a função de dispersão calcula qual seria o índice correspondente.

![Função de dispersão calculando o índice](/api/materiais-assets/2-estruturas-de-dados/3-tabelas-de-dispersao/assets/hash.png)

### Mas que Tipo de Função é Essa?

Um exemplo de função de dispersão simples é a **Divisão Modular**, onde se pega o **resto da divisão** da chave pelo tamanho da tabela: `chave mod tamanho`.

> **Exemplo:** Se a tabela tem tamanho 100 e a chave é 3809, o índice é `3809 % 100 = 9`. O dado vai para a posição 9.

Assim, a primeira execução da função hash servirá para identificar onde é possível **armazenar** o dado desejado no vetor, e depois disso ela será utilizada para **encontrar** este valor armazenado.

> **OBS:** Na prática, as funções de dispersão implementadas são mais complexas do que essa, principalmente para garantir **uniformidade** e evitar as **colisões**, que será melhor explicada a seguir.

### Colisões

Mas, você deve estar se perguntando, **como garantir que duas chaves nunca vão resultar no mesmo índice?**

No exemplo anterior, uma outra chave de número 2709, por exemplo, também resultaria no mesmo índice do array. De fato, na prática é difícil garantir que chaves diferentes gerem índices diferentes sempre e esse problema precisa de alguma forma ser solucionado.

#### Solução: Encadeamento (Chaining)

Uma solução para isso é o **Encadeamento** (Chaining), que usa a técnica vista anteriormente: a **lista encadeada**.

Nessa técnica, o coletor não guarda apenas um item, mas sim uma **lista encadeada**. Então, caso haja colisão, o novo item é adicionado a essa lista naquela posição.

> **Questão:** Mas você pode estar se perguntando, como a tabela de dispersão garante ser O(1) se as listas encadeadas têm uma busca em O(n)?

#### Caso Médio vs. Pior Caso

A resposta está no comportamento do **Caso Médio** versus o **Pior Caso**. A garantia de O(1) na verdade não é absoluta, mas **estatística**.

Para que a tabela de dispersão funcione com essa rapidez, assumimos que a função de dispersão distribui as chaves de forma **uniforme** por toda a tabela.

Imagine que você tem 100 posições na tabela e insere 100 itens:

- **Cenário Ideal (Boa Função de Hash):** Os itens se espalham. A maioria dos coletores terá apenas 1 item, e talvez alguns tenham 2 ou 3 (uma lista encadeada curtíssima). Buscar em uma lista de 2 itens é tão rápido que consideramos tempo constante **O(1)**.

- **Cenário de Pesadelo (Má Função de Hash):** A função joga todos os 100 itens no índice 5. Agora você tem uma lista encadeada gigante de 100 itens. Nesse cenário, a busca degrada para **O(n)**.

Portanto, a tabela de dispersão é **O(1)** na média porque desenhamos a estrutura para manter essas listas encadeadas (os coletores) sempre **curtas**. Ou seja, a função escolhida deve ter a propriedade de **uniformidade**. Ela precisa espalhar os dados aleatoriamente para evitar que se formem "agrupamentos" ou listas longas em um único índice. Se a função for bem projetada e a tabela tiver um tamanho adequado, as colisões serão raras e as listas encadeadas serão tão pequenas que o custo de percorrê-las é desprezível.

### Acesso e complexidade

Como dito anteriormente, diferente de uma lista sequencial onde você percorre item por item, na tabela de dispersão o acesso é direto. Você calcula o endereço e vai lá. Isso permite que operações de busca, inserção e remoção tenham um custo de tempo extremamente baixo

- Caso Médio (O Cenário Esperado): A complexidade é $O(1)$ (tempo constante). Isso significa que o tempo para achar um item é praticamente o mesmo, não importa se a tabela tem 10 elementos ou 1 bilhão de elementos
- Pior Caso (O Cenário Pesadelo): Se a função de dispersão for ruim e jogar todos os dados no mesmo índice (gerando uma longa lista encadeada), a complexidade degrada para $O(n)$ (tempo linear). Nesse caso, a tabela fica tão lenta quanto uma lista comum

### Vantagens e Desvantagens

Como você ja pode concluir, a grande vantagem dessa estrutura é sua busca é, em média $O(1)$, o que a torna extremamente eficiente para operações de acesso, inserção e remoção. No entanto, como toda estrutura de dados, ela apresenta desvantagens:

- Colisões: É matematicamente difícil **garantir** que chaves diferentes caiam em lugares diferentes. O sistema precisa gastar processamento extra para resolver esses conflitos (usando listas ou sondagem).
- Desperdício de Memória (Trade-off): Para que a tabela seja rápida, ela precisa ter "espaço de sobra". Se você tem 100 itens, talvez precise de uma tabela de tamanho 200 para evitar colisões. Isso consome mais memória RAM do que uma lista simples compacta.
- Ausência de ordenação e sequenciamento: Diferentemente de estruturas como listas ou vetores, as tabelas de dispersão não mantêm os elementos em uma ordem lógica ou sequencial (como ordem crescente das chaves ou ordem de inserção, do ponto de vista conceitual da estrutura). Isso dificulta operações que dependem de sequenciamento, como percorrer os elementos de forma ordenada ou realizar buscas por intervalo.

### Em Python: Dicionários (dict)

O Python possui uma estrutura de dados nativa que implementa o conceito de tabelas de dispersão: o Dicionário. Um dicionário é delimitado por chaves {}. Cada elemento é composto por um par chave: valor. Um exemplo de uso seria usar um dicionário para armazenar as notas de alunos, apresentado a seguir:

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

As **chaves** devem ser imutáveis (como int, float, str ou tuple), enquanto os **valores** podem ser de qualquer tipo.

#### Operações básicas

- Acesso: Para recuperar um valor, utilizamos a chave entre colchetes, similar ao índice de uma lista.

```python
print(d["Ana"]) # Saída: 8.5
```

- Adição e Modificação:
    Ao atribuir um valor a uma chave, há duas possibilidades:

    ```python
    d["Roberta"] = 6.8
    ```

  - Modificação: Se a chave já existe, o valor é atualizado.
  - Adição: Se a chave não existe, um novo par chave-valor é criado.

- Remoção: Para apagar um item (chave, valor), utilizamos a instrução `del`

```python
del d["Ana"]
```

#### Verificação de erros

Para evitar o erro KeyError ao tentar acessar algo que talvez não exista, utilizamos o operador in. Ele verifica se a chave pertence ao dicionário.

```python
aluno = "Cecília"
if aluno in d:
    print(d[aluno])
else:
    print("Aluno não encontrado!")
```

Além disso, pode se prevenir erros de chaves que não existem no dicionário através do `.get()`, que retorna um valor padrão caso a chave não exista.

```python
nota = d.get("Cecília")
print(nota)
```

Se "Cecília" não estiver presente no dicionário, o valor impresso será `None` Esse comportamento é útil quando se deseja apenas verificar a existência da chave sem interromper a execução do programa. Também é possível fornecer um valor padrão como segundo argumento do .get(). Nesse caso, se a chave não existir, esse valor será retornado no lugar de None.

```python
print(d.get("Cecília", "Aluno não encontrado!"))
```

#### Métodos úteis de interação

Frequentemente precisamos percorrer o dicionário. O Python oferece métodos para acessar apenas as chaves, apenas os valores ou ambos.

- .keys(): Retorna as chaves.
- .values(): Retorna os valores.
- .items(): Retorna tuplas contendo (chave, valor), ideal para usar em loops for.

```python
# Listando alunos e notas usando .items()
for aluno, nota in d.items():
    print(f"O aluno {aluno} tirou {nota} na prova")
```

---

## Lista de Exercícios

Estes exercícios combinam dicionários com os conceitos vistos nos capítulos anteriores (listas, strings, laços).

**1. Contador de Palavras**
Dada uma string longa (um parágrafo), conte quantas vezes cada palavra aparece e retorne um dicionário no formato `{"palavra": frequência}`. Normalize o texto para minúsculo antes de contar e use `split()` para separar as palavras.

**2. Inversão de Dicionário**
Dado `notas = {"Ana": 8.5, "Bruno": 7.0, "Carla": 9.2}`, crie um novo dicionário em que as chaves viram valores e os valores viram chaves: `{8.5: "Ana", 7.0: "Bruno", 9.2: "Carla"}`. O que acontece se houver dois alunos com a mesma nota? Discuta a limitação.

**3. Agenda Telefônica**
Implemente um pequeno sistema de agenda usando dicionário. Ele deve permitir: adicionar um contato (`nome -> telefone`), remover um contato pelo nome, buscar o telefone de um nome específico e listar todos os contatos em ordem alfabética.

**4. Mesclar Notas de Provas**
Dadas duas provas: `prova1 = {"Ana": 7, "Bruno": 8}` e `prova2 = {"Ana": 9, "Carla": 10}`, gere um dicionário com a média de cada aluno. Alunos que fizeram apenas uma das provas devem manter a nota única no resultado.

**5. Anagrama**
Duas palavras são anagramas se possuem exatamente as mesmas letras com as mesmas frequências (ex: "amor" e "roma"). Escreva uma função que receba duas strings e retorne `True` se forem anagramas. Construa um dicionário de frequência para cada string e compare.

**6. Cache com Dicionário (Memoização)**
Escreva uma função `fibonacci(n)` recursiva que use um dicionário como cache para guardar resultados já calculados. Compare o tempo de execução com a versão sem cache para `n = 35` usando `time.perf_counter()`.

**7. Top 3 mais frequentes**
Dada uma lista de produtos vendidos em um dia, retorne os 3 produtos mais vendidos. Use um dicionário para contar as ocorrências e depois ordene pelas frequências.

**8. Validação de Estoque**
Você tem dois dicionários: `pedido = {"caneta": 5, "caderno": 2}` e `estoque = {"caneta": 10, "caderno": 1, "lápis": 50}`. Verifique se é possível atender ao pedido completamente (todos os itens em quantidade suficiente). Retorne uma lista com os itens que faltam no estoque, se houver.
