import { useContext, useState } from 'react';

import BaseTextInput from "./BaseTextInput";
import TextAreaInput from "./TextAreaInput";

import "../styles/CardNewEvent.css";
import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";
import { AuthContext } from '../contexts/auth';
import { createEvent, getEventsFromReseach } from '../apis/scientificResearchEvent.endpoint';

interface ICardNewEventProps {
    idResearch: string;
    setEvents: (ne: IScientificResearchEvent[]) => void;
}

const baseEvent: IScientificResearchEvent = {
    title: '',
    content: '',
    idResearch: '',
    createdAt: new Date(),
    createdUser: '',
}

function CardNewEvent({ idResearch, setEvents }: ICardNewEventProps) {

    const [event, setEvent] = useState<IScientificResearchEvent>(baseEvent);

    const { userInfos } = useContext(AuthContext);

    const handleAddNewEvent = async () => {
        let e: IScientificResearchEvent = event;

        e.idResearch = idResearch;
        e.createdUser = userInfos.name + " " + userInfos.lastName;
        
        await createEvent(userInfos._id, e);

        const res = await getEventsFromReseach(idResearch);
        const events = res.data.events;

        setEvents(Array.isArray(events) ? events : []);
        setEvent(baseEvent);
    }

    return (
        <div className="card-new-event-container">
            <span className="dot"></span>
            <form>
                <section className="card-event-header">
                    Nova Atualização
                    <button type="button" onClick={handleAddNewEvent}>Adicionar</button>
                </section>
                <section className="card-event-input">
                    <div className="form-row">
                        <BaseTextInput 
                            type="text" label="Título"
                            id="title" name="title"
                            value={event.title}
                            onChange={(e) => setEvent(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Insira o título da sua atualização..." 
                        />
                    </div>
                    <div className="form-row">
                        <TextAreaInput 
                            label="Descrição" id="description"
                            name="description"
                            value={event.content}
                            onChange={(e) => setEvent(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Insira a descrição da nova atualização..."
                        />
                    </div>
                </section>
            </form>
        </div>
    );
}

export default CardNewEvent;