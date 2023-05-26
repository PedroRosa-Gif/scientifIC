interface IUser {
  user: object;
  setUser: Function;
}

export default function EditProfile({ user, setUser }:IUser) {
  const fields = [
    { title: "Nome", field: "name", type: "text" },
    { title: "Sobrenome", field: "lastName", type: "text" },
    { title: "Email", field: "email", type: "email" },
    { title: "Data de Nascimento", field: "birthDate", type: "date" },
    { title: "RA", field: "ra", type: "number" },
  ];

  return (
    <>
      {
        fields.map((fil) => {
          return (
            <div className="text-profile-input">
              <label htmlFor={"input-profile" + fil.title}>{fil.title}:</label>
              <input type={fil.type} onChange={(e) => setUser({ ...user, [fil.field]: e.target.value })} id={"input-profile" + fil.title} />
            </div>
          )
        })
      }
    </>
  )
}