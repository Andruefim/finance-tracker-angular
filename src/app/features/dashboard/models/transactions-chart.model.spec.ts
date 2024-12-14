import { TransactionsChart, TransactionsRaw } from './transactions-chart.model';

describe('TransactionsChart', () => {
  it('should create an instance', () => {
    expect(new TransactionsChart({} as TransactionsRaw)).toBeTruthy();
  });
});
