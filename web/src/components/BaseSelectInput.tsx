import { SelectHTMLAttributes } from "react";

import "../styles/BaseInput.css";

interface IOptions {
	display: string;
	value: string | number | readonly string[] | undefined;
}

interface IBaseSelect extends SelectHTMLAttributes<HTMLSelectElement>{
  label: string;
	options: IOptions[];
}

export default function BaseSelectInput({ label, options, ...props }:IBaseSelect) {
	return (
		<div className="base-input select">
			<label htmlFor={`${props.id}`}>{label}</label>
			<select className="base-input" { ...props } >
					{options && options.map((opt, index) => 
						<option key={opt.display + index} value={opt.value}>{opt.display}</option>
					)}
			</select>
		</div>
	)
}