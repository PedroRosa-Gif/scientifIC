export function getAcessErrorMessage(jwtError:string){
  switch (jwtError) {
    case "jwt malformed":
      return "Token de acesso está mal formatado! Faça login novamente";
    case "jwt expired":
      return "Token de acesso expirado! Faça login novamente";
    default:
      return "Erro na autenticação! Faça login novamente";
  }
}