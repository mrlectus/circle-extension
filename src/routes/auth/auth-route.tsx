import { isLoggedIn } from "@/hooks/auth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const navigate = useNavigate();
  const isLogged = isLoggedIn();
  console.log(isLogged);

  React.useEffect(() => {
    if (!isLogged) {
      navigate("/signin");
    }
  }, [isLogged, navigate]);

  return <Outlet />;
};

export default AuthRoute;
