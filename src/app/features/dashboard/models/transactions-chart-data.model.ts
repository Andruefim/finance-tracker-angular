interface TransactionsRawData {
  date: string;
  amount: number;
}

export interface TransactionsRaw {
  type: 'Income' | 'Expenses';
  data: TransactionsRawData[]
}

export type ChartData = [string, number]

export class TransactionsChartData {
  constructor(public type: TransactionsRaw['type'], public data: ChartData[]) {}

  static toMonthlyChartData(transactionsRawData: TransactionsRaw) {
    const months = new Set();
    let chartData: ChartData[] = [];

    transactionsRawData.data
      .forEach(t => months.add(this.getMonthName(t.date)));

    months.forEach(month => {
      chartData.push([
        month as string,
        transactionsRawData.data
          .filter(t => this.getMonthName(t.date) === month)
          .reduce((acc, curr) => acc + curr.amount, 0)
      ])
    })

    return new TransactionsChartData(
      transactionsRawData.type,
      chartData
    )
  }

  static getMonthName(date: string) {
    return new Date(date).toLocaleString('default', { month: 'long' });
  }
}
