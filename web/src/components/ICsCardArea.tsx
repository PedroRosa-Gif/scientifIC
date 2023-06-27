import { MutableRefObject, useEffect, useRef, useState } from "react";

import { NavLink } from "react-router-dom";
import LandingStudyCard, { ILandingStudyCardProps } from "../components/LandingStudyCard";
import { getICs } from "../apis/scientificResearch.endpoint";
import IScientificResearch from "../interfaces/IScientificResearch";

interface ICsCardAreaProps{
  reference: MutableRefObject<HTMLDivElement>;
}

function ICsCardArea({ reference }: ICsCardAreaProps) {

  const [icsForCards, setICsForCards] = useState<ILandingStudyCardProps[]>([]);

  async function getFiltedICs() {
    const result = await getICs("", [], "", 0, "", 1);
    const allICs = result.data.allScientificResearch;
    
    const ics:ILandingStudyCardProps[] = [];
    for (let index = 0; index < 3; index++) {
      const ic = allICs[index] as IScientificResearch;
      ics.push({
        title: ic.theme,
        text: ic.abstract
      })
    }

    setICsForCards(ics)
  }

  useEffect(() => {
    getFiltedICs()
  }, [])

  return (
    <section ref={reference}>
      <div className="cards-landing-area">
        <h1>Iniciações e Estudos</h1>
        <ul className="cards-landing-list">
          {icsForCards.map((card, index) => (
            <li key={index}>
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