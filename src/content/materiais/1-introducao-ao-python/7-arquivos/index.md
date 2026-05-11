---
title: 7. Arquivos
description: Compreender o que são os arquivos, saber como usá-los em Python.
category: Programação
order: 7
---

Quando você está aprendendo a programar, provavelmente começa criando variáveis e manipulando dados na memória do computador. O problema é que, quando o programa termina, todos esses dados desaparecem. É como escrever algo importante em uma folha de papel e jogar fora quando termina de usar.

# 7.1. Introdução - Por que trabalhar com arquivos?

Imagine que você criou um programa de lista de tarefas. Você adiciona várias tarefas durante o dia, marca algumas como concluídas, mas quando fecha o programa, no dia seguinte precisa digitar tudo de novo. 

**Frustrante, não é? É aí que entram os arquivos.**

Arquivos permitem que você **salve informações de forma permanente no disco rígido do computador**. Assim, seus dados sobrevivem mesmo depois que o programa é fechado. Pense em situações do dia a dia: salvar o progresso de um jogo, guardar uma lista de contatos, armazenar suas anotações pessoais, ou manter um histórico de gastos mensais. Todos esses casos precisam de arquivos.

# 7.2. Conceitos básicos

Antes de começarmos a programar, é importante entender alguns conceitos fundamentais.

__Dados em memória versus dados permanentes:__
Quando você cria uma variável no Python, ela existe apenas na memória RAM do computador. 

A memória RAM é rápida, mas temporária. Quando o programa termina ou o computador é desligado, tudo que estava na memória desaparece. Já os arquivos ficam salvos no disco rígido (ou SSD), que é um armazenamento permanente.

__Tipos de arquivos:__ Existem diversos tipos de arquivos, mas vamos focar nos arquivos de texto, que são os mais simples para começar.

Um arquivo de texto é simplesmente um arquivo que contém caracteres que podemos ler, como letras, números e símbolos. Exemplos comuns são arquivos com extensão *.txt* (texto puro), *.csv* (valores separados por vírgula, como planilhas simples) e *.json* (formato estruturado muito usado para guardar dados).

A diferença principal entre arquivos de texto e arquivos binários (como imagens, vídeos ou programas executáveis) é que podemos abrir um arquivo de texto em qualquer editor simples e entender o que está escrito. Já um arquivo binário contém dados em um formato que só o programa específico consegue interpretar.

# 7.3. Abrindo e fechando arquivos

Para trabalhar com um arquivo em Python, primeiro precisamos "abrir" ele. Abrir um arquivo significa criar uma conexão entre o nosso programa e o arquivo no disco. É como abrir um livro antes de começar a ler.

Em Python, usamos a função `open()` para isso. Essa função precisa de pelo menos um argumento: o nome do arquivo (ou caminho completo até ele). Veja um exemplo simples:

```python
arquivo = open("notas.txt", "r")
```

Nesse exemplo, estamos abrindo um arquivo chamado *"notas.txt"*. A letra *"r"* significa *"read"*, ou seja, estamos abrindo para leitura. A função `open()` retorna um objeto que representa a conexão com o arquivo, e guardamos esse objeto na variável arquivo.

**Modos de abertura:** Existem vários modos para abrir um arquivo, mas os três principais que você vai usar são:

- ***"r"* (read/leitura)**: Abre o arquivo apenas para ler. Se o arquivo não existir, vai dar erro. Use quando quiser apenas ler o conteúdo sem modificá-lo.


- ***"w"* (write/escrita)**: Abre o arquivo para escrever. Cuidado! Se o arquivo já existir, todo o conteúdo antigo será apagado e substituído. Se o arquivo não existir, ele será criado. Use quando quiser criar um arquivo novo ou reescrever completamente um arquivo existente.


- ***"a"* (append/adicionar)**: Abre o arquivo para adicionar conteúdo ao final. Se o arquivo existir, o novo conteúdo será adicionado depois do conteúdo existente. Se não existir, será criado. Use quando quiser adicionar informações sem perder o que já está salvo.

**A importância de fechar arquivos:** Depois de terminar de trabalhar com um arquivo, é fundamental fechá-lo usando o método `close()`. Isso libera a conexão e garante que todas as alterações foram realmente salvas no disco. Se você não fechar o arquivo, podem ocorrer problemas: dados podem ser perdidos ou o arquivo pode ficar "travado" para outros programas.
```python
arquivo = open("notas.txt", "r")
# ... fazer algo com o arquivo ...
arquivo.close()
```

O problema dessa abordagem é que, se acontecer algum erro no meio do código, o `close()` pode nunca ser executado, e o arquivo fica aberto. Por isso, existe uma forma melhor de fazer isso.

# 7.4. O contexto `with`

Python oferece uma maneira elegante e segura de trabalhar com arquivos: o gerenciador de contexto `with`. Essa é a forma recomendada e a que você deve usar desde o início.
```python
with open("notas.txt", "r") as arquivo:
    # trabalhe com o arquivo aqui dentro
    conteudo = arquivo.read()
# aqui fora do bloco, o arquivo já foi fechado automaticamente
```

A grande vantagem do `with` é que ele fecha o arquivo automaticamente quando o bloco de código termina, mesmo que ocorra um erro. É como ter um assistente que garante que você sempre vai fechar a porta ao sair de uma sala, não importa o que aconteça.

A palavra `as` serve para dar um nome para o objeto arquivo (nesse caso, chamamos de `arquivo`, mas você pode usar qualquer nome que faça sentido). Todo o código que precisa trabalhar com o arquivo deve estar indentado dentro do bloco `with`. Quando o programa sai do bloco indentado, o arquivo é fechado automaticamente.

Daqui em diante, vamos usar sempre o `with` nos nossos exemplos, porque é a melhor prática.

# 7.5. Leitura de arquivos

Agora que sabemos abrir um arquivo de forma segura, vamos aprender as diferentes formas de ler o conteúdo dele.

**Lendo o arquivo inteiro de uma vez:** O método mais simples é ´read()´, que lê todo o conteúdo do arquivo e retorna como uma única string.

```python
with open("notas.txt", "r") as arquivo:
    conteudo = arquivo.read()
    print(conteudo)
```

Isso é útil quando o arquivo é pequeno e você quer processar o conteúdo todo de uma vez. Mas cuidado: se o arquivo for muito grande (vários megabytes ou gigabytes), isso pode ocupar muita memória do computador.

**Lendo linha por linha:** Muitas vezes, os arquivos estão organizados em linhas, e você quer processar uma linha de cada vez. Existem algumas formas de fazer isso.

A primeira é usando `readline()`, que lê apenas a próxima linha do arquivo:

```python
with open("notas.txt", "r") as arquivo:
    primeira_linha = arquivo.readline()
    segunda_linha = arquivo.readline()
    print(primeira_linha)
    print(segunda_linha)
```

Cada vez que você chama `readline()`, ele lê a próxima linha e avança o "cursor" interno do arquivo. É como ler um livro e ir passando as páginas.

Outra opção é `readlines()` (com "s" no final), que lê todas as linhas de uma vez e retorna uma lista, onde cada elemento é uma linha:

```python
with open("notas.txt", "r") as arquivo:
    linhas = arquivo.readlines()
    for linha in linhas:
        print(linha)
```

Mas a forma mais elegante e eficiente de ler linha por linha é simplesmente iterar sobre o objeto arquivo diretamente:

```python
with open("notas.txt", "r") as arquivo:
    for linha in arquivo:
        print(linha)
```

Essa última forma é melhor porque não carrega o arquivo inteiro na memória. Ela lê uma linha, processa, lê a próxima, e assim por diante. É perfeita para arquivos grandes.

**Um detalhe importante sobre quebras de linha:** Quando você lê linhas de um arquivo, cada linha vem com o caractere de quebra de linha no final (geralmente representado como `\n`). Isso pode causar espaçamentos extras quando você imprime. Para remover esses espaços, você pode usar o método `strip()`:

```python
with open("notas.txt", "r") as arquivo:
    for linha in arquivo:
        linha_limpa = linha.strip()
        print(linha_limpa)
```

O `strip()` remove espaços em branco e quebras de linha do início e fim da string.

**Exemplo prático de leitura:** Vamos imaginar que você tem um arquivo chamado "temperaturas.txt" com uma temperatura por linha, e quer calcular a média:

```python
with open("temperaturas.txt", "r") as arquivo:
    soma = 0
    contador = 0
    
    for linha in arquivo:
        temperatura = float(linha.strip())
        soma += temperatura
        contador += 1
    
    if contador > 0:
        media = soma / contador
        print(f"A temperatura média foi: {media:.1f}°C")
```

Nesse exemplo, lemos cada linha, convertemos para número decimal com `float()`, acumulamos na soma e contamos quantas temperaturas temos. No final, calculamos e exibimos a média.

# 7.6. Escrita em arquivos
Agora vamos aprender a criar e escrever conteúdo em arquivos. Lembre-se: para escrever, precisamos abrir o arquivo no modo *"w"* (sobrescreve) ou *"a"* (adiciona ao final).

Escrevendo texto no arquivo: O método básico é `write()`, que escreve uma string no arquivo:

```python
with open("mensagem.txt", "w") as arquivo:
    arquivo.write("Olá, mundo!\n")
    arquivo.write("Esta é a segunda linha.\n")
```

Note que o `write()` não adiciona quebra de linha automaticamente. Se você quiser que cada `write()` fique em uma linha diferente, precisa adicionar `\n` no final da string.

**A diferença entre modo *"w"* e modo *"a"*:** Vamos ver um exemplo que ilustra bem essa diferença:

- **Primeira execução:** cria o arquivo

```python
with open("log.txt", "w") as arquivo:
    arquivo.write("Primeira execução\n")
```

- **Segunda execução:** APAGA o conteúdo anterior

```python
with open("log.txt", "w") as arquivo:
    arquivo.write("Segunda execução\n")
```

Se você rodar esse código, o arquivo *"log.txt"* vai conter apenas "Segunda execução", porque o modo *"w"* apagou o conteúdo anterior. Agora veja com o modo *"a"*:

- **Primeira execução:** cria o arquivo
```python
with open("log.txt", "w") as arquivo:
    arquivo.write("Primeira execução\n")
```

- **Segunda execução:** ADICIONA ao arquivo
```python
with open("log.txt", "a") as arquivo:
    arquivo.write("Segunda execução\n")
```

Agora o arquivo vai conter as duas linhas, porque o modo *"a"* preserva o conteúdo existente e adiciona no final.

**Escrevendo múltiplas linhas:** Se você tem uma lista de strings e quer escrever todas de uma vez, pode usar `writelines()`:

```python
tarefas = ["Estudar Python\n", "Fazer exercícios\n", "Revisar o conteúdo\n"]

with open("tarefas.txt", "w") as arquivo:
    arquivo.writelines(tarefas)
```

Mas atenção: o `writelines()` também não adiciona quebras de linha automaticamente. Você precisa incluir o `\n` em cada string da lista, como fizemos no exemplo.

**Exemplo prático de escrita:** Vamos criar um programa que pede notas de alunos e salva em um arquivo:

```python
with open("notas_turma.txt", "w") as arquivo:
    arquivo.write("Notas da Turma de Python\n")
    arquivo.write("=" * 30 + "\n\n")
    
    for i in range(3):
        nome = input(f"Nome do aluno {i+1}: ")
        nota = input(f"Nota do aluno {i+1}: ")
        arquivo.write(f"{nome}: {nota}\n")
    
    arquivo.write("\nFim do registro.")

print("Notas salvas com sucesso!")
```

# 7.7. Exemplo prático integrado

Vamos criar um mini-projeto que junta tudo que aprendemos: um sistema simples de lista de compras que salva e carrega dados de um arquivo.

**Passo 1: Criar a estrutura básica do menu**

Primeiro, vamos criar uma função que mostra as opções disponíveis para o usuário:

```python
def mostrar_menu():
    print("\n=== LISTA DE COMPRAS ===")
    print("1. Ver lista")
    print("2. Adicionar item")
    print("3. Sair")
    return input("Escolha uma opção: ")
```

Essa função simplesmente exibe o menu e retorna a escolha do usuário. Usaremos essa resposta para decidir qual ação executar.

**Passo 2: Criar a função para carregar a lista do arquivo**

Agora precisamos de uma função que leia os itens salvos no arquivo e retorne uma lista com eles:

```python
def carregar_lista():
    itens = []
    
    with open("compras.txt", "r") as arquivo:
        for linha in arquivo:
            itens.append(linha.strip())
    
    return itens
```

Essa função abre o arquivo *"compras.txt"* no modo leitura, percorre cada linha, remove os espaços extras e quebras de linha com `strip()`, e adiciona cada item na lista. No final, retorna a lista completa. Note que se o arquivo não existir, o programa vai dar erro. Por enquanto, vamos assumir que o arquivo já existe. Mais adiante você aprenderá a tratar esses casos.

**Passo 3: Criar a função para salvar a lista no arquivo**

Precisamos também de uma função que pegue a lista de itens e salve tudo no arquivo:

```python
def salvar_lista(itens):
    with open("compras.txt", "w") as arquivo:
        for item in itens:
            arquivo.write(item + "\n")
```

Essa função é bem direta: abre o arquivo no modo escrita (que apaga o conteúdo anterior), percorre cada item da lista, e escreve no arquivo adicionando uma quebra de linha após cada item. Assim, cada item fica em uma linha separada.

**Passo 4: Criar a função para exibir a lista**

Vamos criar uma função que mostra todos os itens da lista de forma organizada:

```python
def ver_lista(itens):
    if len(itens) == 0:
        print("\nSua lista está vazia!")
    else:
        print("\n--- Sua lista de compras ---")
        for i, item in enumerate(itens, 1):
            print(f"{i}. {item}")
```

Essa função primeiro verifica se a lista está vazia. Se estiver, informa o usuário. Caso contrário, exibe cada item numerado. A função `enumerate()` é útil aqui porque nos dá tanto o índice quanto o item. O segundo argumento 1 faz a numeração começar em 1 ao invés de 0, que é mais natural para o usuário.

**Passo 5: Criar a função para adicionar itens**

Agora uma função simples que pede um novo item ao usuário e adiciona na lista:

```python
def adicionar_item(itens):
    item = input("Digite o item para adicionar: ")
    itens.append(item)
    print(f"'{item}' adicionado com sucesso!")
```

Essa função pede o nome do item, adiciona na lista usando `append()`, e confirma a operação para o usuário.

**Passo 6: Juntar tudo no programa principal**

Agora vamos criar o programa principal que usa todas essas funções:

- Primeiro, criamos o arquivo vazio se não existir
```python
with open("compras.txt", "w") as arquivo:
    pass
```

- Carrega a lista existente
```python
lista_compras = carregar_lista()
```

- Variável de controle do loop
```python
continuar = True
```

- Loop principal do programa
```python
opcao = ""
while opcao != "3":
    opcao = mostrar_menu()
    
    if opcao == "1":
        ver_lista(lista_compras)
    elif opcao == "2":
        adicionar_item(lista_compras)
        salvar_lista(lista_compras)
    elif opcao == "3":
        print("Até logo!")
    else:
        print("Opção inválida!")
```

Vamos entender o que esse programa principal faz passo a passo. Primeiro, criamos o arquivo *"compras.txt"* vazio caso ele não exista. Usamos `pass` porque não queremos escrever nada, apenas criar o arquivo. Depois, carregamos os itens que já estão salvos no arquivo usando nossa função `carregar_lista()`.

Em seguida, criamos a variável opcao vazia e entramos em um loop que continua enquanto a opção for diferente de "3" (que é a opção de sair). Dentro desse loop, mostramos o menu e pegamos a escolha do usuário. Se escolheu a opção 1, chamamos `ver_lista()` para exibir os itens. Se escolheu a opção 2, chamamos `adicionar_item()` para adicionar um novo item e, logo em seguida, chamamos `salvar_lista()` para garantir que o novo item seja salvo no arquivo imediatamente. Se escolheu a opção 3, exibimos uma mensagem de despedida e o loop termina naturalmente. Para qualquer outra entrada, informamos que a opção é inválida.

O ponto chave aqui é que sempre que adicionamos um item, salvamos a lista completa no arquivo. Isso garante que os dados não sejam perdidos mesmo se o programa for fechado inesperadamente.

**Testando o programa completo:**

Quando você executar esse programa pela primeira vez, a lista estará vazia. Você pode adicionar alguns itens como "Arroz", "Feijão", "Macarrão". Depois, se você fechar o programa e executar novamente, verá que todos os itens ainda estarão lá, porque foram salvos no arquivo *"compras.txt"*. Você pode até abrir esse arquivo em um editor de texto e verá cada item em uma linha.

Esse é um exemplo real de como arquivos tornam um programa útil. Os dados persistem entre execuções, transformando um programa simples em algo realmente prático.

# 7.8. Boas práticas e cuidados
Agora que você já sabe trabalhar com arquivos, vamos ver alguns pontos importantes para evitar problemas comuns.

**Codificação de caracteres (encoding):** Quando você trabalha com arquivos de texto que contém acentos, cedilhas ou outros caracteres especiais do português, pode encontrar problemas. Isso acontece porque existem diferentes formas de representar esses caracteres no computador.
A forma mais moderna e universal é o **UTF-8**, que suporta praticamente todos os idiomas do mundo. Para garantir que seu arquivo será lido e escrito corretamente, especialmente se você usa caracteres acentuados, adicione o parâmetro `encoding`:

```python
with open("mensagem.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write("Olá! Esta mensagem tem acentuação.\n")
    arquivo.write("Também tem cedilha: ação, coração.\n")

with open("mensagem.txt", "r", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()
    print(conteudo)
```

Use sempre `encoding="utf-8"` quando trabalhar com texto em português. Isso evita que letras acentuadas apareçam como caracteres estranhos ou causem erros.

**Caminhos de arquivos:** Até agora, usamos apenas nomes de arquivos simples, como *"notas.txt"*. Quando você faz isso, Python procura (ou cria) o arquivo na pasta onde o programa está sendo executado. Mas e se você quiser trabalhar com um arquivo em outra pasta?

Você pode usar o caminho completo:

- **Windows**
```python
with open("C:\\Users\\SeuNome\\Documents\\arquivo.txt", "r") as arquivo:
    conteudo = arquivo.read()
```

- **Linux ou Mac**
```python
with open("/home/seunome/documentos/arquivo.txt", "r") as arquivo:
    conteudo = arquivo.read()
```

Note que no Windows você precisa usar duas barras invertidas `\\` ou usar uma barra normal `/`. Isso porque a barra invertida tem um significado especial em strings Python.

Uma forma melhor e mais portável (funciona em qualquer sistema operacional) é usar o módulo `os.path`:

```python
import os

caminho = os.path.join("documentos", "projetos", "arquivo.txt")
with open(caminho, "r") as arquivo:
    conteudo = arquivo.read()
```

**Quando usar cada modo:** Para finalizar, vamos resumir quando usar cada modo de abertura:

- Use **modo "r"** quando você quer apenas ler o arquivo e não precisa modificá-lo. O arquivo deve existir, senão haverá erro.
- Use **modo "w"** quando você quer criar um arquivo novo ou reescrever completamente um arquivo existente. *Cuidado:* isso apaga o conteúdo anterior.
- Use **modo "a"** quando você quer adicionar informações ao final de um arquivo existente, sem perder o que já está lá. É perfeito para logs, históricos, ou qualquer situação onde você quer acumular informações ao longo do tempo.

Existem outros modos mais avançados (como *"r+"* para ler e escrever simultaneamente, ou *"b"* para arquivos binários), mas esses três básicos resolvem a maioria dos casos quando você está começando.