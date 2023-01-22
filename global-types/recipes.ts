import { IRecipeIngredient } from "./ingredients";

export interface IRecipe {
  recipeId: number;
  recipeName: string;
  recipeUrl: string;
  cuisineId: number;
  recipeSuggestedTimes?: number;
  recipeIngredientsAverageCommonness?: number;
  recipeComplexity: number;
  recipeCommonnessInCuisine: number;
  recipeSuggestionScore?: number;
  recipeTimeInMinutes: number;
}

export interface INewRecipe extends Omit<IRecipe, 'recipeId' | 'recipeCommonnessInCuisine'> {}

export interface IRecipeWithExtraIngredients extends IRecipe {
  missingIngredients: IRecipeIngredient[];
  matchingIngredients: IRecipeIngredient[];
}

export interface ISuggestedRecipe extends IRecipeWithExtraIngredients {
  suggestionScore: number;
}
