---
title: 6. Pilhas e Filas
description: Entenda a teoria e a prática por trás de Pilhas (LIFO) e Filas (FIFO), e saiba exatamente quando e como utilizar cada uma em seus projetos
category: Programação
order: 6
---

## Sumário

- [6.1. Pilha](#61-pilha)
- [6.2. Fila](#62-fila)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

# 6.1. Pilha

Uma Pilha, como estrutura de dados, é uma sequência lógica onde os elementos são inseridos e removidos apenas por uma das extremidades, denominada topo. Esse fluxo de manipulação é chamado de **LIFO (Last In, First Out — o último a entrar é o primeiro a sair)**. Para exemplificar seu funcionamento, imagine uma pilha de livros organizada para estudo. Sempre que você adquire um novo material, você o coloca no topo para que ele seja o próximo a ser lido. A remoção segue a mesma lógica: você retira primeiro o que está em cima para acessar o conteúdo de forma ordenada. Da mesma forma, em uma pilha de dados, o acesso ocorre sempre pelo topo, garantindo que o elemento mais recente seja sempre o primeiro a ser processado.

<img src="/api/materiais-assets/2-estruturas-de-dados/6-pilha-e-filas/assets/stack.png" width=500>

## Operações principais

- **Push** (Empilhar): É a operação de inserção. Quando um novo dado é adicionado, ele é colocado obrigatoriamente no topo.
- **Pop** (Desempilhar): É a operação de remoção. Ela retira o elemento que está no topo (o último que entrou) e o retorna para quem fez a chamada.

Mas você pode estar se perguntando: qual é a real utilidade dessa estrutura? Quando tive meu primeiro contato com ela, confesso que me parecia apenas uma versão limitada de um array comum. Afinal, por que restringir o acesso apenas ao topo se podemos acessar qualquer posição em um array?

A resposta é que são ferramentas diferentes para propósitos diferentes. A Pilha não existe para armazenar dados aleatórios, mas para **gerenciar o fluxo de execução**. Nós a utilizamos quando a ordem de chegada dos dados dita a prioridade: **o que aconteceu por último é, quase sempre, o mais relevante para o próximo passo.**

O exemplo mais claro e cotidiano disso é o comando Ctrl+Z (Desfazer). Imagine que você está escrevendo: cada palavra ou formatação é 'empilhada' pelo software. Se você comete um erro, não quer apagar a primeira palavra que escreveu há dez minutos (o fundo da pilha); você quer remover exatamente a última ação realizada. É a restrição da pilha que torna esse mecanismo simples, rápido e logicamente seguro

## Em Python

Em Python, a estrutura de dados lista (list) é ideal para implementar uma pilha, pois oferece métodos eficientes para inserção e remoção no final da sequência.

### Operações para implementação da pilha

Essas são as três operações básicas da pilha: **inserção**(push), **remoção**(pop) e **acesso**(top).

```python
.append(valor) # adiciona um elemento no topo
.pop() # remove e retorna o elemento do topo
lista[-1] # acessa o último elemento sem remover
```

# 6.2. Fila

Assim como as filas que existem no nosso cotidiano (no supermercado, por exemplo), as estruturas de dados do tipo fila seguem o mesmo princípio: **o primeiro a entrar é o primeiro a sair (First In, First Out – FIFO)**. Dessa forma, dado um conjunto (ou vetor) de elementos, todos eles entram por uma extremidade da fila e saem pela outra, respeitando a ordem de chegada.

Um exemplo comum de uso dessa estrutura é uma fila de músicas, como em aplicativos de streaming (Spotify, por exemplo), em que as músicas são reproduzidas na mesma ordem em que foram adicionadas à fila.

<img src="/api/materiais-assets/2-estruturas-de-dados/6-pilha-e-filas/assets/queue.png" width=500>

## Operações principais

- **Enfileirar** (enqueue): adiciona um elemento ao final da fila.
- **Desenfileirar** (dequeue): remove o elemento que está no início da fila.
- **Frente** (front/peek): permite visualizar o primeiro elemento da fila, sem removê-lo.

## Em python

Em Python, uma fila pode ser implementada de forma simples utilizando uma lista, como mostrado a seguir:

```python
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

OBS: Embora seja possível implementar uma fila utilizando listas em Python, essa abordagem **não é a mais eficiente**, pois a remoção de elementos do início da lista (pop(0)) **exige o deslocamento dos demais elementos**. Para aplicações reais, recomenda-se o uso do módulo collections, especialmente da estrutura deque, que permite inserções e remoções eficientes nas extremidades da fila.

---

# Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre Pilhas e Filas, confira os seguintes recursos:

- [Pilhas e Filas - Curso de Estruturas de Dados e Algoritmos em Python - Aula 5](https://www.youtube.com/watch?v=vOx3vY1w4tM&t=93s)


```quiz
- tipo: single
  pergunta: |
    Uma fila de impressão recebe documentos na seguinte sequência: `[Relatório, Fatura, Contrato, Email]`.
    Considerando o princípio FIFO (First In, First Out), se o sistema realizar duas operações de desenfileirar (dequeue) e, em seguida, adicionar um novo documento chamado "Nota Fiscal" (enqueue), como ficará a fila?
  opcoes:
    - texto: "[Contrato, Email, Nota Fiscal]"
      correta: true
      explicacao: "Correto! As duas operações de `dequeue` removem os primeiros elementos que chegaram ('Relatório' e 'Fatura'). Em seguida, o `enqueue` adiciona 'Nota Fiscal' ao final da fila."
      explicacao_erro: "Lembre-se do conceito de FIFO: os primeiros a entrar são os primeiros a sair. Os dois `dequeues` tiram os 2 primeiros itens. O `enqueue` coloca o novo no final."
    - texto: "[Relatório, Fatura, Nota Fiscal]"
      correta: false
      explicacao: "Essa opção manteria os primeiros itens e removeria os últimos. Isso seria o comportamento de uma Pilha (LIFO), e não de uma Fila."
    - texto: "[Nota Fiscal, Contrato, Email]"
      correta: false
      explicacao: "O `enqueue` adiciona um item ao final da fila, não no início."
    - texto: "[Email, Contrato, Nota Fiscal]"
      correta: false
      explicacao: "A ordem dos elementos remanescentes não se inverte quando estão aguardando na fila."

- tipo: single
  pergunta: |
    Você está programando um sistema de "Voltar" para um navegador. O usuário acessou a página A, depois a B, e por fim a C. Se o usuário clicar em "Voltar", para qual página ele deve ir? Que estrutura de dados você usaria para isso?
  opcoes:
    - texto: "Fila, para garantir que a página A seja a primeira a ser exibida."
      correta: false
      explicacao: "Se fosse uma Fila (FIFO), clicar em 'Voltar' te levaria para a página A (a primeira visitada de todas), o que quebra a navegação do usuário."
    - texto: "Lista simples, pois não faz diferença a ordem."
      correta: false
      explicacao: "A ordem é estritamente essencial para garantir que o usuário retorne exatamente para a página anterior imediata."
    - texto: "Fila, pois é um sistema de histórico."
      correta: false
      explicacao: "Filas processam por ordem de chegada (o mais antigo primeiro). Históricos precisam retroceder a partir do item mais recente, portanto usam Pilhas."
    - texto: "Pilha, pois a última página visitada (C) deve ser a primeira a ser removida."
      correta: true
      explicacao: "Correto! O histórico de navegação funciona baseando-se no princípio LIFO (Último a Entrar, Primeiro a Sair). A última página visitada fica no topo da Pilha."
      explicacao_erro: "Sistemas como o botão de 'Voltar' ou 'Desfazer' usam Pilhas (LIFO), pois você precisa retornar ao estado mais recente que foi registrado."

- tipo: single
  pergunta: "Por que dizemos que o `pop()` em uma pilha é uma operação O(1) (tempo constante)?"
  opcoes:
    - texto: "Porque ele precisa percorrer toda a lista para achar o último item."
      correta: false
      explicacao: "O computador já possui o ponteiro ou o índice apontando diretamente para o topo, então ele não precisa percorrer a lista (o que seria uma operação O(n))."
    - texto: "Porque ele sempre remove o elemento do topo, sem precisar mover outros itens."
      correta: true
      explicacao: "Correto! Ao remover o último elemento adicionado (topo), todos os outros elementos permanecem intactos em seus lugares originais, tornando a operação instantânea, independentemente do tamanho da pilha."
      explicacao_erro: "Em uma pilha, você só interage com uma extremidade (o topo). Remover esse elemento não exige reindexar ou deslocar o restante dos dados."
    - texto: "Porque ele apaga toda a memória do computador."
      correta: false
      explicacao: "O método `pop()` atua removendo apenas um elemento específico (o do topo) daquela estrutura de dados, não afetando a memória como um todo."
    - texto: "Porque ele sempre remove o primeiro item da lista."
      correta: false
      explicacao: "Remover o primeiro item é característico do `dequeue` de uma Fila. Em implementações simples de array, isso inclusive exigiria reposicionar os outros elementos, tornando o custo O(n)."
```
