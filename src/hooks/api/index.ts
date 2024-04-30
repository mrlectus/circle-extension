import {
  createRestore,
  createToken,
  createUser,
  createWallet,
  getStatus,
  login,
} from "@/services/api/users";
import toast from "react-hot-toast";
import { useChallengeState, useTokenState, useUserState } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getWallet,
  getWalletBalance,
  listWallet,
} from "@/services/api/wallets";
import { getFaucets } from "@/services/api/faucets";
import { getTransactions, transfer } from "@/services/api/transactions";
import { Transfer } from "@/services/api/transactions/schema";
import { addContact, listContact } from "@/services/api/contact";
import { Contact } from "@/services/api/contact/schema";
import React from "react";

export const useCreateUser = () => {
  const [increase, setUser] = useUserState((state) => [
    state.increase,
    state.setUser,
  ]);
  return useMutation({
    mutationKey: ["user"],
    mutationFn: ({ username, email, password }: Omit<User, "id" | "userId">) =>
      createUser({ username, email, password }),
    onSuccess: (data) => {
      setUser(data);
      increase();
    },
  });
};

export const useCreateToken = () => {
  const [setToken] = useTokenState((state) => [state.setToken]);
  const [increase] = useUserState((state) => [state.increase]);
  return useMutation({
    mutationKey: ["token"],
    mutationFn: ({ userId }: { userId: string }) => createToken({ userId }),
    onSuccess: (data) => {
      setToken({
        encryptionKey: data.data.encryptionKey,
        userToken: data.data.userToken,
      });
      localStorage.setItem("userToken", data.data.userToken);
      localStorage.setItem("encryptionKey", data.data.encryptionKey);
      increase();
    },
    onError: () => {
      toast.error("Error creating token");
    },
  });
};

export const useCreateWallet = () => {
  const [token] = useTokenState((state) => [state.userToken]);
  const [setChallengeID] = useChallengeState((state) => [state.setChallengeId]);
  const [userId] = useUserState((state) => [state.userId]);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["wallet"],
    mutationFn: ({ blockchains }: { blockchains: string }) =>
      createWallet({ blockchains, token, userId }),
    onSuccess: (data) => {
      setChallengeID(data.data.challengeId);
      toast.success("Wallet created successfully");
      navigate("/challenge");
    },
    onError: (error) => {
      console.log("->", error);
      toast.error("Error creating wallet");
    },
  });
};

export const useGetStatus = (token: string) => {
  return useQuery({
    queryKey: ["status", token],
    queryFn: () => getStatus({ token }),
  });
};

export const useLogin = () => {
  const token = useCreateToken();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: (data) => {
      token.mutate({ userId: data.userId });
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", data.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetWallet = ({ walletId }: { walletId: string }) => {
  return useQuery({
    queryKey: ["wallet", walletId],
    queryFn: () => getWallet({ walletId }),
  });
};

export const useListWallet = () => {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: () =>
      listWallet({ token: localStorage.getItem("userToken") as string }),
  });
};

export const useGetWalletBalance = (walletId: string) => {
  return useQuery({
    queryKey: ["walletBalance", walletId],
    queryFn: () =>
      getWalletBalance({
        token: localStorage.getItem("userToken") as string,
        walletId,
      }),
    enabled: !!walletId,
    retry: 5,
    refetchInterval: 12000,
  });
};

export const useGetFaucet = (walletId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["faucet"],
    mutationFn: ({
      blockchain,
      address,
      native,
      usdc,
    }: {
      blockchain: string;
      address: string;
      native?: boolean;
      usdc?: boolean;
    }) => getFaucets({ blockchain, address, native, usdc }),
    onSuccess: () => {
      toast.success("success...might take a bit!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["walletBalance", walletId],
      });
    },
  });
};

export const useTransfer = () => {
  const navigate = useNavigate();
  const [setChallengeID] = useChallengeState((state) => [state.setChallengeId]);
  return useMutation({
    mutationKey: ["transfer"],
    mutationFn: ({
      userId,
      destinationAddress,
      amounts,
      tokenId,
      walletId,
    }: Transfer) =>
      transfer({ userId, destinationAddress, amounts, tokenId, walletId }),
    onSuccess: (data) => {
      setChallengeID(data.data.challengeId);
      navigate("/challenge");
    },
  });
};

export const useListTransaction = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });
};

export const useCreateRestore = () => {
  const [setChallengeID] = useChallengeState((state) => [state.setChallengeId]);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["restore"],
    mutationFn: createRestore,
    onSuccess: (data) => {
      setChallengeID(data.data.challengeId);
      navigate("/challenge");
    },
    onError: () => {
      toast.error("cannot generate key!");
    },
  });
};

export const useListContact = (userId: string) => {
  const [name, setName] = React.useState<string | undefined>();
  const [tag, setTag] = React.useState<string | undefined>();

  const filterContact = React.useCallback(
    (contact: Array<Contact>) => {
      if (!name && !tag) return contact;
      return contact.filter(
        (c) =>
          c.name.toLowerCase().includes(name?.toLowerCase() as string) ||
          c.tags
            .filter((x) => x.toLowerCase() === tag?.toLowerCase())
            .includes(tag?.toLowerCase() as string)
      );
    },
    [name, tag]
  );

  return [
    useQuery({
      queryKey: ["contact", userId],
      queryFn: () => listContact({ userId }),
      select: filterContact,
    }),
    setName,
    setTag,
  ] as const;
};

export const useAddContact = () => {
  const id = localStorage.getItem("id") as string;
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-contact"],
    mutationFn: ({
      name,
      walletAddress,
      tags,
    }: Omit<Contact, "id" | "count" | "userId" | "tags"> & { tags: string }) =>
      addContact({
        name,
        walletAddress,
        tags,
        userId: Number(id),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contact", id],
      });
    },
  });
};
