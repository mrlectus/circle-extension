import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (address: string) => {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};

export const formatCurrency = (
  amount: number,
  format: string,
  currency: string
) => {
  return new Intl.NumberFormat(format, {
    style: "currency",
    currency,
  }).format(amount);
};
