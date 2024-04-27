import React from "react";
import { isExpired } from "react-jwt";

export const useIsLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  const [login, setLogin] = React.useState<boolean>(
    () => !isExpired(token as string)
  );
  React.useEffect(() => {
    const expired = isExpired(token as string);
    setLogin(!expired);
  }, [token]);
  return [login] as const;
};
