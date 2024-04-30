export type Contact = {
  id: number;
  userId: number;
  name: string;
  walletAddress: string;
  count: number;
  tags: Array<string>;
};
export type Contacts = Array<Contact>;
