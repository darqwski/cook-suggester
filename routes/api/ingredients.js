const express = require("express");
const router = express.Router();
const { executeQuery } = require("../../utils/database-utils");
const { queryAllIngredientsWithCategory } = require("./ingredients.utils.query");


router.get("/API/ingredients/", async (req, res, next) => {
  const ingredients = await queryAllIngredientsWithCategory()
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
