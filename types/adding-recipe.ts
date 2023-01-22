import { INewRecipe } from "./recipes";
import { IRecipeIngredient } from "./ingredients";

export interface IAddRecipePayload {
  recipeDetails: INewRecipe;
  ingredients: IRecipeIngredient[];
}
