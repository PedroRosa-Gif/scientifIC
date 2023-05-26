import { useNavigate } from "react-router-dom";
import ContainerResearch from "../../components/ContainerResearch";

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
			</main>
		</ContainerResearch>
	);
}

export default ScientificResearchApplications;