import React, { Dispatch, SetStateAction, useMemo } from "react";
import { IFilter } from "../../../../global-types/filters";

const FilterItem: React.FC<{
  filter: IFilter;
  selectedFilters: IFilter[];
  selectFilter: (filter: IFilter) => void;
  unselectFilter: (filter: IFilter) => void;
}> = ({ selectedFilters, filter, unselectFilter, selectFilter }) => {
  const isSelected = useMemo(
    () =>
      selectedFilters.some(
        (selectedFilter) => selectedFilter.filterId === filter.filterId
      ),
    [filter, selectedFilters]
  );

  return (
    <div className={`filter-item${isSelected ? ' filter-item--selected' : ''}`} onClick={() => isSelected ? unselectFilter(filter) : selectFilter(filter)}>
      {filter.filterImage ? (
        <img className="filter-item__image" src={filter.filterImage} />
      ) : (
        <div className="filter-item__no-image">{filter.filterId}</div>
      )}
      <p className="filter-item__name">{filter.filterName}</p>
    </div>
  );
};

export default FilterItem;
