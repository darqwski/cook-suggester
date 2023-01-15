import { useEffect, useState } from "react";
import { getAnimationClass } from "./SuggestedRecipes";

export const useCarouselNavigation = (carouselNavigationProps?: {
  transitionTime?: number;
}) => {
  const transitionTime = carouselNavigationProps?.transitionTime || 300;
  const [leftIndex, setLeftIndex] = useState(0);
  const [temporaryIndex, setTemporary] = useState(1);
  const [visibleIndex, setIndex] = useState(1);
  const [rightIndex, setRightIndex] = useState(2);

  useEffect(() => {
    setTimeout(() => {
      setIndex(temporaryIndex);
    }, transitionTime);
  }, [temporaryIndex]);

  const animationClass = getAnimationClass(temporaryIndex, visibleIndex);

  const showNextRecipe = () => {
    if (temporaryIndex !== visibleIndex) {
      return;
    }
    setTemporary((i) => i + 1);
  };

  const showPrevRecipe = () => {
    if (temporaryIndex !== visibleIndex) {
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
