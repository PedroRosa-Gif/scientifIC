import IScientificResearch from "../../interfaces/IScientificResearch";
import BaseTextInput from "../BaseTextInput";
import TextAreaInput from "../TextAreaInput";

import "../../styles/FormScientificResearch.css";
import SkillList from "../SkillList";
import { useEffect, useState } from "react";
import SelectAreas from "../SelectAreas";
import Validate from "../../utils/helpers/Validate";
import Notifier from "../Notifier";
import BaseCheckBox from "../BaseCheckBox";
import BaseSelectInput from "../BaseSelectInput";
import { allStatus } from "../../utils/constants/allStatus.constants";

interface IFormScientificResearch {
    title: string;
    model?: IScientificResearch;
    onSubmit: (data: IScientificResearch, reset: () => void) => void;
}

const baseModel: IScientificResearch = {
    theme: '', 
    title: '',
    abstract: '',
    advisorId: '',
    areas: [],
    desireSkills: [],
    status: 0,
    isShipToDefine: true,
    dateToBegin: new Date(),
    dateToBeginStr: new Date().toLocaleDateString("sv-SE"),
    forecastFinish: new Date(),
    forecastFinishStr: new Date().toLocaleDateString("sv-SE"),
    linkToMore: '',
    scholarShip: 0,
    studentId: '',
    createdAt: new Date(),
    updateAt: new Date()
}

function FormScientificResearch(props: IFormScientificResearch) {
    const [scifyResearch, setScifyResearch] = useState<IScientificResearch>(baseModel);
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        if (props.model)
            setScifyResearch(props.model);

        console.log("Teste");
    }, [props.model]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validator = new Validate();

        validator.validateString(scifyResearch.theme, 255, "Tema deve estar entre 2 e 255 caracteres", "Tema Obrigatório", 2);
        validator.validateString(scifyResearch.title, 255, "Título deve estar entre 2 e 255 caracteres", undefined, 2);
        validator.validateString(scifyResearch.linkToMore, 500, "Link deve estar entre 2 e 500 caracteres", undefined, 2);
        validator.validateString(scifyResearch.abstract, 1000, "Resumo deve estar entre 2 e 1000 caracteres", undefined, 2);
        validator.validateNumber(scifyResearch.scholarShip, "Deve ser positivo", 0, undefined, !scifyResearch.isShipToDefine ? "Valor da Bolsa Obrigatório" : undefined);

        if (!validator.isValidOperation()) {
            setNotifications(validator.getNotifications());
            setShowNotifications(true);

            return ;
        }

        props.onSubmit(scifyResearch, () => setScifyResearch(baseModel));
    }  

    const statusOptions = () => {
        let options: { display: string; value: number; }[] = [];
        allStatus.map((status, index) => options.push({ display: status, value: index }));

        return options;
    }

    return (
        <>
        {showNotifications && <Notifier notifications={notifications} show={showNotifications} setShow={setShowNotifications} />}
        <form className="form-sc-rs" onSubmit={(e) => handleSubmit(e)}>
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
                        value={scifyResearch.theme}
                        onChange={(e) => setScifyResearch(prev => ({ ...prev, theme: e.target.value }))}
                        id="theme" name="theme" list="themes"
                        placeholder="Insira ou selecione tema de sua oportunidade de IC..." 
                    />
                    <datalist id="themes">
                        <option value="Chocolate" />
                    </datalist>
                    <BaseTextInput 
                        type="text" label="Título"
                        value={scifyResearch.title}
                        onChange={(e) => setScifyResearch(prev => ({ ...prev, title: e.target.value }))}
                        id="title" name="title"
                        placeholder="Insira o título de sua oportunidade de IC..." 
                    />
                </div>
                <div className="form-row">
                    <BaseTextInput 
                        type="text" label="Link sobre o Projeto"
                        value={scifyResearch.linkToMore}
                        onChange={(e) => setScifyResearch(prev => ({ ...prev, linkToMore: e.target.value }))}
                        id="link" name="link"
                        placeholder="Insira um link sobre a ideia da IC..." 
                    />
                    <BaseSelectInput 
                        label="Status do Projeto"
                        id="status" name="status"
                        options={statusOptions()}
                        value={scifyResearch.status}
                        onChange={(e) => setScifyResearch(prev => ({ ...prev, status: parseInt(e.target.value) }))}
                    />
                </div>
                <div className="form-row">
                    <TextAreaInput 
                        label="Resumo" id="abstract"
                        value={scifyResearch.abstract}
                        onChange={(e) => setScifyResearch(prev => ({ ...prev, abstract: e.target.value }))} 
                        name="abstract"
                        placeholder="Insira um breve resumo da iniciação ciêntifica a ser produzida..."
                    />
                </div>
                <div className="form-row">
                    <article className="skills-container">
                        <SkillList label="Habilidade Desejada" 
                            placeholder="Insira uma habilidade desejada..."
                            id="desireSkills" baseSkills={scifyResearch.desireSkills}
                            setList={(newSkills) => setScifyResearch(prev => ({ ...prev, desireSkills: newSkills }))}
                        />
                    </article>
                    <aside className="side-container">
                        <div className="form-row scholar-ship">
                            <BaseTextInput label="Valor da Bolsa"
                                type="number" id="scholarship"
                                name="scholarship"
                                placeholder="Insira o valor da bolsa..."
                                value={scifyResearch.scholarShip}
                                onChange={(e) => setScifyResearch(prev => ({ ...prev, scholarShip: parseFloat(e.target.value) }))} 
                            />
                            <BaseCheckBox label="A DEFINIR"
                                id="isToDefine"
                                name="isToDefine"
                                checked={scifyResearch.isShipToDefine}
                                onChange={(e) => setScifyResearch(prev => ({ ...prev, isShipToDefine: !prev.isShipToDefine }))} 
                            />
                        </div>  
                        <div className="form-row">
                            <BaseTextInput label="Início"
                                type="date" id="dateToBegin"
                                name="dateToBegin"
                                placeholder="MM/yyyy"
                                value={scifyResearch.dateToBeginStr}
                                onChange={(e) => setScifyResearch(prev => ({ ...prev, dateToBeginStr: e.target.value }))} 
                            />
                            <BaseTextInput label="Previsão de Finalização"
                                type="date" id="forecastFinish"
                                name="forecastFinish"
                                placeholder="MM/yyyy"
                                value={scifyResearch.forecastFinishStr}
                                onChange={(e) => setScifyResearch(prev => ({ ...prev, forecastFinishStr: e.target.value }))} 
                            />   
                        </div>
                        <SelectAreas
                            baseAreas={scifyResearch.areas} 
                            setSelectedAreas={(newAreas) => setScifyResearch(prev => ({ ...prev, areas: newAreas }))} 
                        />
                    </aside>
                </div>
            </section>
            <section className="form-submit">
                <button>CADASTRAR</button>
            </section>
        </form>
        </>
    );
}

export default FormScientificResearch;