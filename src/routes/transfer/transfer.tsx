import { SVGUsdc } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useGetWalletBalance,
  useListTransaction,
  useListWallet,
} from "@/hooks/api";
import { formatCurrency } from "@/lib/utils";
import { ChevronLeft, MoveUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Transactions } from "./transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { T } from "@/services/api/transactions/schema";

export const Transfer = () => {
  const listWallet = useListWallet();
  const walletId = listWallet.data?.data?.wallets[0]?.id as string;
  const balance = useGetWalletBalance(walletId);
  const tBalance1 = balance.data?.data?.tokenBalances[1]?.amount || 0;
  const navigate = useNavigate();
  const transactions = useListTransaction();

  return (
    <div className="p-1">
      <div className="flex gap-2 items-center">
        <Link to={".."}>
          <ChevronLeft className="w-10 h-10" />
        </Link>
        <p className="font-bold text-xl">Token Details</p>
      </div>
      <div className="flex flex-row justify-between items-center hover:bg-black p-2 hover:rounded-md">
        <div className="flex flex-row gap-2 items-center">
          <SVGUsdc className="w-10 h-10" />
          <div className="flex flex-col text-xs">
            <p className="font-bold">USD Coin</p>
            <p>
              {tBalance1} <span>USDC</span>
            </p>
          </div>
        </div>
        <p className="font-bold">
          {formatCurrency(Number(tBalance1 || 0), "en-US", "USD")}
        </p>
      </div>
      <div className="m-4">
        <Button
          onClick={() => navigate("/send")}
          className="bg-[#262628] hover:bg-[#262628]/80 flex gap-2 text-white rounded-2xl"
        >
          <MoveUpRight /> Send
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-3">
        <p className="mx-2 mt-1">Activity</p>
        <div className="flex flex-col gap-2 h-36 scrollbar-thin scrollbar-thumb-indigo-300 overflow-y-scroll p-2">
          {transactions.data?.data.transactions?.map((transaction: T) =>
            transactions.isFetching ? (
              <Skeleton className="w-full h-48" key={transaction.id} />
            ) : (
              <Transactions transaction={transaction} key={transaction.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
