import { queryAllIngredientsWithCategory } from "./ingredients.utils.query";
import express, { Request, Response } from "express";
import { IIngredient } from "../../../types/ingredients";
const router = express.Router();

router.get("/API/ingredients/", async (req: Request, res: Response) => {
  const ingredients = await queryAllIngredientsWithCategory()
  const ingredientsWithCategory: IIngredient[] = ingredients.map(({
    ingredientCategoryId, ingredientCategoryName, appearanceInRecipes,...rest
  })=>({
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
