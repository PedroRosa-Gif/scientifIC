import { useState, useEffect, useContext } from 'react';

// Components imports
import Logo from "../components/Logo";
import IconProfile from "../components/IconProfile";
import EditProfile from '../components/TopicsProfile/EditProfile';
import ListCandidacy from '../components/TopicsProfile/ListCandidacy';
import ListAreas from '../components/TopicsProfile/ListAreas';
import Notifier from '../components/Notifier';
import ListMyICs from '../components/TopicsProfile/ListMyICs';

// CSS import
import "../styles/Profile.css";

// Assets imports
import PhotoProfile from "../assets/imgs/photo_profile.svg";
import ICIcon from "../assets/icons/ic_icon.svg";
import UnicampIcon from "../assets/icons/unicamp_icon.svg";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import { topicsProfile } from '../utils/constants/topicsProfile.constants';

export default function Profile() {
  const { userInfos, setUserInfos } = useContext(AuthContext);
  const [message, setMessage] = useState<string[]>();
  const [showNotifications, setShowNotifications] = useState<boolean>();
  const [index, setIndex] = useState(0);
  const actionsStudent = [
    <EditProfile userInfos={userInfos} setUserInfos={setUserInfos} setMessage={setMessage} setShowNotifications={setShowNotifications} />,
    <ListCandidacy userInfos={userInfos} setMessage={setMessage} setShowNotifications={setShowNotifications}  />,
    <ListAreas userInfos={userInfos} setUserInfos={setUserInfos} setMessage={setMessage} setShowNotifications={setShowNotifications} />,
    <ListMyICs userInfos={userInfos} />,
  ];
  const actionsAdvisor = [
    <EditProfile userInfos={userInfos} setUserInfos={setUserInfos} setMessage={setMessage} setShowNotifications={setShowNotifications} />,
    <ListMyICs userInfos={userInfos} />,
  ];

  const actionsProfile = [actionsStudent, actionsAdvisor];

  useEffect(() => {
    const pointer = document.getElementById("pointer") as HTMLDivElement;

    pointer.style.cssText = `margin-left: calc(302px * ${index});`;
  }, [index]);

  return (
    <main className="container-linear">
      <header className="header">
        <Logo namePlanet={"greenPlanet"} colorFont={true} />
        <IconProfile />
      </header>
      { showNotifications && <Notifier notifications={message} show={showNotifications} setShow={setShowNotifications} /> }
      <div className="container-profile">
        <div className="div-align-photo-profile">
          <div className="div-photo-profile">
            <img src={PhotoProfile} alt="Foto de perfil" className="photo-profile" />
          </div>
          <div className="div-info-user-profile">
            <span className="name-user-profile">
              Olá {userInfos!.name} {userInfos!.lastName}!
            </span>
            <span className="email-user-profile">
              {userInfos!.email}
            </span>
          </div>
        </div>
        <div className="div-body-profile">
          <div className="div-align-topics-profile">
            <div className="div-topics-profile">
              {
                topicsProfile[userInfos!.type - 1].map((topic, index) => {
                  return (
                    <button onClick={() => setIndex(index)}>{topic}</button>
                  );
                })
              }
            </div>
            <div className="div_pointer_topic">
              <div className="pointer-topic" id="pointer" />
            </div>
          </div>
          <div className="div-align-content-profile">
            <div className="div-content-profile">
              { actionsProfile[userInfos!.type - 1][index] }
            </div>
          </div>
        </div>
      </div>
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