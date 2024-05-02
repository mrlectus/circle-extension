import { match } from "ts-pattern";
import { useTokenState, useUserState } from "@/store/store";
import { Onboarding } from "./1";
import { CreateUser } from "./2";
import { Token } from "./3";
import { Wallet } from "./4";

const SignUp = () => {
  const [steps, userId] = useUserState((state) => [state.steps, state.userId]);
  const [encryptionKey] = useTokenState((state) => [state.encryptionKey]);
  console.log(steps, userId, encryptionKey);
  return (
    <>
      <main className="flex justify-center items-center w-full p-2">
        <div className="w-[440px] h-[600px] p-2 text-white font-space border border-white">
          {match(steps)
            .with(1, () => <Onboarding />)
            .with(2, () => <CreateUser />)
            .with(3, () => <Token />)
            .with(4, () => <Wallet />)
            .otherwise(() => null)}
        </div>
      </main>
    </>
  );
};

export default SignUp;
