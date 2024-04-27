import { Button } from "@/components/ui/button";
import { useCreateToken } from "@/hooks/api";
import { useUserState } from "@/store/store";
import { LoaderCircle } from "lucide-react";

export const Token = () => {
  const [userId] = useUserState((state) => [state.userId]);
  const token = useCreateToken();
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img
        src={
          "https://pbs.twimg.com/profile_images/1719446730091962368/Bl01sQsB_400x400.png"
        }
        width={200}
        height={200}
      />
      <Button
        onClick={() => {
          token.mutate({ userId });
        }}
        className="border-2 text-white rounded-lg bg-black hover:bg-black/70 border-white drop-shadow-lg"
      >
        {token.isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Create Your Token"
        )}
      </Button>
    </div>
  );
};
