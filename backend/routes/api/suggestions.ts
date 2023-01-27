import express, { Request, Response } from "express";
import {
  ISuggestingRecipesPayload,
  ISuggestionRecipesResponse,
} from "../../../global-types/suggesting-recipes";
import { executeQuery } from "../../utils/database-utils";
import { IIngredient, IRecipeIngredient } from "../../../global-types/ingredients";
import {
  IRecipe,
  IRecipeWithExtraIngredients,
  ISuggestedRecipe,
} from "../../../global-types/recipes";
import { AMOUNT_OF_SUGGESTED_RECIPES_FOR_BASIC_USER } from "../../../global-constants/suggesting-recipes";
import { IFilter } from "../../../global-types/filters";

const router = express.Router();

//TODO
// add index for ingredientId in recipe_ingredient

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

//TODO it would be better if this filters were applied in database
const filterOutRecipes = (recipes:ISuggestedRecipe[], filters: IFilter[]): ISuggestedRecipe[] => {
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
    }

    return true;
  })
}

router.post("/API/suggestions/", async (req: Request, res: Response) => {
  const { recipeIngredients, filters = [] } = req.body as ISuggestingRecipesPayload;
  const selectedIngredientIds = recipeIngredients.map(
    ({ ingredientId }) => ingredientId
  );
  const filterIds = filters.map(({filterId}) => filterId)
  const filterValues = filterIds.length ? await executeQuery<{ filterId: string, value: string | number }>('SELECT filterId, value FROM filter_values WHERE filterId IN (?)', [filterIds]) : []
  const filtersWithValues = filters.map(filter => {
    return {
      ...filter,
      filterValues: filterValues.filter(filterValue => `${filterValue.filterId}` === `${filter.filterId}`).map(({ value }) => value)
    }
  });

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

  console.time("querying missing ingredients");
  const allIngredientsForRecipes = await executeQuery<IRecipeIngredient>(
    `SELECT * FROM \`recipe_ingredient\` WHERE recipeId IN (?);`,
    [mostMatchingRecipesIds]
  );

  console.timeEnd("querying missing ingredients");
  const distinctIngredientIds = allIngredientsForRecipes.reduce<number[]>(
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
  console.time("Building proper object");

  const mostMatchingRecipesWithIngredients = allIngredientsForRecipes.reduce<
    Record<number, IRecipeWithExtraIngredients>
  >((acc, ingredientRecipe) => {
    let currentRecipe = acc[ingredientRecipe.recipeId!];
    if (!currentRecipe) {
      const recipe = mostMatchingRecipesInformation.find(
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

  console.log("Recipes before filtering: "+recipesWithCalculatedFields.length)
  console.time('filtering')
  const filteredRecipes = filterOutRecipes(recipesWithCalculatedFields, filtersWithValues)
  console.timeEnd('filtering')
  console.log("Recipes after filtering: "+filteredRecipes.length)

  const sortedRecipes = filteredRecipes.sort(
    (recipeA, recipeB) => recipeB.suggestionScore - recipeA.suggestionScore
  );
  const topSortedRecipes = sortedRecipes.filter((recipe, index) => index < AMOUNT_OF_SUGGESTED_RECIPES_FOR_BASIC_USER);
  console.timeEnd("Building proper object");

  const suggestionRecipesResponse: ISuggestionRecipesResponse = {
    suggestedRecipes: sortedRecipes,
    ingredients: ingredientsInformation,
  };

  res.send(suggestionRecipesResponse);

  console.log("After suggestion");

  const topSortedRecipeIds = topSortedRecipes.map(({ recipeId }) => recipeId)

  console.time("updating suggested times and commonnes");
  await executeQuery(`UPDATE recipes SET recipeSuggestedTimes = recipeSuggestedTimes + 1 WHERE recipeId IN (?);`,[topSortedRecipeIds])
  await executeQuery(`UPDATE ingredients SET commonnessFromUsers = commonnessFromUsers + 1 WHERE ingredientId IN (?);`,[selectedIngredientIds])
  console.timeEnd("updating suggested times and commonnes");
});

module.exports = router;
