interface IFieldsProfile {
  title: string;
  field: "name" | "lastName" | "email" | "birthdate" | "ra";
  type: string;
}

export const fieldsProfile = [
  { title: "Nome", field: "name", type: "text" },
  { title: "Sobrenome", field: "lastName", type: "text" },
  { title: "Email", field: "email", type: "email" },
  { title: "Data de Nascimento", field: "birthdate", type: "date" },
  { title: "RA", field: "ra", type: "number" },
] as IFieldsProfile[];