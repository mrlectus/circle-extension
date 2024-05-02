import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useAddContact } from "@/hooks/api";
import { match } from "ts-pattern";
import toast, { LoaderIcon } from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Username is required",
    })
    .min(2, {
      message: "Username must be at least 2 characters",
    }),
  walletAddress: z.string().min(1),
  tags: z.string().default("circle"),
});

const AddContact = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      walletAddress: "",
      tags: "",
    },
  });
  const contact = useAddContact();
  return (
    <main className="flex justify-center items-center w-full p-2">
      <div className="w-[440px] h-[600px] p-2 text-white font-space border border-white rounded-md drop-shadow-md">
        <div className="flex gap-2 items-center">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="w-10 h-10 cursor-pointer"
          />
          <p className="font-bold text-xl">New Contact</p>
        </div>
        <div className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                contact.mutate(data, {
                  onSuccess: () => {
                    toast.success("contact added");
                  },
                  onError: (error) => {
                    toast.error(error.message);
                  },
                })
              )}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter wallet address " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labels</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Label e.g friend,Bob's Store"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Labels can be seperated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"outline"} className="w-full">
                {match(contact.status)
                  .with("pending", () => (
                    <>
                      <LoaderIcon /> Save
                    </>
                  ))
                  .otherwise(() => "Save")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default AddContact;
