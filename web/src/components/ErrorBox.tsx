import { useNavigate } from "react-router-dom";
import "../styles/ErrorBox.css";

interface IErrorBoxProps {
    message: string;
}

function ErrorBox({ message }: IErrorBoxProps) {
    const navigate = useNavigate();

    return (
        <h1 className="error">
            {message}
            <button type="button" onClick={() => navigate(-1)}>Voltar</button>
        </h1>
    );
}

export default ErrorBox;