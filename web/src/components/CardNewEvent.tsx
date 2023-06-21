import BaseTextInput from "./BaseTextInput";
import TextAreaInput from "./TextAreaInput";

import "../styles/CardNewEvent.css";

function CardNewEvent() {
    return (
        <div className="card-new-event-container">
            <span className="dot"></span>
            <form>
                <section className="card-event-header">
                    Nova Atualização
                    <button>Adicionar</button>
                </section>
                <section className="card-event-input">
                    <div className="form-row">
                        <BaseTextInput 
                            type="text" label="Título"
                            id="title" name="title"
                            placeholder="Insira o título da sua atualização..." 
                        />
                    </div>
                    <div className="form-row">
                        <TextAreaInput 
                            label="Descrição" id="description"
                            name="description"
                            placeholder="Insira a descrição da nova atualização..."
                        />
                    </div>
                </section>
            </form>
        </div>
    );
}

export default CardNewEvent;