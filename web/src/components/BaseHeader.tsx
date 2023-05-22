import "../styles/BaseHeader.css";

interface IHeader {
    icon: string;
}

function BaseHeader(props: IHeader) {
    return (
        <header className="base">
            <article className="main-title">
                <img src={props.icon} alt="logo" />
                <h1>Scientif<strong>IC</strong></h1>
            </article>
            <aside>
                <button>Perfil</button>
            </aside>
        </header>
    );
}

export default BaseHeader;