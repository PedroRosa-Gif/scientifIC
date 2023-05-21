import { ReactNode, InputHTMLAttributes } from "react";

import "../styles/DatalistInput.css";

interface ILogin extends InputHTMLAttributes<HTMLInputElement>{
  id: string;
  children: ReactNode;
  className?: string;
}

export default function DatalistInput({id, children, className, ...props }:ILogin) {
  return (
    <div className="div-datalist-input">
      <input 
        list={id + "s"} 
        name={id} id={id} 
        className={"input-text " + className} 
        { ...props }
      />
      <datalist id={id + "s"}>
        {children}
      </datalist>
    </div>
  )
}