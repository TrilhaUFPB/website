---
title: 4. Conjuntos
subtitle: A estrutura de dados ideal para unicidade e busca rápida
description: Aprenda a estrutura set em Python, entendendo sua base na teoria dos conjuntos, suas operações algébricas (união, interseção, diferença) e por que ela garante buscas extremamente rápidas em grandes volumes de dados.
category: Programação
order: 4
---
## Sumário

- [4.1. Introdução: A Natureza do Dado Desordenado](#41-introducao-a-natureza-do-dado-desordenado)
- [4.2. Declaração e Sintaxe](#42-declaracao-e-sintaxe)
- [4.3. Instanciação e Limpeza de Dados](#43-instanciacao-e-limpeza-de-dados)
- [4.4. A Ambiguidade das Chaves Vazias](#44-a-ambiguidade-das-chaves-vazias)
- [4.5. Fundamentação Matemática](#45-fundamentacao-matematica)
- [4.6. Princípio da Extensionalidade](#46-principio-da-extensionalidade)
- [4.7. Continência (Subconjuntos)](#47-continencia-subconjuntos)
- [4.8. Álgebra de Conjuntos (Operações Binárias)](#48-algebra-de-conjuntos-operacoes-binarias)
- [4.9. Engenharia de Software e Performance](#49-engenharia-de-software-e-performance)
- [4.10. Análise Assintótica (Big O Notation)](#410-analise-assintotica-big-o-notation)
- [4.11. Conclusão Prática](#411-conclusao-pratica)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Quando você lida com listas de dados, é comum querer saber rapidamente se um item já está presente, sem se importar com a ordem em que ele foi inserido ou se ele aparece repetido. O problema é que uma lista comum obriga o computador a checar item por item até encontrar (ou não) o que você procura. É como procurar uma chave específica numa gaveta de bagunça, jogando todas as chaves fora e tentando uma por uma, em vez de simplesmente saber se aquela chave existe ou não.

# 4.1. Introdução: A Natureza do Dado Desordenado

Para compreender a estrutura de dados `set` (conjunto) em Python, é necessário desvencilhar-se temporariamente do conceito de sequências ordenadas, como listas ou vetores. Enquanto em uma lista a posição (índice) define a identidade do elemento, em um conjunto, a **existência** é o único fator relevante.

Uma analogia útil é a de um pacote de figurinhas soltas, e não coladas em um álbum. Ao despejar as figurinhas sobre uma mesa, observam-se duas regras fundamentais:

1. **Unicidade:** Ter duas figurinhas idênticas não altera o fato de que você possui *aquele* item na coleção. Duplicatas são redundantes e ignoradas.
2. **Ausência de Ordem:** Não existe "primeira" ou "última" figurinha na mesa. Elas estão dispersas. O conceito de índice posicional () inexiste.

Na Ciência da Computação, definimos formalmente um `set` como uma **Coleção Mutável de Elementos Imutáveis e Não Ordenados**.

- **Mutável:** O conjunto em si pode ser alterado (inserção/remoção de itens).
- **Elementos Imutáveis:** Os itens *dentro* do conjunto devem ser estáticos (hashables). Não é possível armazenar uma lista dentro de um conjunto, pois a lista pode mudar, o que quebraria a integridade da estrutura.

## **Exercício de Fixação**

Tente executar o código abaixo mentalmente (ou no interpretador) e explique o erro gerado:

```python
meu_conjunto = {1, 2, [3, 4]}

```

Por que o Python não permite que a lista `[3, 4]` faça parte do conjunto?

---

# 4.2. Declaração e Sintaxe

Python oferece duas formas primárias de instanciar conjuntos: a notação literal com chaves `{}` e o construtor da classe `set()`. A escolha entre elas depende do contexto, especialmente quando há necessidade de "limpar" dados preexistentes.

# 4.3. Instanciação e Limpeza de Dados

No contexto da Engenharia de Software, **sanitização de dados** refere-se ao processo de limpeza, filtragem e tratamento de informações brutas (*raw data*) antes que sejam processadas pelo sistema. Uma das formas mais comuns de "sujeira" em dados é a redundância não intencional.

No exemplo abaixo, declaramos um conjunto de frutas de forma literal. Em seguida, utilizamos o construtor `set()` para converter uma lista bruta contendo números repetidos.

```python
frutas = {'maçã', 'banana', 'uva'}

lista_bruta = [1, 2, 2, 3, 3, 3, 4, 1]
numeros_unicos = set(lista_bruta)

```

Ao executar o código acima, a variável `frutas` é criada como uma coleção desordenada. Já no caso de `numeros_unicos`, o Python processa a lista de entrada e elimina automaticamente as redundâncias. O valor armazenado em `numeros_unicos` será apenas `{1, 2, 3, 4}`. A ordem original da lista é descartada durante essa conversão.

## **Exercício de Fixação**

Você recebeu uma lista de IDs de acesso de um servidor: `acessos = [101, 102, 101, 103, 104, 102]`.
Se você fizer `len(set(acessos))`, qual será o número resultante?

---

# 4.4. A Ambiguidade das Chaves Vazias

Existe uma particularidade sintática importante no Python herdada de versões anteriores. O símbolo `{}` é originalmente utilizado para criar **dicionários** vazios. Portanto, ao tentar inicializar um conjunto vazio, deve-se obrigatoriamente usar o construtor da classe.

```python
dicionario_vazio = {}
conjunto_vazio = set()

```

Se o programador utilizar `variavel = {}`, o interpretador criará um objeto do tipo `dict`, e não um `set`, o que causará erros de tipo (TypeError) se métodos de conjunto forem chamados posteriormente.

## **Exercício de Fixação**

O estagiário escreveu o seguinte código para iniciar um conjunto de usuários banidos:

```python
banidos = {}
banidos.add("joao123")

```

Qual erro (Exception) esse código vai gerar e como corrigir a primeira linha?

---

# 4.5. Fundamentação Matemática

O comportamento do tipo `set` não é arbitrário; ele é uma implementação direta da **Teoria Ingênua dos Conjuntos** (Georg Cantor). O Python segue rigorosamente os axiomas matemáticos para determinar igualdade e pertinência.

# 4.6. Princípio da Extensionalidade

Na matemática, um conjunto é definido exclusivamente por sua extensão (os elementos que o compõem), independentemente da ordem ou da repetição na notação. Se dois conjuntos possuem os mesmos elementos, eles são iguais.

Considere o código abaixo:

```python
grupo_a = {1, 2, 3}
grupo_b = {3, 1, 2, 1}

sao_iguais = (grupo_a == grupo_b)

```

Neste caso, a variável `sao_iguais` será avaliada como `True`. O Python ignora a repetição do número `1` e a ordem diferente em `grupo_b`, confirmando que a identidade do conjunto é baseada apenas na presença dos itens únicos.

---

# 4.7. Continência (Subconjuntos)

A linguagem distingue com precisão entre subconjunto e subconjunto próprio através de operadores relacionais. Um subconjunto () pode ser igual ao conjunto original, enquanto um subconjunto próprio () deve ser estritamente menor.

```python
s = {1, 2}
t = {1, 2, 3}

teste_subconjunto = s <= t
teste_proprio = s < t

```

No exemplo, `teste_subconjunto` retorna `True` pois todos os elementos de `s` estão em `t`. A variável `teste_proprio` também retorna `True`, pois além de estar contido, `s` não é idêntico a `t` (é menor).

## **Exercício de Fixação**

Dados `A = {1, 2}` e `B = {1, 2}`.
O resultado de `A < B` (subconjunto próprio) será `True` ou `False`? Justifique.

---

# 4.8. Álgebra de Conjuntos (Operações Binárias)

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

<img src="/api/materiais-assets/2-estruturas-de-dados/4-conjuntos/assets/diagrama_venn.png" width="500">

## **Exercício de Fixação**

Você tem o conjunto de alunos de inglês `ingles = {"Ana", "Bia"}` e espanhol `espanhol = {"Bia", "Caio"}`.
Escreva a operação para descobrir quem faz **apenas** inglês (e não faz espanhol).

---

# 4.9. Engenharia de Software e Performance

A decisão de utilizar um `set` em vez de uma `list` deve ser baseada na análise de complexidade algorítmica e na natureza do problema.

## A Tabela Hash

Internamente, o Python implementa sets utilizando **Tabelas Hash**. Ao contrário de uma lista, que armazena itens sequencialmente na memória, o set calcula um "endereço" (hash) único para cada dado inserido.

Quando executamos uma verificação de pertinência, o interpretador não percorre os itens um a um. Ele calcula o hash do elemento procurado e verifica diretamente aquela posição na memória.

# 4.10. Análise Assintótica (Big O Notation)

A tabela abaixo compara o custo computacional médio de operações de busca:

| Estrutura de Dados | Operação | Complexidade Média | Interpretação |
| --- | --- | --- | --- |
| **Lista (`list`)** | `x in lista` |  (Linear) | O tempo de busca cresce proporcionalmente ao tamanho dos dados. Em grandes volumes, torna-se ineficiente. |
| **Conjunto (`set`)** | `x in set` |  (Constante) | O tempo de busca é praticamente instantâneo e independe do tamanho do conjunto (seja 10 ou 10 milhões de itens). |

# 4.11. Conclusão Prática

O uso de sets é recomendado e considerado uma boa prática de engenharia quando a ordem dos elementos é irrelevante e a unicidade é necessária. O domínio desta estrutura permite ao programador escrever códigos não apenas semanticamente corretos, mas computacionalmente escaláveis.

## **Exercício de Fixação**

Para um sistema de login que precisa verificar se um e-mail já está cadastrado em uma base de 50 milhões de usuários, qual estrutura é melhor para armazenar os e-mails: Lista ou Set? Por quê?

---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre Conjuntos, confira os seguintes recursos:

---


