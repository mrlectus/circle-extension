import { BASE_URL } from "@/lib/config";
import { Transaction, Transfer } from "./schema";

export const transfer = async ({
  userId,
  destinationAddress,
  amounts,
  tokenId,
  walletId,
}: Transfer) => {
  const response = await fetch(`${BASE_URL}/transactions/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Token": localStorage.getItem("userToken") as string,
    },
    body: JSON.stringify({
      userId,
      destinationAddress,
      amounts,
      tokenId,
      walletId,
    }),
  });
  const challenge = await response.json();
  return challenge as ChallengeType;
};

export const getTransactions = async () => {
  const response = await fetch(`${BASE_URL}/transactions`, {
    headers: {
      "Content-Type": "application/json",
      "X-User-Token": localStorage.getItem("userToken") as string,
    },
  });
  const transactions = await response.json();
  return transactions as Transaction;
};
