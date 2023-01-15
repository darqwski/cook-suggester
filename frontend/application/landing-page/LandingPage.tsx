import React, { useState } from "react";
import "./landing-page.less";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import IngredientPicker from "../../components/ingredient-picker/IngredientPicker";
import { fetchSuggestionsList } from "../../utils/api/suggestions";
import SuggestedRecipes from "./suggested-recipes/SuggestedRecipes";
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
  const clearSuggestions = () => {
    setSuggestions([]);
    setSuggestedIngredients([])
  }
  const isSuggestionsVisible = !!suggestions.length && !!suggestedIngredients.length
  return (
    <div>
      <h3>Welcome in cook suggester</h3>
      <p>Please add ingredients: </p>

      {isSuggestionsVisible && <SuggestedRecipes suggestions={suggestions} ingredients={suggestedIngredients} />}
      {isSuggestionsLoading &&  <Loader />}
      <IngredientPicker onChange={setSelectedIngredients} />
      {selectedIngredients.length !== 0 && (
        <div className="suggest-button-container">
          <button className="btn btn-large" onClick={suggestions.length ? clearSuggestions : fetchSuggestions}>{suggestions.length ? "Change ingredients" : "Suggest meal!"}</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
