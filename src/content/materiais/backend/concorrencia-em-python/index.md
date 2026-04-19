---
title: Concorrência em Python
description: Como fazer um código concorrênte em Python
category: Backend
order: 12
---

# 11.1 Global Interpreter Lock (GIL)

Quando você começa a pensar em fazer um backend em Python lidar com várias coisas ao mesmo tempo, uma ideia aparece rápido: usar threads.

Uma thread é, de forma simples, uma segunda linha de execução dentro do mesmo programa. Em vez de executar uma única sequência do início ao fim, o processo pode ter duas ou mais sequências avançando e compartilhando a mesma memória.

No Python mais comum em produção, existe um detalhe do interpretador que muda uma expectativa importante sobre threads. Esse detalhe é o GIL.

## O que é o GIL

GIL significa Global Interpreter Lock.

No CPython, que é a implementação padrão do Python, o GIL é um mecanismo interno que faz com que, dentro de um mesmo processo, apenas uma thread execute código Python por vez.

Isso não impede a existência de múltiplas threads. O que acontece é que elas se revezam para executar. Em alguns momentos, uma thread está executando; em outros, ela está esperando e outra assume.

## Por que isso existe

O CPython precisa gerenciar memória e estruturas internas enquanto seu programa roda. O GIL simplifica essa coordenação dentro do interpretador, reduzindo complexidade interna.

O custo é que esse modelo limita o paralelismo real usando threads quando o trabalho é principalmente executar código Python.

## O que isso muda na prática

O efeito mais importante do GIL aparece quando você tenta acelerar tarefas que gastam tempo em CPU, como cálculos pesados, processamento de imagens ou compressão de dados.

Nesses casos, criar várias threads no mesmo processo não significa usar vários núcleos ao mesmo tempo para executar Python. As threads vão disputar o direito de executar, e o ganho costuma ser pequeno ou nenhum.

Já quando a tarefa passa muito tempo esperando I/O, como banco de dados, rede ou disco, threads ainda podem ser úteis. Enquanto uma thread está esperando uma resposta externa, outra pode avançar, e isso melhora o aproveitamento do tempo.

## O que o GIL não resolve

É tentador pensar que, já que apenas uma thread executa Python por vez, então não existe risco de conflito entre threads. Isso não é verdade.

Threads ainda compartilham memória, e você ainda pode ter bugs de concorrência quando duas threads mexem no mesmo estado em momentos inesperados. O GIL não substitui as regras de cuidado com dados compartilhados.

## Um detalhe que evita conclusões absolutas

O GIL limita paralelismo para código Python puro, mas nem tudo que um programa faz é Python puro. Algumas bibliotecas executam parte do trabalho em código nativo e podem liberar o GIL durante esse trecho. Nesses casos, pode existir paralelismo real mesmo com threads. Esse é um detalhe avançado, mas vale como alerta para não tratar o GIL como uma regra universal para qualquer tipo de tarefa.

## Nota sobre Python mais recente

A partir do Python 3.13, existe uma build opcional chamada free-threaded, na qual o GIL pode ser desabilitado. Ainda assim, o padrão mais comum continua sendo a build com GIL, então este material assume o comportamento padrão do CPython.

## Checklist rápido

- Eu sei que o GIL limita a execução simultânea de código Python por threads dentro do mesmo processo no CPython.
- Eu entendo por que threads não são a solução padrão para acelerar CPU-bound em Python.
- Eu entendo por que threads ainda fazem sentido quando o tempo é dominado por espera de I/O.
- Eu sei que o GIL não elimina problemas de dados compartilhados em concorrência.

## Fontes 

https://docs.python.org/3/howto/free-threading-python.html  

https://peps.python.org/pep-0703/  

https://docs.python.org/3/library/threading.html  

https://docs.python.org/3/library/multiprocessing.html  

https://pages.cs.wisc.edu/~remzi/OSTEP/  



---
# 11.2 Threading

Threading é uma forma de executar múltiplas linhas de execução dentro do mesmo processo. Em vez de um programa fazer uma única sequência do início ao fim, ele pode ter mais de uma sequência avançando e o sistema operacional alterna entre elas rapidamente.

A palavra chave aqui é compartilhamento: threads do mesmo processo compartilham a mesma memória. Isso é útil porque elas conseguem acessar os mesmos objetos e dados sem precisar copiar tudo, mas também é o motivo de existirem bugs clássicos de concorrência quando várias threads mexem no mesmo estado.

## Quando threading ajuda em backend

Threading costuma ajudar quando o trabalho é dominado por I/O, ou seja, boa parte do tempo da requisição é espera por banco, rede, disco ou outro serviço. Enquanto uma thread está esperando, outra pode aproveitar para avançar.

O resultado prático é melhor aproveitamento do tempo de espera e, em alguns cenários, mais throughput com o mesmo hardware.

## Quando threading não é a melhor escolha

Threading não costuma ser a forma mais direta de acelerar trabalho dominado por CPU no CPython padrão. O motivo é que threads se revezam para executar código Python e, nesse tipo de workload, o gargalo não é espera, é processamento.

Além disso, criar threads sem controle pode aumentar overhead e fazer o sistema passar mais tempo coordenando do que trabalhando, especialmente quando o número de threads cresce muito.

## O principal risco: estado compartilhado

Como threads compartilham memória, você pode cair em um problema chamado condição de corrida.

Condição de corrida acontece quando o resultado depende da ordem em que as threads executam. Se duas threads acessam e atualizam o mesmo dado quase ao mesmo tempo, uma pode sobrescrever o efeito da outra e você fica com um estado inconsistente.

Um termo útil aqui é seção crítica: o trecho de código que acessa um recurso compartilhado e precisa ser protegido para não ser executado por duas threads ao mesmo tempo.

## Exemplo curto em Python

O exemplo abaixo mostra um contador sendo atualizado por duas threads. Parece simples, mas pode falhar porque atualizar um número pode envolver mais de um passo interno.

### Exemplo sem proteção

```python
import threading

contador = 0

def incrementar():
    global contador
    for _ in range(100000):
        contador += 1

t1 = threading.Thread(target=incrementar)
t2 = threading.Thread(target=incrementar)

t1.start()
t2.start()
t1.join()
t2.join()

print(contador)
````

Em um mundo perfeito, o resultado seria sempre 200.000. Porém,  na prática você pode ver valores menores.

### Exemplo com lock

Um lock é um mecanismo simples: antes de entrar na seção crítica, a thread pega o lock. Enquanto uma thread estiver com o lock, as outras esperam. Isso garante que só uma faça aquela atualização por vez.

```python
import threading

contador = 0
lock = threading.Lock()

def incrementar():
    global contador
    for _ in range(100000):
        with lock:
            contador += 1

t1 = threading.Thread(target=incrementar)
t2 = threading.Thread(target=incrementar)

t1.start()
t2.start()
t1.join()
t2.join()

print(contador)
```

O lock resolve a inconsistência, mas cobra um preço: ele reduz a quantidade de execução simultânea naquela seção crítica. Quanto maior e mais frequente a seção crítica, menor tende a ser o ganho de usar threads.

## Como threading aparece em APIs na prática

No mundo real, a forma mais comum de usar threads em backend é para paralelizar I/O, como chamadas a serviços externos, downloads, leitura de arquivos, consultas independentes.

O cuidado essencial é evitar compartilhar estado mutável entre threads sem proteção. Em APIs, isso costuma aparecer quando alguém coloca caches simples em variáveis globais, acumula métricas na mão, ou reutiliza objetos não thread-safe sem controle.

## Fontes 

https://docs.python.org/3/library/threading.html  

https://docs.python.org/3/library/_thread.html  

https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf  


---
# 11.3 Multiprocessing

Multiprocessing é a abordagem mais direta em Python para ganhar paralelismo real em tarefas pesadas de CPU.

A ideia é simples: em vez de criar várias threads dentro do mesmo processo, você cria vários processos. Cada processo é como uma instância separada do programa, com sua própria memória. Como são processos distintos, o sistema operacional consegue executar vários deles ao mesmo tempo em núcleos diferentes.

Isso tem uma consequência importante: como cada processo tem sua própria memória, eles não compartilham variáveis da forma que threads compartilham. Se você quer que um processo entregue um resultado para outro, você precisa passar dados explicitamente.

## Quando multiprocessing faz sentido

Multiprocessing costuma ser uma boa escolha quando a parte dominante do trabalho é CPU, por exemplo:

- transformar grandes volumes de dados
- compressão, hash, criptografia em lote
- processamento de imagens e arquivos pesados
- cálculos longos e repetitivos

A motivação é que, em tarefas assim, você quer realmente dividir o trabalho para que múltiplos núcleos possam executar ao mesmo tempo.

## O custo: memória e comunicação

Multiprocessing cobra um preço. Como cada processo tem sua própria memória, você tende a usar mais RAM do que usaria com threads. Além disso, enviar dados de um processo para outro tem custo. O Python precisa serializar os dados para atravessar a fronteira entre processos.

Isso leva a uma regra prática útil: multiprocessing funciona melhor quando cada unidade de trabalho é grande o suficiente para compensar o custo de criar processos e transferir dados.

## Um erro comum de iniciante

Um erro comum é tentar dividir um trabalho em muitos processos com tarefas pequenas demais. O sistema passa mais tempo gerenciando processos e movendo dados do que realmente executando o trabalho.

Outro erro comum é supor que uma variável global vai ser compartilhada entre processos. Em geral, não vai. Cada processo tem sua própria cópia, então alterações em um processo não aparecem automaticamente nos outros.

## Exemplo

Abaixo está um exemplo simples usando `multiprocessing.Pool` para executar uma função em paralelo.

A regra mais importante no exemplo é o bloco `if __name__ == "__main__":`. Ele evita que o Python reexecute o arquivo inteiro ao criar novos processos em alguns sistemas, o que pode gerar comportamento estranho ou até loop de criação de processos.

```python
import hashlib
from multiprocessing import Pool, cpu_count

def hash_texto(texto: str) -> str:
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()

def main():
    entradas = [f"item_{i}" for i in range(200_000)]

    with Pool(processes=cpu_count()) as pool:
        hashes = pool.map(hash_texto, entradas)

    print(hashes[0])

if __name__ == "__main__":
    main()
````

A leitura que você deve fazer aqui é: o trabalho foi dividido em vários processos e cada processo executa a função em uma parte das entradas. Como o trabalho é computacional, isso é o tipo de cenário em que multiprocessing tende a trazer ganho.

## Checklist rápido

* Eu entendo que multiprocessing usa processos, não threads.
* Eu sei que processos têm memória separada e não compartilham variáveis automaticamente.
* Eu sei que multiprocessing é uma boa escolha para CPU-bound.
* Eu entendo que comunicação entre processos tem custo e pode anular ganhos se as tarefas forem pequenas.

## Fontes 

https://docs.python.org/3/library/multiprocessing.html

https://docs.python.org/3/library/concurrent.futures.html

https://pages.cs.wisc.edu/~remzi/OSTEP/

https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf



---
# 11.4 Asyncio e event loop

Asyncio é a base da programação assíncrona moderna em Python e assim como já foi falado sobre I/O-bound anteriormente, essa ferramente é perfeita para isso. Ele existe para lidar bem com cenários em que o programa passa muito tempo esperando I/O, como rede, banco, disco e chamadas a outros serviços.

A ideia central é que, em vez de criar uma thread para cada tarefa que está esperando, você mantém um único fluxo de execução coordenando várias tarefas em progresso. Essa coordenação é feita pelo event loop.

## O que é o event loop

O event loop, loop de eventos, é um componente que fica rodando continuamente e decide qual tarefa pode avançar a cada momento.

Ele funciona bem quando tarefas fazem o seguinte padrão:

1) executam um pouco de código
2) iniciam uma operação de I/O e passam a esperar
3) liberam o controle
4) quando o I/O termina, retomam do ponto onde pararam

Esse modelo evita desperdício de recursos com milhares de threads bloqueadas e costuma melhorar throughput quando o problema é esperar, não calcular.

## O que significa `async` e `await`

Em Python, `async def` define uma função assíncrona, também chamada de coroutine. Ela representa um fluxo que pode pausar e retomar.

`await` é a forma de dizer: espere por este resultado, mas sem bloquear o programa do jeito tradicional. Enquanto essa tarefa está esperando, o event loop pode executar outras tarefas que também estejam prontas para avançar.

Um jeito simples de pensar: `await` marca um ponto em que o código pode ceder o controle para que outra tarefa progrida.

## O que asyncio não resolve

Asyncio não é uma forma automática de fazer CPU pesado ficar mais rápido.

Se você colocar uma tarefa CPU-bound dentro do event loop e ela passar segundos calculando sem parar, você trava o loop e impede outras tarefas de progredirem. Nesse caso, o sistema perde justamente a vantagem que asyncio oferece.

Por isso, asyncio é uma ferramenta para I/O-bound. Para CPU-bound, você normalmente combina com processos ou manda o trabalho pesado para fora do event loop.

## Exemplo

Neste exemplo, duas operações de I/O são simuladas com `asyncio.sleep`. O objetivo é visualizar o efeito de iniciar duas esperas e aguardar as duas juntas.

```python
import asyncio

async def buscar_cursos():
    await asyncio.sleep(2)
    return ["curso_01", "curso_02"]

async def buscar_inscricoes():
    await asyncio.sleep(2)
    return ["insc_01"]

async def main():
    cursos, inscricoes = await asyncio.gather(
        buscar_cursos(),
        buscar_inscricoes(),
    )
    print(cursos, inscricoes)

asyncio.run(main())
````

A leitura correta é: as duas funções ficam muito tempo esperando, então faz sentido coordenar essas esperas no event loop. Em vez de esperar uma terminar para começar a outra, elas progridem em conjunto e o tempo total tende a ficar próximo do tempo da espera mais longa.

## Um erro comum de iniciante

Um erro comum é misturar funções bloqueantes com asyncio. Se você usa uma função que bloqueia de verdade dentro de uma coroutine, você para o loop inteiro.

Outro erro comum é achar que `async` significa mais rápido sempre. Ele significa melhor uso do tempo quando existe espera, e piora a vida quando você usa para CPU pesado sem estratégia.

## Checklist rápido

* Eu sei que asyncio é focado em I/O-bound.
* Eu sei que o event loop coordena várias tarefas em progresso.
* Eu sei que `async def` define uma coroutine e `await` marca um ponto de espera cooperativa.
* Eu entendo que CPU pesado dentro do event loop pode travar outras tarefas.
* Eu sei que misturar código bloqueante com asyncio pode anular os benefícios.

## Fontes 

https://docs.python.org/3/library/asyncio.html

https://docs.python.org/3/library/asyncio-task.html

https://docs.python.org/3/library/asyncio-eventloop.html

https://fastapi.tiangolo.com/async/




---
# 11.5 Erros comuns em código concorrente

Código concorrente tem um tipo de dificuldade particular: ele pode funcionar dez vezes e falhar na décima primeira, mesmo sem você ter mudado nada. Isso acontece porque a ordem em que as partes do programa executam pode variar a cada execução. Quando o resultado depende dessa ordem, você entra em uma categoria de bugs que são difíceis de reproduzir e difíceis de depurar.

A seguir estão os erros mais comuns que aparecem quando se usa threads, processos ou asyncio em Python.

## Condição de corrida ao usar estado compartilhado

A ideia do exemplo é simples: duas threads tentam somar 1 no mesmo contador muitas vezes.

O problema é que `contador += 1` não é uma única ação. Ele envolve, de forma simplificada, três passos: ler o valor atual, somar 1 e escrever de volta. Se duas threads fazem isso ao mesmo tempo, uma pode sobrescrever o resultado da outra, e algumas somas se perdem.

### Exemplo sem proteção

```python
import threading

contador = 0  # estado compartilhado entre as threads

def incrementar():
    global contador
    for _ in range(100_000):
        contador += 1  # lê, soma e escreve (pode "perder" atualizações)

t1 = threading.Thread(target=incrementar)
t2 = threading.Thread(target=incrementar)

t1.start()  # inicia a primeira thread
t2.start()  # inicia a segunda thread

t1.join()   # espera a primeira thread terminar
t2.join()   # espera a segunda thread terminar

print(contador)
````

O que você esperaria: `200_000`.
O que pode acontecer: um valor menor, porque algumas atualizações foram perdidas por disputa.

### Exemplo com lock

Aqui usamos um `Lock` para garantir que apenas uma thread por vez execute o trecho que altera `contador`. Esse trecho é a seção crítica.

```python
import threading

contador = 0
lock = threading.Lock()

def incrementar():
    global contador
    for _ in range(100_000):
        with lock:        # pega o lock
            contador += 1 # seção crítica: altera estado compartilhado
        # ao sair do with, o lock é liberado

t1 = threading.Thread(target=incrementar)
t2 = threading.Thread(target=incrementar)

t1.start()
t2.start()

t1.join()
t2.join()

print(contador)
```

Agora o resultado tende a ser consistente, porque o acesso ao contador foi serializado naquele ponto.

## Deadlock ao usar múltiplos locks

Deadlock é quando duas threads ficam travadas esperando uma pela outra.

A receita clássica é:
- Thread 1 pega o lock A e tenta pegar o lock B
- Thread 2 pega o lock B e tenta pegar o lock A
- nenhuma solta o que já pegou, então nenhuma consegue avançar

### Exemplo didático

```python
import threading
import time

lock_a = threading.Lock()
lock_b = threading.Lock()

def tarefa_1():
    with lock_a:            # pega A
        time.sleep(0.1)     # só para aumentar a chance de conflito
        with lock_b:        # tenta pegar B
            pass

def tarefa_2():
    with lock_b:            # pega B
        time.sleep(0.1)
        with lock_a:        # tenta pegar A
            pass

t1 = threading.Thread(target=tarefa_1)
t2 = threading.Thread(target=tarefa_2)

t1.start()
t2.start()
t1.join()
t2.join()
````

Se o timing bater do jeito ruim, `tarefa_1` fica esperando `lock_b` e `tarefa_2` fica esperando `lock_a`, e o programa não termina.

Uma regra prática simples para evitar isso é sempre adquirir locks na mesma ordem no projeto. Se todo mundo pega A antes de pegar B, esse deadlock específico não acontece.


## Misturar código bloqueante dentro de asyncio

Asyncio depende de cooperação: uma tarefa só deixa outras avançarem quando ela faz `await` em algo que libera o controle para o event loop.

Se você usa uma chamada bloqueante, o loop inteiro fica parado, mesmo que existam outras tarefas prontas para executar.

### Exemplo ruim (bloqueia o event loop)

```python
import asyncio
import time

async def tarefa():
    time.sleep(2)   # bloqueia de verdade, o event loop para aqui
    return "ok"

async def main():
    resultados = await asyncio.gather(tarefa(), tarefa())
    print(resultados)

asyncio.run(main())
````

Apesar de parecer duas tarefas em paralelo, elas não progridem bem porque o `time.sleep` trava tudo.

### Exemplo correto para simular espera (não bloqueia)

```python
import asyncio

async def tarefa():
    await asyncio.sleep(2)  # pausa esta tarefa, mas deixa o loop seguir
    return "ok"

async def main():
    resultados = await asyncio.gather(tarefa(), tarefa())
    print(resultados)

asyncio.run(main())
```

Aqui as duas tarefas conseguem ficar esperando ao mesmo tempo, porque cada uma cede o controle ao loop durante a espera.

## Achar que threads resolvem CPU pesado

Um erro comum é usar threads tentando acelerar processamento pesado e concluir que threading não funciona.

Threading funciona, mas o ganho real aparece principalmente quando há espera por I/O. Para CPU-bound, threads no CPython padrão tendem a disputar execução e o ganho costuma ser pequeno. Para CPU pesado, processos normalmente são uma escolha mais direta.

Esse erro aparece muito em APIs quando alguém tenta paralelizar validações pesadas, compressão ou transformações grandes com threads e não vê melhora.


## Criar concorrência demais e transformar tudo em fila

Outro erro é achar que aumentar concorrência sempre melhora throughput.

Na prática, concorrência demais só empurra o gargalo para outro lugar: banco de dados, conexões, memória, scheduler do sistema, ou a própria rede. O sintoma típico é latência crescendo até timeout.

O comportamento saudável é ter limites e assumir que recusar cedo pode ser melhor do que acumular trabalho até quebrar.

## Esquecer que processos não compartilham memória

Em multiprocessing, cada processo tem sua própria memória. Variáveis globais e objetos criados em um processo não são, em geral, os mesmos do outro.

Um erro comum é alterar uma variável global em um worker e esperar que o processo principal enxergue a mudança. Para compartilhar resultados, você normalmente devolve valores, usa filas, pipes ou estruturas próprias do módulo.

## Checklist rápido

* Eu evito compartilhar estado mutável entre threads sem proteção.
* Eu sei identificar e evitar padrões de deadlock.
* Eu não uso threads esperando acelerar CPU pesado sem considerar processos.
* Eu não uso chamadas bloqueantes dentro de coroutines em asyncio.
* Eu evito concorrência sem limites que apenas cria fila e aumenta latência.
* Eu lembro que processos têm memória separada e exigem comunicação explícita.

## Fontes 

https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf

https://docs.python.org/3/library/threading.html

https://docs.python.org/3/library/multiprocessing.html

https://docs.python.org/3/library/asyncio.html

https://docs.python.org/3/library/asyncio-task.html
