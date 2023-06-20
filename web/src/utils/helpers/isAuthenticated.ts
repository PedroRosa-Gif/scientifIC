import { checkAutentication } from "../../apis/user.endpoint";
import { AccessToken } from "./AcessToken"
import { getAcessErrorMessage } from "./getAcessErrorMessage";

export async function isAuthenticated(){

  const acessToken = AccessToken.getAccessToken();

  if(acessToken !== null && acessToken !== ""){
    const result = await checkAutentication(acessToken);

    if(result.data.error === undefined)
      return {
        result: true,
        message: ""
      };
    
    AccessToken.clearAccessInformation();

    return {
      result: false,
      message: getAcessErrorMessage(result.data.error.message)
    };
  }

  AccessToken.clearAccessInformation();
  return {
    result: false,
    message: "Você precisa logar para acessar a página"
  };
}

