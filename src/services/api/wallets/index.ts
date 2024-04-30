import { BASE_URL } from "@/lib/config";
import { Balance, Wallet, Wallets } from "./schema";

// This function sends a request to the server to retrieve information about a specific wallet based on its ID.
// Parameters:
// - walletId: The ID of the wallet to retrieve information for.
// Returns:
// - The response from the server containing information about the specified wallet.
export const getWallet = async ({ walletId }: { walletId: string }) => {
  try {
    // Send a GET request to the server to fetch information about the wallet
    const response = await fetch(`${BASE_URL}/wallets/${walletId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the JSON response to extract wallet information
    const wallet = await response.json();

    // Return the response containing information about the specified wallet
    return wallet as Wallet;
  } catch (error) {
    // If an error occurs during the fetch operation, log the error and re-throw it
    console.error("Error fetching wallet:", error);
    throw error;
  }
};

// This function sends a request to the server to retrieve a list of wallets associated with the user's token.
// Parameters:
// - token: The user token for authentication.
// Returns:
// - The response from the server containing a list of wallets associated with the user.
export const listWallet = async ({ token }: { token: string }) => {
  try {
    // Send a GET request to the server to fetch the list of wallets
    const response = await fetch(`${BASE_URL}/wallets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-User-Token": token,
      },
    });

    // Parse the JSON response to extract the list of wallets
    const wallets = await response.json();

    // Return the response containing the list of wallets
    return wallets as Wallets;
  } catch (error) {
    // If an error occurs during the fetch operation, log the error and re-throw it
    console.error("Error fetching wallets:", error);
    throw error;
  }
};

// This function sends a request to the server to retrieve the balance of a specific wallet.
// Parameters:
// - token: The user token for authentication.
// - walletId: The ID of the wallet to retrieve the balance for.
// Returns:
// - The response from the server containing the balance of the specified wallet.
export const getWalletBalance = async ({
  token,
  walletId,
}: {
  token: string;
  walletId: string;
}) => {
  try {
    // Send a GET request to the server to fetch the balance of the wallet
    const response = await fetch(`${BASE_URL}/wallets/${walletId}/balances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-User-Token": token,
      },
    });

    // Parse the JSON response to extract the balance
    const balance = await response.json();

    // Return the response containing the balance of the specified wallet
    return balance as Balance;
  } catch (error) {
    // If an error occurs during the fetch operation, log the error and re-throw it
    console.error("Error fetching wallet balance:", error);
    throw error;
  }
};
