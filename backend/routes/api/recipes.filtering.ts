import { ISuggestedRecipe } from "../../../global-types/recipes";
import { IFilter } from "../../../global-types/filters";

const recipeContainsExcludedIngredients = (excludedIngredientIds: string[], recipe: ISuggestedRecipe): boolean => {
  for( const missingIngredient of recipe.missingIngredients){
    if(excludedIngredientIds.includes(`${missingIngredient.ingredientId}`)){
      return true;
    }
  }
  for( const matchingIngredient of recipe.matchingIngredients){
    if(excludedIngredientIds.includes(`${matchingIngredient.ingredientId}`)){
      return true;
    }
  }

  return false
}
const recipeContainsIncludedIngredients = (includedIngredientIds: string[], recipe: ISuggestedRecipe): boolean => {
  const amountOfIncludedIngredients = includedIngredientIds.reduce((acc, includedIngredientId)=> {
    if(recipe.matchingIngredients.some(ingredient => `${ingredient.ingredientId}` === `${includedIngredientId}`)){
      return acc + 1;
    }
    if(recipe.missingIngredients.some(ingredient => `${ingredient.ingredientId}` === `${includedIngredientId}`)){
      return acc + 1;
    }

    return acc;
  }, 0)

  return amountOfIncludedIngredients === includedIngredientIds.length;
}

const recipeContainsTag = (recipe: ISuggestedRecipe, tagId: string) => {
  return recipe.tags?.some(tag => `${tag}` === tagId)
}

const recipeIsInCuisine = (recipe: ISuggestedRecipe, cuisineId: string) => {
  return `${recipe.cuisineId}` === cuisineId
}

//TODO it would be better if this filters were applied in database
export const filterOutRecipes = (recipes:ISuggestedRecipe[], filters: IFilter[]): ISuggestedRecipe[] => {
  return recipes.filter((recipe) => {
    for(const filter of filters){
      if(filter.filterType === 'exclude-ingredients'){
        const containsExcludedIngredients = recipeContainsExcludedIngredients(filter.filterValues as string[], recipe);
        if(containsExcludedIngredients){
          return false;
        }
      }

      //Hard to test
      if(filter.filterType === 'include-ingredients'){
        const containsAllIncludedIngredients = recipeContainsIncludedIngredients(filter.filterValues as string[], recipe);
        if(!containsAllIncludedIngredients){
          return false;
        }
      }

      if(filter.filterType === 'include-tag') {
        const containsTag = recipeContainsTag(recipe, `${filter.filterValues?.[0]}`)
        if(!containsTag) {
          return false
        }
      }

      if(filter.filterType === 'exclude-tag') {
        const containsTag = recipeContainsTag(recipe, `${filter.filterValues?.[0]}`)
        if(containsTag) {
          return false
        }
      }

      if(filter.filterType === 'include-cuisine') {
        const containsTag = recipeIsInCuisine(recipe, `${filter.filterValues?.[0]}`)
        if(!containsTag) {
          return false
        }
      }

      if(filter.filterType === 'exclude-cuisine') {
        const containsTag = recipeIsInCuisine(recipe, `${filter.filterValues?.[0]}`)
        if(containsTag) {
          return false
        }
      }
    }

    return true;
  })
}