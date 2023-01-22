export interface IIngredientCategory {
  ingredientCategoryId: number;
  ingredientCategoryName: string;
  appearanceInRecipes: number;
}

export interface IIngredient {
  ingredientId: number;
  ingredientName: string;
  category: IIngredientCategory;
  defaultUnit: string;
}

export interface IRawIngredientWithCategory
  extends Omit<IIngredient, "category">,
    IIngredientCategory {}

export interface IRecipeIngredient {
  ingredientId: number;
  recipeId?: number;
  ingredient?: IIngredient;
  ingredientAmount: number;
  ingredientUnit: string;
}
