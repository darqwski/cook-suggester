import { IIngredient, IRecipeIngredient } from "./ingredients";
import { ISuggestedRecipe } from "./recipes";

export type ISuggestingRecipesPayload = IRecipeIngredient[];
export type ISuggestionRecipesResponse = {
  suggestedRecipes: ISuggestedRecipe[];
  ingredients: IIngredient[];
};
