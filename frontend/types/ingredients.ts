export interface IIngredientCategory {
  ingredientCategoryId: number;
  ingredientCategoryName: string
  appearanceInRecipes: number
}

export interface IIngredient {
  ingredientId: number;
  ingredientName: string;
  ingredientCategory: IIngredientCategory;
  defaultUnit: number;
}

export interface IRecipeIngredient {
  ingredientId: number;
  ingredient?: IIngredient
  ingredientAmount: number
  ingredientUnit: string
}