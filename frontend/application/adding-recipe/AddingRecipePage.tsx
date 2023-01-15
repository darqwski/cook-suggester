import React, { useEffect, useState } from "react";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import FormInput from "../../components/forms/FormInput";
import IngredientPicker from "../../components/ingredient-picker/IngredientPicker";
import FormDataManager from "../../context/form-data-manager/FormDataManager";
import { useFormDataContext } from "../../context/form-data-manager/FormDataManager.context";
import { createNewRecipe } from "../../utils/api/recipes";
import { INewRecipe, IRecipe } from "../../types/recipes";

const AddingRecipePage = () => {
  const { clearForm, formData } = useFormDataContext()
  const [selectedIngredients, setSelectedIngredients] = useState<IRecipeIngredient[]>(
    []
  );

  const saveRecipe =async () => {
    const { recipeName, recipeUrl, cuisineId, recipeTimeInMinutes, recipeComplexity  } = formData;
    const recipeDetails: INewRecipe = { recipeName, recipeUrl, cuisineId: +cuisineId, recipeTimeInMinutes: +recipeTimeInMinutes, recipeComplexity: +recipeComplexity  }

    await createNewRecipe({recipeDetails, ingredients: selectedIngredients })
  }

  return (
    <div>
      <h3>Create new recipe</h3>
      <div>
        <FormInput label="Recipe Name" name="recipeName" />
        <FormInput label="Recipe URL" name="recipeUrl" />
        <FormInput label="Cuisine ID (TODO: nice picker)" name="cuisineId" />
        <FormInput label="Recipe time in minutes" name="recipeTimeInMinutes" />
        <FormInput
          label="Complexity (TODO: nice picker) 1.00-10.00"
          name="recipeComplexity"
        />
        <IngredientPicker onChange={setSelectedIngredients} withMandatoryAmount />
        <button onClick={saveRecipe}>Save</button>
      </div>
    </div>
  );
};

export default () => (
  <FormDataManager initialData={{}}>
    <AddingRecipePage />
  </FormDataManager>
);
