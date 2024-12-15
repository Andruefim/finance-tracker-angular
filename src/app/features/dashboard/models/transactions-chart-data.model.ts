export interface TransactionsRaw {
  type: string;
  data: {
    date: string;
    amount: number;
  }[]
}

export class TransactionsChartData {
  type: string;
  data: [number, number][];
  constructor(transactionsRawData: TransactionsRaw) {
    this.type = transactionsRawData.type;
    this.data = transactionsRawData.data
      .map(transaction => [new Date(transaction.date).getTime() ?? null, transaction.amount])
  }
}
