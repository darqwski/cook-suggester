const express = require("express");
const {
  insertNewRecipe,
  insertAllRecipeIngredients,
} = require("./recipe.utils.inserting");
const { updateIngredientsCuisineAppearances } = require("./recipe.utils.updating");
const router = express.Router();

//Adding new recipe
//TODO
//Update recipeIngredientsAverageCommonness in recipes

router.post("/API/recipes/", async (req, res, next) => {
  const { recipeDetails, ingredients } = req.body;
  const {
    recipeName,
    recipeUrl,
    cuisineId,
    recipeComplexity,
    recipeTimeInMinutes,
  } = recipeDetails;
  console.log({ recipeDetails, ingredients });

  const recipeId = await insertNewRecipe(
    recipeDetails,
    ingredients.length
  );

  console.log({recipeId})
  await insertAllRecipeIngredients(ingredients, recipeId);
  await updateIngredientsCuisineAppearances(cuisineId, ingredients);

  res.send({ message: "ok" });
});

module.exports = router;
