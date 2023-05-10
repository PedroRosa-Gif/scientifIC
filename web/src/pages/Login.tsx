import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleLoginUser() {
    await handleLogin(user, password);
    navigate("/");
  }

  return (
    <ContainerSign>
      <section className="login">
        <div className="header-login">
          <span>Login</span>
        </div>  
        <div className="div-fields-login">
          <TextInput
            onChange={(e) => setUser(e.target.value)}
            icon={UserIcon}
            placeholder="Usuário"
            type="text"
          />
          <TextInput
            onChange={(e) => setPassword(e.target.value)}
            icon={PassIcon}
            placeholder="Senha"
            type="password"
          />
        </div>
        <div className="div-forgot-password">
          <ForgotPassword link={""} />
        </div>
        <div className="div-button-login">
          <ButtonSign title={"Entrar"} onClick={() => handleLoginUser()}/>
        </div>
        <div className="div-create-account">
          <span>Não possui conta? <b>Cadastre-se</b></span>
        </div>
      </section>
    </ContainerSign>
  );
}