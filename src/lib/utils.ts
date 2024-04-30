import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This function formats a given address by displaying the first 6 and last 4 characters with an ellipsis in between.
export const formatAddress = (address: string) => {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};

// This function formats a given currency amount according to the specified format and currency.
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
