export class AccessToken {

  private constructor() {}

  static setAccessToken(token:string){
    localStorage.setItem("accessToken", token);
  }

  static getAccessToken(){
    return localStorage.getItem("accessToken");
  }

  static clearAccessInformation(){
    localStorage.removeItem("userInfos");
    localStorage.removeItem("accessToken");
  }
}