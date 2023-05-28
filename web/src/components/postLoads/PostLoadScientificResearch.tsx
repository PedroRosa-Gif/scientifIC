import { ReactNode, useEffect, useState } from "react";

import "../../styles/Loading.css";
import { getAllThemes } from "../../apis/scientificResearch.endpoint";
import { AxiosResponse } from "axios";
import { allStatus } from "../../utils/constants/allStatus.constants";

interface IPostLoadScientificResearch {
	themes: string[];
	statusOpts: { display: string, value: number }[];
}

interface IPostLoad {
	children: (load: IPostLoadScientificResearch) => ReactNode;
}

function PostLoadScientificResearch({ children }: IPostLoad) {
	const [load, setLoad] = useState<IPostLoadScientificResearch>();
	const [message, setMessage] = useState<string>("Carregando...");
	
	useEffect(() => {
		const postLoad = async () => {
			await getAllThemes()
				.then((response: AxiosResponse<string[]>) => {
					let themes: string[] = response.data;

					let options: { display: string; value: number; }[] = [];
					allStatus.map((status, index) => options.push({ display: status, value: index + 1 }));
			
					setLoad({ themes: themes, statusOpts: options });
				})
				.catch(function(errors) {
					setMessage(errors.response.data.message);
				})
		}

		postLoad();
	}, []);

	return (
		<>
		{load ? 
			children(load)
			:
			<div className="loading-form sc-rs">{message}</div>   
		}
		</>
	);
}

export default PostLoadScientificResearch;