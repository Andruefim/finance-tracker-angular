export interface ExpensesRawData {
  category: string;
  amount: number;
}

export type ExpensesData = [string, number];

export class ExpensesChartData implements ExpensesRawData {
  category
  amount
  constructor(expensesRawData: ExpensesRawData) {
    this.category = expensesRawData.category
    this.amount = expensesRawData.amount
  }

  getChartData(): ExpensesData {
    return [this.category, this.amount]
  } 
}
