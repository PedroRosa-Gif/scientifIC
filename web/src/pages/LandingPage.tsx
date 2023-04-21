import ideas from "../assets/ideas.png";
import lamp from "../assets/lamp.png";

import LandingStudyCard, { ILandingStudyCardProps } from "../components/LandingCard/LandingStudyCard";

import "./LandingPage.css";

function LandingPage() {
    const tempDataForCard: ILandingStudyCardProps[] = [
        { title: "Animais", text: "Aqui tbm vai uma descrição bunita" },
        { title: "Engenharia", text: "Aqui tbm vai uma descrição bunita" },
        { title: "Amigos", text: "Aqui tbm vai uma descrição bunita" }
    ]

    return (
        <main className="container">
            <header>
                <nav>
                    <div className="nav-landing-page">
                        <div className="nav-brand">
                            <div className="nav-icon" />
                            <h1>Scientif<strong>IC</strong></h1>
                        </div>
                        <div className="nav-content">
                            <div className="nav-items">
                                Estudos
                            </div>
                            <div className="nav-user">
                                User Status
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="header-brand">
                <div className="text-brand-landing-area">
                    <h1>Divulgue ou participe de uma Iniciação Cientifica</h1>
                    <h3>Lorem ipsum - aqui vai algum texto bem legal que eu não sei agora, mas sei que vai</h3>
                </div>
                <div className="images-landing-area">
                    <img className="images-landing lamp" src={lamp} alt="lamp" />
                    <img className="images-landing ideas" src={ideas} alt="ideas" />
                </div>
            </div>
            <div>
                <section>
                    <div className="cards-landing-area">
                        <h1>Iniciações e Estudos</h1>
                        <ul className="cards-landing-list">
                            {tempDataForCard.map(card => (
                                <li key={card.title}>
                                    <LandingStudyCard title={card.title} text={card.text} />
                                </li>
                            ))}
                        </ul>
                        <div className="cards-see-more-area">
                            <button className="cards-see-more">
                                Veja Mais
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <h1>A Ideia</h1>
                </section>
            </div>
            <footer>
                <section className="footer-column">
                    <h3>Navegação</h3>
                    <div className="footer-options">
                        <span>Teste</span>
                        <span>Teste</span>
                        <span>Teste</span>
                    </div>
                </section>
                <section className="footer-column">
                    <h3>Contribuintes</h3>
                    <div className="footer-options">
                        <span>Teste</span>
                        <span>Teste</span>
                        <span>Teste</span>
                    </div>
                </section>
                <div>Logos</div>
            </footer>
        </main>
    );
}

export default LandingPage;