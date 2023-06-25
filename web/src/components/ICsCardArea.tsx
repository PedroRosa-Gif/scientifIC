import { useRef } from "react";

import { NavLink } from "react-router-dom";
import LandingStudyCard, { ILandingStudyCardProps } from "../components/LandingStudyCard";

function ICsCardArea() {

  const studiesRef = useRef<HTMLDivElement | null>(null);

  const tempDataForCard: ILandingStudyCardProps[] = [
    { title: "Plantas", text: "Voçê sabia que é possível utilizar a seiva das plantas para produzir remédios. Saiba como uma medicina mais natural ajuda a humanindade." },
    { title: "Engenharia", text: "Como funciona as asas de um Avião? Quais materiais são usados na sua construção? Conheça você também alguns tópicos sobre aviação." },
    { title: "Tecnologia", text: "Recursos como Chat GPT estão crescendo e tornando-se mais famosos e usuais. Entenda como seus conceitos ajudam no nosso dia a dia." }
  ];

  return (
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
);
}

export default ICsCardArea;