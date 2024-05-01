import { BASE_URL } from "@/lib/config";

// This function sends a request to the server to create a new user with the provided details.
// Parameters:
// - username: The username of the new user.
// - email: The email address of the new user.
// - password: The password of the new user.
// Returns:
// - The response from the server containing information about the newly created user.
export const createUser = async ({
  username,
  email,
  password,
}: Omit<User, "id" | "userId">) => {
  try {
    // Prepare the payload for the POST request
    const payload = { username, email, password };

    // Send a POST request to the server to create a new user
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Parse the JSON response to extract the user information
    const user = await response.json();

    // Return the response containing information about the newly created user
    return user as UserResponse;
  } catch (error) {
    // If an error occurs during the creation of the user, log the error and re-throw it
    console.error("Error creating user:", error);
    throw error;
  }
};

// This function sends a request to the server to create a new token for the specified user ID.
// Parameters:
// - userId: The ID of the user for whom the token is being created.
// Returns:
// - The response from the server containing information about the newly created token.
export const createToken = async ({ userId }: { userId: string }) => {
  try {
    // Send a POST request to the server to create a new token
    const response = await fetch(`${BASE_URL}/users/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    // Parse the JSON response to extract the token information
    const token = await response.json();

    // Return the response containing information about the newly created token
    return token as TokenData;
  } catch (error) {
    // If an error occurs during the creation of the token, log the error and re-throw it
    console.error("Error creating token:", error);
    throw error;
  }
};

// This function sends a request to the server to create a new wallet for the specified user.
// Parameters:
// - token: The user token for authentication.
// - blockchains: The blockchain(s) to be associated with the new wallet.
// - userId: The ID of the user for whom the wallet is being created.
// Returns:
// - The response from the server containing information about the newly created wallet.
export const createWallet = async ({
  token,
  blockchains,
  userId,
}: {
  token: string;
  blockchains: string;
  userId: string;
}) => {
  try {
    // Send a POST request to the server to create a new wallet
    const response = await fetch(`${BASE_URL}/users/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, blockchains, userId }),
    });

    // Parse the JSON response to extract the wallet information
    const wallet = await response.json();

    // Return the response containing information about the newly created wallet
    return wallet as ChallengeType;
  } catch (error) {
    // If an error occurs during the creation of the wallet, log the error and re-throw it
    console.error("Error creating wallet:", error);
    throw error;
  }
};

// This function fetches the status of a user based on the provided token.
// Parameters:
// - token: The user token for authentication.
// Returns:
// - The response from the server containing the user status information.
export const getStatus = async ({ token }: { token: string }) => {
  try {
    // Send a GET request to the server to fetch the user status
    const response = await fetch(`${BASE_URL}/users/status?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the JSON response to extract the user status information
    const status = await response.json();

    // Return the response containing the user status
    return status as Status;
  } catch (error) {
    // If an error occurs during the fetch operation, log the error and re-throw it
    console.error("Error fetching user status:", error);
    throw error;
  }
};

// This function sends a request to the server to authenticate a user with the provided email and password.
// Parameters:
// - email: The email address of the user.
// - password: The password of the user.
// Returns:
// - The response from the server containing user information upon successful authentication.
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Send a POST request to the server to authenticate the user
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response indicates successful authentication
    if (!response.ok) {
      // If authentication fails, throw an error with appropriate message
      throw new Error("Invalid credentials");
    }

    // Parse the JSON response to extract user information
    const user = await response.json();

    // Return user information upon successful authentication
    return user as User;
  } catch (error) {
    // If an error occurs during the authentication process, re-throw the error
    throw error;
  }
};

// This function sends a request to the server to initiate the restoration process for a user's PIN.
// It requires a valid user token for authentication.
// Returns:
// - The response from the server containing information about the restoration process.
export const createRestore = async (userToken: string) => {
  try {
    // Send a POST request to the server to initiate PIN restoration
    const response = await fetch(`${BASE_URL}/users/pin/restore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Token": userToken,
      },
      body: JSON.stringify({}),
    });

    // Parse the JSON response to extract information about the restoration process
    const challenge = await response.json();

    // Return the response containing information about the restoration process
    return challenge as ChallengeType;
  } catch (error) {
    // If an error occurs during the restoration process, re-throw the error
    throw error;
  }
};
