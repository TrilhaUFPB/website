---
title: 1. Tipos de Dados
description: Entenda o que são dados e como classificá-los em estruturados, semi-estruturados e não estruturados conforme o grau de organização
category: Dados
order: 1
---

## Sumário

- [1.1. Estruturado](#11-estruturado)
- [1.2. Semi-estruturado](#12-semi-estruturado)
- [1.3. Não estruturado](#13-nao-estruturado)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

---

> Uma planilha de vendas e uma pasta de fotos guardam informação, mas você consulta uma com uma fórmula e a outra abrindo arquivo por arquivo. Essa diferença de organização é o que classifica os dados e determina o que dá para fazer com eles.

Para começar, é importante entender o que significa “dado” no nosso contexto.

De forma resumida, **dados** são **registros de fatos ou eventos** que, isoladamente, ainda não carregam interpretação ou significado de negócio.

Esses dados podem ser classificados em diferentes tipos, de acordo com o grau de organização e a forma como são armazenados e acessados.

# 1.1. Estruturado

**Dados estruturados** são aqueles organizados em um **esquema bem definido**, geralmente no formato tabular (tabelas de banco de dados ou planilhas).

Nesse modelo, cada coluna representa um atributo com um tipo de dado específico (texto, número, data etc.), e cada linha corresponde a um registro, o que facilita buscas, filtros, agregações e junções usando linguagens como SQL.

Exemplo de dados estruturados:

Fonte: https://www.dataviking.com.br/post/estruturas-de-dados-entendendo-os-diferentes-tipos
![dados_estruturados](/api/materiais-assets/3-dados/1-tipos-de-dados/assets/dados_estruturados.avif)

# 1.2. Semi-estruturado

**Dados semi‑estruturados** não se encaixam no modelo tabular tradicional, mas ainda possuem uma **estrutura explícita**, como campos, chaves e hierarquias.
Eles combinam características de dados estruturados e não estruturados, permitindo certa flexibilidade de esquema; exemplos comuns incluem formatos como JSON, XML e YAML, amplamente usados em integrações e comunicação entre sistemas.

Exemplo de dados semiestruturados:

Fonte: https://www.dataviking.com.br/post/estruturas-de-dados-entendendo-os-diferentes-tipos
![dados_semiestruturados](/api/materiais-assets/3-dados/1-tipos-de-dados/assets/dados_semiestruturados.avif)

# 1.3. Não estruturado

**Dados não estruturados** não seguem um modelo fixo de organização nem um esquema pré-definido.
Eles aparecem em formatos como textos livres, e‑mails, imagens, vídeos, áudios ou logs de aplicações e, por isso, exigem mais processamento e técnicas específicas para extrair informações úteis.

Exemplo de dados não estruturados:

Fonte: https://www.dataviking.com.br/post/estruturas-de-dados-entendendo-os-diferentes-tipos
![dados_nao_estruturados](/api/materiais-assets/3-dados/1-tipos-de-dados/assets/dados_nao_estruturados.avif)

---

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre tipos de dados, confira os seguintes recursos:

- [Estruturas de dados: entendendo os diferentes tipos - Data Viking](https://www.dataviking.com.br/post/estruturas-de-dados-entendendo-os-diferentes-tipos)

- [Structured vs. unstructured data - IBM](https://www.ibm.com/think/topics/structured-vs-unstructured-data)

- [O que são dados estruturados? - AWS](https://aws.amazon.com/what-is/structured-data/)

```quiz
- tipo: single
  pergunta: |
    Uma equipe precisa integrar dois sistemas e escolhe trocar as informações em **JSON**, com campos e hierarquias definidos, mas sem um esquema fixo de colunas.
    Como esses dados são classificados?
  opcoes:
    - texto: "Estruturados, porque possuem campos nomeados"
      correta: false
      explicacao: |
        Ter campos nomeados não basta. Dados estruturados seguem um esquema bem definido no formato tabular, em que cada coluna tem um tipo específico e cada linha é um registro — como em uma tabela de banco de dados ou planilha.
    - texto: "Semi-estruturados, porque têm estrutura explícita mas não seguem o modelo tabular"
      correta: true
      explicacao: |
        Correto! JSON, XML e YAML têm estrutura explícita (campos, chaves e hierarquias), mas não se encaixam no modelo tabular tradicional. Essa flexibilidade de esquema é justamente o que os torna comuns em integrações entre sistemas.
      explicacao_erro: |
        Pergunte-se: existe estrutura? Sim, há campos e hierarquias. Ela é tabular e de esquema fixo? Não. Quando as duas respostas são essas, o dado está no meio-termo entre estruturado e não estruturado.
    - texto: "Não estruturados, porque o esquema não é fixo"
      correta: false
      explicacao: |
        Dados não estruturados não têm modelo de organização nenhum — textos livres, imagens, vídeos e áudios. O JSON descrito tem campos e hierarquias explícitos, então há estrutura.

- tipo: single
  pergunta: |
    O que caracteriza os dados **estruturados** e permite consultá-los com facilidade usando SQL?
  opcoes:
    - texto: "O fato de estarem armazenados na nuvem"
      correta: false
      explicacao: |
        O local de armazenamento não determina o tipo do dado. Dados de qualquer um dos três tipos podem estar na nuvem ou em servidores próprios.
    - texto: "A organização em um esquema bem definido, com colunas tipadas e linhas como registros"
      correta: true
      explicacao: |
        Isso mesmo! É esse esquema previsível que permite buscas, filtros, agregações e junções com linguagens como SQL — o banco sabe de antemão o tipo de cada coluna.
      explicacao_erro: |
        Pense no que o SQL precisa saber para funcionar: quais colunas existem e que tipo de dado cada uma guarda. Essa previsibilidade vem do esquema.
    - texto: "O volume reduzido, que facilita o processamento"
      correta: false
      explicacao: |
        Volume e tipo de dado são coisas independentes. Tabelas estruturadas podem ter bilhões de registros e ainda assim serem consultadas por SQL.

- tipo: single
  pergunta: |
    Por que dados **não estruturados** costumam exigir mais processamento e técnicas específicas para gerar informação útil?
  opcoes:
    - texto: "Porque ocupam sempre mais espaço em disco que os demais"
      correta: false
      explicacao: |
        Arquivos de vídeo e imagem realmente tendem a ser grandes, mas não é o tamanho que cria a dificuldade — é a ausência de um modelo de organização que possa ser consultado diretamente.
    - texto: "Porque não seguem modelo fixo nem esquema pré-definido, então a informação precisa ser extraída do conteúdo"
      correta: true
      explicacao: |
        Exato! Textos livres, e-mails, imagens, vídeos, áudios e logs não têm campos que se possa filtrar. Para extrair informação é preciso interpretar o conteúdo em si, o que demanda técnicas específicas.
      explicacao_erro: |
        Compare com uma tabela: para saber a média de vendas basta uma consulta. Agora imagine responder à mesma pergunta a partir de mil e-mails — não há coluna para consultar, o dado precisa ser interpretado antes.
    - texto: "Porque só podem ser armazenados em bancos de dados relacionais"
      correta: false
      explicacao: |
        É o oposto: bancos relacionais são projetados para dados estruturados. Dados não estruturados normalmente ficam em sistemas de arquivos, object storage ou bancos especializados.
```
