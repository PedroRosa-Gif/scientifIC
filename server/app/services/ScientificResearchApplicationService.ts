import { Model } from "mongoose";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import ScientificResearchService from "./ScientificResearchService";
import UserService from "./UserService";
import IUser from "../interfaces/IUser";
import IScientificResearch from "../interfaces/IScientificResearch";
import User from "../models/user.model";

class ScientificResearchApplicationService {

  private static instance: ScientificResearchApplicationService;
  private ApplicationModel:Model<IScientificResearchApplication>;
  private userService:UserService;
  private scientificResearchService:ScientificResearchService;

  private constructor(ApplicationModel:Model<IScientificResearchApplication>, userModel:Model<IUser>, ScientificResearchServiceModel:Model<IScientificResearch>) {
    this.ApplicationModel = ApplicationModel;
    this.userService = UserService.getInstance(userModel);
    this.scientificResearchService = ScientificResearchService.getInstance(ScientificResearchServiceModel, userModel);
  }

  public static getInstance(
    ApplicationModel:Model<IScientificResearchApplication>, 
    userModel:Model<IUser>, 
    ScientificResearchServiceModel:Model<IScientificResearch>
  ): ScientificResearchApplicationService {
    if (!ScientificResearchApplicationService.instance) {
      ScientificResearchApplicationService.instance = new ScientificResearchApplicationService(ApplicationModel, userModel, ScientificResearchServiceModel);
    }

    return ScientificResearchApplicationService.instance;
  }

  async applyToScientificResearch (newApplication:IScientificResearchApplication){

    let student = await this.userService.findById(newApplication.studentId);
    if (student == null) 
      throw new Error("O estudante não existe");
  
    let scientificResearch = await this.scientificResearchService.findById(newApplication.scientificResearchId);
    if (scientificResearch == null) 
      throw new Error("A iniciação científica não existe");
    else if(scientificResearch.status != 1)
      throw new Error("A iniciação científica não está mais aceitando estudantes");
  
    if (newApplication.motivation == "")
      throw new Error("Preencha o campo de motivação");
  
    return await this.ApplicationModel.create(newApplication);
  }

  async getApplications(id:string, filter: string) {
    const populate = [{
      path : "studentId",
    }, {
      path: "scientificResearchId",
      populate : {
        path : "advisorId",
      }
    }];

		return await this.ApplicationModel.find({ studentId: id }).populate(populate).sort(filter).exec();
  }

  async cancelCandidacy(id:string) {
    await this.ApplicationModel.deleteOne({ _id: id });
  }

  async getApplicationsOfResearch(idResearch: string, search: string) {
    const populate = {
			path: 'studentId',
			select: 'name lastName email institute'
		};

    return await this.ApplicationModel.find(
      {
        scientificResearchId: idResearch,
        studentId: { $in: (await User.find({ $or: [{ name: new RegExp(search, "i") }, { lastName: new RegExp(search, "i") }]})).map(u => u._id) } 
      }
    ).populate(populate).sort("-createdAt").exec();
  }
}

export default ScientificResearchApplicationService;