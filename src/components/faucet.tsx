import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useGetFaucet, useListWallet } from "@/hooks/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "./ui/button";
import { SVGPolygon, SVGSepolia } from "./icons";
import { Checkbox } from "./ui/checkbox";
import { match } from "ts-pattern";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  blockchain: z.string().min(2),
  address: z.string().min(2),
  usdc: z.boolean().default(false).optional(),
  native: z.boolean().default(false).optional(),
});

export const Faucet = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockchain: "",
      address: "",
      usdc: false,
      native: false,
    },
  });
  const listWallet = useListWallet();
  const walletId = listWallet.data?.data?.wallets[0]?.id as string;
  const faucets = useGetFaucet(walletId);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => faucets.mutate(data))}
          className="space-y-4"
        >
          <div className="flex justify-evenly mt-1">
            <FormField
              control={form.control}
              name="usdc"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center rounded-md gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">USDC</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="native"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center rounded-md gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">ETH</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="blockchain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pick Network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ETH-SEPOLIA">
                      <div className="flex flex-row items-center gap-2">
                        <SVGSepolia /> Ethereum Sepolia
                      </div>
                    </SelectItem>
                    <SelectItem value="MATIC-AMOY">
                      <div className="flex flex-row items-center gap-2">
                        <SVGPolygon /> Polygon PoS Amoy
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder="0xXXXX...XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full flex gap-2">
            {match(faucets.status)
              .with("pending", () => {
                return (
                  <>
                    <LoaderCircle className="animate-spin" />
                    <span>Get Faucet</span>
                  </>
                );
              })
              .otherwise(() => "Get Faucet")}
          </Button>
        </form>
      </Form>
    </>
  );
};
