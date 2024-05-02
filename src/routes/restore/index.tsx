import { Button } from "@/components/ui/button";
import { useCreateRestore } from "@/hooks/api";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";

const Restore = () => {
  const navigate = useNavigate();
  const restore = useCreateRestore();
  const [cookies] = useCookies(["userToken"]);
  return (
    <main className="flex justify-center items-center w-full p-2">
      <div className="w-[440px] h-[600px] p-2 text-white font-space border border-white">
        <div className="flex gap-2 items-center">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="w-10 h-10 cursor-pointer"
          />
          <p className="font-bold text-xl">Change Wallet Pin</p>
        </div>
        <div className="flex justify-between items-center p-4 w-full">
          <Button
            variant={"secondary"}
            onClick={() => restore.mutate(cookies?.userToken)}
          >
            {match(restore.status)
              .with("pending", () => (
                <>
                  <LoaderCircle className="animate-spin" /> Change Pin
                </>
              ))
              .otherwise(() => "Change Pin")}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Restore;
