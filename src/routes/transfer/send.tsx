import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SVGSepolia, SVGUsdc } from "@/components/icons";
import { useGetWalletBalance, useListWallet, useTransfer } from "@/hooks/api";

const formSchema = z.object({
  destinationAddress: z.string().min(1, { message: "Address is required" }),
  amounts: z.coerce
    .string({
      invalid_type_error: "Amount must be a number",
    })
    .min(1, { message: "Amount must be greater than 0" }),
  tokenId: z.string().min(1),
});

export const Send = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationAddress: "",
      amounts: "",
    },
  });
  const navigate = useNavigate();

  const walletId = useListWallet();
  const wId = walletId.data?.data.wallets[0].id as string;
  const tokenBalance = useGetWalletBalance(wId);
  const tBalance =
    Number(tokenBalance.data?.data.tokenBalances[0].amount) +
    Number(tokenBalance.data?.data.tokenBalances[1].amount);
  const transfer = useTransfer();
  return (
    <div>
      <div className="flex gap-2 items-center">
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="w-10 h-10 cursor-pointer"
        />
        <p className="font-bold text-xl">Send</p>
      </div>
      <div className="p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              transfer.mutate({
                ...data,
                walletId: wId,
                userId: localStorage.getItem("userId") as string,
              })
            )}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="destinationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sending to</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter an address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a Token" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value={
                          tokenBalance.data?.data?.tokenBalances[1]?.token
                            ?.id as string
                        }
                      >
                        <div className="flex flex-row items-center gap-2">
                          <SVGUsdc className="w-4 h-4" /> USDC
                        </div>
                      </SelectItem>
                      <SelectItem
                        value={
                          tokenBalance.data?.data?.tokenBalances[0]?.token
                            ?.id as string
                        }
                      >
                        <div className="flex flex-row items-center gap-2">
                          <SVGSepolia /> ETH
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
              name="amounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between mx-1">
                    <p>Amount</p>{" "}
                    <p>
                      Balance: <span className="font-bold">{tBalance}</span>
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount to send"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {transfer.isPending ? "Sending..." : "Transfer"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
