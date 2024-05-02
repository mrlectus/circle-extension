import {
  Challenge,
  Notify,
  Transaction,
} from "@/services/api/websocket/schema";
import React from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { match } from "ts-pattern";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";

type T = z.infer<typeof Transaction>;
type C = z.infer<typeof Challenge>;
const NotificationHook = () => {
  const queryClient = useQueryClient();
  const socketUrl = `${import.meta.env.VITE_PUBLIC_WSS}/webhook`;
  const { lastMessage } = useWebSocket(socketUrl, {
    share: true,
  });
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);
      const notify = Notify.safeParse(data);
      console.log(notify.error);
      console.log(notify.data);
      if (notify.success) {
        const notification = notify.data.notification;
        if (notification) {
          match(data.notificationType)
            .with("transactions.outbound", () =>
              match((notification as T).userId)
                .with(userId, () =>
                  match((notification as T).state)
                    .with("INITIATED", () => {
                      toast(
                        `transaction of ${
                          (notification as T).amounts[0]
                        } USD has been initiated`
                      );
                    })
                    .with("QUEUED", () => {
                      toast(`Your transaction has been queued`);
                      navigate("/");
                    })
                    .with("SENT", () =>
                      toast(`${(notification as T).amounts[0]} USD sent`)
                    )
                    .with("CONFIRMED", () =>
                      toast(`Your transaction has been confirmed`)
                    )
                    .with("COMPLETED", () =>
                      toast(`Your transaction has been completed`)
                    )
                    .with("FAILED", () =>
                      toast.error(
                        `Your transaction failed! ${
                          (notification as T).errorDetails
                        }`
                      )
                    )
                    .otherwise(() =>
                      console.log("state: ", (notification as T).state)
                    )
                )
                .otherwise(() => null)
            )
            .with("challenges.initialize", () =>
              match((notification as C).userId).with(userId, () =>
                match((notification as C).type).with("INITIALIZE", () =>
                  match((notification as C).status).with("COMPLETE", () => {
                    toast.success("Pin has been set");
                    queryClient.invalidateQueries({
                      queryKey: ["wallets"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["walletBalance", userId],
                    });
                    navigate("/signin");
                  })
                )
              )
            )
            .otherwise(() => null);
        }
      }
    }
  }, [lastMessage]);
  return <Outlet />;
};

export default NotificationHook;
