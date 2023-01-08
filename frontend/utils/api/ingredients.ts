import { IIngredient } from "../../types/ingredients";
import appRequest from "../app-request";


export const fetchBasicIngredientsList = async (): Promise<IIngredient[]> => {
  const result = await appRequest<IIngredient[]>({
    url: "/API/ingredients/",
  });

  return result.data;
};

