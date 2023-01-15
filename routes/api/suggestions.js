const express = require("express");
const { executeQuery } = require("../../utils/database-utils");
const router = express.Router();
//TODO
// add index for ingredientId in recipe_ingredient
//TODO
// update commonness in ingredients
// update recipeSuggestedTimes in recipe
router.post("/API/suggestions/", async (req, res, next) => {
    const selectedIngredients = req.body;
    const selectedIngredientIds = selectedIngredients.map(selectedIngredient => selectedIngredient.ingredientId);

    console.time("querying recipe_ingredient by ingredients from user")
    const mostMatchingRecipesForIngredients = await executeQuery(`
     SELECT (COUNT(*)/ ingredientsInRecipe) as matchingProportion, ingredientsInRecipe, recipeId 
     FROM \`recipe_ingredient\` 
     WHERE ingredientId IN (?) 
     GROUP BY recipeId 
     ORDER BY matchingProportion DESC 
    `, [selectedIngredientIds])
    console.timeEnd("querying recipe_ingredient by ingredients from user")

    const mostMatchingRecipesIds = mostMatchingRecipesForIngredients.map(mostMatchingRecipesForIngredient => mostMatchingRecipesForIngredient.recipeId)
    console.time("querying recipes information")

    //For some reason parameters is not working
    const mostMatchingRecipesInformation = await executeQuery(`
        SELECT * FROM \`recipes\`
        WHERE recipeId IN (?);
    `, [mostMatchingRecipesIds]);
    console.timeEnd("querying recipes information")
    console.time("querying missing ingredients")
    //For some reason parameters is not working
    const allIngredientsForRecipes = await executeQuery(
      `SELECT * FROM \`recipe_ingredient\` WHERE recipeId IN (?);`,
      [mostMatchingRecipesIds]
    );

    console.timeEnd("querying missing ingredients")
    const distinctIngredientIds = allIngredientsForRecipes.reduce((acc, ingredient)=>{
       if(acc.includes(ingredient.ingredientId)){
           return acc
       }
       return [...acc, ingredient.ingredientId]
    },[])
    console.time("querying missing ingredients information");
    const ingredientsInformation = await executeQuery(`SELECT * FROM \`ingredients\` WHERE ingredientId IN (?);`,[distinctIngredientIds]);
    console.timeEnd("querying missing ingredients information")
    console.time("Building proper object");

    const mostMatchingRecipesWithIngredients = allIngredientsForRecipes.reduce((acc, ingredientRecipe)=>{
        let currentRecipe = acc[ingredientRecipe.recipeId];
        if(!currentRecipe){
            const recipe = mostMatchingRecipesInformation.find(
              (mostMatchingRecipeInformation) => mostMatchingRecipeInformation.recipeId === ingredientRecipe.recipeId
            );
            currentRecipe = { ...recipe, matchingIngredients: [], missingIngredients: [] };
        }

        if(selectedIngredientIds.includes(ingredientRecipe.ingredientId)){
            currentRecipe.matchingIngredients.push(ingredientRecipe)
        } else {
            currentRecipe.missingIngredients.push(ingredientRecipe)
        }

        return { ...acc, [ingredientRecipe.recipeId]: currentRecipe }
    }, {})
    const recipesWithCalculatedFields = Object.values(mostMatchingRecipesWithIngredients).map(recipe => ({
        ...recipe,
        suggestionScore:  recipe.matchingIngredients.length / (recipe.matchingIngredients.length + recipe.missingIngredients.length)
    }));
    const sortedRecipes = recipesWithCalculatedFields.sort((recipeA, recipeB) => recipeB.suggestionScore - recipeA.suggestionScore)
    console.timeEnd("Building proper object");



    res.send({ suggestedRecipes: sortedRecipes, ingredients: ingredientsInformation });
});

module.exports = router;
