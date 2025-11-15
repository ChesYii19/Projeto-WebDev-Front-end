# Rick and Morty API Client

## Descrição do Projeto

Este é um projeto de **Web Development Front-End** desenvolvido com **HTML, CSS e JavaScript puro**, conforme requisitos da disciplina. A aplicação consome dados da **Rick and Morty API** (https://rickandmortyapi.com/) e exibe personagens em cards dinâmicos.

## Estrutura do Projeto

```
rick-and-morty-client/
├── index.html              # Página HTML principal
├── styles.css              # Estilos CSS puro (tema escuro/claro)
├── script.js               # JavaScript puro - Lógica da aplicação
├── DOCUMENTO_TEORICO.pdf   # Documentação teórica (3 páginas)
├── DOCUMENTO_TEORICO.md    # Versão Markdown da documentação
├── ROTEIRO_VIDEO_PITCH.md  # Roteiro para vídeo pitch (até 4 min)
└── README.md               # Este arquivo
```

## Requisitos Atendidos

### 1. Parte Prática (4,0 pontos)

- ✅ **Interface HTML + CSS puro** - Sem frameworks, apenas HTML semântico e CSS vanilla
- ✅ **Consumo da API via JavaScript** - Usando `fetch()` e `async/await`
- ✅ **Cards dinâmicos** - Criados com `document.createElement()` e `appendChild()`
- ✅ **Informações dos personagens:**
  - Nome
  - Imagem
  - Status (Vivo, Morto, Desconhecido)
  - Gênero
  - Espécie
  - Localização
- ✅ **Layout organizado e responsivo** - Grid CSS, tema Rick and Morty
- ✅ **Filtros por status** - Dropdown funcional
- ✅ **Paginação** - Botões Anterior/Próxima
- ✅ **Tema claro/escuro** - Alternância com localStorage
- ✅ **Estados de carregamento e erro** - Spinner e mensagens

### 2. Parte Teórica (2,0 pontos)

- ✅ **DOCUMENTO_TEORICO.pdf** - 3 páginas cobrindo:
  - O que é uma API e consumo de dados em tempo real
  - Conceito de DOM manipulation
  - Funções básicas (fetch, createElement, appendChild)
  - Motivo da escolha da API Rick and Morty
  - Regras de acesso e estrutura de resposta

### 3. Vídeo Pitch (2,0 pontos)

- ✅ **ROTEIRO_VIDEO_PITCH.md** - Roteiro detalhado com:
  - Apresentação do projeto funcionando
  - Demonstração técnica (consumo da API)
  - Explicação do código
  - Validação de criação dinâmica de cards

## Como Usar

### Opção 1: Abrir Localmente

1. Baixe os arquivos do projeto
2. Abra `index.html` em um navegador moderno (Chrome, Firefox, Safari, Edge)
3. A aplicação carregará automaticamente os personagens da API

### Opção 2: Servir com um Servidor Local

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

Acesse `http://localhost:8000` no navegador.

## Funcionalidades

### 1. Carregamento de Personagens
- Busca 20 personagens por página da API Rick and Morty
- Exibe em um grid responsivo com 3 colunas (desktop)

### 2. Filtros
- **Status:** Todos, Vivo, Morto, Desconhecido
- **Botão Limpar Filtros:** Reseta os filtros aplicados

### 3. Paginação
- Botões "Anterior" e "Próxima"
- Indicador de página atual
- Total de 42 páginas disponíveis

### 4. Tema Claro/Escuro
- Botão no header para alternar entre temas
- Preferência salva no localStorage
- Cores otimizadas para ambos os temas

### 5. Design Responsivo
- Desktop: Grid de 3 colunas
- Tablet: Grid de 2 colunas
- Mobile: Grid de 1 coluna
- Totalmente responsivo

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com variáveis CSS, Grid, Flexbox
- **JavaScript ES6+** - Fetch API, async/await, DOM Manipulation
- **API Rick and Morty** - Fonte de dados pública

## Estrutura do Código JavaScript

### Funções Principais

```javascript
// Consumo da API
async function fetchCharacters(page = 1) { }

// Criação de cards dinâmicos
function createCharacterCard(character) { }

// Renderização no DOM
function renderCharacters(characters) { }

// Filtros
function filterByStatus(characters, status) { }

// Tema
function applyTheme(theme) { }
function toggleTheme() { }
```

## Documentação da API

A API utilizada é a **Rick and Morty API** (https://rickandmortyapi.com/)

### Endpoint utilizado
```
GET https://rickandmortyapi.com/api/character?page=1
```

### Resposta esperada
```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "gender": "Male",
      "image": "https://...",
      "location": { "name": "Citadel of Ricks" }
    },
    ...
  ]
}
```

## Validação de Requisitos

### ✅ HTML, CSS e JavaScript Puro
- Sem frameworks (React, Vue, Angular)
- Sem bibliotecas externas
- Apenas JavaScript vanilla

### ✅ Consumo Dinâmico da API
- `fetch()` para requisições HTTP
- `async/await` para tratamento de Promises
- Dados carregados em tempo real

### ✅ Criação Dinâmica de Cards
- `document.createElement()` para criar elementos
- `appendChild()` para injetar no DOM
- **Nenhum card é estático no HTML**

### ✅ Design Responsivo
- Media queries para diferentes tamanhos
- Grid CSS adaptável
- Funciona em desktop, tablet e mobile

## Navegadores Suportados

- Chrome/Chromium (versão 60+)
- Firefox (versão 55+)
- Safari (versão 11+)
- Edge (versão 79+)

## Autor

Desenvolvido como projeto de Web Development Front-End

## Licença

Este projeto utiliza dados da Rick and Morty API, que é de acesso público.

---

**Data de Entrega:** Novembro de 2024
