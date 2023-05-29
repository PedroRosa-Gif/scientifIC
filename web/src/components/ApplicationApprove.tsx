import { useContext } from "react";
import { assignStudent } from "../apis/scientificResearch.endpoint";
import IScientificResearch from "../interfaces/IScientificResearch";
import IUser from "../interfaces/IUser";
import CardContainerBlack from "./CardContainerBlack";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import "../styles/ApplicationApprove.css";

interface IApplicationApprove {
	idResearch: string;
	setShowConfirmation: (closes: boolean) => void;
	setNotifications: (message: string[]) => void;
	research: IScientificResearch;
	student: IUser | undefined;
}

function ApplicationApprove({ idResearch, setShowConfirmation, setNotifications, research, student }: IApplicationApprove) {
	const navigate = useNavigate();
	const { userInfos } = useContext(AuthContext);

	const handleClickInner = (event: { stopPropagation: () => void; }) => { event.stopPropagation() };

	const handleConfirmAssign = async () => {
		await assignStudent(idResearch, student._id, userInfos._id)
			.then((response: AxiosResponse) => {
				if (response.status === 201) { 
					navigate("/iniciacoes-cientificas");
				} else
					setNotifications(["Algo de errado aconteceu..."]);
			})
			.catch(function(error) {
				setNotifications([error.response.data.message]);
			})
	}

	return (
		<>
		{idResearch && student &&
			<CardContainerBlack closeCard={() => setShowConfirmation(false)}>
				<div className="confirmation-card" onClick={handleClickInner}>
						<h1>Tem Certeza?</h1>
						<p>
							Você irá selecionar o aluno {student.name} {student.lastName} para a trabalhar na IC {research.theme} / {research.title}
						</p>
						<div className="buttons-confirmation">
							<button className="cancel" onClick={() => setShowConfirmation(false)}>Cancelar</button>
							<button onClick={handleConfirmAssign}>Confirmar</button>
						</div>
				</div>
			</CardContainerBlack>
		}
		</>
	);
}

export default ApplicationApprove;