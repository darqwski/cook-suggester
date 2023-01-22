import { IIngredient, IRecipeIngredient } from "../../../types/ingredients";
import appRequest from "../app-request";
import { ISuggestion } from "../../../types/suggestion";

export const fetchSuggestionsList = async (recipeIngredient: IRecipeIngredient[]): Promise<{
  suggestedRecipes: ISuggestion[]
  ingredients: IIngredient[]
}> => {
  const result = await appRequest<{
    suggestedRecipes: ISuggestion[]
    ingredients: IIngredient[]
  }>({
    url: "API/suggestions/",
    data: recipeIngredient,
    method: 'POST'
  });

  return result.data;
};