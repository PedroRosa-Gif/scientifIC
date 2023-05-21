import { InputHTMLAttributes } from "react";

import "../styles/TextInput.css";

interface ILogin extends InputHTMLAttributes<HTMLInputElement>{
  icon: string
  className?: string
}

export default function TextInput({ icon, className, ...props }:ILogin) {
  return (
    <div className={"div-input-text " + className}>
      <img src={icon} alt="Ícone de Login" className=""/>
      <input className="input-text" { ...props } />
    </div>
  )
}