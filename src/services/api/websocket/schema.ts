import { z } from "zod";

// Define the Challenge schema
export const Challenge = z.object({
  id: z.string(),
  type: z.enum(["INITIALIZE"]).or(z.undefined()),
  status: z.enum(["COMPLETE"]).or(z.undefined()),
  correlationIds: z.array(z.string()).or(z.undefined()),
  userId: z.string().or(z.undefined()),
});

// Define the Transaction schema
export const Transaction = z.object({
  amounts: z.array(z.string()),
  blockchain: z.string(),
  createDate: z.string(),
  destinationAddress: z.string(),
  blockHash: z.string().or(z.undefined()),
  blockHeight: z.number().or(z.undefined()),
  errorReason: z.string(),
  errorDetails: z.string().nullable(),
  firstConfirmDate: z.string().or(z.undefined()),
  networkFee: z.string().or(z.undefined()),
  nftTokenIds: z.array(z.any()),
  operation: z.string().or(z.undefined()),
  txHash: z.string().or(z.undefined()),
  updateDate: z.string(),
  userId: z.string(),
  id: z.string(),
  tokenId: z.string(),
  walletId: z.string(),
  refId: z.string(),
  sourceAddress: z.string().or(z.undefined()),
  transactionType: z.enum(["INBOUND", "OUTBOUND"]),
  custodyType: z.any().or(z.undefined()),
  state: z.enum([
    "INITIATED",
    "QUEUED",
    "SENT",
    "CONFIRMED",
    "COMPLETED",
    "CANCELED",
    "FAILED",
  ]),
});

// Define the Notify schema
export const Notify = z.object({
  subscriptionId: z.string(),
  notificationId: z.string(),
  notificationType: z.string(),
  notification: Transaction.or(Challenge),
  timestamp: z.string(),
  version: z.number(),
});
