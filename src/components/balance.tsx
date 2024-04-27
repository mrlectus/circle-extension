import { useGetWalletBalance, useListWallet } from "@/hooks/api";
import { Skeleton } from "./ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { match } from "ts-pattern";
import { useLocation } from "react-router-dom";

export const Balance = () => {
  const wallet = useListWallet();
  const balance = useGetWalletBalance(
    wallet.data?.data?.wallets[0]?.id as string
  );
  const tBalance1 = balance.data?.data?.tokenBalances[1]?.amount || 0;
  const tBalance2 = balance.data?.data?.tokenBalances[0]?.amount || 0;
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="flex justify-center p-4">
      <div className="text-white text-4xl flex items-baseline gap-2 font-bold">
        {match(balance.status)
          .with("pending", () => <Skeleton className="w-28 h-10" />)
          .with("success", () =>
            formatCurrency(
              Number(tBalance1) + Number(tBalance2),
              "en-US",
              "USD"
            )
          )
          .with("error", () => formatCurrency(0, "en-US", "USD"))
          .exhaustive()}
        <span className="text-xl font-normal text-white/70">USD</span>
      </div>
    </div>
  );
};
