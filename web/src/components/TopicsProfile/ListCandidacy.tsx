import { Dispatch, SetStateAction, useEffect, useState } from "react";

import "../../styles/ListCandidacy.css";

import CancelIcon from "../../assets/icons/cancel_icon.svg";
import ExpandIcon from "../../assets/icons/expand_icon.svg";

import IUser from "../../interfaces/IUser";

import { cancelCandidacy, getApplications } from "../../apis/scientificResearchApplication.endpoint";
import { ResearchStatusEnum } from "../../utils/enums/ResearchStatus";

import VerifyPopup from "../VerifyPopup";

interface IProfile {
  userInfos: IUser | null;
  setMessage: Dispatch<SetStateAction<string[]>>;
  setShowNotifications: Dispatch<SetStateAction<boolean>>;
}

export default function ListCandidacy({ userInfos, setMessage, setShowNotifications }:IProfile) {
  const [applications, setApplications] = useState([]);
  const [verifyPopup, setVerifyPopup] = useState<boolean>(false);
  const [selectedIc, setSelectedIc] = useState<string>();
  const [filter, setFilter] = useState("title");

  async function handleGetApplications() {
    const appRes = await getApplications(userInfos!._id as string, filter);

    setApplications(appRes.data.applications);
  }

  function handleSituation(id:string) {
    if (id === "")
      return "Pendente";

    if (id !== userInfos._id)
      return "Reprovado";

    return "Aprovado";
  }

  async function handleCancelCandidacy(id:string) {
    const res = await cancelCandidacy(id);

    if (res.status === 200) {
      const filApp = applications.filter((app) => app._id !== id);
      setApplications(filApp);
      setMessage(["Candidatura removida!"]);
      setShowNotifications(true);
    } else {
      setMessage(["Não foi possivel remover sua candidatura!"]);
      setShowNotifications(true);
    }
  }

  useEffect(() => {
    handleGetApplications();
  }, [filter]);

  return (
    <div className="ListCandidacy">
      {
        verifyPopup && <VerifyPopup setVerifyPopup={setVerifyPopup} handleAction={handleCancelCandidacy} object={selectedIc} message={"Ao cancelar sua inscrição, não continuará concorrendo para partipar dessa Iniciação Científica. Deseja continuar?"} title={"Cancelar Candidatura"} />
      }
      { 
        applications.length > 0 ? (
          <div className="body-list-candidacy">
            <div className="div-align-filter-candidacy">
              <div className="div-filter-candidacy">
                <span>Ordenar por:</span>
                <select onChange={(e) => setFilter(e.target.value)}>
                  <option value={"title"}>Título</option>
                  <option value={"advisorId"}>Orientador</option>
                  <option value={"status"}>Situação</option>
                </select>
              </div>
            </div>
            <div className="header-table-list-candidacy">
              <span className=" title-first-list-candidacy">Titulo</span>
              <span>Orientador</span>
              <span>Situação</span>
              <span className="last-list-candidacy"></span>
            </div>
            <div className="div-align-row-table-list-candidacy">
              {
                applications.map((a, index) => {
                  return(
                    <div className="row-table-list-candidacy" key={"candidacy-profile" + index}>
                      <div className="div-align-info-list-candidacy info-first-list-candidacy">
                        <span className="title-ic-list-candidacy">{a.scientificResearchId.title}</span>
                        <span>{ResearchStatusEnum.getStatusString(a.scientificResearchId.status)}</span>
                      </div>
                      <div className="div-align-info-list-candidacy">
                        <span>{a.scientificResearchId.advisorId.name}</span>
                      </div>
                      <div className="div-align-info-list-candidacy">
                        <span>{handleSituation(a.scientificResearchId.studentId)}</span>
                      </div>
                      <div className="div-align-info-list-candidacy last-list-candidacy">
                        <button className="expand-btn-profile" onClick={() => alert('Tela da IC:' + a._id)}>
                          <img src={ExpandIcon} alt="Ícone de vizualizar inscrição" />
                        </button>
                        {
                          handleSituation(a.scientificResearchId.studentId) !== "Aprovado" ? (
                            <button className="cancel-btn-profile" onClick={() => { setSelectedIc(a._id); setVerifyPopup(true); }}>
                              <img src={CancelIcon} alt="Ícone de cancelar inscrição" />
                            </button>
                          ) : null
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : <span className="no-result-span">Nenhuma candidatura encontrada.</span>
      }
    </div>
  );
}