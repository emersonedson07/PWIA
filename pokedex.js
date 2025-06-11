const pokemonContainer = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('type-filter');
const abilityFilter = document.getElementById('ability-filter');

const autocompleteList = document.getElementById('autocomplete-list');
const comparador = document.getElementById('comparador');
const meuTimeList = document.getElementById('meu-time');
const pokeDoDiaDiv = document.getElementById('poke-do-dia');
const oakResposta = document.getElementById('resposta-oak');

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  bug: '#a8b820',
  normal: '#a8a878',
  poison: '#a040a0',
  ground: '#e0c068',
  fairy: '#ee99ac',
  fighting: '#c03028',
  psychic: '#f85888',
  rock: '#b8a038',
  ghost: '#705898',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  flying: '#a890f0'
};

let allPokemon = [];
let pokemonsParaComparar = [];

// Traduz o nome para pt-br (exemplo simples, você pode expandir ou usar API)
function traduzirNome(name) {
  // Exemplo simples, traduz só alguns
  const trads = {
    bulbasaur: "Bulbasauro",
    ivysaur: "Ivysauro",
    venusaur: "Venusaur",
    charmander: "Charmander",
    charmeleon: "Charmeleon",
    charizard: "Charizard",
    squirtle: "Squirtle",
    wartortle: "Wartortle",
    blastoise: "Blastoise"
  };
  return trads[name] || name.charAt(0).toUpperCase() + name.slice(1);
}

async function fetchPokemon(limit = 151) {
  for (let i = 1; i <= limit; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();

    data.translatedName = traduzirNome(data.name);
    allPokemon.push(data);
  }
  renderPokemon(allPokemon);
  populateTypeFilter();
  populateAbilityFilter();
  renderTime();
  mostrarPokemonDoDia();
}

function renderPokemon(pokemonList) {
  pokemonContainer.innerHTML = '';

  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const types = pokemon.types.map(t => t.type.name).join(', ');
    const color = typeColors[pokemon.types[0].type.name] || '#eee';

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <h3 class="pokemon-name">${pokemon.translatedName}</h3>
      <p class="pokemon-type" style
