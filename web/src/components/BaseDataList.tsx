import { InputHTMLAttributes } from "react";
import BaseTextInput from "./BaseTextInput";

interface IBaseDataList extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
    options: string[];
}

function BaseDataList({ label, list, options, ...props }: IBaseDataList) {
    return (
        <>
        <BaseTextInput 
            type="text" label={label}
            list={list}
            {...props}
        />
        <datalist id={list}>
            {options.map((option, index) => <option key={index} value={option} />)}
        </datalist>
        </>
    );
}

export default BaseDataList;