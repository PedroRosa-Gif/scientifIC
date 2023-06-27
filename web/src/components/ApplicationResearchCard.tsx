import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import IUser from "../interfaces/IUser";

import "../styles/ApplicationResearchCard.css";

interface IApplicationResearchCard {
    application: IScientificResearchApplication;
    setInfoToConfirm: (student: IUser) => void;
}

function ApplicationResearchCard({ application, setInfoToConfirm }: IApplicationResearchCard) {
    return (
        <div className="application-card">
            {typeof application.studentId !== "string" ?
                <>
                <article>
                    <h4>
                        {application.studentId.name} {application.studentId.lastName} 
                        <pre>({application.studentId.email})</pre>
                    </h4>
                    <h5>Motivação: {application.motivation}</h5>
                </article>
                <aside>
                    <button onClick={() => setInfoToConfirm(application.studentId as IUser)}>Escolher Aluno</button>
                </aside>
                </>
                : 
                <>Algo de Errado Ocorreu :(</>
            }
        </div>
    );
}

export default ApplicationResearchCard;