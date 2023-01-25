import { IIngredient } from "../../../global-types/ingredients";
import appRequest from "../app-request";
import { IFilter } from "../../../global-types/filters";


export const fetchFilters = async (): Promise<IFilter[]> => {
  const result = await appRequest<IFilter[]>({
    url: "/API/filters",
  });

  return result.data;
};

