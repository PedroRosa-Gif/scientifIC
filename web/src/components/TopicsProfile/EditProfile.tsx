import { Dispatch, SetStateAction, useState } from "react";

import "../../styles/EditProfile.css";

import ButtonProfile from "../ButtonProfile";
import VerifyPopup from "../VerifyPopup";

import ExitIcon from "../../assets/icons/back_icon.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";

import IUser from "../../interfaces/IUser";
import { fieldsProfile } from "../../utils/constants/fieldsProfile.constants";
import { editUser } from "../../apis/user.endpoint";
import { stringToDateInput } from "../../utils/helpers/handleFormatString";

interface IProfile {
  userInfos: IUser | null;
  setUserInfos: Dispatch<SetStateAction<IUser>>;
  setMessage: Dispatch<SetStateAction<string[]>>,
  setShowNotifications: Dispatch<SetStateAction<boolean>>,  
}

export default function EditProfile({ userInfos, setUserInfos, setMessage, setShowNotifications }:IProfile) {
  const [user, setUser] = useState<IUser>({ ...userInfos, birthdate: stringToDateInput(userInfos!.birthdate) } as IUser);
  const [verifyPopup, setVerifyPopup] = useState<boolean>(false);

  async function handleEditUser() {
    const res = await editUser(userInfos!.email, user);
    
    if (res.status === 200) {
      setUserInfos(user);
      setMessage(["Edição realizada com sucesso!"]);
      setShowNotifications(true);
    } else {
      setMessage(["Não foi possivel realizar a alteração!"]);
      setShowNotifications(true);
    }
  }

  function handleCheckFields() {
    for (let index = 0; index < fieldsProfile.length; index++) {
      const field = fieldsProfile[index];
      if (field.required && user[field.field] === "") {
        // If the field required is null, notify it
        document.getElementById("input-profile" + field.title).focus();
        setMessage(["Preencha os campos obrigatórios!"]);
        setShowNotifications(true);
        return;
      }
    }
    
    setVerifyPopup(true);
  }

  return (
    <div className="EditProfile">
      {
        verifyPopup && <VerifyPopup setVerifyPopup={setVerifyPopup} handleAction={handleEditUser} object={null} message={"Ao editar suas informações, os campos modificados serão gravados no seu registro e não será possivel retornar ao valor anterior. Deseja continuar?"} title={"Editar Informações"} />
      }
      <div className="div-align-fields-edit-profile">
        {
          fieldsProfile.map((fil, index) => {
            return (
              <div className="text-profile-input" key={"field-profile-" + fil.field + index} id={"text-profile" + fil.title}>
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
          onClick={() => handleCheckFields()}
        />
      </div>
    </div>
  )
}