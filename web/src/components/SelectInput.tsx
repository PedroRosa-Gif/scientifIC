import { ReactNode, SelectHTMLAttributes } from "react";

import "../styles/TextInput.css";

interface ILogin extends SelectHTMLAttributes<HTMLSelectElement>{
  icon: string;
  children: ReactNode;
  className?: string;
}

export default function SelectInput({ icon, children, className, ...props }:ILogin) {
  return (
    <div className="div-input-text">
      {(icon !== "") ? <img src={icon} alt="Ícone de Login" /> : <></>}
      <select className={"input-text " + className} { ...props } >
        {children}
      </select>
    </div>
  );
}