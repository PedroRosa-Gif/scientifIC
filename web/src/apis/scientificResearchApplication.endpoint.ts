import axios from "axios";

export const getApplications = async (id:string) => {

  const res = await axios.post("http://localhost:8000/scientific-research-application/getApplications", {
    id: id,
  });

  return res;
}