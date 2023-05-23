import Logo from "../components/Logo";

import ProfileIcon from "../assets/icons/profile_icon.svg";

import "../styles/Profile.css";

export default function Profile() {
  return (
    <main className="container-linear">
      <header className="header">
        <Logo namePlanet={"greenPlanet"} colorFont={true} />
        <div className="div_img_profile">
          <img src={ProfileIcon} alt="Ícone de perfil" className="img_profile" />
        </div>
      </header>
    </main>
  );
}