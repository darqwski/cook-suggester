import { INewRecipe, IRecipe } from "../../../types/recipes";
import { IRecipeIngredient } from "../../../types/ingredients";
import appRequest from "../app-request";
import { IAddRecipePayload } from "../../../types/adding-recipe";

export const createNewRecipe = async ({recipeDetails, ingredients }: IAddRecipePayload ) => {
 const { status } = await appRequest({
    url:'/API/recipes',
    method: 'POST',
    data: { recipeDetails, ingredients }
  })

  return status;
}