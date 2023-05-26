import GreenPlanetIcon from "../assets/imgs/green_planet.png";
import PinkPlanetIcon from "../assets/imgs/pink_planet.png";
import BluePlanetIcon from "../assets/imgs/blue_planet.png";
import EarthPlanetIcon from "../assets/imgs/earth_planet.png";
import SaturnPlanetIcon from "../assets/imgs/saturn_planet.png";

import "../styles/Logo.css";

import { useNavigate } from "react-router-dom";

interface ILogo {
  namePlanet: "greenPlanet" | "pinkPlanet" | "bluePlanet" | "earthPlanet" | "saturnPlanet";
  colorFont: boolean;
}

export default function Logo({ namePlanet, colorFont }:ILogo) {
  const navigate = useNavigate();
  const planets = {
    greenPlanet: GreenPlanetIcon,
    pinkPlanet: PinkPlanetIcon,
    bluePlanet: BluePlanetIcon,
    earthPlanet: EarthPlanetIcon,
    saturnPlanet: SaturnPlanetIcon,
  }

  return (
    <div className="div_logo_default" onClick={() => navigate("/")}>
      <div className="div_image_default">
        <img src={planets[namePlanet]} alt="Ícone de um planeta, Logo" className="logo_planet"/>
      </div>
      <div className="div_title_default">
        <h1 style={{ color: colorFont ? "white": "black" }}>Scientif<strong>IC</strong></h1>
      </div>
    </div>
  )
}