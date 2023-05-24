import { InputHTMLAttributes, useEffect, useState } from "react";
import BaseTextInput from "./BaseTextInput";

import "../styles/SkillList.css";
import BaseList from "./BaseList";
import EmptyList from "./EmptyList";

interface ISkillList extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    baseSkills: string[];
    setList: (skills: string[]) => void;
}

function SkillList({ label, baseSkills, setList, ...props }: ISkillList) {
    const [newSkill, setNewSkill] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [alert, setAlert] = useState<string>();

    useEffect(() => {
        setSkills(baseSkills);
    }, [baseSkills]);

    const findInTheList = (newSkill: string): boolean => {
        let isInTheList = false;

        for (let i = 0; i < skills.length; i++) {
            if (newSkill === skills[i]) {
                isInTheList = true;
                break;
            }
        }

        return isInTheList;
    }

    const addSkill = () => {
        if (newSkill.length > 1) {
            if (!findInTheList(newSkill)) {
                let auxSkills = [newSkill, ...skills];

                setSkills(auxSkills);
                setList(auxSkills);

                setNewSkill("");
                setAlert("");
            } else {
                setAlert("Já está na lista!");
            }
        } else {
            setAlert("Deve possuir mais que 1 caractere");
        }
    }

    const removeSkill = (index: number) => {
        let auxSkills: string[] = [...skills];
        auxSkills.splice(index, 1);

        setSkills(auxSkills);
        setList(auxSkills);

        setAlert("");
    }

    return (
        <div className="desire-skills-container">
            <div className="skills-actions">
                <BaseTextInput label={label} 
                    value={newSkill}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                        }
                    }}
                    onChange={(e) => setNewSkill(e.target.value)}
                    {...props}    
                />
                <button type="button" onClick={addSkill}>+</button>
            </div>
            {alert && alert.length > 0 && <span className="alert">{alert}</span>}
            <article>
                <BaseList list={skills} customEmpty={<EmptyList message="Sem Habilidades Cadastradas" />}>
                    <ul>
                        {skills.map((skill, index) =>
                            <li key={skill + index}>
                                <span>{skill}</span>
                                <button type="button" onClick={() => removeSkill(index)}>Excluir</button>
                            </li>    
                        )}
                    </ul>
                </BaseList>
            </article>
        </div>
    );
}

export default SkillList;