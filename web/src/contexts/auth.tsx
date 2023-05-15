import { ReactNode, SetStateAction, createContext, useState } from "react";
import IUser from "../interfaces/IUser";

export interface IAuthContext {
  userInfos: IUser | null;
  setUserInfos: React.Dispatch<SetStateAction<IUser | null>>;
  signed: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  userInfos: null,
  setUserInfos: () => null,
  signed: false
});

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {

  const [userInfos, setUserInfos] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider
      value={{ userInfos, setUserInfos, signed: !!userInfos }}
    >
      {children}
    </AuthContext.Provider>
  );
}