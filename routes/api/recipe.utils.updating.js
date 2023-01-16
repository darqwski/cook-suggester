const { executeQuery } = require("../../utils/database-utils");

const checkIfIngredientCuisineExists = async (cuisineId, ingredientId) => {
  const matchingItems = await executeQuery(
    "SELECT ingredientCuisineId FROM ingredients_cuisines WHERE cuisineId = ? AND ingredientId = ?",
    [cuisineId, ingredientId]
  );

  return !!matchingItems.length;
};

const updateIngredientCuisineAppearance = async (cuisineId, ingredientId) => {
  await executeQuery(
    `UPDATE \`ingredients_cuisines\` SET recipesWithIngredient = recipesWithIngredient + 1 WHERE ingredientId = ? AND cuisineId = ?;`,
    [ingredientId, cuisineId]
  );
};
const createNewIngredientCuisineAppearance = async (
  cuisineId,
  ingredientId
) => {
  await executeQuery(
    `
INSERT INTO \`ingredients_cuisines\` (\`ingredientCuisineId\`, \`ingredientId\`, \`cuisineId\`, \`recipesWithIngredient\`, \`recipesWithoutIngredient\`) 
VALUES (NULL, ?, ?, ?, ?);`,
    [ingredientId, cuisineId, 1, 0]
  );
};

const updateCuisineRecipesWithoutIngredients = async (
  cuisineId,
  ingredients
) => {
  const ingredientIds = ingredients.map(ingredient => ingredient.ingredientId);
  await executeQuery(
    `UPDATE \`ingredients_cuisines\` SET recipesWithoutIngredient = recipesWithoutIngredient + 1 WHERE ingredientId NOT IN (?) AND cuisineId = ?;`,
    [ingredientIds, cuisineId]
  );
};

const updateIngredientsCuisineAppearances = async (cuisineId, ingredients) => {
  console.time("updating cuisine ingredient");
  for (let i = 0; i < ingredients.length; i++) {
    const { ingredientId } = ingredients[i];
    const ingredientCuisineRowExists = await checkIfIngredientCuisineExists(
      cuisineId,
      ingredientId
    );
    if (ingredientCuisineRowExists) {
      await updateIngredientCuisineAppearance(cuisineId, ingredientId);
    } else {
      await createNewIngredientCuisineAppearance(cuisineId, ingredientId);
    }
  }
  await updateCuisineRecipesWithoutIngredients(cuisineId, ingredients);
  console.timeEnd("updating cuisine ingredient");
};

module.exports = {
  updateIngredientsCuisineAppearances,
};
