interface TransactionsRawData {
  date: string;
  amount: number;
}

export interface TransactionsRaw {
  type: 'Income' | 'Expenses';
  data: TransactionsRawData[]
}

export class TransactionsChartData {
  type: TransactionsRaw['type'];
  data: [number, number][];
  constructor(transactionsRawData: TransactionsRaw) {
    this.type = transactionsRawData.type;
    this.data = transactionsRawData.data
      .map(transaction => [new Date(transaction.date).getTime() ?? null, transaction.amount])
  }
}
