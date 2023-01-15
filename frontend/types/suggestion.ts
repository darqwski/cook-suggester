import { IRecipe } from "./recipes";
import { IRecipeIngredient } from "./ingredients";

export interface ISuggestion extends IRecipe {
  missingIngredientIds: number[];
  matchingIngredientIds: number[];
  matchingIngredients?: IRecipeIngredient[];
  missingIngredients?: IRecipeIngredient[];
  suggestionScore: number
}