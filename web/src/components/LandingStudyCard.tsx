import "../styles/LandingStudyCard.css";

export interface ILandingStudyCardProps {
    title: string;
    text: string;
}

function LandingStudyCard(props: ILandingStudyCardProps) {
    return (
        <main className="study-card-container">
            <div className="study-card-title">
                <h3>{props.title}</h3>
            </div>
            <div className="study-card-body">
                <p>{props.text}</p>
            </div>
        </main>
    );
}



export default LandingStudyCard;