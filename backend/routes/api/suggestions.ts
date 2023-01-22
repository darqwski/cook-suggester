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

const router = express.Router();

//TODO
// add index for ingredientId in recipe_ingredient

router.post("/API/suggestions/", async (req: Request, res: Response) => {
  const selectedIngredients = req.body as ISuggestingRecipesPayload;
  const selectedIngredientIds = selectedIngredients.map(
    ({ ingredientId }) => ingredientId
  );

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

  const mostMatchingRecipesInformation = await executeQuery<IRecipe>(
    `
        SELECT * FROM \`recipes\`
        WHERE recipeId IN (?);
    `,
    [mostMatchingRecipesIds]
  );
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

  const sortedRecipes = recipesWithCalculatedFields.sort(
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
