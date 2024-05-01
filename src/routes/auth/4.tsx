import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SVGPolygon, SVGSepolia } from "@/components/icons";
import { useCreateWallet } from "@/hooks/api";
import toast from "react-hot-toast";

const formSchema = z.object({
  blockchains: z.string(),
});

export const Wallet = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const wallet = useCreateWallet();
  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>
          <img
            src={
              "https://pbs.twimg.com/profile_images/1719446730091962368/Bl01sQsB_400x400.png"
            }
            width={50}
            height={50}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              wallet.mutate(data, {
                onSuccess: () => {
                  toast.success("Wallet created successfully");
                },
              })
            )}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="blockchains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a Network" />
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
            <Button
              type="submit"
              className="border-2 w-full text-white rounded-lg bg-black hover:bg-black/70 border-white drop-shadow-lg"
            >
              {wallet.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Create Wallet"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
