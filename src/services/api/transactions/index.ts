import { BASE_URL } from "@/lib/config";
import { Transaction, Transfer } from "./schema";

// This function initiates a token transfer from the user's wallet to a destination address.
// Parameters:
// - userId: The ID of the user initiating the transfer.
// - destinationAddress: The address to which tokens will be transferred.
// - amounts: An array of amounts to be transferred.
// - tokenId: The ID of the token being transferred.
// - walletId: The ID of the user's wallet from which tokens will be transferred.
// Returns:
// - The challenge generated as a result of the transfer operation.
export const transfer = async ({
  userId,
  destinationAddress,
  amounts,
  tokenId,
  walletId,
  userToken,
}: Transfer & { userToken: string }) => {
  try {
    // Send a POST request to the server to initiate the transfer
    const response = await fetch(`${BASE_URL}/transactions/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Token": userToken,
      },
      body: JSON.stringify({
        userId,
        destinationAddress,
        amounts,
        tokenId,
        walletId,
      }),
    });

    // Parse the JSON response to extract the challenge
    const challenge = await response.json();

    // Return the challenge generated by the transfer operation
    return challenge as ChallengeType;
  } catch (error) {
    // If an error occurs during the transfer operation, log the error and re-throw it
    console.error("Error initiating token transfer:", error);
    throw error;
  }
};

// This function fetches a list of transactions associated with the current user.
// It requires a valid user token for authentication.
// Returns:
// - The list of transactions fetched from the server.
export const getTransactions = async (userToken: string) => {
  try {
    // Send a GET request to the server to fetch transactions
    const response = await fetch(`${BASE_URL}/transactions`, {
      headers: {
        "Content-Type": "application/json",
        "X-User-Token": userToken,
      },
    });

    // Parse the JSON response to extract the transactions
    const transactions = await response.json();

    // Return the list of transactions
    return transactions as Transaction;
  } catch (error) {
    // If an error occurs during the fetch operation, log the error and re-throw it
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
