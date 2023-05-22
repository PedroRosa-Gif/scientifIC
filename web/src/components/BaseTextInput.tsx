import { InputHTMLAttributes } from "react";

import "../styles/BaseTextInput.css";

interface IBaseTextInput extends InputHTMLAttributes<HTMLInputElement>{
    label: string
}

export default function TextInput({ label, ...props }: IBaseTextInput) {
  return (
    <div className="base-text">
      <label htmlFor={`${props.id}`}>{label}</label>
      <input className="base-text" { ...props } />
    </div>
  )
}