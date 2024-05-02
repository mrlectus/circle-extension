import React from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const [cookies] = useCookies(["userToken"]);
  const [token, setToken] = React.useState(cookies?.userToken);
  const navigate = useNavigate();
  const { isExpired } = useJwt(cookies?.userToken || "");

  const redirectToSignIn = (message = "Please Login") => {
    navigate("/signin", {
      replace: true,
      state: { message },
    });
  };

  React.useEffect(() => {
    // Update token when cookies.userToken changes
    setToken(cookies?.userToken);
  }, [cookies?.userToken]);

  React.useEffect(() => {
    if (!token) {
      // Check token instead of cookies?.userToken
      redirectToSignIn();
    } else {
      if (isExpired) {
        redirectToSignIn();
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [token, isExpired, navigate]);

  return (
    <React.Suspense fallback={"Loading"}>
      <Outlet />
    </React.Suspense>
  );
};

export default AuthRoute;
