const { executeQuery } = require("../../utils/database-utils");

const queryAllIngredientsWithCategory = async () => {
  return  executeQuery(`
  SELECT * FROM ingredients 
  INNER JOIN ingredients_category 
    ON ingredients_category.ingredientCategoryId = ingredients.ingredientCategoryId
`)
}

const queryAllIngredients = async () => {
  return  executeQuery(`
  SELECT * FROM ingredients 
  INNER JOIN ingredients_category 
    ON ingredients_category.ingredientCategoryId = ingredients.ingredientCategoryId
`)
}

module.exports = { queryAllIngredients, queryAllIngredientsWithCategory }