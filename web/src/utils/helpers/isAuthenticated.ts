import { checkAutentication } from "../../apis/user.endpoint";
import { AccessToken } from "./AcessToken"

export async function isAuthenticated(){

  const acessToken = AccessToken.getAccessToken();

  const result = await checkAutentication(acessToken);
  console.log(result)

  if(result.data.error === undefined)
    return true;
  
  console.log(result.data);
  AccessToken.clearAccessToken();

  return false;
}