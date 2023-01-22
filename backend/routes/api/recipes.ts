import express, { Request, Response } from "express";
import { IAddRecipePayload } from "../../../global-types/adding-recipe";
import { insertAllRecipeIngredients, insertNewRecipe } from "./recipe.utils.inserting";
import { updateIngredientsCuisineAppearances } from "./recipe.utils.updating";
const router = express.Router();

router.post("/API/recipes/", async (req: Request, res:Response) => {
  const { recipeDetails, ingredients } = req.body as IAddRecipePayload;
  const {
    cuisineId,
  } = recipeDetails;

  const recipeId = await insertNewRecipe(
    recipeDetails,
    ingredients.length
  );

  await insertAllRecipeIngredients(ingredients, recipeId);
  await updateIngredientsCuisineAppearances(cuisineId, ingredients);

  res.send({ message: "ok" });
});

module.exports = router;
