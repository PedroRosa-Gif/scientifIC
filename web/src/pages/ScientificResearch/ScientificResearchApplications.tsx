import { useNavigate, useParams } from "react-router-dom";
import ContainerResearch from "../../components/ContainerResearch";
import BaseList from "../../components/BaseList";
import EmptyList from "../../components/EmptyList";

import SearchIcon from "../../assets/icons/search_icon.svg";

import "../../styles/ScientifyResearchApplications.css";
import TextInput from "../../components/TextInput";
import { useEffect, useContext, useState } from "react";
import { deleteScientificResearch, getApplicationsFromResearch, toggleCanceled } from "../../apis/scientificResearch.endpoint";
import { AuthContext } from "../../contexts/auth";
import { AxiosResponse } from "axios";
import IScientificResearch from "../../interfaces/IScientificResearch";
import IUser from "../../interfaces/IUser";
import IScientificResearchApplication from "../../interfaces/IScientificResearchApplication";
import ApplicationResearchCard from "../../components/ApplicationResearchCard";
import { getApplicationsByResearchQuery } from "../../apis/scientificResearchApplication.endpoint";
import Notifier from "../../components/Notifier";
import ApplicationApprove from "../../components/ApplicationApprove";
import ErrorBox from "../../components/ErrorBox";
import CancelICButton from "../../components/CancelICButton";

function ScientificResearchApplications() {
	const { userInfos } = useContext(AuthContext);

	const [errors, setErrors] = useState<string>();
	const [research, setResearch] = useState<IScientificResearch>();
	const [showCard, setShowCard] = useState<boolean>(false);
	const [showNotify, setShowNotify] = useState<boolean>(false);
	const [selectedStudent, setSelectedStudent] = useState<IUser>();
	const [notifications, setNotifications] = useState<string[]>();
	const [applications, setApplications] = useState<IScientificResearchApplication[]>();
	const [count, setCount] = useState<number>(0);

	const navigate = useNavigate();

	const { idResearch } = useParams();
	
	useEffect(() => {
		populateResearchApplications();
	}, []);

	const populateResearchApplications = async () => {
		if (userInfos === null) 
			return navigate("/login");

		let idUser = userInfos._id;

		await getApplicationsFromResearch(idResearch, idUser)
			.then((response: AxiosResponse) => {
				setResearch(response.data.research);
				setApplications(response.data.applications);
				setCount(response.data.count);
				setErrors(undefined);
			})
			.catch(function (errors) {
				if (errors.response.status === 409) {
					navigate(`/iniciacoes-cientificas/minhas/${idResearch}`);
				}

				setErrors("Sem permissão: " + errors.response.data.message);
			});
	}

	const updateApplications = async (search: string) => {
		await getApplicationsByResearchQuery(idResearch, search)
			.then((response: AxiosResponse<IScientificResearchApplication[]>) => {
				setApplications(response.data);
			})
			.catch(function (errors) {
				setNotifications([errors.response.data.message]);
				setShowNotify(true);
			});
	}

	const handleEdit = () => {
		navigate(`/iniciacoes-cientificas/editar/${idResearch}`);
	}

	const handleDelete = () => {
		deleteScientificResearch(idResearch)
			.then((res: AxiosResponse) => {
				navigate("/perfil");
			})
			.catch(function (err) {
				setNotifications([err.response.data.message]);
				setShowNotify(true);
			})
	}

	const backPage = () => {
		navigate(-1);
	}

	const clickToCancel = async () => {
		toggleCanceled(research._id)
			.then((res: AxiosResponse) => {
				setResearch(prev => ({ ...prev, isCanceled: res.data.newCanceled }));

				setNotifications([res.data.message]);
				setShowNotify(true);
			})
			.catch(function (err) {
				setNotifications([err.response.data.message]);
				setShowNotify(true);
			})
	}

	return (
		<ContainerResearch>
			{!errors ?
				<main className="applications-container">
					<section className="applications-title">
						<article>
							<h1>{research ? "Tema: " + research.theme + " / " + (research.title ? research.title : "Sem Título") : "Carregando..." }</h1>
							<div className="dash-under" />
						</article>
						<article className="actions-header-app">
							{research && research.isCanceled && 
								<span className="status-indicator" style={{ background: 'black' }}>Cancelado</span>
							}
							<button type="button" onClick={backPage}>Voltar</button>
						</article>
					</section>
					<section className="overview-applications">
						<span>Criado em: {research ? new Date(research.createdAt).toLocaleDateString("pt-br") : "-"}</span>
						<span>Candidatos: {count}</span>
					</section>
					<section className="applications-area">
						<article className="applications-list">
							<div className="applications-list-title">
								<h2>Alunos Que Se Candidataram</h2>
								<div className="dash-under entire" />
							</div>
							<BaseList list={applications} customEmpty={<EmptyList message="Sem Candidatos Até O Momento..." />}>
								<ul>
									{applications && applications.map((application, index) => (
										<>
										{typeof application.studentId !== "string" &&
											<li key={application.studentId._id + index}>
												<ApplicationResearchCard 
													application={application} 
													setInfoToConfirm={(student) => { setSelectedStudent(student); setShowCard(true); }} 
												/>
											</li>
										}
										</>
									))}
								</ul>
							</BaseList>
						</article>
						<aside>
							<TextInput 
								icon={SearchIcon}
								placeholder="Pesquisar..."
								type="text"
								className="search-input-applications"
								onChange={(e) => updateApplications(e.target.value)}
							/>
							<div className="buttons">
								<button onClick={handleEdit}>Editar</button>
								<button onClick={handleDelete} className="delete">Excluir</button>
							</div>
							<CancelICButton isCanceled={research ? research.isCanceled : false} onClick={clickToCancel} />
						</aside>
					</section> 

					{showCard && 
						<ApplicationApprove 
							idResearch={idResearch}
							research={research}
							student={selectedStudent}
							setNotifications={setNotifications}
							setShowNotify={setShowNotify}
							setShowConfirmation={setShowCard}
						/>
					}
					{showNotify && <Notifier notifications={notifications} show={showNotify} setShow={setShowNotify} />}
				</main>
				:
				<main className="applications-container">
					<ErrorBox message={errors} />
				</main>
			}
		</ContainerResearch>
	);
}

export default ScientificResearchApplications;