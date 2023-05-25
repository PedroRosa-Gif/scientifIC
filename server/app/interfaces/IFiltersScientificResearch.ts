interface IFiltersScientificResearch {
  search: string,
  institute: string,
  status: number,
  isShipToDefine: string,
  area: string[],
  totalPerPage: number,
  currentPage: number
};

export default IFiltersScientificResearch;