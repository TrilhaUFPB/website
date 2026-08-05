---
title: 3. Engenharia de Dados
description: Entenda o que faz a engenharia de dados, como ela sustenta as demais áreas e quais tecnologias formam sua base
category: Dados
order: 3
---

## Sumário

- [3.1. Tudo começa na engenharia](#31-tudo-comeca-na-engenharia)
- [3.2. Atribuições](#32-atribuicoes)
- [3.3. Tecnologias](#33-tecnologias)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Ninguém elogia o encanamento de um prédio, mas nada funciona sem ele. A engenharia de dados é essa camada invisível, que passa despercebida quando está bem feita e para todo o resto quando falha.

A **engenharia de dados** é a prática de projetar, construir e manter sistemas que coletam, armazenam, transformam e disponibilizam dados em escala.

O objetivo é garantir que dados brutos, muitas vezes dispersos e heterogêneos, sejam transformados em informações confiáveis e acessíveis para análises, modelos e produtos de dados.

# 3.1. Tudo começa na engenharia

Ao observar o trabalho de áreas como ciência de dados e análise de dados, fica clara a relação de dependência em relação à engenharia de dados.
Sem uma base sólida de ingestão, armazenamento e qualidade, cientistas e analistas teriam dificuldade para acessar dados limpos e consistentes; por outro lado, o trabalho de engenharia perde sentido se os dados produzidos não forem utilizados em aplicações reais, relatórios ou decisões de negócio.

Além dos casos clássicos de uso (dashboards, modelos preditivos, relatórios), os dados produzidos pela engenharia podem alimentar APIs, aplicações operacionais, automações internas e produtos digitais orientados por dados.

# 3.2. Atribuições

A engenharia de dados se encontra na interseção de várias disciplinas: bancos de dados, arquitetura de sistemas, programação, infraestrutura e governança de dados.
Entre suas atribuições centrais estão o desenho de pipelines de dados, a orquestração de processos de ingestão e transformação, o monitoramento de qualidade e a garantia de disponibilidade e performance das plataformas de dados.

Um conceito fundamental nesse contexto é o **ETL (Extract, Transform, Load)**, que representa o fluxo de extrair dados das fontes, transformá‑los conforme regras de negócio e carregá‑los em um sistema de destino analítico ou operacional.

Fonte: *Fundamentals of Data Engineering*.

# 3.3. Tecnologias

Para executar esse trabalho, a engenharia de dados se apoia em um conjunto de conceitos, ferramentas e linguagens centrais:

- **Banco de dados**: coleção organizada de informações relacionadas, projetada para facilitar armazenamento, consulta e atualização de registros.
- **Infraestrutura em nuvem (cloud)**: ambiente escalável de computação e armazenamento fornecido por provedores como AWS, Azure ou GCP, que dispensa a necessidade de manter hardware próprio e permite ajustar recursos sob demanda.
- **Python**: linguagem de programação com amplo ecossistema de bibliotecas voltadas para manipulação, limpeza, integração e automação de dados.
- **SQL**: linguagem padrão para consulta e transformação de dados em bancos relacionais e em muitos data warehouses modernos, muito utilizada em operações de grande escala.
- **Bash / shell**: linguagem de script utilizada para interagir com o sistema operacional, automatizar tarefas, agendar rotinas e mover dados entre serviços e scripts diferentes.

---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre engenharia de dados, confira os seguintes recursos:

- [What is data engineering? - IBM](https://www.ibm.com/think/topics/data-engineering)

- [O que é um pipeline de dados? - AWS](https://aws.amazon.com/what-is/data-pipeline/)

```quiz
- tipo: single
  pergunta: |
    Um time de ciência de dados reclama que os modelos vivem quebrando porque os dados chegam incompletos e em formatos que mudam sem aviso.
    Segundo o que vimos, de quem é a base que precisa ser resolvida primeiro?
  opcoes:
    - texto: "Da própria ciência de dados, que deveria tratar os dados dentro do modelo"
      correta: false
      explicacao: |
        Tratar dados dentro de cada modelo resolve o sintoma e espalha a mesma correção por todo lugar. O problema descrito é de ingestão, qualidade e consistência — responsabilidades da engenharia de dados.
    - texto: "Da engenharia de dados, responsável por ingestão, armazenamento e qualidade"
      correta: true
      explicacao: |
        Correto! Sem uma base sólida de ingestão, armazenamento e qualidade, cientistas e analistas têm dificuldade para acessar dados limpos e consistentes. É essa fundação que a engenharia de dados sustenta.
      explicacao_erro: |
        A relação entre as áreas é de dependência: análise e ciência de dados consomem o que a engenharia produz. Dados incompletos e com formato instável apontam para a camada que os coleta e padroniza.
    - texto: "Da área de negócio, que deveria definir melhor os relatórios"
      correta: false
      explicacao: |
        Definir bem os requisitos ajuda, mas não resolve dados chegando incompletos e com formato variável. Isso é garantido pelos processos de ingestão e monitoramento de qualidade.

- tipo: single
  pergunta: |
    O que o **ETL (Extract, Transform, Load)** representa no contexto da engenharia de dados?
  opcoes:
    - texto: "O fluxo de extrair dados das fontes, transformá-los conforme regras de negócio e carregá-los em um destino"
      correta: true
      explicacao: |
        Exato! É o conceito central que descreve o caminho do dado desde os sistemas de origem até um sistema de destino analítico ou operacional.
      explicacao_erro: |
        As três letras são as próprias etapas, em ordem: Extract (extrair da fonte), Transform (aplicar regras de negócio) e Load (carregar no destino).
    - texto: "Uma linguagem de programação usada para consultar bancos relacionais"
      correta: false
      explicacao: |
        Essa é a descrição do SQL. O ETL não é uma linguagem, e sim um padrão de fluxo que pode ser implementado com SQL, Python, Spark e outras ferramentas.
    - texto: "Um tipo de banco de dados otimizado para análise"
      correta: false
      explicacao: |
        Isso descreve um data warehouse, que costuma ser o **destino** de um processo de ETL — não o processo em si.

- tipo: single
  pergunta: |
    Entre as tecnologias centrais da engenharia de dados, qual é a função do **Bash / shell**?
  opcoes:
    - texto: "Consultar e transformar dados em bancos relacionais e data warehouses"
      correta: false
      explicacao: |
        Essa é a função do SQL, a linguagem padrão para consulta e transformação de dados em bancos relacionais e em muitos data warehouses modernos.
    - texto: "Interagir com o sistema operacional, automatizar tarefas, agendar rotinas e mover dados entre serviços"
      correta: true
      explicacao: |
        Isso mesmo! O shell é a cola do dia a dia: agenda rotinas, encadeia scripts e move dados entre serviços diferentes, mesmo quando cada um foi escrito em outra linguagem.
      explicacao_erro: |
        Pense no que fica *em volta* do pipeline: alguém precisa disparar os scripts na hora certa e mover arquivos entre etapas. Esse papel de automação e integração com o sistema operacional é do shell.
    - texto: "Fornecer ambiente escalável de computação e armazenamento sob demanda"
      correta: false
      explicacao: |
        Essa é a descrição da infraestrutura em nuvem (AWS, Azure, GCP), que dispensa manter hardware próprio e permite ajustar recursos conforme a necessidade.
```
