import React, { ReactNode } from "react";

// Assets imports
import UnicampLogo from "../assets/imgs/logo-unicamp-black.png";
import Rectangle from "../assets/imgs/Rectangle 4.png";

// CSS import
import "../styles/ContainerSign.css";
import Logo from "./Logo";

interface ISign {
  children: ReactNode
}

export default function ContainerSign({ children }:ISign) {
  return (
    <main className="container-linear">
      <div className="container-sign">
        <header className="header-sign">
          <Logo namePlanet={"pinkPlanet"} colorFont={false} />
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