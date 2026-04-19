---
title: Sincronismo e Assíncronismo
description: Diferentes formas de um sistema se comunicar entre si e para o externo
category: Backend
order: 11
---

# 10.1 Comunicação síncrona e assíncrona

Quando um backend cresce, ele deixa de ser apenas um código que responde HTTP e passa a ser um conjunto de partes que precisam conversar entre si e com outros sistemas. Nessa conversa, existe uma decisão que muda profundamente o comportamento do sistema sob latência, falhas e picos de carga nesses casos a comunicação vai ser síncrona ou assíncrona.

Aqui, o foco é comunicação entre componentes, serviços ou sistemas. Não é sobre como uma função roda dentro do seu código, e sim sobre como um lado depende do outro para seguir em frente.

## Comunicação síncrona

Comunicação síncrona é quando quem faz a chamada precisa esperar uma resposta para continuar.

Na prática, é o padrão requisição e resposta: o cliente chama, o servidor processa e devolve um resultado. Isso é direto, fácil de entender e ótimo quando o trabalho é rápido e o resultado é necessário imediatamente.

O custo aparece quando a resposta demora ou quando existe uma dependência lenta. Como o chamador fica esperando, a latência se propaga. Se o serviço chamado ficar instável, isso tende a segurar recursos por mais tempo e aumentar filas, o que combina muito mal com picos de tráfego.

## Comunicação assíncrona

Comunicação assíncrona é quando quem envia a solicitação não precisa de uma resposta completa para continuar.

Em vez de ficar preso esperando o resultado final, o sistema registra o pedido e o processamento acontece depois, em outro momento, muitas vezes por meio de fila de mensagens, jobs ou eventos. Isso ajuda a desacoplar etapas, absorver picos e evitar que uma operação longa prenda uma conexão ou um worker por tempo demais.

O custo aqui é complexidade de produto e de engenharia. Você precisa lidar com rastreamento de estado, eventual consistência e com a pergunta que sempre aparece: como o cliente vai saber quando terminou.

## Quando cada uma faz mais sentido

A escolha normalmente segue a necessidade do resultado imediato.

Se o consumidor precisa do resultado para seguir agora, comunicação síncrona costuma ser a escolha natural.

Se o trabalho é demorado, variável ou sujeito a pico, comunicação assíncrona costuma ser mais saudável, porque o sistema controla melhor filas e mantém previsibilidade. Em vez de deixar o consumidor preso esperando, você separa o ato de pedir do ato de concluir.

## Exemplo

Imagine duas operações comuns em um sistema de cursos.

### Caso 1: listar cursos

Listar cursos precisa responder rápido e devolver dados imediatamente. O padrão natural é síncrono.

Requisição:

```http
GET /cursos HTTP/1.1
Host: api.exemplo.com
Accept: application/json
````

Resposta:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    { "id": "curso_01", "titulo": "Backend com Python" },
    { "id": "curso_02", "titulo": "Fundamentos de Redes" }
  ]
}
```

Aqui, faz sentido o cliente esperar, porque é uma operação curta e o resultado é o que ele precisa para renderizar a tela.

### Caso 2: gerar um certificado

>**Lembrando o que é um certificado**: Um certificado é um arquivo criptográfico que comprova a identidade de um site ou sistema e permite estabelecer uma comunicação segura pela internet.

Gerar um certificado pode envolver template, validações, assinatura e renderização de PDF. Em alguns momentos pode ser rápido, em outros pode demorar. Se você faz isso de forma síncrona, o cliente fica esperando e o servidor fica preso em uma operação que pode ser longa.

Nesse cenário, um comportamento assíncrono costuma ser melhor: o sistema aceita o pedido e processa depois. O cliente recebe um identificador para acompanhar o andamento e buscar o resultado quando estiver pronto.

A diferença principal não é o formato do HTTP. É a expectativa de tempo e a dependência de resultado imediato.

## Checklist rápido

* Eu sei explicar comunicação síncrona como esperar a resposta para continuar.
* Eu sei explicar comunicação assíncrona como separar pedido de conclusão.
* Eu entendo que síncrono é mais simples, mas propaga latência e falhas.
* Eu entendo que assíncrono melhora controle sob pico, mas exige rastrear estado e lidar com consistência.

## Fontes 

https://developer.mozilla.org/pt-BR/docs/Glossary/Synchronous

https://developer.mozilla.org/pt-BR/docs/Glossary/Asynchronous

https://learn.microsoft.com/pt-br/azure/architecture/microservices/design/interservice-communication

https://learn.microsoft.com/pt-br/azure/architecture/patterns/async-request-reply




---
# 10.2 Execução síncrona e assíncrona

Até agora falamos de sincronismo e assincronismo como forma de um sistema conversar com outro. Agora a lente muda: dentro de um mesmo processo, como o seu código progride enquanto operações acontecem.

A diferença aqui não é sobre ter ou não ter HTTP. É sobre fluxo de execução.

## Execução síncrona

Execução síncrona é quando uma etapa do código precisa terminar para a próxima começar.

Na prática, isso costuma significar bloqueio: o programa chama uma operação e fica esperando até receber o resultado. Só depois ele continua.

Isso é simples de entender e debugar, porque a ordem é direta. O custo aparece quando a operação envolve espera, como I/O. Nesse caso, o programa fica parado mesmo que o computador poderia estar fazendo outra coisa útil.

## Execução assíncrona

Execução assíncrona é quando você inicia uma operação e não precisa ficar parado esperando ela terminar.

O programa registra que aquele trabalho começou e segue em frente para fazer outras coisas. Em algum momento, quando o resultado estiver disponível, você retoma o fluxo que depende dele.

O benefício mais comum aparece quando existe I/O: em vez de passar tempo parado, você aproveita esse intervalo para avançar outras tarefas.

O custo é que o fluxo deixa de ser linear. Você passa a ter dois desafios que não existem do mesmo jeito no modelo síncrono: coordenar quando um resultado está pronto e lidar com vários trabalhos em progresso ao mesmo tempo.

## Uma forma prática de enxergar a diferença

Pense em uma requisição que precisa buscar dados em dois lugares: cursos e inscrições do usuário.

No modelo síncrono, você faz um pedido, espera, depois faz o outro, espera de novo:

```text
1) buscar cursos
2) esperar resposta
3) buscar inscrições
4) esperar resposta
5) montar resposta final
````

No modelo assíncrono, você pode iniciar os dois pedidos e só esperar quando realmente precisar juntar os resultados:

```text
1) iniciar busca de cursos
2) iniciar busca de inscrições
3) fazer trabalho local enquanto espera, se existir
4) aguardar os dois resultados
5) montar resposta final
```

A lógica do produto é a mesma. O que muda é como você usa o tempo de espera.

## O que isso muda em APIs

Em backend, muita coisa é I/O: banco, rede, filas, cache. Por isso, execução assíncrona costuma ser uma forma de aumentar throughput sem criar uma quantidade enorme de threads.

Ao mesmo tempo, execução assíncrona não é vantagem automática. Se a rota é dominada por CPU, iniciar mais tarefas ao mesmo tempo não cria capacidade. Você só aumenta disputa por CPU e pode aumentar latência.

O ponto é: execução assíncrona é principalmente uma ferramenta para lidar bem com espera.

## Erros comuns quando o assunto é novo

Um erro típico é chamar qualquer coisa de assíncrona só porque tem mais de uma requisição acontecendo. Você pode ter várias requisições concorrentes atendidas por threads e ainda assim cada thread executar de forma síncrona internamente.

Outro erro comum é usar assincronia para tudo, inclusive para tarefas que são essencialmente CPU, e depois se frustrar porque o sistema não ficou mais rápido.

O conceito que você quer fixar aqui é simples: execução síncrona descreve um fluxo que espera, execução assíncrona descreve um fluxo que continua e só aguarda no momento necessário.

## Exemplo com FastAPI

A ideia é só visualizar o que muda quando a rota espera de forma bloqueante vs não bloqueante.

### Síncrono (bloqueia durante a espera)

```python
from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/sync")
def rota_sync():
    time.sleep(2)  # simula I/O bloqueante
    return {"modo": "sync"}
```

Assíncrono (libera o servidor enquanto espera)

```python
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/async")
async def rota_async():
    await asyncio.sleep(2)  # simula I/O não bloqueante
    return {"modo": "async"}
```

Em carga alta, a rota assíncrona tende a escalar melhor quando a maior parte do tempo é espera por I/O, porque o servidor não fica preso em sleep.
## Checklist rápido

* Eu sei explicar execução síncrona como um fluxo que espera cada etapa terminar.
* Eu sei explicar execução assíncrona como um fluxo que inicia trabalho e continua, aguardando depois.
* Eu entendo que a principal vantagem da assincronia aparece quando existe I/O.
* Eu entendo que CPU-bound não melhora só porque eu iniciei mais coisas ao mesmo tempo.

## Fontes 

https://developer.mozilla.org/pt-BR/docs/Glossary/Synchronous

https://developer.mozilla.org/pt-BR/docs/Glossary/Asynchronous

https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous


---
# 10.3 Trade-offs arquiteturais

Escolher entre síncrono e assíncrono é uma decisão arquitetural porque ela muda o comportamento do sistema em latência, falhas, picos de carga e experiência do consumidor. Não existe escolha universalmente melhor. Existe a escolha que combina com o tipo de operação e com o que o consumidor precisa naquele momento.

A forma mais segura de decidir é entender quais custos você está aceitando em troca de quais benefícios.

## O que o síncrono te dá e o que ele cobra

No síncrono, o consumidor recebe a resposta final na mesma chamada. Isso simplifica o fluxo de produto, simplifica testes e simplifica integração. Para operações rápidas e previsíveis, essa simplicidade é um ganho real.

O custo aparece quando a operação demora ou depende de coisas instáveis. Como o chamador precisa esperar, a latência se propaga. Se o serviço chamado ficar lento, você prende recursos esperando e aumenta fila. Isso piora a situação justamente em momentos de pico, que é quando você mais precisa de previsibilidade.

Síncrono costuma funcionar muito bem quando:
- o resultado é necessário agora
- o tempo de execução é curto e estável
- a taxa de chamadas não é tão explosiva
- falhar rápido é aceitável e o cliente consegue lidar bem

## O que o assíncrono te dá e o que ele cobra

No assíncrono, você separa o pedido da conclusão. O sistema aceita a solicitação e processa depois. Isso te dá controle melhor sobre carga, porque você consegue regular quantos trabalhos estão em andamento e absorver picos com filas ou workers.

O custo é que você cria um novo problema de produto: como o consumidor acompanha o andamento. Você passa a ter estado, rastreabilidade, casos de duplicação e a necessidade de comunicar progresso ou conclusão. Além disso, o sistema pode ficar eventualmente consistente, ou seja, o usuário pode pedir algo e não ver o resultado imediatamente.

Assíncrono costuma funcionar muito bem quando:
- o trabalho é demorado ou variável
- picos de tráfego são esperados
- você consegue aceitar que o resultado chegue depois
- você quer evitar que a experiência dependa de uma dependência lenta em tempo real

## Critérios práticos para escolher

O critério mais importante é a necessidade do resultado imediato. Se o consumidor não consegue seguir sem o resultado, síncrono é natural. Se o consumidor só precisa saber que o pedido foi aceito, assíncrono começa a fazer sentido.

Outro critério é o tempo de execução. Operações rápidas e previsíveis tendem a ficar síncronas. Operações longas, incertas ou que podem envolver múltiplas dependências tendem a ficar melhores como assíncronas.

Falhas também mudam. No síncrono, falha significa a operação não aconteceu, ou pelo menos não ficou confirmada. No assíncrono, falha pode significar a operação foi aceita, mas não foi concluída ainda, ou foi concluída com erro mais tarde. Isso exige que o sistema tenha um jeito claro de representar estados.

Por fim, existe o custo operacional. Em assíncrono, você ganha controle de carga, mas precisa operar filas, workers, reprocessamento e visibilidade do pipeline. Em síncrono, você opera um caminho mais simples, mas precisa ser muito cuidadoso com timeouts e com dependências, porque qualquer lentidão impacta diretamente o consumidor.

## Exemplo curto de decisão

Uma listagem de cursos é uma operação que normalmente é rápida e o usuário precisa do resultado para renderizar a tela. Síncrono é adequado.

Já a emissão de certificado ou geração de relatório pode ter tempo variável e pode ser puxada por pico. Se você fizer isso síncrono, a experiência vira espera longa e chance alta de timeout. Se você fizer assíncrono, você aceita o pedido e entrega o resultado quando estiver pronto, preservando previsibilidade sob carga.

A diferença não é o HTTP em si. É o compromisso que você está assumindo com o consumidor sobre tempo de resposta e sobre como o sistema se comporta em condições ruins.

## Checklist rápido

- Eu sei quando o resultado precisa ser imediato e quando pode chegar depois.
- Eu sei que síncrono é mais simples, mas propaga latência e falhas.
- Eu sei que assíncrono melhora controle sob pico, mas exige rastrear estado e lidar com casos de reprocessamento.
- Eu consigo justificar a escolha com base em tempo de execução, falhas e experiência do consumidor.

## Fontes 

https://learn.microsoft.com/pt-br/azure/architecture/microservices/design/interservice-communication  

https://learn.microsoft.com/pt-br/azure/architecture/patterns/async-request-reply  

https://developer.mozilla.org/pt-BR/docs/Glossary/Synchronous  

https://developer.mozilla.org/pt-BR/docs/Glossary/Asynchronous  



---
# 10.4 Padrões práticos de execução

Depois de entender os trade-offs, o que falta é transformar a decisão em um formato prático: como um sistema normalmente implementa comunicação e execução assíncrona sem virar um conjunto de gambiarras.

A ideia desta seção é apresentar padrões que aparecem com frequência em APIs. Eles não são regras absolutas, mas são soluções recorrentes para o mesmo problema: como iniciar um trabalho, não prender o cliente esperando, e ainda dar previsibilidade para acompanhar o resultado.

## Padrão 1: resposta imediata com status de processamento

Quando o trabalho é demorado, um padrão comum é aceitar o pedido e responder imediatamente indicando que o processamento foi iniciado.

O servidor retorna um identificador do trabalho para o cliente consultar depois.

Isso é útil quando:
- o resultado não precisa ser imediato
- o trabalho pode demorar ou variar bastante
- você quer evitar timeout e fila no caminho síncrono

## Padrão 2: polling com endpoint de status

Depois de iniciar o trabalho, o cliente consulta periodicamente um endpoint de status.

Esse endpoint devolve um estado simples, como pendente, processando, concluído ou erro, e quando concluído pode devolver o resultado ou um link para buscá-lo e isso é justamente o polling, uma técnica de verificação de status constante.

Esse padrão é simples e funciona em praticamente qualquer cliente.

O cuidado é não transformar polling em ataque acidental. Se muitos clientes consultam com frequência alta, você cria carga extra. Por isso, normalmente se define um intervalo mínimo razoável e, em sistemas mais maduros, você orienta o cliente a aumentar o intervalo quando o trabalho demora.

## Padrão 3: callback e webhooks

Outra forma é o cliente fornecer um endereço para receber a notificação quando o trabalho terminar.

Um callback é, de forma geral, um endereço ou função registrada pelo cliente para ser chamada pelo servidor quando um evento específico ocorre. No contexto de APIs HTTP, esse callback normalmente é exposto como um endpoint.

Um webhook é a implementação prática desse callback via HTTP: quando o processamento é concluído, o servidor envia automaticamente uma requisição HTTP para o endpoint informado pelo cliente, contendo os dados ou o status do evento.

Nesse modelo, em vez de o cliente perguntar repetidamente, o servidor avisa quando conclui.

Esse padrão funciona bem para integrações entre sistemas, mas exige que o cliente tenha um endpoint exposto e que a API trate segurança e confiabilidade da entrega.


## Padrão 4: fila e processamento em segundo plano

Internamente, o servidor costuma separar o recebimento do pedido da execução real.

A API recebe o pedido, valida o mínimo necessário, registra o job e o coloca em uma fila. Um conjunto de processos em segundo plano lê essa fila e executa o trabalho.

Esse padrão é o que torna a assincronia operacionalmente útil, porque permite controlar quantos trabalhos são executados simultaneamente, absorver picos e proteger dependências.

O ponto mais importante é que a fila vira um ponto de controle de carga. Você não aceita trabalho infinito. Você limita o que entra e limita o que está em execução.

## Padrão 5: idempotência e segurança contra duplicação

Em qualquer fluxo assíncrono, duplicação acontece. O cliente pode reenviar porque não recebeu resposta, proxies podem repetir, integrações podem falhar no meio e tentar de novo.

Por isso, um padrão prático é tornar o início do job idempotente, ou seja, o mesmo pedido repetido não cria múltiplos processamentos.

Isso geralmente é feito com um identificador de idempotência ou com chaves únicas de negócio. O objetivo é garantir que o sistema se comporte bem mesmo quando o cliente repete.

Aqui não precisamos aprofundar o mecanismo. O importante é saber que assincronia e retry caminham juntos, então duplicação precisa ser tratada como normal, não como exceção.

## Exemplo

Uma forma comum de expor um trabalho assíncrono para o cliente é:

1) o cliente cria um job
2) o servidor responde com um id e um local para consultar
3) o cliente consulta até o job terminar
4) quando terminar, o cliente busca o resultado

Isso reduz pressão na API porque você não segura uma conexão aberta enquanto o trabalho acontece.

## Checklist rápido

- Eu sei que trabalhos longos devem evitar prender o cliente em uma chamada síncrona.
- Eu sei descrever o padrão de criar job e consultar status depois.
- Eu entendo que polling é simples, mas precisa de intervalo sensato para não gerar carga extra.
- Eu entendo que webhooks reduzem polling, mas exigem mais infraestrutura do cliente e mais segurança.
- Eu sei que filas e workers são a forma comum de controlar execução em sistemas assíncronos.
- Eu sei que duplicação é esperada e idempotência é uma proteção essencial.

## Fontes 

https://learn.microsoft.com/pt-br/azure/architecture/patterns/async-request-reply  

https://learn.microsoft.com/pt-br/azure/architecture/microservices/design/interservice-communication  

