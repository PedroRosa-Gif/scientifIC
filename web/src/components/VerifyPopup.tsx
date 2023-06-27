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

  function disableScroll() {
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function() {};
  }

  useEffect(() => {
    disableScroll();
  }, []);

  return (
    <div className="VerifyPopup" onClick={() => { setVerifyPopup(false); enableScroll(); }}>
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
          <button className="btn-cancel-verify-popup" onClick={() => { setVerifyPopup(false); enableScroll(); }}>Cancelar</button>
          <button className="btn-confirm-verify-popup" onClick={() => { handleAction(object); enableScroll(); }}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}