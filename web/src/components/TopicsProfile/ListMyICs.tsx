import { useEffect, useState } from "react";

import "../../styles/ListCandidacy.css";

import ExpandIcon from "../../assets/icons/expand_icon.svg";

import IUser from "../../interfaces/IUser";

import UserType from "../../utils/enums/UserType";
import { getMyICs } from "../../apis/scientificResearch.endpoint";
import { ResearchStatusEnum } from "../../utils/enums/ResearchStatus";
import { useNavigate } from "react-router-dom";
import ButtonProfile from "../ButtonProfile";
import EditIcon from "../../assets/icons/edit_icon.svg";

interface IProfile {
  userInfos: IUser | null;
}

export default function ListMyICs({ userInfos }:IProfile) {
  const [ics, setIcs] = useState([]);
  const [filter, setFilter] = useState("title");

  const navigate = useNavigate();

  async function handleGetApplications() {
    const appRes = await getMyICs(filter, userInfos!._id, userInfos.type);

    setIcs(appRes.data.allMyScientificResearch);
  }

  function handleDateFormat(date: string) {
    return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
  }

  useEffect(() => {
    handleGetApplications();
  }, [filter]);

  return (
    <div className="ListCandidacy">
      { 
        ics && ics.length > 0 ? (
          <div className="body-list-candidacy">
            <div className="div-align-filter-candidacy">
              {userInfos.type === UserType.Teacher &&
                <ButtonProfile 
                  typeStyle={true}
                  title={"Novo"}
                  alt={"Ícone de salvar"}
                  src={EditIcon}
                  onClick={() => navigate('/iniciacoes-cientificas/criar')}
                />
              }
              <div className="div-filter-candidacy">
                <span>Ordenar por:</span>
                <select onChange={(e) => setFilter(e.target.value)}>
                  <option value={"title"}>Título</option>
                  <option value={"-updatedAt"}>Data de modificação</option>
                </select>
              </div>
            </div>
            <div className="header-table-list-candidacy">
              <span className=" title-first-list-candidacy">Titulo</span>
              <span>Orientador</span>
              <span>Ultima atualização</span>
              <span className="last-list-candidacy"></span>
            </div>
            <div className="div-align-row-table-list-candidacy">
              {
                ics.map((ic, index) => {
                  return(
                    <div className="row-table-list-candidacy" key={"candidacy-profile" + index}>
                      <div className="div-align-info-list-candidacy info-first-list-candidacy">
                        <span className="title-ic-list-candidacy">{ic.title}</span>
                        <span>{ResearchStatusEnum.getStatusString(ic.status)}</span>
                      </div>
                      <div className="div-align-info-list-candidacy">
                        <span>{ic.advisorId.name}</span>
                      </div>
                      <div className="div-align-info-list-candidacy">
                        <span>{handleDateFormat(ic.updatedAt)}</span>
                      </div>
                      <div className="div-align-info-list-candidacy last-list-candidacy">
                        <button className="expand-btn-profile" onClick={() => navigate(`/iniciacoes-cientificas/minhas/${ic._id}`)}>
                          <img src={ExpandIcon} alt="Ícone de vizualizar inscrição" />
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : 
        <span className="no-result-span">
          Nenhuma iniciação científica encontrada.
          {userInfos.type === UserType.Teacher &&
            <ButtonProfile 
              typeStyle={true}
              title={"Novo"}
              alt={"Ícone de salvar"}
              src={EditIcon}
              onClick={() => navigate('/iniciacoes-cientificas/criar')}
            />
          }
        </span>
      }
    </div>
  );
}