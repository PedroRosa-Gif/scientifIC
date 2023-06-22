import mongoose, { Schema } from "mongoose";
import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";

export const scientificResearchEventSchema = new Schema<IScientificResearchEvent>({
    title: { type: String, required: true },
    content: { type: String, required: false },
    createdDate: { type: Date, required: true },
    createdUser: { type: String, required: true },
    idResearch: { type: String, ref: 'ScientificResearch', required: true }
});

const ScientificResearchEvent = mongoose.model<IScientificResearchEvent>("ScientificResearchEvent", scientificResearchEventSchema);

export default ScientificResearchEvent;

