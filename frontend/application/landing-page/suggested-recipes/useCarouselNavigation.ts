import { useEffect, useState } from "react";
import { getAnimationClass } from "./SuggestedRecipes";

export const useCarouselNavigation = (maxLength: number, carouselNavigationProps?: {
  transitionTime?: number;
}) => {
  const transitionTime = carouselNavigationProps?.transitionTime || 300;
  const [leftIndex, setLeftIndex] = useState(-1);
  const [temporaryIndex, setTemporary] = useState(0);
  const [visibleIndex, setIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setIndex(temporaryIndex);
    }, transitionTime);
  }, [temporaryIndex]);

  const animationClass = getAnimationClass(temporaryIndex, visibleIndex);

  const showNextRecipe = () => {
    if (temporaryIndex !== visibleIndex || temporaryIndex + 1 >= maxLength) {
      return;
    }
    setTemporary((i) => i + 1);
  };

  const showPrevRecipe = () => {
    if (temporaryIndex !== visibleIndex || temporaryIndex - 1 < 0) {
      return;
    }
    setTemporary((i) => i - 1);
  };

  return {
    leftIndex,
    rightIndex,
    visibleIndex,
    showNextRecipe,
    showPrevRecipe,
    animationClass,
  };
};
