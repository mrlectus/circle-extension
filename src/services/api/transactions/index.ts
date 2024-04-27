import { BASE_URL } from "@/lib/config";
import { Transfer } from "./schema";

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
