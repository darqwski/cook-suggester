import express, { Request, Response } from "express";
import {
  ISuggestingRecipesPayload,
  ISuggestionRecipesResponse,
} from "../../../global-types/suggesting-recipes";
import { executeQuery } from "../../utils/database-utils";
import {
  IIngredient,
  IRecipeIngredient,
} from "../../../global-types/ingredients";
import {
  IRecipe,
  IRecipeWithExtraIngredients,
  ISuggestedRecipe,
} from "../../../global-types/recipes";
import { AMOUNT_OF_SUGGESTED_RECIPES_FOR_BASIC_USER } from "../../../global-constants/suggesting-recipes";
import { filterOutRecipes } from "./suggestions.filtering";
import {
  queryFiltersWithValues,
  queryMatchingIngredients,
  queryMatchingRecipeIngredients,
  queryMatchingRecipes,
} from "./suggestions.query";
import { aggregateRecipeIngredientsIntoRecipes } from "./suggestions.aggregation";

const router = express.Router();

//TODO
// add index for ingredientId in recipe_ingredient

router.post("/API/suggestions/", async (req: Request, res: Response) => {
  const { recipeIngredients, filters = [] } =
    req.body as ISuggestingRecipesPayload;
  const selectedIngredientIds = recipeIngredients.map(
    ({ ingredientId }) => ingredientId
  );
  const filtersWithValues = await queryFiltersWithValues(filters);
  const mostMatchingRecipes = await queryMatchingRecipes(selectedIngredientIds);
  const matchingRecipeIngredients = await queryMatchingRecipeIngredients(
    mostMatchingRecipes.map(({ recipeId }) => recipeId)
  );
  const matchingIngredients = await queryMatchingIngredients(
    matchingRecipeIngredients
  );

  const recipesToSuggest = aggregateRecipeIngredientsIntoRecipes(
    matchingRecipeIngredients,
    mostMatchingRecipes,
    selectedIngredientIds
  );

  const filteredRecipes = filterOutRecipes(recipesToSuggest, filtersWithValues);

  const sortedRecipes = filteredRecipes.sort(
    (recipeA, recipeB) => recipeB.suggestionScore - recipeA.suggestionScore
  );
  const topSortedRecipes = sortedRecipes.filter(
    (recipe, index) => index < AMOUNT_OF_SUGGESTED_RECIPES_FOR_BASIC_USER
  );

  const suggestionRecipesResponse: ISuggestionRecipesResponse = {
    suggestedRecipes: sortedRecipes,
    ingredients: matchingIngredients,
  };

  res.send(suggestionRecipesResponse);

  if (topSortedRecipes.length === 0) {
    return;
  }
  console.log("After suggestion");

  const topSortedRecipeIds = topSortedRecipes.map(({ recipeId }) => recipeId);

  console.time("updating suggested times and commonnes");
  await executeQuery(
    `UPDATE recipes SET recipeSuggestedTimes = recipeSuggestedTimes + 1 WHERE recipeId IN (?);`,
    [topSortedRecipeIds]
  );
  await executeQuery(
    `UPDATE ingredients SET commonnessFromUsers = commonnessFromUsers + 1 WHERE ingredientId IN (?);`,
    [selectedIngredientIds]
  );
  console.timeEnd("updating suggested times and commonnes");
});

module.exports = router;
