---
title: 5. Análise de Dados
description: Entenda o que é análise de dados na prática, como dar os primeiros passos em EDA e como usar Python (Pandas + bibliotecas de visualização) para explorar um conjunto de dados real.
category: Dados
order: 5
---
## Sumário

- [5.1 Introdução à Análise de Dados](#51-introducao-a-analise-de-dados)
- [5.2 Classificação de Dados](#52-classificacao-de-dados)
- [5.3 Ferramentas e bibliotecas essenciais](#53-ferramentas-e-bibliotecas-essenciais)
- [5.4 Análise Exploratória de Dados (EDA)](#54-analise-exploratoria-de-dados-eda)
- [5.5 Tipos de relação e quais gráficos usar](#55-tipos-de-relacao-e-quais-graficos-usar)
- [5.6 Limpeza e Transformação de Dados](#56-limpeza-e-transformacao-de-dados)
- [Complemente o Aprendizado](#complemente-o-aprendizado)

# 5.1. Introdução à Análise de Dados
>O que é análise de dados e por que ela é importante no dia a dia, Reconhecer propriedades e tipos de dados, Aplicar EDA (Análise Exploratória de Dados) em um dataset simples, Executar limpeza e transformação básicas de dados, Visualizar informações de forma clara e correta e Ganhar familiaridade com Pandas, Matplotlib, Seaborn e Jupyter Notebook

## 5.1.1 O que é análise de dados
Análise de dados é o processo de **fazer perguntas** e **tentar respondê-las usando dados**.  
Na prática, isso envolve inspecionar, limpar, transformar e modelar dados para extrair informações úteis, apoiar decisões e gerar conhecimento acionável.

Vamos focar principalmente em:
- entender os dados (EDA),
- preparar os dados (limpeza e transformação),
- comunicar os resultados por meio de gráficos e resumos.


#### Objetivo e importância
- Tomada de decisão baseada em evidências  
- Identificação de padrões, tendências e anomalias  
- Otimização de processos e redução de custos  
- Comunicação clara de insights para stakeholders

#### Etapas da análise de dados

![Ciclo de analise de dados](/api/materiais-assets/3-dados/5-analise-de-dados/assets/data-analysis-process.png)

## 5.2 Classificação de Dados

#### Dados estruturados
Dados organizados em formato tabelar (linhas e colunas), com uma **estrutura bem definida** (tipos, chaves, restrições).  
Exemplos: tabelas SQL, planilhas do Excel, dados transacionais de um sistema.

- **Vantagens**: fácil consulta, validação e integração  
- **Desafios**: mais rígidos; às vezes é preciso adaptar os dados ao formato da tabela

#### Dados não estruturados
Dados sem um esquema pré-definido ou com estrutura muito flexível.  
Exemplos: textos livres, imagens, áudios, vídeos, logs brutos.

- Vantagens: grande riqueza de informação contextual  
- Desafios: exigem pré-processamento e extração de atributos (NLP, visão computacional etc.)

![dados estruturados x nao estruturados](/api/materiais-assets/3-dados/5-analise-de-dados/assets/tipos_dados.png)


#### Dados qualitativos (categóricos)
Representam **categorias/classes**.  
Podem ser:
- **Nominais**: sem ordem (ex.: cor, cidade, time de futebol)  
- **Ordinais**: com ordem (ex.: nível de satisfação: ruim, médio, bom, ótimo)

Em análises e modelos, normalmente exigem **codificação** (por exemplo, One-Hot Encoding).

- Medidas típicas: frequências, moda, proporções  
- Gráficos comuns: barras, pizza (com cautela)

#### Dados quantitativos (numéricos)
Representam **quantidades**. Podem ser:
- **Discretos**: contagens (ex.: número de faltas)  
- **Contínuos**: medidas (ex.: altura, temperatura)

Suportam operações aritméticas e estatísticas descritivas.

- Medidas típicas: média, mediana, desvio-padrão, quantis  
- Gráficos comuns: histograma, boxplot, linha (séries temporais)

![dados qualitativos x dados quantitativos](/api/materiais-assets/3-dados/5-analise-de-dados/assets/tipos_variaveis.webp)


## 5.3 Ferramentas e bibliotecas essenciais

Antes de falar de cada biblioteca, vale ver um **mini-exemplo** completo.

## Mini-exemplo

Suponha um arquivo `alunos.csv` com colunas como `nome`, `idade`, `nota`.

```python
import pandas as pd

# Carregar dados de um arquivo CSV
df = pd.read_csv("alunos.csv")

# Olhar as primeiras linhas
print(df.head())

# Resumo estatístico rápido das colunas numéricas
print(df.describe())
```
---

## Pandas

Pandas é a principal biblioteca Python para **manipulação e análise de dados estruturados**.  
Ela fornece estruturas de dados eficientes que permitem trabalhar com tabelas de forma simples e expressiva.

O Pandas é amplamente utilizado na **Análise Exploratória de Dados (EDA)**, pois facilita a limpeza, transformação e organização dos dados antes de qualquer modelagem ou visualização.

Principais estruturas:
- **Series**: estrutura unidimensional (vetor)
- **DataFrame**: estrutura bidimensional (linhas e colunas)

Principais usos:
- Leitura de dados (CSV, Excel, SQL, JSON)
- Filtragem e seleção de dados
- Criação de novas variáveis
- Tratamento de valores ausentes
- Agregações e estatísticas descritivas

![Pandas DataFrame](/api/materiais-assets/3-dados/5-analise-de-dados/assets/pandas_dataframe.png)
![Operações no Pandas](/api/materiais-assets/3-dados/5-analise-de-dados/assets/pandas_operations.webp)

---

## Matplotlib

Matplotlib é a biblioteca base de **visualização de dados em Python**.  
Ela permite criar gráficos simples ou altamente customizáveis, sendo muito utilizada em contextos acadêmicos e científicos.

É ideal para transformar dados numéricos em representações visuais que auxiliam na identificação de padrões, tendências e comparações.

Tipos de gráficos mais comuns:
- Gráfico de linhas
- Gráfico de barras
- Histogramas
- Gráficos de dispersão
- Boxplots

Exemplo rápido de uso com um DataFrame `df`:

```python
import matplotlib.pyplot as plt

df["nota"].hist(bins=10)
plt.xlabel("Nota")
plt.ylabel("Frequência")
plt.title("Distribuição das notas")
plt.show()
```

![Matplotlib Exemplos](/api/materiais-assets/3-dados/5-analise-de-dados/assets/matplotlib_examples.png)

---

## Seaborn

Seaborn é uma biblioteca de visualização construída **sobre o Matplotlib**, focada em **visualizações estatísticas** mais informativas e com melhor estética padrão.

Ela facilita a análise exploratória ao permitir observar relações entre variáveis, distribuições e correlações com menos código.

Principais recursos:
- **Heatmaps** de correlação
- **Boxplots** e violin plots
- **Pairplots** (análise multivariada)
- Estilos visuais mais claros e consistentes

Exemplo simples:

```python
import seaborn as sns

# Boxplot de notas por turma
sns.boxplot(data=df, x="turma", y="nota")
```

![Seaborn Exemplos](/api/materiais-assets/3-dados/5-analise-de-dados/assets/seaborn_examples.png)

---

## Relação entre as bibliotecas

Essas ferramentas são complementares e costumam ser usadas juntas em um fluxo típico de análise de dados:

1. **Pandas**: leitura, limpeza e transformação dos dados  
2. **Matplotlib**: visualizações básicas e customizadas  
3. **Seaborn**: visualizações estatísticas e exploração avançada

Uso conjunto (resumindo):
- Use **Pandas** para manipular os dados  
- Use **Matplotlib** quando precisar de controle fino do gráfico  
- Use **Seaborn** quando quiser gráficos estatísticos bonitos e rápidos

---
```python
  df.columns
  df.dtypes
  df.head()
  df.tail()
  df.sample(5, random_state=42)
  df.info()
```
## 5.4 Análise Exploratória de Dados (EDA)

## Inspeção inicial do dataset
Pense no dataset como uma **caixa misteriosa**: antes de usar, você dá uma olhada rápida para saber o que tem dentro.

O que checar:
- **Tamanho**: quantas linhas e colunas?  
- **Colunas**: os nomes fazem sentido?  
- **Tipos**: número, texto, data… estão corretos?  
- **Amostra**: ver as primeiras/últimas linhas

Exemplo prático (tabela de alunos):
- `idade` deveria ser número  
- `turma` deveria ser texto  
- `data_prova` deveria ser data  
Se esses campos tiverem tipos consistentes, é um bom sinal de que os dados foram carregados corretamente.

Comandos úteis (Pandas em Python):

```python
df.shape #Mostra o tamanho do seu DataFrame, entregando a quantidade exata de linhas e colunas que ele possui.
df.columns #Lista os nomes de todas as colunas
df.dtypes #Revela o tipo de dado (string, int, float etc...) armazenado em cada coluna.
df.head() #Exibe as 5 primeiras linhas do conjunto de dados
df.tail() #Exibe as 5 Últimas linhas do conjunto de dados
df.sample(5, random_state=42) #Sorteia 5 linhas totalmente aleatórias da tabela, mas garante que seja reproduzivel pela seed = 42
df.info() #Dá um relatório completo sobre a tabela
```
---

## Estatísticas descritivas
Aqui você faz o “resumo do resumo” dos dados: uma forma rápida de entender o comportamento geral.

Para variáveis numéricas:
- **Média**: o valor “típico”  
- **Mediana**: o valor do meio (ótima quando há valores extremos)  
- **Mín/Máx**: limites  
- **Desvio padrão**: o quanto varia

Para variáveis categóricas (texto):
- **Contagem**: quantas vezes cada categoria aparece  
- **Moda**: o que mais se repete

Exemplo:
Se as notas da turma são: `2, 3, 3, 10`  
A **média** sobe muito por causa do `10`, mas a **mediana** ainda mostra um “meio” mais realista.

Comandos úteis (Pandas):

```python
df.describe()                 # numéricas por padrão
df.describe(include="all")    # inclui categóricas (pode ficar grande)
df["coluna_num"].describe()

df["coluna_cat"].value_counts()
df["coluna_cat"].value_counts(normalize=True)  # proporção

df[df.isna().any(axis=1)].head()   # linhas com pelo menos um nulo
df.notna().sum()                   # valores presentes
```
---

## Detecção de dados ausentes
Valores ausentes são como **peças faltando**: se você ignorar, pode distorcer a análise e os modelos.

O que verificar:
- **Quantos nulos** por coluna?  
- **Percentual** de nulos (5% vs 60% muda muito a decisão)  
- **Padrão**: falta aleatória ou concentrada em algum grupo?

Comandos úteis (Pandas):

```python
df.isna().sum()
(df.isna().mean() * 100).sort_values(ascending=False)  # % por coluna
df[df.isna().any(axis=1)].head()   # linhas com pelo menos um nulo
df.notna().sum()                   # valores presentes
```

---

## Relações entre variáveis
Parte “detetive”: aqui você procura padrões entre variáveis e valida (ou derruba) hipóteses.  
O gráfico normalmente vem *antes* da métrica, porque relação sem visual pode enganar.

Perguntas clássicas:
- Quando `X` aumenta, `Y` tende a aumentar/diminuir?  
- A relação muda por grupo (ex.: turma, região, categoria)?  
- Existe outlier distorcendo a leitura?  
- A relação é linear, monotônica ou não linear?

## 5.5 Tipos de relação e quais gráficos usar

> df.plot.scatter(x="x", y="y")  df.sort_values("data").plot(x="data", y="y")
### - Numérica vs Numérica
**Objetivo:** ver tendência, forma (linear/não-linear), dispersão e outliers.

**Gráficos**
- Scatter (dispersão)
- Linha (se for série temporal)
- Heatmap de correlação (para várias numéricas)

**Comandos úteis**

```python
# Scatter rápido
df.plot.scatter(x="x", y="y")

# Se tiver tempo (x é data/ordem) e y é valor
df.sort_values("data").plot(x="data", y="y")
```

### - Categórica vs Numérica

**Objetivo:** comparar distribuição de um valor numérico entre grupos.

**Gráficos**
- Boxplot (ótimo para mediana e outliers)
- Barras com média/mediana (bom para resumo)

**Comandos úteis**

```python
# Boxplot por categoria
df.boxplot(column="y", by="categoria")

# Barras (média por grupo)
(df.groupby("categoria")["y"].mean()
   .sort_values(ascending=False)
   .plot(kind="bar", rot=45))
```

### - Categórica vs Categórica

**Objetivo:** medir associação e verificar concentração de combinações.

**Gráficos**
- Barras (contagem)
- Barras empilhadas (proporções por grupo)
```python
df["coluna_num"].quantile([0.25, 0.5, 0.75]) #seleciona valores para as colunas
```
---

#### Distribuições e outliers
Distribuição é o “formato” dos dados. Outliers são os pontos que destoam e merecem investigação.

O que observar:
- Concentração (onde está a maioria?)  
- Assimetria (a cauda é puxada para um lado?)  
- Valores impossíveis (ex.: idade = 200)

Comandos úteis (Pandas):

```python
df["coluna_num"].describe()
df["coluna_num"].quantile([0.25, 0.5, 0.75])
```

---

## 5.6 Limpeza e Transformação de Dados

### Tratamento de valores nulos
Depois de detectar os nulos, você escolhe: **remover**, **preencher** ou **manter** (com justificativa).

Estratégias comuns:
- Remover linhas (quando são poucas e não enviesam)
- Remover colunas (quando falta demais e não agrega)
- Preencher (imputar) com regra simples (média/mediana/moda)
- Criar flag de ausência (às vezes ausência é informativa)

Comandos úteis (pandas):
```python
df.dropna()                         # remove linhas com algum nulo
df.dropna(subset=["coluna"])        # remove linhas se coluna específica for nula
df.drop(columns=["coluna"])         # remove coluna

df["coluna_num"] = df["coluna_num"].fillna(df["coluna_num"].median())
df["coluna_cat"] = df["coluna_cat"].fillna("Desconhecido")

df["coluna_isnull"] = df["coluna"].isna().astype(int)
```
---

### Remoção de duplicatas
Duplicatas distorcem contagens, médias e treinamento de modelos (ex: o mesmo registro “vale por dois”).

Tipos de duplicata:
- Linha totalmente idêntica
- Duplicata por chave (ex.: mesmo `id_cliente`)
- Quase duplicata (diferenças pequenas em texto)

Comandos úteis (pandas):
df.duplicated().sum()
df[df.duplicated()].head()
df = df.drop_duplicates()

---

#### Codificação de variáveis categóricas (One Hot Encoding)
Modelos (Machine Learning) costumam preferir números. One Hot transforma categorias em colunas binárias (0/1).

Ideia:
`cor ∈ {vermelho, azul, verde}` vira:
- `cor_vermelho`, `cor_azul`, `cor_verde`

Comandos úteis (pandas):
pd.get_dummies(df, columns=["cor"], drop_first=False)

---

#### Normalização ou padronização de dados
Quando as variáveis têm escalas muito diferentes (ex.: `idade` vs `renda`), muitos métodos ficam enviesados.  
Escalonar ajuda principalmente em algoritmos baseados em distância e otimização.

**Normalização (Min-Max)**: traz valores para um intervalo (geralmente 0–1).  
**Padronização (Z-score)**: centraliza em 0 e ajusta desvio padrão para 1.

![Normalização vs Padronização](/api/materiais-assets/3-dados/5-analise-de-dados/assets/normalizacao_vs_padronizacao.png)

---

#### Criação de flags/binários indicativos  
Flags (0/1) ajudam a representar condições relevantes: ausência de dados, faixas de risco, eventos raros, fins de semana etc.  
Isso costuma melhorar análise, segmentação e pode ajudar modelos a capturar padrões.

**Exemplos comuns**
- `is_null`: marca ausência
- `is_outlier`: marca valores extremos
- `is_weekend`: marca sáb/dom
- `high_value`: marca valores acima de um limiar (ex.: percentil 95)

![Flags Binárias](/api/materiais-assets/3-dados/5-analise-de-dados/assets/flags_binarias.png)

---

#### Tratamento de outliers
Outliers podem ser:
1) erro de coleta/digitação, 
2) caso raro real, 
3) mudança de regime (ex.: pico em série temporal).  

O tratamento depende do contexto e do impacto na análise/modelo.

Estratégias comuns:

- Remover (se for erro e poucos registros)

- Cap/Winsorizar (cortar extremos para limites)

- Transformar (log para caudas longas)

- Manter e sinalizar (criar flag e analisar separadamente)

![Boxplot](/api/materiais-assets/3-dados/5-analise-de-dados/assets/boxplot_outliers_exemplo.webp)

---

### Visualização de dados
Visualizar é a forma mais rápida de:
- detectar padrões, tendências e relações,
- identificar ruído/outliers,
- validar suposições antes de aplicar métricas.

Dica prática: **gráfico primeiro, métrica depois** (reduz risco de conclusões erradas).

#### Tipos de gráfico principais
**Distribuição (1 variável numérica):** histograma / densidade
**Numérica vs numérica:** scatter
**Categórica vs numérica:** boxplot
**Categórica vs categórica:** barras / empilhado (via crosstab)
**Série temporal:** linha
**Muitas numéricas:** heatmap de correlação (matplotlib)

![Gráficos](/api/materiais-assets/3-dados/5-analise-de-dados/assets/cheatsheet_graficos.png)

```quiz
- tipo: single
  pergunta: Uma turma tem notas 2, 3, 3 e 10. Por que a mediana (3) descreve melhor o "aluno típico" do que a média (4,5)?
  opcoes:
    - texto: Porque a nota 10 puxa a média para cima, enquanto a mediana só olha a posição central
      correta: true
      explicacao: Exato, é o mesmo raciocínio do exemplo das notas — um valor extremo acaba distorcendo a média, mas não muda o "meio" real dos dados.
      explicacao_erro: O ponto é que a média soma todos os valores (incluindo o extremo) e divide pelo total, então um único valor discrepante desloca o resultado. A mediana só mostra o centro de fato.
    - texto: Porque a mediana sempre é a estatística mais confiável, independente da situação
      correta: false
      explicacao: Em distribuições sem valores extremos, média e mediana costumam contar histórias parecidas. Aqui a mediana ganha porque há um outlier específico (o 10).
    - texto: Porque a média está calculada errado nesse caso
      correta: false
      explicacao: A média está certa matematicamente (2+3+3+10)/4 = 4,5. O problema não é o cálculo, é que ela não representa bem o grupo quando existe um outlier.
    - texto: Porque com apenas 4 alunos fazer a media não funciona
      correta: false
      explicacao: O tamanho pequeno da amostra não é o motivo da diferença — é a presença do valor 10, destoante dos demais, que puxa a média.

- tipo: single
  pergunta: Você está comparando duas variáveis numéricas e já calculou a correlação entre elas. Por que ainda vale a pena olhar o gráfico de dispersão antes de confiar nesse número?
  opcoes:
    - texto: Porque o gráfico substitui a necessidade da correlação
      correta: false
      explicacao: Um não substitui o outro, eles se complementam. A ideia é visualizar para validar (ou desconfiar) do que o número está dizendo.
    - texto: Porque calcular gráficos é mais rápido do que calcular correlação no Pandas
      correta: false
      explicacao: Não é questão de velocidade de processamento — confiar só no número, sem olhar o gráfico, pode levar a uma conclusão errada.
    - texto: Porque a correlação só pode ser calculada depois que um gráfico existe
      correta: false
      explicacao: Dá para calcular correlação sem nunca ter plotado nada. A recomendação é sobre segurança da interpretação, não sobre dependência técnica
    - texto: Porque a mesma correlação pode aparecer em relações bem diferentes
      correta: true
      explicacao: Perfeito! A correlação resume tudo em um único valor, então esconde a forma real da relação, só o gráfico mostra se essa forma bate com o que o número sugere.
      explicacao_erro: O risco não é o cálculo estar errado, é que o número sozinho não mostra a forma da relação. Duas dispersões diferentes podem gerar valores de correlação


- tipo: single
  pergunta: Uma coluna `satisfacao` tem valores "ruim", "médio", "bom", "ótimo". Uma coluna `cidade` tem valores como "Recife", "Natal", "Salvador". Qual a diferença real entre elas para fins de análise?
  opcoes:
    - texto: "`satisfacao` é numérica e `cidade` é categórica"
      correta: false
      explicacao: Nenhuma das duas é numérica por natureza — ambas representam categorias (qualitativas). A diferença está em existir ordem ou não entre elas.
    - texto: "`satisfacao` tem uma ordem  entre as categorias, enquanto `cidade` não tem "
      correta: true
      explicacao: Exato. "Ruim < médio < bom < ótimo" segue uma progressão, enquanto nenhuma cidade é "maior" ou "menor" que outra.
      explicacao_erro: As duas são categóricas, então a diferença não está aí. O que muda é que dá para por uma ordem entre os valores e a outra não.
    - texto: "`cidade` deveria ter mais categorias do que `satisfacao`, e é por isso que são diferentes"
      correta: false
      explicacao: A quantidade de categorias não define o tipo e sim a existência (ou ausência) de uma ordem lógica entre os valores.
    - texto: Não há diferença relevante, ambas podem ser tratadas do mesmo jeito em qualquer análise
      correta: false
      explicacao: Há diferença, ignorar a ordem de uma variável ordinal na codificação ou na visualização joga fora alguma informação real atrapalha intensamente a analise.
```
---
## Complemente o Aprendizado
- [O que é análise de dados? (Artigo Freecodecamp)](https://www.freecodecamp.org/portuguese/news/o-que-e-analise-de-dados/)
- [Te ensino TUDO sobre criar gráficos com Python e Matplotlib (Vídeo)](https://www.youtube.com/watch?v=unEdvkCjL8U)
- [Python para análise de dados (Artigo Alura)](https://www.alura.com.br/artigos/python-para-analise-de-dados?srsltid=AfmBOop21pv15vNxi8nTQILDqGnx77l-y4c2TEzVWWmFjT1YVM32weu3)
---
## Referências

- Documentação do Pandas (User Guide): https://pandas.pydata.org/docs/user_guide/index.html
- Documentação do NumPy: https://numpy.org/doc/stable/
- Matplotlib Tutorial (Pyplot): https://matplotlib.org/stable/tutorials/introductory/pyplot.html
- Seaborn Tutorial: https://seaborn.pydata.org/tutorial.html
- Plotly Python Graphing Library: https://plotly.com/python/
- Project Jupyter (Docs): https://docs.jupyter.org/
- Tutorial “Python Pandas para iniciantes” (DataCamp, PT): https://www.datacamp.com/pt (procure por “Pandas para iniciantes”)
- Medium – “Como usar cada tipo de gráfico no contexto certo” (Gabriel R. F. Lopes, 2021): https://medium.com/ (procure pelo título do artigo)
- Medium – “10 boas práticas em visualização de dados” (Giuliana de Jong, 2022): https://medium.com/ (procure pelo título do artigo)
- Livro “Python para Análise de Dados” – Wes McKinney (3ª Edição, Novatec, 2023): https://novatec.com.br/livros/python-para-analise-de-dados-3ed/
