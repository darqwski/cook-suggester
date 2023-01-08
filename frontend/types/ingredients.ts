export interface IIngredient {
  name: string;
  category: string;
  id: number;
}

export interface IRecipeIngredient {
  ingredientId: number;
  ingredient?: IIngredient
  ingredientAmount: number
  ingredientUnit: string
}