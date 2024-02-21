
const apiKey = '3447159022774804a3c62660e0902c52';
//const apiKey = 'YOUR_SPOONACULAR_API_KEY';

async function searchRecipe() {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${apiKey}&addRecipeInformation=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.log('Error fetching data: ', error);
    }
}

async function getRecipeDetails(recipeId) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching recipe details: ', error);
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach(async recipe => {
        const recipeDetails = await getRecipeDetails(recipe.id);
        const card = createRecipeCard(recipeDetails);
        recipeContainer.appendChild(card);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = recipe.title;

    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.textContent = 'Ingredients';

    const ingredientsList = document.createElement('ul');
    recipe.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient.original;
        ingredientsList.appendChild(li);
    });

    const instructionsTitle = document.createElement('h3');
    instructionsTitle.textContent = 'Instructions';

    const instructionsList = document.createElement('ol');
    recipe.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.step;
        instructionsList.appendChild(li);
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Recipe';
    saveButton.addEventListener('click', () => {
        saveRecipe(recipe);
    });

    card.appendChild(title);
    card.appendChild(ingredientsTitle);
    card.appendChild(ingredientsList);
    card.appendChild(instructionsTitle);
    card.appendChild(instructionsList);
    card.appendChild(saveButton);

    return card;
}

function saveRecipe(recipe) {
    // Implement saving logic here
    alert('recipe Saved: ', recipe);
}

