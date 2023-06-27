import { useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import Authorized from "../components/Authorized";
import { AuthContext } from "../contexts/auth";
import { AccessToken } from "../utils/helpers/AcessToken";

function AuthorizedMenu() {
  const { signed, setUserInfos } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Authorized 
      isAuthorized={signed}
      authorize={
        <div className="nav-user">
          <button onClick={() => {
            setUserInfos(null);
            AccessToken.clearAccessInformation();
            navigate("/");
          }}>Logout</button>
          <button onClick={() => navigate("/perfil")}>Perfil</button>
        </div>
      }
      notAuthorize={
        <div className="nav-user">
          <NavLink to={"/cadastro"} className="link"><button>Cadastrar</button></NavLink>
          <NavLink to={"/login"} className="link"><button>Entrar</button></NavLink>
        </div>
      }
    />
  );
}

export default AuthorizedMenu;