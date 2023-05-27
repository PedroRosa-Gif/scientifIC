import "../../styles/EditProfile.css";

import ButtonProfile from "../ButtonProfile";

import ExitIcon from "../../assets/icons/back_icon.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";

import IUser from "../../interfaces/IUser";
import { fieldsProfile } from "../../utils/constants/fieldsProfile.constants";

interface IProfile {
  user: IUser;
  setUser: Function;
}

export default function EditProfile({ user, setUser }:IProfile) {
  return (
    <div className="EditProfile">
      <div className="div-align-fields-edit-profile">
        {
          fieldsProfile.map((fil, index) => {
            return (
              <div className="text-profile-input" key={"field-profile-" + fil.field + index}>
                <label htmlFor={"input-profile" + fil.title}>{fil.title}:</label>
                <input type={fil.type} onChange={(e) => setUser({ ...user, [fil.field]: e.target.value })} id={"input-profile" + fil.title} value={user[fil.field]} />
              </div>
            )
          })
        }
      </div>
      <div className="div-align-buttons-profile">
        <ButtonProfile
          typeStyle={false}
          title={"Sair"}
          alt={"Ícone de sair"}
          src={ExitIcon}
          onClick={() => alert('RedButton')}
        />
        <ButtonProfile 
          typeStyle={true}
          title={"Editar"}
          alt={"Ícone de editar"}
          src={EditIcon}
          onClick={() => alert('WhiteButton')}
        />
      </div>
    </div>
  )
}