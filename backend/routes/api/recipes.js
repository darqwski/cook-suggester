const express = require("express");
const {
  insertNewRecipe,
  insertAllRecipeIngredients,
} = require("./recipe.utils.inserting");
const { updateIngredientsCuisineAppearances } = require("./recipe.utils.updating");
const { executeQuery } = require("../../utils/database-utils");
const router = express.Router();

//Adding new recipe

router.post("/API/recipes/", async (req, res, next) => {
  const { recipeDetails, ingredients } = req.body;
  const {
    cuisineId,
  } = recipeDetails;
  console.log({ recipeDetails, ingredients });

  const recipeId = await insertNewRecipe(
    recipeDetails,
    ingredients.length
  );

  await insertAllRecipeIngredients(ingredients, recipeId);
  await updateIngredientsCuisineAppearances(cuisineId, ingredients);

  res.send({ message: "ok" });
});

module.exports = router;
