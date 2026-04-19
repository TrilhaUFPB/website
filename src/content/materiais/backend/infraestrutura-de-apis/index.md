---
title: Infraestrutura de APIs
description: Como tornar a sua implementação acessível para a internet
category: Backend
order: 9
---

# 8.0. Visão Geral: Infraestrutura de APIs

Se a Arquitetura (Seção 7) é o projeto da casa, a Infraestrutura (Seção 8) é o encanamento, a elétrica e a segurança.

No desenvolvimento moderno (Cloud Native), o desenvolvedor backend não pode mais ignorar a infraestrutura. Você precisa entender onde seu código roda e como o tráfego chega até ele.



## O que você vai aprender neste módulo?

Vamos seguir o caminho de uma requisição, da internet até o servidor.

### 1. A Porta de Entrada (Gateway)
*   **Seção 8.1:** O **API Gateway**. Por que não devemos expor nossos microserviços diretamente? Como centralizar autenticação e rate limiting?

### 2. Encontrando o Destino (Discovery)
*   **Seção 8.2:** Em um cluster com 100 serviços que mudam de IP toda hora, como o Serviço A encontra o Serviço B? Bem-vindo ao **Service Discovery**.

### 3. Gerenciando o Tráfego (Mesh)
*   **Seção 8.3:** Quando a comunicação fica complexa, precisamos de um "policial de trânsito". O **Service Mesh** move a lógica de retry, timeout e segurança para fora do seu código Python.

### 4. Entregando Valor (Deploy)
*   **Seção 8.4:** Como atualizar o sistema sem tirar do ar? Vamos ver estratégias de **Blue/Green**, **Canary** e **Rolling Updates**.



## Por que isso é importante?

Muitos problemas que tentamos resolver com código (ex: Retry, Circuit Breaker, Load Balancing) já estão resolvidos pela infraestrutura de forma mais eficiente.

Entender essas ferramentas evita que você reinvente a roda e permite construir sistemas que são resilientes por padrão, não por sorte.

---
# 8.1. API Gateway e suas responsabilidades

Em uma arquitetura de microserviços (ou até monólitos distribuídos), você não quer expor seus serviços internos diretamente para a internet. O API Gateway é o "porteiro".

![imagem_api_gateway](https://www.connecting-software.com/wp-content/uploads/2023/01/API-Gateway-Diagram.webp)



## Gateway vs Load Balancer

Muitas pessoas confundem os dois.
*   **Load Balancer (L4):** Distribui tráfego baseado em IP e Porta. É burro. Ele apenas repassa o pacote TCP. (Ex: AWS ELB).
*   **API Gateway (L7):** Entende HTTP. Ele lê o path, os headers, o body. Ele pode tomar decisões inteligentes: "Se o header diz `Mobile`, manda para a API v2".

## O que ele faz? (Patterns)

### 1. Request Aggregation (Agregação)
O frontend pede "Dados da Tela Inicial". O Gateway chama o Serviço de Usuário, o Serviço de Pedidos e o Serviço de Notificações, junta tudo em um JSON e devolve para o front. Economiza bateria do celular do cliente.

### 2. Offloading (Alívio)
Tirar responsabilidades "chatas" dos microserviços.
*   **SSL Termination:** O Gateway cuida dos certificados HTTPS. Internamente, tudo roda em HTTP (mais leve).
*   **Autenticação:** O Gateway verifica o JWT. Se for válido, passa a requisição para frente com um header `X-User-ID`. O microserviço confia cegamente.

### 3. Rate Limiting (Controle de Fluxo)
Protege contra ataques DDoS ou uso abusivo.
**Algoritmo Leaky Bucket:** Imagine um balde furado. A água (requisições) entra rápido, mas sai (processamento) em velocidade constante. Se o balde encher, transborda (erro 429 Too Many Requests).



## Exemplo Prático: Configuração do Traefik

O **Traefik** é um Gateway moderno muito usado com Docker/Kubernetes. A configuração é feita via arquivo YAML.

```yaml
# traefik.yaml
http:
  routers:
    my-router:
      rule: "PathPrefix(`/api`)"
      service: "my-service"
      middlewares:
        - "rate-limit"

  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:8000"

  middlewares:
    rate-limit:
      rateLimit:
        average: 100  # 100 requisições por segundo
        burst: 50     # Permite picos de +50
```

Se um cliente exceder 100 req/s, o Traefik barra a requisição ANTES dela chegar no seu código Python. Isso economiza CPU do servidor.

## Ferramentas Famosas

*   **Kong:** Open-source, robusto, baseado em Nginx. Extensível com plugins Lua.
*   **Traefik:** Nativo para containers. Configuração dinâmica.
*   **AWS API Gateway:** Gerenciado, serverless. Cobra por requisição.

---
# 8.2. Comunicação entre serviços

Quando o Serviço A precisa falar com o Serviço B, como eles se encontram e conversam? Em ambientes de nuvem, IPs são efêmeros (mudam a cada deploy). Você não pode "hardcodar" IPs.



## Service Discovery (A lista telefônica)

É um banco de dados vivo que sabe onde cada instância de cada serviço está.

![imagem_service_discovery](/api/materiais-assets/backend/infraestrutura-de-apis/assets/service-discovery.png)

### Como funciona (Internamente)

1. **Registro:** Quando o Serviço B sobe (boot), ele chama o Discovery: "Oi, sou o Serviço B, meu IP é 10.0.0.5 e porta 8000".
2. **Health Check:** O Discovery fica pingando o Serviço B a cada 5s: "Tá vivo?". Se falhar 3x, ele remove o IP da lista.
3. **Discovery:** O Cliente pergunta: "Quais os IPs do Serviço B?". O Discovery responde a lista atualizada.

### Server-Side vs Client-Side Discovery

* **Server-Side (AWS ELB, K8s Service):** O Cliente chama um endereço fixo (ex: `http://service-b`). O Load Balancer recebe e encaminha. O Cliente não sabe quem são as instâncias.
* **Client-Side (Netflix Eureka, Consul):** O Cliente consulta o registro, recebe a lista de IPs `[10.1, 10.2, 10.3]` e ele mesmo escolhe um e chama. Mais complexo, mas mais flexível.



## Teorema CAP no Discovery

Um Service Discovery precisa ser **AP (Available & Partition Tolerant)**.
É melhor ele me dar um IP velho (que talvez não exista mais) do que travar e não me dar nada. A consistência pode ser eventual.



## Exemplo Prático: Client-Side Discovery (Simulado)

Vamos simular como um cliente Python consultaria um registro (tipo Consul) antes de chamar uma API.

```python
import requests
import random

# Simulação do Registro do Consul/Eureka
SERVICE_REGISTRY = {
    "payment-service": [
        {"ip": "10.0.0.1", "port": 8000, "healthy": True},
        {"ip": "10.0.0.2", "port": 8000, "healthy": True},
        {"ip": "10.0.0.3", "port": 8000, "healthy": False}, # Instância morta
    ]
}

def get_service_url(service_name):
    """Lógica de Client-Side Discovery"""
  
    # 1. Consulta o Registro
    instances = SERVICE_REGISTRY.get(service_name)
    if not instances:
        raise Exception(f"Serviço {service_name} não encontrado")
      
    # 2. Filtra apenas saudáveis
    healthy_instances = [i for i in instances if i["healthy"]]
  
    if not healthy_instances:
        raise Exception("Nenhuma instância saudável disponível")
      
    # 3. Load Balancing (Round Robin ou Random)
    chosen = random.choice(healthy_instances)
  
    return f"http://{chosen['ip']}:{chosen['port']}"

# Uso
try:
    base_url = get_service_url("payment-service")
    print(f"Chamando serviço em: {base_url}")
    # response = requests.post(f"{base_url}/pay", json={...})
except Exception as e:
    print(f"Erro de descoberta: {e}")
```

**Dica:** Use REST para borda (falar com frontend) e gRPC para o miolo (serviço falando com serviço) devido à eficiência do formato binário.

---
# 8.3. Service Mesh

Quando você tem 100 microserviços, configurar Retry, Timeout, Circuit Breaker e mTLS em cada um deles (e em cada linguagem diferente) é impossível. O Service Mesh resolve isso movendo essa lógica para a infraestrutura.

![imagem_service_mesh](/api/materiais-assets/backend/infraestrutura-de-apis/assets/service-mesh.png)



## Data Plane vs Control Plane

O Service Mesh (como [Istio](https://istio.io/) ou [Linkerd](https://linkerd.io/)) é dividido em duas partes:

1. **Data Plane (Os Proxies):** São os "Sidecars" (ex: Envoy Proxy). Eles interceptam cada pacote de rede. Eles executam as regras.
2. **Control Plane (O Cérebro):** É o servidor central do Istio. Você manda um comando: "Faça retry 3x no serviço de Pagamento". O Control Plane envia essa configuração para todos os Sidecars.

## Conceitos Avançados

### 1. Traffic Shifting (Canary via Mesh)

Você pode dizer: *"Envie 95% do tráfego para a versão v1 e 5% para a v2"*. O proxy faz essa divisão matematicamente, sem você mudar o DNS.

### 2. Fault Injection (Chaos Engineering)

Você pode testar a resiliência do sistema injetando falhas propositais.
*"Istio, simule que o serviço de Recomendação está demorando 5 segundos para responder para 10% dos usuários"*. Assim você vê se o seu Frontend quebra ou mostra um loading elegante.

### 3. Distributed Tracing

Como debugar uma requisição que passou por 10 serviços?
O Mesh injeta headers automaticamente (`x-b3-traceid`, `x-b3-spanid`). Se você propagar esses headers no seu código, ferramentas como Jaeger ou Zipkin desenham o mapa completo da chamada.



## Exemplo Prático: Configuração do Istio (VirtualService)

Este arquivo YAML diz ao Istio como rotear o tráfego do serviço de `reviews`.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 75  # 75% vai para a versão estável
    - destination:
        host: reviews
        subset: v2
      weight: 25  # 25% vai para a versão nova (Canary)
    retries:
      attempts: 3
      perTryTimeout: 2s
```

Com esse arquivo aplicado no Kubernetes, o desenvolvedor Python não precisa programar lógica de retry nem de balanceamento de carga. O Mesh cuida disso.

---
# 8.4. Estratégias de deploy e release

Como colocar código novo em produção sem derrubar o sistema ou afetar todos os usuários com um bug?

![image_grafico_blue_green](/api/materiais-assets/backend/infraestrutura-de-apis/assets/)
![image_grafico_canary](/api/materiais-assets/backend/infraestrutura-de-apis/assets/canary.png)
*Sugestão de imagem: Gráficos mostrando o tráfego mudando. Blue/Green (Troca súbita de 100%). Canary (Gradual: 1% -> 10% -> 100%).*



## O Desafio Oculto: Migração de Banco de Dados

Trocar o código é fácil. O difícil é o banco.
Se a Versão 2 do código renomeia uma coluna no banco, a Versão 1 (que ainda está rodando durante o deploy) vai quebrar.

**Regra de Ouro:** Banco de dados deve ser sempre **Retrocompatível (Backward Compatible)**.
1.  Nunca renomeie colunas. Crie uma nova, copie os dados, e depois de meses apague a velha.
2.  Nunca adicione colunas `NOT NULL` sem valor default.



## Feature Flags (Toggles)

Feature Flags desacoplam o **Deploy** (instalar código) do **Release** (ativar funcionalidade).
Você sobe o código para produção, mas ele está "desligado" por um `if`.

### Exemplo Prático com FastAPI (Simulando Unleash)

Imagine que queremos testar um novo algoritmo de recomendação, mas só para usuários internos.

```python
from fastapi import FastAPI, Depends

app = FastAPI()

# Simulação de um Cliente de Feature Flag (Ex: Unleash, LaunchDarkly)
def is_feature_enabled(feature_name: str, user_id: int) -> bool:
    # Num cenário real, isso consultaria um serviço externo ou cache
    # Aqui, ativamos apenas para IDs pares
    if feature_name == "novo_algoritmo_recom":
        return user_id % 2 == 0 
    return False

@app.get("/recomendacoes")
def get_recommendations(user_id: int):
    # O código novo JÁ ESTÁ em produção, protegido por um IF
    if is_feature_enabled("novo_algoritmo_recom", user_id):
        return {"algoritmo": "V2 - IA Avançada", "items": ["Produto A", "Produto B"]}
    
    return {"algoritmo": "V1 - Mais Vendidos", "items": ["Produto X", "Produto Y"]}
```

**Vantagens:**
*   Se a V2 der erro, você desliga a flag no painel administrativo em 1 segundo. Não precisa fazer rollback do deploy (que demora minutos).
*   Você pode fazer A/B Testing real.



## Estratégias de Infraestrutura

### 1. Rolling Update (O Padrão K8s)
Você tem 10 réplicas. Mata uma velha, sobe uma nova.
*   **Pró:** Sem downtime, barato.
*   **Contra:** Versões misturadas rodando juntas.

### 2. Blue/Green Deployment
Você tem o ambiente **Blue** (Atual) e sobe um **Green** (Novo) idêntico. O roteador troca 100% do tráfego de uma vez.
*   **Pró:** Rollback instantâneo.
*   **Contra:** Custa o dobro (infra duplicada).

### 3. Canary Release
Manda 1% do tráfego para a versão nova. Se não tiver erros (monitoramento automático), aumenta para 10%, 50%, 100%.
*   **Pró:** Risco mínimo para o usuário final.
*   **Contra:** Complexo de configurar roteamento.
