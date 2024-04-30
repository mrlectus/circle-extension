import { isExpired } from "react-jwt";

// This function checks if a user is logged in by verifying the presence and validity of a user token.
export const isLoggedIn = () => {
  // Retrieve the user token from local storage
  const token = localStorage.getItem("userToken");

  // Check if a token exists
  if (token) {
    // If a token exists, check if it is not expired
    const login = !isExpired(token as string); // Call isExpired function to check token expiry
    return login; // Return the result of the login check
  }

  // If no token exists, the user is not logged in
  return false;
};
