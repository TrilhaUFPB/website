---
title: 10. Concorrência e Paralelismo
description: Programação concorrente
category: Backend
order: 10
---
- [10.0. Concorrência versus paralelismo](#100-concorrencia-versus-paralelismo)
- [10.1. Workloads CPU-bound e I/O-bound](#101-workloads-cpu-bound-e-io-bound)
- [10.2. Limites, contexto e responsabilidades](#102-impactos-em-servidores-web)
- [10.3. Limites, contexto e responsabilidades](#103-backpressure-e-sistemas-sob-carga)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

# 10.0. Concorrência versus paralelismo

Quando uma API está em produção, ela raramente atende um usuário por vez. Várias requisições chegam ao mesmo tempo, cada uma com seu próprio tempo de execução e suas próprias esperas. O servidor precisa decidir como organizar esse trabalho para continuar respondendo com previsibilidade.

É aqui que entram dois conceitos que parecem iguais, mas explicam comportamentos bem diferentes em sistemas reais: concorrência e paralelismo.


## Concorrência

Concorrência é sobre lidar com várias tarefas em progresso no mesmo intervalo de tempo.

O ponto central é coordenação: como você organiza o trabalho para que múltiplas requisições avancem, mesmo que cada uma tenha momentos de espera. Em um backend, isso acontece o tempo todo, porque uma requisição raramente é só processamento contínuo. Ela costuma alternar entre pequenos trechos de CPU e períodos de espera por I/O, como banco de dados, rede ou disco.

Concorrência, portanto, é uma forma de estruturar o sistema para que ele não fique parado quando uma parte do trabalho precisa aguardar.

## Paralelismo

Paralelismo é sobre executar várias tarefas ao mesmo tempo, de forma simultânea.

Aqui a ideia é capacidade de execução simultânea, normalmente usando múltiplos núcleos de CPU. Paralelismo é o que você busca quando o gargalo é processamento e você quer terminar mais trabalho em menos tempo.

Paralelismo não resolve espera. Se a tarefa está parada aguardando I/O, colocar mais núcleos não acelera essa espera. Por outro lado, se a tarefa é cálculo pesado, paralelismo pode ser a diferença entre atender em segundos ou em minutos.

### Diferença prática

Uma forma confiável de separar:

- concorrência é organização e progresso de várias tarefas
- paralelismo é execução simultânea de várias tarefas

Você pode ter concorrência sem paralelismo. Por exemplo, um servidor pode alternar entre muitas requisições em progresso em um único núcleo, avançando um pouco em cada uma quando faz sentido, especialmente quando várias estão esperando por I/O.

Você também pode ter paralelismo sem muita concorrência. Por exemplo, rodar poucos trabalhos longos e pesados, cada um ocupando um núcleo, com pouca alternância.

Em APIs, os dois costumam aparecer juntos, mas o que domina depende do tipo de trabalho que sua aplicação faz, algo que fica mais claro no próximo tópico.

#### Exemplo

Imagine um backend recebendo três requisições ao mesmo tempo:

- Requisição A: valida dados e espera o banco responder
- Requisição B: chama um serviço externo e espera a rede
- Requisição C: gera um relatório com cálculo pesado

Um jeito de visualizar é pensar em uma linha do tempo onde CPU e espera se alternam:

```text
Tempo:        t0   t1   t2   t3   t4
Req A:       CPU  I/O  I/O  CPU  fim
Req B:       I/O  CPU  I/O  CPU  fim
Req C:       CPU  CPU  CPU  CPU  fim
```
>I/O significa input/output, ou entrada e saída. Em backend, é qualquer parte do processamento em que o programa precisa esperar dados virem de fora ou precisa enviar dados para fora.

Concorrência é o que permite que, enquanto A e B estão em espera (I/O), o servidor avance em outra coisa, em vez de ficar parado. Paralelismo é o que permite que C não bloqueie todo o sistema quando o trabalho é essencialmente CPU.

O objetivo, em ambos os casos, é manter o servidor responsivo e previsível mesmo com múltiplas requisições chegando.

## Checklist rápido

* Eu sei explicar concorrência como várias tarefas em progresso com coordenação.
* Eu sei explicar paralelismo como execução simultânea.
* Eu entendo que concorrência pode existir mesmo em um único núcleo.
* Eu entendo que paralelismo depende de recursos de execução, principalmente CPU.

---

# 10.1. Workloads CPU-bound e I/O-bound

Depois de entender a diferença entre concorrência e paralelismo, o próximo passo é aprender a classificar o tipo de trabalho que uma requisição executa. Isso importa porque o gargalo muda completamente a estratégia.

Em backends, quase tudo que acontece dentro de uma requisição cai em uma destas duas categorias:

- CPU-bound: o tempo é gasto processando
- I/O-bound: o tempo é gasto esperando

Na prática, a maioria das APIs tem uma mistura das duas coisas, mas quase sempre existe uma parte que domina.

## CPU-bound

Uma carga de trabalho é CPU-bound quando o que mais consome tempo é computação. A requisição passa a maior parte do tempo executando instruções, transformando dados, calculando, serializando volumes grandes, comprimindo, criptografando, gerando arquivos.

Sinais típicos:

- uso de CPU alto durante a requisição
- tempo de resposta cresce conforme a CPU satura
- colocar mais núcleos costuma melhorar capacidade

Em CPU-bound, concorrência por si só não cria capacidade. Ela organiza o trabalho, mas se todo trabalho exige CPU o tempo inteiro, você só aumenta competição pela CPU. O resultado comum de concorrência excessiva aqui é aumento de latência por fila e por overhead de alternância.
>**Overhead de alternância** é o custo em tempo e processamento que o sistema operacional paga toda vez que precisa trocar a execução de um  processo por outro, salvando e restaurando estados da CPU, o que não produz trabalho útil, apenas permite a troca.


## I/O-bound

Uma carga de trabalho é I/O-bound quando o que mais consome tempo é espera por algo fora do processo: banco, rede, disco, filas, serviços externos.

Sinais típicos:

- CPU relativamente baixa, mas tempo de resposta alto
- muitas requisições simultâneas pioram a latência principalmente por filas em dependências
- melhorar concorrência tende a aumentar throughput porque o servidor aproveita o tempo de espera para avançar outras requisições

Em I/O-bound, concorrência costuma trazer ganho real porque você consegue sobrepor esperas. Mas isso tem um limite: se você aumentar concorrência sem controle, você pode apenas empurrar o gargalo para a dependência, como o banco, criando filas maiores e piorando o sistema.

## Como identificar na prática

Uma forma simples de pensar, sem ferramentas avançadas, é observar onde o tempo está indo:

- se o servidor está ocupado calculando, é CPU-bound
- se o servidor está parado esperando respostas, é I/O-bound

Outra forma de fixar é imaginar a linha do tempo de uma requisição:

- CPU-bound: quase tudo é execução contínua
- I/O-bound: execução curta, espera longa, execução curta, espera longa

## Exemplo

Considere dois endpoints em um backend.

### Endpoint A: gerar relatório

Esse endpoint faz agregações pesadas e gera um arquivo. A maior parte do tempo é CPU.

Quando a carga aumenta, ele tende a saturar CPU. Se você tentar atender muitas requisições desse tipo ao mesmo tempo, cada uma fica mais lenta porque compete por CPU. Nesse cenário, paralelismo com mais núcleos ajuda, mas existe um limite físico.

### Endpoint B: listar cursos

Esse endpoint faz uma consulta no banco e monta uma resposta JSON pequena. A maior parte do tempo é espera.

Quando a carga aumenta, o comportamento típico é:

- o servidor passa a ter várias requisições esperando o banco
- a API fica lenta não por falta de CPU, mas por fila no banco ou em conexões
- mais concorrência pode aumentar capacidade até o ponto em que o banco vira gargalo dominante

Esse exemplo deixa claro o ponto principal: os dois endpoints podem ter a mesma rota bem desenhada e o mesmo contrato, mas exigem estratégias diferentes para manter previsibilidade sob carga.

## Armadilhas comuns de iniciante

- Tratar tudo como CPU-bound e tentar resolver com mais processamento, quando o problema real é espera por banco ou serviço externo.
- Tratar tudo como I/O-bound e aumentar concorrência sem limite, sobrecarregando dependências e aumentando a fila.
- Ignorar que serialização e validação podem virar CPU-bound quando o volume de dados cresce.
- Confundir latência com lentidão do código. Muitas vezes a latência vem de espera, não de execução.

## Checklist rápido

- Eu sei explicar CPU-bound como tempo dominado por processamento.
- Eu sei explicar I/O-bound como tempo dominado por espera.
- Eu entendo que concorrência ajuda mais em I/O-bound do que em CPU-bound.
- Eu entendo que aumentar concorrência sem controle pode piorar dependências e filas.
- Eu consigo olhar para um endpoint e apontar o que provavelmente domina o tempo.

---
# 10.2. Impactos em servidores web


Quando você coloca uma API no ar, ela passa a ser um sistema que recebe tráfego, organiza requisições e disputa recursos limitados. O servidor web é justamente a camada que sustenta esse ciclo: aceitar conexões, transformar dados em requisições e coordenar a execução do seu código para produzir respostas.

A forma como o servidor organiza esse trabalho determina três coisas que o consumidor percebe rapidamente:

- latência, quanto tempo cada requisição demora
- throughput, quantas requisições por segundo o sistema completa
- estabilidade, se o sistema degrada de forma controlada ou entra em colapso quando a demanda sobe


## O que muda quando chegam várias requisições

Em baixa carga, quase qualquer abordagem parece suficiente. O problema aparece quando requisições chegam em volume e começam a disputar recursos.

O comportamento típico sob aumento de carga é que filas começam a se formar em algum ponto do caminho. Quando uma fila cresce, a latência cresce junto. E latência maior significa que cada requisição fica viva por mais tempo, prendendo recursos por mais tempo. Esse efeito de acúmulo é uma das razões pelas quais um sistema pode sair de estável para aparentemente travado em poucos minutos quando passa do limite.

## Por que requisições em espera ainda custam caro

Uma requisição que está esperando o banco ou um serviço externo não é gratuita. Mesmo sem estar usando CPU o tempo todo, ela mantém estado em memória, ocupa alguma forma de slot interno do servidor e mantém conexões abertas em algum lugar do caminho. Se muitas requisições entram em espera ao mesmo tempo, o servidor passa a carregar um volume grande de trabalho em progresso, e isso pressiona memória, limites de conexões e o próprio agendador do sistema operacional.

Esse ponto é crucial para entender por que aumentar concorrência nem sempre melhora o sistema. Concorrência ajuda principalmente quando existe muita espera, mas ela também aumenta o número de requisições que ficam vivas ao mesmo tempo.

## Modelos comuns de servidor e onde o gargalo aparece

Existem diferentes formas de organizar atendimento, mas a consequência prática costuma ser esta: você não elimina fila, você escolhe onde ela aparece e quanto controle você tem sobre ela.

Em um modelo mais clássico, cada worker processa uma requisição por vez. Isso é simples de entender e, em muitos casos, funciona bem para cargas de trabalho que exigem CPU por períodos longos. O problema aparece quando as requisições passam muito tempo esperando I/O. Nesse cenário, o sistema precisa criar muitos processos  para dar conta do volume de requisições. Quanto mais deles existem, mais memória é usada e mais tempo o computador gasta só organizando e alternando entre essas tarefas, em vez de realmente executar o trabalho.

Em um modelo que permite manter várias requisições em progresso dentro do mesmo processo, o sistema lida melhor com I/O bound, porque enquanto uma requisição espera, outra pode avançar. Esse modelo reduz a necessidade de milhares de threads, mas exige mais disciplina: se você coloca trechos que bloqueiam CPU por muito tempo, você perde a vantagem. Além disso, se você aceita requisições demais sem limite, o custo não some, ele aparece como fila e aumento de latência.

## Onde as filas aparecem em um backend real

Em produção, a fila raramente está apenas no seu código. Ela pode estar antes do servidor, dentro do servidor, ou nas dependências.

Por exemplo, é comum que o banco de dados seja o ponto em que a fila cresce primeiro. Quando o banco começa a responder mais devagar, cada requisição fica aguardando por mais tempo. Isso aumenta o número de requisições pendentes, o que aumenta ainda mais pressão sobre conexões e memória. Se nada limita essa dinâmica, a latência cresce até virar timeout e o sistema começa a falhar de forma intermitente.

## Exemplo

Considere uma rota de listagem que parece simples: consultar o banco e devolver JSON. Em carga baixa, ela responde rápido. Em um pico, o banco fica mais disputado e começa a responder um pouco mais lento. Essa diferença pequena já muda o sistema: a requisição passa mais tempo viva esperando, o servidor acumula mais trabalho em progresso, e a API inteira fica mais lenta. A partir de certo ponto, o cliente começa a estourar timeout e repetir chamadas, e isso intensifica a pressão. O que parecia apenas lentidão vira um ciclo de degradação.

A conclusão prática é que o servidor web precisa ser pensado como uma máquina de coordenação sob disputa, não apenas como um lugar onde seu código roda.

## Checklist rápido

- Eu entendo que, sob carga, a API vira um sistema de filas.
- Eu sei que requisições em espera ainda consomem recursos.
- Eu entendo que aumentar concorrência pode ajudar em I/O bound, mas pode piorar quando passa do limite.
- Eu sei que o gargalo costuma aparecer em dependências como banco e serviços externos antes de aparecer no endpoint em si.

---
# 10.3. Backpressure e sistemas sob carga

Quando uma API começa a receber mais requisições do que consegue concluir, o problema não é apenas ficar mais lenta. O problema é que ela pode entrar em um ciclo em que cada segundo piora o próximo.

Isso acontece porque um backend sob carga acumula trabalho pendente. Trabalho pendente vira fila. Fila aumenta o tempo de resposta. Tempo de resposta maior faz cada requisição ficar viva por mais tempo, segurando recursos por mais tempo. Com isso, o sistema consegue concluir menos trabalho por unidade de tempo, e a fila cresce ainda mais.

Backpressure é o nome dado às estratégias que evitam essa espiral, impondo limites e forçando o sistema a desacelerar de forma controlada, em vez de aceitar tudo e colapsar.

## Por que overload vira cascata

Em sistemas conectados, uma API raramente é um bloco isolado. Ela depende de banco, cache, serviços externos e, às vezes, de outras APIs internas.

Quando uma dependência fica lenta, sua API fica lenta. Quando sua API fica lenta, clientes começam a ver timeout. Muitos clientes tentam de novo. Esse retry aumenta tráfego exatamente no pior momento. O resultado é a falha em cascata: uma lentidão local vira instabilidade global.

O objetivo do backpressure é interromper esse ciclo cedo, antes que o sistema inteiro perca previsibilidade.

## A ideia central: é melhor recusar do que acumular

A decisão mais importante aqui é cultural e técnica: sob saturação, o sistema precisa preferir falhar rápido do que manter requisições presas em fila até estourar timeout.

Na prática, falhar rápido é mais honesto com o consumidor e mais saudável para o sistema. Uma resposta imediata dizendo que o serviço está ocupado permite que o cliente tente mais tarde com uma estratégia de espera. Já uma resposta que demora 30 segundos para falhar custa recursos do servidor e ainda entrega uma experiência pior.

## Mecanismos comuns de backpressure em APIs

Backpressure não é uma única técnica. É um conjunto de escolhas que limitam trabalho em progresso e impedem que a fila cresça sem controle.

O padrão mais comum é limitar concorrência. Você define quantas requisições podem estar em processamento ao mesmo tempo em um serviço ou em uma rota. Quando o limite é atingido, novas requisições são recusadas imediatamente. Isso protege CPU, memória e dependências, porque o sistema não deixa o número de requisições vivas crescer indefinidamente.

Outro mecanismo muito usado é impor limites de fila. Se existe uma fila interna, ela precisa ter tamanho máximo. Se ela enche, o serviço recusa mais trabalho. Isso evita que a latência se torne infinita e que a API apenas acumule requisições até travar.

Rate limiting também é uma forma de backpressure, mas aplicada na entrada. Em vez de deixar um pico se transformar em fila, você limita quantas requisições por unidade de tempo são aceitas. Isso ajuda tanto a proteger a API quanto a proteger dependências como banco e serviços externos.

Timeouts são parte essencial do controle sob carga. Se o backend deixa chamadas externas aguardarem demais, ele prende recursos por muito tempo. Timeouts bem definidos interrompem esperas e devolvem controle para o sistema tomar uma decisão previsível.

Por fim, existe degradação controlada. Em vez de tentar entregar tudo para todo mundo, o serviço pode reduzir funcionalidades não críticas em momentos de pico e preservar o caminho principal. A ideia é manter o essencial disponível mesmo que o completo fique temporariamente indisponível.

## Exemplo

Imagine uma API de inscrições que abre vagas em um horário específico. Em poucos segundos, chegam milhares de requisições de criação.

Sem backpressure, o sistema aceita quase todas, começa a manter uma fila enorme esperando banco. A latência sobe, clientes estouram timeout e tentam novamente. A fila cresce ainda mais. Você acaba com muitos usuários recebendo falha depois de esperar muito, enquanto o servidor fica ocupado com trabalho que já não tem tempo útil para o usuário.

Com backpressure, o comportamento muda. O serviço permite apenas um número limitado de inscrições em progresso e recusa cedo o excesso. O consumidor recebe uma resposta rápida indicando que o serviço está ocupado, e o sistema preserva capacidade para concluir as requisições que aceitou.

A diferença principal é que o serviço deixa de tentar atender tudo ao mesmo tempo e passa a controlar o quanto de trabalho ele carrega em cada momento.

## Como isso se conecta ao que o consumidor percebe

Backpressure é o que transforma uma API sob carga em algo previsível. Em vez de uma queda caótica, você tem respostas rápidas e consistentes, mesmo quando são negativas.

Isso também melhora o processo de encontrar onde estão os erros. Quando o serviço recusa por estar sobrecarregado, o sinal é claro. Quando o serviço demora e falha por timeout, o sinal é confuso e o consumidor costuma assumir que o sistema está aleatoriamente quebrado.

## Checklist rápido

- Eu entendo por que fila crescente aumenta latência e prende recursos.
- Eu sei explicar por que retries em cenário de lentidão podem piorar a carga.
- Eu entendo a ideia de falhar rápido para preservar o sistema.
- Eu consigo citar pelo menos um mecanismo de backpressure: limite de concorrência, limite de fila, rate limiting, timeouts ou degradação controlada.
- Eu sei que o objetivo é previsibilidade sob carga, não apenas performance.

## Complemente o Aprendizado
Vídeo da playlist de aulas de backend do Fábio Akita ( ele é meio robotico mas a explicação é muito boa)!

- [Concurrency and Parallelism - Part 1 | Understanding Back-End for Beginners in Programming - Part 3](https://www.youtube.com/watch?v=cx1ULv4wYxM)

```quiz
- tipo: single
  pergunta: "Seu servidor backend roda em uma máquina com apenas 1 núcleo de CPU. Ele recebe três requisições: a primeira vai consultar o banco de dados, a segunda vai chamar uma API externa de pagamentos e a terceira vai ler um arquivo do disco. O servidor intercala essas requisições, adiantando uma enquanto as outras aguardam a resposta de suas operações. Qual conceito arquitetural descreve exatamente esse cenário?"
  opcoes:
    - texto: "Paralelismo, pois as três requisições estão sendo executadas simultaneamente."
      correta: false
      explicacao: "Como há apenas 1 núcleo de CPU, é fisicamente impossível executar as tarefas de forma simultânea (paralelismo). O que há é uma alternância rápida de contexto."
    - texto: "Concorrência, pois o servidor está coordenando múltiplas tarefas em progresso no mesmo intervalo de tempo, aproveitando os momentos de espera (I/O)."
      correta: true
      explicacao: "Exato! O servidor gerencia múltiplas tarefas sobrepondo os tempos de espera. Ele não está executando as três ao mesmo milissegundo (já que só tem 1 núcleo), mas intercala o trabalho para não ficar ocioso."
      explicacao_erro: "Em uma máquina de núcleo único, a execução simultânea (paralelismo) não é possível. O que ocorre aqui é a coordenação de tarefas em espera, o que define a concorrência."
    - texto: "Backpressure, porque o servidor está limitando as requisições ativas."
      correta: false
      explicacao: "O cenário não descreve rejeição de requisições sob carga (backpressure), apenas a forma como o servidor lida com esperas por I/O."
    - texto: "Processamento CPU-bound, pois ler disco e chamar APIs consome muita CPU."
      correta: false
      explicacao: "Consultar banco, chamar API externa e ler disco são clássicos exemplos de operações I/O-bound (espera por entrada/saída), e não CPU-bound."

- tipo: single
  pergunta: "Uma rota da sua API recebe um arquivo CSV enorme, faz parse na memória, realiza cálculos matemáticos pesados em cada linha e gera um relatório consolidado. Conforme a carga aumenta, o endpoint fica muito lento, e você tenta resolver aumentando o limite de concorrência (threads/workers). A latência acaba piorando ainda mais. Qual é a causa técnica desse problema?"
  opcoes:
    - texto: "O workload é I/O-bound. A lentidão ocorre porque o disco não consegue ler o CSV rápido o suficiente para muitas threads."
      correta: false
      explicacao: "O cenário foca nos cálculos matemáticos pesados na memória e na consolidação, que são características de operações limitadas pela CPU, não por I/O."
    - texto: "Falta implementar Rate Limiting no banco de dados para evitar gargalos de leitura."
      correta: false
      explicacao: "A rota descrita não faz chamadas ao banco de dados; ela opera com processamento de um CSV em memória."
    - texto: "O servidor atingiu um estado de backpressure automático, suspendendo a CPU para resfriamento físico."
      correta: false
      explicacao: "Backpressure é uma técnica de arquitetura de software para recusar tráfego extra, não um mecanismo térmico da CPU."
    - texto: "O workload é CPU-bound. Aumentar a concorrência sem adicionar núcleos reais só aumenta a competição pela CPU e o overhead de alternância do sistema operacional."
      correta: true
      explicacao: "Perfeito! Tarefas dominadas por processamento (CPU-bound) não se beneficiam de concorrência excessiva. Ao colocar várias requisições pesadas disputando a mesma CPU, você gasta mais tempo trocando de contexto do que processando os dados de fato."
      explicacao_erro: "Em cenários CPU-bound, as requisições não 'esperam', elas 'calculam'. Aumentar a concorrência apenas empilha tarefas pesadas na mesma CPU, gerando lentidão por disputa de recursos em vez de resolver o gargalo."
      

- tipo: single
  pergunta: "Durante um pico de acessos, o banco de dados da sua aplicação começou a responder 500ms mais devagar. A CPU da API continuou baixa, mas em poucos minutos o servidor backend crashou por falta de memória (OOM) e esgotamento de conexões. O que explica esse colapso em cascata?"
  opcoes:
    - texto: "A lentidão no banco fez com que as requisições ficassem vivas (em espera) por mais tempo na API, acumulando conexões e memória até estourar os limites do servidor."
      correta: true
      explicacao: "Isso mesmo! Requisições em espera (I/O) não consomem muita CPU, mas mantêm o estado em memória e seguram conexões. Se o gargalo externo fica lento, a API acumula trabalho pendente até colapsar."
      explicacao_erro: "Embora a CPU esteja ociosa durante a espera, a memória e o pool de conexões não estão. A fila de requisições presas esperando o banco encheu a memória do backend, levando ao crash."
    - texto: "O banco de dados enviou um sinal de interrupção que forçou o servidor web a reiniciar suas portas de conexão."
      correta: false
      explicacao: "Bancos de dados não enviam sinais de interrupção para derrubar servidores web; o colapso foi causado pelo acúmulo de estado no lado do cliente (a API)."
    - texto: "A API ativou sua política de Timeouts precocemente, o que consome grandes quantidades de memória para gerar os logs de erro."
      correta: false
      explicacao: "Timeouts bem configurados na verdade protegeriam a aplicação, derrubando as conexões antes que a memória estourasse. O problema foi a falta deles."
    - texto: "Como o workload virou CPU-bound de repente, a concorrência não conseguiu dar conta do número de requisições."
      correta: false
      explicacao: "Esperar pelo banco de dados caracteriza um cenário I/O-bound, não CPU-bound. A CPU continuou baixa, comprovando que o limite foi de memória/conexões."
```


## Fontes 

https://sre.google/sre-book/handling-overload/  

https://sre.google/sre-book/addressing-cascading-failures/  

[https://go.dev/blog/waza-talk](https://go.dev/blog/waza-talk) 

[https://go.dev/talks/2012/waza.slide](https://go.dev/talks/2012/waza.slide)

https://www.kegel.com/c10k.html

https://www.cs.cmu.edu/afs/cs/academic/class/15213-m23/www/lectures/23-concprog.pdf

https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf

