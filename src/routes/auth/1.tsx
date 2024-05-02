import { Button } from "@/components/ui/button";
import { useUserState } from "@/store/store";

export const Onboarding = () => {
  const [increase] = useUserState((state) => [state.increase]);
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full">
      <img
        src={
          "https://pbs.twimg.com/profile_images/1719446730091962368/Bl01sQsB_400x400.png"
        }
        width={200}
        height={200}
      />
      <Button
        onClick={increase}
        className="border-2 text-white rounded-lg bg-black hover:bg-black/70 border-white drop-shadow-lg"
        variant={"outline"}
      >
        Start building your wallet
      </Button>
    </div>
  );
};
