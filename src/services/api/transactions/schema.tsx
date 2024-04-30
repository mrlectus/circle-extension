export type Transfer = {
  userId: string;
  destinationAddress: string;
  amounts: string;
  tokenId: string;
  walletId: string;
};

export type TStatus =
  | "INITIATED"
  | "PENDING_RISK_SCREENING"
  | "DENIED"
  | "QUEUED"
  | "SENT"
  | "CONFIRMED"
  | "COMPLETE"
  | "FAILED"
  | "CANCELLED";

export type T = {
  id: string;
  blockchain: string;
  tokenId: string;
  walletId: string;
  sourceAddress: string;
  destinationAddress: string;
  transactionType: string;
  custodyType: string;
  state: TStatus;
  amounts: string[];
  nfts: null | string;
  txHash: string;
  blockHash: string;
  blockHeight: number;
  networkFee: string;
  firstConfirmDate: string;
  operation: string;
  userId: string;
  abiParameters: null | string;
  createDate: string;
  updateDate: string;
};

export type Transaction = {
  data: {
    transactions: Array<T>;
  };
};
