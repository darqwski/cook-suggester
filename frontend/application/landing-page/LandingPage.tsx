import React, { useEffect, useState } from "react";
import { getRecipes } from "../../utils/tasty-api";
import "./landing-page.less";
import RecipeStory from "./RecipeStory";

export interface IRecipeComponent {
  raw_text: string;
}

export interface IRecipeSection {
  components: IRecipeComponent[];
}
export interface IRecipe {
  sections?: IRecipeSection[];
  recipes?: IRecipe[];
  thumbnail_url: string;
  name: string;
}

export interface IRecipeStory {
  name: string;
  img: string;
  ingredients: string[];
}

const parseRecipes = (groupedRecipes: IRecipe[]): IRecipeStory[] => {
  const recipes = groupedRecipes.flatMap((groupedRecipe) => {
    if (groupedRecipe.recipes) {
      return groupedRecipe.recipes;
    }
    return [groupedRecipe];
  });

  const recipeStories: IRecipeStory[] = [];

  recipes.forEach((recipe) => {
    const { sections, thumbnail_url, name } = recipe;

    if (!sections) {
      return;
    }

    const recipeStory: IRecipeStory = {
      img: thumbnail_url,
      name,
      ingredients: [],
    };

    sections.forEach((section) => {
      section.components.forEach((component) => {
        recipeStory.ingredients.push(component.raw_text);
      });
    });

    recipeStories.push(recipeStory);
  });

  return recipeStories;
};

const LandingPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [recipeStories, setRecipeStories] = useState<IRecipeStory[]>([]);

  useEffect(() => {
    getRecipes(page).then((recipes) => {
      console.log({ recipes });
      const parsedRecipes = parseRecipes(recipes);
      console.log({ parsedRecipes });
      setRecipeStories((prevState) => [...prevState, ...parsedRecipes]);
    });
  }, [page]);

  useEffect(() => {
    if (recipeIndex + 1 >= recipeStories.length && recipeStories.length !== 0) {
      setPage((i) => i + 1);
    }
  }, [recipeIndex]);
  console.log({ recipeStories });
  const currentRecipe = recipeStories[recipeIndex];

  console.log(currentRecipe)
  return currentRecipe ? (
    <div className="story-container" >
      {recipeIndex > 0 && (
        <div className="story-container__arrow-left" onClick={() => setRecipeIndex((i) => i - 1)}>
          <i className="material-icons">arrow_back</i>
        </div>
      )}
      {currentRecipe && <RecipeStory currentRecipe={currentRecipe} />}
      {recipeIndex < recipeStories.length && (
        <div className="story-container__arrow-right" onClick={() => setRecipeIndex((i) => i + 1)}>
        <i className="material-icons">arrow_forward</i>
        </div>
      )}
    </div>
  ) : (
    <div>Ładowanie przepisów</div>
  );
};

export default LandingPage;
