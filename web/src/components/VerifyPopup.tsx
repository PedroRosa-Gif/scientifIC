import { Dispatch, SetStateAction, useEffect } from "react";

import "../styles/VerifyPopup.css";

interface IVerify {
  setVerifyPopup: Dispatch<SetStateAction<boolean>>;
  handleAction: Function;
  title: string;
  message: string;
  object: undefined | string;
}

export default function VerifyPopup({ setVerifyPopup, handleAction, object, title, message }:IVerify) {
  const handleClickInner = (event: { stopPropagation: () => void; }) => { event.stopPropagation() };
  return (
    <div className="VerifyPopup" onClick={() => setVerifyPopup(false)}>
      <div className="div-align-inner-popup" onClick={handleClickInner}>
        <div className="div-title-verify-popup">
          <span>
            { title }
          </span>
        </div>
        <div className="div-message-verify-popup">
          <span>
            { message }
          </span>
        </div>
        <div className="div-buttons-verify-popup">
          <button className="btn-cancel-verify-popup" onClick={() => setVerifyPopup(false) }>Cancelar</button>
          <button className="btn-confirm-verify-popup" onClick={() => handleAction(object) }>Confirmar</button>
        </div>
      </div>
    </div>
  )
}