import React, { useState } from "react";
import "./landing-page.less";
import { IRecipeIngredient } from "../../types/ingredients";
import IngredientPicker from "../../components/IngredientPicker";

const LandingPage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<IRecipeIngredient[]>(
    []
  );
  return (
    <div>
      <h3>Welcome in cook suggester</h3>
      <p>Please add ingredients: </p>
      {selectedIngredients.length !== 0 && (
        <div>
          <button>Suggest meal!</button>
        </div>
      )}
      <IngredientPicker onChange={setSelectedIngredients} />
    </div>
  );
};

export default LandingPage;
