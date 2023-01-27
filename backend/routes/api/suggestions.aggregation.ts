import { IRecipe, IRecipeWithExtraIngredients, ISuggestedRecipe } from "../../../global-types/recipes";
import { IRecipeIngredient } from "../../../global-types/ingredients";

export const aggregateRecipeIngredientsIntoRecipes = (recipeIngredients: IRecipeIngredient[], recipes: IRecipe[], selectedIngredientIds: number[]) => {
  console.time("Building proper object");
  const mostMatchingRecipesWithIngredients = recipeIngredients.reduce<
    Record<number, IRecipeWithExtraIngredients>
    >((acc, ingredientRecipe) => {
    let currentRecipe = acc[ingredientRecipe.recipeId!];
    if (!currentRecipe) {
      const recipe = recipes.find(
        ({ recipeId }) => recipeId === ingredientRecipe.recipeId
      );

      if (!recipe) {
        throw new Error("Recipe did not found");
      }

      currentRecipe = {
        ...recipe,
        matchingIngredients: [],
        missingIngredients: [],
      };
    }

    if (selectedIngredientIds.includes(ingredientRecipe.ingredientId)) {
      currentRecipe.matchingIngredients.push(ingredientRecipe);
    } else {
      currentRecipe.missingIngredients.push(ingredientRecipe);
    }

    return { ...acc, [ingredientRecipe.recipeId!]: currentRecipe };
  }, {});

  const recipesWithCalculatedFields: ISuggestedRecipe[] = Object.values(
    mostMatchingRecipesWithIngredients
  ).map((recipe) => ({
    ...recipe,
    suggestionScore:
      recipe.matchingIngredients.length /
      (recipe.matchingIngredients.length + recipe.missingIngredients.length),
  }));
  console.timeEnd("Building proper object");
  return recipesWithCalculatedFields
}