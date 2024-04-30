import { useChallengeState, useTokenState } from "@/store/store";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Challenge = () => {
  const navigate = useNavigate();
  const [challengeId] = useChallengeState((state) => [state.challengeId]);
  const [userToken, encryptionKey, setUserToken] = useTokenState((state) => [
    state.userToken,
    state.encryptionKey,
    state.setToken,
  ]);

  React.useEffect(() => {
    setUserToken({
      userToken: localStorage.getItem("userToken") || userToken,
      encryptionKey: localStorage.getItem("encryptionKey") || encryptionKey,
    });
  }, []);

  const sdk = new W3SSdk();

  sdk.setAppSettings({
    appId: import.meta.env.VITE_PUBLIC_APP_ID,
  });

  sdk.setAuthentication({
    userToken,
    encryptionKey,
  });

  sdk.execute(challengeId, (error, result: any) => {
    if (error) {
      console.log(
        `${error?.code?.toString() || "Unknown code"}: ${
          error?.message ?? "Error!"
        }`
      );
      return;
    }
    if (result.data) {
      console.log(`signature: ${result.data?.signature}`);
    }
  });
  return (
    <>
      <main className="w-[300px] h-[500px] p-4 flex items-center justify-center">
        <p className="text-center text-xl">
          If you have just setup your pin, please{" "}
          <Link to="/signin" className="text-blue-600">
            click here
          </Link>{" "}
          to login else{" "}
          <span
            onClick={() => navigate(-1)}
            className="text-blue-600 cursor-pointer"
          >
            click here
          </span>{" "}
          to go back
        </p>
      </main>
    </>
  );
};

export default Challenge;
