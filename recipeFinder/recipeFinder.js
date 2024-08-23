document.addEventListener("DOMContentLoaded", function () {
    const recipeForm = document.getElementById("recipeForm");
    const recipeResults = document.getElementById("recipeResults");

    recipeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        fetchRecipes();
    });

    function fetchRecipes() {
        const cuisineType = document.getElementById("cuisineType").value;
        const mealTime = document.getElementById("mealTime").value;
        const difficulty = document.getElementById("difficulty").value;

        const apiKey = 'af0fab9222c247f1a6b664761d428b5d';
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisineType}&type=${mealTime}&difficulty=${difficulty}&number=500`;

        recipeResults.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data.results);
                scrollToResults();
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                recipeResults.innerHTML = '<p class="text-center w-100">Failed to fetch recipes. Please try again later.</p>';
            });
    }

    function displayRecipes(recipes) {
        recipeResults.innerHTML = '';

        if (recipes.length === 0) {
            recipeResults.innerHTML = '<p class="text-center w-100">No recipes found.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card col-md-4';

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <p><strong>Instructions:</strong> <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
            `;

            recipeResults.appendChild(recipeCard);
        });
    }

    function scrollToResults() {
        // Smoothly scroll to the recipeResults container
        window.scrollTo({
            top: recipeResults.offsetTop,
            behavior: 'smooth'
        });
    }
});
