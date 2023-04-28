import { InputHTMLAttributes } from "react";

import "../styles/TextInput.css";

interface ILogin extends InputHTMLAttributes<HTMLInputElement>{
    icon: string
}

export default function TextInput({ icon, ...props }:ILogin) {
  return (
    <div className="div-input-text">
      <img src={icon} alt="Ícone de Login" />
      <input className="input-text" { ...props } />
    </div>
  )
}