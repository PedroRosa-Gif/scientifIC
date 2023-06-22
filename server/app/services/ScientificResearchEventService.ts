import { Model } from "mongoose";
import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";
import UserService from "./UserService";
import ScientificResearchService from "./ScientificResearchService";

class ScientificResearchEventService {
  private static instance: ScientificResearchEventService;
  private EventModel: Model<IScientificResearchEvent>;
  private userService: UserService;
  private scientificResearchService: ScientificResearchService;

  private constructor(EventModel: Model<IScientificResearchEvent>, userService: UserService, scientificResearchService: ScientificResearchService) {
    this.EventModel = EventModel;
    this.userService = userService;
    this.scientificResearchService = scientificResearchService;
  }

  public static getInstance(
		ScientificResearchEventServiceModel: Model<IScientificResearchEvent>,
    userService: UserService,
    scientificResearchService: ScientificResearchService
  ): ScientificResearchEventService {
    if (!ScientificResearchEventService.instance) {
      ScientificResearchEventService.instance = new ScientificResearchEventService(ScientificResearchEventServiceModel, userService, scientificResearchService);
    }

    return ScientificResearchEventService.instance;
  }

  public async getEventsByResearch(idResearch: string) : Promise<IScientificResearchEvent[]> {
    return await this.EventModel.find().where({ idResearch: idResearch });
  }

  public async create(newEvent: IScientificResearchEvent, idUser: string) {
    let message = await this.validateEvent(newEvent, idUser);

    if (message.length > 0) throw new Error(message);

		newEvent.createdAt = new Date();

		return await this.EventModel.create(newEvent);
	}

  public async remove(idEvent: string){
    this.EventModel.deleteOne({ _id: idEvent });
	}

  private async validateEvent(newEvent: IScientificResearchEvent, idUser: string) : Promise<string> {
    let research = await this.scientificResearchService.findById(newEvent.idResearch);

    if (research == null) {
      return "IC não existe";
    }

    if (research.studentId != idUser && research.advisorId != idUser) {
      return "Seu usuário não tem permissão de criar um evento";
    } 

    return "";
  }
}

export default ScientificResearchEventService;