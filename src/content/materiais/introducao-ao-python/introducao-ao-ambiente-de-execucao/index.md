---
title: Introdução ao Ambiente de Execução
description: Compreender o que é um programa, como o Python é executado e quais são as formas básicas de interação com o interpretador
category: Programação
order: 1
---

Para iniciar o raciocínio, imagine o computador como um funcionário extremamente rápido e preciso, mas que possui sérias limitações: ele não tem empatia e é incapaz de compreender um contexto mais amplo.

<div style="background: linear-gradient(140deg, #000000 0%,rgb(38, 45, 100) 100%); padding: 3rem; border-radius: 4rem; color: white; margin: 2rem 0;">
  <h4 style="margin-top: 0;">“Nessa visão, o seu papel não é apenas 'escrever comandos', mas sim o de um gerente estratégico. Seu trabalho é encontrar maneiras de potencializar a velocidade e a precisão desse 'funcionário' (o computador), enquanto cria instruções detalhadas o suficiente para que a falta de discernimento dele não cause erros no resultado final."</h4>
  <p>Think in Python, Allen B. Downey</p>
</div>

___
### 1. O que é um programa?

Um programa é definido como uma sequência de instruções que especifica como executar uma operação de computação.

**Todo programa, independentemente da complexidade, pode ser reduzido a cinco tipos de instruções básicas:**

- _Entrada:_ Receber dados de fontes externas (teclado, arquivos, rede).

- _Saída:_ Exibir ou salvar resultados (na tela, em arquivos etc).

- _Matemática:_ Operações básicas como adição e multiplicação.

- _Execução condicional:_ Verificar condições e executar o código correspondente.

- _Repetição:_ Executar uma ação várias vezes com variações.

Programar, portanto, é o processo de quebrar uma tarefa grande e complexa em subtarefas cada vez menores, até que sejam simples o suficiente para serem executadas por essas instruções básicas.
___
### 2. O Interpretador: Linguagem Interpretada vs. Compilada

O Python é classificado como uma linguagem de alto nível, projetada para ser fácil de ler e escrever por humanos. Para que o computador entenda essas instruções, precisamos de um interpretador.
- __Linguagem Interpretada:__ O interpretador lê o código-fonte e o executa diretamente, processando o programa linha por linha.

- __Linguagem Compilada:__ Diferente das interpretadas, essas linguagens precisam ser traduzidas inteiramente para uma linguagem de baixo nível (código de máquina) antes de serem executadas. 

> Para fins didáticos, o Python é tratado como uma linguagem interpretada, pois o programador interage diretamente com o interpretador, sem uma etapa explícita de compilação.

___
### 3. Modos de Execução: Interativo vs. Script
Existem duas formas principais de interagir com o interpretador Python:
- __Modo Interativo:__ É ideal para iniciantes e para testar pequenos trechos de código. Ao iniciar o interpretador, você verá um prompt (>>>), indicando que o programa está pronto para receber comandos. Ao digitar uma expressão e apertar __Enter__, o resultado é exibido imediatamente.

- __Modo Script:__ Quando o código cresce e precisa ser salvo, utilizamos arquivos chamados _scripts_, que por convenção terminam em ".py". No modo script, o interpretador lê o arquivo inteiro e executa as instruções em sequência. Diferente do modo interativo, expressões isoladas em scripts não exibem resultados automaticamente, a menos que você use a instrução print.
___
### 4. Execução no Navegador
Para evitar as dificuldades iniciais de instalação do Python e a administração de sistemas operacionais, a recomendação pedagógica inicial é utilizar um navegador para rodar o código.

Sites como o [PythonAnywhere](https://www.pythonanywhere.com/) permitem que você comece a programar imediatamente sem configurar o seu computador local, garantindo que o foco inicial permaneça na lógica de programação e não em obstáculos técnicos de ambiente.
___

## Complemente o Aprendizado
Para aprofundar seus conhecimentos sobre introdução ao ambiente e execução, confira os seguintes recursos:

- [PROGRAMAÇÃO e SISTEMAS de INFORMAÇÃO - Manual do Mundo](https://youtu.be/ML1fgVfxuRU?si=JdHpSeCM2j1kiUGl)
- [Compiler vs Interpreter In animated Way - CodeVerse](https://youtu.be/E3TDMVETp08?si=4Q2iIDY0Cam7L9ki)
- [Como Baixar, Instalar e Configurar Visual Studio Code - Canal TI](https://youtu.be/oDgjp7PfX7c?si=PhpkmxqDCG7fIKyk)