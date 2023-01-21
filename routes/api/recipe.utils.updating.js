const { executeQuery } = require("../../utils/database-utils");

const checkIfIngredientCuisineExists = async (cuisineId, ingredientId) => {
  const matchingItems = await executeQuery(
    "SELECT ingredientCuisineId FROM ingredients_cuisines WHERE cuisineId = ? AND ingredientId = ?",
    [cuisineId, ingredientId]
  );

  return !!matchingItems.length;
};

const getCurrentRecipesInCuisine = async (cuisineId) => {
  const matchingItems = await executeQuery(
    "SELECT recipesWithIngredient, recipesWithoutIngredient FROM ingredients_cuisines WHERE cuisineId = ?",
    [cuisineId]
  );

  if(!matchingItems.length){
    return 0;
  }

  const { recipesWithIngredient, recipesWithoutIngredient } = matchingItems[0]

  return recipesWithIngredient + recipesWithoutIngredient;
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
  const currentRecipesAmount = await getCurrentRecipesInCuisine(cuisineId)
  await executeQuery(
    `
INSERT INTO \`ingredients_cuisines\` (\`ingredientCuisineId\`, \`ingredientId\`, \`cuisineId\`, \`recipesWithIngredient\`, \`recipesWithoutIngredient\`) 
VALUES (NULL, ?, ?, ?, ?);`,
    [ingredientId, cuisineId, 1, currentRecipesAmount]
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
  console.time(`updating cuisine ${cuisineId} with ingredients ${ingredients.map(({ingredientId}) => ingredientId).join()}`);
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
  console.timeEnd(`updating cuisine ${cuisineId} with ingredients ${ingredients.map(({ingredientId}) => ingredientId).join()}`);
};

module.exports = {
  updateIngredientsCuisineAppearances,
};
