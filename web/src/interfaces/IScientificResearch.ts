interface IScientificResearch {
  _id?:string;
  
  theme: string;
  title: string;
  linkToMore: string;
  abstract: string;
  status: number; // Pré Cadastrado

  scholarShip: number;
  isShipToDefine: boolean;
  isCanceled: boolean;

  dateToBegin: Date;
  forecastFinish: Date;
  dateToBeginStr: string;
  forecastFinishStr: string;

  desireSkills: string[];
  areas: string[];

  createdAt: Date;
  updatedAt: Date;

  // RelashionShip columns
  advisorId: any;
  studentId: string;
};

export default IScientificResearch;
