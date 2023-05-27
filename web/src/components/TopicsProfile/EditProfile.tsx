import { useState } from "react";

import "../../styles/EditProfile.css";

import ButtonProfile from "../ButtonProfile";

import ExitIcon from "../../assets/icons/back_icon.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";

import IUser from "../../interfaces/IUser";
import { fieldsProfile } from "../../utils/constants/fieldsProfile.constants";
import { editUser } from "../../apis/user.endpoint";
import { stringToDateInput } from "../../utils/handleFormatString";

interface IProfile {
  userInfos: IUser | null;
  setUserInfos: Function;  
}

export default function EditProfile({ userInfos, setUserInfos }:IProfile) {
  const [user, setUser] = useState<IUser>({ ...userInfos, birthdate: stringToDateInput(userInfos!.birthdate) } as IUser);

  async function handleEditUser() {
    await editUser(userInfos!.email, user);
    setUserInfos(user);
  }

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
          onClick={() => handleEditUser()}
        />
      </div>
    </div>
  )
}