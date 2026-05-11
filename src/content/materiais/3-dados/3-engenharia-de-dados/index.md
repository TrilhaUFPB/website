---
title: 3. Engenharia de Dados
description: O que é a engenharia de dados?
category: Dados
order: 3
---

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
