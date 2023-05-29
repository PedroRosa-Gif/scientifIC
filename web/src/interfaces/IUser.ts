interface IUser {
  _id?:string,
  email: string,
  password?: string,
  name: string,
  lastName: string,
  ra: string,
  birthdate: string,
  institute: string,
  type: number,
  interestAreas?: string[],
};

export default IUser;