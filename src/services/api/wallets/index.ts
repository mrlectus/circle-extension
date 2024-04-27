import { BASE_URL } from "@/lib/config";
import { Balance, Wallet, Wallets } from "./schema";

export const getWallet = async ({ walletId }: { walletId: string }) => {
  const response = await fetch(`${BASE_URL}/wallets/${walletId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const wallet = await response.json();
  return wallet as Wallet;
};

export const listWallet = async ({ token }: { token: string }) => {
  const response = await fetch(`${BASE_URL}/wallets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Token": token,
    },
  });
  const wallet = await response.json();
  return wallet as Wallets;
};

export const getWalletBalance = async ({
  token,
  walletId,
}: {
  token: string;
  walletId: string;
}) => {
  const response = await fetch(`${BASE_URL}/wallets/${walletId}/balances`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Token": token,
    },
  });
  const balance = await response.json();
  return balance as Balance;
};
