import { ReactElement } from "react";

import "../styles/CardContainerBlack.css";

interface CardContainerBlackProps{
  children: ReactElement,
  closeCard: () => void
}

export default function CardContainerBlack({children, closeCard}:CardContainerBlackProps) {

  

  return (
    <div className="background-container" onClick={() => {closeCard()}}>
      {children}
    </div>
  );
}