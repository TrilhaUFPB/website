---
title: Git e Controle de Versão
description: Aprenda a versionar seu código e colaborar com outros desenvolvedores
category: Ferramentas
order: 3
---

# Git e Controle de Versão

O Git é uma ferramenta essencial para qualquer desenvolvedor. Ele permite versionar seu código e colaborar com outras pessoas de forma eficiente.

## O que é Controle de Versão?

Controle de versão é um sistema que registra alterações em arquivos ao longo do tempo. Com ele, você pode:

- **Voltar no tempo**: Recuperar versões anteriores do seu código
- **Trabalhar em equipe**: Múltiplas pessoas podem trabalhar no mesmo projeto
- **Experimentar**: Criar "branches" para testar novas funcionalidades
- **Documentar**: Histórico completo de todas as mudanças

### Assista uma introdução ao Git

[https://youtu.be/59Z6G31k5Qs?si=IxSV4yd-Iwy_L1SE](https://youtu.be/59Z6G31k5Qs?si=IxSV4yd-Iwy_L1SE)

## Instalando o Git

### Windows

```bash
# Baixe o instalador em https://git-scm.com
# Execute o instalador e siga as instruções
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

### macOS

```bash
# Com Homebrew
brew install git
```

### Verificando a Instalação

```bash
git --version
# Deve mostrar algo como: git version 2.40.0
```

## Configuração Inicial

Antes de começar, configure seu nome e email:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

## Conceitos Fundamentais

### Repositório

Um repositório (ou "repo") é uma pasta que o Git monitora. Ele contém todos os arquivos do projeto e o histórico de alterações.

### Commit

Um commit é um "snapshot" do seu projeto em um momento específico. É como salvar o jogo!

### Branch

Uma branch é uma linha independente de desenvolvimento. Permite trabalhar em features sem afetar o código principal.

### Remote

Um remote é uma versão do seu repositório hospedada em algum lugar (como GitHub, GitLab, etc).

## Comandos Essenciais

### Iniciando um Repositório

```bash
# Criar novo repositório
git init

# Ou clonar um existente
git clone https://github.com/usuario/repositorio.git
```

### Fluxo Básico de Trabalho

```bash
# 1. Verificar status dos arquivos
git status

# 2. Adicionar arquivos para o commit
git add arquivo.py          # Adiciona arquivo específico
git add .                   # Adiciona todos os arquivos

# 3. Criar o commit
git commit -m "Mensagem descrevendo as alterações"

# 4. Enviar para o repositório remoto
git push origin main
```

### Trabalhando com Branches

```bash
# Criar nova branch
git branch nome-da-branch

# Mudar para outra branch
git checkout nome-da-branch

# Criar e mudar em um comando
git checkout -b nova-branch

# Listar branches
git branch

# Mesclar branch na atual
git merge nome-da-branch
```

### Atualizando seu Código

```bash
# Baixar alterações do remoto
git fetch

# Baixar e mesclar alterações
git pull origin main
```

## Boas Práticas

### Commits Atômicos

Cada commit deve representar uma única alteração lógica:

```bash
# ✅ Bom
git commit -m "Adiciona validação de email no formulário"

# ❌ Ruim
git commit -m "Várias alterações"
```

### Mensagens de Commit

Escreva mensagens claras e descritivas:

| Tipo | Uso |
|------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `style:` | Formatação |
| `refactor:` | Refatoração de código |
| `test:` | Testes |

Exemplo:

```bash
git commit -m "feat: adiciona sistema de login com OAuth"
```

### Branches Organizadas

Use um padrão de nomenclatura:

- `feature/nome-da-feature` - Para novas funcionalidades
- `bugfix/descricao-do-bug` - Para correções
- `hotfix/correcao-urgente` - Para correções urgentes

## GitHub

O GitHub é a plataforma mais popular para hospedar repositórios Git.

### Criando um Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Preencha o nome e descrição
4. Clique em "Create repository"

### Conectando seu Repositório Local

```bash
# Adicionar remote
git remote add origin https://github.com/seu-usuario/seu-repo.git

# Enviar código
git push -u origin main
```

### Pull Requests

Pull Requests (PRs) são a forma de propor alterações em projetos:

1. Crie uma branch para sua feature
2. Faça seus commits
3. Faça push da branch
4. Abra um Pull Request no GitHub
5. Aguarde revisão e aprovação
6. Faça merge

## Resolvendo Conflitos

Conflitos acontecem quando duas pessoas alteram o mesmo trecho de código:

```bash
# Exemplo de conflito
<<<<<<< HEAD
código da sua branch
=======
código da outra branch
>>>>>>> outra-branch
```

Para resolver:

1. Edite o arquivo manualmente
2. Remova os marcadores de conflito
3. Adicione e commite a resolução

```bash
git add arquivo-com-conflito.py
git commit -m "Resolve conflito no arquivo"
```

## Comandos Úteis

```bash
# Ver histórico de commits
git log

# Ver histórico resumido
git log --oneline

# Desfazer alterações não commitadas
git checkout -- arquivo.py

# Reverter último commit (mantendo alterações)
git reset --soft HEAD~1

# Ver diferenças
git diff

# Guardar alterações temporariamente
git stash

# Recuperar alterações guardadas
git stash pop
```

## Exercício Prático

1. Crie uma conta no GitHub
2. Crie um novo repositório
3. Clone o repositório no seu computador
4. Crie um arquivo README.md
5. Faça commit e push
6. Verifique no GitHub se o arquivo apareceu

---

**Dica:** O Git parece complicado no início, mas com a prática se torna natural. Use-o em todos os seus projetos, mesmo os pequenos!
