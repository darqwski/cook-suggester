const express = require("express");
const router = express.Router();

//Adding new recipe
//TODO
//Update appearanceInRecipesTimes per each ingredient
//Update recipeIngredientsAverageCommonness in recipes

router.post("/API/recipes/", (req, res, next) => {
  const { recipeDetails, ingredients } = req.body;
  const { recipeName, recipeUrl, cuisineId, recipeTimeInMinutes, recipeComplexity }  = recipeDetails
  console.log({recipeDetails, ingredients});



  res.send({ message: 'ok'})
});

module.exports = router;
