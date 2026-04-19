---
title: POO (Programação Orientada a Objetos)
description: 
category: Programação
order: 16
---

## Conceitos Básicos

Programação orientada a objetos, ou POO para os mais íntimos, se trata muito de uma forma de organização de construação de sistemas, especificamente no nível do código.

### Paradigma Baseado em Entidades

A Programação Orientada a Objetos é uma forma de modelar um sistema dividindo seus componentes num conjunto de , em que cada objeto representa um aspecto particular desse sistema. Em vez de focar apenas na lógica sequencial, você pode enxergar o código através de "coisas" que existem no mundo real ou em conceitos abstratos.

O objetivo é criar definições abstratas que representem os objetos que queremos ter no sistema. Por exemplo, ao modelar uma escola, podemos criar um objeto para representar professores e outro objeto para representar alunos. E da mesma maneira que uma escola real, também podemos criar as relações e como cada objeto interage entre si, como quando professores alteram as notas de algum aluno.

---

### Classes e Objetos

Em POO usamos classes como as abstrações, lógicas de um objeto. Ainda no contexto da escola, podemos pensar como "Professor" e "Aluno" sendo classes. Cada uma possui seus próprios comportamentos, capacidades e conjunto de informações associadas.

As **classes** são uma maneira de definir padrões. _"Todo aluno possui um número de matrícula"_, _"Todo professor define notas para os alunos"_, etc - todas essas coisas são definidas numa classe.

Uma classe pode conter servir para definir comportamentos e padrões - como no exemplo da escola - ou também para organizar informações, como numa lista de compras.

Entretanto, a classe "Professor" por si só é apenas uma ideia, não representa uma "Pessoa" que realmente é um professor. Quando temos essa "Pessoa" que executa os comportamentos e padrões definidos na classe, temos então um **objeto**. Numa escola, existem várias pessoas na categoria de "Aluno" que possuem o mesmo objetivo geral. Objetos representam cada pessoa existente que ocupa a posição de aluno na escola, seguem o mesmo padrão de comportamentos, possuindo informações únicas sobre si.

Essa ação de criar um objeto a partir de uma classe é definida pelo termo **instanciação**^1^. Então criar um objeto da classe "Aluno" é o mesmo que instanciar sua classe.

> Nota 📝: Esse termo será explorado melhor posteriormente.

Resumidamente,

Uma **Classe** representa os comportamentos e informações de algo. Enquanto um **Objeto** possui os padrões de alguma **Classe** e pode efetivamente executar os comportamentos definidos.

---

### Métodos e Atributos

_Vamos organizar melhor a ideia da escola._

> Numa escola, um aluno participa de uma única turma com quem assiste em conjunto a varias aulas de diferentes disciplinas. Enquanto isso, um professor deve lecionar pelo menos uma disciplina, podendo ou não gerenciar mais de uma turma de alunos

Levando isso em consideração, é possível perceber comportamentos e diferenças do que as classes "Professor" e "Aluno" podem fazer. Segue **alguns** comportamentos possíveis:

**Professor**

- Dá aula para uma turma sobre alguma disciplina
- Gerencia a turma as quais dá aula

  Isso significa que ele precisa:

  - Corrigir atividades
  - Organizar as notas
  - Definir quem está presente nas aulas

  Entre várias outras coisas.

**Aluno**

- Assiste às aulas de alguma disciplina
- Faz as atividades/provas propostas nas aulas
- Tem acesso às próprias notas e frequência

Informações definidas para cada classe são chamadas de **atributos**. Por exemplo, alguns atributos para "Aluno" seriam suas notas de cada disciplina. Já os comportamentos como os citados são referenciados como **métodos**.

No quesito de código, métodos são apenas **funções** que estão dentro de uma classe. Consequentemente, eles podem ter acesso a informações inerentes dessa classe (os atributos).

Em pseudocódigo, o formato das classes, apenas com métodos e atributos, seria:

```
classe Professor:
    atributos:
        nome
        turmas
        disciplinas
    metodos:
        darNota(aluno, nota)
        definirPresenca(aluno)

classe Aluno:
    atributos:
        nome
        turma
        notas
        disciplinas
    metodos:
        verNotas()
        verFrequencia()
        fazerAtividade(disciplina)
        assistirAula(disciplina)

```

## Abstração

Inicialmente pode não ser claro como POO ajuda, parecendo talvez até como uma camada de complexidade a mais. No fim, tudo vai depender do contexto do seu problema, pode ser que POO realmente não seja a melhor abordagem e você precise explorar outros paradigmas da programação.

Mas ainda advogando sobre a utilidade de POO, a imagem abaixo cria mais um contexto:

![1767191523867](image/poo/1767191523867.png)

Sabemos que todo carro possui suas características únicas e ao mesmo tempo ainda seguem padrões presentes na maioria dos carros. Com uma classe, algo genérico, é possível organizar os padrões que devem ser seguidos. Além de que facilita o processo de criar algo que possuem as mesmas características.

Colocando isso em nível de código, digamos que você criou um sistema de autorização com 150 linhas. Se você não utilizar classes para organizar, pode acabar sendo necessário replicar quase as mesmas 150 linhas de código de novo. Enquanto usando uma classe, normalmente você as vezes precisa de apenas 1 linha de código para replicar aquela estrutura inteira.

No fim, tudo são sobre práticas que visam facilitar o trabalho do programador. Não só o trabalho pessoal, mas também o em conjunto a outras pessoas. Facilitar organização de ideias e garantir que se uma nova pessoa começar a contribuir no sistema ela consiga entender melhor devido a estsrutura padronizada e bem definida.

## Implementando em Python

Agora que entendemos a teoria, vamos ver como isso funciona na prática com Python. Até agora usamos pseudocódigo, mas a sintaxe real é bem direta.

### Definindo uma Classe

Em Python, usamos a palavra-chave `class` seguida do nome da classe (convenção [PascalCase](https://www.theserverside.com/definition/Pascal-case)) e dois pontos.

```python
class Lampada:
    pass
```

### O Método Construtor (`__init__`) e o `self`

Quando criamos um objeto, geralmente queremos que ele já nasça com algumas características. Para isso usamos um método especial chamado `__init__`, conhecido como **construtor**.

Você vai notar um parâmetro estranho chamado `self`. Em Python, os métodos precisam saber *quem* está chamando eles. O `self` representa **o próprio objeto**. É como se o objeto dissesse "eu mesmo". Note também que `self` é apenas uma convenção, você também pode usar outros nomes para essa variável que vai funcionar da mesma forma.

```python
class Lampada:
    def __init__(self, cor, voltagem):
        self.cor = cor
        self.voltagem = voltagem
        self.ligada = False  # Começa desligada por padrão
```

### Métodos (Comportamentos)

Métodos são funções dentro da classe. Eles também recebem `self` como primeiro parâmetro.

```python
    def ligar(self):
        self.ligada = True
        print("Lâmpada ligada")

    def desligar(self):
        self.ligada = False
        print("Lâmpada desligada")
```

### Instanciação (Criando Objetos)

Agora podemos criar nossas lâmpadas no mesmo arquivo da classe Lampada ou importando-a:

```python
# Instanciando
lampada_sala = Lampada("Branca", 220)
lampada_quarto = Lampada("Amarela", 110)

# Usando os métodos
lampada_sala.ligar()
print(f"A lâmpada da sala é {lampada_sala.cor}")
```

### Destrutores (`__del__`)

O método `__del__` é o oposto do `__init__`. Ele é chamado quando o objeto está prestes a ser removido da memória (destruído).

Embora o Python tenha um coletor de lixo (*Garbage Collector*) que limpa objetos não usados automaticamente, o `__del__` tem usos reais importantes:

1. **Liberação de Recursos Externos**: Se sua classe abriu um arquivo, uma conexão de rede ou com banco de dados, o `__del__` pode garantir que essa conexão seja fechada se o programador esquecer.
2. **Debugging**: Útil para rastrear o ciclo de vida de objetos em sistemas complexos (saber exatamente quando um objeto "morreu").

*Nota*: Para recursos críticos (arquivos, conexões), é mais moderno e seguro usar Gerenciadores de Contexto (o bloco `with`), mas o `__del__` serve como uma rede de segurança.

```python
class Conexao:
    def __init__(self, nome):
        self.nome = nome
        print(f"Conexão {self.nome} aberta")
    
    def __del__(self):
        print(f"Conexão {self.nome} fechada e recursos liberados")

# Ao rodar, você verá a mensagem de fechamento automaticamente
# quando o objeto 'c' deixar de existir.
c = Conexao("BancoDados")
del c # Forçando a exclusão
```

### Outros Métodos Especiais (Dunder Methods)

O Python é cheio de métodos que começam e terminam com dois underscores, chamados carinhosamente de **"Dunder Methods"** (Double UNDERscore). Eles permitem que seus objetos se comportem como tipos nativos da linguagem.

Você já conheceu o `__init__` (construtor) e o `__del__` (destrutor), mas existem muitos outros. Por exemplo:
*   `__str__`: Define como seu objeto aparece quando você dá um `print(objeto)`.
*   `__repr__`: Representação "oficial" do objeto (útil para debug).
*   `__len__`: Permite usar `len(objeto)`.
*   `__add__`: Permite somar objetos com `+`.

Para se aprofundar nesse universo e ver a lista completa, recomendo a documentação oficial ou guias dedicados:
*   [Documentação Oficial - Data Model](https://docs.python.org/3/reference/datamodel.html#special-method-names)
*   [Real Python - Operator Overloading (Guia prático)](https://realpython.com/operator-function-overloading/)

---

## Encapsulamento: Estratégia e Proteção

Encapsulamento vai muito além de apenas esconder variáveis. É uma **estratégia de design** para proteger a integridade dos dados e garantir que o objeto esteja sempre em um estado válido.

Imagine que você tem uma classe `ContaBancaria`. Se o saldo for uma variável pública (`conta.saldo`), qualquer um pode (claro, que tenha acesso ao código) chegar e fazer `conta.saldo = -1000000`. Isso quebraria a lógica do sistema. O encapsulamento serve para evitar isso, forçando o uso de métodos que validam as alterações.

### Níveis de Acesso em Python

Em linguagens como Java ou C#, temos `public`, `private` e `protected` que funcionam rigidamente. Em Python, a filosofia é baseada em convenções e confiança ("We are all consenting adults here").

1. **Público (Public)**: Acessível de qualquer lugar. Sem prefixo. É a interface padrão da classe.
2. **Protegido (Protected)**: Por convenção, não deve ser acessado de fora da classe ou de suas filhas. Usa um underline `_` como prefixo (`_saldo`).
   * *Nota*: O Python não bloqueia o acesso, mas programadores sabem que acessar um atributo `_` é uma má prática e pode quebrar o código em atualizações futuras.
3. **Privado (Private)**: Destinado a uso estritamente interno da classe. Usa dois underlines `__` como prefixo (`__saldo`).
   * *Nota*: O Python usa **Name Mangling** (renomeação interna para `_Classe__atributo`) para dificultar o acesso acidental, mas ainda é tecnicamente possível acessá-lo se você realmente tentar (embora não deva).

### Exemplo Prático de Proteção: Getters e Setters

Para aplicar essa proteção na prática, usamos métodos específicos chamados **Getters** (para pegar valores) e **Setters** (para definir valores).

* **Getter (`get_...`)**: Devolve o valor de um atributo privado. Permite leitura sem dar acesso direto à variável.
* **Setter (`set_...` ou ação específica)**: Recebe um novo valor e decide se aceita ou não. É aqui que entra a validação.

```python
class ContaBancaria:
    def __init__(self, titular, saldo_inicial):
        self.titular = titular       # Público: pode mudar à vontade
        self.__saldo = saldo_inicial # Privado: ninguém mexe diretamente!

    # Getter: Permite LER o saldo
    def get_saldo(self):
        return self.__saldo

    # Setter (via método): Permite ALTERAR com validação
    # Em vez de chamar de 'set_saldo', usamos nomes que fazem sentido para o negócio
    def depositar(self, valor):
        if valor > 0:
            self.__saldo += valor
        else:
            print("Valor inválido para depósito")

    def sacar(self, valor):
        if valor <= self.__saldo:
            self.__saldo -= valor
        else:
            print("Saldo insuficiente")

conta = ContaBancaria("Ana", 1000)

# Correto: Usando a interface segura (Setters/Ações e Getters)
conta.depositar(500)
print(conta.get_saldo()) # 1500

# Erro: Tentar acessar direto (protegido pelo encapsulamento)
# print(conta.__saldo) # AttributeError

# Acessando variável privada via Name Mangling (não recomendado!)
# O Python renomeia __saldo para _ContaBancaria__saldo internamente
print(conta._ContaBancaria__saldo)  # 1500 - Funciona, mas é má prática!

```


Não iremos entrar em detalhes sobre outras linguagens, mas para os curiosos, aqui está o mesmo exemplo implementado em Java para servir de comparação. Note como em Java somos obrigados a declarar os tipos e usar as palavras-chave `private` e `public` explicitamente:

```java
public class ContaBancaria {
    public String titular;     // Público
    private double saldo;      // Privado (Realmente privado!)

    public ContaBancaria(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    // Getter
    public double getSaldo() {
        return this.saldo;
    }

    // Setter (depositar)
    public void depositar(double valor) {
        if (valor > 0) {
            this.saldo += valor;
        } else {
            System.out.println("Valor inválido");
        }
    }
}
```

---

## Herança

Herança é um dos pilares da POO que permite a reutilização de código e a criação de hierarquias. É baseada na relação **"É UM"**.

* Um Carro **é um** Veículo.
* Um Professor **é uma** Pessoa.

Se você está duplicando muito código entre duas classes, provavelmente elas poderiam herdar de uma classe comum.

### Sintaxe e o Poder do `super()`

Para herdar, passamos a classe mãe nos parênteses: `class Filha(Mae):`.

O segredo para uma herança bem feita é o uso da função `super()`. Ela serve como uma "ponte" para a classe mãe.

No exemplo abaixo, o `Carro` precisa ter `marca` e `modelo` (coisas de Veículo) e também `portas` (coisa de Carro). Ao chamar `super().__init__(marca, modelo)`, estamos dizendo: *"Ei, classe Veiculo, use a sua lógica pronta para cadastrar a marca e o modelo desse carro"*.

Depois que a classe mãe faz o trabalho dela (inicializa `marca` e `modelo`), a classe filha (`Carro`) continua rodando para configurar o que falta (`self.portas`). Sem o `super()`, teríamos que reescrever `self.marca = marca` e `self.modelo = modelo` dentro de Carro, duplicando código desnecessariamente.


```python
class Veiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo

    def mover(self):
        print(f"{self.modelo} está se movendo.")

class Carro(Veiculo):
    def __init__(self, marca, modelo, portas):
        # Chama o __init__ de Veiculo para configurar marca e modelo
        super().__init__(marca, modelo) 
        self.portas = portas # Configura apenas o que é específico de Carro

    def buzinar(self):
        print("Bi bi!")

meu_carro = Carro("Toyota", "Corolla", 4)
meu_carro.mover()   # Método herdado de Veiculo
meu_carro.buzinar() # Método exclusivo de Carro
```

*Curiosidade*: Python suporta **Herança Múltipla** (uma classe pode herdar de várias classes ao mesmo tempo: `class Hibrido(Carro, Barco):`), algo que muitas linguagens não permitem pela complexidade.

---

## Polimorfismo

Polimorfismo ("muitas formas") permite que objetos de tipos diferentes sejam tratados da mesma maneira. Existem dois tipos principais que você precisa conhecer:

### 1. Sobrescrita (Override) - O mais comum

Acontece quando a classe filha recria um método da classe mãe com uma nova lógica. O método tem o **mesmo nome** e a **mesma assinatura**, mas comportamento diferente.

É o que permite que você chame `.mover()` em uma lista de veículos e cada um se mova do seu jeito.

```python
class Moto(Veiculo):
    # Sobrescrevendo o método mover de Veiculo
    def mover(self):
        print(f"{self.modelo} está acelerando em duas rodas!")

veiculos = [Carro("Fiat", "Uno", 2), Moto("Honda", "CG")]

for v in veiculos:
    v.mover() 
    # O Python descobre em tempo de execução qual método chamar:
    # Carro -> usa o genérico de Veiculo (ou o dele se tivesse sobrescrito)
    # Moto -> usa a versão específica "em duas rodas"
```

### 2. Sobrecarga (Overload) - O jeito Python

Em linguagens como Java, você pode ter vários métodos com o mesmo nome (`calcular(a)`, `calcular(a, b)`). Isso é Sobrecarga.

**Python NÃO suporta sobrecarga nativa** dessa forma (o último método definido substituiria o anterior). Em Python, simulamos a sobrecarga usando **parâmetros padrão** ou argumentos variáveis (`*args`). É uma solução mais elegante e "Pythônica".

```python
class Calculadora:
    # Simulando sobrecarga: um único método que aceita 1 ou 2 números
    def somar(self, a, b=0):
        return a + b

calc = Calculadora()
print(calc.somar(10))     # Funciona (b assume 0)
print(calc.somar(10, 20)) # Funciona (b assume 20)
```

---

## Classes Abstratas e Interfaces

À medida que seus sistemas crescem, você vai querer garantir que certas classes sigam um padrão rigoroso. É aqui que entram as Classes Abstratas e Interfaces.

### Classes Abstratas: O Molde Incompleto

Uma Classe Abstrata funciona como um **contrato** ou um **molde**. Ela define *o que* as classes filhas devem fazer, mas não necessariamente *como* devem fazer.

Imagine o conceito de **Forma Geométrica**.
*   Você consegue desenhar um "Círculo"? Sim.
*   Você consegue desenhar um "Quadrado"? Sim.
*   Você consegue desenhar uma "Forma"? Não exatamente. "Forma" é uma ideia abstrata.

Na POO, uma classe abstrata **não pode ser instanciada** (você não cria um objeto `Forma`), ela serve apenas para ser herdada. E o mais importante: ela pode obrigar as classes filhas a implementarem certos métodos.

### Implementação Técnica (`abc`)

Em Python, usamos o módulo `abc` (**A**bstract **B**ase **C**lasses) e o decorador `@abstractmethod`.

```python
from abc import ABC, abstractmethod
import math

# Herdar de ABC torna a classe abstrata
class Forma(ABC):
    
    @abstractmethod
    def area(self):
        """Método que OBRIGATORIAMENTE deve ser implementado pelas filhas"""
        pass

    # Classes abstratas podem ter métodos normais também
    def descricao(self):
        print("Sou uma forma geométrica")

# Tentativa de criar uma Forma (Gera Erro!)
# f = Forma() # TypeError: Can't instantiate abstract class...

class Quadrado(Forma):
    def __init__(self, lado):
        self.lado = lado

    # Somos OBRIGADOS a implementar area(), senão o Quadrado também não funciona
    def area(self):
        return self.lado * self.lado

class Circulo(Forma):
    def __init__(self, raio):
        self.raio = raio

    def area(self):
        return math.pi * (self.raio ** 2)

q = Quadrado(4)
c = Circulo(3)

print(f"Área Quadrado: {q.area()}")
print(f"Área Círculo: {c.area():.2f}")
q.descricao() # Método concreto herdado da abstrata

# Uma Classe Filha PODE ser tratada como a Classe Mãe
formas = [q, c] # Lista de 'Formas' (polimorfismo)
for forma in formas:
    # Não importa se é Quadrado ou Círculo, ambos são 'Forma'
    # e ambos garantiram que têm o método area()
    print(f"Sou uma forma e minha área é: {forma.area():.2f}")

# Exemplo claro de Tipagem: A função espera receber uma 'Forma' genérica
def imprimir_area(forma: Forma):
    # A função não precisa saber se é Círculo ou Quadrado, apenas que é uma Forma
    print(f"A área da forma é {forma.area()}")

imprimir_area(q) # Funciona: Quadrado É UMA Forma
imprimir_area(c) # Funciona: Círculo É UMA Forma
```



### Interfaces: Contratos Puros

Muitas linguagens (como Java ou C#) têm uma palavra-chave específica `interface`. Uma Interface é um contrato puro: ela diz apenas "quais métodos você tem que ter", sem fornecer nenhuma implementação de código.

**Em Python, não existe a palavra `interface`**.
Para nós, uma Interface é simplesmente uma **Classe Abstrata onde TODOS os métodos são abstratos**.

O conceito é o mesmo: garantir que diferentes classes tenham as mesmas capacidades (métodos), permitindo que o sistema confie que aquele objeto "sabe fazer aquilo".

Por exemplo, poderíamos ter uma "interface" `IDesenhavel`:

```python
class IDesenhavel(ABC): # O 'I' no começo é convenção para Interface
    @abstractmethod
    def desenhar(self):
        pass

# Agora qualquer classe que herdar de IDesenhavel TEM que saber se desenhar
```

---

## Aplicando Tudo: De Volta à Escola

Vamos consolidar os 4 pilares (Encapsulamento, Herança, Polimorfismo e Abstração) no nosso exemplo escolar.

Agora, `Pessoa` será uma classe abstrata, pois não faz sentido instanciar uma "Pessoa genérica" no nosso sistema escolar; ou é Aluno, ou é Professor.

```python
from abc import ABC, abstractmethod

# 1. ABSTRAÇÃO: Pessoa é um modelo, não pode ser criada diretamente
class Pessoa(ABC):
    def __init__(self, nome, cpf):
        self._nome = nome     # Protegido
        self.__cpf = cpf      # Privado (Encapsulamento)

    # 2. POLIMORFISMO: Define que TODA pessoa deve saber se apresentar,
    # mas deixa a implementação específica para as filhas.
    @abstractmethod
    def apresentar(self):
        pass

    # ENCAPSULAMENTO: Getter concreto (comportamento padrão herdado)
    def get_cpf_mascarado(self):
        return f"***.{self.__cpf[4:7]}.***-**"

# 3. HERANÇA: Professor É UMA Pessoa
class Professor(Pessoa):
    def __init__(self, nome, cpf, disciplina):
        super().__init__(nome, cpf)
        self.disciplina = disciplina
    
    # Implementação obrigatória do método abstrato
    def apresentar(self):
        print(f"Bom dia, sou o Professor {self._nome} de {self.disciplina}")

class Aluno(Pessoa):
    def __init__(self, nome, cpf, matricula):
        super().__init__(nome, cpf)
        self.matricula = matricula
    
    def apresentar(self):
        # Aqui não chamamos super().apresentar() pois a base é abstrata/vazia!
        print(f"Olá, sou o aluno {self._nome} (Matrícula: {self.matricula})")

# Testando o sistema
# p = Pessoa("Genérico", "000...") # Erro! Não pode instanciar classe abstrata

prof = Professor("Claudio", "123.456.789-00", "Matemática")
aluno = Aluno("João", "987.654.321-11", "2023001")

prof.apresentar()
# > Bom dia, sou o Professor Claudio de Matemática

aluno.apresentar()
# > Olá, sou o aluno João (Matrícula: 2023001)

print(f"CPF do Professor: {prof.get_cpf_mascarado()}")
# > CPF do Professor: ***.456.***-**
```
