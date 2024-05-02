import React from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const [cookies] = useCookies(["userToken"]);
  const navigate = useNavigate();
  const { isExpired } = useJwt(cookies?.userToken || "");

  const redirectToSignIn = (message = "Please Login") => {
    navigate("/signin", {
      replace: true,
      state: { message },
    });
  };

  React.useEffect(() => {
    if (!cookies?.userToken) {
      redirectToSignIn();
    } else {
      if (isExpired) {
        redirectToSignIn();
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [cookies?.userToken, isExpired, navigate]);

  return (
    <React.Suspense fallback={"Loading"}>
      <Outlet />
    </React.Suspense>
  );
};

export default AuthRoute;
