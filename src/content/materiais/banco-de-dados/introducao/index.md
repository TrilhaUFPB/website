---
title: Introdução
description: O que é e para que serve um banco de dados
category: Banco de Dados
order: 1
---

![Imagem 1](images/imagem1.jpeg)

## O que é e para que serve banco de dados?

Imagine que você está criando uma aplicação que tem como feature um chat com diferentes usuários, tal qual uma OLX ou Whatsapp. Essa aplicação precisa armazenar de alguma forma as mensagens trocadas entre os usuários de forma assíncrona e estruturada, guardando informações como: horário de envio, remetente, destinatário, conteúdo da mensagem etc. Agora imagina  que esse chat é utilizado por N pessoas ao mesmo tempo, e todas as mensagens devem ser salvas e acessadas ao mesmo tempo. Imagine também que a sua aplicação roda em diferentes servidores, cada um com sua própria memória principal e arquivos não sincronizados. Seria um caos tentar atualizar todos os servidores de forma simultanea correto? Dai que entram os bancos de dados.

**Banco de dados** é basicamente um sistema organizado para armazenar, gerenciar e recuperar informações de forma eficiente e segura.

> *"Banco de dados é o nome dado a uma coleção de informações (dados) armazenadas digitalmente, e é uma das bases de um sistema que coleta, armazena, gerencia e protege informações de diferentes tipos. (IBM)."*

Pensa no seguinte: se você tem uma aplicação qualquer no celular, onde fica salvo tudo que você interage naquele aplicativo? Se você fecha o app e abre de novo, como ele lembra de tudo? É o banco de dados que é responsável por salvar tais informações.

### Para que serve?

Um banco de dados serve para:
- **Armazenar dados de forma persistente**: diferente da memória do seu computador, os dados não se perdem quando você desliga o sistema ou finaliza um programa
- **Organizar informações**: facilita encontrar o dado que você procura (tipo buscar "Trilha" num conjunto de 5000 organizações diferentes)
- **Permitir acesso simultâneo**: várias pessoas podem acessar e modificar dados ao mesmo tempo sem quebrar tudo
- **Garantir integridade**: evita que dados fiquem inconsistentes ou corrompidos
- **Dar segurança**: controla quem pode ver ou modificar cada informação

### Dados vs Informação

![Imagem 2](images/imagem2.jpg)

Tem uma diferença sutil mas importante aqui:
- **Dados** Dados referem-se a qualquer informação capturada e armazenada sobre uma pessoa, um lugar, uma coisa ou um objeto, chamada de entidade, bem como os atributos dessa entidade. Por exemplo, se você estiver capturando e armazenando informações sobre restaurantes locais, cada restaurante será uma entidade, e o nome dele, o endereço e o horário comercial são atributos dessa entidade. Todas as informações coletadas e armazenadas sobre seus restaurantes favoritos são dados. São os valores brutos: "Davi", "22", "davi@email.com"
- **Informação** é quando você dá contexto e significado a estes dados: "Davi tem 22 anos e seu email é davi@email.com"

>O banco de dados armazena dados, mas é você quem transforma eles em informação útil através de consultas e análises.

---

## Por que não usar arquivos ou memória?

![Imagem 3](images/imagem3.png)

É comum pessoas que não utilizam bancos de dados salvarem tudo em arquivos txt, csv ou até em memória com variáveis, estruturas de dados etc. Parece funcionar no começo, mas pode virar um pesadelo quando o sistema cresce.

### Problema 1: Salvando em Memória

Quando você roda um programa Python, pode criar variáveis e listas para guardar dados temporariamente:

```python
# Salvando usuários em memória
usuarios = []
usuarios.append({"nome": "Ana", "email": "ana@email.com"})
usuarios.append({"nome": "Clara", "email": "clara@email.com"})

print(usuarios)  
```

**O problema?** Assim que você fecha o programa, TUDO se perde! A memória RAM é volátil - quando o computador desliga ou o programa fecha todos os dados desaparecem como mágica.

Imagine a aplicação que você está criando com o chat wmbutido que perde todas as mensagens toda vez que o servidor reinicia. Seria um desastre!

---

### Problema 2: Salvando em Arquivos (TXT, JSON, CSV)

Outra abordagem seria savar esses dados em arquivos que persistem mesmo que seu programa reinicie:

```python
import json

# Salvando em arquivo JSON
usuarios = [
    {"nome": "Daniel", "email": "daniel@email.com"},
    {"nome": "Guilherme", "email": "guilherme@email.com"}
]

with open('usuarios.json', 'w') as f:
    json.dump(usuarios, f)
```

Isso resolve o problema da persistência! Mas surgem OUTROS problemas:

#### Limitações dos arquivos:

1. **Performance horrível com grandes volumes**
   - Para buscar um usuário específico entre 1 milhão, você precisa ler o arquivo INTEIRO
   - Quanto maior o arquivo mais lento fica

2. **Problema de concorrência**
   - Se 2 pessoas tentarem editar o arquivo ao mesmo tempo, um pode sobrescrever as mudanças do outro
   - O arquivo pode corromper

3. **Integridade dos dados**
   - Não há controle nos dados escritos
   - Nada impede você de salvar um email inválido como "abc123"
   - Nada garante que não vão ter 2 usuários com o mesmo cpf

5. **Falta de segurança**
   - Qualquer um com acesso ao arquivo consegue ler tudo
   - Não tem controle de quem pode fazer o quê

6. **Complexidade nos relacionamentos**
   - E se um usuário tiver vários endereços?
   - E se quiser relacionar usuários com pedidos?
   - Você teria que gerenciar tudo na mão

---

### Comparação: Memória vs Arquivo vs Banco de Dados

| Característica | Memória | Arquivo | Banco de Dados |
|---------------|---------|---------|----------------|
| **Persistência** | ❌ Perde tudo ao fechar | ✅ Persiste | ✅ Persiste |
| **Velocidade** | ⚡⚡⚡ Super rápido | ⚡ Lento em grandes volumes | ⚡⚡ Rápido (com índices) |
| **Concorrência** | ❌ Um processo por vez | ❌ Conflitos e corrupção | ✅ Múltiplos acessos simultâneos |
| **Busca complexa** | ❌ Tem que iterar tudo | ❌ Tem que ler tudo | ✅ Queries otimizadas |
| **Integridade** | ❌ Nenhuma garantia | ❌ Nenhuma garantia | ✅ Validações e constraints |
| **Relacionamentos** | ❌ Manual | ❌ Manual | ✅ Suporte nativo (chaves) |
| **Segurança** | ❌ Sem controle | ❌ Controle básico de arquivo | ✅ Permissões granulares |
| **Backup/Recuperação** | ❌ Impossível | ⚠️ Manual | ✅ Ferramentas específicas |

---

## Quando usar Banco de Dados?

Use banco de dados quando você tiver um ou mais desses cenários:

✅ **Sistema com múltiplos usuários simultâneos**
- Exemplo: rede social, sistema de vendas etc

✅ **Grande volume de dados**
- Milhares ou milhões de registros
- Precisa buscar/filtrar rapidamente

✅ **Necessidade de buscas complexas**
- "Mostre todos os produtos da categoria X, com preço entre Y e Z, em estoque, ordenados por popularidade"

✅ **Relações entre dados**
- Clientes têm pedidos, pedidos têm produtos, produtos têm categorias...

✅ **Necessidade de segurança**
- Controlar quem acessa o quê
- Registrar quem fez cada mudança

✅ **Backup e recuperação**
- Precisa garantir que os dados não se percam

Por outro lado, você **pode** usar arquivos simples se:
- É um projeto pequeno e pessoal
- Tem poucos dados (centenas de registros, no máximo)
- Apenas 1 pessoa/processo acessa por vez
- Não tem requisitos de segurança ou integridade críticos