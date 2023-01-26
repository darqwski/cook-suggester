import { IIngredient, IRecipeIngredient } from "./ingredients";
import { ISuggestedRecipe } from "./recipes";
import { IFilter } from "./filters";

export type ISuggestingRecipesPayload = {
  recipeIngredients: IRecipeIngredient[]
  filters?: IFilter[]
};
export type ISuggestionRecipesResponse = {
  suggestedRecipes: ISuggestedRecipe[];
  ingredients: IIngredient[];
};
