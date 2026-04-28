---
title: 13. Autenticação e Autorização
description: O que é autenticação e autorização
category: Backend
order: 14
---

# 13.1 Autenticação versus autorização

Em segurança de APIs, duas perguntas aparecem o tempo todo, e elas não são a mesma coisa.

Autenticação responde: quem é você.  
Autorização responde: o que você pode fazer.

Essa separação é essencial porque um sistema pode autenticar corretamente e ainda assim falhar em autorização, permitindo acesso indevido. Também pode bloquear alguém no lugar errado e virar um sistema difícil de usar.

## Autenticação (AuthN)

Autenticação é o processo de confirmar identidade.

Em APIs, isso normalmente significa que o cliente prova quem é usando algum tipo de credencial, como senha, token, certificado ou chave. Se a prova falha, o sistema não sabe quem está do outro lado, então não deve permitir acesso a recursos protegidos.

O resultado típico de falha de autenticação é o servidor responder que falta credencial ou que a credencial é inválida.

## Autorização (AuthZ)

Autorização acontece depois que a identidade é conhecida.

Ela verifica permissões: se aquela identidade pode acessar aquele recurso específico ou executar aquela ação.

Aqui entram regras como:
- este usuário pode ver apenas os próprios dados
- este papel pode criar cursos, mas não pode deletar
- este serviço pode ler, mas não pode escrever
- este token pode acessar apenas certos escopos

O resultado típico de falha de autorização é o servidor entender quem você é, mas negar a ação por falta de permissão.

## Exemplo

Imagine um endpoint que devolve detalhes de uma inscrição:

### Caso 1: sem credencial ou credencial inválida

Requisição:

```http
GET /inscricoes/123 HTTP/1.1
Host: api.exemplo.com
````

Resposta típica:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "NAO_AUTENTICADO",
  "message": "Credenciais ausentes ou inválidas."
}
```

o servidor não aceitou a identidade apresentada, então não segue para verificar permissões.

### Caso 2: credencial válida, mas sem permissão

Requisição:

```http
GET /inscricoes/123 HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer <token_valido>
```

Resposta típica:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "SEM_PERMISSAO",
  "message": "Você não tem permissão para acessar este recurso."
}
```

o servidor reconheceu quem é você, mas você não pode acessar esse recurso ou executar essa ação.

Esse exemplo também mostra por que autorização precisa ser pensada por recurso, não apenas por rota. Não basta proteger o endpoint, é preciso garantir que o objeto acessado pertence ao usuário ou que a regra de permissão permite aquele acesso.

## Checklist rápido

* Eu sei explicar autenticação como confirmar identidade.
* Eu sei explicar autorização como validar permissões.
* Eu sei diferenciar 401 (identidade não confirmada) de 403 (identidade confirmada, permissão negada).
* Eu entendo que falhas de autorização podem vazar dados mesmo com autenticação correta.

## Fontes 

https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

https://owasp.org/www-community/Access_Control

https://cheatsheetseries.owasp.org/cheatsheets/Web_Service_Security_Cheat_Sheet.html



---
# 13.2 Identidade de usuário e de serviço

Em APIs, identidade não é só sobre pessoas. Também existe identidade de sistemas.

Um erro comum de iniciante é tratar qualquer chamada como se sempre viesse de um usuário final. Na prática, muitas chamadas importantes acontecem entre serviços, e essas chamadas precisam de identidade própria, com permissões próprias.

A diferença principal é:

- Identidade de usuário representa uma pessoa usando o sistema.
- Identidade de serviço representa um componente automático, como um backend, um worker, um job ou uma integração.

## Identidade de usuário

Identidade de usuário é usada quando existe uma pessoa por trás da ação.

Em geral, o cliente apresenta alguma credencial, o sistema confirma a identidade e associa aquela requisição a um usuário. A partir disso, você aplica autorização: o que esse usuário pode ver e fazer.

O ponto importante é que a identidade do usuário precisa ser rastreável e consistente. Você quer conseguir responder perguntas como:

- qual usuário executou esta ação
- quais recursos esse usuário deveria poder acessar
- como revogar o acesso do usuário se necessário

## Identidade de serviço

Identidade de serviço aparece quando um sistema fala com outro sistema.

Exemplos típicos:

- sua API chama um serviço de e-mail para disparar notificações
- um worker processa jobs em segundo plano
- um serviço interno chama outro serviço interno para buscar dados

Nesses casos não existe uma pessoa digitando senha a cada chamada. O serviço precisa provar quem ele é usando uma credencial própria, que não depende de um usuário final estar presente.

O ponto importante é que a identidade do serviço deve ter permissões mínimas e bem definidas, porque um serviço comprometido pode causar estrago grande, já que ele costuma ter acesso a muitos dados e operações.

## O caso que mais confunde: quando um serviço age em nome de um usuário

Em muitos sistemas, o backend recebe uma requisição autenticada de um usuário e depois precisa chamar outro serviço para concluir a operação.

Aqui existem dois jeitos comuns de pensar, e confundir os dois gera problemas:

1) O serviço chama o outro serviço como ele mesmo, com identidade de serviço, e repassa apenas o que for necessário do contexto do usuário.

2) O serviço chama o outro serviço em nome do usuário, ou seja, a identidade do usuário influencia permissões no serviço downstream.

O primeiro modelo costuma ser mais simples de operar e controlar, mas exige que você defina claramente quais dados e permissões o serviço tem e como você garante que ele não viola regras de acesso do usuário.

O segundo modelo pode ser necessário em arquiteturas específicas, mas exige mais cuidado: você precisa de um jeito confiável de representar a identidade do usuário para o outro serviço e evitar que um serviço consiga se passar por qualquer usuário.

## Exemplo

Considere um usuário gerando um certificado.

- O usuário faz a requisição para a API.
- A API confirma a identidade do usuário e checa se ele tem direito ao certificado.
- A API envia um job para um worker gerar o PDF.

Nesse momento, o worker não é o usuário. Ele é um serviço.

O que deve ficar claro é:

- O usuário autorizou a ação e tem direito ao resultado.
- O worker executa o trabalho com identidade de serviço, com permissões mínimas para gerar o arquivo, salvar e registrar o resultado.
- A consulta do certificado pronto volta a exigir autorização do usuário para acessar aquele recurso.

Essa separação impede que um serviço interno vire um atalho para acessar dados de qualquer pessoa.

## Checklist rápido

- Eu sei diferenciar identidade de usuário e identidade de serviço.
- Eu não uso credenciais de usuário para integrar serviços automaticamente.
- Eu garanto que serviços têm permissões mínimas para cumprir sua função.
- Eu mantenho a autorização por recurso consistente, mesmo quando existe processamento em background.

## Fontes 

https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html  

https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html  

https://owasp.org/www-community/Access_Control  

https://cheatsheetseries.owasp.org/cheatsheets/Web_Service_Security_Cheat_Sheet.html  


---
# 13.3 Papéis, permissões e escopos

Quando uma API decide se uma ação é permitida, ela precisa transformar uma identidade em regras práticas. Três conceitos aparecem o tempo todo nesse ponto: papéis, permissões e escopos.

Eles parecem parecidos, mas servem para coisas diferentes. Se você entende bem a diferença, fica muito mais difícil cair em erros como dar acesso demais por conveniência ou confiar em um token de forma ingênua.

## Permissão

Permissão é a unidade mais direta: é uma autorização específica para fazer algo.

Pense em permissões como verbos sobre recursos, por exemplo:

- ler cursos
- criar cursos
- atualizar inscrição
- cancelar inscrição
- ver relatórios

Uma permissão é pequena e objetiva. Ela diz exatamente o que pode ser feito.

## Papel

Papel é um agrupamento de permissões.

Em vez de atribuir permissões uma a uma para cada usuário, você cria papéis que refletem funções do sistema e associa permissões a esses papéis. Exemplo:

- aluno: pode ler cursos e criar inscrição
- instrutor: pode criar e atualizar cursos
- admin: pode gerenciar usuários e ver relatórios

O papel simplifica gestão, porque você não precisa repetir a mesma configuração para cada pessoa. Mas ele também tem um risco: quando você cria um papel grande demais, ele vira uma autorização genérica que dá mais poder do que o necessário.

Uma regra prática útil é: papel bom é o que representa uma função real e não vira um pacote de permissões aleatórias.

## Escopo

Escopo é uma forma de representar permissões dentro de uma credencial, normalmente dentro de um token.

Em vez de apenas dizer quem é a identidade, o token também pode dizer o que essa identidade está autorizada a fazer. Isso aparece como uma lista de escopos, por exemplo:

- cursos:read
- cursos:write
- inscricoes:read

O ponto importante é que escopo não é magia. Ele é só um sinal enviado junto com a requisição. Sua API ainda precisa validar e aplicar esses limites corretamente.

## Como isso se aplica na prática em uma API

Em uma requisição típica, você recebe um token. Esse token carrega uma identidade e, muitas vezes, algum conjunto de permissões ou escopos. A autorização da rota então cruza duas coisas:

- o que a rota exige para ser chamada
- o que aquela identidade tem permissão ou escopo para fazer

Se faltar permissão, a ação é negada.

O cuidado aqui é que isso não resolve tudo sozinho. Mesmo que o usuário tenha permissão para ler inscrições, isso não significa que ele pode ler qualquer inscrição. Ainda existe a autorização por objeto, ou seja, checar se aquele recurso específico pertence a ele ou se ele tem um motivo válido para acessar.

## Exemplo

Imagine duas rotas:

1) listar cursos  
2) criar curso

Suponha que o token venha com escopos.

Requisição para listar cursos:

```http
GET /cursos HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer <token_com_cursos:read>
Accept: application/json
````

Aqui, cursos:read é suficiente.

Agora, tentativa de criar curso com o mesmo token:

```http
POST /cursos HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer <token_com_cursos:read>
Content-Type: application/json

{ "titulo": "Backend com Python" }
```

Se a rota exige cursos:write e o token só tem cursos:read, a API deve negar.

O que isso ilustra: permissões e escopos servem para restringir ações, mas a API é quem aplica.

## Checklist rápido

* Eu entendo permissão como uma autorização específica para uma ação.
* Eu entendo papel como agrupamento de permissões.
* Eu entendo escopo como permissão expressa dentro da credencial, geralmente em tokens.
* Eu não trato papel como atalho para ignorar autorização por recurso.
* Eu consigo definir o que cada rota exige e aplicar isso de forma consistente.

## Fontes 

https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html  

https://owasp.org/www-community/Access_Control  

https://cheatsheetseries.owasp.org/cheatsheets/Web_Service_Security_Cheat_Sheet.html  
