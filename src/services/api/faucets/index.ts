import { BASE_URL } from "@/lib/config";

// This function requests tokens from the faucet for a specified blockchain and address.
// Parameters:
// - blockchain: The blockchain for which tokens are being requested.
// - address: The address to which tokens will be sent.
// - native: (Optional) A boolean indicating whether native tokens are requested.
// - usdc: (Optional) A boolean indicating whether USDC tokens are requested.
// Returns:
// - The HTTP status code indicating the success or failure of the request.
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
  try {
    // Send a POST request to the server to request tokens from the faucet
    const response = await fetch(`${BASE_URL}/faucet/drips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blockchain, address, native, usdc }),
    });

    // Return the HTTP status code
    return response.status;
  } catch (error) {
    // If an error occurs during the request, log the error and re-throw it
    console.error("Error requesting tokens from faucet:", error);
    throw error;
  }
};
