/**
 * Rick and Morty API Client
 * Aplicação para consumir dados da API Rick and Morty e exibir personagens dinamicamente
 * 
 * Requisitos atendidos:
 * - HTML, CSS e JavaScript puro (sem frameworks)
 * - Consumo da API via fetch
 * - Criação dinâmica de cards com createElement e appendChild
 * - Filtros por status
 * - Paginação
 * - Tema claro/escuro
 */

// ============================================
// CONFIGURAÇÕES E CONSTANTES
// ============================================

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';
const CHARACTERS_PER_PAGE = 20;
const THEME_STORAGE_KEY = 'rick-morty-theme';

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================

let currentPage = 1;
let totalPages = 1;
let allCharacters = [];
let filteredCharacters = [];
let selectedStatus = '';

// ============================================
// ELEMENTOS DO DOM
// ============================================

const charactersGrid = document.getElementById('characters-grid');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const pageInfo = document.getElementById('page-info');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const statusFilter = document.getElementById('status-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// ============================================
// FUNÇÕES DE FETCH E API
// ============================================

/**
 * Busca personagens da API Rick and Morty
 * Demonstra o uso de fetch() e async/await para consumir dados em tempo real
 * 
 * @param {number} page - Número da página a buscar
 * @returns {Promise<Object>} Dados da resposta da API
 */
async function fetchCharacters(page = 1) {
    try {
        showLoading(true);
        hideError();

        const url = `${API_BASE_URL}?page=${page}`;
        console.log(`Buscando dados da API: ${url}`);

        // Fetch realiza a requisição HTTP GET para a API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }

        // Converte a resposta JSON
        const data = await response.json();
        console.log('Dados recebidos da API:', data);

        totalPages = data.info.pages;
        return data;
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        showError(`Erro ao carregar personagens: ${error.message}`);
        throw error;
    } finally {
        showLoading(false);
    }
}

// ============================================
// FUNÇÕES DE MANIPULAÇÃO DO DOM
// ============================================

/**
 * Cria um elemento de card de personagem dinamicamente
 * Demonstra o uso de createElement() para criar elementos HTML via JavaScript
 * 
 * @param {Object} character - Objeto do personagem da API
 * @returns {HTMLElement} Elemento do card criado dinamicamente
 */
function createCharacterCard(character) {
    // Criar container do card usando createElement
    const card = document.createElement('div');
    card.className = 'character-card';

    // Criar imagem
    const image = document.createElement('img');
    image.className = 'character-image';
    image.src = character.image;
    image.alt = character.name;
    image.loading = 'lazy';

    // Criar container de informações
    const info = document.createElement('div');
    info.className = 'character-info';

    // Criar nome
    const name = document.createElement('h3');
    name.className = 'character-name';
    name.textContent = character.name;

    // Criar status com indicador visual
    const statusContainer = document.createElement('div');
    statusContainer.className = 'character-status';

    const statusIndicator = document.createElement('span');
    statusIndicator.className = `status-indicator status-${character.status.toLowerCase()}`;

    const statusText = document.createElement('span');
    statusText.textContent = `${character.status} - ${character.gender}`;

    statusContainer.appendChild(statusIndicator);
    statusContainer.appendChild(statusText);

    // Criar espécie
    const species = document.createElement('p');
    species.className = 'character-species';
    species.textContent = `Espécie: ${character.species}`;

    // Criar localização
    const location = document.createElement('p');
    location.className = 'character-location';
    location.textContent = `Localização: ${character.location.name}`;

    // Montar a estrutura do card usando appendChild
    info.appendChild(name);
    info.appendChild(statusContainer);
    info.appendChild(species);
    info.appendChild(location);

    card.appendChild(image);
    card.appendChild(info);

    return card;
}

/**
 * Renderiza os cards de personagens no grid
 * Demonstra o uso de appendChild() para injetar elementos no DOM
 * 
 * @param {Array} characters - Array de personagens a renderizar
 */
function renderCharacters(characters) {
    // Limpar grid anterior
    charactersGrid.innerHTML = '';

    if (characters.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.style.gridColumn = '1 / -1';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '2rem';
        emptyMessage.textContent = 'Nenhum personagem encontrado com os filtros selecionados.';
        charactersGrid.appendChild(emptyMessage);
        return;
    }

    // Criar e adicionar cards dinamicamente (não estáticos no HTML)
    characters.forEach(character => {
        const card = createCharacterCard(character);
        // appendChild injeta o card criado no DOM
        charactersGrid.appendChild(card);
    });

    console.log(`${characters.length} cards renderizados dinamicamente`);
}

/**
 * Atualiza as informações de paginação
 */
function updatePaginationInfo() {
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

/**
 * Mostra ou esconde o estado de carregamento
 * @param {boolean} show - Se deve mostrar o loading
 */
function showLoading(show) {
    loadingElement.style.display = show ? 'flex' : 'none';
}

/**
 * Mostra mensagem de erro
 * @param {string} message - Mensagem de erro
 */
function showError(message) {
    errorMessage.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Esconde mensagem de erro
 */
function hideError() {
    errorElement.style.display = 'none';
}

// ============================================
// FUNÇÕES DE FILTRO
// ============================================

/**
 * Filtra personagens pelo status
 * @param {Array} characters - Array de personagens
 * @param {string} status - Status para filtrar
 * @returns {Array} Personagens filtrados
 */
function filterByStatus(characters, status) {
    if (!status) {
        return characters;
    }
    return characters.filter(character => 
        character.status.toLowerCase() === status.toLowerCase()
    );
}

/**
 * Aplica filtros aos personagens
 */
function applyFilters() {
    filteredCharacters = filterByStatus(allCharacters, selectedStatus);
    currentPage = 1;
    renderCharacters(filteredCharacters);
    updatePaginationInfo();
}

// ============================================
// FUNÇÕES DE CARREGAMENTO DE PÁGINA
// ============================================

/**
 * Carrega e exibe personagens de uma página específica
 * @param {number} page - Número da página
 */
async function loadPage(page) {
    try {
        const data = await fetchCharacters(page);
        allCharacters = data.results;
        currentPage = page;
        applyFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Erro ao carregar página:', error);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Botão próxima página
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        loadPage(currentPage + 1);
    }
});

// Botão página anterior
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        loadPage(currentPage - 1);
    }
});

// Filtro de status
statusFilter.addEventListener('change', (e) => {
    selectedStatus = e.target.value;
    applyFilters();
});

// Botão limpar filtros
resetFiltersBtn.addEventListener('click', () => {
    selectedStatus = '';
    statusFilter.value = '';
    applyFilters();
});

// Botão de alternância de tema
themeToggleBtn.addEventListener('click', toggleTheme);

// ============================================
// FUNÇÕES DE TEMA
// ============================================

/**
 * Carrega o tema salvo do localStorage ou usa o padrão
 */
function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (!prefersDark) {
        applyTheme('light');
    }
}

/**
 * Aplica o tema à página
 * @param {string} theme - 'dark' ou 'light'
 */
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '🌙';
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    console.log('Tema alterado para: ' + theme);
}

/**
 * Alterna entre tema claro e escuro
 */
function toggleTheme() {
    const isLightMode = document.body.classList.contains('light-mode');
    const newTheme = isLightMode ? 'dark' : 'light';
    applyTheme(newTheme);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa a aplicação
 * Carrega o tema e busca os personagens da primeira página
 */
async function init() {
    console.log('Iniciando aplicação Rick and Morty API Client...');
    loadTheme();
    await loadPage(1);
}

// Executar inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
