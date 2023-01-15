export interface IIngredientCategory {
  ingredientCategoryId: number;
  ingredientCategoryName: string
  appearanceInRecipes: number
}

export interface IIngredient {
  ingredientId: number;
  ingredientName: string;
  category: IIngredientCategory;
  defaultUnit: string;
}

export interface IRecipeIngredient {
  ingredientId: number;
  ingredient?: IIngredient
  ingredientAmount: number
  ingredientUnit: string
}