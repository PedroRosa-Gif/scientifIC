import "../styles/ForgotPassword.css";

interface IForgot {
    user: string
}

export default function ForgotPassword({ user }:IForgot) {
  return (
    <div className="div-align-forgot-password">
      <span>Esqueceu a senha?</span>
    </div>
  )
}