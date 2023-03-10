import React, { useState } from "react";
import "./landing-page.less";
import { IIngredient, IRecipeIngredient } from "../../../global-types/ingredients";
import IngredientPicker from "../../components/ingredient-picker/IngredientPicker";
import { fetchSuggestionsList } from "../../utils/api/suggestions";
import SuggestedRecipes from "./suggested-recipes/SuggestedRecipes";
import Loader from "../../components/Loader";
import { ISuggestedRecipe } from "../../../global-types/recipes";
import FilterSelector from "./filter-selector/FilterSelector";
import { IFilter } from "../../../global-types/filters";

const LandingPage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<IRecipeIngredient[]>(
    []
  );
  const [isSuggestionsLoading, setSuggestionLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<ISuggestedRecipe[]>([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState<IIngredient[]>(
    []
  );
  const [selectedFilters, setSelectFilters] = useState<IFilter[]>([]);


  const fetchSuggestions = async () => {
    setSuggestionLoading(true)
   const data = await fetchSuggestionsList({ recipeIngredients: selectedIngredients, filters: selectedFilters });
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
      <div>
        <p>Menu</p>
        <a href="/moderator/add-recipe/">Adding recipe</a>
      </div>
      <p>Select optional filters: </p>
      <FilterSelector onChange={setSelectFilters} />
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
