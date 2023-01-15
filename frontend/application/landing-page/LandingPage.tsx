import React, { useState } from "react";
import "./landing-page.less";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import IngredientPicker from "../../components/IngredientPicker";
import { fetchSuggestionsList } from "../../utils/api/suggestions";
import SuggestedRecipes from "../../components/suggested-recipes/SuggestedRecipes";
import { ISuggestion } from "../../types/suggestion";
import Loader from "../../components/Loader";

const LandingPage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<IRecipeIngredient[]>(
    []
  );
  const [isSuggestionsLoading, setSuggestionLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState<IIngredient[]>(
    []
  );

  const fetchSuggestions = async () => {
    setSuggestionLoading(true)
   const data = await fetchSuggestionsList(selectedIngredients);
    setSuggestions(data.suggestedRecipes);
    setSuggestedIngredients(data.ingredients)
    setSuggestionLoading(false)
  }
  const isSuggestionsVisible = !!suggestions.length && !!suggestedIngredients.length
  return (
    <div>
      <h3>Welcome in cook suggester</h3>
      <p>Please add ingredients: </p>
      {selectedIngredients.length !== 0 && (
        <div>
          <button onClick={fetchSuggestions}>Suggest meal!</button>
        </div>
      )}
      {isSuggestionsVisible && <SuggestedRecipes suggestions={suggestions} ingredients={suggestedIngredients} />}
      {isSuggestionsLoading &&  <Loader />}
      <IngredientPicker onChange={setSelectedIngredients} />
    </div>
  );
};

export default LandingPage;
