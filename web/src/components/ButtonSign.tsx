import { ButtonHTMLAttributes } from "react";
import "../styles/ButtonSign.css";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
  title: string;
}

export default function ButtonSign({ title, ...props }:IButton) {
  return (
    <button className="btn_form_sign" { ...props } >
      <span>
      { title }
      </span>
    </button>
  );
}