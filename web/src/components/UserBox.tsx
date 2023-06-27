import IUser from "../interfaces/IUser";

import "../styles/UserBox.css";

interface IUserBoxProps {
  user: IUser;
}

function UserBox({ user }: IUserBoxProps) {
  return (
    <div className="user-box">
      <span className="img"></span>
      <div className="user-box-infos">
        <h5>Nome do { user.type == 1 ? 'Professor' : 'Aluno' }</h5>
        <h4>{user.name} {user.lastName}</h4>
      </div>
    </div>
  );
}

export default UserBox;