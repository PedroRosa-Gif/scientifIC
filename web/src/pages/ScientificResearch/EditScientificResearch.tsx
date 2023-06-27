import { useContext, useState, useEffect } from 'react';
import { editScientificResearch, getOnlyResearch } from "../../apis/scientificResearch.endpoint";
import IScientificResearch from "../../interfaces/IScientificResearch";
import { AuthContext } from '../../contexts/auth';
import { useNavigate, useParams } from 'react-router-dom';
import FormScientificResearch from '../../components/forms/FormScientificResearch';
import ContainerResearch from '../../components/ContainerResearch';
import { AxiosResponse } from 'axios';

function EditScientificResearch() {
    const [research, setResearch] = useState<IScientificResearch>();

    const { idResearch } = useParams();

	const { userInfos } = useContext(AuthContext);
	const navigate = useNavigate();

    useEffect(() => {
		const getResearchModel = async () => {
			const res = await getOnlyResearch(idResearch, userInfos._id);

			console.log(res);

			setResearch(res.data.research);
		}

		getResearchModel();
	}, []);

	return (
		<ContainerResearch>
			<FormScientificResearch 
				title="Alterar Oportunidade de IC"
                model={research}
				submitButton='SALVAR'
				onSubmit={(data, reset, notify) => {
					let research: IScientificResearch = ({ ...data });
					research.dateToBegin = new Date(data.dateToBeginStr!);
					research.forecastFinish = new Date(data.forecastFinish);
					
					if (userInfos === null) 
						return navigate("/login");

					editScientificResearch(idResearch, research)
						.then((res: AxiosResponse) => {
							notify(res.data.message);
						})
						.catch(function(errors) {
							notify(errors.response.data.message);
						});
				}}    
			/>
		</ContainerResearch>
	);
}

export default EditScientificResearch;