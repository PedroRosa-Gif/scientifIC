import "../../styles/EditProfile.css";

import ButtonProfile from "../ButtonProfile";

import ExitIcon from "../../assets/icons/back_icon.svg";
import EditIcon from "../../assets/icons/edit_icon.svg";

interface IUser {
  user: object;
  setUser: Function;
}

export default function EditProfile({ user, setUser }:IUser) {
  const fields = [
    { title: "Nome", field: "name", type: "text" },
    { title: "Sobrenome", field: "lastName", type: "text" },
    { title: "Email", field: "email", type: "email" },
    { title: "Data de Nascimento", field: "birthDate", type: "date" },
    { title: "RA", field: "ra", type: "number" },
  ];

  return (
    <div className="EditProfile">
      <div className="div-align-fields-edit-profile">
        {
          fields.map((fil) => {
            return (
              <div className="text-profile-input">
                <label htmlFor={"input-profile" + fil.title}>{fil.title}:</label>
                <input type={fil.type} onChange={(e) => setUser({ ...user, [fil.field]: e.target.value })} id={"input-profile" + fil.title} />
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