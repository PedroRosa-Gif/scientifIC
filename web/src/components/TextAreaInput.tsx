import { InputHTMLAttributes } from "react";
import "../styles/TextArea.css";

interface ITextArea extends InputHTMLAttributes<HTMLTextAreaElement>{
    label: string
}

export default function TextAreaInput({ label, ...props }: ITextArea) {
  return (
    <div className="textarea">
      <label htmlFor={`${props.id}`}>{label}</label>
      <textarea className="textarea" { ...props } />
    </div>
  )
}