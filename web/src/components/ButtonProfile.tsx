import { ButtonHTMLAttributes } from "react";

import "../styles/ButtonProfile.css";

interface IButtonProfile extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  typeStyle: boolean;
  alt: string;
  src: string;
}

export default function ButtonProfile({ title, typeStyle, alt, src, ...props }:IButtonProfile) {
  return (
    <button className={`btn-profile ${ typeStyle ? "button-edit-profile" : "button-logout-profile" }`} {...props}>
      <img src={src} alt={alt} />
      <span>{title}</span>
    </button>
  )
}