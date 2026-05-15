---
title: 4. ETL
description: Extraction, Transformation and Load
category: Dados
order: 4
---

# 4.1. O que é ETL

ETL (Extract, Transform, Load) é um dos principais padrões de integração e processamento de dados usados para mover informações de suas fontes originais para um sistema de destino, geralmente com foco analítico.
A ideia central é extrair dados de múltiplas origens, transformá‑los conforme regras técnicas e de negócio e carregá‑los em um ambiente onde possam ser consultados e analisados de forma eficiente.

- **Extract (*Extração*)**: etapa em que os dados são coletados das fontes, como APIs (interfaces de programação de aplicações), bancos de dados, arquivos, filas de mensagens ou sistemas legados. Nesta fase, é importante entender a estrutura da fonte, o volume, as restrições de acesso e a frequência com que os dados precisam ser buscados.

- **Transform (*Transformação*)**: etapa em que os dados são limpos, padronizados, enriquecidos e combinados, aplicando regras de negócio e garantindo qualidade e consistência.

- **Load (*Carga*)**: etapa final, na qual os dados transformados são carregados em um ou mais destinos, como data warehouses, data lakes ou data marts, para serem consumidos por análises, relatórios, modelos ou aplicações.

Fonte: Fundamentals of Data Engineering
![ETL](/api/materiais-assets/3-dados/4-etl/assets/etl.jpg)

# 4.2. Passos do ETL

## Extrair

### O que é o processo de extração (extract)

A extração é a primeira etapa do pipeline ETL e seu objetivo é coletar dados de um ou mais sistemas de origem e transportá‑los para um ambiente intermediário ou de processamento.
Essa fase busca obter informações de forma íntegra e consistente, com a menor latência possível, evitando sobrecarregar os sistemas transacionais ou de produção.

Fonte:

### Fontes de dados

Os sistemas de origem podem variar bastante em tipo e tecnologia, e cada um exige estratégias específicas de extração.
Alguns exemplos comuns:

- **Bancos de dados**: relacionais (PostgreSQL, MySQL, Oracle) ou não relacionais (MongoDB, Cassandra), acessados por queries SQL, conectores nativos ou ferramentas de integração.
- **Arquivos**: formatos como CSV, JSON, Parquet ou logs de aplicações, armazenados em sistemas de arquivos ou object storage.
- **APIs**: interfaces HTTP (REST, GraphQL etc.) usadas para acessar dados em tempo real ou sob demanda.
- **CDC (*Change Data Capture*)**: técnica que acompanha logs de transação para capturar inserções, atualizações e exclusões quase em tempo real, evitando reprocessar todo o conjunto.
- **Web Scraping**: extração de informações diretamente de páginas web, analisando o HTML quando não há APIs disponíveis, sempre observando restrições legais e de uso.



### Ingestão de dados

A ingestão de dados define como e com que frequência as informações extraídas são movidas para o ambiente de processamento ou armazenamento.
Essa escolha impacta desempenho, custo e atualidade das análises.

Frequência de ingestão:

- **Tempo real (*real‑time*)**: dados capturados e processados continuamente, geralmente via *streams* (como Apache Kafka ou AWS Kinesis), ideais para monitoramento e decisões rápidas.
- **Lotes (*batch*)**: dados coletados e processados em janelas periódicas (por hora, dia etc.), mais adequados para grandes volumes e cenários em que alguns minutos ou horas de defasagem são aceitáveis.

Padrão de movimentação:

- **Push**: a origem envia ativamente os dados para o destino, muitas vezes usando filas ou tópicos de mensagens.
- **Pull**: o destino se conecta à origem para ler e extrair dados sob demanda.
- **Poll**: variação do pull em que o destino “sonda” a origem em intervalos definidos para verificar se há novos registros ou alterações.

## Transformar

### O que é o processo de transformação (transform)

A transformação é a fase intermediária do ETL, em que dados brutos são convertidos em informações estruturadas e coerentes com o sistema de destino.
O objetivo é preparar os dados para análises, relatórios ou modelagem, garantindo integridade, consistência e alinhamento com as regras de negócio.

Atividades comuns incluem:

- **Limpeza e padronização**: tratamento de valores nulos, correção de formatos, normalização de textos e conversão de tipos de dados.
- **Integração**: combinação de dados de múltiplas fontes para construir uma visão unificada de entidades (clientes, produtos, transações etc.).
- **Enriquecimento**: inclusão de atributos derivados ou externos que agregam contexto e valor analítico.
- **Agregação e sumarização**: cálculo de métricas, estatísticas e consolidações para diferentes níveis de granularidade.
- **Feature engineering**: criação de atributos derivados específicos para modelos de machine learning.
- **Aplicação de regras de negócio**: implementação de métricas, classificações e lógicas específicas da organização.


### Ferramentas de transformação

A escolha das ferramentas de transformação depende de volume de dados, complexidade das regras, arquitetura adotada (ETL x ELT) e stack tecnológico disponível.

Ferramentas e tecnologias comuns:

- **SQL**: base para transformações em bancos relacionais e data warehouses, excelente para junções, filtros e agregações.
- **Pandas**: biblioteca Python voltada para manipulação de dados estruturados e análises exploratórias em volumes pequenos e médios.
- **Apache Spark**: engine de processamento distribuído adequada para grandes volumes em *batch* e *streaming*.
- **dbt (Data Build Tool)**: ferramenta focada em transformações baseadas em SQL e modelagem modular diretamente no data warehouse (arquiteturas ELT).
- **Orquestradores como Apache Airflow**: coordenam a execução de tarefas de transformação em pipelines complexos.
- **Plataformas nativas de cloud/data warehouse (BigQuery SQL, Snowpark, etc.)**: permitem executar transformações diretamente no ambiente de destino.


### Qualidade e limpeza de dados

Garantir qualidade é essencial: dados incorretos ou inconsistentes levam a análises equivocadas e decisões erradas.

Aspectos de limpeza:

- **Tratamento de dados ausentes, duplicados ou inválidos**.
- **Padronização de formatos (datas, documentos, códigos)**.
- **Conversão de tipos para garantir coerência entre sistemas**.

Dimensões de qualidade:

- **Precisão**: valores devem representar corretamente a realidade.
- **Completude**: campos relevantes não devem estar vazios sem justificativa.
- **Consistência**: informações precisam ser coerentes entre tabelas e sistemas.
- **Tempestividade**: dados devem estar atualizados dentro da janela necessária ao negócio.
- **Confiabilidade**: processos devem ser rastreáveis, reprodutíveis e auditáveis.

## Armazenar

### O que é o processo de armazenar (Load)

O armazenamento (Load) é a fase final do ETL, em que os dados já extraídos e transformados são gravados em um sistema de destino preparado para consulta e consumo.
Além da carga final, é comum utilizar áreas intermediárias (como *staging* e camadas refinadas) para controlar versionamento, desempenho e governança.

Os principais modos de carga incluem:

- **Carga total**: substitui todo o conjunto de dados de destino a cada execução, adequada para tabelas pequenas ou ambientes de teste.
- **Carga incremental**: insere ou atualiza apenas registros novos ou alterados, reduzindo tempo e custo de processamento.
- **Carga contínua (*streaming*)**: insere dados conforme chegam, suportando casos de uso em tempo real, como monitoramento ou telemetria.


### Sistemas de armazenamento

Os sistemas de armazenamento de dados variam em estrutura, propósito e forma de acesso, e a seleção correta é crucial para equilibrar custo, desempenho e escalabilidade.

- **Object Storage**: sistema baseado em objetos individuais, cada um com seu conteúdo, metadados e identificador único, organizado em um espaço plano (sem hierarquia rígida de pastas). É ideal para dados não estruturados e semi‑estruturados, como arquivos CSV, JSON, imagens, vídeos e logs, sendo a base de muitos data lakes em nuvem (ex.: Amazon S3, Azure Blob Storage, Google Cloud Storage).
- **OLTP (Online Transaction Processing)**: bancos de dados relacionais orientados a linhas, otimizados para grandes volumes de transações curtas, leituras e escritas rápidas e forte consistência. São usados em sistemas operacionais como e‑commerce, bancos e ERPs.
- **OLAP (Online Analytical Processing)**: bancos orientados a colunas, voltados para consultas analíticas complexas sobre grandes volumes de dados, com foco em agregações e análises multidimensionais. Exemplos modernos incluem Snowflake, BigQuery, Redshift e ClickHouse.


### Arquiteturas de armazenamento

As arquiteturas de armazenamento definem como os dados são organizados e disponibilizados para consumo em diferentes camadas do ecossistema analítico.

- **Data Warehouse**: repositório central estruturado que armazena dados limpos e integrados, organizado em esquemas (estrela, floco de neve) e otimizado para consultas analíticas e relatórios corporativos.
- **Data Lake**: ambiente de armazenamento em larga escala que recebe dados em seu formato bruto, estruturados ou não, geralmente sobre object storage, servindo como base para experimentação, ciência de dados e machine learning.
- **Data Lakehouse**: abordagem que combina a flexibilidade do data lake com recursos de gerenciamento, performance e consistência típicos de data warehouses, utilizando camadas de metadados e formatos transacionais.

Essas arquiteturas costumam coexistir em uma **plataforma de dados moderna**, permitindo que os dados fluam da captação até análises avançadas com governança, segurança e escalabilidade.
