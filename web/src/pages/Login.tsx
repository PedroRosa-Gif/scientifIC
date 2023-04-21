import React, { useState } from "react";

// CSS import
import "../styles/Login.css";

// Components Imports
import ContainerSign from "../components/ContainerSign";
import TextInput from "../components/TextInput";
import ForgotPassword from "../components/ForgotPassword";

// Assets Imports
import UserIcon from "../assets/icons/user_icon.svg";
import PassIcon from "../assets/icons/pass_icon.svg";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState(""); 

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
          <ForgotPassword user={user} />
        </div>
      </section>
    </ContainerSign>
  );
}