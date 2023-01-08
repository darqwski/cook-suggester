import React, { useEffect, useMemo, useState } from "react";
import { IIngredient, IRecipeIngredient } from "../types/ingredients";
import { fetchBasicIngredientsList } from "../utils/api/ingredients";
import WithLabel from "./forms/WitLabel";

const IngredientPicker: React.FC<{
  onChange?: (newRecipeIngredients: IRecipeIngredient[]) => void;
  withMandatoryAmount?: boolean;
}> = ({ onChange, withMandatoryAmount = false }) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isIngredientsLoading, setIngredientsLoading] = useState(true);
  const [recipeIngredients, setRecipeIngredients] = useState<IRecipeIngredient[]>(
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
          ingredientNameInput !== "" &&
          (ingredient.name?.includes(ingredientNameInput) ||
            ingredient.category?.includes(ingredientNameInput))
      ),
    [ingredientNameInput, ingredients]
  );

  useEffect(() => {
    onChange?.(recipeIngredients);
  }, [recipeIngredients]);

  const selectRecipeIngredient = (ingredient: IIngredient) => {
    setRecipeIngredients((prevRecipeIngredients) => [
      { ingredient, ingredientId: ingredient.id,
      //TODO default amounts and units
        ingredientAmount: 0,
        ingredientUnit: ''
        },
      ...prevRecipeIngredients,
    ]);
    setIngredients((prevIngredients) =>
      prevIngredients.filter(
        (prevIngredient) => prevIngredient.id !== ingredient.id
      )
    );
    setIngredientNameInput('')
  };

  const changeIngredientAmount = (ingredientId:number, amount: number) => {
    setRecipeIngredients(prevRecipeIngredients => prevRecipeIngredients.map(prevRecipeIngredient=>{
      if(prevRecipeIngredient.ingredientId !== ingredientId){
        return prevRecipeIngredient
      }
      return {
        ...prevRecipeIngredient,
        ingredientAmount: amount
      }
    }))
  };

  const changeIngredientUnit = (ingredientId:number, unit: string) => {
    setRecipeIngredients(prevRecipeIngredients => prevRecipeIngredients.map(prevRecipeIngredient=>{
      if(prevRecipeIngredient.ingredientId !== ingredientId){
        return prevRecipeIngredient
      }
      return {
        ...prevRecipeIngredient,
        ingredientUnit: unit
      }
    }))
  };

  return (
    <div style={{ margin: "1rem" }}>
      <p>Select ingredients</p>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1", margin: "1rem" }}>
          <p>
            <input
              placeholder="Start typing to filter ingredients..."
              onChange={(event) => setIngredientNameInput(event.target.value)}
            />
          </p>
          <div>
            {filteredIngredients.map((filteredIngredient) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => selectRecipeIngredient(filteredIngredient)}
              >
                <p>{filteredIngredient.name}</p>
                <p style={{ fontSize: "0.75rem" }}>{filteredIngredient.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flexGrow: "1", margin: "1rem" }}>
          <div>
            <p>Your ingredients</p>
          </div>
          <div>
            {recipeIngredients.map((recipeIngredient) => (
              <div>
                <div>
                  <p>{recipeIngredient.ingredient?.name}</p>
                  <p style={{ fontSize: "0.75rem" }}>
                    {recipeIngredient.ingredient?.name}
                  </p>
                </div>
                <div>
                  <WithLabel label="Amount (e.g 200g of meat)">
                    <div style={{ display: "flex" }}>
                      <input
                        placeholder="amount in number"
                        onChange={(event) =>
                          changeIngredientAmount(recipeIngredient.ingredientId, +event.target.value)
                        }
                      />
                      <input
                        placeholder="g/pieces/ml"
                        onChange={(event) =>
                          changeIngredientUnit(recipeIngredient.ingredientId, event.target.value)
                        }
                      />
                    </div>
                  </WithLabel>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientPicker;
