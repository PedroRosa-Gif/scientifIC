import { useNavigate } from "react-router-dom";
import "../styles/BaseHeader.css";

interface IHeader {
	icon: string;
}

function BaseHeader(props: IHeader) {
	const navigate = useNavigate();

	return (
		<header className="base">
			<article className="main-title">
				<img src={props.icon} alt="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }} title="Ir para o Início" />
				<h1 onClick={() => navigate("/")} style={{ cursor: 'pointer' }} title="Ir para o Início">Scientif<strong>IC</strong></h1>
			</article>
			<aside>
				<button onClick={() => navigate("/perfil")} style={{ cursor: 'pointer' }} title="Seu perfil">Perfil</button>
			</aside> 
		</header>
	);
}

export default BaseHeader;