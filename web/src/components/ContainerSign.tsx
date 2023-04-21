import React, { ReactNode } from "react";

// Assets imports
import UnicampLogo from "../assets/imgs/logo-unicamp-black.png";
import Rectangle from "../assets/imgs/Rectangle 4.png";

// CSS import
import "../styles/ContainerSign.css";

interface ISign {
  children: ReactNode
}

export default function ContainerSign({ children }:ISign) {
  return (
    <main className="container-linear">
      <div className="container-sign">
        <header className="header-sign">
          <div className="div-logo">
            <img src={Rectangle} alt="Logo do sistema" />
            <span>
              ScientifIC
            </span>
          </div>
          <div className="div-unicamp">
            <img src={UnicampLogo} alt="Ícone da Unicamp" />
          </div>
        </header>
        <section>
          { children }
        </section>
      </div>
    </main>
  );
}