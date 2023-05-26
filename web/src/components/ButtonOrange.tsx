import { ButtonHTMLAttributes } from "react";
import "../styles/ButtonOrange.css";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
  title: string;
}

export default function ButtonOrange({ title, ...props }:IButton) {
  return (
    <button className="btn_form_orange" { ...props } >
      <p>
      { title }
      </p>
    </button>
  );
}