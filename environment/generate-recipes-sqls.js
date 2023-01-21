const {
  insertNewRecipe,
  insertAllRecipeIngredients,
} = require("../backend/routes/api/recipe.utils.inserting");
const {
  updateIngredientsCuisineAppearances,
} = require("../backend/routes/api/recipe.utils.updating");
const { executeQuery } = require("../backend/utils/database-utils");

const ingredientInDb = [2, 3, 13, 17, 23, 29];

const recipes = [];
const recipesSums = [];
const baseProbability = 0.025;
const ingredientsProbability = [
  ,
  ,
  ,
  baseProbability,
  baseProbability / ingredientInDb.length ** 1,
  baseProbability / ingredientInDb.length ** 2,
  baseProbability / ingredientInDb.length ** 4,
];

const generateRecipes = (currentList, maxDepth, currentLevel = 0) => {
  const adjustedLists = ingredientInDb.map((ingredient) =>
    currentList.includes(ingredient)
      ? [...currentList]
      : [...currentList, ingredient]
  );
  if (currentLevel >= maxDepth) {
    const probability = ingredientsProbability[maxDepth];
    adjustedLists.forEach((adjustedList) => {
      if (probability > Math.random()) {
        const recipeNumber = adjustedList.reduce((acc, item) => acc * item, 1);

        if (!recipesSums.includes(recipeNumber)) {
          recipes.push([...adjustedList]);
          recipesSums.push(recipeNumber);
        }
      }
    });
  } else {
    for (let i = 0; i < adjustedLists.length; i++) {
      generateRecipes([...adjustedLists[i]], maxDepth, currentLevel + 1);
    }
  }
};

generateRecipes([], 3);
generateRecipes([], 4);
generateRecipes([], 5);

console.log("RECIPES GENERATED IN " + recipes.length + " AMOUNT")

const addRecipeToDatabase = async (recipe) => {
  const recipeNumber = recipe.reduce((acc, item) => acc * item, 1);
  let cuisineId = `${recipeNumber}`
    .split("")
    .reduce((acc, item) => acc + item, 0);
  while (cuisineId > 10) {
    cuisineId = `${cuisineId}`
      .split("")
      .reduce((acc, item) => acc + Number(item), 0);
  }

  const recipeDetails = {
    recipeName: `Recipe ${recipeNumber}`,
    recipeUrl: `recipe-${recipeNumber}`,
    cuisineId,
    recipeComplexity: 0,
    recipeTimeInMinutes: 30,
  };

  const ingredients = recipe.map(ingredientId => ({
    ingredientAmount: Math.round(Math.random() * 1000),
    ingredientId,
    ingredientUnit: 'g'
  }))

  const recipeId = await insertNewRecipe(recipeDetails, ingredients.length);

  await insertAllRecipeIngredients(ingredients, recipeId);
  await updateIngredientsCuisineAppearances(cuisineId, ingredients);
};

(async () => {
  await executeQuery('TRUNCATE recipes;')
  await executeQuery('TRUNCATE recipe_ingredient;')
  await executeQuery('TRUNCATE ingredients_cuisines;')
  await new Promise(resolve => setTimeout(resolve, 50))

  for(let i = 0; i< recipes.length; i++){
    if (i % 10 === 9) {
      console.log("Recipes from " + (i - 9) + " to " + i + " added");
    }
    await addRecipeToDatabase(recipes[i]);
    await validateIngredientCuisines()
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  console.log(recipes.length);
})()


