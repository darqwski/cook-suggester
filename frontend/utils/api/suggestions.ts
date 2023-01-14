import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import appRequest from "../app-request";
import { ISuggestion } from "../../types/suggestion";

export const fetchSuggestionsList = async (recipeIngredient: IRecipeIngredient[]): Promise<ISuggestion[]> => {
  const result = await appRequest<ISuggestion[]>({
    url: "API/suggestions/",
    data: recipeIngredient,
    method: 'POST'
  });

  return result.data;
};