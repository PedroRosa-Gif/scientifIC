import { Dispatch, SetStateAction, useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import IScientificResearch from '../interfaces/IScientificResearch';
import "../styles/ScientificResearchCard.css"
import ButtonOrange from './ButtonOrange';
import { ResearchStatusEnum } from '../utils/enums/ResearchStatus';
import UserType from '../utils/enums/UserType';

interface ScientificResearchCardProps{
  ic: IScientificResearch,
  setNotifications: Dispatch<SetStateAction<string[]>>,
  setShowNotifications: Dispatch<SetStateAction<boolean>>,
  setShowApplicationCard: Dispatch<SetStateAction<boolean>>,
  setICSelected: Dispatch<SetStateAction<IScientificResearch | undefined>>
}

function ScientificResearchCard({ic, setNotifications, setShowNotifications, setShowApplicationCard, setICSelected}: ScientificResearchCardProps) {

  const { signed, userInfos } = useContext(AuthContext);
  
  function applyToAScientifResearch(){

    if(signed === false){
      setNotifications(["Você precisa estar logado para se candidatar"]);
      setShowNotifications(true)
    }
    else if(userInfos && userInfos.type === UserType.Teacher){
      setNotifications(["Você precisa ser um estudante para se candidatar"]);
      setShowNotifications(true)
    }
    else{
      setICSelected(ic)
      setShowApplicationCard(true)
    }
  }

  return (
    <div className="scientific-research-card">
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
          <span> | </span>
          <p>{ResearchStatusEnum.getStatusString(ic.status)}</p>
          <span> | </span>
          <p>Bolsa: {ic.isShipToDefine ? <>A definir</> : <>R$ {ic.scholarShip}</>}</p>
        </div>
        {(ic.status === 1) ? <ButtonOrange title="Candidatar-se" onClick={applyToAScientifResearch}/> : <></>}
      </div>
      <hr />
    </div>
  );
}

export default ScientificResearchCard;
