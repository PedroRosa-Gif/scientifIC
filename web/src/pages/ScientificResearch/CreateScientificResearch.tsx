import ContainerResearch from "../../components/ContainerResearch";
import FormScientificResearch from "../../components/forms/FormScientificResearch";

function CreateScientificResearch() {
    return (
        <ContainerResearch>
            <FormScientificResearch 
                title="Cadastrar Oportunidade de IC"
                onSubmit={(data, reset) => {
                    console.log(data);
                    reset();
                }}    
            />
        </ContainerResearch>
    );
}

export default CreateScientificResearch;