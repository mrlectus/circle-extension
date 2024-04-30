import { create } from "zustand";

// Interface representing the state of user information
interface UserState {
  steps: number; // Number of steps completed in a process
  username: string; // Username of the user
  email: string; // Email of the user
  userId: string; // ID of the user
  increase: () => void; // Function to increment the steps
  setUser: (user: { username: string; email: string; userId: string }) => void; // Function to set user information
}

// Custom hook to manage user state
export const useUserState = create<UserState>()((set) => ({
  steps: 1, // Default number of steps
  username: "", // Default username
  email: "", // Default email
  userId: "", // Default user ID
  increase: () => set((state) => ({ steps: state.steps + 1 })), // Function to increment steps
  setUser: (
    user // Function to set user information
  ) => set({ username: user.username, email: user.email, userId: user.userId }),
}));

// Interface representing the state of token information
interface TokenState {
  encryptionKey: string; // Encryption key associated with the token
  userToken: string; // User token
  setToken: (token: { encryptionKey: string; userToken: string }) => void; // Function to set token information
}

// Custom hook to manage token state
export const useTokenState = create<TokenState>()((set) => ({
  encryptionKey: "", // Default encryption key
  userToken: "", // Default user token
  setToken: (
    token // Function to set token information
  ) => set({ encryptionKey: token.encryptionKey, userToken: token.userToken }),
}));

// Interface representing the state of challenge information
interface ChallengeState {
  challengeId: string; // ID of the challenge
  setChallengeId: (challengeId: string) => void; // Function to set the challenge ID
}

// Custom hook to manage challenge state
export const useChallengeState = create<ChallengeState>((set) => ({
  challengeId: "", // Default challenge ID
  setChallengeId: (challengeId) => set({ challengeId }), // Function to set the challenge ID
}));
