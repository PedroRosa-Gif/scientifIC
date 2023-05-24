import { InputHTMLAttributes } from "react";

import "../styles/BaseInput.css";

interface IBaseTextInput extends InputHTMLAttributes<HTMLInputElement>{
    label: string
}

export default function BaseTextInput({ label, ...props }: IBaseTextInput) {
  return (
    <div className="base-input">
      <label htmlFor={`${props.id}`}>{label}</label>
      <input className="base-input" { ...props } />
    </div>
  )
}