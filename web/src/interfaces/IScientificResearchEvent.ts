interface IScientificResearchEvent {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
    createdUser: string;
    idResearch: string;
}

export default IScientificResearchEvent;