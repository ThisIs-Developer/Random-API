document.addEventListener("DOMContentLoaded", function() {
    var fetchBtn = document.getElementById("fetchBtn");
    var pokemonName = document.getElementById("pokemonName");
    var pokemonImg = document.getElementById("pokemonImg");
    var loading = document.getElementById("loading");
    var pokemonInfo = document.getElementById("pokemonInfo");
    var pokemonType = document.getElementById("pokemonType");
    var pokemonHeight = document.getElementById("pokemonHeight");
    var pokemonWeight = document.getElementById("pokemonWeight");
    var pokemonAbilities = document.getElementById("pokemonAbilities");
    var pokemonBaseStats = document.getElementById("pokemonBaseStats");
    var pokemonBaseExperience = document.getElementById("pokemonBaseExperience");
    var pokemonHeldItems = document.getElementById("pokemonHeldItems");
    var pokemonLocationAreaEncounters = document.getElementById("pokemonLocationAreaEncounters");
    var pokemonMoves = document.getElementById("pokemonMoves");
    var movesList = document.getElementById("movesList");
    var viewMoreMoves = document.getElementById("viewMoreMoves");
    var pokemonSpecies = document.getElementById("pokemonSpecies");
    var pokemonGameIndices = document.getElementById("pokemonGameIndices");
    var pokemonEvolutionChain = document.getElementById("pokemonEvolutionChain");
    var pokemonForms = document.getElementById("pokemonForms");
    var pokemonMoreInfo = document.getElementById("pokemonMoreInfo");

    var moveLimit = 10;
    var allMoves = [];

    fetchBtn.addEventListener("click", displayPokemon);

    function fetchRandomPokemon() {
        var randomId = Math.floor(Math.random() * 898) + 1; // Pokémon API has 898 Pokémon
        return fetch("https://pokeapi.co/api/v2/pokemon/" + randomId)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon data");
                }
                return response.json();
            });
    }

    function displayPokemon() {
        loading.style.display = "block";
        pokemonInfo.style.display = "none";
        pokemonImg.style.display = "none";
        fetchRandomPokemon()
            .then(function(pokemon) {
                pokemonName.innerText = pokemon.name;
                pokemonImg.src = pokemon.sprites.front_default;
                pokemonImg.style.display = "block"; // Show image after fetch
                pokemonType.innerText = pokemon.types.map(function(typeInfo) {
                    return typeInfo.type.name;
                }).join(", ");
                pokemonHeight.innerText = pokemon.height / 10 + " m";
                pokemonWeight.innerText = pokemon.weight / 10 + " kg";
                pokemonAbilities.innerText = pokemon.abilities.map(function(abilityInfo) {
                    return abilityInfo.ability.name;
                }).join(", ");
                pokemonBaseStats.innerHTML = "<ul>" + pokemon.stats.map(function(stat) {
                    return "<li>" + stat.stat.name + ": " + stat.base_stat + "</li>";
                }).join('') + "</ul>";
                pokemonBaseExperience.innerText = pokemon.base_experience;
                pokemonHeldItems.innerText = pokemon.held_items.length > 0 ? pokemon.held_items.map(function(itemInfo) {
                    return itemInfo.item.name;
                }).join(", ") : "None";
                pokemonLocationAreaEncounters.innerText = pokemon.location_area_encounters ? pokemon.location_area_encounters : "Unknown";
                
                // Handle moves pagination
                allMoves = pokemon.moves;
                updateMovesList();

                pokemonSpecies.innerText = pokemon.species.name;
                pokemonGameIndices.innerHTML = "<ul>" + pokemon.game_indices.map(function(index) {
                    return "<li>" + index.version.name + "</li>";
                }).join('') + "</ul>";
                pokemonEvolutionChain.innerText = "N/A"; // Fetch separately if needed
                pokemonForms.innerText = pokemon.forms.map(function(form) {
                    return form.name;
                }).join(", ");
                pokemonMoreInfo.innerHTML = `<a href="https://pokeapi.co/api/v2/pokemon/${pokemon.id}" target="_blank">More Info</a>`;
                
                loading.style.display = "none";
                pokemonInfo.style.display = "block";
            })
            .catch(function(error) {
                loading.style.display = "none";
                pokemonInfo.style.display = "none";
                alert("Failed to fetch Pokémon data: " + error.message);
            });
    }

    function updateMovesList() {
        var movesToShow = moveLimit >= allMoves.length ? allMoves : allMoves.slice(0, moveLimit);
        movesList.innerHTML = movesToShow.map(function(move) {
            return "<li>" + move.move.name + "</li>";
        }).join('');
        viewMoreMoves.style.display = allMoves.length > moveLimit ? "block" : "none";
    }

    viewMoreMoves.addEventListener("click", function() {
        moveLimit = allMoves.length; // Show all moves
        updateMovesList();
        viewMoreMoves.style.display = "none"; // Hide button after showing all moves
    });
});
