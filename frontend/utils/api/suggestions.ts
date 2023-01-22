import { IIngredient, IRecipeIngredient } from "../../../types/ingredients";
import appRequest from "../app-request";
import { ISuggestingRecipesPayload, ISuggestionRecipesResponse } from "../../../types/suggesting-recipes";
import { ISuggestedRecipe } from "../../../types/recipes";

export const fetchSuggestionsList = async (recipeIngredient: ISuggestingRecipesPayload): Promise<ISuggestionRecipesResponse> => {
  const result = await appRequest<{
    suggestedRecipes: ISuggestedRecipe[]
    ingredients: IIngredient[]
  }>({
    url: "API/suggestions/",
    data: recipeIngredient,
    method: 'POST'
  });

  return result.data;
};