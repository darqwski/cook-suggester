import React, { useState } from "react";
import "./landing-page.less";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import IngredientPicker from "../../components/IngredientPicker";
import { fetchSuggestionsList } from "../../utils/api/suggestions";
import SuggestedRecipes from "../../components/suggested-recipes/SuggestedRecipes";
import { ISuggestion } from "../../types/suggestion";
import {
  ingredientsExample,
  suggestedRecipesExample
} from "../../components/suggested-recipes/suggested-recipe.example";

const LandingPage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<IRecipeIngredient[]>(
    []
  );
  const [suggestions, setSuggestions] = useState<ISuggestion[]>(suggestedRecipesExample);
  const [suggestedIngredients, setSuggestedIngredients] = useState<IIngredient[]>(
    ingredientsExample
  );

  const fetchSuggestions = async () => {
   const data = await fetchSuggestionsList(selectedIngredients);
    setSuggestions(data.suggestedRecipes);
    setSuggestedIngredients(data.ingredients)
  }
  return (
    <div>
      <h3>Welcome in cook suggester</h3>
      <p>Please add ingredients: </p>
      {selectedIngredients.length !== 0 && (
        <div>
          <button onClick={fetchSuggestions}>Suggest meal!</button>
        </div>
      )}
      <SuggestedRecipes suggestions={suggestions} ingredients={suggestedIngredients} />
      <IngredientPicker onChange={setSelectedIngredients} />
    </div>
  );
};

export default LandingPage;
