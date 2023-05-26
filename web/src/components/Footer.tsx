import icLogo from "../assets/imgs/ic_logo.jpg";
import unicampLogo from "../assets/imgs/logo-unicamp-white.png";

import "../styles/LandingPage.css";

function Footer() {

  return (
      <footer>
        <section className="footer-column">
          <h2>Navegação</h2>
          <div className="footer-options">
            <span>Participe</span>
            <span>Crie seu estudo</span>
            <span>Quem Somos?</span>
          </div>
        </section>
        <section className="footer-column">
          <h2>Contribuintes</h2>
          <div className="footer-options">
            <a href="https://github.com/gabriel-a-b-gomes"><span>Gabriel Gomes</span></a>
            <a href="https://github.com/PauloVictorSS"><span>Paulo Santos</span></a>
            <a href="https://github.com/PedroRosa-Gif"><span>Pedro Rosa</span></a>
          </div>
        </section>
        <section className="footer-column logos">
          <a href="https://ic.unicamp.br/"><img className="ic-logo" src={icLogo} alt="Logo do IC" /></a>
          <a href="https://www.unicamp.br/unicamp/"><img src={unicampLogo} alt="Logo do IC" /></a>
        </section>
      </footer>
  );
}

export default Footer;