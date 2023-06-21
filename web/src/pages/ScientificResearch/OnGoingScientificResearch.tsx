import { useNavigate } from "react-router-dom";
import ContainerResearch from "../../components/ContainerResearch";

import "../../styles/OnGoingScientificResearch.css";
import UserBox from "../../components/UserBox";
import IUser from "../../interfaces/IUser";
import TextAreaInput from "../../components/TextAreaInput";
import SelectAreas from "../../components/SelectAreas";
import { allAreas } from "../../utils/constants/allAreas.constants";
import { allStatus } from "../../utils/constants/allStatus.constants";
import BaseSelectInput from "../../components/BaseSelectInput";
import EventsResearch from "../../components/EventsResearch";
import IScientificResearchEvent from "../../interfaces/IScientificResearchEvent";
import CardNewEvent from "../../components/CardNewEvent";

const userMock: IUser = {
	name: 'Gabriel',
	lastName: 'Gomes',
	ra: '248287',
	birthdate: '14-04-2002',
	email: 'gabriel.bertolino214@gmail.com',
	institute: 'IC',
	type: 0
}

const teacherMock: IUser = {
	name: 'Gabriel',
	lastName: 'Gomes',
	ra: '248287',
	birthdate: '14-04-2002',
	email: 'gabriel.bertolino214@gmail.com',
	institute: 'IC',
	type: 1
}

const events: IScientificResearchEvent[] = [
	{ 
		title: 'Titulo da atualização',
		content: 'Contéudo da atualização',
		createdDate: new Date(),
		createdUser: 'gabriel.gomes',
		idResearch: '1234'
 	},
	 { 
		title: 'Titulo da atualização',
		content: 'Contéudo da atualização',
		createdDate: new Date(),
		createdUser: 'gabriel.gomes',
		idResearch: '1234'
 	},
	 { 
		title: 'Titulo da atualização',
		content: 'Contéudo da atualização',
		createdDate: new Date(),
		createdUser: 'gabriel.gomes',
		idResearch: '1234'
 	}
]

const status: { display: string; value: number; }[] = [
	{ display: "Aberto para candidaturas", value: 0 },
	{ display: "Etapa inicial", value: 1 },
	{ display: "Em desenvolvimento", value: 2 },
	{ display: "Finalizado", value: 3 }
]

function OnGoingScientificResearch() {

	const navigate = useNavigate();

	const backPage = () => {
		navigate(-1);
	}

	return (
		<ContainerResearch>
			<main className="mine-research-container">
				<section className="mine-research-title">
					<article>
						<h1>Titulo / Tema</h1>
						<div className="details-reseach">
							<span className="status-indicator">Status</span>
							<p>Criado em: --/--/----</p>
						</div>
					</article>
					<div className="actions">
						<button type="button" onClick={backPage}>Voltar</button>
						<button type="button" className="edit">Editar</button>
					</div>
				</section>
				<section className="mine-reseach-body">
					<article className="event-main-area">
						<CardNewEvent />
						<EventsResearch events={events} />
					</article>
					<aside>
						<div className="assign-users">
								<UserBox user={teacherMock} />
								<UserBox user={userMock} />
						</div>
						<div className="form-column">
							<div className="form-row">
								<BaseSelectInput 
									label="Status do Projeto"
									id="status" name="status"
									options={status}
								/>
							</div>
							<div className="form-row">
								<TextAreaInput 
										label="Resumo" id="abstract"
										name="abstract"
										placeholder="Insira um breve resumo da iniciação ciêntifica a ser produzida..."
								/>
							</div>
							<div className="form-row">
								<TextAreaInput 
										type="text" label="Link sobre o Projeto"
										id="link" name="link"
										placeholder="Insira um link sobre a ideia da IC..." 
								/>
							</div>
							<SelectAreas
								baseAreas={[]} 
								setSelectedAreas={(newAreas) => {}} 
							/>
						</div>
					</aside>
				</section>
			</main>
		</ContainerResearch>
	);
}

export default OnGoingScientificResearch;