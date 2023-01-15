import React from "react";
import { IRecipeIngredient } from "../../../types/ingredients";

const SuggestedRecipeIngredient: React.FC<{
  recipeIngredient: IRecipeIngredient;
  isMatching?: boolean;
}> = ({ recipeIngredient, isMatching }) => {
  const { ingredient, ingredientId, ingredientAmount, ingredientUnit  } = recipeIngredient;
  const ingredientName = ingredient ? ingredient.ingredientName : 'unknown ingredient'
  return <div className="suggestions-story-ingredient">
    <div className={"suggestions-story-ingredient__image"+ ( isMatching ? ' suggestions-story-ingredient--is-matching': '')}>{ingredientId}
      {isMatching && <div className="tick-icon" />}</div>
    <div className="suggestions-story-ingredient__name">{ingredientName}</div>
    <div className="suggestions-story-ingredient__amount">{ingredientAmount} {ingredientUnit}</div>
  </div>;
};

export default SuggestedRecipeIngredient;
