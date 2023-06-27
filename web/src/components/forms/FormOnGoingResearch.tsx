import { useNavigate } from "react-router-dom";
import BaseSelectInput from "../BaseSelectInput";
import SelectAreas from "../SelectAreas";
import TextAreaInput from "../TextAreaInput";
import UserBox from "../UserBox";
import IUser from "../../interfaces/IUser";
import IScientificResearch from "../../interfaces/IScientificResearch";
import { useState } from "react";
import Notifier from "../Notifier";
import Validate from "../../utils/helpers/Validate";
import { editScientificResearch } from "../../apis/scientificResearch.endpoint";
import { AxiosResponse } from "axios";

interface IFormOnGoingResearchProps {
	teacher: IUser;
	student: IUser;
	research: IScientificResearch;
}

const status: { display: string; value: number; }[] = [
	{ display: "Etapa inicial", value: 1 },
	{ display: "Em desenvolvimento", value: 2 },
	{ display: "Finalizado", value: 3 }
]

function FormOnGoingResearch({ teacher, student, research }: IFormOnGoingResearchProps) {
	const [sciResearch, setSciResearch] = useState<IScientificResearch>(research);
	const [showNotifications, setShowNotifications] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<string[]>([]);

	const navigate = useNavigate();

	const backPage = () => {
		navigate(-1);
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validator = new Validate();

		validator.validateString(sciResearch.theme, 255, "Tema deve estar entre 2 e 255 caracteres", "Tema Obrigatório", 2);
		validator.validateString(sciResearch.title, 255, "Título deve estar entre 2 e 255 caracteres", undefined, 2);
		validator.validateString(sciResearch.linkToMore, 500, "Link deve estar entre 2 e 500 caracteres", undefined, 2);
		validator.validateString(sciResearch.abstract, 1000, "Resumo deve estar entre 2 e 1000 caracteres", undefined, 2);
		validator.validateNumber(sciResearch.scholarShip, "Deve ser positivo", 0, undefined, !sciResearch.isShipToDefine ? "Valor da Bolsa Obrigatório" : undefined);

		if (!validator.isValidOperation()) {
			setNotifications(validator.getNotifications());
			setShowNotifications(true);

			return ;
		}

		editScientificResearch(research._id, sciResearch)
			.then((res: AxiosResponse) => {
				validator.notificate(res.data.message);
				setNotifications(validator.getNotifications());
				setShowNotifications(true);
			})
			.catch(function(errors) {
				validator.notificate(errors.response.data.message);
				setNotifications(validator.getNotifications());
				setShowNotifications(true);
			});
	}  

	return (
			<>
			{showNotifications && <Notifier notifications={notifications} show={showNotifications} setShow={setShowNotifications} />}
			<form className="on-going" onSubmit={(e) => handleSubmit(e)}>
				<div className="actions">
					<button type="button" onClick={backPage}>Voltar</button>
					<button type="submit" className="edit">Editar</button>
				</div>
				<div className="assign-users">
					<UserBox user={teacher} />
					<UserBox user={student} />
				</div>
				<div className="form-column">
					<div className="form-row">
						<BaseSelectInput 
							label="Status do Projeto"
							id="status" name="status"
							value={sciResearch.status}
							onChange={(e) => setSciResearch(prev => ({ ...prev, status: parseInt(e.target.value) }))}
							options={status}
						/>
					</div>
					<div className="form-row">
						<TextAreaInput 
								label="Resumo" id="abstract"
								name="abstract"
								value={sciResearch.abstract}
								onChange={(e) => setSciResearch(prev => ({ ...prev, abstract: e.target.value }))}
								placeholder="Insira um breve resumo da iniciação ciêntifica a ser produzida..."
						/>
					</div>
					<div className="form-row">
						<TextAreaInput 
								type="text" label="Link sobre o Projeto"
								id="link" name="link"
								value={sciResearch.linkToMore}
								onChange={(e) => setSciResearch(prev => ({ ...prev, linkToMore: e.target.value }))}
								placeholder="Insira um link sobre a ideia da IC..." 
						/>
					</div>
					<SelectAreas
						baseAreas={sciResearch.areas} 
						setSelectedAreas={(newAreas) => setSciResearch(prev => ({ ...prev, areas: newAreas }))} 
					/>
				</div>
			</form>
			</>
	);
}

export default FormOnGoingResearch;