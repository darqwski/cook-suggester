const { executeQuery } = require("../../utils/database-utils");

const insertNewRecipe = async (recipeDetails, ingredientsAmount) => {
  const { recipeName, recipeUrl, cuisineId, recipeComplexity, recipeTimeInMinutes }  = recipeDetails
  const { insertId: recipeId } = await executeQuery(`
INSERT INTO \`recipes\` (\`recipeId\`, \`recipeName\`, \`recipeUrl\`, \`cuisineId\`, \`recipeSuggestedTimes\`, \`recipeIngredientsAverageCommonnessInCuisine\`, 
\`recipeComplexity\`, \`recipeSuggestionScore\`, \`recipeTimeInMinutes\`, \`obligatoryIngredientsAmount\`) 
VALUES (NULL, ?, ?, ?, '0', '0', ?, '0', ?, ?);
`, [recipeName, recipeUrl, cuisineId, recipeComplexity, recipeTimeInMinutes, ingredientsAmount])

  return recipeId;
}

const insertSingleRecipeIngredient = async (recipeId, currentIngredient, ingredientAmount) => {
  await executeQuery(`
INSERT INTO \`recipe_ingredient\` (\`recipeIngredientId\`, \`recipeId\`, \`ingredientsInRecipe\`, \`ingredientId\`, \`ingredientAmount\`, \`ingredientUnit\`) 
VALUES (NULL, ?, ?, ?, ?, ?);`,
    [recipeId, ingredientAmount, currentIngredient.ingredientId, currentIngredient.ingredientAmount, currentIngredient.ingredientUnit ]
  );
}

const insertAllRecipeIngredients =async (ingredients, recipeId) => {
  for(let i = 0; i< ingredients.length;i++) {
    await insertSingleRecipeIngredient(recipeId, ingredients[i], ingredients.length)
  }
}


module.exports = {
  insertAllRecipeIngredients,
  insertNewRecipe
}