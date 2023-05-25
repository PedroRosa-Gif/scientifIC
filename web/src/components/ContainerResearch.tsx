import { ReactNode } from "react";
import BaseHeader from "./BaseHeader";

import TeacherLogo from "../assets/imgs/logo-teacher.png";
import "../styles/ContainerResearch.css";

interface IContainer {
	children: ReactNode;
}


function ContainerResearch(props: IContainer) {
	return (
		<main className="scientific-research">
			<BaseHeader icon={TeacherLogo} />
			{props.children}
		</main>
	);
}

export default ContainerResearch;