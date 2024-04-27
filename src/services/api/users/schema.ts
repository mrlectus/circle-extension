type User = { username: string; email: string; password: string } & {
  userId: string;
  id: string;
};

type UserResponse = {
  username: string;
  email: string;
  userId: string;
  id: number;
};

type Token = {
  encryptionKey: string;
  userToken: string;
};

type TokenData = {
  data: Token;
};

type ChallengeType = {
  data: {
    challengeId: string;
  };
};

type Status = {
  data: {
    id: string;
    status: string;
    createDate: string;
    pinStatus: string;
    pinDetails: {
      failedAttempts: number;
    };
    securityQuestionStatus: string;
    securityQuestionDetails: {
      failedAttempts: number;
    };
    authMode: string;
  };
};
