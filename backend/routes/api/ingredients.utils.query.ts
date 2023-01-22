import { executeQuery } from "../../utils/database-utils";
import { IRecipe } from "../../../types/recipes";
import { IIngredient } from "../../../types/ingredients";

export const queryAllIngredientsWithCategory = async (): Promise<IRecipe[]> => {
  return executeQuery<IRecipe>(`
  SELECT * FROM ingredients 
  INNER JOIN ingredients_category 
    ON ingredients_category.ingredientCategoryId = ingredients.ingredientCategoryId
`)
}

export const queryAllIngredients = async (): Promise<IIngredient[]> => {
  return  executeQuery<IIngredient>(`
  SELECT * FROM ingredients 
  INNER JOIN ingredients_category 
    ON ingredients_category.ingredientCategoryId = ingredients.ingredientCategoryId
`)
}
