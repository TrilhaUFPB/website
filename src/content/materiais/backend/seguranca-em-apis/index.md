---
title: Segurança em APIs
description: Como implementar um API segura e o que isso significa
category: Backend
order: 13
---

# 12.1 Modelo de ameaças

Antes de pensar em soluções de segurança, vale responder uma pergunta simples: o que pode dar errado, para quem, e por qual caminho?

Modelo de ameaças, threat modeling, é um jeito estruturado de fazer isso. Você descreve o sistema do ponto de vista de um atacante e, com base nessa visão, levanta ameaças plausíveis e decide quais controles valem a pena.

O objetivo não é prever todos os ataques possíveis. É reduzir risco de forma consciente, priorizando o que realmente importa para a sua API.

## Vocabulário mínimo

Alguns termos aparecem sempre. Aqui está um mapa simples para não virar um emaranhado de palavras:

**Ativo (asset)**  
Algo que você quer proteger. Em APIs, ativos típicos são dados pessoais, registros de negócio, credenciais, chaves de acesso, dinheiro, disponibilidade do serviço.

**Ameaça (threat)**  
Uma possibilidade de evento indesejado. Exemplo: alguém acessar dados de outro usuário, alterar uma inscrição, derrubar o serviço com muitas requisições.

**Vulnerabilidade**  
Uma fraqueza que torna uma ameaça viável. Exemplo: endpoint que usa um ID enviado pelo cliente sem checar se ele tem permissão.

**Risco**  
A combinação de impacto e probabilidade. Um mesmo tipo de ameaça pode ser crítica em um sistema e irrelevante em outro.

**Mitigação (controle)**  
Uma medida que reduz a probabilidade ou o impacto. Exemplo: checagens de autorização, limites de consumo, validação de entrada, logs e alertas.

## Como pensar no sistema sem entrar em detalhes demais

Para modelar ameaças você não precisa listar todas as classes e arquivos. Você precisa de um retrato do caminho dos dados.

Um rascunho comum e suficiente para começar é:

- Quem interage com o sistema (usuários, sistemas, serviços)
- Por onde entram as requisições (endpoints e integrações)
- Para onde os dados vão (banco, cache, fila, outro serviço)
- Onde muda o nível de confiança (internet para seu servidor, seu servidor para um serviço interno, etc.)

Um desenho simples já ajuda:

![exemplo de fluxograma de sistema](/api/materiais-assets/backend/seguranca-em-apis/assets/fluxo-sistema.png)

Esse desenho não é para ficar bonito. É para você conseguir apontar: onde um atacante toca no sistema e onde seus dados mais importantes passam.

## Um processo prático para iniciantes

Uma forma direta de aplicar modelo de ameaças é seguir quatro passos.

### 1) Definir escopo

Escolha um recorte pequeno e claro. Exemplo:

* apenas o fluxo de inscrição em um curso
* apenas o fluxo de listar cursos e ver detalhes
* apenas o fluxo de upload de um arquivo

Escopo pequeno evita que o modelo vire uma lista genérica que não muda nada no projeto.

### 2) Mapear ativos, pontos de entrada e dependências

Neste passo você lista o que é valioso e por onde o sistema é acessado.

* Ativos: quais dados ou recursos são críticos aqui
* Pontos de entrada: quais endpoints e integrações recebem dados
* Dependências externas: banco, serviços de e-mail, pagamentos, storage, etc.
* Limites de confiança: onde você deixa de controlar o ambiente e precisa assumir risco

### 3) Levantar ameaças

Agora você olha para o mapa e pergunta: como alguém pode abusar disso?

Um jeito eficiente de pensar é por categorias, como:

* fingir ser outra pessoa ou outro serviço
* alterar dados no caminho ou no armazenamento
* negar que fez uma ação porque o sistema não registra direito
* acessar dados que não deveria
* derrubar o serviço consumindo recursos
* conseguir privilégios além do permitido

Você não precisa conhecer nomes de técnicas. O importante é treinar o olhar para essas intenções.

### 4) Decidir mitigações e validar se ficou bom o suficiente

Para cada ameaça importante, você escolhe um controle.

Dois cuidados aqui:

* Mitigação tem custo. Não adianta propor dez controles caros para um endpoint irrelevante.
* Controle precisa ser verificável. Se você não consegue testar, monitorar ou auditar, ele vira sensação de segurança.

O resultado final é uma lista priorizada: o que será tratado agora, o que fica registrado para depois e o que é aceito como risco.

## Exemplo

Considere uma API de inscrição em cursos. O recorte é: criar inscrição e consultar inscrições.

O que normalmente aparece rápido no modelo:

* Ativo: registros de inscrição e dados pessoais do aluno
* Ponto de entrada: endpoint que cria inscrição
* Ameaças plausíveis:

  * criar inscrições em excesso para degradar o serviço
  * consultar inscrições de outra pessoa
  * enviar dados malformados para explorar falhas de validação
* Mitigações típicas:

  * limites de consumo por cliente
  * checagem de permissão antes de retornar dados
  * validação consistente do formato de entrada
  * logs de auditoria para ações relevantes

A utilidade do modelo é transformar uma discussão vaga de segurança em decisões concretas e verificáveis.

## Checklist rápido

* Eu consigo dizer qual é o escopo do que estou modelando.
* Eu consigo listar ativos, pontos de entrada e dependências externas.
* Eu consigo descrever ameaças como intenções do atacante, não como detalhes de implementação.
* Eu consigo propor mitigigações que são testáveis e monitoráveis.
* Eu termino com uma lista priorizada, não com uma lista infinita.

## Fontes 

https://owasp.org/www-community/Threat_Modeling  
https://owasp.org/www-community/Threat_Modeling_Process  
https://owasp.org/www-project-threat-modelling-guide/  
https://owasp.org/www-project-threat-modeling/  




---
# 12.2 OWASP API Security Top 10

Depois de ter um modelo mental de ameaças, você precisa de um mapa prático do que mais dá errado em APIs no mundo real. É exatamente isso que o OWASP API Security Top 10 entrega: uma lista dos riscos mais comuns, com foco em como APIs falham na prática.

A intenção não é decorar a lista. A intenção é treinar o olhar para reconhecer padrões de risco enquanto você projeta e implementa endpoints.

## Como usar esta lista

Use o Top 10 como checklist de revisão, não como receita de implementação.

Quando você desenhar uma rota, pergunte:

- isso pode vazar dados de outro usuário
- isso pode permitir ações sem permissão
- isso pode ser abusado para derrubar o serviço
- isso depende de uma configuração frágil
- isso depende de segredo exposto ou autenticação fraca

O Top 10 ajuda porque cobre exatamente esse tipo de pergunta recorrente.

## Visão geral dos riscos do Top 10

Abaixo está uma explicação curta de cada item, com o foco no tipo de falha que ele representa e como isso costuma aparecer em APIs.

### API1: Broken Object Level Authorization

O sistema falha ao garantir que o usuário só acessa objetos que ele deveria acessar.

O caso clássico é um endpoint que recebe um `id` e devolve dados daquele objeto sem verificar se o usuário tem permissão para aquele objeto específico.

### API2: Broken Authentication

Falhas em autenticação que permitem se passar por outra identidade.

Isso inclui tokens fracos, validação incorreta, gerenciamento ruim de sessões e fluxos de login implementados de forma insegura.

### API3: Broken Object Property Level Authorization

A autorização falha não no objeto, mas nas propriedades.

Exemplo típico: o usuário pode ler um objeto, mas não deveria ver campos sensíveis daquele objeto, ou pode enviar campos que não deveria conseguir alterar.

### API4: Unrestricted Resource Consumption

A API permite consumo excessivo de recursos.

Em geral isso aparece como endpoints que podem ser chamados sem limites, gerando uso descontrolado de CPU, memória, conexões e banco. O resultado é degradação e indisponibilidade.

### API5: Broken Function Level Authorization

O usuário acessa funções que não deveria.

Exemplo típico: uma rota administrativa existe e está protegida apenas por escondê-la, ou por checagens frágeis, e um usuário comum consegue chamar.

### API6: Unrestricted Access to Sensitive Business Flows

O risco não é técnico apenas. É abuso de fluxo de negócio.

Exemplo: endpoint de inscrição que permite spam, criação em massa, tentativa de brute force ou exploração de regras de negócio para vantagem indevida.

### API7: Server Side Request Forgery

A API faz requisições para destinos controlados pelo atacante.

Isso aparece quando o servidor aceita uma URL do cliente e faz uma chamada para aquele endereço, permitindo acesso interno indevido ou vazamento de metadados.

### API8: Security Misconfiguration

Configurações inseguras em servidores, headers, permissões, TLS, CORS, logs, debug e infraestrutura.

Esse item existe porque muitos incidentes não são falha de lógica, e sim de configuração.

### API9: Improper Inventory Management

A organização perde controle do que está exposto.

Versões antigas continuam ativas, endpoints esquecidos ficam acessíveis, ambientes de teste viram portas de entrada, documentação não reflete o que realmente existe.

### API10: Unsafe Consumption of APIs

O risco está na integração com APIs externas.

Você confia demais no retorno, não valida, não impõe timeouts, não controla retries e acaba herdando falhas do serviço externo, ou permitindo que ele influencie seu sistema de forma insegura.

## O que esta lista te ajuda a priorizar

O Top 10 destaca um padrão que você vai ver muitas vezes: os maiores riscos de APIs costumam vir de autorização incorreta, consumo descontrolado de recursos e integração mal tratada.

Isso orienta onde colocar atenção mesmo em projetos pequenos:

- autorização por objeto e por função
- limites de consumo e controle de carga
- validação de entrada e saída
- visibilidade do que está exposto
- rigor ao consumir serviços externos

## Checklist rápido

- Eu consigo reconhecer os itens do Top 10 como categorias de falhas recorrentes.
- Eu entendo que muitos riscos de API são de autorização, não apenas de autenticação.
- Eu sei que consumo de recursos e abuso de fluxo são riscos de segurança, não só de performance.
- Eu sei que integrações externas precisam de validação, limites e timeouts.

## Fontes 

https://owasp.org/API-Security/editions/2023/en/0x11-t10/  



---
# 12.3 Princípios básicos de segurança

Os tópicos anteriores ajudam a enxergar ameaças e riscos comuns. Agora a pergunta vira: quais princípios básicos guiam decisões seguras em uma API, mesmo antes de você conhecer técnicas avançadas?

A ideia aqui é simples: princípios são regras de projeto que reduzem risco de forma consistente. Eles não substituem implementação, mas evitam erros estruturais.

## Privilégio mínimo

Cada pessoa, serviço ou componente deve ter apenas as permissões necessárias para cumprir sua função, nada além disso.

Em APIs isso aparece em vários níveis: o usuário não deve acessar dados de outros usuários, o token não deve ter escopo maior do que precisa, e a aplicação não deve ter credenciais de banco com poderes administrativos se ela só precisa ler e escrever em tabelas específicas.

## Negar por padrão e permitir explicitamente

Uma política segura começa com negação e abre exceções com intenção.

Na prática, isso significa que rotas sensíveis devem exigir autenticação e autorização de forma explícita, e o sistema deve tratar casos não previstos como não permitidos.

## Validar entradas e não confiar no cliente

A API deve tratar tudo que vem do cliente como potencialmente malicioso ou inválido.

Isso inclui parâmetros de rota, query strings, headers e corpo JSON. Validar não é apenas checar tipos, é também checar tamanho, formato, valores aceitáveis e consistência de regras de negócio.

Um dos pontos mais importantes para APIs é evitar confiar em identificadores enviados pelo cliente sem checar autorização.

## Expor o mínimo necessário

Uma API deve devolver apenas o que o consumidor precisa, não o que é mais fácil devolver.

Esse princípio reduz vazamento acidental. Em geral, o risco aparece quando respostas refletem estruturas internas ou devolvem campos sensíveis por padrão, como e-mail, documento, informações de pagamento, permissões e flags internas.

## Falhar de forma segura

Quando algo dá errado, o sistema deve falhar com o menor risco possível.

Isso envolve não vazar detalhes internos em mensagens de erro, não expor stack traces em produção e manter respostas de erro consistentes o suficiente para o consumidor tratar, mas não detalhadas o suficiente para ajudar um atacante.

## Segredos nunca devem sair do lado servidor

Chaves, tokens de serviço, senhas e credenciais não podem aparecer no cliente nem em logs.

Esse princípio é simples, mas violações são comuns: colocar tokens no frontend, commitar segredos no repositório, imprimir dados sensíveis em logs, enviar informações demais em respostas de erro.

## Definir limites e proteger disponibilidade

Segurança também é manter o serviço disponível.

Isso envolve impor limites de consumo, tratar payloads grandes, controlar concorrência e ter timeouts em chamadas para dependências. Sem limites, qualquer endpoint pode virar uma forma de derrubar o serviço.

## Checklist rápido

- Eu aplico privilégio mínimo em usuários, tokens e credenciais internas.
- Eu nego por padrão e permito explicitamente com autenticação e autorização.
- Eu valido entradas e não confio em IDs enviados pelo cliente.
- Eu não devolvo mais dados do que o necessário.
- Eu não vazo detalhes internos nem segredos em erros e logs.
- Eu defino limites para proteger disponibilidade.

## Fontes 

https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html  

https://owasp.org/www-project-application-security-verification-standard/  

