---
title: 9. Infraestrutura de APIs
description: Como tornar a sua implementação acessível para a internet
category: Backend
order: 9
---

- [9.0. Visão Geral: Infraestrutura de APIs](#90-visao-geral-infraestrutura-de-apis)
- [9.1. API Gateway e suas responsabilidades](#91-api-gateway-e-suas-responsabilidades)
- [9.2. Comunicação entre serviços](#92-comunicacao-entre-servicos)
- [9.3. Service Mesh](#93-service-mesh)
- [9.4. Estratégias de deploy e release](#94-estrategias-de-deploy-e-release)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

# 9.0. Visão Geral: Infraestrutura de APIs

Se a Arquitetura (Seção 8) é o projeto da casa, a Infraestrutura (Seção 9) é o encanamento, a elétrica e a segurança.

No desenvolvimento moderno (Cloud Native), o desenvolvedor backend não pode mais ignorar a infraestrutura. Você precisa entender onde seu código roda e como o tráfego chega até ele.



## O que você vai aprender neste módulo?

Vamos seguir o caminho de uma requisição, da internet até o servidor.

### A Porta de Entrada (Gateway)
*   **Seção 9.1:** O **API Gateway**. Por que não devemos expor nossos microserviços diretamente? Como centralizar autenticação e rate limiting?

### Encontrando o Destino (Discovery)
*   **Seção 9.2:** Em um cluster com 100 serviços que mudam de IP toda hora, como o Serviço A encontra o Serviço B? Bem-vindo ao **Service Discovery**.

### Gerenciando o Tráfego (Mesh)
*   **Seção 9.3:** Quando a comunicação fica complexa, precisamos de um "policial de trânsito". O **Service Mesh** move a lógica de retry, timeout e segurança para fora do seu código Python.

### Entregando Valor (Deploy)
*   **Seção 9.4:** Como atualizar o sistema sem tirar do ar? Vamos ver estratégias de **Blue/Green**, **Canary** e **Rolling Updates**.



## Por que isso é importante?

Muitos problemas que tentamos resolver com código (ex: Retry, Circuit Breaker, Load Balancing) já estão resolvidos pela infraestrutura de forma mais eficiente.

Entender essas ferramentas evita que você reinvente a roda e permite construir sistemas que são resilientes por padrão, não por sorte.

---
# 9.1. API Gateway e suas responsabilidades

Em uma arquitetura de microserviços (ou até monólitos distribuídos), você não quer expor seus serviços internos diretamente para a internet. O API Gateway é o "porteiro".

![imagem_api_gateway](https://www.connecting-software.com/wp-content/uploads/2023/01/API-Gateway-Diagram.webp)



## Gateway vs Load Balancer

Muitas pessoas confundem os dois.
*   **Load Balancer (L4):** Distribui tráfego baseado em IP e Porta. É burro. Ele apenas repassa o pacote TCP. (Ex: AWS ELB).
*   **API Gateway (L7):** Entende HTTP. Ele lê o path, os headers, o body. Ele pode tomar decisões inteligentes: "Se o header diz `Mobile`, manda para a API v2".

## O que ele faz? (Patterns)

### Request Aggregation (Agregação)
O frontend pede "Dados da Tela Inicial". O Gateway chama o Serviço de Usuário, o Serviço de Pedidos e o Serviço de Notificações, junta tudo em um JSON e devolve para o front. Economiza bateria do celular do cliente.

### Offloading (Alívio)
Tirar responsabilidades "chatas" dos microserviços.
*   **SSL Termination:** O Gateway cuida dos certificados HTTPS. Internamente, tudo roda em HTTP (mais leve).
*   **Autenticação:** O Gateway verifica o JWT. Se for válido, passa a requisição para frente com um header `X-User-ID`. O microserviço confia cegamente.

### Rate Limiting (Controle de Fluxo)
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
# 9.2. Comunicação entre serviços

Quando o Serviço A precisa falar com o Serviço B, como eles se encontram e conversam? Em ambientes de nuvem, IPs são efêmeros (mudam a cada deploy). Você não pode "hardcodar" IPs.



## Service Discovery (A lista telefônica)

É um banco de dados vivo que sabe onde cada instância de cada serviço está.

![imagem_service_discovery](/api/materiais-assets/4-backend/9-infraestrutura-de-apis/assets/service-discovery.png)

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
# 9.3. Service Mesh

Quando você tem 100 microserviços, configurar Retry, Timeout, Circuit Breaker e mTLS em cada um deles (e em cada linguagem diferente) é impossível. O Service Mesh resolve isso movendo essa lógica para a infraestrutura.

![imagem_service_mesh](/api/materiais-assets/4-backend/9-infraestrutura-de-apis/assets/service-mesh.png)



## Data Plane vs Control Plane

O Service Mesh (como [Istio](https://istio.io/) ou [Linkerd](https://linkerd.io/)) é dividido em duas partes:

1. **Data Plane (Os Proxies):** São os "Sidecars" (ex: Envoy Proxy). Eles interceptam cada pacote de rede. Eles executam as regras.
2. **Control Plane (O Cérebro):** É o servidor central do Istio. Você manda um comando: "Faça retry 3x no serviço de Pagamento". O Control Plane envia essa configuração para todos os Sidecars.

## Conceitos Avançados

### Traffic Shifting (Canary via Mesh)

Você pode dizer: *"Envie 95% do tráfego para a versão v1 e 5% para a v2"*. O proxy faz essa divisão matematicamente, sem você mudar o DNS.

### Fault Injection (Chaos Engineering)

Você pode testar a resiliência do sistema injetando falhas propositais.
*"Istio, simule que o serviço de Recomendação está demorando 5 segundos para responder para 10% dos usuários"*. Assim você vê se o seu Frontend quebra ou mostra um loading elegante.

### Distributed Tracing

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
# 9.4. Estratégias de deploy e release

Como colocar código novo em produção sem derrubar o sistema ou afetar todos os usuários com um bug?

![image_grafico_canary](/api/materiais-assets/4-backend/9-infraestrutura-de-apis/assets/canary.png)
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

### Rolling Update (O Padrão K8s)
Você tem 10 réplicas. Mata uma velha, sobe uma nova.
*   **Pró:** Sem downtime, barato.
*   **Contra:** Versões misturadas rodando juntas.

### Blue/Green Deployment
Você tem o ambiente **Blue** (Atual) e sobe um **Green** (Novo) idêntico. O roteador troca 100% do tráfego de uma vez.
*   **Pró:** Rollback instantâneo.
*   **Contra:** Custa o dobro (infra duplicada).

### Canary Release
Manda 1% do tráfego para a versão nova. Se não tiver erros (monitoramento automático), aumenta para 10%, 50%, 100%.
*   **Pró:** Risco mínimo para o usuário final.
*   **Contra:** Complexo de configurar roteamento.

## Complemente o Aprendizado
- [Artigo Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)

- [Vídeo bastante visual e explicativo: O que é Service Mesh? Entenda Istio de Uma Vez por Todas!](https://www.youtube.com/watch?v=T-GNfSGt9-8)

```quiz
- tipo: single
  pergunta: "Em roteamentos de requisições API v2 se o cabeçalho HTTP contiver 'Header: Mobile'. Por que um Load Balancer tradicional de Camada 4 (L4) não vai realizar essa tarefa sozinho?"
  opcoes:
    - texto: "Porque o Load Balancer L4 é para comunicação assíncrona entre microsserviços internos."
      correta: false
      explicacao: "Load Balancers L4 são amplamente utilizados na borda para balanceamento de tráfego de rede bruto, sem relação com comunicação assíncrona."
    - texto: "Porque o Load Balancer L4 atua no nível TCP/IP, exigindo um API Gateway (L7) para trabalhos mais complexos."
      correta: true
      explicacao: "Load Balancers L4 enxerga apenas IP e porta. Somente componentes da Camada 7 (como API Gateways) conseguem ler cabeçalhos e caminhos HTTP para tomar decisões de roteamento."
      explicacao_erro: "Load Balancers de Camada 4 operam apenas com endereços IP e portas TCP. Eles não abrem nem inspecionam o pacote HTTP, portanto não conseguem ler cabeçalhos."
    - texto: "Porque o Load Balancer L4 só suporta conexões genéricas, ignorando o protocolo TCP."
      correta: false
      explicacao: "O Load Balancer L4 trabalha perfeitamente com TCP, mas não inspeciona a camada de aplicação (HTTP) que roda acima dele."
    - texto: "Porque o Load Balancer L4 limita o tráfego apenas a endereços IP estáticos configurados manualmente."
      correta: false
      explicacao: "A limitação do L4 não é o IP estático, mas sim o fato de ser 'cego' para o protocolo HTTP e seus cabeçalhos."

- tipo: single
  pergunta: "Um API Gateway foi configurado com o algoritmo Leaky Bucket para conter picos imprevisíveis de tráfego. O que acontece com as requisições excedentes quando a taxa de entrada ultrapassa a capacidade total do balde?"
  opcoes:
    - texto: "As requisições ficam armazenadas no banco de dados até que o servidor termine de processá-las."
      correta: false
      explicacao: "O Gateway não persiste requisições excedentes em banco de dados isso gera sobrecarga de armazenamento e latência inaceitável."
    - texto: "O Gateway redireciona o tráfego excedente para o ambiente de testes (staging)."
      correta: false
      explicacao: "Ambientes de testes não devem receber tráfego produtivo de usuários reais não faz sentido em um ambiente de teste."
    - texto: "O servidor força a reinicialização das instâncias da aplicação para absorver a carga."
      correta: false
      explicacao: "O Rate Limiting serve justamente para proteger o servidor de sobrecarga, não para disparar reinicializações da infraestrutura."
    - texto: "As requisições excedentes são descartadas imediatamente com o código HTTP 429 (Too Many Requests)."
      correta: true
      explicacao: "No Leaky Bucket, o balde processa requisições a uma taxa constante. Se o fluxo de entrada enche a capacidade máxima, o excesso é rejeitado na hora com erro."
      explicacao_erro: "Quando a capacidade de retenção do Leaky Bucket transborda, o Gateway para imediatamente as requisições adicionais para proteger os serviços internos contra sobrecarga."

- tipo: single
  pergunta: "Em uma arquitetura de Service Mesh, qual é o papel desempenhado pelos proxies Sidecar (como o Envoy) localizados no Data Plane?"
  opcoes:
    - texto: "Interceptar todo o tráfego de rede para aplicar regras."
      correta: true
      explicacao: "O Data Plane é composto pelos proxies Sidecar que rodam junto de cada serviço, interceptando os pacotes e executando as políticas na prática."
      explicacao_erro: "Os proxies Sidecar no Data Plane são os 'executores' do tráfego sem alterar o código da aplicação."
    - texto: "Gerenciar o painel administrativo e enviar as configurações gerais do cluster para os nós."
      correta: false
      explicacao: "Essa é a responsabilidade do Control Plane (o cérebro do Service Mesh), e não dos proxies no Data Plane."
    - texto: "Executar o código de negócio da aplicação Python e realizar consultas no banco de dados."
      correta: false
      explicacao: "O Sidecar é um proxy de rede isolado que roda ao lado do container da aplicação; ele não executa o código de negócio nem substitui a aplicação."
    - texto: "Armazenar os logs de auditoria em disco rígido para análise forense posterior."
      correta: false
      explicacao: "Apesar de coletar métricas, o objetivo primário do Data Plane é o roteamento e tratamento de tráfego de rede em tempo real."

- tipo: single
  pergunta: "Qual é a principal vantagem do uso de Feature Flags (Toggles) em comparação a realizar um rollback tradicional de código em caso de bug em produção?"
  opcoes:
    - texto: "Garante que o banco de dados desfaça automaticamente as alterações de esquema mais recentes."
      correta: false
      explicacao: "Feature Flags controlam caminhos de execução no código, não possuem controle automatizado sobre migrações de banco de dados."
    - texto: "Elimina totalmente a necessidade de escrever testes unitários antes da publicação."
      correta: false
      explicacao: "Feature Flags ajudam na mitigação de riscos em produção, mas nunca substituem a garantia de qualidade por testes automatizados."
    - texto: "Permite desativar a funcionalidade em segundos via chave de configuração, sem precisar re-executar pipelines de deploy."
      correta: true
      explicacao: "Perfeito! Alterar o valor de uma Feature Flag é uma mudança de configuração instantânea, enquanto um rollback de código pode levar minutos e exigir re-build da imagem Docker."
      explicacao_erro: "Feature Flags desacoplam o Deploy do Release. Se a novidade der erro, basta desligar a chave no painel de controle em 1 segundo, sem passar pelo processo demorado de re-deploy."
    - texto: "Impede que requisições com falhas cheguem ao API Gateway do ambiente de produção."
      correta: false
      explicacao: "A Feature Flag é avaliada dentro da aplicação ou serviço, não atuando como um filtro de borda no API Gateway."

```