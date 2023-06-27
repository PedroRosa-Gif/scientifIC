import { useContext } from 'react';
import { useParams } from "react-router-dom";
import ContainerResearch from "../../components/ContainerResearch";

import "../../styles/OnGoingScientificResearch.css";
import IUser from "../../interfaces/IUser";
import { allStatus } from "../../utils/constants/allStatus.constants";
import EventsResearch from "../../components/EventsResearch";
import IScientificResearchEvent from "../../interfaces/IScientificResearchEvent";
import CardNewEvent from "../../components/CardNewEvent";
import { useEffect, useState } from "react";
import IScientificResearch from "../../interfaces/IScientificResearch";
import FormOnGoingResearch from "../../components/forms/FormOnGoingResearch";
import { getResearch } from "../../apis/scientificResearch.endpoint";
import { AuthContext } from '../../contexts/auth';


function OnGoingScientificResearch() {

	const { userInfos } = useContext(AuthContext);

	const { idResearch } = useParams();

	const [research, setResearch] = useState<IScientificResearch>();
	const [teacher, setTeacher] = useState<IUser>();
	const [student, setStudent] = useState<IUser>();
	const [events, setEvents] = useState<IScientificResearchEvent[]>();

	useEffect(() => {
		const getResearchItems = async () => {
			const res = await getResearch(idResearch, userInfos._id);
			
			setResearch(res.data.research);
			setTeacher(res.data.teacher);
			setStudent(res.data.student);
			setEvents(Array.isArray(res.data.events) ? res.data.events : []);
		}

		getResearchItems();
	}, []);

	return (
		<ContainerResearch>
			<main className="mine-research-container">
				{research ?
					<section className="mine-reseach-body">
						<article className="event-main-area">
							<article className='title-research'>
								<h1>{research.title} / {research.theme}</h1>
								<div className="details-reseach">
									<span className="status-indicator">{allStatus[research.status]}</span>
									<p>Criado em: {new Date(research.createdAt).toLocaleDateString("pt-br")}</p>
								</div>
							</article>
							<CardNewEvent idResearch={idResearch} setEvents={(newEvents) => setEvents(newEvents)} />
							<EventsResearch events={events} />
						</article>
						<aside>
							{research && teacher && student && <FormOnGoingResearch research={research} teacher={teacher} student={student} />}
						</aside>
					</section>
					:
					<>Carregando...</>
				}
			</main>
		</ContainerResearch>
	);
}

export default OnGoingScientificResearch;