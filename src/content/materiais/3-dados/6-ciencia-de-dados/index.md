---
title: 6. Ciência de Dados
subtitle: Conceitos, tipos de aprendizado e pipeline de um projeto de dados.
description: Aprenda os fundamentos de Machine Learning, os tipos de aprendizado (supervisionado, não supervisionado e por reforço) e o pipeline geral de um projeto de dados.
category: Dados
order: 6
---

## Sumário

- [6.1. Introdução a Machine Learning](#61-introducao-a-machine-learning)
- [6.2. Tipos de Aprendizado](#62-tipos-de-aprendizado)
- [6.3. Pipeline Geral de Machine Learning](#63-pipeline-geral-de-machine-learning)
- [6.4. Fundamentos Matemáticos do Aprendizado Supervisionado](#64-fundamentos-matematicos-do-aprendizado-supervisionado)
- [6.5. Regressão Linear](#65-regressao-linear)
- [6.6. Classificação](#66-classificacao-prever-classe-nao-numero)
- [6.7. Tipos de Problemas Supervisionados](#67-tipos-de-problemas-supervisionados--essencial)
- [6.8. Outros Modelos Supervisionados Clássicos](#68-outros-modelos-supervisionados-classicos)
- [6.9. Critérios de Avaliação](#69-criterios-de-avaliacao)
- [6.10. Overfitting, Underfitting e Estratégias de Mitigação](#610-overfitting-underfitting-e-estrategias-de-mitigacao)
- [Complemente o Aprendizado](#complemente-o-aprendizado)
- [Teste seu Conhecimento](#exercicios)
- [Referências](#referencias)

# 6.1. Introdução a Machine Learning

## Definição geral 

Machine Learning (ML) é ensinar o computador por exemplos. Em vez de escrever uma lista de regras para cada situação, mostramos muitos casos do passado e o sistema aprende os padrões para tomar boas decisões no futuro. É parecido com a forma como nós aprendemos: depois de ver vários exemplos, passamos a reconhecer situações novas sem precisar decorar todas as regras. O objetivo do ML é **aprender com experiências anteriores e usar esse aprendizado para acertar em situações que ainda não viu**. 

Um exemplo do dia a dia: serviços de aluguel estimam o preço de um imóvel a partir de imóveis parecidos na região; com o tempo, melhoram a estimativa porque “percebem” o que mais influencia o preço.

Vale ressaltar que Machine Learning é um **subconjunto** da Inteligência Artificial, o segmento da ciência da computação que se concentra na criação de sistemas computacionais que pensam da maneira que os humanos pensam. Em outras palavras, todos os sistemas de aprendizado de máquinas são sistemas de IA, mas nem todos os sistemas de IA possuem capacidades de aprendizado de máquina.

![Ciclo de Machine Learning](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/diagrama_IA_ML.png)

## Relação entre estatística, computação e dados

Em ML, cada parte tem um papel claro e complementar. Os **dados** são as informações coletadas do mundo real e servem como base para o treinamento do modelo. A **estatística** define como essas informações são usadas e avaliadas: ela orienta a divisão entre dados de treino e teste e estabelece métricas, que são medidas numéricas usadas para avaliar o desempenho do modelo, comparando as previsões com os valores reais. A **computação** fornece as ferramentas técnicas necessárias para executar esse processo. Ela permite armazenar os dados, rodar os algoritmos estatísticos, treinar os modelos de forma eficiente e gerar previsões que possam ser usadas em sistemas reais.

Na prática, o trabalho acontece como um ciclo: coletar e preparar dados → treinar um modelo → avaliar em dados que ele nunca viu → colocar para rodar → acompanhar o desempenho e ajustar conforme o uso.

![Ciclo de Machine Learning](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/80329Roadmap.png)


## Principais aplicações 
  
- Sistemas de recomendação, usados por plataformas como Netflix, Amazon e Spotify, combinam histórico de interação do usuário com dados de perfis semelhantes para estimar a probabilidade de interesse em filmes, produtos ou músicas. As recomendações são atualizadas continuamente conforme novas interações ocorrem.

- Detecção de anomalias em controle de qualidade é aplicada em indústrias, como montadoras e fabricantes de alimentos, que utilizam visão computacional para identificar defeitos sutis. Os modelos aprendem padrões de itens fora de especificação a partir de dados históricos.

- Bots de atendimento ao cliente utilizam modelos de linguagem e classificação de intenção para identificar o tema da solicitação, consultar bases de conhecimento e resolver demandas simples. Casos mais complexos são encaminhados a atendentes humanos especializados.

- Manutenção preditiva aplica modelos treinados com dados de sensores, como vibração, temperatura e ruído, para estimar a probabilidade de falha de equipamentos. Isso possibilita planejar intervenções antes de que ocorram quebras, reduzindo custos operacionais.

- Veículos autônomos e sistemas avançados de assistência à condução combinam modelos de percepção, previsão e planejamento. Esses modelos processam dados de câmeras, radares e sensores para entender o ambiente, antecipar movimentos e tomar decisões de navegação.

- Robótica aplicada à logística e ao uso doméstico utiliza ML para navegação, mapeamento e manipulação de objetos. Os sistemas ajustam rotas, evitam obstáculos e melhoram o desempenho com base na experiência acumulada durante a operação.

# 6.2. Tipos de Aprendizado

![Taxonomia de Machine Learning](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/taxonomia_ml.png)

Machine Learning pode ser classificado de acordo com os diferentes tipos de aprendizado. A divisão principal é feita com base em **como o algoritmo recebe feedback durante o processo de aprendizado**. É como se estivéssemos organizando diferentes métodos de ensino: alguns precisam de um professor que corrija cada exercício, outros aprendem sozinhos observando padrões, e aqueles que aprendem tentando e recebendo recompensas ou punições.

## Aprendizado supervisionado

No aprendizado supervisionado, O algoritmo recebe dados de entrada (as características) junto com as respostas esperadas (os rótulos ou valores corretos) e aprende a mapear uma relação entre eles. 

Imagine que você está aprendendo a identificar animais: para cada foto, alguém já te diz "este é um gato" ou "este é um cachorro".  É como ter um livro de exercícios com as respostas no final, você pode verificar se acertou e ajustar sua compreensão. Este tipo de aprendizado é usado quando você tem dados históricos com resultados conhecidos e quer que o modelo aprenda a prever esses resultados para casos novos.

## Aprendizado não supervisionado

No aprendizado não supervisionado, o algoritmo recebe apenas os dados brutos e precisa descobrir padrões, estruturas ou agrupamentos por conta própria. É como olhar para um conjunto de objetos e perceber que alguns são parecidos entre si, mesmo sem saber seus nomes.

O algoritmo identifica similaridades, diferenças e organizações naturais nos dados sem nenhuma orientação externa. Este tipo de aprendizado é especialmente útil quando você não sabe o que está procurando nos dados, mas suspeita que existem padrões ou grupos ocultos que podem ser revelados.

## Aprendizado por reforço

O aprendizado por reforço funciona de forma diferente: o algoritmo aprende através de tentativa e erro, recebendo feedback na forma de recompensas ou penalidades. É similar a como uma criança aprende a andar: ela tenta, cai (recebe um feedback negativo), tenta de novo com uma abordagem ligeiramente diferente, e quando consegue manter o equilíbrio (recebe um feedback positivo), aprende qual movimento funcionou melhor. 

O algoritmo interage com um ambiente, toma ações e recebe sinais de quão boas ou ruins foram essas ações, ajustando seu comportamento para maximizar as recompensas ao longo do tempo. Este tipo de aprendizado é ideal para problemas que envolvem tomar decisões sequenciais em um ambiente dinâmico, como jogos, robótica ou sistemas de recomendação que precisam se adaptar continuamente.

## Deep Learning

O Deep Learning não é exatamente uma categoria separada, mas sim uma abordagem técnica que pode ser aplicada tanto em aprendizado supervisionado quanto não supervisionado ou por reforço. O Deep Learning usa redes neurais com muitas camadas (daí o nome "deep", profundo) para aprender representações complexas dos dados. 

É como ter um sistema de aprendizado em camadas: a primeira camada aprende características básicas, a segunda combina essas características em padrões mais complexos, e assim por diante, até que a última camada possa fazer previsões ou classificações sofisticadas. Esta abordagem é especialmente poderosa quando você precisa de modelos que capturem relações muito complexas e não lineares, como reconhecimento de imagens, processamento de linguagem natural ou sistemas de recomendação avançados.

# 6.3. Pipeline Geral de Machine Learning

![Pipeline geral de Machine Learning](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/word-image-43.png)

Um projeto de Machine Learning segue uma sequência lógica de etapas que são necessárias para obter um resultado de qualidade. Este fluxo de trabalho é chamado de pipeline e representa o caminho desde a concepção do problema até um modelo funcionando e pronto para uso.

## Definição do problema e objetivo preditivo

Antes de começar a trabalhar com dados ou algoritmos, é fundamental entender claramente o que você está tentando resolver, sem uma definição precisa do problema, você pode acabar construindo um modelo que responde à pergunta errada. 

Imagine que você quer prever se um cliente vai cancelar sua assinatura. O objetivo preditivo não é apenas "prever cancelamentos", mas sim algo mais específico: "prever, com base no comportamento dos últimos 30 dias, quais clientes têm maior probabilidade de cancelar nos próximos 15 dias". Esta clareza define não apenas o que o modelo fará, mas também quais dados você precisa coletar, como medir o sucesso e qual tipo de algoritmo será mais apropriado.

## Coleta e estruturação dos dados 

Com o problema bem definido, chegamos à etapa de coletar e organizar os dados. A coleta envolve buscar dados de diferentes fontes: bancos de dados, APIs, arquivos CSV, planilhas, e garantir que você tenha informações suficientes e relevantes para o problema. 

A estruturação significa organizar esses dados de forma que possam ser processados: criar tabelas consistentes, definir formatos de datas, padronizar nomes de colunas, fazer uma boa EDA, etc. É importante verificar se os dados realmente contêm a informação necessária para responder à sua pergunta. Dados incompletos ou irrelevantes comprometem todo o resto do projeto.

## Limpeza e pré-processamento

Os dados do mundo real raramente chegam prontos para uso. Eles vêm com problemas: valores faltantes, inconsistências, formatos diferentes, escalas muito distintas. Esta etapa transforma dados brutos e bagunçados em um conjunto limpo e organizado que os algoritmos conseguem processar.

### Tratamento de dados faltantes

Tratar dados faltantes é uma etapa importante e que gera muitas duvidas. Você pode remover as linhas que têm muitos valores faltantes, pode preencher os valores faltantes com a média ou mediana (para números) ou com a moda (para categorias), ou pode usar técnicas mais sofisticadas que estimam o valor faltante com base em outros dados. 

A escolha depende do contexto, pois se você tem poucos dados, remover pode não ser uma boa ideia; se os dados faltantes são aleatórios, preencher pode funcionar bem; mas se os dados faltantes indicam algo importante (como "não respondeu porque não tem essa informação"), você precisa tratar isso de forma especial.

### Normalização e padronização 

Imagine que você está comparando a altura de pessoas (em metros, valores entre 1,5 e 2,0) com seus salários (em reais, valores entre 2000 e 20000). A diferença de escala faz com que o algoritmo dê muito mais importância ao salário simplesmente porque os números são maiores. Normalização e padronização resolvem isso colocando todas as variáveis numa escala similar. 

A padronização transforma os dados para ter média zero e desvio padrão um, enquanto a normalização coloca tudo entre 0 e 1. Isso garante que todas as características tenham peso similar no aprendizado do modelo, permitindo que o algoritmo aprenda de forma mais equilibrada.

### Codificação de variáveis categóricas 

Algoritmos de Machine Learning trabalham com números, mas muitos dados importantes são categóricos: cores (vermelho, azul, verde), cidades (São Paulo, Rio, Belo Horizonte), níveis de educação (ensino médio, superior, pós-graduação). A codificação transforma essas categorias em números que o algoritmo consegue processar.

A forma mais simples é criar colunas binárias **(one-hot encoding)**: se você tem três cores, cria três colunas (é_vermelho, é_azul, é_verde) e marca 1 na cor correspondente e 0 nas outras. Outras técnicas incluem **label encoding** (atribuir números sequenciais) ou **embeddings** (representações numéricas mais sofisticadas). A escolha depende do tipo de categoria e do algoritmo que você vai usar.

## Seleção de modelos

Com os dados limpos e processados, você precisa escolher qual algoritmo usar. Diferentes algoritmos têm diferentes pontos fortes: árvores de decisão são fáceis de interpretar, redes neurais capturam relações complexas, regressão linear é rápida e eficiente para relações lineares. A seleção envolve considerar o tipo de problema (classificação ou regressão), o tamanho dos dados, a necessidade de interpretabilidade e o tempo disponível. Muitas vezes, você testa vários modelos e compara seus desempenhos para escolher o melhor.

## Treinamento e validação

O treinamento é quando o algoritmo realmente aprende: você mostra os dados para ele e ele ajusta seus parâmetros internos para fazer as melhores previsões possíveis. Mas como saber se ele realmente aprendeu ou apenas decorou os exemplos? É aí que entra a validação: você separa parte dos dados (que o modelo nunca viu durante o treinamento) e usa para testar se o modelo generaliza bem para casos novos. A validação garante que o modelo não apenas memorizou os dados de treino, mas realmente aprendeu padrões que funcionam em situações novas.

# 6.4. Fundamentos Matemáticos do Aprendizado Supervisionado

## Definição formal 
Como já explicado, No aprendizado supervisionado, é apresentado a máquina alguns exemplos do que deve ser aprendido, que consiste basicamente em pares de entrada e saída. No aprendizado supervisionado, lidamos com varias amostras e dados que são descritas em variáveis como features e targets. Os dados são comumente representando em tabelas, onde existe uma linha para cada dado e uma coluna para cada feature.
Se a variável target for categórica ([spam, não spam],[1, 0],[ligado, desligado]) podemos definir esta atividade como classificação. Alternativamente, se a variável target for uma continua, por exemplo, preço de um carro, esta é uma atividade de regressão.

Abaixo temos o dataset Iris, onde cada coluna representa uma medida diferente em uma parte especifica da flor. O objetivo do aprendizado supervisionado é construir um modelo que seja capaz de predizer a variável definida como target.

![dataset](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/predictor_target.webp)

Features = predictor variabels = variável independente

Target variable = response variable = variável dependente.

## Estrutura matemática  
Nesta seção, a ideia é dar um “mapa” matemático mínimo do aprendizado supervisionado. Não precisa decorar todas as fórmulas, mas é importante saber o que cada símbolo significa.

Vamos entender o que é um **modelo** de forma objetiva, entender o que significa **treinar** um modelo (o que realmente está sendo minimizado) e como escolher uma **métrica/loss** que faça sentido para o problema.

No supervisionado, podemos representar o conjunto de treino como uma coleção de exemplos:

$$
\mathcal{D} = \{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(n)}, y^{(n)})\}
$$

- $\mathcal{D}$ é o conjunto completo de dados de treino (todas as 100 flores, por exemplo)
- $n$ é a quantidade de amostras (linhas)
- $x^{(i)}$ é o vetor de features da amostra $i$, por exemplo, $x^{(1)} = [5.1, 3.5, 1.4, 0.2]$ (as 4 medidas da primeira flor)
- $y^{(i)}$ é o target (rótulo/valor) da amostra $i$, por exemplo, $y^{(1)} = \text{"setosa"}$ ou $y^{(1)} = 0$ (se codificarmos setosa como 0)

**Representação em tabela vs. matemática:**

Também é comum escrever as features como uma matriz $X$ e os targets como um vetor $y$:

- $X \in \mathbb{R}^{n \times d}$: uma tabela com $n$ linhas (amostras) e $d$ colunas (features). No Iris: 100 linhas × 4 colunas
- $y$: um vetor com $n$ valores (o target de cada amostra). No Iris: 100 valores (uma espécie para cada flor)

**O que é um modelo?**

O modelo é uma função parametrizada, uma "receita" que transforma entrada em saída:

$$
\hat{y} = f(x; \theta)
$$

- $\hat{y}$ = a **previsão** do modelo (o que ele acha que é a resposta)
- $x$ = as **features** (entrada)
- $f$ = a **função** do modelo (a "receita")
- $\theta$ (theta) = os **parâmetros** aprendidos (os "ajustes" que o modelo faz durante o treino)

Em uma regressão linear simples, $\theta$ pode ser apenas dois números: um peso $w$ e um viés $b$. O modelo seria: $\hat{y} = w \cdot x + b$. Durante o treino, o algoritmo encontra os melhores valores de $w$ e $b$ que fazem o modelo errar menos. Em uma rede neural, $\theta$ pode ter milhares ou milhões de pesos, mas a ideia é a mesma, ajustar esses números para minimizar o erro.

## Espaço de entradas e saídas
Para deixar claro “que tipo de coisa entra e sai do modelo”, usamos a ideia de espaços:

- **Espaço de entrada** $\mathcal{X}$: conjunto de todas as entradas possíveis (todas as combinações de features)
- **Espaço de saída** $\mathcal{Y}$: conjunto de todas as saídas possíveis (targets)

Exemplos comuns:

- **Regressão (número contínuo)**:  
  - $\mathcal{X} \subseteq \mathbb{R}^d$ (um vetor de d features numéricas)  
  - $\mathcal{Y} \subseteq \mathbb{R}$ (um número: preço, demanda, nota, etc.)
- **Classificação binária (duas classes)**:  
  - $\mathcal{Y} = \{0, 1\}$ (por exemplo: spam/não spam)  
  - muitas vezes o modelo também produz uma probabilidade $p \in [0,1]$ e depois você escolhe um limiar (ex.: classificar como 1 se $p \ge 0.5$)
- **Classificação multiclasse (K classes)**:  
  - $\mathcal{Y} = \{1,2,\dots,K\}$ (por exemplo: setosa, versicolor, virginica)  
  - ou a saída pode ser um vetor de probabilidades $(p_1, p_2, \dots, p_K)$ somando 1

No Iris, por exemplo, cada flor vira um $x^{(i)}$ com medidas (features) e o $y^{(i)}$ é a espécie (target). O modelo aprende uma regra que separa as classes a partir dessas medidas.

## Funções de perda  
Até aqui, a gente já tem as peças principais:

- os dados \((x^{(i)}, y^{(i)})\)
- um modelo \(f(x;\theta)\) que gera uma previsão $\hat{y}$

Agora falta responder a pergunta mais importante do treinamento:

> **Como escolher $\theta$** para que o modelo faça boas previsões?

Para “escolher” $\theta$, o algoritmo precisa de um critério numérico que diga, para cada exemplo, **o quão ruim foi a previsão**. Esse critério é a **função de perda** (loss).

Em outras palavras: a loss define o que significa “errar” naquele problema e transforma isso em um número.

Uma loss é uma função $L(y, \hat{y})$. O treinamento tenta escolher $\theta$ para minimizar o erro médio nos dados:

$$
\min_{\theta} \frac{1}{n}\sum_{i=1}^{n} L\left(y^{(i)}, f(x^{(i)};\theta)\right)
$$

Intuição: o algoritmo ajusta $\theta$ para **diminuir** essa média. É por isso que dizemos que treinar um modelo é um problema de **otimização**.

**Exemplos de loss (para fixar a ideia):**

- **Regressão (número contínuo)**:  
  - MSE/RMSE: penaliza mais erros grandes (um erro de 10 pesa bem mais que dois erros de 5)
- **Classificação (classes)**:  
  - cross-entropy (log loss): penaliza quando o modelo está “muito confiante” e mesmo assim erra

Normalmente essa minimização é feita com métodos numéricos como o **gradient descent** (descida do gradiente), que tenta dar pequenos passos na direção que reduz a loss.

![gradient descent](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/descent.jpg)

Por isso a loss é tão importante: ela é literalmente o “alvo” do treinamento.  
(Mais adiante, em **6.9**, a gente fala das **métricas de avaliação**: elas são usadas para reportar desempenho no teste/validação e nem sempre são iguais à loss usada no treino.)

# 6.5. Regressão Linear

Agora vamos transformar essas ideias em um exemplo que dá para visualizar. Vamos usar o seguinte exemplo:

> Você quer prever o **preço** de um imóvel com base em algumas features, como **área (m²)** e **número de quartos**.

Nesse caso, o target é um número contínuo, então faremos uma **regressão**.

Cada imóvel vira um vetor $x$ e o modelo devolve uma previsão $\hat{y}$ de preço.

Na regressão linear, escolhemos $f$ como uma combinação linear:

$$
\hat{y} = f(x;\theta) = w^\top x + b
$$

onde $\theta = \{w, b\}$. Se tivéssemos duas features $x = [x_1, x_2]$, fica:

$$
\hat{y} = w_1 x_1 + w_2 x_2 + b
$$


Assim, na regressão, vamos encontrar os valores de $w_1, w_2, \dots, b$ que fazem as previsões ficarem o mais próximas possível dos valores reais.

## Como a regressão linear “aprende” (loss e otimização)

Para medir quão ruim está a previsão, usamos uma loss típica de regressão, como o **erro quadrático médio (MSE)**:

$$
L(y,\hat{y}) = (y - \hat{y})^2
$$

![MSE gráfico](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/mse.avif)

No dataset inteiro, treinamos minimizando a média:

$$
\min_{\theta} \frac{1}{n}\sum_{i=1}^{n}\left(y^{(i)} - f(x^{(i)};\theta)\right)^2
$$

OBS:
- Se $\hat{y}$ fica longe de \(y\), o termo \((y-\hat{y})^2\) cresce bastante.
- O algoritmo procura $\theta$ que “puxe” as previsões para mais perto dos valores reais.

O **gradient descent** entra como o método prático para ajustar $\theta$ aos poucos, sempre tentando reduzir essa média.

## Como interpretar os pesos $w$ (o que o modelo “descobriu”)

Uma vantagem da regressão linear é que os pesos podem ser interpretados (com cuidado):

**Exemplo numérico:**

Imagine que, após o treinamento, o modelo encontrou:

$$
\hat{y} = 500 \cdot x_1 + 30000 \cdot x_2 + 100000
$$

onde:
- $x_1$ = área em m²
- $x_2$ = número de quartos
- $\hat{y}$ = preço previsto em reais

**O que cada peso significa?**

- **$w_1 = 500$**: cada metro quadrado adicional adiciona, em média, R$ 500 ao preço previsto (mantendo o número de quartos fixo).
- **$w_2 = 30000$**: cada quarto adicional adiciona, em média, R$ 30.000 ao preço previsto (mantendo a área fixa).
- **$b = 100000$**: é o "preço base" quando área e quartos são zero (pode não ter interpretação prática direta, mas é necessário matematicamente).

**Por que "mantendo fixo"?**

Em regressão linear, cada peso funciona como um **efeito marginal**: ele diz quanto a previsão muda quando você altera *uma* feature e segura as outras constantes. Isso é o “mantendo fixo”.

Aqui, se você aumentar a área em \(\Delta x_1 = 10\) m² e não mudar o número de quartos, a previsão aumenta em:

$$
\Delta \hat{y} = w_1 \cdot \Delta x_1 = 500 \cdot 10 = 5000
$$

Ou seja: **+10 m² → +R$ 5.000** (na previsão), porque a única coisa que mudou foi a área.

## O que pode dar errado (e como isso se manifesta)

Essa leitura dos pesos pode ficar confusa (ou enganosa) quando a relação real não é bem aproximada por uma linha reta (não linearidade), quando há pontos muito fora do padrão (outliers “puxando” o ajuste) e quando duas features carregam quase a mesma informação (colinearidade, como “área” e “área construída”). Além disso, alguns algoritmos são sensíveis à escala das features, então padronização/normalização pode ser necessária.


# 6.6. Classificação (prever classe, não número)

Agora considere um problema diferente:

> Você quer prever se um e-mail é **spam (1)** ou **não spam (0)** a partir de features (número de links, presença de certas palavras, remetente, etc.).

Aqui o target não é um número contínuo “de verdade” (como preço). Ele é uma **classe**. Isso muda duas coisas:

- a **saída desejada** do modelo (classe/probabilidade)
- a **loss** usada para treinar

Em muitos modelos de classificação binária, a ideia é produzir uma **probabilidade**:

$$
p = P(y=1 \mid x)
$$

Depois, transformamos isso em uma decisão por um **limiar**:

- se \(p \ge 0.5\), prevê “spam”
- se \(p < 0.5\), prevê “não spam”

E por que isso é útil? Porque o limiar pode mudar conforme o custo do erro:

- Se é “caro” marcar e-mail normal como spam (falso positivo), você pode exigir \(p \ge 0.9\).
- Se é “caro” deixar spam passar (falso negativo), você pode baixar o limiar.

> O que o modelo está aprendendo de fato? (fronteira de decisão)

Em termos geométricos, classificação significa aprender uma regra que separa o espaço de features em regiões:

- região onde o modelo prevê classe 0
- região onde o modelo prevê classe 1

Essa separação é chamada de **fronteira de decisão**.

> Loss em classificação: por que não usar MSE?

Você até poderia tentar usar MSE com rótulos 0/1, mas isso costuma ser uma escolha ruim porque:

- o que você quer não é “aproximar um número”, e sim “acertar a classe com confiança bem calibrada”
- MSE não penaliza de forma apropriada o caso clássico: **o modelo estar muito confiante e errar**

Por isso, a loss mais comum é a **cross-entropy (log loss)**.

Uma forma intuitiva de ler a cross-entropy na binária é:

- se o exemplo é positivo (\(y=1\)), queremos \(p\) perto de 1
- se o exemplo é negativo (\(y=0\)), queremos \(p\) perto de 0

Quando o modelo dá \(p\) alto e erra (ou \(p\) baixo e erra), ele é penalizado fortemente. Isso “empurra” o treinamento a produzir probabilidades coerentes.

![Classificação gráfico](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/classify_example.png)

# 6.7. Tipos de problemas supervisionados — **Essencial**

> Como reconhecer o tipo de problema e o que isso muda no treinamento e na avaliação?

O ponto central é o target $y$:

- Se $y$ é uma **classe**, você está em **classificação** (a saída normalmente é probabilidade + decisão por limiar).
- Se $y$ é um **número**, você está em **regressão** (a saída é um valor contínuo).

Na prática, isso determina três escolhas que sempre andam juntas: **saída do modelo**, **função de perda** e **métrica de avaliação**.

| Tipo | Target $y$ | Saída típica do modelo | Loss comum no treino | Avaliação típica |
|---|---|---|---|---|
| Classificação binária | $\{0,1\}$ | probabilidade $p$ e classe | cross-entropy | acurácia / precisão / recall / F1 / ROC-AUC |
| Classificação multiclasse | $\{1,\dots,K\}$ | vetor de probabilidades | cross-entropy | acurácia, F1 (macro/micro), etc. |
| Regressão | $\mathbb{R}$ | número $\hat{y}$ | MSE/RMSE ou MAE | RMSE, MAE, $R^2$ |



# 6.8. Outros Modelos supervisionados clássicos

## Regressão logística

![Regressão logistica gráfico](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/log_reg8.png)

Apesar do nome, é um modelo de **classificação**. O que ele faz é: transforma um score linear em probabilidade e treina com cross-entropy.

$$
p(y=1 \mid x) = \sigma(w^\top x + b)
$$

Ela é um excelente baseline quando a fronteira de decisão é aproximadamente linear (ou quando você quer um modelo simples, estável e fácil de explicar).

## Árvores de decisão

![Arvore de decisao grafico](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/Decision-Tree-Diagram-Example-MindManager-Blog.png)

Uma árvore de decisão aprende uma sequência de perguntas do tipo **“se… então…”** para chegar a uma resposta. Na prática, ela vai dividindo os dados em grupos cada vez mais parecidos, tentando deixar cada grupo “mais puro” (com exemplos parecidos e, idealmente, com a mesma classe/valores próximos).

O ponto forte das árvores é que elas capturam, quase automaticamente, **não linearidades** e **interações**. Por exemplo: “se o bairro é X, área importa muito; se o bairro é Y, área importa menos”, esse tipo de regra seria difícil de representar com um único modelo linear.

O principal risco é o modelo virar um “decorador”. Se você deixar a árvore crescer demais, ela pode memorizar o treino e piorar fora dele. Por isso, quase sempre você controla a complexidade limitando profundidade e exigindo um número mínimo de exemplos por folha.

## Random Forest

![random forest grafico](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/random_forest.png)

Random Forest é uma “equipe” de árvores. Em vez de confiar em uma única árvore (que pode mudar bastante com pequenas mudanças nos dados), o modelo treina várias árvores com pequenas variações de dados/features e depois combina as respostas (votação na classificação, média na regressão).

O efeito disso é bem intuitivo: cada árvore comete erros diferentes; ao combinar, o modelo tende a ficar **mais estável** e generalizar melhor. Em dados tabulares, Random Forest costuma ser um ótimo passo quando modelos lineares ficam simples demais, mas você ainda quer algo robusto e fácil de usar.

O cuidado aqui é custo e interpretabilidade: com muitas árvores, o modelo pode ficar pesado e menos explicável do que uma árvore única (embora ainda seja possível olhar importância de features).

## Gradient Boosting (XGBoost, LightGBM, CatBoost)

Gradient Boosting também usa várias árvores, mas a lógica é diferente do Random Forest. Aqui, as árvores são treinadas **em sequência**: cada árvore nova tenta consertar o que o conjunto anterior ainda está errando. É como se o modelo fosse “lapidando” o resultado aos poucos.

Em dados tabulares, boosting frequentemente entrega desempenho excelente (por isso XGBoost/LightGBM/CatBoost são tão populares). O custo é que ele é mais sensível a ajustes: se você exagera na complexidade (árvores profundas, muitas árvores, taxa de aprendizado alta), ele pode overfitar. Na prática, esses modelos exigem mais validação e tuning do que Random Forest.

## Support Vector Machines

SVM é um modelo clássico, muito usado em classificação. A ideia central é encontrar uma fronteira que separa as classes com a **maior margem possível** (uma separação “com folga”). Essa folga tende a ajudar a generalizar melhor.

Quando os dados não são separáveis por uma linha/hiperplano, o SVM pode usar **kernels** (como o RBF) para criar separações não lineares. O cuidado é que SVM geralmente precisa de features bem escaladas (padronização ajuda muito) e pode ficar caro em datasets grandes.

## Redes neurais artificiais

![](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/rede_neural.jpg)
Redes neurais são uma família de modelos composta por camadas que vão transformando as features em representações cada vez mais úteis para o objetivo final. Elas são muito flexíveis pois conseguem aprender relações bem complexas sem que você precise “inventar regras”.

Elas tendem a brilhar quando existe muito dado e padrões ricos (imagens, texto, áudio). Em dados tabulares pequenos, no entanto, redes neurais nem sempre ganham de boosting/Random Forest e podem overfitar com facilidade se não houver regularização e um bom procedimento de validação.

# 6.9. Critérios de avaliação 

Quando treinamos um modelo, ele “aprende” olhando para o conjunto de treino. O problema é que um modelo pode ir muito bem no treino e ainda assim ir mal no mundo real. Por isso, avaliar em Machine Learning é checar **generalização**: como o modelo se comporta em dados que ele **não viu**.

Uma forma simples (e correta) de pensar é:

- **Treino**: onde o modelo aprende.
- **Validação**: onde você escolhe modelo/hiperparâmetros e toma decisões (por exemplo, qual limiar usar na classificação).
- **Teste**: a “prova final”, usada uma vez no fim para medir o resultado com mais honestidade.



## Classificação: acurácia, precisão, recall, F1, ROC-AUC

Em classificação binária, toda avaliação começa entendendo **quais erros** o modelo comete. A “matriz de confusão” é só um jeito de organizar isso:

- quando o modelo marca alguém como positivo e erra, ele comete um **falso positivo**
- quando o modelo deixa passar um positivo real, ele comete um **falso negativo**

As métricas mais comuns existem para responder perguntas diferentes:

- **Acurácia**: “no total, quantos eu acertei?”. Funciona bem quando as classes são bem balanceadas e os dois erros têm custo parecido.
- **Precisão**: “quando eu digo que é positivo, eu estou certo com que frequência?”. Importa quando falso positivo é caro (ex.: bloquear um cliente correto).
- **Recall (sensibilidade)**: “dos positivos reais, quantos eu encontrei?”. Importa quando falso negativo é caro (ex.: deixar fraude passar).
- **F1**: um equilíbrio entre precisão e recall (útil quando você quer balancear os dois e a classe positiva é rara).
- **ROC-AUC**: mede quão bem o modelo separa as classes olhando vários limiares, usando as probabilidades (é útil quando você ainda está decidindo o limiar).

Um jeito bem didático de escolher a métrica é perguntar: **“qual erro dói mais no meu problema?”**. Se você responder isso, a métrica certa costuma ficar óbvia.


## Regressão: RMSE, MAE, R²

Em regressão, você quer que o número previsto chegue o mais perto possível do real. Então a pergunta vira: **qual é o “tamanho do erro” que eu considero aceitável?**

As métricas mais usadas são:

- **MAE**: erro médio em “unidades do target”. Ex.: se o target é preço, MAE = 12.000 significa “em média erro 12 mil reais”. É mais “justo” com erros grandes (não pune tanto outliers).
- **RMSE**: também está na unidade do target, mas pune mais os erros grandes. É uma boa escolha quando errar muito é muito pior do que errar pouco.
- **R²**: compara o seu modelo com um baseline simples (sempre prever a média). Ajuda a entender se o modelo realmente aprendeu algo útil, mas não substitui MAE/RMSE quando você precisa de interpretação em unidades reais.


# 6.10. Overfitting, Underfitting e Estratégias de Mitigação

Quando um modelo erra, muitas vezes o motivo não é “o algoritmo é ruim”, e sim um desbalanceamento entre **complexidade do modelo** e **qualidade/quantidade de dados**. Os dois casos clássicos são overfitting e underfitting.

## Overfitting

Overfitting é quando o modelo aprende o que deveria (padrões reais), mas também aprende o que não deveria (ruído, coincidências e “macetes” do treino). O sintoma típico é: **treino muito bom, validação/teste pior**.


## Underfitting

Underfitting é quando o modelo é simples demais (ou está mal configurado) e não consegue aprender nem o básico. O sintoma típico é: **ruim no treino e ruim no teste**.

Isso aparece, por exemplo, quando você tenta resolver um problema claramente não linear com um modelo linear sem criar features adequadas, ou quando o modelo está “travado” (regularização forte demais, poucas iterações, etc.).

![Overfitting x Underfitting](/api/materiais-assets/3-dados/6-ciencia-de-dados/assets/underfitted-overfitted.png)

## Estratégias de mitigação

Mitigar overfitting/underfitting é, na prática, ajustar três coisas: capacidade do modelo, qualidade/quantidade de dados e procedimento de validação.


## Validação cruzada

Validação cruzada repete treino/validação em várias divisões dos dados e dá uma estimativa mais estável de desempenho (especialmente quando o dataset é pequeno). Ela também ajuda a escolher hiperparâmetros sem “viciar” uma única divisão.

## Aumento de dados (data augmentation) 

Em problemas como imagens, augmentation cria variações realistas (rotação leve, recorte, brilho) para o modelo ver mais diversidade e memorizar menos.

A intuição é: se o modelo só vê a mesma imagem sempre no mesmo ângulo/iluminação, ele pode “decorar” detalhes. Ao ver versões levemente diferentes, ele é forçado a aprender o que realmente importa (o padrão).


## Seleção de features 

Selecionar features é reduzir o conjunto de variáveis para ficar com as que realmente ajudam. Isso pode:

- reduzir ruído (menor chance de overfitting)
- melhorar interpretabilidade
- acelerar treino e predição

O cuidado mais importante é, de novo, vazamento: se você seleciona features olhando o dataset inteiro antes de separar treino/teste, você pode “vazar” informação do teste para o treino. O jeito correto é selecionar features dentro do pipeline de treino/validação.

# Complemente o Aprendizado

Para aprofundar seus conhecimentos sobre Ciências de Dados, confira os seguintes recursos:

 [nome](link)

---

```quiz
- tipo: single
  pergunta: Uma empresa quer prever se um cliente vai cancelar a assinatura (sim ou não) usando dados históricos de comportamento com resultado já conhecido. Que tipo de aprendizado é mais adequado?
  opcoes:
    - texto: Aprendizado não supervisionado, pois o algoritmo vai agrupar clientes parecidos
      correta: false
      explicacao: Não supervisionado é usado quando não há rótulos conhecidos. Aqui já sabemos quais clientes cancelaram no passado, ou seja, existe um rótulo (target) disponível para o treino.
    - texto: Aprendizado supervisionado, pois existem dados históricos com o resultado (cancelou ou não) já conhecido
      correta: true
      explicacao: Exato! Quando temos exemplos passados com a resposta correta (cancelou/não cancelou), o algoritmo aprende a mapear entradas para essa saída conhecida — a definição central do aprendizado supervisionado.
      explicacao_erro: Lembre-se que a diferença entre os tipos de aprendizado está em como o algoritmo recebe feedback. Quando já existem exemplos rotulados (a resposta certa para casos passados), o problema é supervisionado.
    - texto: Aprendizado por reforço, pois o modelo vai aprender por tentativa e erro
      correta: false
      explicacao: Reforço é usado quando o algoritmo toma ações num ambiente e recebe recompensas/punições ao longo do tempo, não quando já existe uma base de dados histórica rotulada.
    - texto: Deep Learning, pois é sempre a melhor opção para prever comportamento de clientes
      correta: false
      explicacao: Deep Learning é uma abordagem técnica (redes neurais em camadas), não uma categoria de aprendizado. Para dados tabulares como este, modelos mais simples costumam funcionar tão bem ou melhor.

- tipo: single
  pergunta: Um modelo atinge 99% de acerto no conjunto de treino, mas apenas 60% em dados novos (teste). O que provavelmente aconteceu e o que isso significa?
  opcoes:
    - texto: Underfitting, porque o modelo é simples demais para aprender os padrões
      correta: false
      explicacao: Underfitting apresenta desempenho ruim tanto no treino quanto no teste. Aqui o treino está ótimo, o que aponta para o problema oposto.
    - texto: Overfitting, porque o modelo decorou padrões específicos do treino (incluindo ruído) que não se repetem em dados novos
      correta: true
      explicacao: Exato! O sintoma clássico de overfitting é desempenho muito bom no treino e bem pior em dados que o modelo nunca viu, sinal de que ele memorizou detalhes do treino em vez de aprender padrões que generalizam.
      explicacao_erro: O ponto-chave é comparar o desempenho em treino versus teste. Quando o treino é quase perfeito e o teste despenca, o modelo aprendeu especificidades do treino (inclusive ruído) que não generalizam — isso é overfitting.
    - texto: O modelo está funcionando corretamente, pois 99% no treino é sempre um bom sinal
      correta: false
      explicacao: Um desempenho excelente no treino não garante nada sobre a capacidade de generalização. O que importa de fato é o desempenho em dados novos (validação/teste).
    - texto: Faltam mais dados de treino para o modelo aprender melhor
      correta: false
      explicacao: Embora mais dados às vezes ajudem, o sintoma descrito (treino ótimo, teste ruim) é a assinatura de overfitting, que geralmente se resolve reduzindo a complexidade do modelo ou usando técnicas de regularização/validação, não apenas adicionando dados.

- tipo: single
  pergunta: Um banco está construindo um modelo para detectar fraude em transações (evento raro). Deixar uma fraude passar despercebida (falso negativo) é muito mais caro do que bloquear uma transação legítima por engano. Qual métrica deve orientar a escolha do modelo?
  opcoes:
    - texto: Acurácia, pois mede o total de acertos do modelo
      correta: false
      explicacao: Em problemas com classes desbalanceadas (fraude é rara), a acurácia pode ser enganosa. Um modelo que nunca prevê fraude pode ter acurácia altíssima e ainda assim ser inútil.
    - texto: Recall, pois prioriza encontrar o máximo possível dos casos positivos reais (fraudes), mesmo que isso gere alguns falsos positivos
      correta: true
      explicacao: Exato! Recall responde "dos positivos reais, quantos eu encontrei?". Como o custo de deixar passar uma fraude é o mais alto, priorizar recall garante que o modelo capture o maior número possível de fraudes reais.
      explicacao_erro: A pergunta certa aqui é "qual erro dói mais no meu problema?". Como deixar fraude passar (falso negativo) é mais caro que bloquear por engano (falso positivo), a métrica que prioriza captar os positivos reais é o recall.
    - texto: Precisão, pois garante que toda transação marcada como fraude realmente seja fraude
      correta: false
      explicacao: Precisão é importante quando o custo de um falso positivo é alto. Mas no cenário descrito, o custo de deixar passar uma fraude (falso negativo) é o que mais preocupa, então recall é mais adequado.
    - texto: R², pois compara o modelo com uma previsão simples de baseline
      correta: false
      explicacao: R² é uma métrica de regressão (usada quando o target é um número contínuo). Detecção de fraude é um problema de classificação, então métricas como recall, precisão e F1 são as apropriadas.
```
# Referências

- ML – Materiais (Google Drive): https://drive.google.com/drive/folders/1OtAk5mOA-SJ-yaUX0PK9s10Uuiocvz8V?usp=sharing
- Introduction to Machine Learning (curso Andrew Ng): https://www.coursera.org/learn/machine-learning