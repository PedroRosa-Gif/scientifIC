import { useRef } from "react";

import ideas from "../assets/imgs/ideas.png";
import lamp from "../assets/imgs/lamp.png";
import unicamp from "../assets/imgs/unicamp.png";

import "../styles/LandingPage.css";
import Footer from "../components/Footer";
import ICsCardArea from "../components/ICsCardArea";
import AuthorizedMenu from "../components/AuthorizedMenu";

function LandingPage() {
  const brandRef = useRef<HTMLDivElement | null>(null);
  const studiesRef = useRef<HTMLDivElement | null>(null);
  const ideasRef = useRef<HTMLDivElement | null>(null);

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
              <AuthorizedMenu/>
            </div>
          </div>
        </nav>
      </header>
        <div className="header-brand" ref={brandRef}>
          <div className="text-brand-landing-area">
            <h1>Divulgue ou participe de uma Iniciação Cientifica</h1>
            <h3>
              Acompanhe aqui os novos estudos e iniciações científicas que estão sendo produzidas.
              Contribua e Participe!
            </h3>
          </div>
          <div className="images-landing-area">
            <img className="images-landing lamp" src={lamp} alt="lamp" />
            <img className="images-landing ideas" src={ideas} alt="ideas" />
          </div>
        </div>
        <div>
          <ICsCardArea/>
          <section ref={ideasRef}>
            <div className="idea-area">
              <img src={unicamp} alt="Unicamp" />
              <div className="idea-content">
                <h1>A Ideia</h1>
                <p>
                  Uma ideia criada a partir de alunos do Instituto de Computação (IC), em parceria com a Unicamp. 
                  O projeto visa ampliar a divulgação das Iniciações Ciêntificas e fornecer aos estutantes um 
                  canal mais direto para conhecer e participar de novos projetos.
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
    </main>
  );
}

export default LandingPage;