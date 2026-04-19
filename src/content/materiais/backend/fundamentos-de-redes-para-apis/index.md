---
title: Fundamentos de Redes para APIs
description: Introdução em redes de computadores
category: Backend
order: 3
---

# 2.1 IP, porta e socket

Quando a gente fala de rede no dia a dia, é comum misturar termos como internet, web, site, servidor e rota, como se tudo fosse a mesma coisa. Nesta seção, a meta é só organizar o cenário para que IP, porta e socket façam sentido sem mistério.

A internet é a infraestrutura que conecta redes e dispositivos. No meio do caminho, existem equipamentos como roteadores, que encaminham os dados até o destino. A World Wide Web (WWW) é uma das coisas que usam a internet: é o “modo navegador”, com páginas e APIs acessadas por URLs.

Mesmo quando você está “só abrindo um site” ou “só chamando uma API”, por baixo ainda existe uma pergunta básica: como o seu computador acha a máquina certa e entrega a mensagem para o programa certo dentro dela?

É aqui que entram IP, porta e socket.

## Contexto rápido: internet, web e o caminho até a aplicação

- **Internet**: a rede que conecta redes. Ela faz dados saírem do seu dispositivo e chegarem até outra rede, outra máquina, outro lugar.
- **Roteadores**: são os “cruzamentos” que recebem dados e encaminham adiante até alcançar a rede de destino.
- **Web (WWW)**: um uso específico da internet, normalmente via navegador e HTTP/HTTPS. Sites e APIs web vivem aqui.
- **Aplicação**: o programa que realmente vai receber sua mensagem e responder. Para isso acontecer, você precisa chegar na máquina certa e no programa certo.

Com isso em mente, dá para entrar no objetivo principal

Em uma comunicação de rede, um cliente precisa chegar na máquina certa e falar com o programa certo dentro dessa máquina. Para isso, três conceitos aparecem o tempo todo em backend: IP, porta e socket.

A ideia aqui é construir um modelo mental simples, que vai servir de base para entender como clientes e servidores se conectam e por que erros comuns acontecem.

## Um modelo mental que funciona

Quando um cliente tenta falar com um servidor, três coisas precisam estar claras:

Um endereço para chegar na máquina certa, um número para escolher o programa certo dentro da máquina, e um mecanismo do sistema operacional para entregar e receber dados.

É exatamente isso que IP, porta e socket representam.

## IP: como encontrar a máquina

O IP é o endereço numérico que identifica um dispositivo em uma rede baseada em Internet Protocol. Ele responde uma pergunta bem direta: para qual máquina eu quero enviar dados.

Por isso, quando você está testando algo localmente, aparece `127.0.0.1`, que aponta para a própria máquina. Já em uma rede local, como o Wi-Fi de casa, você costuma ver endereços como `192.168.x.x` ou `10.x.x.x`, que permitem que um dispositivo encontre o outro dentro da mesma rede. Se você usa um nome como `api.exemplo.com`, existe um passo para descobrir qual IP aquele nome representa, e isso será tratado no tópico 2.2.

## Porta: como escolher o serviço dentro da máquina

A porta é um número que identifica um ponto de comunicação em uma máquina. A utilidade dela é simples: uma mesma máquina pode rodar vários programas que se comunicam pela rede ao mesmo tempo, e a porta permite que o sistema operacional entregue os dados para o programa correto.

O IP te leva até a máquina. A porta te leva até o serviço certo dentro dessa máquina.

![multiplexação para entender portas](/api/materiais-assets/backend/fundamentos-de-redes-para-apis/assets/tanenbau-6-17.png)

Isso explica por que dois backends diferentes não podem escutar na mesma porta ao mesmo tempo no mesmo IP: o sistema operacional não teria como decidir para qual processo entregar os dados.

## Socket: como o sistema operacional faz a comunicação acontecer

Socket é a interface que o sistema operacional oferece para um programa enviar e receber dados pela rede. Em vez de pensar no socket como um conceito abstrato, pense nele como o ponto de contato entre o seu processo e a rede.

No servidor, o programa cria um socket e associa esse socket a um IP e uma porta. Esse é o momento em que o servidor fica pronto para receber conexões naquele endereço.

No cliente, o programa cria um socket e tenta se conectar ao IP e porta do servidor. Se o servidor não estiver escutando naquele IP e porta, a conexão falha.

Você não precisa dominar os detalhes do protocolo ainda. O que importa por enquanto é entender que socket é a peça que liga a rede ao processo. O comportamento de conexão e confiabilidade entra com mais profundidade no tópico 2.3.

## Exemplo: placar de jogo na rede local

Imagine um placar simples de campeonato rodando em uma rede local.

O notebook do organizador roda o servidor do placar. Os celulares dos árbitros enviam atualizações de pontuação.

O notebook tem IP `192.168.0.50`. O servidor do placar está configurado para escutar na porta `9000`. Isso significa que o endereço do serviço é:

```text
192.168.0.50:9000
````

Quando um árbitro abre o app e envia uma atualização, o celular tenta falar com esse destino. O que acontece por baixo é:

O IP direciona os dados para o notebook correto na rede local. A porta direciona os dados para o processo correto dentro do notebook. O socket do servidor recebe esses dados e entrega para o programa, que então processa a atualização.

Agora observe dois erros comuns e como eles se explicam com esse modelo mental:

Se o árbitro usar o IP errado, os dados vão para a máquina errada e o servidor correto nunca é alcançado. Se o árbitro usar a porta errada, ele até chega no notebook, mas o sistema operacional não encontra o serviço certo e a comunicação falha.

## Checklist rápido

* Eu sei explicar IP como endereço que identifica uma máquina na rede.
* Eu sei explicar porta como número que identifica o serviço dentro da máquina.
* Eu sei explicar socket como a interface do sistema operacional que permite um processo se comunicar pela rede.
* Eu consigo ler `192.168.0.50:9000` e dizer qual parte é a máquina e qual parte é o serviço.
* Eu consigo explicar por que IP certo com porta errada não funciona.

## Fontes (para leitura)

Tanenbaum, Redes de Computadores (4ª edição):

[https://developer.mozilla.org/pt-BR/docs/Glossary/IP_Address](https://developer.mozilla.org/pt-BR/docs/Glossary/IP_Address)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Port](https://developer.mozilla.org/pt-BR/docs/Glossary/Port)

[https://docs.python.org/pt-br/3/howto/sockets.html](https://docs.python.org/pt-br/3/howto/sockets.html)

[https://docs.python.org/3/library/socket.html](https://docs.python.org/3/library/socket.html)

---

# 2.2 DNS e resolução de nomes

DNS é o sistema de nomes da internet. Ele permite que você use nomes fáceis como `api.exemplo.com` em vez de decorar endereços IP.

Quando um programa precisa se comunicar com um servidor usando um nome, ele primeiro precisa descobrir para qual destino esse nome aponta. Esse processo é chamado de resolução de nomes. Na prática, quase sempre significa descobrir um endereço IP associado ao nome, para então iniciar a conexão.

## Host: o nome do destino que você usa na prática

Antes de falar da busca em si, vale definir um termo que aparece o tempo todo: host.

Host, neste contexto, é o nome que você usa para apontar para um destino na rede. Em geral, é o que vem na URL, por exemplo `api.exemplo.com`. Esse nome também pode aparecer em mensagens de protocolos de aplicação, como em requisições web.

Uma forma simples de pensar:

- `exemplo.com` é um domínio, uma área de nomes sob uma organização.
- `api.exemplo.com` é um host dentro desse domínio, um nome mais específico que normalmente aponta para um serviço.

O DNS existe para pegar esse host e responder a pergunta: para qual endereço IP eu devo ir para alcançar esse destino.

## Por que DNS existe

Endereços IP mudam. Uma API pode trocar de máquina, trocar de provedor, ganhar réplicas, entrar atrás de um proxy ou de uma CDN. Se os clientes dependessem do IP diretamente, toda mudança de infraestrutura quebraria integrações.

Com DNS, você publica um nome estável e pode mudar o que existe por trás sem pedir para cada consumidor atualizar nada.

## Como o DNS é organizado na internet

DNS é um sistema distribuído. Não existe um servidor central que sabe tudo. Em vez disso, a responsabilidade é dividida.

De forma simplificada:

- existem servidores na raiz, que apontam para servidores de domínios de topo, como `.com` e `.org`
- existem servidores autoritativos, que são os servidores responsáveis por um domínio específico e que sabem quais registros valem para ele
- existe o resolvedor, que é o serviço que faz as consultas por você e devolve a resposta para o seu sistema

Servidor autoritativo significa autoritativo no sentido de ser a fonte oficial daquela resposta para aquele domínio, não no sentido de ter mais poder na rede.

## O que acontece quando um cliente usa um domínio

Antes de qualquer comunicação com a aplicação, existe um passo de infraestrutura:

1) O cliente tenta resolver o nome do host, por exemplo `api.exemplo.com`.  
2) O sistema operacional consulta um resolvedor configurado na rede, que é o serviço responsável por responder consultas DNS.  
3) Se a resposta estiver em cache, ela volta rápido. Se não estiver, o resolvedor busca a resposta em servidores autoritativos do domínio.  
4) O resolvedor devolve a resposta para o sistema operacional junto com um tempo de validade.  
5) O cliente usa a informação retornada para tentar se conectar ao destino.

Para o seu modelo mental, o importante é separar duas etapas:
- descobrir para onde ir (DNS)
- tentar se comunicar com o destino (conexão e protocolo)

Quando DNS falha, o seu backend pode estar perfeito e mesmo assim o cliente não consegue nem tentar conectar.

## Registros DNS que mais importam para APIs

DNS responde com registros. Existem vários tipos, mas para começar em backend, estes são os mais relevantes:

- **A**: aponta um nome para um endereço IPv4  
- **AAAA**: aponta um nome para um endereço IPv6  
- **CNAME**: faz um nome apontar para outro nome, criando um alias  

Você pode pensar assim:
- A e AAAA respondem com um destino numérico (IP)
- CNAME responde com outro nome, que então precisa ser resolvido até virar um IP

Também existem registros que você vai ver em configurações de domínio e operação do serviço:

- **NS**: indica quais servidores são responsáveis pelo domínio
- **SOA**: guarda informações básicas da zona do domínio, incluindo parâmetros usados para controle e consistência

Você não precisa dominar esses agora, mas eles ajudam a entender por que DNS é um sistema organizado por responsabilidade.

## Cache e TTL

Resolução de nomes precisa ser rápida. Por isso, DNS usa cache de forma agressiva.

Cada resposta tem um TTL, que define por quanto tempo aquela resposta pode ser reutilizada antes de ser consultada novamente. Esse cache pode existir em mais de um lugar, como no sistema operacional e no resolvedor da rede.

Isso reduz latência e reduz carga no sistema de DNS, mas cria um efeito que você vai ver na prática:

Mudanças de DNS não aparecem para todo mundo ao mesmo tempo.

O que acontece é simples:
- quem ainda está com a resposta antiga no cache continua indo para o destino antigo
- quem já consultou de novo depois do TTL expirar passa a ir para o destino novo

Esse comportamento explica muita confusão em migrações e incidentes.

## O que DNS muda na forma de operar uma API

Mesmo em projetos pequenos, DNS é parte do contrato operacional do serviço. Se você expõe sua API por um domínio, você ganha algumas possibilidades importantes:

- migrar o serviço para outro servidor sem pedir mudanças no cliente
- inserir camadas como proxy, gateway ou CDN sem mudar o host público
- apontar um mesmo nome para múltiplos IPs para redundância ou distribuição simples

DNS não substitui estratégias completas de alta disponibilidade e balanceamento, mas é uma peça básica de desacoplamento entre consumidores e infraestrutura.

## Erros comuns e como interpretar

Quando algo não funciona, diferenciar falha de DNS de falha de conexão evita perder tempo.

Falha de DNS costuma ter sinais como:
- o nome não existe ou está errado
- o resolvedor não está respondendo
- o cliente não consegue resolver o host e falha antes de qualquer tentativa de conexão

Falha de conexão costuma ter sinais como:
- o nome resolve, mas a conexão é recusada
- o nome resolve, mas há timeout ao conectar
- o destino responde, mas há erro no protocolo ou na aplicação

A separação é útil porque cada caso aponta para um conjunto diferente de causas prováveis.

## Exemplo

Você publica uma API em `api.cursos.exemplo.com` e ela aponta para o IP `203.0.113.10`. Depois de um tempo, você migra o serviço para um novo servidor e atualiza o DNS para apontar para `203.0.113.20`.

Logo após a mudança, você testa e funciona. Um colega em outra rede diz que ainda cai no servidor antigo. Isso pode acontecer mesmo que você tenha feito tudo certo.

O motivo é o cache. O resolvedor que seu colega está usando pode ainda ter guardado a resposta antiga e só vai buscar a nova quando o TTL daquela resposta expirar. Até lá, dois clientes diferentes podem chegar em destinos diferentes usando o mesmo domínio.

Esse exemplo também explica um sintoma comum em times: pessoas relatando resultados diferentes ao mesmo tempo, sem que ninguém esteja inventando.

## Checklist rápido

- Eu consigo definir DNS como o sistema que resolve nomes para destinos de rede.
- Eu entendo que DNS acontece antes da conexão com o servidor.
- Eu sei que A, AAAA e CNAME são os registros mais comuns para serviços web.
- Eu entendo que cache e TTL fazem mudanças demorarem a aparecer para todos.
- Eu sei diferenciar falha de resolução de falha de conexão.

## Fontes

Tanenbaum, Redes de Computadores (4ª edição):

https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name

https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works

https://developer.mozilla.org/pt-BR/docs/Glossary/Domain

https://www.rfc-editor.org/rfc/rfc1034

https://www.cloudflare.com/pt-br/learning/dns/what-is-dns/

---

# 2.3 TCP e confiabilidade

Depois que um cliente descobre o IP do servidor e decide a porta correta, ainda falta uma etapa essencial: transportar dados de forma confiável entre as duas máquinas.

A rede real é imperfeita. Mensagens podem chegar fora de ordem, podem se perder no caminho, podem ser duplicadas e podem sofrer variação de tempo de entrega. O TCP existe para reduzir esse caos e oferecer uma base previsível para comunicação entre processos.

## Redes em camadas: onde entram IP, TCP e HTTP

Quando você usa uma API, parece que seu programa fala diretamente com o servidor. Na prática, a comunicação é organizada em camadas para simplificar o problema. Cada camada resolve uma parte e entrega um serviço para a camada acima.

Para este tópico, você só precisa guardar esta ideia:

- IP ajuda a mensagem a chegar na máquina certa
- TCP ajuda a mensagem a chegar de forma confiável ao programa certo
- protocolos de aplicação, como HTTP, definem o formato do que a aplicação quer dizer

Um jeito simples de enxergar o modelo TCP/IP é:

- Camada de aplicação: onde vivem regras usadas por programas, como HTTP
- Camada de transporte: onde vivem regras de entrega entre processos, como TCP
- Camada inter-redes: onde vive o IP, que identifica máquinas e permite atravessar redes diferentes
- Camada de rede local: onde ocorre o envio real no meio físico e na rede local, como Wi-Fi e Ethernet

![Diagrama das camadas do modelo TCP/IP](/api/materiais-assets/backend/fundamentos-de-redes-para-apis/assets/diagrama-TCP-IP.png)

O ponto principal é que a mensagem vai passando por essas camadas. Cada uma adiciona informações para conseguir fazer seu trabalho, e no destino essas informações são removidas até chegar no programa.

Essa visão é útil porque deixa claro o papel do TCP: ele não define rotas ou JSON, ele só tenta garantir que os dados que sua aplicação enviou cheguem do outro lado de forma previsível.

## O problema que o TCP resolve

Para um backend funcionar bem, ele precisa de um transporte que permita:

- entregar dados na ordem correta
- detectar perda de dados e reenviar
- evitar que o emissor envie mais rápido do que o receptor consegue processar
- lidar com congestionamento da rede de forma controlada

TCP é o protocolo mais comum para esse cenário porque oferece uma comunicação orientada a conexão e com entrega confiável, usada por protocolos de aplicação como HTTP.

## O que é TCP

TCP (Transmission Control Protocol) é um protocolo de transporte que cria uma conexão lógica entre cliente e servidor e fornece um fluxo contínuo de bytes entre eles.

A forma mais útil de pensar é esta:

- O aplicativo não envia pacotes prontos. Ele envia bytes, isto é, uma sequência de dados.
- O TCP quebra esses bytes em pedaços menores chamados segmentos, envia pela rede e remonta no destino.
- Se algo der errado no caminho, o TCP tenta corrigir sem exigir que a aplicação faça isso manualmente.

## Conexão: por que TCP fala em estabelecer e encerrar

TCP não começa a transmitir dados do nada. Ele primeiro estabelece um estado compartilhado entre cliente e servidor.

### Handshake de três etapas

A forma padrão de iniciar uma conexão TCP é o handshake em três etapas:

1) o cliente pede para iniciar  
2) o servidor confirma que recebeu e também confirma que aceita  
3) o cliente confirma a confirmação e a conexão fica pronta  

O efeito prático é simples: depois disso, ambos os lados sabem que existe uma conexão ativa e podem enviar dados com mecanismos de confiabilidade.

Encerrar conexão também é parte do protocolo, para liberar recursos e sinalizar que não haverá mais envio de dados.

## O que o TCP garante e o que ele não garante

### O que você ganha com TCP

TCP entrega para a aplicação estas garantias principais:

- ordem: os dados chegam para o receptor na ordem correta
- integridade do fluxo: o receptor recebe um fluxo coerente de bytes, não um conjunto bagunçado de pedaços
- retransmissão: se algo se perde, o protocolo tenta reenviar automaticamente
- controle de fluxo: o emissor reduz o ritmo quando o receptor não consegue acompanhar
- controle de congestionamento: o emissor adapta o envio conforme sinais de que a rede está sobrecarregada

Esses mecanismos existem para que o desenvolvedor de aplicação não precise reinventar confiabilidade.

### O que o TCP não resolve sozinho

Algumas coisas ficam fora do escopo do TCP:

- TCP não garante que a aplicação vai processar rapidamente.
- TCP não garante que uma requisição de aplicação foi executada com sucesso, ele só garante transporte confiável de bytes.
- TCP não substitui regras de idempotência e retentativa do lado da aplicação quando há quedas no meio do caminho.

Isso é importante para backend: uma conexão pode cair depois de o servidor ter processado parcialmente algo. TCP te dá confiabilidade no transporte, mas não garante consistência de operações de negócio.

## Como o TCP consegue confiabilidade

Você não precisa conhecer o protocolo em nível de bits agora, mas é útil entender o mecanismo mental:

- Cada segmento tem uma numeração (número de sequência), que ajuda a manter a ordem.
- O receptor envia confirmações do que recebeu (acknowledgment, na prática um ok de recebimento).
- Se o emissor não recebe confirmações a tempo, ele reenviará.
- Se o receptor está recebendo rápido demais, ele sinaliza para o emissor reduzir.
- Se a rede começa a ficar congestionada, o emissor reduz a taxa de envio para estabilizar.

O ponto didático aqui é: confiabilidade não é uma característica mágica da internet, é um comportamento construído por esses controles.

## O que isso muda no seu dia a dia de backend

### 1) Erros de rede não significam, automaticamente, erro de lógica

Uma falha pode ocorrer antes de seu backend receber qualquer coisa, durante o envio, ou após o servidor ter respondido. Por isso, nem todo erro do cliente indica que o servidor está errado.

### 2) Conexões têm custo

Cada conexão TCP envolve estado e recursos. Em sistemas reais, manter conexões, lidar com timeouts e proteger contra excesso de conexões é parte do trabalho operacional.

### 3) Um mesmo serviço atende múltiplos clientes ao mesmo tempo

Cada conexão TCP é identificada por um conjunto de informações que inclui IP e porta de origem e IP e porta de destino. Isso permite que muitos clientes usem o mesmo servidor e a mesma porta simultaneamente sem conflito.

## Exemplo

Você tem um endpoint que recebe um formulário de inscrição com alguns dados. O cliente envia a requisição e, no meio do caminho, um segmento se perde.

Sem TCP, a aplicação teria que lidar com perda e reconstrução manualmente, o que seria inviável para uso geral.

Com TCP, o emissor percebe que não recebeu confirmação do que enviou, reenviará o trecho perdido, e o receptor remontará os bytes na ordem correta antes de entregar para a aplicação.

Agora um segundo cenário: o cliente envia a requisição, o servidor processa e tenta responder, mas a rede cai antes de a resposta chegar ao cliente. O cliente pode repetir a tentativa achando que nada aconteceu. Do ponto de vista de transporte, TCP fez o que pôde, mas do ponto de vista de negócio, você ainda precisa pensar em como lidar com repetições e operações que não podem ser executadas duas vezes.

## Checklist rápido

- Eu sei explicar TCP como um protocolo de transporte confiável e orientado a conexão.
- Eu entendo que TCP entrega um fluxo de bytes em ordem, com retransmissão quando há perda.
- Eu sei que estabelecer conexão é parte do TCP e tem custo.
- Eu entendo que confiabilidade de transporte não garante consistência de operações de negócio.
- Eu consigo explicar por que um cliente pode repetir uma requisição após uma falha sem saber o que ocorreu no servidor.

## Fontes

Tanenbaum, Redes de Computadores (4ª edição):

https://developer.mozilla.org/pt-BR/docs/Glossary/TCP

https://developer.mozilla.org/pt-BR/docs/Glossary/Transmission_Control_Protocol

https://www.rfc-editor.org/rfc/rfc9293

https://www.cloudflare.com/pt-br/learning/ddos/glossary/tcp-ip/

https://docs.python.org/3/library/socket.html

---

# 2.4 HTTPS/TLS e comunicação segura

Em uma rede, dados podem atravessar roteadores, provedores, redes públicas e equipamentos que você não controla. Mesmo quando a conexão é confiável, isso não significa que ela é segura.

HTTPS existe para resolver esse problema.

HTTPS é HTTP sobre TLS. Em termos práticos, TLS adiciona uma camada de segurança que protege a comunicação entre cliente e servidor contra três riscos centrais:

- alguém ler o conteúdo trafegado
- alguém alterar o conteúdo no caminho
- alguém se passar pelo servidor

## O que é HTTP, antes de tudo

HTTP é um protocolo de comunicação usado na web no modelo requisição e resposta. Um cliente envia uma requisição com informações como a rota que quer acessar e, às vezes, dados. O servidor processa e devolve uma resposta com status e conteúdo, em seções futuras esse conteúdo será mais aprofundado.

O ponto importante aqui é que HTTP, sozinho, não foi criado para ser seguro. Ele define como as mensagens são estruturadas e trocadas, mas não protege o conteúdo em trânsito. Se a comunicação passa por uma rede que você não controla, é possível capturar o tráfego e observar o que está sendo enviado.

HTTPS mantém o mesmo HTTP, mas coloca essas mensagens dentro de um canal seguro criado por TLS. Assim, você continua com o mesmo modelo de comunicação, porém com proteção contra leitura e alteração no caminho, e com verificação de identidade do servidor.


## O que é TLS e como ele funciona

TLS é o protocolo que cria um canal seguro entre cliente e servidor. Ele entra antes de qualquer mensagem HTTP trafegar, com um objetivo simples: fazer o cliente e o servidor concordarem em chaves de criptografia e confirmar que o servidor é quem diz ser.

O funcionamento pode ser entendido em duas fases.

Na primeira fase, chamada de handshake, cliente e servidor negociam a segurança da conexão. O cliente inicia dizendo que quer usar TLS e informa as opções de criptografia que suporta. O servidor escolhe uma opção e apresenta um certificado associado ao domínio que está sendo acessado. Esse certificado permite que o cliente valide a identidade do servidor usando uma cadeia de confiança já conhecida pelo sistema operacional ou navegador.

Ainda no handshake, cliente e servidor geram chaves de sessão. A ideia aqui é que, mesmo que alguém observe toda a conversa, não consiga descobrir essas chaves. A partir do momento em que as chaves de sessão são estabelecidas, a conexão muda de estado: tudo o que passa por ela é protegido.

Na segunda fase, que é a comunicação segura em si, o HTTP passa por dentro desse canal. Os dados são criptografados e também carregam mecanismos que detectam qualquer alteração em trânsito. Se alguém tentar modificar um byte no caminho, a mensagem deixa de ser válida e o receptor rejeita.

Em resumo, TLS resolve três necessidades ao mesmo tempo:

- confidencialidade, para terceiros não lerem o conteúdo
- integridade, para terceiros não alterarem o conteúdo sem detecção
- autenticação do servidor, para o cliente não falar com um impostor


## O que TLS entrega para quem usa uma API

TLS não é um detalhe opcional. Ele define a qualidade mínima de segurança de qualquer API exposta na internet.

### Confidencialidade

O conteúdo trafegado fica criptografado. Isso inclui URL, headers, corpo e respostas. Uma pessoa na mesma rede do cliente não consegue enxergar credenciais, tokens ou dados sensíveis apenas capturando tráfego.

### Integridade

Mesmo que alguém consiga interceptar os pacotes, não consegue alterar o conteúdo sem ser detectado. Isso reduz o risco de injeção de conteúdo em trânsito, como modificar uma resposta ou trocar parâmetros de uma requisição.

### Autenticação do servidor

O cliente precisa ter certeza de que está falando com o servidor certo, não com um impostor. TLS faz isso por meio de certificados e validação da cadeia de confiança.

Essa parte é especialmente importante para APIs. Se o cliente aceita falar com um servidor errado, qualquer outra medida de segurança vira irrelevante.

## O que acontece quando uma conexão HTTPS começa

Em uma conexão HTTPS, a aplicação não começa enviando HTTP imediatamente. Primeiro o canal seguro é criado.

O cliente inicia a conexão e pede para usar TLS. O servidor responde com os parâmetros escolhidos e apresenta seu certificado. O cliente valida o certificado e, se algo estiver errado, a conexão deve ser tratada como insegura. Em seguida, cliente e servidor estabelecem as chaves de sessão. A partir daí, as mensagens HTTP seguem normalmente, mas agora trafegam dentro do canal criptografado.

A consequência prática é que a proteção não depende do seu código de aplicação. Ela é estabelecida antes do backend processar qualquer requisição.

## Certificados: o que um iniciante precisa saber

Para entender certificado, pense no problema primeiro. Quando você acessa `api.exemplo.com`, como o cliente pode ter certeza de que está falando com o servidor certo e não com alguém fingindo ser ele.

O certificado é a resposta para isso. Ele é um documento digital que diz: este domínio está associado a esta identidade criptográfica.

### Contexto rápido: duas chaves

Um servidor trabalha com um par de chaves:

- **chave pública**: pode ser compartilhada. Serve para permitir que outros criem ou validem informações criptográficas relacionadas àquele servidor.
- **chave privada**: fica guardada no servidor. Ela não deve ser compartilhada. Ela é o que permite ao servidor provar que ele é o dono daquela identidade.

Você não precisa entender matemática de criptografia. Basta lembrar que a chave privada é o segredo do servidor.

### O que o certificado faz, na prática

O certificado liga duas coisas:

- o nome do domínio, como `api.exemplo.com`
- a chave pública do servidor

E ele vem assinado por uma entidade confiável, para que o cliente possa acreditar nesse vínculo.

### O que acontece numa conexão TLS

Quando o cliente inicia a conexão, o servidor apresenta o certificado. O cliente então checa:

- o domínio que ele acessou está coberto pelo certificado
- o certificado é confiável e não está expirado

Se passar nessas checagens, o servidor ainda precisa provar que possui a chave privada correspondente à chave pública do certificado. Isso acontece automaticamente durante o handshake. Se o servidor não tiver a chave privada correta, a conexão não se completa como segura.

Essa é a ideia central: o certificado aponta qual é a chave pública do servidor para aquele domínio, e a chave privada é a prova de que o servidor é o verdadeiro dono daquela identidade.

## HTTPS muda o que você pode assumir

### Você pode tratar a rede como ambiente hostil

Sem TLS, qualquer dado sensível trafegado deve ser considerado exposto. Com TLS, você reduz muito esse risco, mas ainda precisa pensar em segurança de aplicação, como autenticação correta, autorização, validação de entrada e logs.

### Erros de certificado são sinais importantes

Ignorar avisos de certificado costuma ser o caminho mais rápido para cair em problemas sérios. Se um cliente reclama de certificado inválido, isso pode ser desde configuração errada até um cenário de interceptação.

### Segurança não é só para login

Mesmo endpoints sem senha podem carregar dados sensíveis. Além disso, muitas APIs usam tokens em headers. Esses tokens precisam de TLS para não serem capturados em trânsito.

## Exemplo

Você está em um café usando Wi-Fi público e acessa um sistema que consome uma API para fazer login e carregar dados do usuário.

Se a API estiver em HTTP, alguém na mesma rede pode capturar as requisições e ler credenciais, tokens e dados retornados. Mesmo que a aplicação funcione, o risco é alto.

Se a API estiver em HTTPS, a mesma captura de tráfego vira praticamente inútil para revelar o conteúdo. O tráfego continua existindo, mas o conteúdo está criptografado e protegido contra alteração em trânsito.

Esse exemplo também mostra por que apenas adicionar validações na aplicação não resolve. Se o canal não é seguro, as credenciais podem ser roubadas antes mesmo de chegar na API.

## Checklist rápido

- Eu sei definir HTTPS como HTTP sobre TLS.
- Eu sei explicar que TLS fornece confidencialidade, integridade e autenticação do servidor.
- Eu entendo que a segurança do canal acontece antes da API processar a requisição.
- Eu sei o que é um certificado e por que o cliente valida domínio, expiração e cadeia de confiança.
- Eu entendo por que HTTP em rede pública é um risco real, mesmo quando tudo funciona.

## Fontes (para leitura)

https://developer.mozilla.org/pt-BR/docs/Glossary/HTTPS  
https://developer.mozilla.org/pt-BR/docs/Glossary/TLS  
https://developer.mozilla.org/pt-BR/docs/Web/Security/Transport_Layer_Security  
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview  
https://www.rfc-editor.org/rfc/rfc8446  
https://www.cloudflare.com/pt-br/learning/ssl/what-is-tls/  

---

# 2.5 Anatomia de uma URL

Uma URL (Uniform Resource Locator) é um endereço usado para identificar e localizar um recurso. Na prática, é o que você coloca no navegador e é o que um cliente usa para chamar uma API.

Uma boa forma de entender URL é pensar que ela responde, ao mesmo tempo, estas perguntas:

- qual protocolo eu vou usar para me comunicar
- para qual servidor eu vou falar
- qual recurso eu quero acessar dentro desse servidor
- quais parâmetros adicionais estou enviando junto
- existe algum trecho específico que o cliente quer destacar do lado dele

## Um exemplo completo para observar

```text
https://api.exemplo.com:443/v1/cursos/curso_01?expand=modulos&pagina=2#topo
````

Agora vamos separar isso em partes.

## Partes principais de uma URL

### 1) Scheme

É a primeira parte antes de `://`.

No exemplo, `https` é o scheme. Ele indica qual tipo de protocolo será usado para a comunicação.

### 2) Autoridade

É a parte que identifica o servidor, logo depois de `://`.

No exemplo, `api.exemplo.com:443` é a autoridade. Ela costuma ter:

* host: `api.exemplo.com`
* porta, quando aparece: `443`

Na maioria dos casos a porta fica implícita. Em HTTPS, o padrão é 443. Em HTTP, o padrão é 80. Quando você não coloca a porta, o cliente assume o padrão do scheme.

### 3) Path

É o caminho do recurso dentro do servidor.

No exemplo, `/v1/cursos/curso_01` é o path. Ele costuma ser organizado em segmentos, separados por `/`.

No contexto de API, o path geralmente representa o recurso que você quer acessar e, muitas vezes, a identidade desse recurso.

### 4) Query string

É a parte que começa depois do `?`. Ela carrega parâmetros adicionais no formato chave e valor.

No exemplo:

```text
expand=modulos&pagina=2
```

* `expand=modulos` é um parâmetro
* `pagina=2` é outro parâmetro
* `&` separa parâmetros diferentes
* `=` separa o nome e o valor

Em APIs, query string é muito usada para filtros, paginação, ordenação e expansão de dados.

### 5) Fragment

É a parte depois do `#`.

No exemplo, `#topo` é um fragment. Ele é muito comum em navegação de páginas para apontar para uma seção específica.

O ponto que muita gente confunde: o fragment normalmente é usado pelo cliente e não é enviado para o servidor em uma requisição HTTP. Para APIs, isso significa que colocar informação importante depois de `#` não funciona como forma de passar dado para o backend.

## URL versus URI

Você vai ver os dois termos, e a confusão é comum. A forma mais simples de separar é pensar em categoria e exemplo.

**URI** é o termo mais geral: significa identificador de recurso. A ideia é apenas identificar algo, sem necessariamente dizer como chegar até isso.

**URL** é um tipo específico de URI que, além de identificar, também indica como localizar o recurso, ou seja, inclui informações como o protocolo e o servidor.

Um jeito curto de memorizar:
- URI identifica
- URL identifica e localiza

Na prática, quando você está consumindo ou construindo APIs HTTP, quase tudo que você chama de endereço é uma URL.


## Caracteres especiais e por que às vezes você vê % em URLs

Nem todo caractere pode aparecer de qualquer jeito em uma URL. Quando você precisa representar caracteres especiais, como espaço, acentos ou símbolos reservados, você usa codificação.

Por exemplo, um espaço costuma aparecer como `%20`.

Isso importa em APIs porque nomes e valores em query string podem precisar de codificação. Se o cliente mandar uma URL sem codificar corretamente, o servidor pode interpretar errado.

## Exemplo

Compare estes dois endereços:

```text
https://api.exemplo.com/cursos?nome=backend com python
https://api.exemplo.com/cursos?nome=backend%20com%20python
```

O segundo é o formato correto para representar o espaço em uma URL.

Esse tipo de detalhe explica por que, às vezes, você vê uma URL no navegador e a mesma URL aparece diferente em logs e ferramentas de rede.

## Erros comuns de iniciante

* Misturar o que deveria ser path com o que deveria ser query string, o que torna endpoints confusos e difíceis de evoluir.
* Esquecer que `?` inicia a query string e que `&` separa parâmetros.
* Colocar informação importante depois de `#` e esperar que o backend leia.
* Enviar dados sensíveis em query string, como tokens. Mesmo com HTTPS, query string costuma parar em históricos, logs e ferramentas com mais facilidade do que headers.
* Não codificar caracteres especiais, causando bugs difíceis de reproduzir.

## Checklist rápido

* Eu consigo olhar uma URL e apontar scheme, host, porta, path, query string e fragment.
* Eu sei quando faz sentido usar path e quando faz sentido usar query string.
* Eu sei que fragment é uma parte usada pelo cliente e normalmente não chega ao backend.
* Eu entendo por que às vezes aparecem sequências como `%20` em URLs.
* Eu consigo ler `&` e `=` em query string sem me confundir.

## Fontes (para leitura)

[https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL)

[https://developer.mozilla.org/pt-BR/docs/Web/API/URL](https://developer.mozilla.org/pt-BR/docs/Web/API/URL)

[https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams](https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams)

[https://developer.mozilla.org/pt-BR/docs/Glossary/URL](https://developer.mozilla.org/pt-BR/docs/Glossary/URL)

[https://developer.mozilla.org/pt-BR/docs/Glossary/URI](https://developer.mozilla.org/pt-BR/docs/Glossary/URI)

[https://www.rfc-editor.org/rfc/rfc3986](https://www.rfc-editor.org/rfc/rfc3986)

---

# 2.6 Proxy, reverse proxy e load balancer

Em sistemas reais, uma requisição quase nunca sai do cliente e chega direto na aplicação. No meio do caminho, normalmente existem intermediários. Eles fazem o tráfego ficar mais seguro, mais rápido e mais confiável.

Os três nomes mais comuns são proxy, reverse proxy e load balancer. Eles parecem a mesma coisa porque todos ficam no meio do caminho, mas a diferença principal é simples:

- Proxy representa o cliente
- Reverse proxy representa o servidor
- Load balancer distribui requisições entre vários servidores

A seguir, vamos deixar cada um bem definido e depois ver como isso aparece em produção.

## Proxy

Um proxy é um intermediário que o cliente usa para acessar a internet. O cliente não fala direto com o destino final. Ele fala com o proxy e o proxy faz a requisição para fora.

O jeito mais fácil de entender é pensar em quem escolhe e configura o proxy. Normalmente é o cliente ou a rede do cliente. Por exemplo, uma empresa pode forçar todos os computadores a acessarem a internet passando por um proxy corporativo.

O que um proxy costuma fazer na prática:

- controlar e registrar acessos
- bloquear domínios ou categorias de conteúdo
- exigir autenticação antes de liberar tráfego
- aplicar cache do lado do cliente para acelerar acessos repetidos

O ponto central: proxy é um componente usado do lado do cliente para falar com o mundo.

## Reverse proxy

Reverse proxy também é um intermediário, mas agora do lado do servidor.

O cliente acha que está falando com a API, mas na verdade está falando com o reverse proxy. O reverse proxy recebe a requisição e encaminha para o serviço correto dentro da infraestrutura.

O jeito mais fácil de entender é, de novo, pensar em quem escolhe e configura. Normalmente é o dono do serviço. Você coloca um reverse proxy na frente da aplicação para padronizar e centralizar preocupações que você não quer duplicar em cada backend.

O que um reverse proxy costuma fazer na prática:

- receber conexões HTTPS e lidar com certificados
- rotear requisições para serviços diferentes com base em host ou path
- aplicar limites e regras de segurança de borda
- comprimir respostas, aplicar cache quando faz sentido
- padronizar logs e métricas de acesso

O ponto central: reverse proxy é a porta de entrada do lado do servidor. Ele representa o seu serviço para o mundo.

## Load balancer

Load balancer é um componente cuja função principal é distribuir requisições entre múltiplas instâncias de um serviço.

Se você tem uma API rodando em apenas um servidor e ele fica lento ou cai, a API inteira sofre. Se você roda várias instâncias do mesmo serviço, um load balancer consegue:

- dividir a carga para aumentar capacidade
- retirar instâncias com falha para aumentar disponibilidade

O que um load balancer costuma fazer na prática:

- escolher para qual instância enviar cada requisição
- usar um algoritmo de distribuição (por exemplo, round robin ou menor número de conexões)
- fazer health checks e parar de enviar tráfego para instâncias ruins
- em alguns casos, manter afinidade de cliente quando necessário

Um detalhe importante: em muitos produtos, reverse proxy e load balancer podem ser o mesmo software. O que muda é a função exercida. Um reverse proxy pode encaminhar para um conjunto de instâncias e, ao fazer isso, ele está também balanceando.

## Diferença entre eles, de um jeito que não confunde

Uma forma bem objetiva de separar é responder duas perguntas: quem ele representa e por que ele existe.

| Componente | Representa quem | Objetivo principal |
||||
| Proxy | Cliente | controlar, filtrar e otimizar acesso do cliente |
| Reverse proxy | Servidor | proteger e organizar a entrada do serviço |
| Load balancer | Serviço com múltiplas instâncias | distribuir carga e manter disponibilidade |

Se você guardar só isso, já consegue entender 90% do que aparece na prática.

## Como isso aparece na realidade

A maioria das arquiteturas usa uma cadeia de intermediários. Um caminho comum para uma API pública é:

```text
Cliente
  -> Reverse proxy (entrada pública, HTTPS, roteamento)
      -> Load balancer (distribuição)
          -> Instâncias do backend (aplicação)
```

Agora compare com um caso de proxy do lado do cliente:

```text
Cliente
  -> Proxy corporativo (controle de saída)
      -> Internet
          -> Reverse proxy do serviço (entrada pública)
              -> Backend
```

Perceba que proxy e reverse proxy podem coexistir porque eles são coisas diferentes, colocadas por lados diferentes.

## O que isso muda para quem desenvolve backend

### Origem real do cliente

Quando existe reverse proxy ou load balancer, a aplicação pode enxergar como origem o IP do intermediário, não do cliente. Para não perder essa informação, intermediários costumam inserir headers como `Forwarded` ou `X-Forwarded-For`.

O ponto importante para backend é: esses headers só devem ser considerados confiáveis quando você sabe que a requisição veio de um intermediário que você controla. Caso contrário, qualquer cliente poderia forjar esses valores.

### Endereço público e endereço interno podem ser diferentes

Em presença de reverse proxy, a aplicação pode receber a requisição internamente via HTTP, mesmo quando o cliente usou HTTPS. Para a aplicação não se confundir ao gerar links, redirecionamentos ou logs, o intermediário pode informar o esquema original com algo como `X-Forwarded-Proto`.

Isso evita bugs clássicos, como links sendo gerados com HTTP em um serviço que é acessado publicamente via HTTPS.

### Timeouts e limites passam a existir em camadas

Em produção, não existe apenas o timeout do seu código. O proxy pode ter timeout, o load balancer pode ter timeout, e cada um deles pode encerrar uma conexão por motivos diferentes. Quando você vê um erro intermitente, uma parte do diagnóstico é descobrir em qual camada ele está acontecendo.

## Exemplo

Você tem uma API pública no domínio `api.cursos.exemplo.com`. O serviço recebe muitos acessos em horários de pico, então você roda três instâncias idênticas do backend.

Na frente delas você coloca um reverse proxy para ser a entrada pública. Esse reverse proxy recebe HTTPS e usa um certificado válido para `api.cursos.exemplo.com`. Ele também registra logs de acesso e aplica um limite simples por IP para reduzir abuso.

Atrás do reverse proxy, existe um load balancer configurado com as três instâncias. A cada requisição, o load balancer escolhe uma instância saudável e encaminha. Se uma instância cair, os health checks detectam e ela para de receber tráfego.

O cliente não precisa saber de nada disso. Para ele, existe um único endereço, e esse endereço continua funcionando mesmo quando uma instância falha ou quando você troca servidores.

Esse é o benefício prático: você mantém um ponto de entrada estável e ganha controle operacional para escalar e proteger o serviço.

## Checklist rápido

* Eu sei que proxy é um intermediário usado pelo cliente para acessar destinos.
* Eu sei que reverse proxy é um intermediário na entrada do serviço, controlado por quem opera a API.
* Eu sei que load balancer distribui requisições entre múltiplas instâncias e melhora disponibilidade.
* Eu entendo por que a aplicação pode não ver o IP real do cliente e por que existem headers de forwarding.
* Eu consigo imaginar uma cadeia com reverse proxy na borda e load balancer atrás, antes das instâncias.

## Fontes (para leitura)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Proxy_server](https://developer.mozilla.org/pt-BR/docs/Glossary/Proxy_server)

[https://developer.mozilla.org/pt-BR/docs/Glossary/Reverse_proxy](https://developer.mozilla.org/pt-BR/docs/Glossary/Reverse_proxy)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Forwarded](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Forwarded)

[https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/X-Forwarded-For](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/X-Forwarded-For)

[https://www.cloudflare.com/pt-br/learning/cdn/glossary/reverse-proxy/](https://www.cloudflare.com/pt-br/learning/cdn/glossary/reverse-proxy/)

[https://www.cloudflare.com/pt-br/learning/performance/what-is-load-balancing/](https://www.cloudflare.com/pt-br/learning/performance/what-is-load-balancing/)

[https://nginx.org/en/docs/http/ngx_http_proxy_module.html](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)

[https://www.haproxy.com/documentation/haproxy-configuration-tutorials/load-balancing/](https://www.haproxy.com/documentation/haproxy-configuration-tutorials/load-balancing/)

---

# 2.7 Ambientes de execução e problemas clássicos

Um backend não existe no vazio. Ele sempre está rodando em algum lugar, com alguma rede ao redor, com alguma forma de expor uma porta e, muitas vezes, com intermediários no caminho. É por isso que um sistema pode funcionar no seu computador e falhar quando você coloca em outra máquina ou em outro ambiente.

A meta desta seção é te dar um modelo mental para entender onde o backend roda e um conjunto de problemas clássicos que aparecem logo no começo, quando você começa a sair do cenário local.

## O que significa ambiente de execução

Ambiente de execução é o contexto em que seu backend está rodando. Ele inclui:

- a máquina onde o processo está (seu notebook, um servidor, uma VM)
- a rede que conecta essa máquina ao resto (rede local, rede interna, internet)
- como o serviço é exposto (IP e porta, DNS, HTTPS)
- quais componentes existem na frente dele (reverse proxy, balanceamento)

Quando você muda o ambiente, você muda algumas dessas condições. A aplicação é a mesma, mas o caminho até ela muda.

## Formas comuns de um backend rodar

### Processo local

É o caso mais simples. Você roda o servidor direto no seu sistema operacional. O endereço costuma ser um loopback ou um IP local, e o acesso funciona apenas a partir da própria máquina, a menos que você configure para aceitar conexões externas.

### Servidor em uma máquina acessível na rede

Aqui o backend roda em uma máquina que outros conseguem alcançar, geralmente dentro de uma rede local, de uma rede interna ou na internet. A diferença prática é que agora você precisa pensar em roteamento e em quem consegue alcançar aquela porta.

### Atrás de intermediários

Em produção, é comum sua aplicação não ser o ponto de entrada público. Um reverse proxy recebe a conexão e encaminha para o backend. Um balanceador pode distribuir o tráfego para várias instâncias.

O efeito disso é que o backend passa a rodar em um endereço interno e o endereço público passa a ser o do intermediário.

## Por que funciona localmente e quebra fora

Em desenvolvimento, você consegue cair em uma falsa sensação de simplicidade: cliente e servidor estão na mesma máquina, sem proxy, sem DNS real, sem certificados reais, sem roteamento no meio.

Quando você muda o cenário, aparecem três diferenças importantes:

- o cliente agora está em outra máquina
- o tráfego passa por rede real, que pode bloquear ou atrasar
- o serviço pode estar atrás de intermediários, que alteram como a aplicação enxerga a requisição

## Problemas clássicos e como identificar

### 1) Backend escutando no lugar errado

Um erro comum é o servidor estar configurado para escutar apenas no loopback. Nesse caso, ele funciona para testes locais, mas ninguém de fora consegue acessar.

Sinal típico: você consegue acessar de `localhost`, mas de outro dispositivo na mesma rede não funciona.

Correção conceitual: escutar em um endereço que aceite conexões externas e garantir que a porta está exposta.

### 2) Porta em uso ou porta errada

Dois programas não conseguem escutar na mesma combinação de IP e porta ao mesmo tempo. Outro erro comum é o cliente chamar a porta errada.

Sinal típico: erro de conexão recusada, ou o cliente chega em um serviço diferente do que você esperava.

Correção conceitual: verificar qual processo está usando a porta e padronizar portas por ambiente.

### 3) Bloqueio por rede, firewall ou política

Mesmo que o servidor esteja escutando, a rede pode bloquear a conexão.

Sinal típico: timeout ao tentar conectar, especialmente quando você testa de fora e não de dentro da máquina.

Correção conceitual: confirmar se a porta está liberada para o caminho que você está tentando usar e se o serviço deveria mesmo estar exposto.

### 4) DNS apontando para o destino errado, ou cache segurando o destino antigo

Quando você usa um domínio, a resolução pode estar apontando para o IP errado, ou alguém ainda pode estar usando uma resposta em cache.

Sinal típico: algumas pessoas acessam e outras não, ou você vê um comportamento diferente dependendo da rede.

Correção conceitual: confirmar para qual destino o nome está resolvendo no ambiente do cliente.

### 5) HTTPS quebrando por certificado

Quando HTTPS entra na jogada, é comum o cliente recusar a conexão por problemas de certificado.

Sinal típico: erros explícitos de certificado inválido, expirado, nome do domínio não coberto.

Correção conceitual: garantir que o domínio usado pelo cliente é o mesmo coberto pelo certificado e que a cadeia de confiança é válida.

### 6) Reverse proxy no meio e a aplicação interpretando informações erradas

Quando existe reverse proxy, alguns dados que a aplicação enxerga podem ser diferentes do que o cliente usou.

Sinais comuns:
- links gerados com HTTP quando o acesso público é HTTPS
- IP do cliente aparecendo como IP do proxy nos logs
- redirecionamentos errados por causa de host e scheme

Correção conceitual: configurar corretamente o proxy e a aplicação para lidar com headers de forwarding em um ambiente controlado.

### 7) Timeouts em camadas diferentes

Você pode ter timeouts no cliente, no proxy, no balanceador e no servidor. Nem todo timeout significa que a aplicação travou. Às vezes a aplicação respondeu, mas a resposta não voltou a tempo para alguma camada intermediária.

Sinal típico: falhas intermitentes sob carga ou em rotas mais lentas.

Correção conceitual: entender em qual camada o timeout está ocorrendo e alinhar os tempos de cada camada.

## Exemplo

Você sobe um backend no seu computador e testa em `localhost`. Tudo funciona.

Depois, você tenta acessar do celular na mesma rede Wi-Fi usando o IP do notebook. Não funciona.

Nesse cenário, o erro mais comum é que o servidor está escutando apenas no loopback, o que significa que ele aceita conexões da própria máquina, mas não aceita conexões vindas de fora. A aplicação está correta, a rota existe, a porta está certa, mas o ponto de escuta não está acessível para outros dispositivos.

Esse tipo de problema parece misterioso no começo, mas fica previsível quando você pensa em ambiente de execução como um conjunto: onde o processo está, em qual endereço ele escuta e como a rede chega nele.

## Checklist rápido

- Eu sei que meu backend é um processo rodando em uma máquina e escutando em um endereço e porta.
- Eu consigo explicar por que algo pode funcionar em localhost e falhar quando o cliente está em outra máquina.
- Eu lembro de verificar escuta, porta e bloqueios de rede antes de suspeitar de bug na aplicação.
- Eu sei que intermediários podem mudar o que a aplicação enxerga e que isso exige configuração.
- Eu entendo que falhas podem acontecer antes de a requisição chegar na aplicação.

## Fontes (para leitura)

https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview

https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works

https://developer.mozilla.org/pt-BR/docs/Glossary/Localhost

https://developer.mozilla.org/pt-BR/docs/Glossary/Port

https://developer.mozilla.org/pt-BR/docs/Glossary/Reverse_pr
oxy
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Forwarded

https://docs.python.org/pt-br/3/howto/sockets.html

https://fastapi.tiangolo.com/deployment/concepts/
