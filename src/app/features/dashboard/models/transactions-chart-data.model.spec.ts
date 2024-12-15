import { TransactionsChartData, TransactionsRaw } from './transactions-chart-data.model';

describe('TransactionsChart', () => {
  it('should create an instance', () => {
    expect(new TransactionsChartData({} as TransactionsRaw)).toBeTruthy();
  });
});
