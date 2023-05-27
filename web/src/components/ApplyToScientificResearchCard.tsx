import CardContainerBlack from "./CardContainerBlack";
import IScientificResearch from "../interfaces/IScientificResearch";

import "../styles/ApplyToAScientifResearchCard.css";
import ButtonOrange from "./ButtonOrange";
import { useState, useContext, SetStateAction, Dispatch } from "react";
import { applyToAScientificResearch } from "../apis/scientificResearchApplication.endpoint";
import { AuthContext } from "../contexts/auth";

interface ScientificResearchCardProps{
  icSelected: IScientificResearch | undefined,
	setShowsetShowApplicationCard: (b: boolean) => void,
  setNotifications: Dispatch<SetStateAction<string[]>>,
  setShowNotifications: Dispatch<SetStateAction<boolean>>,
}

export default function ApplyToAScientifResearchCard({icSelected, setShowsetShowApplicationCard, setNotifications, setShowNotifications}:ScientificResearchCardProps) {

  const { userInfos } = useContext(AuthContext);
  const [motivation, setMotivation] = useState<string>("")

  const handleClickInner = (event: { stopPropagation: () => void; }) => { event.stopPropagation() };

  async function applyToAScientifResearch(){
    if(icSelected !== undefined && userInfos != null){
      const result = await applyToAScientificResearch(icSelected._id!, userInfos._id!, motivation);
      
      if(result.status == 201){
        setShowsetShowApplicationCard(false);
        setNotifications(["Aplicação para a IC feita com sucesso!"]);
        setShowNotifications(true);
      }
    }
  }

  return (
    <>
      {
        (icSelected != undefined) ?
          <CardContainerBlack closeCard={() => {setShowsetShowApplicationCard(false)}}>
            <div className="container-apply" onClick={handleClickInner}>
              <h1>Candidatar-se a uma IC</h1>
              <h2>IC de {(icSelected.title !== "") ? "título" : "tema"}: {(icSelected.title !== "") ? icSelected.title : icSelected.theme} </h2>
              <div>
                <label htmlFor="motivation">Nos conte um pouco sua motivação para participar dessa IC:</label>
                <textarea 
                  name="motivation" 
                  id="motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                ></textarea>
              </div>
              <ButtonOrange title="Candidatar-se" onClick={applyToAScientifResearch}/>
            </div>
          </CardContainerBlack>
        :
        <></>
      }
    </>
  );
}