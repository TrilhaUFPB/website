---
title: 6. Pilhas e Filas
description: 
category: Programação
order: 6
---

# 6.1. Pilha

Uma Pilha, como estrutura de dados, é uma sequência lógica onde os elementos são inseridos e removidos apenas por uma das extremidades, denominada topo. Esse fluxo de manipulação é chamado de LIFO (Last In, First Out — o último a entrar é o primeiro a sair). Para exemplificar seu funcionamento, imagine uma pilha de livros organizada para estudo. Sempre que você adquire um novo material, você o coloca no topo para que ele seja o próximo a ser lido. A remoção segue a mesma lógica: você retira primeiro o que está em cima para acessar o conteúdo de forma ordenada. Da mesma forma, em uma pilha de dados, o acesso ocorre sempre pelo topo, garantindo que o elemento mais recente seja sempre o primeiro a ser processado.

<img src="images/stack.png" width=500>

## Operações principais

- Push (Empilhar): É a operação de inserção. Quando um novo dado é adicionado, ele é colocado obrigatoriamente no topo.
- Pop (Desempilhar): É a operação de remoção. Ela retira o elemento que está no topo (o último que entrou) e o retorna para quem fez a chamada.

Mas você pode estar se perguntando: qual é a real utilidade dessa estrutura? Quando tive meu primeiro contato com ela, confesso que me parecia apenas uma versão limitada de um array comum. Afinal, por que restringir o acesso apenas ao topo se podemos acessar qualquer posição em um array?

A resposta é que são ferramentas diferentes para propósitos diferentes. A Pilha não existe para armazenar dados aleatórios, mas para gerenciar o fluxo de execução. Nós a utilizamos quando a ordem de chegada dos dados dita a prioridade: o que aconteceu por último é, quase sempre, o mais relevante para o próximo passo.

O exemplo mais claro e cotidiano disso é o comando Ctrl+Z (Desfazer). Imagine que você está escrevendo: cada palavra ou formatação é 'empilhada' pelo software. Se você comete um erro, não quer apagar a primeira palavra que escreveu há dez minutos (o fundo da pilha); você quer remover exatamente a última ação realizada. É a restrição da pilha que torna esse mecanismo simples, rápido e logicamente seguro

## Em Python

Em Python, a estrutura de dados lista (list) é ideal para implementar uma pilha, pois oferece métodos eficientes para inserção e remoção no final da sequência.

### Operações para implementação da pilha

Essas são as três operações básicas da pilha: inserção(push), remoção(pop) e acesso(top).

```
.append(valor) # adiciona um elemento no topo
.pop() # remove e retorna o elemento do topo
lista[-1] # acessa o último elemento sem remover
```

# 6.2. Fila

Assim como as filas que existem no nosso cotidiano (no supermercado, por exemplo), as estruturas de dados do tipo fila seguem o mesmo princípio: o primeiro a entrar é o primeiro a sair (First In, First Out – FIFO). Dessa forma, dado um conjunto (ou vetor) de elementos, todos eles entram por uma extremidade da fila e saem pela outra, respeitando a ordem de chegada.

Um exemplo comum de uso dessa estrutura é uma fila de músicas, como em aplicativos de streaming (Spotify, por exemplo), em que as músicas são reproduzidas na mesma ordem em que foram adicionadas à fila.

<img src="images/queue.png" width=500>

## Operações principais

- Enfileirar (enqueue): adiciona um elemento ao final da fila.
- Desenfileirar (dequeue): remove o elemento que está no início da fila.
- Frente (front/peek): permite visualizar o primeiro elemento da fila, sem removê-lo.

## Em python

Em Python, uma fila pode ser implementada de forma simples utilizando uma lista, como mostrado a seguir:

```
fila = []

# Enfileirar elementos
fila.append("Música 1")
fila.append("Música 2")
fila.append("Música 3")

# Visualizar o primeiro elemento
print(fila[0])  # Música 1

# Desenfileirar elemento
fila.pop(0)
```

OBS: Embora seja possível implementar uma fila utilizando listas em Python, essa abordagem não é a mais eficiente, pois a remoção de elementos do início da lista (pop(0)) exige o deslocamento dos demais elementos. Para aplicações reais, recomenda-se o uso do módulo collections, especialmente da estrutura deque, que permite inserções e remoções eficientes nas extremidades da fila
