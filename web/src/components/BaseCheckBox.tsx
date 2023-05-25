import { InputHTMLAttributes } from "react";

import "../styles/BaseCheckBox.css";

interface IBaseCheckBox extends InputHTMLAttributes<HTMLInputElement>{
	label: string
}

export default function BaseCheckBox({ label, ...props }: IBaseCheckBox) {
    return (
      <div className="base-check">
        <input className="base-check" type="checkbox" { ...props } />
				<label htmlFor={props.id}>{label}</label>
      </div>
    )
  }