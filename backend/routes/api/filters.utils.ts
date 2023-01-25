import { executeQuery } from "../../utils/database-utils";
import { IFilter } from "../../../global-types/filters";

export const queryFilters = (): Promise<IFilter[]> => {
  return executeQuery<IFilter>(
    "SELECT filters.filterId, filters.filterName, filters.filterDescription, filters.filterType FROM filters"
  );
};
export const queryFiltersWithFilterValues =async (): Promise<IFilter[]> => {
  const filtersWithRawFilterValues = await executeQuery<IFilter & { filterValue: string}>(
    `
    SELECT filters.filterId, filters.filterName, filters.filterDescription, filters.filterType, filter_values.value as filterValue
    FROM filters INNER JOIN filter_values ON filter_values.filterId = filters.filterId`
  );


  const filtersWithAggregatedFilterValues = filtersWithRawFilterValues.reduce<
    Record<number, IFilter>
    >((acc, { filterId, filterValue, ...restFilter }) => {
    if (!acc[filterId] || !acc[filterId].filterValues) {
      return {
        ...acc,
        [filterId]: { filterId, ...restFilter, filterValues: [filterValue] },
      };
    }

    return {
      ...acc,
      [filterId]: { filterId, ...restFilter, tagValues: [...acc[filterId].filterValues as string[], filterValue] },
    };
  }, {});

  return Object.values(filtersWithAggregatedFilterValues)

};