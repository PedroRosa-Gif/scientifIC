import { useNavigate } from "react-router-dom";
import ContainerResearch from "../../components/ContainerResearch";
import BaseList from "../../components/BaseList";
import EmptyList from "../../components/EmptyList";

import SearchIcon from "../../assets/icons/search_icon.svg";

import "../../styles/ScientifyResearchApplications.css";
import TextInput from "../../components/TextInput";

function ScientificResearchApplications() {
	const navigate = useNavigate();

	const backPage = () => {
		navigate(-1);
	}

	return (
		<ContainerResearch>
			<main className="applications-container">
				<section className="applications-title">
					<article>
						<h1>Tema / Titulo</h1>
						<div className="dash-under" />
					</article>
					<button type="button" onClick={backPage}>Voltar</button>
				</section>
				<section className="overview-applications">
					<span>Criado em: 19/09/2023</span>
					<span>Candidados: 10</span>
				</section>
				<section className="applications-area">
					<article className="applications-list">
						<div className="applications-list-title">
							<h2>Alunos Que Se Candidataram</h2>
							<div className="dash-under entire" />
						</div>
						<BaseList list={[]} customEmpty={<EmptyList message="Sem Candidatos Até O Momento..." />}>
							<ul>

							</ul>
						</BaseList>
					</article>
					<aside>
						<TextInput 
							icon={SearchIcon}
							placeholder="Pesquisar..."
							type="text"
							className="search-input-applications"
						/>
						<div className="buttons">
							<button>Editar</button>
							<button className="delete">Excluir</button>
						</div>
					</aside>
				</section> 
			</main>
		</ContainerResearch>
	);
}

export default ScientificResearchApplications;