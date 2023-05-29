import { useState } from "react";

import "../styles/Login.css";
import "../styles/SignUp.css";

import ContainerSign from "../components/ContainerSign";
import TextInput from "../components/TextInput";
import ButtonSign from "../components/ButtonSign";

import UserIcon from "../assets/icons/user_icon.svg";
import PassIcon from "../assets/icons/pass_icon.svg";
import BackIcon from "../assets/icons/back_icon.svg";
import SelectInput from "../components/SelectInput";
import IUser from "../interfaces/IUser";
import { createUser } from "../apis/user.endpoint";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [ra, setRA] = useState("");
  const [birthdate, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(1);

  const [currentPhase, setCurrentPhase] = useState(0);

  async function handleCreateUser() {

    if(password !== confirmPassword){
      alert("Campo senha e confirmar senha estão diferentes");
      return
    }

    const userInfos:IUser = {
      email,
      password,
      name,
      lastName,
      ra,
      birthdate: birthdate,
      institute: "",
      interestAreas: [""],
      type: userType,
    }
    
    const result = await createUser(userInfos);
    console.log(result);
  }

  function previousPage(){
    setCurrentPhase(0)
  }
  function nextPhase(){
    setCurrentPhase(1)
  }

  return (
    <ContainerSign>
      <section className="login">
        {currentPhase === 1 ?
          <button className="button-back-page">
            <img src={BackIcon} alt="Voltar"  onClick={previousPage}/>
          </button>
          :
          <></>
        }
        <div className="header-login">
          <span>Cadastrar</span>
        </div>
        {currentPhase === 0 ?
          <div className="div-fields-login">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={UserIcon}
              placeholder="Nome"
              type="text"
            />
            <TextInput
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              icon={UserIcon}
              placeholder="Sobrenome"
              type="text"
            />
            <TextInput
              value={ra}
              onChange={(e) => setRA(e.target.value)}
              icon={UserIcon}
              placeholder="RA"
              type="text"
            />
            <TextInput
              value={birthdate}
              onChange={(e) => setBirthday(e.target.value)}
              icon={UserIcon}
              placeholder="Data de Nascimento"
              type="date"
            />
            <div className="div-button-login">
              <ButtonSign title="Próximo" onClick={nextPhase}/>
            </div>
          </div>
          :
          <div className="div-fields-login">
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={UserIcon}
              placeholder="Email"
              type="text"
            />
            <TextInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={PassIcon}
              placeholder="Senha"
              type="password"
            />
            <TextInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={PassIcon}
              placeholder="Confirme sua senha"
              type="password"
            />
            <SelectInput icon={PassIcon} onChange={(e) => setUserType(parseInt(e.target.value))}>
              <option value="1">Estudante</option>
              <option value="2">Professor</option>
            </SelectInput>
            <div className="div-button-login">
              <ButtonSign title="Cadastrar" onClick={() => handleCreateUser()}/>
            </div>
          </div>
        }
        <div className="div-create-account">
          <NavLink to={"/login"} className="link">
            <span>Já possui conta? <b>Faça login</b></span>
          </NavLink>
        </div>
      </section>
    </ContainerSign>
  );
}