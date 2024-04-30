import {
  ChevronDown,
  Circle,
  CircleDollarSign,
  CircleUser,
  Copy,
  Lock,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import React from "react";
import { Badge } from "./ui/badge";
import { SVGPolygon, SVGSepolia } from "./icons";
import { useListWallet } from "@/hooks/api";
import { formatAddress } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import toast from "react-hot-toast";
import { match } from "ts-pattern";

export const NavBar = () => {
  const [username, setUserName] = React.useState<string | null>();
  React.useEffect(() => {
    const uname = localStorage.getItem("username");
    setUserName(uname);
  });

  const listWallet = useListWallet();
  const blockchain = match(listWallet.data?.data?.wallets?.[0].blockchain)
    .with("ETH-SEPOLIA", () => <SVGSepolia />)
    .with("MATIC-AMOY", () => <SVGPolygon />)
    .otherwise(() => null);
  return (
    <header className="p-1">
      <nav className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <img
                  src={
                    "https://pbs.twimg.com/profile_images/1719446730091962368/Bl01sQsB_400x400.png"
                  }
                  width={70}
                  height={70}
                />
                <p className="text-2xl">CIRCLE</p>
              </SheetTitle>
            </SheetHeader>
            <ul className="p-1 mt-4 w-full">
              <li className="flex items-center gap-2 w-full hover:bg-white/20 p-1 rounded-md drop-shadow-md">
                <CircleUser />{" "}
                <Link to="/contacts" className="">
                  Address Book
                </Link>
              </li>
              <li className="flex items-center gap-2 w-full hover:bg-white/20 p-1 rounded-md drop-shadow-md">
                <CircleDollarSign />
                <Link to="#" className="">
                  Currency
                </Link>
              </li>
              <li className="flex items-center gap-2 w-full hover:bg-white/20 p-1 rounded-md drop-shadow-md">
                <Lock />
                <Link to="/restore" className="">
                  Security &amp; Privacy
                </Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
        <div>
          <div className="flex items-center gap-1">
            <Circle
              fill="green"
              stroke="green"
              className="w-4 h-4 animate-pulse"
            />
            <Link to="" className="hover:text-blue-100 flex items-center gap-1">
              {username}
              <ChevronDown className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <span className="text-center text-xs flex items-center gap-x-1">
              <Copy
                className="w-4 h-4"
                onClick={() => {
                  navigator.clipboard.writeText(
                    listWallet.data?.data?.wallets[0]?.address as string
                  );
                  toast.success("Address copied to clipboard");
                }}
              />
              {match(listWallet.status)
                .with("pending", () => <Skeleton className="w-24 h-4" />)
                .with("success", () =>
                  formatAddress(
                    listWallet.data?.data?.wallets?.[0]?.address as string
                  )
                )
                .with("error", () => null)
                .exhaustive()}
            </span>
          </div>
        </div>
        <Badge className="bg-gray-900 hover:bg-gray-800 text-white">
          {blockchain}
          <ChevronDown className="w-4 h-4" />
        </Badge>
      </nav>
    </header>
  );
};
