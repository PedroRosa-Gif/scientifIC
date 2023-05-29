import { useRef, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import ideas from "../assets/imgs/ideas.png";
import lamp from "../assets/imgs/lamp.png";
import unicamp from "../assets/imgs/unicamp.png";

import Authorized from "../components/Authorized";

import LandingStudyCard, { ILandingStudyCardProps } from "../components/LandingStudyCard";

import "../styles/LandingPage.css";
import { AuthContext } from "../contexts/auth";
import Footer from "../components/Footer";

function LandingPage() {
  const brandRef = useRef<HTMLDivElement | null>(null);
  const studiesRef = useRef<HTMLDivElement | null>(null);
  const ideasRef = useRef<HTMLDivElement | null>(null);
  
  const { signed, setUserInfos } = useContext(AuthContext);
  const navigate = useNavigate()

  const tempDataForCard: ILandingStudyCardProps[] = [
    { title: "Plantas", text: "Voçê sabia que é possível utilizar a seiva das plantas para produzir remédios. Saiba como uma medicina mais natural ajuda a humanindade." },
    { title: "Engenharia", text: "Como funciona as asas de um Avião? Quais materiais são usados na sua construção? Conheça você também alguns tópicos sobre aviação." },
    { title: "Tecnologia", text: "Recursos como Chat GPT estão crescendo e tornando-se mais famosos e usuais. Entenda como seus conceitos ajudam no nosso dia a dia." }
  ];

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
                isAuthorized={signed}
                authorize={
                  <div className="nav-user">
                    <button onClick={() => {
                      setUserInfos(null);
                      navigate("/");
                    }}>Logout</button>
                    <button>Perfil</button>
                  </div>
                }
                notAuthorize={
                  <div className="nav-user">
                    <NavLink to={"/cadastro"} className="link"><button>Cadastrar</button></NavLink>
                    <NavLink to={"/login"} className="link"><button>Entrar</button></NavLink>
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
                <NavLink to={"/iniciacoes-cientificas"} className="link">
                  <button className="cards-see-more">
                    Veja Mais
                  </button>
                </NavLink>
              </div>
            </div>
          </section>
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