interface IUser {
  _id?:string,

  email: string,
  password: string,
  name: string,
  lastName: string,
  ra: string,
  birthdate: Date,
  institute: string,
  interestAreas?: string[],
  type: number,
};

export default IUser;