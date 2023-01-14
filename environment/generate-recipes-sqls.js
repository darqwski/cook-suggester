const fs = require('fs')

const ingredientInDb = [2,3,13,17,23,29];

const recipes = [];
const baseProbability = 0.015
const ingredientsProbability = [,,,baseProbability, baseProbability / (ingredientInDb.length ** 1), baseProbability/ (ingredientInDb.length ** 2), baseProbability/ (ingredientInDb.length ** 4)];

const generateRecipes =  (currentList, maxDepth, currentLevel = 0) => {
  const adjustedLists = ingredientInDb.map(ingredient =>  currentList.includes(ingredient) ? [...currentList] : [...currentList, ingredient] );
  if(currentLevel >= maxDepth) {
    const probability = ingredientsProbability[maxDepth];
    adjustedLists.forEach(adjustedList => {
      if(probability > Math.random()) {
        recipes.push([...adjustedList])
      }
    })

  } else {
    for(let i = 0;i<adjustedLists.length;i++){
       generateRecipes([...adjustedLists[i]], maxDepth, currentLevel + 1)
    }
  }
}

generateRecipes([], 3)
generateRecipes([], 4)
generateRecipes([], 5)

console.log("RECIPES GENERATED IN "+recipes.length+" AMOUNT");
let finalContent = ``;
const generateSqlForRecipe = (recipe) => {
  const recipeNumber = recipe.reduce((acc, item) => acc * item,1)
  let cuisineId = `${recipeNumber}`.split('').reduce((acc,item) => acc + item, 0);
  while(cuisineId > 10) {
    cuisineId = `${cuisineId}`.split("").reduce((acc, item) => acc + Number(item), 0);
  }
  finalContent +=`

INSERT INTO \`recipes\` (\`recipeId\`, \`recipeName\`, \`recipeUrl\`, \`cuisineId\`, \`recipeSuggestedTimes\`, \`recipeIngredientsAverageCommonness\`, 
\`recipeComplexity\`, \`recipeCommonnessInCuisine\`, \`recipeSuggestionScore\`, \`recipeTimeInMinutes\`) 
VALUES (${recipeNumber}, 'Recipe ${recipeNumber}', 'recipe-${recipeNumber}', '${cuisineId}', '0', NULL, '1', NULL, NULL, '1');`
  recipe.forEach(ingredient => {
    finalContent+=`
INSERT INTO \`recipe_ingredient\` (\`recipeIngredientId\`, \`recipeId\`, \`ingredientId\`, \`ingredientAmount\`, \`ingredientUnit\`) 
VALUES (NULL, '${ingredient}', '${recipeNumber}', '${Math.round(Math.random()*1000)}', 'g');`
  })
}
recipes.forEach((recipe,index) => {
  if(index % 10 === 9){
    console.log("Recipes from "+(index-9)+" to "+index+" added")
  }
  generateSqlForRecipe(recipe);
});

fs.writeFileSync('recipes-sql', finalContent)



  console.log(recipes.length)

