import { executeQuery, insertQuery } from "../../utils/database-utils";
import { INewRecipe } from "../../../global-types/recipes";
import {  IRecipeIngredient } from "../../../global-types/ingredients";

export const insertNewRecipe = async (recipeDetails: INewRecipe, ingredientsAmount: number): Promise<number> => {
  const { recipeName, recipeUrl, cuisineId, recipeComplexity, recipeTimeInMinutes }  = recipeDetails
  const { insertId: recipeId } = await insertQuery(`
INSERT INTO \`recipes\` (\`recipeId\`, \`recipeName\`, \`recipeUrl\`, \`cuisineId\`, \`recipeSuggestedTimes\`, \`recipeIngredientsAverageCommonnessInCuisine\`, 
\`recipeComplexity\`, \`recipeSuggestionScore\`, \`recipeTimeInMinutes\`, \`obligatoryIngredientsAmount\`) 
VALUES (NULL, ?, ?, ?, '0', '0', ?, '0', ?, ?);
`, [recipeName, recipeUrl, cuisineId, recipeComplexity, recipeTimeInMinutes, ingredientsAmount])

  return recipeId;
}

const insertSingleRecipeIngredient = async (recipeId: number, currentIngredient: IRecipeIngredient, ingredientAmount: number): Promise<void> => {
  await executeQuery(`
INSERT INTO \`recipe_ingredient\` (\`recipeIngredientId\`, \`recipeId\`, \`ingredientsInRecipe\`, \`ingredientId\`, \`ingredientAmount\`, \`ingredientUnit\`) 
VALUES (NULL, ?, ?, ?, ?, ?);`,
    [recipeId, ingredientAmount, currentIngredient.ingredientId, currentIngredient.ingredientAmount, currentIngredient.ingredientUnit ]
  );
}

export const insertAllRecipeIngredients =async (ingredients: IRecipeIngredient[], recipeId: number): Promise<void> => {
  for(let i = 0; i< ingredients.length;i++) {
    await insertSingleRecipeIngredient(recipeId, ingredients[i], ingredients.length)
  }
}