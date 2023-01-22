import { INewRecipe, IRecipe } from "../../../global-types/recipes";
import { IRecipeIngredient } from "../../../global-types/ingredients";
import appRequest from "../app-request";
import { IAddRecipePayload } from "../../../global-types/adding-recipe";

export const createNewRecipe = async ({recipeDetails, ingredients }: IAddRecipePayload ) => {
 const { status } = await appRequest({
    url:'/API/recipes',
    method: 'POST',
    data: { recipeDetails, ingredients }
  })

  return status;
}