export type WalletType = {
  id: string;
  state: string;
  walletSetId: string;
  custodyType: string;
  userId: string;
  address: string;
  blockchain: string;
  accountType: string;
  updateDate: string;
  createDate: string;
};

export type Wallets = {
  data: {
    wallets: Array<WalletType>;
  };
};

export type Wallet = {
  data: {
    wallets: WalletType;
  };
};

export type Token = {
  id: string;
  blockchain: string;
  name: string;
  symbol: string;
  decimals: number;
  isNative: boolean;
  updateDate: string;
  createDate: string;
};

export type Balance = {
  data: {
    tokenBalances: Array<{
      token: Token & { tokenAddress: string; standard: string };
      amount: string;
      updateDate: string;
    }>;
  };
};
