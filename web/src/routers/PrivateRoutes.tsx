import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/helpers/isAuthenticated";
import Login from "../pages/Login";

export function PrivateRoutes() {
  const [authenticated, setAuthenticated] = useState(undefined);

  async function checkAuthentication() {
    const authenticated = await isAuthenticated();
    setAuthenticated(authenticated);
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  if(authenticated !== undefined)
    return( authenticated.result ? <Outlet/> : <Login error={authenticated.message}/>)
}