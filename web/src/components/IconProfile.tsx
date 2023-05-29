// Assets imports
import ProfileIcon from "../assets/icons/profile_icon.svg";

// CSS import
import "../styles/IconProfile.css";

export default function IconProfile() {
  return (
    <div className="div_img_profile">
      <img src={ProfileIcon} alt="Ícone de perfil" className="img_profile" />
    </div>
  );
}