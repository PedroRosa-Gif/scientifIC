import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";
import BaseList from "./BaseList";

import "../styles/EventsResearch.css";

interface IEventsResearchProps {
    events: IScientificResearchEvent[];
}

function EventsResearch({ events }: IEventsResearchProps) {
    return(
        <BaseList list={events} customEmpty={
            <ul className="events-list">
                <li>
                    <div className="event-header"><strong>Sem eventos</strong></div>
                </li>
            </ul>
        }>
            <ul className="events-list">
                {events && events?.map((event, key) => (
                    <li key={event.title + key}>
                        <div className="event-header">
                            <strong>{event.title}</strong> em {new Date(event.createdAt).toLocaleDateString("pt-br")} por: {event.createdUser}
                        </div>
                        {event.content && <p>{event.content}</p>}
                    </li>
                ))}
            </ul>
        </BaseList>
    );
}

export default EventsResearch;