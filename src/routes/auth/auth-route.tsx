import React from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const [cookies] = useCookies(["token"]);
  const [token] = React.useState(cookies?.token);
  const navigate = useNavigate();
  const { isExpired } = useJwt(cookies?.token || "");
  React.useEffect(() => {
    if (!cookies?.token) {
      navigate("/signin", {
        replace: true,
        state: { message: "Please Login" },
      });
    } else {
      if (isExpired) {
        navigate("/signin", {
          replace: true,
          state: { message: "Please Login" },
        });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [token, navigate, cookies.token, isExpired]);

  return (
    <React.Suspense fallback={"Loading"}>
      <Outlet />
    </React.Suspense>
  );
};

export default AuthRoute;
