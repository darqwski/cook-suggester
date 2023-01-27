import { executeQuery } from "../../utils/database-utils";
import { IFilter } from "../../../global-types/filters";
import { IRecipe } from "../../../global-types/recipes";
import { IIngredient, IRecipeIngredient } from "../../../global-types/ingredients";

export const queryFiltersWithValues =async (filters: IFilter[]):Promise<IFilter[]> => {
  const filterIds = filters.map(({filterId}) => filterId)
  const filterValues = filterIds.length ? await executeQuery<{ filterId: string, value: string | number }>('SELECT filterId, value FROM filter_values WHERE filterId IN (?)', [filterIds]) : []
  const filtersWithValues = filters.map(filter => {
    return {
      ...filter,
      filterValues: filterValues.filter(filterValue => `${filterValue.filterId}` === `${filter.filterId}`).map(({ value }) => value)
    }
  });

  return filtersWithValues
}

export const queryMatchingRecipes =async (selectedIngredientIds: number[]): Promise<IRecipe[]> => {
  console.time("querying recipe_ingredient by ingredients from user");
  const mostMatchingRecipesForIngredients = await executeQuery<
    IRecipeIngredient & { matchingProportion: number }
    >(
    `
     SELECT (COUNT(*)/ ingredientsInRecipe) as matchingProportion, ingredientsInRecipe, recipeId 
     FROM \`recipe_ingredient\` 
     WHERE ingredientId IN (?) 
     GROUP BY recipeId 
     ORDER BY matchingProportion DESC 
    `,
    [selectedIngredientIds]
  );
  console.timeEnd("querying recipe_ingredient by ingredients from user");

  const mostMatchingRecipesIds = mostMatchingRecipesForIngredients.map(
    ({ recipeId }) => recipeId || -1
  );

  console.time("querying recipes information");

  const mostMatchingRecipesInformationWithTags = await executeQuery<IRecipe & { tagId: number | null }>(
    `
        SELECT recipes.*, tags_recipes.tagId, recipes.recipeId FROM \`recipes\`
        LEFT JOIN tags_recipes ON tags_recipes.recipeId = recipes.recipeId
        WHERE recipes.recipeId IN (?)
    `,
    [mostMatchingRecipesIds]
  );

  const mostMatchingRecipesInformation  = Object.values(
    mostMatchingRecipesInformationWithTags.reduce<Record<number, IRecipe>>((acc, recipeWithTag) => {
      if(!recipeWithTag.tagId){
        return {
          ...acc,
          [recipeWithTag.recipeId]: recipeWithTag
        }
      }
      if(!acc[recipeWithTag.recipeId]){
        return {
          ...acc,
          [recipeWithTag.recipeId]: { ...recipeWithTag, tags: [recipeWithTag.tagId] },
        }
      }

      return {
        ...acc,
        [recipeWithTag.recipeId]: {
          ...acc[recipeWithTag.recipeId],
          tags: [...(acc[recipeWithTag.recipeId].tags || []), recipeWithTag.tagId ]
        }
      }
    }, {}));

  console.timeEnd("querying recipes information");

  return mostMatchingRecipesInformation
}

export const queryMatchingRecipeIngredients = async (recipeIds: number[]) : Promise<IRecipeIngredient[]> => {
  console.time("querying missing ingredients");
  const allIngredientsForRecipes = await executeQuery<IRecipeIngredient>(
    `SELECT * FROM \`recipe_ingredient\` WHERE recipeId IN (?);`,
    [recipeIds]
  );

  console.timeEnd("querying missing ingredients");

  return allIngredientsForRecipes
}

export const queryMatchingIngredients = async (recipeIngredients: IRecipeIngredient[]) : Promise<IIngredient[]> => {

  const distinctIngredientIds = recipeIngredients.reduce<number[]>(
    (acc, ingredient) => {
      if (acc.includes(ingredient.ingredientId)) {
        return acc;
      }
      return [...acc, ingredient.ingredientId];
    },
    []
  );
  console.time("querying missing ingredients information");
  const ingredientsInformation = await executeQuery<IIngredient>(
    `SELECT * FROM \`ingredients\` WHERE ingredientId IN (?);`,
    [distinctIngredientIds]
  );
  console.timeEnd("querying missing ingredients information");

  return ingredientsInformation
}