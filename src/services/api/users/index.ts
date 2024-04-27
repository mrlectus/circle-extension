import { BASE_URL } from "@/lib/config";

export const createUser = async ({
  username,
  email,
  password,
}: Omit<User, "id" | "userId">) => {
  const payload = { username, email, password };
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const user = await response.json();
  return user as UserResponse;
};

export const createToken = async ({ userId }: { userId: string }) => {
  const response = await fetch(`${BASE_URL}/users/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const token = await response.json();
  return token as TokenData;
};

export const createWallet = async ({
  token,
  blockchains,
  userId,
}: {
  token: string;
  blockchains: string;
  userId: string;
}) => {
  const response = await fetch(`${BASE_URL}/users/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, blockchains, userId }),
  });
  const wallet = await response.json();
  return wallet as ChallengeType;
};

export const getStatus = async ({ token }: { token: string }) => {
  const response = await fetch(`${BASE_URL}/users/status?token=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const status = await response.json();
  return status as Status;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const user = await response.json();
    return user as User;
  } catch (error) {
    throw error;
  }
};
