import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../../../shared/models/transaction.model';

@Pipe({
  name: 'totalBalance'
})

export class TotalBalancePipe implements PipeTransform {
  transform(transactions?: Transaction[]): number {
    console.log('pipe', transactions)
    if (!transactions?.length) return 0;

    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }
}
