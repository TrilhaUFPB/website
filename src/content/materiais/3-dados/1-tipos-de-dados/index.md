---
title: 1. Tipos de Dados
description: Quais são os tipos de dados?
category: Dados
order: 1
---

## Sumário

- [1.1. Estruturado](#11-estruturado)
- [1.2. Semi-estruturado](#12-semi-estruturado)
- [1.3. Não estruturado](#13-nao-estruturado)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)

>Para começar, é importante entender o que significa “dado” no nosso contexto. De forma resumida, **dados** são **registros de fatos ou eventos** que, isoladamente, ainda não carregam interpretação ou significado de negócio. Esses dados podem ser classificados em diferentes tipos, de acordo com o grau de organização e a forma como são armazenados e acessados.

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

Para aprofundar seus conhecimentos sobre os tipos de dados, confira o seguintes recurso:

 - [Tipos de Estrutura de Dados: Estruturados, Semi Estruturados e Não Estruturados](https://www.youtube.com/watch?v=n0QaQHs5VA0)

```quiz
- tipo: single
  pergunta: O que caracteriza um dado estruturado?
  opcoes:
    - texto: Está organizado em um esquema bem definido, geralmente em formato tabular
      correta: true
      explicacao: Exato! Dados estruturados seguem um esquema fixo, com colunas e linhas bem definidas, como em tabelas de banco de dados.
      explicacao_erro: Dados estruturados são organizados em um esquema bem definido, geralmente tabular, com colunas representando atributos e linhas representando registros.
    - texto: Não segue nenhum modelo fixo de organização
      correta: false
      explicacao: Isso descreve dados não estruturados, como textos livres e imagens. Dados estruturados seguem um esquema rígido e bem definido.
    - texto: Combina flexibilidade de esquema com campos e hierarquias explícitas
      correta: false
      explicacao: Isso descreve dados semi-estruturados, como JSON e XML. Dados estruturados seguem um esquema fixo e tabular, sem essa flexibilidade.
    - texto: Só pode ser armazenado em arquivos de texto
      correta: false
      explicacao: Dados estruturados são armazenados principalmente em tabelas de banco de dados ou planilhas, não apenas em arquivos de texto.

- tipo: single
  pergunta: Quais são exemplos comuns de formatos usados para representar dados semi-estruturados?
  opcoes:
    - texto: JSON, XML e YAML
      correta: true
      explicacao: Exato! Esses formatos possuem estrutura explícita, como campos e hierarquias, mas não seguem o modelo tabular rígido.
      explicacao_erro: Dados semi-estruturados são comumente representados por formatos como JSON, XML e YAML, usados em integrações entre sistemas.
    - texto: Tabelas de banco de dados relacionais
      correta: false
      explicacao: Tabelas de banco de dados são o exemplo clássico de dados estruturados, não semi-estruturados.
    - texto: Vídeos e áudios
      correta: false
      explicacao: Vídeos e áudios são exemplos de dados não estruturados, pois não seguem nenhum esquema fixo.
    - texto: Planilhas Excel
      correta: false
      explicacao: Planilhas seguem um modelo tabular organizado, sendo um exemplo de dados estruturados, não semi-estruturados.

- tipo: single
  pergunta: Por que dados não estruturados exigem mais processamento para extrair informações úteis?
  opcoes:
    - texto: Porque não seguem um modelo fixo de organização nem um esquema pré-definido
      correta: true
      explicacao: Exato! Como textos livres, imagens e vídeos não têm estrutura definida, técnicas específicas são necessárias para extrair informações deles.
      explicacao_erro: Dados não estruturados não seguem um esquema pré-definido, o que exige técnicas específicas de processamento para extrair informações úteis.
    - texto: Porque são armazenados apenas em nuvem
      correta: false
      explicacao: O local de armazenamento não define se um dado é estruturado ou não. A característica principal é a ausência de um esquema fixo.
    - texto: Porque ocupam mais espaço em disco que outros tipos de dados
      correta: false
      explicacao: O espaço em disco não é o motivo. A dificuldade está na ausência de estrutura, o que exige processamento específico para extrair sentido dos dados.
    - texto: Porque só podem ser lidos por linguagens de programação específicas
      correta: false
      explicacao: Dados não estruturados podem ser lidos por várias linguagens. O desafio é a falta de organização, não a linguagem usada para processá-los.
```