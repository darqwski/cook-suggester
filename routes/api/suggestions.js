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
    `, [selectedIngredientIds.join(',')])
    console.timeEnd("querying recipe_ingredient by ingredients from user")

    const mostMatchingRecipesIds = mostMatchingRecipesForIngredients.map(mostMatchingRecipesForIngredient => mostMatchingRecipesForIngredient.recipeId)
    console.time("querying recipes information")

    //For some reason parameters is not working
    const mostMatchingRecipesInformation = await executeQuery(`
        SELECT * FROM \`recipes\`
        WHERE recipeId IN (${mostMatchingRecipesIds.join(',')});
    `);
    console.timeEnd("querying recipes information")
    console.time("querying missing ingredients")
    //For some reason parameters is not working
    const allIngredientsForRecipes = await executeQuery(
      `SELECT * FROM \`recipe_ingredient\` WHERE recipeId IN (${mostMatchingRecipesIds.join(',')});`
    );

    console.timeEnd("querying missing ingredients")
    const distinctIngredientIds = allIngredientsForRecipes.reduce((acc, ingredient)=>{
       if(acc.includes(ingredient.ingredientId)){
           return acc
       }
       return [...acc, ingredient.ingredientId]
    },[])
    console.time("querying missing ingredients information");
    const ingredientsInformation = await executeQuery(`SELECT * FROM \`ingredients\` WHERE ingredientId IN (${distinctIngredientIds.join(',')});`);
    console.timeEnd("querying missing ingredients information")
    console.time("Building proper object");

    const mostMatchingRecipesWithIngredients = allIngredientsForRecipes.reduce((acc, ingredientRecipe)=>{
        let currentRecipe = acc[ingredientRecipe.recipeId];
        if(!currentRecipe){
            const recipe = mostMatchingRecipesInformation.find(
              (mostMatchingRecipeInformation) => mostMatchingRecipeInformation.recipeId === ingredientRecipe.recipeId
            );
            currentRecipe = { ...recipe, matchingIngredientIds: [], missingIngredientIds: [] };
        }

        if(selectedIngredientIds.includes(ingredientRecipe.ingredientId)){
            currentRecipe.matchingIngredientIds.push(ingredientRecipe.ingredientId)
        } else {
            currentRecipe.missingIngredientIds.push(ingredientRecipe.ingredientId)
        }

        return { ...acc, [ingredientRecipe.recipeId]: currentRecipe }
    }, {})
    const recipesWithCalculatedFields = Object.values(mostMatchingRecipesWithIngredients).map(recipe => ({
        ...recipe,
        suggestionScore:  recipe.matchingIngredientIds.length / (recipe.matchingIngredientIds.length + recipe.missingIngredientIds.length)
    }));
    const sortedRecipes = recipesWithCalculatedFields.sort((recipeA, recipeB) => recipeA.suggestionScore - recipeB.suggestionScore)
    console.timeEnd("Building proper object");



    res.send({ suggestedRecipes: recipesWithCalculatedFields, ingredients: ingredientsInformation });
});

module.exports = router;
