import React, { useEffect, useState } from "react";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";
import FormInput from "../../components/forms/FormInput";
import IngredientPicker from "../../components/IngredientPicker";
import FormDataManager from "../../context/form-data-manager/FormDataManager";
import { useFormDataContext } from "../../context/form-data-manager/FormDataManager.context";

const AddingRecipePage = () => {
  const { clearForm, formData } = useFormDataContext()
  const [selectedIngredients, setSelectedIngredients] = useState<IRecipeIngredient[]>(
    []
  );

  return (
    <div>
      <h3>Create new recipe</h3>
      <div>
        <FormInput label="Recipe Name" name="recipeName" />
        <FormInput label="Recipe URL" name="recipeUrl" />
        <FormInput label="Cuisine ID (TODO: nice picker)" name="recipeUrl" />
        <FormInput label="Recipe time in minutes" name="recipeTimeInMinutes" />
        <FormInput
          label="Complexity (TODO: nice picker) 1.00-10.00"
          name="recipeComplexity"
        />
        <IngredientPicker onChange={setSelectedIngredients} withMandatoryAmount />
        <button>Save</button>
      </div>
    </div>
  );
};

export default () => (
  <FormDataManager initialData={{}}>
    <AddingRecipePage />
  </FormDataManager>
);
