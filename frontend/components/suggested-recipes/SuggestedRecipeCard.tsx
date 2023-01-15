import React from "react";
import { ISuggestion } from "../../types/suggestion";
import { CSSTransition } from "react-transition-group";

export const getCardContainerClassName = (position?: string) => {

  if(position === 'prev'){
    return  "suggestions-story__previous"
  }
  if(position === 'next'){
    return  "suggestions-story__next"
  }
  return "suggestions-story"
}

const SuggestedRecipeCard: React.FC<{suggestedRecipe: ISuggestion, className: string}> = ({ suggestedRecipe, className}) => {
  return <div className={className}>SuggestedRecipeCard {JSON.stringify(suggestedRecipe)}</div>

};

export default SuggestedRecipeCard;
