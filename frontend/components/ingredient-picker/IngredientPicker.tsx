import React, { useEffect, useMemo, useState } from "react";
import { IIngredient, IRecipeIngredient } from "../../../types/ingredients";
import { fetchBasicIngredientsList } from "../../utils/api/ingredients";
import WithLabel from "../forms/WitLabel";
import "./ingredient-picker.less";

const IngredientPicker: React.FC<{
  onChange?: (newRecipeIngredients: IRecipeIngredient[]) => void;
  withMandatoryAmount?: boolean;
}> = ({ onChange, withMandatoryAmount = false }) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isIngredientsLoading, setIngredientsLoading] = useState(true);
  const [recipeIngredients, setRecipeIngredients] = useState<
    IRecipeIngredient[]
  >([]);

  console.log(ingredients);
  const [ingredientNameInput, setIngredientNameInput] = useState("");
  useEffect(() => {
    fetchBasicIngredientsList()
      .then(setIngredients)
      .then(() => setIngredientsLoading(false));
  }, []);

  const filteredIngredients = useMemo(() => {
    if (ingredientNameInput === "") {
      return [];
    }
    const matchedByName = ingredients.filter(({ ingredientName }) =>
      ingredientName.includes(ingredientNameInput)
    );
    const matchedByCategory = ingredients.filter(({ category }) =>
      category.ingredientCategoryName.includes(ingredientNameInput)
    );

    return [...matchedByName, ...matchedByCategory];
  }, [ingredientNameInput, ingredients]);

  useEffect(() => {
    onChange?.(recipeIngredients);
  }, [recipeIngredients]);

  const selectRecipeIngredient = (ingredient: IIngredient) => {
    setRecipeIngredients((prevRecipeIngredients) => [
      {
        ingredient,
        ingredientId: ingredient.ingredientId,
        //TODO default amounts and units
        ingredientAmount: 0,
        ingredientUnit: ingredient.defaultUnit,
      },
      ...prevRecipeIngredients,
    ]);
    setIngredients((prevIngredients) =>
      prevIngredients.filter(
        (prevIngredient) =>
          prevIngredient.ingredientId !== ingredient.ingredientId
      )
    );
    setIngredientNameInput("");
  };

  const unselectRecipeIngredient = (recipeIngredient: IRecipeIngredient) => {
    const { ingredient } = recipeIngredient;
    if (!ingredient) {
      return;
    }
    setRecipeIngredients((recipeIngredients) =>
      recipeIngredients.filter(
        (recipeIngredient) =>
          recipeIngredient.ingredientId !== ingredient.ingredientId
      )
    );
    setIngredients((ingredients) => [...ingredients, ingredient]);
  };

  const changeIngredientAmount = (ingredientId: number, amount: number) => {
    setRecipeIngredients((prevRecipeIngredients) =>
      prevRecipeIngredients.map((prevRecipeIngredient) => {
        if (prevRecipeIngredient.ingredientId !== ingredientId) {
          return prevRecipeIngredient;
        }
        return {
          ...prevRecipeIngredient,
          ingredientAmount: amount,
        };
      })
    );
  };

  const changeIngredientUnit = (ingredientId: number, unit: string) => {
    setRecipeIngredients((prevRecipeIngredients) =>
      prevRecipeIngredients.map((prevRecipeIngredient) => {
        if (prevRecipeIngredient.ingredientId !== ingredientId) {
          return prevRecipeIngredient;
        }
        return {
          ...prevRecipeIngredient,
          ingredientUnit: unit,
        };
      })
    );
  };

  return (
    <div className="ingredient-picker">
      <div className="ingredient-picker__sides">
        <div className="ingredient-picker__side">
          <p className="ingredient-picker__title">Select ingredients</p>
          <p>
            <input
              placeholder="Start typing to filter ingredients..."
              value={ingredientNameInput}
              onChange={(event) => setIngredientNameInput(event.target.value)}
            />
          </p>
          <div>
            {filteredIngredients.map((filteredIngredient) => (
              <div
                className="ingredient-picker__suggested-ingredient"
                onClick={() => selectRecipeIngredient(filteredIngredient)}
              >
                <p>{filteredIngredient.ingredientName}</p>
                <p className="ingredient-picker__ingredient-category">
                  {filteredIngredient.category.ingredientCategoryName}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="ingredient-picker__side">
          <p className="ingredient-picker__title">Selected ingredients</p>
          <div>
            {recipeIngredients.map((recipeIngredient) => (
              <div className="ingredient-picker__selected-ingredient">
                <div className="flex">
                  <div className="ingredient-picker__selected-ingredient-description">
                    <p>{recipeIngredient.ingredient?.ingredientName}</p>
                    <p className="ingredient-picker__ingredient-category">
                      {
                        recipeIngredient.ingredient?.category
                          .ingredientCategoryName
                      }
                    </p>
                  </div>
                  <div
                    className="ingredient-picker__selected-ingredient-remove"
                    onClick={() => unselectRecipeIngredient(recipeIngredient)}
                  >
                    <i className="material-icons">close</i>
                  </div>
                </div>
                <div>
                  <WithLabel label="Amount (e.g 200g of meat)">
                    <div className="flex">
                      <input
                        placeholder="amount in number"
                        onChange={(event) =>
                          changeIngredientAmount(
                            recipeIngredient.ingredientId,
                            +event.target.value
                          )
                        }
                      />
                      <input
                        placeholder="g/pieces/ml"
                        onChange={(event) =>
                          changeIngredientUnit(
                            recipeIngredient.ingredientId,
                            event.target.value
                          )
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
