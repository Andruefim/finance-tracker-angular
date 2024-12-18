

export class Transaction {
  id?: number;
  date: string;
  category: string;
  amount: number;
  description?: string;

  constructor(transactionData: Transaction) {
    this.id = transactionData.id;
    this.date = transactionData.date;
    this.category = transactionData.category;
    this.amount = transactionData.amount;
    this.description = transactionData.description;
  }
}
