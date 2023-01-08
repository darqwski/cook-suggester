import React, { useEffect, useMemo, useState } from "react";
import "./landing-page.less";
import appRequest from "../../utils/app-request";
import { fetchBasicIngredientsList } from "../../utils/api/ingredients";
import { IIngredient } from "../../types/ingredients";

const LandingPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isIngredientsLoading, setIngredientsLoading] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>(
    []
  );
  const [ingredientNameInput, setIngredientNameInput] = useState("");

  useEffect(() => {
    fetchBasicIngredientsList()
      .then(setIngredients)
      .then(() => setIngredientsLoading(false));
  }, []);

  const filteredIngredients = useMemo(
    () =>
      ingredients.filter(
        (ingredient) =>
            ingredientNameInput !== '' &&(
          ingredient.name?.includes(ingredientNameInput) ||
          ingredient.category?.includes(ingredientNameInput))
      ),
    [ingredientNameInput, ingredients]
  );

  const selectIngredient = (ingredient: IIngredient) => {
    setSelectedIngredients(prevIngredients=> [ingredient, ...prevIngredients, ]);
    setIngredients(prevIngredients=>prevIngredients.filter(prevIngredient =>prevIngredient.id !== ingredient.id))
  }

  return (
    <div>
      <h3>Welcome in cook suggester</h3>
      <p>Please add ingredients: </p>
      <div style={{display:'flex'}}>
        <div style={{ flexGrow: "1" }}>
          <p>
            <input placeholder="Start typing to filter ingredients..." onChange={(event => setIngredientNameInput(event.target.value))} />
          </p>
          <div>
            {filteredIngredients.map((filteredIngredient) => (
                <div style={{cursor:'pointer'}} onClick={() => selectIngredient(filteredIngredient)}>
                  <p>{filteredIngredient.name}</p>
                  <p style={{fontSize:'0.75rem'}}>{filteredIngredient.name}</p>
                </div>
            ))}
          </div>
        </div>
        <div style={{ flexGrow: "1"}}>
          <div>
            <p>Your ingredients</p>
          </div>
          {selectedIngredients.length !== 0 && <div>
            <button>Suggest meal!</button>
          </div>}
          <div>
            {selectedIngredients.map((selectedIngredient) => (
              <div>
                  <p>{selectedIngredient.name}</p>
                  <p style={{fontSize:'0.75rem'}}>{selectedIngredient.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
