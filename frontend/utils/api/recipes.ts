import { INewRecipe, IRecipe } from "../../types/recipes";
import { IRecipeIngredient } from "../../types/ingredients";
import appRequest from "../app-request";

export const createNewRecipe = async ({recipeDetails, ingredients }: {recipeDetails: INewRecipe, ingredients: IRecipeIngredient[] } ) => {
 const { status } = await appRequest({
    url:'/API/recipes',
    method: 'POST',
    data: { recipeDetails, ingredients }
  })

  return status;
}