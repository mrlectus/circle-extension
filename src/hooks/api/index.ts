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

// This custom hook handles the creation of a new user.
// It utilizes React Query's useMutation hook to perform the mutation operation.
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

// This custom hook handles the creation of a new token.
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

// This custom hook handles the creation of a new wallet.
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

// This custom hook handles Get token status.
export const useGetStatus = (token: string) => {
  return useQuery({
    queryKey: ["status", token],
    queryFn: () => getStatus({ token }),
  });
};

// This custom hook handles the login functionality.
export const useLogin = () => {
  // Call the useCreateToken hook to obtain a token for the logged-in user
  const token = useCreateToken();

  // Use React Query's useMutation hook to define the mutation operation
  return useMutation({
    // Define a unique key for this mutation
    mutationKey: ["login"],
    // Define the mutation function which will be executed when the mutation is triggered
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }), // Call the login function with provided parameters
    // Define the onSuccess callback function which will be executed when the mutation is successful
    onSuccess: (data) => {
      // Trigger the token mutation to create a token for the logged-in user
      token.mutate({ userId: data.userId });
      // Store user data in the local storage for persistent session management
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", data.id);
    },
    // Define the onError callback function which will be executed when an error occurs during the mutation
    onError: (error) => {
      // Display an error toast notification with the error message
      toast.error(error.message);
    },
  });
};

// This custom hook retrieves information about a specific wallet.
export const useGetWallet = ({ walletId }: { walletId: string }) => {
  return useQuery({
    queryKey: ["wallet", walletId],
    queryFn: () => getWallet({ walletId }),
  });
};

// This custom hook retrieves a list of wallets associated with the current user.
export const useListWallet = () => {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: () =>
      listWallet({ token: localStorage.getItem("userToken") as string }),
  });
};

// This custom hook retrieves the balance of a specific wallet.
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

// This custom hook retrieves faucet information for a specific wallet and triggers refetching of wallet balance.
export const useGetFaucet = (walletId: string) => {
  const queryClient = useQueryClient(); // Retrieve the query client instance

  // Use React Query's useMutation hook to define the mutation operation
  return useMutation({
    // Define a unique key for this mutation
    mutationKey: ["faucet"],
    // Define the mutation function which will be executed when the mutation is triggered
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
    // Define the onSuccess callback function which will be executed when the mutation is successful
    onSuccess: () => {
      // Display a success toast notification
      toast.success("success...might take a bit!");
    },
    // Define the onSettled callback function which will be executed when the mutation is settled (completed or errored)
    onSettled: () => {
      // Invalidate the query for wallet balance to trigger refetching
      queryClient.invalidateQueries({
        queryKey: ["walletBalance", walletId],
      });
    },
  });
};

// This custom hook handles the transfer of tokens between wallets.
export const useTransfer = () => {
  const navigate = useNavigate(); // Access the navigate function from React Router
  const [setChallengeID] = useChallengeState((state) => [state.setChallengeId]); // Retrieve setChallengeId function from global challenge state

  // Use React Query's useMutation hook to define the mutation operation
  return useMutation({
    // Define a unique key for this mutation
    mutationKey: ["transfer"],
    // Define the mutation function which will be executed when the mutation is triggered
    mutationFn: ({
      userId,
      destinationAddress,
      amounts,
      tokenId,
      walletId,
    }: Transfer) =>
      transfer({ userId, destinationAddress, amounts, tokenId, walletId }), // Call the transfer function with provided parameters
    // Define the onSuccess callback function which will be executed when the mutation is successful
    onSuccess: (data) => {
      // Update the challenge ID state with the ID of the created challenge
      setChallengeID(data.data.challengeId);
      // Navigate to the challenge page
      navigate("/challenge");
    },
  });
};

// This custom hook retrieves a list of transactions.
export const useListTransaction = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });
};

// This custom hook handles the restoration process.
export const useCreateRestore = () => {
  const [setChallengeID] = useChallengeState((state) => [state.setChallengeId]); // Retrieve setChallengeId function from global challenge state
  const navigate = useNavigate(); // Access the navigate function from React Router

  // Use React Query's useMutation hook to define the mutation operation
  return useMutation({
    // Define a unique key for this mutation
    mutationKey: ["restore"],
    // Define the mutation function which will be executed when the mutation is triggered
    mutationFn: createRestore,
    // Define the onSuccess callback function which will be executed when the mutation is successful
    onSuccess: (data) => {
      // Update the challenge ID state with the ID of the created challenge
      setChallengeID(data.data.challengeId);
      // Navigate to the challenge page
      navigate("/challenge");
    },
    // Define the onError callback function which will be executed when an error occurs during the mutation
    onError: () => {
      // Display an error toast notification
      toast.error("cannot generate key!");
    },
  });
};

// This custom hook retrieves a list of contacts for a specific user, optionally filtered by name and tag.
export const useListContact = (userId: string) => {
  // Define state variables for name and tag filters
  const [name, setName] = React.useState<string | undefined>();
  const [tag, setTag] = React.useState<string | undefined>();

  // Define a callback function to filter contacts based on name and tag
  const filterContact = React.useCallback(
    (contact: Array<Contact>) => {
      if (!name && !tag) return contact; // If no filters are applied, return all contacts
      return contact.filter(
        (c) =>
          c.name.toLowerCase().includes(name?.toLowerCase() as string) || // Filter by name
          c.tags
            .filter((x) => x.toLowerCase() === tag?.toLowerCase()) // Filter by tag
            .includes(tag?.toLowerCase() as string)
      );
    },
    [name, tag]
  );

  // Use React Query's useQuery hook to fetch contacts and apply the filter
  return [
    useQuery({
      queryKey: ["contact", userId],
      queryFn: () => listContact({ userId }), // Call the listContact function with provided parameters
      select: filterContact, // Apply the filter to the fetched data
    }),
    setName, // Expose setName function to update name filter
    setTag, // Expose setTag function to update tag filter
  ] as const;
};

// This custom hook handles the addition of a new contact.
export const useAddContact = () => {
  const id = localStorage.getItem("id") as string; // Retrieve the user ID from local storage
  const queryClient = useQueryClient(); // Retrieve the query client instance

  // Use React Query's useMutation hook to define the mutation operation
  return useMutation({
    // Define a unique key for this mutation
    mutationKey: ["add-contact"],
    // Define the mutation function which will be executed when the mutation is triggered
    mutationFn: ({
      name,
      walletAddress,
      tags,
    }: Omit<Contact, "id" | "count" | "userId" | "tags"> & { tags: string }) =>
      addContact({
        name,
        walletAddress,
        tags,
        userId: Number(id), // Convert user ID to number and pass it to the addContact function
      }),
    // Define the onSuccess callback function which will be executed when the mutation is successful
    onSuccess: () => {
      // Invalidate the query for contacts associated with the current user to trigger refetching
      queryClient.invalidateQueries({
        queryKey: ["contact", id],
      });
    },
  });
};
