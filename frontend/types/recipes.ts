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