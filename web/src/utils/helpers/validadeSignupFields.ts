export function validadePassword(password:string, confirmPassword:string){

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  let result = {
    result: false,
    message: ""
  }

  if(password != confirmPassword){
    result.message = "Os campos 'senha' e 'confirmar senha' devem ser iguais";
    return result;
  }

  if(password.length < 8){
    result.message = "A senha deve ter pelo menos 8 caracteres";
    return result;
  }

  if(password.length > 15){
    result.message = "A senha deve ter menos de 16 caracteres";
    return result;
  }

  if(!hasSpecialChar.test(password)){
    result.message = "A senha precisa ter pelo menos um caracter especial";
    return result;
  }

  result.result = true;
  return result;
}