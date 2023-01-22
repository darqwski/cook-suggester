import { IIngredient } from "../../../global-types/ingredients";
import appRequest from "../app-request";
import { ISuggestingRecipesPayload, ISuggestionRecipesResponse } from "../../../global-types/suggesting-recipes";
import { ISuggestedRecipe } from "../../../global-types/recipes";

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