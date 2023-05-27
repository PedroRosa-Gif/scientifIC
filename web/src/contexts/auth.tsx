import React, { createContext, useState, useEffect } from "react";
import IUser from "../interfaces/IUser";

interface UserContextProps {
  userInfos: IUser | null;
  signed: boolean;
  setUserInfos: (newUser: IUser | null) => void;
}

export const AuthContext = createContext<UserContextProps>({
  userInfos: null,
  signed: false,
  setUserInfos: () => {}
});
interface UserProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfos, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("userInfos");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [signed, setSigned] = useState<boolean>(false);

  const setUserInfos = (newUser: IUser | null) => {
    setUser(newUser);
  };

  useEffect(() => {
    if (userInfos) {
      setSigned(true);
    } else {
      setSigned(false);
    }
  }, [userInfos]);

  useEffect(() => {
    localStorage.setItem("userInfos", JSON.stringify(userInfos));
  }, [userInfos]);

  return (
    <AuthContext.Provider value={{ userInfos, signed, setUserInfos }}>
      {children}
    </AuthContext.Provider>
  );
};