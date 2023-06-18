import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/helpers/isAuthenticated";

export function PrivateRoutes() {
  const [authenticated, setAuthenticated] = useState(undefined);

  async function checkAuthentication() {
    const authenticated = await isAuthenticated();
    setAuthenticated(authenticated);
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  if(authenticated != undefined)
    return( authenticated ? <Outlet/> : <Navigate to="/login"/>)
}