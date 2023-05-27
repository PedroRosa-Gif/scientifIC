import { useState, useEffect } from 'react';

// Components imports
import Logo from "../components/Logo";
import IconProfile from "../components/IconProfile";
import EditProfile from '../components/TopicsProfile/EditProfile';
import ListCandidacy from '../components/TopicsProfile/ListCandidacy';
import ListAreas from '../components/TopicsProfile/ListAreas';

// CSS import
import "../styles/Profile.css";

// Assets imports
import PhotoProfile from "../assets/imgs/photo_profile.svg";
import ICIcon from "../assets/icons/ic_icon.svg";
import UnicampIcon from "../assets/icons/unicamp_icon.svg";

import { NavLink } from "react-router-dom";


export default function Profile() {
  const [user, setUser] = useState({});
  const [index, setIndex] = useState(0);
  const topics = [
    <EditProfile user={user} setUser={setUser} />,
    <ListCandidacy />,
    <ListAreas />
  ];

  useEffect(() => {
    const pointer = document.getElementById("pointer") as HTMLDivElement;

    pointer.style.cssText = `margin-left: calc(289px * ${index});`;
  }, [index]);

  return (
    <main className="container-linear">
      <header className="header">
        <Logo namePlanet={"greenPlanet"} colorFont={true} />
        <IconProfile />
      </header>
      <body className="container-profile">
        <div className="div-align-photo-profile">
          <div className="div-photo-profile">
            <img src={PhotoProfile} alt="Foto de perfil" className="photo-profile" />
          </div>
          <div className="div-info-user-profile">
            <span className="name-user-profile">
              Olá Pedro!
            </span>
            <span className="email-user-profile">
              pedrolucaslr01@gmail.com
            </span>
          </div>
        </div>
        <div className="div-body-profile">
          <div className="div-align-topics-profile">
            <div className="div-topics-profile">
              <button onClick={() => setIndex(0)}>Informações</button>
              <button onClick={() => setIndex(1)}>Candidaturas</button>
              <button onClick={() => setIndex(2)}>Áreas de interesse</button>
            </div>
            <div className="div_pointer_topic">
              <div className="pointer-topic" id="pointer" />
            </div>
          </div>
          <div className="div-align-content-profile">
            <div className="div-content-profile">
              { topics[index] }
            </div>
          </div>
        </div>
      </body>
      <div className="div-rodape-profile">
          <div className="div-links-rodape">
            <NavLink to={"/"} className="link-profile"><button>Pagina inicial</button></NavLink>
            <NavLink to={"/perfil"} className="link-profile"><button>Perfil</button></NavLink>
            <NavLink to={"/pesquisar"} className="link-profile"><button>Listagem de IC's</button></NavLink>
            <NavLink to={"/noticias"} className="link-profile"><button>Notícias</button></NavLink>
          </div>
          <div className="div-logos-rodape">
            <img src={ICIcon} alt="Logo do Instituto de Computação" />
            <img src={UnicampIcon} alt="Logo da Unicamp" />
          </div>
          <div className="div-span-rodape">
            <span>© 2023 ScientifIC</span>
          </div>
        </div>
    </main>
  );
}