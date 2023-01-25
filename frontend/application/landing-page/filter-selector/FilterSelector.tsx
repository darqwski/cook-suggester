import React, { useEffect, useState } from "react";
import { IFilter } from "../../../../global-types/filters";
import { fetchFilters } from "../../../utils/api/filters";
import Loader from "../../../components/Loader";
import "./filter-selector.less";
import FilterItem from "./FilterItem";

const FilterSelector: React.FC<{ onChange?: (selectedFilters: IFilter[]) => void }> = ({ onChange }) => {
  const [isLoading, setLoading] = useState(true);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IFilter[]>([]);
  useEffect(() => {
    fetchFilters()
      .then(setFilters)
      .then(() => setLoading(false));
  }, []);

  const selectFilter = (filter: IFilter) => {
    setSelectedFilters((prevState => [...prevState, filter]))
  };
  const unselectFilter = (filter: IFilter) => {
    setSelectedFilters(prevState => prevState.filter(selectedFilter=>selectedFilter.filterId !== filter.filterId))
  };

  useEffect(() => {
    onChange?.(selectedFilters)
  }, [selectedFilters])

  return isLoading ? (
    <Loader />
  ) : (
    <div className="filters-list">
      {filters.map((filter) => (
        <FilterItem
          key={filter.filterId}
          filter={filter}
          selectedFilters={selectedFilters}
          selectFilter={selectFilter}
          unselectFilter={unselectFilter}
        />
      ))}
    </div>
  );
};

export default FilterSelector;
