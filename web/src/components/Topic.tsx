import CancelIcon from "../assets/icons/cancel_icon_white.svg";

import "../styles/Topic.css";

interface ITopic {
  title: string;
  removeArea: Function;
}

export default function Topic({ title, removeArea }:ITopic) {
  return (
    <div className="TopicArea">
      <div className="div-align-img-topic-area">
        <img src={CancelIcon} alt="Ícone de remover área" onClick={() => removeArea(title)}/>
      </div>
      <div className="div-align-span-topic-area">
        <span>{title}</span>
      </div>
    </div>
  )
}