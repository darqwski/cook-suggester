import React from "react";
import SuggestedRecipeCard from "./SuggestedRecipeCard";
import { useCarouselNavigation } from "./useCarouselNavigation";
import "./suggested-recipes.less";
import { ISuggestedRecipe } from "../../../../global-types/recipes";
import { IIngredient } from "../../../../global-types/ingredients";

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
  suggestions: ISuggestedRecipe[];
  ingredients: IIngredient[];
}> = ({ suggestions, ingredients }) => {
  const lastRecipeIndex = suggestions.length;
  const { showNextRecipe, showPrevRecipe, visibleIndex, animationClass } =
    useCarouselNavigation(lastRecipeIndex);
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
        {visibleIndex > 0 ? (
          <div className="suggestions-container-arrow" onClick={showPrevRecipe}>
            Prev
          </div>
        ) : (
          <div style={{ flexGrow: 1 }} />
        )}
        {visibleIndex < lastRecipeIndex ? (
          <div className="suggestions-container-arrow" onClick={showNextRecipe}>
            Next
          </div>
        ) : (
          <div style={{ flexGrow: 1 }} />
        )}
      </div>
    </>
  );
};

export default SuggestedRecipes;
