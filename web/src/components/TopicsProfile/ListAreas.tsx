import { Dispatch, SetStateAction, useState } from "react";

import "../../styles/ListAreas.css";

import { allAreas } from "../../utils/constants/allAreas.contants";

import Topic from "../Topic";
import ButtonProfile from "../ButtonProfile";
import VerifyPopup from "../VerifyPopup";

import AddIcon from "../../assets/icons/add_icon.svg";
import ExitIcon from "../../assets/icons/back_icon.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";
import IUser from "../../interfaces/IUser";

import { editUser } from "../../apis/user.endpoint";

interface IProfile {
	userInfos: IUser | null;
	setUserInfos: Dispatch<SetStateAction<IUser>>;
  setMessage: Dispatch<SetStateAction<string[]>>;
  setShowNotifications: Dispatch<SetStateAction<boolean>>;
}

export default function ListAreas({ userInfos, setUserInfos, setMessage, setShowNotifications }:IProfile) {
	const [areas, setAreas] = useState<string[]>(userInfos?.interestAreas || []);
  const [verifyPopup, setVerifyPopup] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");

	function addArea() {
		if (!areas.includes(search)) {
			areas.push(search);
			setSearch("");
		}
	}

	function removeArea(title:string) {
		const filAreas = areas.filter((area) => area !== title);

		setAreas(filAreas.sort());
	}

  async function saveAreas() {
    const newInfoData = { ...userInfos, interestAreas: areas } as IUser;
    const res = await editUser(userInfos!.email, newInfoData);
    setUserInfos(newInfoData);

    if (res.status === 200) {
      setUserInfos(newInfoData);
      setMessage(["Áreas salvas com sucesso!"]);
      setShowNotifications(true);
    } else {
      setMessage(["Não foi possivel salvar suas áreas!"]);
      setShowNotifications(true);
    }
  }

  return (
    <div className="ListAreas">
      {
        verifyPopup && <VerifyPopup setVerifyPopup={setVerifyPopup} handleAction={saveAreas} object={null} message={"Ao editar suas informações, os campos modificados serão gravados no seu registro e não será possivel retornar ao valor anterior. Deseja continuar?"} title={"Editar Informações"} />
      }
			<div className="body-list-areas">
				<div className="div-header-list-areas">
					<span>Minhas áreas</span>
					<div className="div-align-button-save-list-areas">
					<ButtonProfile 
						typeStyle={true}
						title={"Salvar"}
						alt={"Ícone de salvar"}
						src={EditIcon}
						onClick={() => setVerifyPopup(true)}
					/>
				</div>
				</div>
				<div className="div-align-choose-areas">
					<div className="div-align-select-list-areas">
						<input list="browsers" name="browser" id="browser" placeholder="Escreva alguma área..." onChange={(e) => setSearch(e.target.value)} value={search} />
						<datalist id="browsers">
							{
								allAreas.map((area, index) => {
									return(
										<option key={"option-" + area + index}>{area}</option>
									);
								})
							}
						</datalist>
					</div>
					<div className="div-align-button-add-list-areas">
						<button onClick={() => addArea()}>
							<img src={AddIcon} alt="Ícone de adicionar área" />
						</button>
					</div>
				</div>
				<div className="div-align-areas">
					{
						areas.map((area, index) => {
							return(
								<Topic title={area} removeArea={removeArea} key={"areas-profile" + index} />
							)
						})
					}
				</div>
			</div>
      <div className="div-exit-list-areas">
				<ButtonProfile 
					typeStyle={false}
					title={"Sair"}
					alt={"Ícone de sair"}
					src={ExitIcon}
					onClick={() => alert('RedButton')}
				/>
			</div>
    </div>
  );
}