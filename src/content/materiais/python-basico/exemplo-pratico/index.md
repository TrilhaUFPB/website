---
title: Exemplo Prático
description: 
category: Programação
order: 18
---

# Exemplo Prático: Monitor de Sistema

Bem-vindo ao exemplo prático! Neste guia, vamos construir **do zero** um Monitor de Sistema completo, aplicando todos os conceitos que aprendemos nas aulas anteriores.

> **Repositório do projeto**: Você pode acompanhar o código completo desta aula no repositório [System-Monitor](https://github.com/Marcus-Vin/System-Monitor).

## Sumário
- [O que vamos construir?](#o-que-vamos-construir)
- [Planejando antes de codar](#planejando-antes-de-codar)
- [Mão na massa: Iniciando o projeto](#mão-na-massa-iniciando-o-projeto)
- [Passo 1: Criando a estrutura de pacotes](#passo-1-criando-a-estrutura-de-pacotes)
- [Passo 2: A classe abstrata Metric](#passo-2-a-classe-abstrata-metric)
- [Passo 3: Implementando as métricas concretas](#passo-3-implementando-as-métricas-concretas)
- [Passo 4: O orquestrador SystemMonitor](#passo-4-o-orquestrador-systemmonitor)
- [Passo 5: A interface abstrata BaseUI](#passo-5-a-interface-abstrata-baseui)
- [Passo 6: Implementando as UIs concretas](#passo-6-implementando-as-uis-concretas)
- [Passo 7: Juntando tudo no main.py](#passo-7-juntando-tudo-no-mainpy)
- [Testando o projeto](#testando-o-projeto)
- [A mágica da POO: Extensibilidade](#a-mágica-da-poo-extensibilidade)

---

## O que vamos construir?

Vamos criar um **Monitor de Sistema** que exibe em tempo real informações sobre:
- **CPU**: percentual de uso e número de núcleos
- **Memória RAM**: uso percentual, total e quantidade usada
- **Disco**: espaço usado e disponível

O mais interessante é que nosso monitor terá **duas interfaces diferentes** (Streamlit e Gradio), mostrando como a POO permite trocar a "cara" do programa sem mexer na lógica interna!

Este projeto foi escolhido especificamente para demonstrar na prática os conceitos que estudamos:

| Conceito | Onde aparece no projeto |
|----------|------------------------|
| **Classes e Objetos** | Cada métrica é uma classe, cada instância monitora algo específico |
| **Herança** | Todas as métricas herdam de `Metric`, todas as UIs herdam de `BaseUI` |
| **Abstração** | `Metric` e `BaseUI` são classes abstratas que definem contratos |
| **Polimorfismo** | O monitor trata todas as métricas da mesma forma, a UI pode ser trocada |
| **Encapsulamento** | A UI não sabe como os dados são coletados, só usa `snapshot()` |
| **Bibliotecas** | Usamos `psutil` para coletar dados do sistema |
| **Frameworks** | Streamlit e Gradio cuidam da interface web |
| **Pacotes** | O código está organizado em `core/` e `ui/` |
| **Outras Ferramentas** | Utilizaremos o **uv** como gerenciador de dependências, ambientes virtuais e ferramenta para rodar o projeto |

---

## Planejando antes de codar

> Lembra do material de POO? Antes de sair escrevendo código, precisamos **pensar nas entidades** do nosso sistema!

Vamos mapear nosso problema:

### Quais são as "coisas" do nosso sistema?

1. **Métricas** - representam os dados que queremos coletar (CPU, RAM, Disco)
2. **Monitor** - orquestra a coleta de todas as métricas
3. **Interface** - exibe os dados para o usuário

### Como elas se relacionam?

![Estrutura do Projeto](image/exemplo_pratico/estrutura.png)

Perceba que:
- **Metric** é abstrata: não faz sentido criar uma "métrica genérica", só métricas específicas
- **SystemMonitor TEM métricas** (composição, não herança!)
- **BaseUI** é abstrata: define o que toda interface deve fazer, sem implementar
- Podemos ter **várias implementações de UI**, e o código principal não precisa mudar

---

## Mão na massa: Iniciando o projeto

Vamos usar o **uv** para criar nosso projeto. Lembra do material de Ferramentas Úteis?

### Criando o projeto

Abra o terminal e execute:

```bash
# Cria uma pasta para o projeto
mkdir exemplo-pratico
cd exemplo-pratico

# Inicializa o projeto com uv
uv init
```

O comando `uv init` cria a estrutura básica:
- `pyproject.toml` - configurações do projeto
- `.python-version` - versão do Python
- `main.py` - arquivo principal
- `.gitignore` - arquivos a ignorar no Git

### Instalando as dependências

Nosso projeto precisa de três bibliotecas externas:

```bash
# Biblioteca para coletar dados do sistema
uv add psutil

# Frameworks para interface web
uv add streamlit
uv add gradio
```

Lembra do material de **Bibliotecas**? O `psutil` é uma biblioteca externa que vamos usar para coletar informações do sistema operacional (CPU, memória, disco). Já o Streamlit e Gradio são **frameworks** - eles controlam o fluxo da aplicação e nós apenas definimos o que exibir.

Seu `pyproject.toml` ficará assim:

```toml
[project]
name = "exemplo-pratico"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "psutil>=7.2.1",
    "streamlit>=1.53.0",
    "gradio>=4.0.0",
]
```

---

## Passo 1: Criando a estrutura de pacotes

Lembra do material de **Bibliotecas** sobre pacotes? Um pacote é uma pasta com um arquivo `__init__.py`. Vamos organizar nosso código em dois pacotes:

```
exemplo-pratico/
├── core/               # Pacote com a lógica do monitor
│   ├── __init__.py
│   ├── monitor.py
│   └── metrics/        # Sub-pacote com as métricas
│       ├── __init__.py
│       ├── base.py
│       ├── cpu.py
│       ├── memory.py
│       └── disk.py
├── ui/                 # Pacote com as interfaces
│   ├── __init__.py
│   ├── base.py
│   ├── streamlit_ui.py
│   └── gradio_ui.py
├── main.py
└── pyproject.toml
```

Crie as pastas e arquivos:

```bash
# Cria a estrutura de pastas
mkdir core
mkdir core/metrics
mkdir ui

# Cria os arquivos __init__.py (podem ficar vazios por enquanto)
# No Windows PowerShell:
New-Item core/__init__.py
New-Item core/metrics/__init__.py
New-Item ui/__init__.py
```

> **Por que essa organização?** Separamos a **lógica** (`core/`) da **apresentação** (`ui/`). Se amanhã quisermos criar uma interface de terminal ou mobile, só precisamos adicionar um novo arquivo em `ui/` sem tocar no `core/`.

---

## Passo 2: A classe abstrata Metric

Agora vamos ao código! Começamos pela **classe abstrata** `Metric`.

Lembra do material de **POO** sobre classes abstratas? Elas definem um **contrato** - dizem O QUE as classes filhas devem fazer, mas não COMO fazer.

Crie o arquivo `core/metrics/base.py`:

```python
from abc import ABC, abstractmethod


class Metric(ABC):
    """Classe abstrata base para todas as métricas."""
    
    @abstractmethod
    def collect(self) -> dict:
        """
        Coleta os dados da métrica.
        
        Returns:
            dict: Dicionário com os dados coletados da métrica específica.
        """
        pass
```

**O que está acontecendo aqui?**

1. `from abc import ABC, abstractmethod` - Importamos as ferramentas para criar classes abstratas
2. `class Metric(ABC)` - Nossa classe herda de `ABC`, tornando-a abstrata
3. `@abstractmethod` - Este decorador marca que o método `collect()` é obrigatório
4. `def collect(self) -> dict` - Toda métrica DEVE implementar este método

> **Lembre-se**: Você não pode criar um objeto de `Metric` diretamente! Tente rodar `Metric()` e verá um erro. Isso é proposital - não faz sentido ter uma "métrica genérica".

---

## Passo 3: Implementando as métricas concretas

Agora vamos criar as métricas reais que herdam de `Metric`.

### CPUMetric

Crie o arquivo `core/metrics/cpu.py`:

```python
import psutil
from .base import Metric


class CPUMetric(Metric):
    """Métrica de CPU."""
    
    def collect(self) -> dict:
        """
        Coleta dados de CPU.
        
        Returns:
            dict: {"percent": float, "cores": int}
        """
        return {
            "percent": psutil.cpu_percent(interval=0.1),
            "cores": psutil.cpu_count()
        }
```

**O que está acontecendo?**

1. `import psutil` - Usamos a biblioteca externa que instalamos
2. `from .base import Metric` - O ponto (`.`) significa "deste mesmo pacote"
3. `class CPUMetric(Metric)` - CPUMetric **herda** de Metric (é uma relação "É UM")
4. `def collect(self)` - **Implementamos** o método abstrato (se não fizéssemos isso, teríamos erro!)

Veja como o `psutil` facilita nossa vida: `psutil.cpu_percent()` retorna o uso atual da CPU, e `psutil.cpu_count()` retorna o número de núcleos. Não precisamos saber como o sistema operacional fornece essas informações!

### DiskMetric

Crie o arquivo `core/metrics/disk.py`:

```python
import psutil
from .base import Metric


class DiskMetric(Metric):
    """Métrica de Disco."""
    
    def __init__(self, path: str = "/"):
        """
        Inicializa a métrica de disco.
        
        Args:
            path: Caminho do disco a monitorar.
        """
        self.path = path
    
    def collect(self) -> dict:
        """
        Coleta dados de disco.
        
        Returns:
            dict: {"percent": float, "path": str, "total_gb": float, "used_gb": float}
        """
        disk = psutil.disk_usage(self.path)
        
        # Convertendo bytes para gigabytes
        bytes_to_gb = 1024 ** 3
        
        return {
            "percent": disk.percent,
            "path": self.path,
            "total_gb": round(disk.total / bytes_to_gb, 2),
            "used_gb": round(disk.used / bytes_to_gb, 2)
        }
```

**Novidade aqui**: `DiskMetric` tem um **construtor** (`__init__`) próprio! Lembra do material de POO? O construtor é chamado quando criamos o objeto. Aqui, permitimos escolher qual disco monitorar (padrão é `/` no Linux ou `C:\` no Windows).

### MemoryMetric

Crie o arquivo `core/metrics/memory.py`:

```python
import psutil
from .base import Metric


class MemoryMetric(Metric):
    """Métrica de Memória RAM."""
    
    def collect(self) -> dict:
        """
        Coleta dados de memória.
        
        Returns:
            dict: {"percent": float, "total_gb": float, "used_gb": float}
        """
        memory = psutil.virtual_memory()
        
        # Convertendo bytes para gigabytes
        bytes_to_gb = 1024 ** 3
        
        return {
            "percent": memory.percent,
            "total_gb": round(memory.total / bytes_to_gb, 2),
            "used_gb": round(memory.used / bytes_to_gb, 2)
        }
```

Perceba como seguimos o mesmo padrão das outras métricas: herda de `Metric` e implementa `collect()`.

### Sobre o \_\_init\_\_.py do pacote metrics

Por enquanto, o arquivo `core/metrics/__init__.py` pode ficar vazio. Ele só precisa existir para que a pasta seja reconhecida como um pacote Python.

> **Nota**: Lembra do material de **Bibliotecas**? Em projetos maiores, você pode configurar o `__init__.py` para exportar classes e permitir imports mais limpos. Neste projeto, vamos importar diretamente dos módulos (ex: `from .metrics.cpu import CPUMetric`).

---

## Passo 4: O orquestrador SystemMonitor

Agora vamos criar a classe que **orquestra** todas as métricas. Aqui entra o conceito de **composição**.

Crie o arquivo `core/monitor.py`:

```python
from datetime import datetime
from .metrics.cpu import CPUMetric
from .metrics.memory import MemoryMetric
from .metrics.disk import DiskMetric


class SystemMonitor:
    """Orquestrador das métricas do sistema."""
    
    def __init__(self, disk_path: str = None):
        """
        Inicializa o monitor com todas as métricas.
        
        Args:
            disk_path: Caminho do disco a monitorar (opcional).
                      Se não informado, usa o padrão do sistema.
        """
        self._cpu_metric = CPUMetric()
        self._memory_metric = MemoryMetric()
        self._disk_metric = DiskMetric() if disk_path is None else DiskMetric(path=disk_path)
    
    def snapshot(self) -> dict:
        """
        Captura um instantâneo completo do sistema.
        
        Returns:
            dict: Dicionário com todos os dados do sistema neste momento.
        """
        # Coleta dados de cada métrica
        cpu_data = self._cpu_metric.collect()
        memory_data = self._memory_metric.collect()
        disk_data = self._disk_metric.collect()
        
        # Monta e retorna o dicionário unificado
        return {
            "cpu": cpu_data,
            "ram": memory_data,
            "disk": disk_data,
            "timestamp": datetime.now()
        }
```

> **Observe**: Note que já incluímos a `MemoryMetric` que criamos no passo anterior, junto com as outras métricas.

**Conceitos importantes aqui:**

1. **Composição**: `SystemMonitor` **TEM** métricas, não **É** uma métrica. Essa é a diferença entre composição e herança. Use herança quando há uma relação "é um" (CPUMetric É UMA Metric). Use composição quando há uma relação "tem um" (Monitor TEM métricas).

2. **Encapsulamento**: Os atributos `_cpu_metric`, `_memory_metric` e `_disk_metric` começam com `_`, indicando que são "protegidos" (lembra do material de POO?). A UI não precisa acessá-los diretamente - usa apenas `snapshot()`.

3. **Interface simples**: A UI só precisa chamar `snapshot()` para obter todos os dados. Não precisa saber que existem classes separadas para cada métrica.

### Sobre o \_\_init\_\_.py do core

Assim como o `__init__.py` do pacote metrics, o arquivo `core/__init__.py` pode ficar vazio por enquanto. O importante é que ele exista para que a pasta seja reconhecida como um pacote Python.

---

## Passo 5: A interface abstrata BaseUI

Assim como criamos uma classe abstrata para as métricas, vamos criar uma para as interfaces!

Crie o arquivo `ui/base.py`:

```python
from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseUI(ABC):
    """Interface base para implementações de UI."""

    @abstractmethod
    def adicionar_metrica(self, nome: str, dados: Dict[str, Any]) -> None:
        """Adiciona uma métrica para ser exibida.
        
        Args:
            nome: Nome identificador da métrica (ex: "CPU", "Memória")
            dados: Dicionário com os dados da métrica
                   (ex: {"uso_percentual": 45.2, "cores": 8})
        """
        pass

    @abstractmethod
    def limpar_metricas(self) -> None:
        """Limpa todas as métricas armazenadas."""
        pass

    @abstractmethod
    def exibir(self) -> None:
        """Renderiza todas as métricas na tela."""
        pass
```

Perceba o padrão: `BaseUI` define **O QUE** toda interface deve fazer:
- Adicionar métricas
- Limpar métricas
- Exibir na tela

Mas não define **COMO** fazer. Isso fica para as implementações concretas!

---

## Passo 6: Implementando as UIs concretas

Agora vamos implementar as interfaces concretas. O foco aqui não é aprender a sintaxe específica de cada framework, mas sim entender como a **POO permite trocar implementações** sem alterar o resto do código.

> **Código completo**: Você pode ver a implementação detalhada de cada UI no [repositório do projeto](https://github.com/Marcus-Vin/System-Monitor).

### StreamlitUI

Crie o arquivo `ui/streamlit_ui.py`. A estrutura básica da classe:

```python
import streamlit as st
from ui.base import BaseUI


class StreamlitUI(BaseUI):
    """Implementação de UI usando Streamlit."""

    def __init__(self):
        # Configuração inicial do Streamlit
        ...

    def adicionar_metrica(self, nome: str, dados: Dict[str, Any]) -> None:
        """Adiciona uma métrica para ser exibida."""
        ...

    def limpar_metricas(self) -> None:
        """Limpa todas as métricas armazenadas."""
        ...

    def set_atualizar_callback(self, callback: Callable) -> None:
        """Define função a ser chamada para atualizar as métricas."""
        ...

    def exibir(self) -> None:
        """Renderiza todas as métricas na tela."""
        # Usa componentes do Streamlit: st.title(), st.metric(), st.progress()
        # Atualiza automaticamente a cada 2 segundos com st.rerun()
        ...

    def _renderizar_metrica(self, nome: str, dados: Dict[str, Any]) -> None:
        """Renderiza uma métrica individual."""
        ...
```

**Observe**: O Streamlit é um **framework** - ele controla o fluxo da aplicação. Nós só dizemos "exiba isso" e ele cuida do resto. Lembra do material de **Frameworks**? É a inversão de controle em ação!

### GradioUI

Crie o arquivo `ui/gradio_ui.py`. A estrutura básica da classe:

```python
import gradio as gr
from ui.base import BaseUI


class GradioUI(BaseUI):
    """Implementação de UI usando Gradio."""

    def __init__(self):
        # Inicializa dicionário de métricas e callback
        ...

    def adicionar_metrica(self, nome: str, dados: Dict[str, Any]) -> None:
        """Adiciona uma métrica para ser exibida."""
        ...

    def limpar_metricas(self) -> None:
        """Limpa todas as métricas armazenadas."""
        ...

    def set_atualizar_callback(self, callback: Callable) -> None:
        """Define função a ser chamada para atualizar as métricas."""
        ...

    def exibir(self) -> None:
        """Renderiza a interface Gradio."""
        # Usa gr.Blocks() para criar a interface
        # Configura botão de atualização e timer automático
        # Chama demo.launch() para iniciar o servidor
        ...

    def _gerar_html(self) -> str:
        """Gera HTML formatado com as métricas atuais."""
        ...

    def _cor_percentual(self, valor: float) -> str:
        """Retorna cor baseada no percentual (verde -> amarelo -> vermelho)."""
        ...
```

**Polimorfismo em ação!** Tanto `StreamlitUI` quanto `GradioUI`:
- Herdam de `BaseUI`
- Implementam os mesmos métodos (`adicionar_metrica`, `limpar_metricas`, `exibir`)
- Mas fazem de formas completamente diferentes!

---

## Passo 7: Juntando tudo no main.py

Finalmente, vamos criar o arquivo principal que conecta tudo:

```python
from ui.base import BaseUI
from ui.streamlit_ui import StreamlitUI
from ui.gradio_ui import GradioUI

from core.monitor import SystemMonitor

def atualizar_metricas(Monitor: SystemMonitor, UI: BaseUI):
    snapshot = Monitor.snapshot()
    UI.adicionar_metrica("CPU", snapshot["cpu"])
    UI.adicionar_metrica("Memória", snapshot["ram"])
    UI.adicionar_metrica("Disco", snapshot["disk"])

# Inicializa o Monitor
monitor = SystemMonitor()

# Inicializa a UI
# ui = StreamlitUI()
ui = GradioUI()

# Insere função de atualização de métricas na UI
ui.set_atualizar_callback(lambda: atualizar_metricas(monitor, ui))

# Exibe a UI
ui.exibir()
```

**Observe a beleza da POO:**

1. A função `atualizar_metricas` recebe um `SystemMonitor` e uma `BaseUI` - não importa qual implementação específica!
2. Para trocar de Gradio para Streamlit, basta mudar **uma linha**: descomente `StreamlitUI()` e comente `GradioUI()`
3. O `monitor.snapshot()` retorna todos os dados, e a UI só precisa exibi-los

---

## Testando o projeto

### Rodando com Gradio

```bash
uv run python main.py
```

### Rodando com Streamlit

Altere o `main.py` para usar `StreamlitUI()`:

```python
ui = StreamlitUI()
# ui = GradioUI()
```

E execute:

```bash
uv run streamlit run main.py
```

---

## A mágica da POO: Extensibilidade

Agora vamos refletir sobre o poder real da POO na prática.

### E se precisássemos adicionar uma nova métrica?

Imagine que agora você quer monitorar a **temperatura da CPU** ou a **bateria do notebook**. Com nossa arquitetura orientada a objetos, isso é **incrivelmente simples**:

1. **Criar a nova métrica**: Basta criar um novo arquivo (ex: `core/metrics/battery.py`) que herda de `Metric` e implementa `collect()`
2. **Adicionar ao monitor**: Importar e instanciar no `SystemMonitor`
3. **Exibir na UI**: Adicionar uma linha no `main.py`

A UI nem precisa saber que existe uma nova métrica - ela já sabe exibir qualquer dicionário que receber!

### Por que isso funciona tão bem?

1. **Herança**: Toda nova métrica herda de `Metric`, então sabemos que tem `collect()`
2. **Abstração**: A classe abstrata `Metric` garantiu uma interface consistente
3. **Encapsulamento**: A UI não precisa saber como os dados são coletados
4. **Polimorfismo**: O monitor trata todas as métricas da mesma forma

Imagine se tivéssemos escrito tudo sem POO, com funções soltas e variáveis globais... Adicionar funcionalidades seria **muito mais trabalhoso e arriscado**!

---

## Conclusão

Parabéns! Você construiu um projeto real aplicando todos os conceitos estudados. O mais importante não é memorizar sintaxe, mas entender **por que** organizamos o código dessa forma:

- **POO** nos deu uma estrutura clara e extensível
- **Bibliotecas** nos pouparam de reinventar a roda
- **Frameworks** cuidaram de toda a complexidade da interface web
- **Pacotes** mantiveram nosso código organizado

Da próxima vez que precisar adicionar uma funcionalidade, lembre-se: com uma boa arquitetura, mudanças são simples e seguras!

> **Desafio**: Tente adicionar uma nova métrica (temperatura da CPU? bateria do notebook?) ou uma nova interface (terminal? API REST?). Se seguir os padrões que criamos, será muito mais fácil do que você imagina!
