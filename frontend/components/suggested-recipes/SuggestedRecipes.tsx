import React, { useEffect, useState } from "react";
import { ISuggestion } from "../../types/suggestion";
import { IIngredient } from "../../types/ingredients";
import SuggestedRecipeCard from "./SuggestedRecipeCard";
import './suggested-recipes.less';
import { CSSTransition } from "react-transition-group";
export const getAnimationClass = (temporaryIndex: number, visibleIndex: number) => {
  if(temporaryIndex === visibleIndex){
    return ''
  }
  if(temporaryIndex  > visibleIndex){
    return ' suggestions-story__move-left'
  }
  return ' suggestions-story__move-right'
}
const SuggestedRecipes: React.FC<{suggestions: ISuggestion[], ingredients: IIngredient[]}> = ( { suggestions, ingredients}) => {
  const isSuggestionsVisible = !!suggestions.length;
  const [leftIndex, setLeftIndex] = useState(0)
  const [temporaryIndex, setTemporary] = useState(1)
  const [visibleIndex, setIndex] = useState(1)
  const [rightIndex, setRightIndex] = useState(2)

  useEffect(() => {
    setTimeout(()=>{
      setIndex(temporaryIndex)
    },300)
  },[temporaryIndex]);
  useEffect(() => {
    console.log(leftIndex, visibleIndex, rightIndex)
    setTimeout(()=>{
      if(leftIndex === visibleIndex){
        setLeftIndex(index=>index - 1)
        setRightIndex(index=>index - 1)
      } else if(rightIndex === visibleIndex) {
        setRightIndex(index=>index + 1)
        setLeftIndex(index=>index + 1)
      }

    },300)
  },[visibleIndex]);

  const animationClass = getAnimationClass(temporaryIndex, visibleIndex);

  return <div className={`suggestions-container${isSuggestionsVisible ? '' : '__hidden'}` }>
    <button onClick={() => setTemporary(i=>i-1)}>Prev</button>
    <button  onClick={() => setTemporary(i=>i+1)}>Next</button>
    {isSuggestionsVisible && (<div>
      <div className={"suggestions-story suggestions-story__previous"+animationClass}>Suggestion {leftIndex}</div>
      <div className={"suggestions-story"+animationClass} >Suggestion {visibleIndex}</div>
      <div className={"suggestions-story suggestions-story__next"+animationClass}>Suggestion {rightIndex}</div>

    </div>)}
  </div>;
};

export default SuggestedRecipes;