import { useEffect, useState } from "react";
import { allAreas } from "../utils/constants/allAreas.constants";
import BaseTextInput from "./BaseTextInput";

import "../styles/SelectAreas.css";
import BaseList from "./BaseList";
import EmptyList from "./EmptyList";
import BaseDataList from "./BaseDataList";

interface ISelectAreas {
    baseAreas: string[];
    setSelectedAreas: (areas: string[]) => void;
}

function SelectAreas({ baseAreas, setSelectedAreas }: ISelectAreas) {
    const [newArea, setNewArea] = useState<string>(""); 
    const [alert, setAlert] = useState<string>(""); 
    const [areas, setAreas] = useState<string[]>([]);

    useEffect(() => {
        setAreas(baseAreas);
    }, [baseAreas]);

    const addArea = () => {
        if (newArea.length > 0 && allAreas.includes(newArea)) {
            if (!areas.includes(newArea)) {
                let auxAreas = [newArea, ...areas];

                setAreas(auxAreas);
                setSelectedAreas(auxAreas);
        
                setAlert("");
            } else {
                setAlert("Área já selecionada");
            }
        } else {
            setAlert("Área inválida");
        }

        setNewArea("");
    }

    const removeArea = (index: number) => {
        let auxAreas: string[] = [...areas];
        auxAreas.splice(index, 1);

        setAreas(auxAreas);
        setSelectedAreas(auxAreas);

        setAlert("");
    }

    return (
        <div className="areas-select-container">
            <div className="areas-actions">
                <BaseDataList 
                    label="Procure por uma área"
                    list="areaList" id="area"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addArea();
                        }
                    }}
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="Procure pela área..."
                    options={allAreas}
                />
                <button type="button" onClick={addArea}>+</button>
            </div>
            {alert && alert.length > 0 && <span className="alert-areas">{alert}</span>}
            <main className="areas-selected-box">
                <label>Áreas Relacionadas</label>
                <div className="areas">
                    <BaseList list={areas} customEmpty={<EmptyList message="Ainda não possui área selecionada" />}>
                        <>
                        {areas.map((area, index) => 
                            <span key={index + area} className="area-selected">
                                {area}
                                <button type="button" title="Remover Área" onClick={() => removeArea(index)}>&times;</button>
                            </span>
                        )}
                        </>
                    </BaseList>
                </div>
            </main>
        </div>
    );
}

export default SelectAreas;