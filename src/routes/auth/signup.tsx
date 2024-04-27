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
      <main className="w-[300px] p-4 flex flex-col justify-center items-center">
        {match(steps)
          .with(1, () => <Onboarding />)
          .with(2, () => <CreateUser />)
          .with(3, () => <Token />)
          .with(4, () => <Wallet />)
          .otherwise(() => null)}
      </main>
    </>
  );
};

export default SignUp;
