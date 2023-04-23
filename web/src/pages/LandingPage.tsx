import { useRef } from "react";

import ideas from "../assets/imgs/ideas.png";
import lamp from "../assets/imgs/lamp.png";
import unicamp from "../assets/imgs/unicamp.png";

import icLogo from "../assets/imgs/ic_logo.jpg";
import unicampLogo from "../assets/imgs/logo-unicamp-white.png";

import Authorized from "../components/Authorized/Authorized";

import LandingStudyCard, { ILandingStudyCardProps } from "../components/LandingCard/LandingStudyCard";

import "./LandingPage.css";

function LandingPage() {
    const brandRef = useRef<HTMLDivElement | null>(null);
    const studiesRef = useRef<HTMLDivElement | null>(null);
    const ideasRef = useRef<HTMLDivElement | null>(null);

    const tempDataForCard: ILandingStudyCardProps[] = [
        { title: "Animais", text: "Aqui tbm vai uma descrição bunita" },
        { title: "Engenharia", text: "Aqui tbm vai uma descrição bunita" },
        { title: "Amigos", text: "Aqui tbm vai uma descrição bunita" }
    ];

    const isAuth: boolean = false;
 
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
                                <button onClick={() => brandRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                                    Início
                                </button>
                                <button onClick={() => studiesRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                                    Participe
                                </button>
                                <button onClick={() => ideasRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                                    A Ideia
                                </button>
                            </div>
                            <Authorized 
                                isAuthorized={isAuth}
                                authorize={
                                    <div className="nav-user">
                                        <button>Logout</button>
                                        <button>Perfil</button>
                                    </div>
                                }
                                notAuthorize={
                                    <div className="nav-user">
                                        <button>Cadastrar</button>
                                        <button>Entrar</button>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </nav>
            </header>
            <div className="header-brand" ref={brandRef}>
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
                <section ref={studiesRef}>
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
                <section ref={ideasRef}>
                    <div className="idea-area">
                        <img src={unicamp} alt="Unicamp" />
                        <div className="idea-content">
                            <h1>A Ideia</h1>
                            <p>Uma ideia criada a partir de alunos do Instituto de Computação (IC), em parceria com a Unicamp.</p>
                        </div>
                    </div>
                </section>
            </div>
            <footer>
                <section className="footer-column">
                    <h2>Navegação</h2>
                    <div className="footer-options">
                        <span>Participe</span>
                        <span>Crie seu estudo</span>
                        <span>Quem Somos?</span>
                    </div>
                </section>
                <section className="footer-column">
                    <h2>Contribuintes</h2>
                    <div className="footer-options">
                        <span>Gabriel Gomes</span>
                        <span>Paulo Santos</span>
                        <span>Pedro Rosa</span>
                    </div>
                </section>
                <section className="footer-column logos">
                    <a href="https://ic.unicamp.br/"><img className="ic-logo" src={icLogo} alt="Logo do IC" /></a>
                    <a href="https://www.unicamp.br/unicamp/"><img src={unicampLogo} alt="Logo do IC" /></a>
                </section>
            </footer>
        </main>
    );
}

export default LandingPage;