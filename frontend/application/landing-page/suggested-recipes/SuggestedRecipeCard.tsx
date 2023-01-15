import React, { useMemo } from "react";
import { ISuggestion } from "../../../types/suggestion";
import { CSSTransition } from "react-transition-group";
import { IIngredient, IRecipeIngredient } from "../../../types/ingredients";
import suggestedRecipes from "./SuggestedRecipes";
import SuggestedRecipeIngredient from "./SuggestedRecipeIngredient";
import CirclePercentBar from "../../../components/circle-percent-bar/CirclePercentBar";

export const getCardContainerClassName = (position?: string) => {
  if (position === "prev") {
    return "suggestions-story__previous";
  }
  if (position === "next") {
    return "suggestions-story__next";
  }
  return "suggestions-story";
};

export const matchIngredientsWithSuggestion = (
  suggestedRecipe: ISuggestion,
  ingredients: IIngredient[]
) => {
  const matchingIngredients: IRecipeIngredient[] =
    suggestedRecipe.matchingIngredients.map((matchingIngredient) => ({
      ...matchingIngredient,
      ingredient: ingredients.find(
        (ingredient) =>
          ingredient.ingredientId === matchingIngredient.ingredientId
      ),
    }));

  const missingIngredients: IRecipeIngredient[] =
    suggestedRecipe.missingIngredients.map((missingIngredient) => ({
      ...missingIngredient,
      ingredient: ingredients.find(
        (ingredient) =>
          ingredient.ingredientId === missingIngredient.ingredientId
      ),
    }));

  return {
    ...suggestedRecipe,
    matchingIngredients,
    missingIngredients
  }
};

export const getSuggestionScoreStyles = (suggestionScore: number) => {
  return {

  }
}

const SuggestedRecipeCard: React.FC<{
  suggestedRecipe: ISuggestion;
  className: string;
  ingredients?: IIngredient[];
}> = ({ suggestedRecipe, ingredients = [], className }) => {
  const suggestedRecipeWithIngredients: ISuggestion = useMemo(
    () => matchIngredientsWithSuggestion(suggestedRecipe, ingredients),
    [suggestedRecipe, ingredients]
  );
  const { matchingIngredients, missingIngredients, recipeComplexity, recipeTimeInMinutes, suggestionScore} = suggestedRecipeWithIngredients;

  return <div className={className}>
    <div className="suggestions-story__header">
      <div />
      <h3>{suggestedRecipeWithIngredients.recipeName}</h3>
      <CirclePercentBar percentage={suggestionScore * 100} barOptions={{ progressBarSize: '5rem', progressBarWidth: '1.5rem'}} />
    </div>
    <div className="suggestions-story__image-section">
        <img className="suggestions-story__image" src="https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_spaghetti_bolognese_93639_16x9.jpg" />
    </div>
    <div className="suggestions-story__ingredients-list">
      {missingIngredients.map(missingIngredient=> <SuggestedRecipeIngredient recipeIngredient={missingIngredient} />)}
      {matchingIngredients.map(matchingIngredient=> <SuggestedRecipeIngredient recipeIngredient={matchingIngredient} isMatching />)}
    </div>
    <div className="suggestions-story__footer">
      <div className="value-desc">
        <p className="desc">Complexity</p>
        <p className="value">{recipeComplexity}/10</p>
      </div>
      <div className="value-desc">
        <p className="desc">Preparation time</p>
        <p className="value">{recipeTimeInMinutes} min</p>
      </div>
    </div>
  </div>;
};

export default SuggestedRecipeCard;
