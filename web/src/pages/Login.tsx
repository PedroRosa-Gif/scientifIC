import { useState, useContext, useEffect } from "react";
import { handleLogin } from "../apis/user.endpoint";

// CSS import
import "../styles/Login.css";

// Components Imports
import ContainerSign from "../components/ContainerSign";
import TextInput from "../components/TextInput";
import ForgotPassword from "../components/ForgotPassword";
import ButtonSign from "../components/ButtonSign";

// Assets Imports
import UserIcon from "../assets/icons/user_icon.svg";
import PassIcon from "../assets/icons/pass_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { AccessToken } from "../utils/helpers/AcessToken";
import Notifier from "../components/Notifier";

interface LoginProps{
  error?:string
}

export default function Login({error}:LoginProps) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

	const [showNotifications, setShowNotifications] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<string[]>([]);

  const navigate = useNavigate()
  const { setUserInfos } = useContext(AuthContext);

  useEffect(()=>{
    if(error !== undefined && error !== ""){
      setShowNotifications(true);
      setNotifications([error]);
    }
  }, [error])

  async function handleLoginUser() {
    try {
      const result = await handleLogin(user, password);

      AccessToken.setAccessToken(result.data.token);
      setUserInfos(result.data.userInfos);
      navigate("/perfil");
    } catch (error) {
      setShowNotifications(true);
      setNotifications([error.response.data.message])
    }
  }

  return (
    <ContainerSign>
      {showNotifications && <Notifier notifications={notifications} show={showNotifications} setShow={setShowNotifications} />}
      <section className="login">
        <div className="header-login">
          <span>Login</span>
        </div>  
        <div className="div-fields-login">
          <TextInput
            onChange={(e) => setUser(e.target.value)}
            icon={UserIcon}
            placeholder="Email"
            type="text"
          />
          <TextInput
            onChange={(e) => setPassword(e.target.value)}
            icon={PassIcon}
            placeholder="Senha"
            type="password"
          />
        </div>
        <div className="div-button-login">
          <ButtonSign title={"Entrar"} onClick={() => handleLoginUser()}/>
        </div>
        <div className="div-create-account">
          <NavLink to={"/cadastro"} className="link">
            <span>Não possui conta? <b>Cadastre-se</b></span>
          </NavLink>
        </div>
      </section>
    </ContainerSign>
  );
}