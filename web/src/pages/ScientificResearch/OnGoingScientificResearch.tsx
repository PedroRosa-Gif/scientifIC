import { useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
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
import { AxiosResponse } from 'axios';
import ErrorBox from '../../components/ErrorBox';


function OnGoingScientificResearch() {

	const { userInfos } = useContext(AuthContext);
	const navigate = useNavigate();
	const { idResearch } = useParams();

	const [research, setResearch] = useState<IScientificResearch>();
	const [teacher, setTeacher] = useState<IUser>();
	const [student, setStudent] = useState<IUser>();
	const [errors, setErrors] = useState<string>("");
	const [events, setEvents] = useState<IScientificResearchEvent[]>();

	useEffect(() => {
		const getResearchItems = async () => {
			getResearch(idResearch, userInfos._id)
				.then((res: AxiosResponse) => {
					setResearch(res.data.research);
					setTeacher(res.data.teacher);
					setStudent(res.data.student);
					setEvents(Array.isArray(res.data.events) ? res.data.events : []);
					setErrors(undefined);
				})
				.catch(function (err) {
					if (err.response.status === 409) {
						navigate(`/iniciacoes-cientificas/candidaturas/${idResearch}`);
					}
					setErrors(err.response.data.message);
				});
		}

		getResearchItems();
	}, []);

	return (
		<ContainerResearch>
			{!errors ?
				<main className="mine-research-container">
					{research ?
						<section className="mine-reseach-body">
							<article className="event-main-area">
								<article className='title-research'>
									<h1>{research.title} / {research.theme}</h1>
									<div className="details-reseach">
										<span className="status-indicator">{allStatus[research.status]}</span>
										{research.isCanceled && <span className="status-indicator" style={{ background: 'black' }}>Cancelado</span>}
										<p>Criado em: {new Date(research.createdAt).toLocaleDateString("pt-br")}</p>
									</div>
								</article>
								<CardNewEvent idResearch={idResearch} setEvents={(newEvents) => setEvents(newEvents)} />
								<EventsResearch events={events} />
							</article>
							<aside>
								{research && teacher && student && <FormOnGoingResearch research={research} teacher={teacher} student={student} setResearch={setResearch} />}
							</aside>
						</section>
						:
						<h1>Carregando...</h1>
					}
				</main>
				:
				<main className="mine-research-container">
					<ErrorBox message={errors} />
				</main>
			}
		</ContainerResearch>
	);
}

export default OnGoingScientificResearch;