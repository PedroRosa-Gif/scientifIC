interface IFiltersScientificResearch {
  search: string,
  institute?: string,
  status?: number,
  isShipToDefine?: boolean,
  area: string[],
  totalPerPage: number,
  currentPage: number
};

export default IFiltersScientificResearch;