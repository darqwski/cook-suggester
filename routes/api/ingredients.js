const express = require("express");
const router = express.Router();
const { executeQuery } = require("../../utils/database-utils");


router.get("/API/ingredients/", async (req, res, next) => {
  const ingredients = await executeQuery(`
  SELECT * FROM ingredients 
  INNER JOIN ingredients_category 
    ON ingredients_category.ingredientCategoryId = ingredients.ingredientCategoryId
`)
  const ingredientsWithCategory = ingredients.map(({  ingredientCategoryId, ingredientCategoryName, appearanceInRecipes,...rest })=>({
    ...rest,
    category: {
      ingredientCategoryId,
      ingredientCategoryName,
      appearanceInRecipes
    }
  }))

  res.send(ingredientsWithCategory);
});

module.exports = router;
