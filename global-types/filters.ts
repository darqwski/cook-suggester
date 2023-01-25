export interface IFilter {
  filterType: 'include-ingredients' | 'exclude-ingredients' | 'include-tag' | 'exclude-tag' | 'include-cuisine' | 'exclude-cuisine'
  filterValues?: (string | number)[]
  filterName: string
  filterDescription: string;
  filterImage?: string
}