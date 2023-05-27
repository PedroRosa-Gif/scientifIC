import "../../styles/ListCandidacy.css";

import CancelIcon from "../../assets/icons/cancel_icon.svg";
import ExpandIcon from "../../assets/icons/expand_icon.svg";

import IUser from "../../interfaces/IUser";

interface IProfile {
  userInfos: IUser | null;
  setUserInfos: Function;  
}

export default function ListCandidacy({ userInfos, setUserInfos }:IProfile) {
  return (
    <div className="ListCandidacy">
      <div className="body-list-candidacy">
        <div className="header-table-list-candidacy">
          <span className=" title-first-list-candidacy">Titulo</span>
          <span>Orientador</span>
          <span>Situação</span>
          <span className="last-list-candidacy"></span>
        </div>
        <div className="div-align-row-table-list-candidacy">
          {
            [1, 1, 2, 5, 6, 7, 4, 2, 5, 6].map((a, index) => {
              return(
                <div className="row-table-list-candidacy" key={"candidacy-profile" + index}>
                  <div className="div-align-info-list-candidacy info-first-list-candidacy">
                    <span className="title-ic-list-candidacy">{'<Titulo da IC>'}</span>
                    <span>{'<status>'}</span>
                  </div>
                  <div className="div-align-info-list-candidacy">
                    <span>{'<Orientador>'}</span>
                  </div>
                  <div className="div-align-info-list-candidacy">
                    <span>Pendente</span>
                  </div>
                  <div className="div-align-info-list-candidacy last-list-candidacy">
                    <button className="expand-btn-profile" onClick={() => alert('Fora')}>
                      <img src={ExpandIcon} alt="Ícone de vizualizar inscrição" />
                    </button>
                    <button className="cancel-btn-profile" onClick={() => alert('Dentro')}>
                      <img src={CancelIcon} alt="Ícone de cancelar inscrição" />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}