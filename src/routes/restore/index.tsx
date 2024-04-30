import { Button } from "@/components/ui/button";
import { useCreateRestore } from "@/hooks/api";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";

const Restore = () => {
  const navigate = useNavigate();
  const restore = useCreateRestore();
  return (
    <main className="w-[300px] h-[400px] p-2 text-white font-space">
      <div className="flex gap-2 items-center">
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="w-10 h-10 cursor-pointer"
        />
        <p className="font-bold text-xl">Change Wallet Pin</p>
      </div>
      <div className="flex justify-between items-center p-4 w-full">
        <Button variant={"secondary"} onClick={() => restore.mutate()}>
          {match(restore.status)
            .with("pending", () => (
              <>
                <LoaderCircle className="animate-spin" /> Change Pin
              </>
            ))
            .otherwise(() => "Change Pin")}
        </Button>
      </div>
    </main>
  );
};

export default Restore;
