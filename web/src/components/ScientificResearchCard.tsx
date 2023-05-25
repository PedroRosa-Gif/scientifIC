import IScientificResearch from '../interfaces/IScientificResearch';
import "../styles/ScientificResearchCard.css"
import ButtonOrange from './ButtonOrange';

interface ScientificResearchCardProps{
  ic: IScientificResearch
}

function ScientificResearchCard({ic}: ScientificResearchCardProps) {
  return (
    <div>
      <h2>{(ic.title !== "") ? ic.title : ic.theme}</h2>
      {
        ic.areas.map((area,index) => {
          return (
            <span key={index}>{area};</span>
          )
        })
      }
      <div className="flex">
        <div className="infos">
          <p>{ic.advisorId.name + " " + ic.advisorId.lastName}</p>
          <p> | </p>
          <p>{ic.status}</p>
          <p> | </p>
          <p>Valor da bolsa: {ic.isShipToDefine ? <>A definir</> : <>R$ {ic.scholarShip}</>}</p>
        </div>
        {(ic.status === 1) ? <ButtonOrange title="Candidatar-se"/> : <></>}
      </div>
      <hr />
    </div>
  );
}

export default ScientificResearchCard;
