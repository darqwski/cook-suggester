import React, { useEffect, useState } from "react";
import { ISuggestion } from "../../types/suggestion";
import { IIngredient } from "../../types/ingredients";
import SuggestedRecipeCard from "./SuggestedRecipeCard";
import "./suggested-recipes.less";
import { CSSTransition } from "react-transition-group";
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
  const isSuggestionsVisible = !!suggestions.length;
  const [leftIndex, setLeftIndex] = useState(0);
  const [temporaryIndex, setTemporary] = useState(1);
  const [visibleIndex, setIndex] = useState(1);
  const [rightIndex, setRightIndex] = useState(2);

  useEffect(() => {
    setTimeout(() => {
      setIndex(temporaryIndex);
    }, 300);
  }, [temporaryIndex]);

  useEffect(() => {
    setTimeout(() => {
      if (leftIndex === visibleIndex) {
        setLeftIndex((index) => index - 1);
        setRightIndex((index) => index - 1);
      } else if (rightIndex === visibleIndex) {
        setRightIndex((index) => index + 1);
        setLeftIndex((index) => index + 1);
      }
    }, 300);
  }, [visibleIndex]);

  const animationClass = getAnimationClass(temporaryIndex, visibleIndex);

  return (
    <div
      className={`suggestions-container${
        isSuggestionsVisible ? "" : "__hidden"
      }`}
    >
      <button
        onClick={() => {
          if (temporaryIndex !== visibleIndex) {
            return;
          }
          setTemporary((i) => i - 1);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (temporaryIndex !== visibleIndex) {
            return;
          }
          setTemporary((i) => i + 1);
        }}
      >
        Next
      </button>
      {isSuggestionsVisible && (
        <div>
          {visibleIndex > 0 && (
            <SuggestedRecipeCard
              className={`suggestions-story suggestions-story__previous${animationClass}`}
              suggestedRecipe={suggestions[visibleIndex - 1]}
            />
          )}
          <SuggestedRecipeCard
            className={"suggestions-story" + animationClass}
            suggestedRecipe={suggestions[visibleIndex]}
          />
          {visibleIndex + 1 < suggestions.length && (
            <SuggestedRecipeCard
              className={`suggestions-story suggestions-story__next${animationClass}`}
              suggestedRecipe={suggestions[visibleIndex + 1]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestedRecipes;
