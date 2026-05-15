---
title: 14. Mecanismos de Autenticação
description: Como implementar autenticação e autorização em uma API
category: Backend
order: 15
---

# 14.1. Basic Authentication

É a forma mais primitiva de autenticação HTTP. Definida na RFC 7617.

![Basic Authentication](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/basic-authentication.png)



## Como funciona?

O cliente pega `usuario:senha`, concatena com dois pontos e codifica em Base64.
*   User: `aladdin`
*   Pass: `opensesame`
*   String: `aladdin:opensesame`
*   Base64: `YWxhZGRpbjpvcGVuc2VzYW1l`

Header enviado:
`Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l`

## "Stateless" mas nem tanto

Embora o Basic Auth seja **Stateless** (o servidor não guarda sessão), o cliente (navegador) geralmente **guarda as credenciais em cache** até que você feche a janela. Isso significa que é difícil criar um botão de "Logout" real.



## Riscos de Segurança e Mitigação

### O Grande Perigo: Base64
**Base64 NÃO É Criptografia.** Qualquer um que interceptar o pacote pode ler a senha ("decode").
Por isso, Basic Auth **SÓ** pode ser usado sobre **HTTPS (TLS)**. Sem HTTPS, você está entregando a senha de bandeja.

### Ataques de Força Bruta (Brute Force)
Como o Basic Auth envia usuário e senha em **toda requisição**, ele é um alvo fácil para scripts que tentam adivinhar senhas.
*   **Mitigação:** Você **DEVE** implementar **Rate Limiting** (limite de tentativas) e bloqueio de IP após N falhas. Ferramentas como **Fail2Ban** no servidor ajudam.



## Quando usar? (Use Cases)

Apesar de antigo, ainda é útil em nichos específicos:
1.  **Redes Internas/VPN:** Ferramentas de administração (Prometheus, Traefik Dashboard) protegidas atrás de uma VPN.
2.  **Scripts Rápidos:** Quando você precisa fazer um script Python/Bash simples e não quer lidar com o fluxo complexo de tokens.
3.  **Ambientes de Teste:** Proteger um ambiente de Stage rápido.



## Implementação em Python (FastAPI)

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets

security = HTTPBasic()
app = FastAPI()

@app.get("/users/me")
def read_current_user(credentials: HTTPBasicCredentials = Depends(security)):
    # Base64 já vem decodificado aqui
    # secrets.compare_digest evita ataques de timing (timing attacks)
    correct_username = secrets.compare_digest(credentials.username, "admin")
    correct_password = secrets.compare_digest(credentials.password, "123456")
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais incorretas",
            headers={"WWW-Authenticate": "Basic"},
        )
    return {"username": credentials.username}
```

---
# 14.2. API Keys

Muito comum para autenticação máquina-máquina (SaaS, APIs Públicas). Você entrega uma chave longa para o desenvolvedor e ele envia em toda requisição.

![Google Cloud API](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/google-cloud-api.png)



## Onde enviar a chave?

1.  **Query Param (Ruim):** `GET /api/users?api_key=123`
    *   Fica salvo em logs de proxy, histórico do navegador. Evite.
2.  **Header (Bom):** `X-API-KEY: 123` ou `Authorization: ApiKey 123`
    *   Mais seguro e limpo.



## Boas Práticas de Segurança

### Hashing no Banco de Dados
Nunca salve a API Key em texto plano no seu banco.
*   **Mostre uma vez:** Quando o usuário cria a chave, mostre ela na tela e diga "Copie agora, você não verá isso de novo".
*   **Salve o Hash:** No banco, salve `sha256(api_key)`.
*   **Validação:** Quando chegar uma requisição, faça o hash da chave recebida e compare com o banco.
*   *Por que?* Se seu banco vazar, as chaves dos clientes estão seguras.

### Rotação de Chaves (Key Rotation)
Chaves vazam. É um fato da vida.
*   Permita que o usuário tenha **múltiplas chaves ativas**.
*   Ele cria a Chave B, atualiza os sistemas dele, e depois deleta a Chave A. Isso permite rotação sem downtime.

### Escopos (Permissions)
Não crie "Chaves Mestras" para tudo.
*   Chave A: Somente Leitura (`read:users`).
*   Chave B: Escrita (`write:orders`).
Se a Chave A vazar, o atacante não consegue apagar dados.



## Exemplo Python

```python
from fastapi import FastAPI, Security, HTTPException, status
from fastapi.security.api_key import APIKeyHeader
import hashlib

api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

# Simulando Banco de Dados com HASH das chaves
# Chave Real: "segredo-123" -> Hash: "a5..."
FAKE_DB_HASHES = {
    "a5d... (hash real)": {"user": "admin", "scopes": ["read", "write"]}
}

app = FastAPI()

def hash_key(key: str) -> str:
    return hashlib.sha256(key.encode()).hexdigest()

async def get_api_key(api_key_header: str = Security(api_key_header)):
    key_hash = hash_key(api_key_header)
    if key_hash in FAKE_DB_HASHES:
        return FAKE_DB_HASHES[key_hash]
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="API Key Inválida"
    )

@app.get("/secure-data")
async def secure_endpoint(user_data: dict = Security(get_api_key)):
    return {"msg": "Acesso permitido", "user": user_data["user"]}
```

---
# 14.3. Sessões e cookies

O método clássico da web "stateful" (com estado). O servidor cria um espaço na memória para aquele usuário e entrega um "crachá" (Cookie) com o ID da sessão.

![Session Cookie](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/session-cookie.png)



## Armazenamento de Sessão

Se o servidor guarda estado, onde ele guarda?
1.  **Memória RAM:** Rápido, mas se o servidor reiniciar, todos deslogam. Não funciona com Load Balancer (múltiplos servidores).
2.  **Redis (Recomendado):** Rápido, persistente e compartilhado entre todos os servidores do cluster.
3.  **Banco de Dados (SQL):** Lento para ler a cada requisição. Evite.



## Segurança: O Triângulo de Proteção

Para usar Cookies em APIs, você deve configurar três flags críticas:

1.  **HttpOnly:** Impede que o JavaScript (`document.cookie`) leia o cookie.
    *   *Protege contra:* **XSS (Cross-Site Scripting)**. Se um hacker injetar JS no seu site, ele não consegue roubar a sessão.
2.  **Secure:** O cookie só trafega via HTTPS.
3.  **SameSite:** (`Strict` ou `Lax`). Impede que o cookie seja enviado em requisições vindas de *outros* sites.
    *   *Protege contra:* **CSRF (Cross-Site Request Forgery)**.

### Ataque CSRF (O que é?)
Você está logado no banco (`bank.com`). Você clica num link malicioso (`evil.com`). O site malicioso faz um POST oculto para `bank.com/transfer`. O navegador, inocente, envia seu Cookie do banco junto. O banco aceita e transfere o dinheiro.
*   **Solução:** `SameSite=Strict` impede que o navegador envie o cookie se a origem não for o próprio banco.

### Session Fixation
O atacante cria uma sessão válida e te manda um link com o ID da sessão dele (`?session_id=123`). Você loga usando o ID dele. Ele agora tem acesso à sua conta.
*   **Solução:** Sempre gere um **novo ID de sessão** logo após o login com sucesso (Regenerate Session ID).

```python
# Exemplo conceitual (pseudo-código)
response.set_cookie(
    key="session_id",
    value="xyz-123",
    httponly=True,  # JS não lê (Anti-XSS)
    secure=True,    # Só HTTPS
    samesite="Lax"  # Anti-CSRF
)
```

---
# 14.4. JSON Web Tokens (JWT)

O padrão da web moderna e microserviços. É **Stateless** (Sem estado). O servidor não guarda nada na memória. Todo o dado está dentro do token, assinado criptograficamente.

![JWT Part 1](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/jwt-pt1.png)
![JWT Part 2](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/jwt-pt2.png)



## Anatomia do JWT
`HEADER.PAYLOAD.SIGNATURE`

1.  **Header:** Qual algoritmo foi usado (HS256).
2.  **Payload (Claims):** Os dados (`sub`: usuário_id, `exp`: expiração, `role`: admin). Base64 legível! **Não coloque senhas aqui.**
3.  **Signature:** O "lacre". Garante que ninguém alterou o Payload. Só o servidor (que tem a chave secreta) consegue gerar ou validar.



## Onde guardar o JWT? (A Grande Polêmica)

### Opção A: LocalStorage (Frontend)
*   **Pró:** Fácil de implementar (JS lê e envia no Header).
*   **Contra:** Vulnerável a **XSS**. Qualquer script malicioso pode ler `localStorage` e roubar o token.

### Opção B: Cookie HttpOnly
*   **Pró:** Imune a **XSS** (JS não lê).
*   **Contra:** Vulnerável a **CSRF** (precisa de proteção extra) e mais difícil de usar entre domínios diferentes.

**Veredito:** Para segurança máxima (bancos), use Cookie HttpOnly. Para SPAs gerais, LocalStorage é aceitável *se* você garantir que não tem XSS no seu site.



## Access Token vs Refresh Token

Como invalidar um JWT se ele é stateless? Não dá. Se vazar, vaza até expirar.
Por isso, usamos **dois tokens**:

1.  **Access Token:** Vida curta (ex: 15 min). Usado para acessar a API.
2.  **Refresh Token:** Vida longa (ex: 7 dias). Usado apenas para pedir um novo Access Token. Fica salvo no banco do servidor.

**Fluxo:**
1.  Access Token expira. API retorna 401.
2.  Frontend usa Refresh Token para pedir um novo.
3.  Servidor verifica se o Refresh Token ainda é válido (não foi revogado) e emite novo Access.
*   **Segurança:** Se você quiser "chutar" o usuário, você deleta/revoga o Refresh Token no banco. Ele só terá acesso por mais 15 min (tempo do Access Token).



## Riscos de Segurança (O Ataque "None")
Algumas bibliotecas antigas aceitavam tokens com `alg: none` no header (sem assinatura). Hackers podiam forjar tokens de admin.
*   **Mitigação:** Sempre force o algoritmo na verificação (`algorithms=["HS256"]`).



## Implementação Prática (FastAPI + PyJWT)

```python
# pip install pyjwt
import jwt
import datetime

SECRET_KEY = "segredo-super-secreto" # Nunca deixe hardcoded!
ALGORITHM = "HS256"

def create_token(user_id: int):
    payload = {
        "sub": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15) # 15 min
    }
    # Cria o token assinado
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_token(token: str):
    try:
        # Force o algoritmo para evitar ataque "none"
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"] # Retorna o user_id
    except jwt.ExpiredSignatureError:
        return "Token Expirou"
    except jwt.InvalidTokenError:
        return "Token Inválido"
```

---
# 14.5. OAuth 2.0

OAuth 2.0 não é sobre autenticação (quem você é), é sobre **autorização** (o que você pode acessar). Mas na prática, usamos para "Logar com Google/Facebook".

![OAuth](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/oauth.png)



## JWT vs OAuth 2.0: Qual a diferença?

Muitos confundem, mas eles não são concorrentes. Eles são coisas diferentes.

*   **OAuth 2.0:** É o **Protocolo** (a estrada). Define *como* eu peço permissão e recebo um token.
*   **JWT:** É o **Formato** (o carro). É *o formato do token* que o OAuth 2.0 entrega no final.

Você usa OAuth 2.0 para obter um JWT.



## OIDC (OpenID Connect) vs OAuth 2.0

*   **OAuth 2.0:** Serve para **Autorização**. "Este app pode postar no meu Twitter?"
*   **OIDC:** É uma camada em cima do OAuth 2.0 para **Autenticação**. "Quem é este usuário?". Ele adiciona um token especial chamado `id_token` (que é um JWT) contendo dados do usuário (email, nome, foto).

Se você quer "Logar com Google", você está usando OIDC.



## Scopes (Escopos)

O poder do OAuth são os escopos limitados.
*   `scope=email profile` -> O app só vê seu nome e email.
*   `scope=drive.readonly` -> O app pode ler seu Google Drive, mas não pode apagar nada.

Isso é muito mais seguro do que dar sua senha do Google para o aplicativo.



## Segurança: O Parâmetro `state`

Ao redirecionar o usuário para o Google, como garantir que, quando ele voltar, foi você mesmo quem pediu?
Um atacante pode iniciar um fluxo de login e enganar você para logar na conta *dele* (CSRF Login).

**Solução:**
1.  Gere uma string aleatória (`state`) e salve na sessão do usuário.
2.  Mande o `state` na URL pro Google.
3.  O Google devolve o `state` igualzinho na volta.
4.  Se o `state` da volta não bater com o da sessão, bloqueie.



## O Fluxo (Authorization Code)
É o mais seguro para web server-side.

1.  Seu App redireciona o usuário para o Google (`/auth?response_type=code&state=xyz`).
2.  Usuário loga no Google e diz "Permito".
3.  Google redireciona de volta para seu App com um `code` na URL.
4.  Seu Backend (no servidor) pega esse `code` e troca por um `access_token` falando direto com o Google (sem o usuário ver).
5.  Agora seu Backend pode chamar a API do Google usando o token.

Não tente implementar OAuth 2.0 do zero. Use bibliotecas como `Authlib` ou `python-social-auth`.

---
# 14.6. Mutual TLS (mTLS)

Em cenários de altíssima segurança (Zero Trust) ou comunicação entre microserviços sensíveis, não basta o cliente verificar se o servidor é seguro (o cadeado HTTPS). O servidor também quer verificar se o cliente é quem diz ser.

![Mutual TLS](/api/materiais-assets/4-backend/15-mecanismos-de-autenticacao/assets/mutual-tls.png)



## Como funciona?

No TLS normal (HTTPS), só o servidor tem certificado.
No mTLS, o **Cliente também tem um certificado** instalado nele (arquivo `.pem` ou `.crt`).

Quando a conexão inicia (Handshake), o servidor pede o certificado do cliente. Se o certificado não for assinado por uma autoridade confiável (CA) que o servidor conhece, a conexão é rejeitada antes mesmo de enviar qualquer dado HTTP.



## A Autoridade Certificadora (CA)

Para isso funcionar, você (empresa) cria sua própria CA Interna.
1.  Você gera um certificado raiz (Root CA).
2.  Você instala a Root CA em todos os servidores.
3.  Você gera certificados para cada cliente (Service A, Service B) assinados pela Root CA.
4.  O servidor confia em qualquer um que tenha um "crachá" assinado pela Root CA.

## Revogação (CRL e OCSP)

E se uma chave privada de um cliente vazar? Você precisa "banir" aquele certificado.
*   **CRL (Certificate Revocation List):** Uma lista negra de certificados banidos. O servidor baixa essa lista periodicamente.
*   **OCSP:** O servidor pergunta em tempo real para a CA: "Esse certificado ainda vale?".

## Performance e Complexidade

O mTLS adiciona um peso no "Handshake" inicial (troca de chaves). Em conexões de longa duração (Keep-Alive), isso é irrelevante. Em conexões curtas frequentes, pode pesar.

**Quando usar?**
*   **Zero Trust:** "Nunca confie, sempre verifique". Mesmo dentro da rede interna.
*   **Service Mesh:** Ferramentas como Istio implementam mTLS automaticamente, tirando essa complexidade do código da aplicação.

---
# 14.7. Matriz de Decisão: Qual autenticação escolher?

Não existe "o melhor". Existe o melhor para o seu cenário. Use esta tabela para guiar sua decisão.



## Matriz Comparativa

| Mecanismo | Cliente Ideal | Complexidade | Revogação | Segurança Padrão | Cenário Típico |
| : | : | : | : | : | : |
| **Basic Auth** | Scripts, Testes | Baixa | N/A (Stateless) | Baixa (Vulnerável sem HTTPS) | Ferramentas internas, testes rápidos. |
| **API Keys** | Máquina-a-Máquina | Média | Instantânea (Banco) | Média (Chaves vazam fácil) | SaaS, Clientes de API Pública. |
| **Sessions/Cookies** | Navegador (Web) | Média | Instantânea (Server-side) | Alta (Com flags HttpOnly/Secure) | E-commerce tradicional, Painéis Admin. |
| **JWT** | SPAs, Mobile, Microserviços | Alta | Difícil (Requer Blacklist ou Curta Duração) | Média (Risco XSS/Storage) | Apps modernos, Microserviços distribuídos. |
| **OAuth 2.0 / OIDC** | Terceiros (Logar com Google) | Altíssima | Via Provider | Alta (Padrão de mercado) | "Entrar com Google", Integrações. |
| **mTLS** | Servidor-a-Servidor | Altíssima (Infra) | Via CRL/OCSP | Altíssima (Zero Trust) | Open Banking, IoT, Service Mesh. |



## Guia de Decisão Rápida

1.  **É um site tradicional renderizado no servidor (Django, Rails)?**
    *   Use **Sessions/Cookies**. É robusto e batalha-testado.

2.  **É um Frontend separado (React/Vue) ou Mobile App?**
    *   Use **JWT**. Mas cuidado onde guarda o token. Use Refresh Tokens para segurança.

3.  **É um serviço chamando outro serviço (Backend-to-Backend)?**
    *   Simples? **API Keys** ou **Client Credentials Flow (OAuth)**.
    *   Crítico/Bancário? **mTLS**.

4.  **Quer evitar que o usuário crie mais uma senha?**
    *   Use **OAuth 2.0 (OIDC)** com Google/Microsoft.

5.  **É um script rápido ou ferramenta de dev?**
    *   **Basic Auth** ou **API Key**.
