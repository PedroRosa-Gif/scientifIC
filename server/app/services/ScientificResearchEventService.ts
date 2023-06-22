import { Model } from "mongoose";
import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";

class ScientificResearchEventService {
  private static instance: ScientificResearchEventService;
  private EventModel: Model<IScientificResearchEvent>;

  private constructor(EventModel: Model<IScientificResearchEvent>) {
    this.EventModel = EventModel;
  }

  public static getInstance(
		ScientificResearchEventServiceModel: Model<IScientificResearchEvent>, 
  ): ScientificResearchEventService {
    if (!ScientificResearchEventService.instance) {
      ScientificResearchEventService.instance = new ScientificResearchEventService(ScientificResearchEventServiceModel);
    }

    return ScientificResearchEventService.instance;
  }

  public async getEventsByResearch(idResearch: string) : Promise<IScientificResearchEvent[]> {
    return await this.EventModel.find().where({ idResearch: idResearch });
  }

  public async create(newEvent: IScientificResearchEvent){
		newEvent.createdAt = new Date();

		return await this.EventModel.create(newEvent);
	}

  public async remove(idEvent: string){
    this.EventModel.deleteOne({ _id: idEvent });
	}
}

export default ScientificResearchEventService;