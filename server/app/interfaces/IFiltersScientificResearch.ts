interface IFiltersScientificResearch {
  search: string,
  institute?: string,
  status?: number,
  scholarShip?: number,
  area?: string[],
  totalPerPage: number,
  currentPage: number
};

export default IFiltersScientificResearch;