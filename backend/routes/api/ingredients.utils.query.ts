import { executeQuery } from "../../utils/database-utils";
import { IRawIngredientWithCategory } from "../../../global-types/ingredients";

export const queryAllIngredientsWithCategory = async (): Promise<IRawIngredientWithCategory[]> => {
  return executeQuery<IRawIngredientWithCategory>(`
  SELECT * FROM ingredients 
  INNER JOIN ingredients_category 
    ON ingredients_category.ingredientCategoryId = ingredients.ingredientCategoryId
`)
};
