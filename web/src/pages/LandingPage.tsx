import ideas from "../assets/ideas.png";
import lamp from "../assets/lamp.png";

import './LandingPage.css';

function LandingPage() {
    return (
        <div className="container">
            <nav>
                <div className="nav-landing-page">
                    <div className="nav-brand">
                        ScientifIC
                    </div>
                    <div className="nav-content">
                        <div className="nav-items">
                            Estudos
                        </div>
                        <div className="nav-user">
                            User Status
                        </div>
                    </div>
                </div>
            </nav>
            <header>
                <img src={lamp} alt="lamp" />
                <img src={ideas} alt="ideas" />
            </header>
            <div>
                <section>
                    <h1>Iniciações e Estudos</h1>
                </section>
                <section>
                    <h1>A Ideia</h1>
                </section>
            </div>
            <footer>
                <div>
                    <h3>Navegação</h3>
                </div>
                <div>
                    <h3>Contribuintes</h3>
                </div>
                <div>Logos</div>
            </footer>
        </div>
    );
}

export default LandingPage;