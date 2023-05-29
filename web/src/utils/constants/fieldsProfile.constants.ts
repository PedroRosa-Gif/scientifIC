interface IFieldsProfile {
  title: string;
  field: "name" | "lastName" | "email" | "birthdate" | "ra";
  type: string;
  required: boolean;
}

export const fieldsProfile = [
  { title: "Nome", field: "name", type: "text", required: true },
  { title: "Sobrenome", field: "lastName", type: "text", required: true },
  { title: "Email", field: "email", type: "email", required: true },
  { title: "Data de Nascimento", field: "birthdate", type: "date", required: true },
  { title: "RA", field: "ra", type: "number", required: true },
] as IFieldsProfile[];