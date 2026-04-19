---
title: Conjuntos
description: 
category: Programação
order: 11
---

### Introdução: A Natureza do Dado Desordenado

Para compreender a estrutura de dados `set` (conjunto) em Python, é necessário desvencilhar-se temporariamente do conceito de sequências ordenadas, como listas ou vetores. Enquanto em uma lista a posição (índice) define a identidade do elemento, em um conjunto, a **existência** é o único fator relevante.

Uma analogia útil é a de um pacote de figurinhas soltas, e não coladas em um álbum. Ao despejar as figurinhas sobre uma mesa, observam-se duas regras fundamentais:

1. **Unicidade:** Ter duas figurinhas idênticas não altera o fato de que você possui *aquele* item na coleção. Duplicatas são redundantes e ignoradas.
2. **Ausência de Ordem:** Não existe "primeira" ou "última" figurinha na mesa. Elas estão dispersas. O conceito de índice posicional () inexiste.

Na Ciência da Computação, definimos formalmente um `set` como uma **Coleção Mutável de Elementos Imutáveis e Não Ordenados**.

- **Mutável:** O conjunto em si pode ser alterado (inserção/remoção de itens).
- **Elementos Imutáveis:** Os itens *dentro* do conjunto devem ser estáticos (hashables). Não é possível armazenar uma lista dentro de um conjunto, pois a lista pode mudar, o que quebraria a integridade da estrutura.

#### **Exercício de Fixação**

Tente executar o código abaixo mentalmente (ou no interpretador) e explique o erro gerado:

```python
meu_conjunto = {1, 2, [3, 4]}

```

Por que o Python não permite que a lista `[3, 4]` faça parte do conjunto?

---

### Declaração e Sintaxe

Python oferece duas formas primárias de instanciar conjuntos: a notação literal com chaves `{}` e o construtor da classe `set()`. A escolha entre elas depende do contexto, especialmente quando há necessidade de "limpar" dados preexistentes.

### Instanciação e Limpeza de Dados

No contexto da Engenharia de Software, **sanitização de dados** refere-se ao processo de limpeza, filtragem e tratamento de informações brutas (*raw data*) antes que sejam processadas pelo sistema. Uma das formas mais comuns de "sujeira" em dados é a redundância não intencional.

No exemplo abaixo, declaramos um conjunto de frutas de forma literal. Em seguida, utilizamos o construtor `set()` para converter uma lista bruta contendo números repetidos.

```python
frutas = {'maçã', 'banana', 'uva'}

lista_bruta = [1, 2, 2, 3, 3, 3, 4, 1]
numeros_unicos = set(lista_bruta)

```

Ao executar o código acima, a variável `frutas` é criada como uma coleção desordenada. Já no caso de `numeros_unicos`, o Python processa a lista de entrada e elimina automaticamente as redundâncias. O valor armazenado em `numeros_unicos` será apenas `{1, 2, 3, 4}`. A ordem original da lista é descartada durante essa conversão.

#### **Exercício de Fixação**

Você recebeu uma lista de IDs de acesso de um servidor: `acessos = [101, 102, 101, 103, 104, 102]`.
Se você fizer `len(set(acessos))`, qual será o número resultante?

---

### A Ambiguidade das Chaves Vazias

Existe uma particularidade sintática importante no Python herdada de versões anteriores. O símbolo `{}` é originalmente utilizado para criar **dicionários** vazios. Portanto, ao tentar inicializar um conjunto vazio, deve-se obrigatoriamente usar o construtor da classe.

```python
dicionario_vazio = {}
conjunto_vazio = set()

```

Se o programador utilizar `variavel = {}`, o interpretador criará um objeto do tipo `dict`, e não um `set`, o que causará erros de tipo (TypeError) se métodos de conjunto forem chamados posteriormente.

#### **Exercício de Fixação**

O estagiário escreveu o seguinte código para iniciar um conjunto de usuários banidos:

```python
banidos = {}
banidos.add("joao123")

```

Qual erro (Exception) esse código vai gerar e como corrigir a primeira linha?

---

### Fundamentação Matemática

O comportamento do tipo `set` não é arbitrário; ele é uma implementação direta da **Teoria Ingênua dos Conjuntos** (Georg Cantor). O Python segue rigorosamente os axiomas matemáticos para determinar igualdade e pertinência.

### Princípio da Extensionalidade

Na matemática, um conjunto é definido exclusivamente por sua extensão (os elementos que o compõem), independentemente da ordem ou da repetição na notação. Se dois conjuntos possuem os mesmos elementos, eles são iguais.

Considere o código abaixo:

```python
grupo_a = {1, 2, 3}
grupo_b = {3, 1, 2, 1}

sao_iguais = (grupo_a == grupo_b)

```

Neste caso, a variável `sao_iguais` será avaliada como `True`. O Python ignora a repetição do número `1` e a ordem diferente em `grupo_b`, confirmando que a identidade do conjunto é baseada apenas na presença dos itens únicos.

---

### Continência (Subconjuntos)

A linguagem distingue com precisão entre subconjunto e subconjunto próprio através de operadores relacionais. Um subconjunto () pode ser igual ao conjunto original, enquanto um subconjunto próprio () deve ser estritamente menor.

```python
s = {1, 2}
t = {1, 2, 3}

teste_subconjunto = s <= t
teste_proprio = s < t

```

No exemplo, `teste_subconjunto` retorna `True` pois todos os elementos de `s` estão em `t`. A variável `teste_proprio` também retorna `True`, pois além de estar contido, `s` não é idêntico a `t` (é menor).

#### **Exercício de Fixação**

Dados `A = {1, 2}` e `B = {1, 2}`.
O resultado de `A < B` (subconjunto próprio) será `True` ou `False`? Justifique.

---

### Álgebra de Conjuntos (Operações Binárias)

O `set` permite realizar operações algébricas complexas de forma nativa. Para os exemplos a seguir, considere dois conjuntos iniciais: `a` contendo `{1, 2, 3}` e `b` contendo `{2, 3, 4}`.

```python
a = {1, 2, 3}
b = {2, 3, 4}

intersecao = a & b
uniao = a | b
diferenca = a - b
dif_simetrica = a ^ b

```

Analisando os resultados das operações acima:

1. **Interseção (`&`):** A variável `intersecao` armazenará `{2, 3}`, que são os elementos comuns a ambos (Lógica E).
2. **União (`|`):** A variável `uniao` resultará em `{1, 2, 3, 4}`, combinando todos os itens sem duplicar o 2 e o 3 (Lógica OU).
3. **Diferença (`-`):** A variável `diferenca` conterá `{1}`. Note que esta operação não é comutativa; ela remove de `a` tudo que também existe em `b`.
4. **Diferença Simétrica (`^`):** A variável `dif_simetrica` resultará em `{1, 4}`. Este é o "Ou Exclusivo" (XOR), mantendo apenas o que é exclusivo de cada lado e descartando o que é comum.

<img src="images/diagrama_venn.png" width="500">

#### **Exercício de Fixação**

Você tem o conjunto de alunos de inglês `ingles = {"Ana", "Bia"}` e espanhol `espanhol = {"Bia", "Caio"}`.
Escreva a operação para descobrir quem faz **apenas** inglês (e não faz espanhol).

---

### Engenharia de Software e Performance

A decisão de utilizar um `set` em vez de uma `list` deve ser baseada na análise de complexidade algorítmica e na natureza do problema.

#### A Tabela Hash

Internamente, o Python implementa sets utilizando **Tabelas Hash**. Ao contrário de uma lista, que armazena itens sequencialmente na memória, o set calcula um "endereço" (hash) único para cada dado inserido.

Quando executamos uma verificação de pertinência, o interpretador não percorre os itens um a um. Ele calcula o hash do elemento procurado e verifica diretamente aquela posição na memória.

### Análise Assintótica (Big O Notation)

A tabela abaixo compara o custo computacional médio de operações de busca:

| Estrutura de Dados | Operação | Complexidade Média | Interpretação |
| --- | --- | --- | --- |
| **Lista (`list`)** | `x in lista` |  (Linear) | O tempo de busca cresce proporcionalmente ao tamanho dos dados. Em grandes volumes, torna-se ineficiente. |
| **Conjunto (`set`)** | `x in set` |  (Constante) | O tempo de busca é praticamente instantâneo e independe do tamanho do conjunto (seja 10 ou 10 milhões de itens). |

### Conclusão Prática

O uso de sets é recomendado e considerado uma boa prática de engenharia quando a ordem dos elementos é irrelevante e a unicidade é necessária. O domínio desta estrutura permite ao programador escrever códigos não apenas semanticamente corretos, mas computacionalmente escaláveis.

#### **Exercício de Fixação**

Para um sistema de login que precisa verificar se um e-mail já está cadastrado em uma base de 50 milhões de usuários, qual estrutura é melhor para armazenar os e-mails: Lista ou Set? Por quê?

---

### Lista de Exercícios

**1. O Analista de Texto (Vocabulary Size)**
Dada uma string longa (um parágrafo de texto), escreva um código que normalize o texto (tudo minúsculo) e retorne o número de palavras **únicas** presentes nele. Use `split()` e `set()`.

**2. Verificação de Pangrama**
Um pangrama é uma frase que contém todas as letras do alfabeto (ex: "The quick brown fox jumps over the lazy dog"). Dada uma string, verifique se ela é um pangrama utilizando conjuntos.
*Dica:* Compare o set da string com o set do alfabeto.

**3. Recomendação de Amigos (Intersecção)**
Você tem dois dicionários representando as listas de amigos de dois usuários:
`user1_amigos = {"Alice", "Bob", "Charlie"}`
`user2_amigos = {"Bob", "David", "Edward"}`
Escreva uma função que retorne os "Amigos em Comum" para sugerir conexões.

**4. A Lista Negra (Performance)**
Você tem uma lista de 10.000 IPs bloqueados (`blacklist`). O servidor recebe uma requisição de um IP novo.
Explique, usando notação Big O, a diferença de performance entre armazenar a `blacklist` como uma lista Python ou como um set Python ao fazer a checagem `if ip in blacklist`.

**5. Elementos Exclusivos (Diferença Simétrica)**
Dadas duas listas de produtos: `estoque_loja_A` e `estoque_loja_B`. Gere um conjunto contendo apenas os produtos que são vendidos em **uma** das lojas, mas **não em ambas** (exclusivos de cada filial).

**6. O CPF Único**
Um banco de dados corrompido gerou uma lista onde todos os CPFs aparecem duas vezes, exceto um, que aparece apenas uma vez.
Encontre o CPF "solitário".
*Dica Hard:* Tente resolver isso matematicamente usando conjuntos: . Por que essa fórmula funciona?

**7. Validação de Senha Forte**
Uma senha forte deve conter caracteres de pelo menos 3 grupos diferentes: minúsculas, maiúsculas, números e símbolos.
Crie uma função que receba uma senha e use conjuntos para verificar se ela atende aos requisitos. (Crie sets de referência para cada grupo).

**8. Jaccard Index (OPCIONAL)**
O Índice de Jaccard é uma métrica usada para medir a similaridade entre dois conjuntos. A fórmula é:

Implemente uma função que receba duas frases, transforme-as em conjuntos de palavras e retorne o nível de similaridade (entre 0 e 1).

**9. Sets dentro de Sets (Frozenset)**
Como vimos, sets não podem conter elementos mutáveis (como outros sets). Mas e se precisarmos de um conjunto de conjuntos?
Pesquise sobre o `frozenset` e crie um conjunto que contenha os seguintes elementos: `{ {1, 2}, {3, 4} }` (Use a sintaxe correta).

**10. O Problema da Festa (Lógica)**
Em uma festa com 100 convidados:

- 50 beberam cerveja.
- 30 beberam refrigerante.
- 10 beberam ambos.
Usando operações de conjuntos e a função `len()`, responda via código:

> A) Quantos beberam **apenas** cerveja?
> B) Quantos beberam **apenas** refrigerante?
> C) Quantos não beberam nada (considerando o total de 100)?
