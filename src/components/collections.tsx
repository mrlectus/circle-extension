import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "./ui/card";
import { useGetWalletBalance, useListWallet } from "@/hooks/api";
import { match } from "ts-pattern";
import { SVGPolygon, SVGSepolia, SVGUsdc } from "./icons";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { Faucet } from "./faucet";
import { Link } from "react-router-dom";

export const Collections = () => {
  const listWallet = useListWallet();
  const walletId = listWallet.data?.data?.wallets[0]?.id as string;
  const blockchain = match(listWallet.data?.data?.wallets?.[0].blockchain)
    .with("ETH-SEPOLIA", () => <SVGSepolia className="w-10 h-10" />)
    .with("MATIC-AMOY", () => <SVGPolygon className="w-10 h-10" />)
    .otherwise(() => null);
  const blockchain2 = match(listWallet.data?.data?.wallets?.[0].blockchain)
    .with("ETH-SEPOLIA", () => <SVGSepolia className="w-6 h-6" />)
    .with("MATIC-AMOY", () => <SVGPolygon className="w-6 h-6" />)
    .otherwise(() => null);
  const balance = useGetWalletBalance(walletId);
  const tBalance1 = balance.data?.data?.tokenBalances[1]?.amount || 0;
  const tBalance2 = balance.data?.data?.tokenBalances[0]?.amount || 0;

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <Tabs
          defaultValue="assets"
          className="flex flex-col justify-center w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="assets" className="w-[50%]">
              Assets
            </TabsTrigger>
            <TabsTrigger value="collectibles" className="w-[50%]">
              Collectibles
            </TabsTrigger>
            <TabsTrigger value="faucets" className="w-[50%]">
              Faucets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="assets" className="w-full">
            {match(listWallet.status)
              .with("pending", () => <Skeleton className="w-full h-48" />)
              .with("success", () => (
                <Card className="w-full bg-[#262628] p-0">
                  <div className="flex justify-between p-2 ">
                    {blockchain}{" "}
                    <Badge className="text-[#53C26E] font-extrabold flex h-4 bg-[#ffffff29] border">
                      <Check className="w-4 h-4" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between p-2">
                    {balance.data?.data?.tokenBalances[0]?.token?.name.replace(
                      "-",
                      " "
                    ) || null}
                    <span>
                      {formatCurrency(
                        Number(tBalance1 || 0) + Number(tBalance2),
                        "en-US",
                        "USD"
                      )}
                    </span>
                  </div>
                  <div className="p-2 flex flex-col gap-3 border-t border-t-white/20">
                    <Link
                      to="/transfer"
                      className="flex flex-row justify-between items-center hover:bg-black p-2 hover:rounded-md"
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <SVGUsdc className="w-6 h-6" />
                        <div className="flex flex-col text-xs">
                          <p>USD Coin</p>
                          <p>
                            {tBalance1} <span>USDC</span>
                          </p>
                        </div>
                      </div>
                      <p className="text-xs">
                        {formatCurrency(Number(tBalance1 || 0), "en-US", "USD")}
                      </p>
                    </Link>
                    <div className="flex flex-row justify-between items-center p-2">
                      <div className="flex flex-row gap-2 items-center">
                        {blockchain2}
                        <div className="flex flex-col text-xs">
                          <p>
                            {balance.data?.data?.tokenBalances[0]?.token?.name.split(
                              "-"
                            )[0] || null}
                          </p>
                          <p>
                            {balance.data?.data?.tokenBalances[0]?.amount ||
                              null}{" "}
                            <span>
                              {balance.data?.data?.tokenBalances[0]?.token?.symbol.split(
                                "-"
                              )[0] || null}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-xs">
                        {formatCurrency(
                          Number(
                            balance.data?.data?.tokenBalances[0]?.amount || 0
                          ),
                          "en-US",
                          "USD"
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
              .with("error", () => null)
              .exhaustive()}
          </TabsContent>
          <TabsContent value="collectibles"></TabsContent>
          <TabsContent value="faucets">
            <Card className="w-full bg-[#262628] p-0">
              <CardContent>
                <Faucet />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
