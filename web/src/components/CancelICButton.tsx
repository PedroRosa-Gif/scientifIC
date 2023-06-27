import OpenIcon from "../assets/icons/open_icon.svg";
import CancelIcon from "../assets/icons/block_icon.svg";

import "../styles/CancelICButton.css";

interface ICancelICButtonProps {
    isCanceled: boolean;
    onClick: () => void;
}

function CancelICButton({ isCanceled, onClick }: ICancelICButtonProps) {
    return (
        <button type='button' className={`cancel-ic ${isCanceled ? 'to-open' : ''}`} onClick={onClick}>
            {isCanceled ? 
                <img alt='Habilitar' src={OpenIcon} /> 
                : 
                <img alt='Cancelar' src={CancelIcon} /> 
            }
            {isCanceled ? 'Habilitar IC' : 'Cancelar IC'}
        </button>
    );
}

export default CancelICButton;