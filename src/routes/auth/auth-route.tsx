import React from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const [cookies] = useCookies(["userToken"]);
  const [token] = React.useState(cookies?.userToken);
  const navigate = useNavigate();
  const { isExpired } = useJwt(cookies?.userToken || "");
  React.useEffect(() => {
    if (!cookies?.userToken) {
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
  }, [token, navigate, cookies.userToken, isExpired]);

  return (
    <React.Suspense fallback={"Loading"}>
      <Outlet />
    </React.Suspense>
  );
};

export default AuthRoute;
