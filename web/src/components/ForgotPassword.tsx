import "../styles/ForgotPassword.css";

interface IForgot {
    link: string
}

export default function ForgotPassword({ link }:IForgot) {
  return (
    <div className="div-align-forgot-password">
      <span>Esqueceu a senha?</span>
    </div>
  )
}