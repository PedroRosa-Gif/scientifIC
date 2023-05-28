import axios from "axios";

export const getApplications = async (email:string) => {

  const res = await axios.post("http://localhost:8000/scientific-research-application/getApplications", {
    email: email,
  });

  return res;
}