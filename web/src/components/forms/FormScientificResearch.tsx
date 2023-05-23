import IScientificResearch from "../../interfaces/IScientificResearch";
import BaseTextInput from "../BaseTextInput";
import TextAreaInput from "../TextAreaInput";

import "../../styles/FormScientificResearch.css";
import SkillList from "../SkillList";
import { useState } from "react";

interface IFormScientificResearch {
    title: string;
    baseModel?: IScientificResearch;
}

function FormScientificResearch(props: IFormScientificResearch) {
    const [skills, setSkills] = useState<string[]>([]);

    return (
        <form className="form-sc-rs">
            <section className="form-title">
                <article>
                    <h1>{props.title}</h1>
                    <div className="dash-under" />
                </article>
                <button type="button">CANCELAR</button>
            </section>
            <section className="form-body">
                <div className="form-row">
                    <BaseTextInput 
                        type="text" label="Tema"
                        id="theme" name="theme" list="themes"
                        placeholder="Insira ou selecione tema de sua oportunidade de IC..." 
                    />
                    <datalist id="themes">
                        <option value="Chocolate" />
                    </datalist>
                    <BaseTextInput 
                        type="text" label="Título"
                        id="title" name="title"
                        placeholder="Insira o título de sua oportunidade de IC..." 
                    />
                </div>
                <div className="form-row">
                    <TextAreaInput 
                        label="Resumo" id="abstract" 
                        name="abstract"
                        placeholder="Insira um breve resumo da iniciação ciêntifica a ser produzida..."
                    />
                </div>
                <div className="form-row">
                    <article className="skills-container">
                        <SkillList label="Habilidade Desejada" 
                            placeholder="Insira uma habilidade desejada..."
                            id="desireSkills" baseSkills={skills}
                            setList={(newSkills) => setSkills(newSkills)}
                        />
                    </article>
                    <aside className="side-container">
                        <div>
                            <BaseTextInput label="Valor da Bolsa"
                                type="number" id="scholarship"
                                name="scholarship"
                                placeholder="Insira o valor da bolsa..."
                            />
                        </div>  
                        <div className="form-row">
                            <BaseTextInput label="Início"
                                type="month" id="dateToBegin"
                                name="dateToBegin"
                                pattern="[0-9]{4}-[0-9]{2}"
                                placeholder="MM/yyyy"
                            />
                            <BaseTextInput label="Previsão de Finalização"
                                type="month" id="forecastFinish"
                                name="forecastFinish"
                                pattern="[0-9]{4}-[0-9]{2}"
                                placeholder="MM/yyyy"
                            />   
                        </div>
                        <div>Seleção da área</div>
                    </aside>
                </div>
            </section>
            <section className="form-submit">
                <button>CADASTRAR</button>
            </section>
        </form>
    );
}

export default FormScientificResearch;