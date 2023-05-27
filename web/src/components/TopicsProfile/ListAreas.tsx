import { useState } from "react";

import "../../styles/ListAreas.css";

import { allAreas } from "../../utils/constants/allAreas.contants";

import Topic from "../Topic";
import ButtonProfile from "../ButtonProfile";

import AddIcon from "../../assets/icons/add_icon.svg";
import ExitIcon from "../../assets/icons/back_icon.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";
import IUser from "../../interfaces/IUser";

interface IProfile {
	user: IUser;
	setUser: Function;
  }
  

export default function ListAreas({ user, setUser }:IProfile) {
	const [areas, setAreas] = useState<string[]>([]);
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

  return (
    <div className="ListAreas">
			<div className="body-list-areas">
				<div className="div-header-list-areas">
					<span>Minhas áreas</span>
					<div className="div-align-button-save-list-areas">
					<ButtonProfile 
						typeStyle={true}
						title={"Salvar"}
						alt={"Ícone de salvar"}
						src={EditIcon}
						onClick={() => alert('SaveButton')}
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