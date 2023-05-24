interface IScientificResearch {
    theme: string;
    title: string;
    linkToMore: string;
    abstract: string;
    status: number; // Pré Cadastrado
  
    scholarShip: number;
    isShipToDefine: boolean;
  
    dateToBegin: Date;
    dateToBeginStr: string;
    forecastFinish: Date;
    forecastFinishStr: string;
  
    desireSkills: string[];
    areas: string[];
  
    createdAt: Date;
    updateAt: Date;
  
    // RelashionShip columns
    advisorId: string;
    studentId: string;
  };
  
  export default IScientificResearch;