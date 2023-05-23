import IFiltersScientificResearch from "../../interfaces/IFiltersScientificResearch";
import IScientificResearch from "../../interfaces/IScientificResearch";

export const filtersGetAllICs:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    currentPage: 1
};

export const filtersGetICsFromIC:IFiltersScientificResearch =  {
    search: "",
    institute: "Instituto de Computação",
    totalPerPage: 6,
    currentPage: 1
};

export const filtersGetICsWithSomeAreas:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    area: ["Area 1", "Area 2"],
    currentPage: 1
};

export const filtersGetICsWithScholarShip:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    scholarShip: 2,
    currentPage: 1
};

export const filtersGetICsWithSomeAreasFromIC:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    institute: "Instituto de Computação",
    area: ["Area 1", "Area 2"],
    currentPage: 1
};

export const IC1:IScientificResearch = {
    theme: "Tema 1",
    title: "",
    linkToMore: "",
    abstract: "",
    status: 0,
    scholarShip: 0,
    isShipToDefine: false,
    dateToBegin: new Date(),
    forecastFinish: new Date(),
    desireSkills: [],
    areas: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    advisorId: "",
    studentId: ""
}