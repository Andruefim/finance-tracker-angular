export interface TransactionRaw {
  id?: number;
  date: string;
  category: string;
  amount: number;
}

export class Transaction {
  id?: number;
  date: string;
  category: string;
  amount: number;

  constructor(transactionRaw: TransactionRaw) {
    this.id = transactionRaw.id;
    this.date = transactionRaw.date;
    this.category = transactionRaw.category;
    this.amount = transactionRaw.amount;
  }
}
