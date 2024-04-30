import { isExpired } from "react-jwt";

export const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    const login = !isExpired(token as string);
    return login;
  }
  return false;
};
