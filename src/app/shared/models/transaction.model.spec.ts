import { Transaction } from './transaction.model';

describe('Transactions', () => {
  it('should create an instance', () => {
    expect(new Transaction({} as Transaction)).toBeTruthy();
  });
});
