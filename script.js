let currentPokemonId = 1; // Inicializa com o Pokémon #1

document.getElementById('search-btn').addEventListener('click', function() {
    let pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    fetchPokemon(pokemonName);
});

document.getElementById('next-btn').addEventListener('click', function() {
    currentPokemonId++;
    fetchPokemonById(currentPokemonId);
});

document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentPokemonId > 1) { // Pokémon ID começa em 1, então não pode voltar para 0 ou menor.
        currentPokemonId--;
        fetchPokemonById(currentPokemonId);
    }
});

// Função para buscar Pokémon pelo nome
function fetchPokemon(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Pokémon não encontrado');
            }
        })
        .then(data => {
            currentPokemonId = data.id; // Atualiza o ID do Pokémon atual com base no resultado
            displayPokemon(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para buscar Pokémon pelo ID
function fetchPokemonById(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Pokémon não encontrado');
            }
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para exibir as informações do Pokémon na tela
function displayPokemon(data) {
    document.getElementById('pokemon-img').src = data.sprites.front_default;
    document.getElementById('pokemon-title').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    
    const types = data.types.map(typeInfo => typeInfo.type.name);
    document.getElementById('pokemon-type').textContent = `Tipo: ${types.join(', ')}`;
    
    // Atualiza as cores do fundo com base no tipo
    const primaryType = types[0];
    document.querySelector('.pokemon-image-container').className = `pokemon-image-container type-${primaryType}`;
    document.getElementById('pokemon-type').className = `type-${primaryType}`;
}
