import React, { useEffect, useState } from "react";
import { ISuggestion } from "../../types/suggestion";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import SuggestedRecipeCard from "./SuggestedRecipeCard";
import "./suggested-recipes.less";
import { useCarouselNavigation } from "./useCarouselNavigation";

export const getAnimationClass = (
  temporaryIndex: number,
  visibleIndex: number
) => {
  if (temporaryIndex === visibleIndex) {
    return "";
  }
  if (temporaryIndex > visibleIndex) {
    return " suggestions-story__move-left";
  }
  return " suggestions-story__move-right";
};
const SuggestedRecipes: React.FC<{
  suggestions: ISuggestion[];
  ingredients: IIngredient[];
}> = ({ suggestions, ingredients }) => {
  const { showNextRecipe, showPrevRecipe, visibleIndex, animationClass } =
    useCarouselNavigation();
  return (
    <>
      <div className="suggestions-story-background" />
      <div className="suggestions-story-container">
        {visibleIndex > 0 && (
          <SuggestedRecipeCard
            className={`suggestions-story suggestions-story__previous${animationClass}`}
            suggestedRecipe={suggestions[visibleIndex - 1]}
            ingredients={ingredients}
          />
        )}
        <SuggestedRecipeCard
          className={"suggestions-story" + animationClass}
          suggestedRecipe={suggestions[visibleIndex]}
          ingredients={ingredients}
        />
        {visibleIndex + 1 < suggestions.length && (
          <SuggestedRecipeCard
            className={`suggestions-story suggestions-story__next${animationClass}`}
            suggestedRecipe={suggestions[visibleIndex + 1]}
            ingredients={ingredients}
          />
        )}
      </div>
      <div className="suggestions-story-navigation">
        <div className="suggestions-container-arrow" onClick={showPrevRecipe}>
          Prev
        </div>
        <div className="suggestions-container-arrow" onClick={showNextRecipe}>
          Next
        </div>
      </div>
    </>
  );
};

export default SuggestedRecipes;
