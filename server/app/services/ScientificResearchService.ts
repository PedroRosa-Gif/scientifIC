import { Model } from "mongoose";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import IScientificResearch from "../interfaces/IScientificResearch";
import IUser from "../interfaces/IUser";
import UserService from "./UserService";
import UserType from "../utils/enums/UserType";

class ScientificResearchService {

  private static instance: ScientificResearchService;
	private scientificResearchModel: Model<IScientificResearch>;
  private userService:UserService;

	private constructor(ScientificResearchServiceModel:Model<IScientificResearch>, userModel:Model<IUser>) {
		this.scientificResearchModel = ScientificResearchServiceModel;
    this.userService = UserService.getInstance(userModel);
	}
	
	public static getInstance(
		ScientificResearchServiceModel:Model<IScientificResearch>, 
    userModel:Model<IUser>
  ): ScientificResearchService {
    if (!ScientificResearchService.instance) {
      ScientificResearchService.instance = new ScientificResearchService(ScientificResearchServiceModel, userModel);
    }

    return ScientificResearchService.instance;
  }

	async getICs({search, totalPerPage, currentPage, institute, area, status, isShipToDefine}:IFiltersScientificResearch){

		const objectFind:any = {
		$or: [{title: new RegExp(search, "i") },
		{theme: new RegExp(search, "i") }]
		}

		if (area.length > 0 && area.length > 0) 
		objectFind.areas = { $in: area };

		if (status != 0) 
		objectFind.status = status;

		if (isShipToDefine != "") 
		objectFind.isShipToDefine = (isShipToDefine == "true");

		const populate = {
			path: 'advisorId',
			select: 'name lastName email institute',
			match: { institute: new RegExp((institute != undefined) ? institute : "", "i") }
		}

		let allScientificResearch = await this.scientificResearchModel.find(objectFind).populate(populate).sort("-updatedAt").exec();

		allScientificResearch = allScientificResearch.filter((ic:IScientificResearch) => {
			if(ic.advisorId !== null)
			return ic;
		})

		const pageIndex = (currentPage - 1) * totalPerPage
		const allICsWithPagination = allScientificResearch.slice(pageIndex, pageIndex + totalPerPage);

		return allICsWithPagination;
	}

	async getMyICs(filter: string, id: string, type: string) {
		const populate = [{
			path : "studentId",
		}, {
			path: "advisorId",
		}];

		if (type === "student")
			return await this.scientificResearchModel.find({ studentId: id }).populate(populate).sort(filter).exec();

		return await this.scientificResearchModel.find({ advisorId: id }).populate(populate).sort(filter).exec();
	}

	async create(newResearch: IScientificResearch){
		let validationMessage = await this.validateResearch(newResearch);

		if (validationMessage.length > 0) throw new Error(validationMessage);

		newResearch.createdAt = new Date();
		newResearch.updatedAt = new Date();

		return await this.scientificResearchModel.create(newResearch);
	}

	private async validateResearch(newResearch: IScientificResearch): Promise<string>{

		if (newResearch.advisorId == null || newResearch.advisorId.length <= 0) {
			return "Nenhum professor foi assignado a esta IC";
		}

		let advisor = await this.userService.findById(newResearch.advisorId);

		if (advisor == null) {
		return "O orientador não existe";
		}

		if (advisor.type != Number(UserType.Teacher)) {
		return "O usuário é um ALUNO e não pode criar uma IC";
		}

		if (newResearch.theme == null || newResearch.theme.length <= 0) {
		return "É necessário inserir um tema para a pesquisa";
		}

		if (newResearch.isShipToDefine == false && (newResearch.scholarShip == null || newResearch.scholarShip <= 0)) {
		return "O valor da bolsa deve ser inserido, se não possuir valor definido, selecione A DEFINIR";
		}

		return "";
	}

	async getThemes(){
		return await this.scientificResearchModel.find({}, { theme: 1, _id: 0 }).distinct('theme');
	}

	async findById(id: string){
		return await this.scientificResearchModel.findById(id);
	}
}

export default ScientificResearchService
