import { IRecipe } from "./recipes";
import { IRecipeIngredient } from "./ingredients";

export interface ISuggestion extends IRecipe {
  matchingIngredients: IRecipeIngredient[];
  missingIngredients: IRecipeIngredient[];
  suggestionScore: number
}