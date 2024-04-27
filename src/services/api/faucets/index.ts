import { BASE_URL } from "@/lib/config";

export const getFaucets = async ({
  blockchain,
  address,
  native,
  usdc,
}: {
  blockchain: string;
  address: string;
  native?: boolean;
  usdc?: boolean;
}) => {
  const response = await fetch(`${BASE_URL}/faucet/drips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blockchain, address, native, usdc }),
  });
  return response.status;
};
