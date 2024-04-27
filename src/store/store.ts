import { create } from "zustand";

interface UserState {
  steps: number;
  username: string;
  email: string;
  userId: string;
  increase: () => void;
  setUser: (user: { username: string; email: string; userId: string }) => void;
}

export const useUserState = create<UserState>()((set) => ({
  steps: 1,
  username: "",
  email: "",
  userId: "",
  increase: () => set((state) => ({ steps: state.steps + 1 })),
  setUser: (user) =>
    set({ username: user.username, email: user.email, userId: user.userId }),
}));

interface TokenState {
  encryptionKey: string;
  userToken: string;
  setToken: (token: { encryptionKey: string; userToken: string }) => void;
}

export const useTokenState = create<TokenState>()((set) => ({
  encryptionKey: "",
  userToken: "",
  setToken: (token) =>
    set({ encryptionKey: token.encryptionKey, userToken: token.userToken }),
}));

interface ChallengeState {
  challengeId: string;
  setChallengeId: (challengeId: string) => void;
}

export const useChallengeState = create<ChallengeState>((set) => ({
  challengeId: "",
  setChallengeId: (challengeId) => set({ challengeId }),
}));
