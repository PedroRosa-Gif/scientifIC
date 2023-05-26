import { useContext } from "react";

import ContainerResearch from "../../components/ContainerResearch";
import FormScientificResearch from "../../components/forms/FormScientificResearch";
import IScientificResearch from "../../interfaces/IScientificResearch";
import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { createScientificResearch } from "../../apis/scientificResearch.endpoint";

function CreateScientificResearch() {
	const { userInfos } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<ContainerResearch>
			<FormScientificResearch 
				title="Cadastrar Oportunidade de IC"
				onSubmit={(data, reset, notify) => {
					let research: IScientificResearch = ({ ...data });
					research.dateToBegin = new Date(data.dateToBeginStr!);
					research.forecastFinish = new Date(data.forecastFinish);
					
					if (userInfos === null) 
						return navigate("/login");

					research.advisorId = userInfos.email;

					createScientificResearch(research)
						.then((res: any) => {
							reset();
							navigate("/");
						})
						.catch(function(errors) {
							notify(errors.response.data.message);
						});
				}}    
			/>
		</ContainerResearch>
	);
}

export default CreateScientificResearch;