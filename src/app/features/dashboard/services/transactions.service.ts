import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionsChart, TransactionsRaw } from '../models/transactions-chart.model';
import { HttpClient } from '@angular/common/http';
import { Transaction, TransactionRaw } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactionsChartData(): Observable<TransactionsChart[]> {
    return this.http
      .get<TransactionsRaw[]>('/transactionsChart')
      .pipe(map(transactions => transactions.map(transaction => new TransactionsChart(transaction))))
  }

  getTransactionsTableData(): Observable<Transaction[]> {
    return this.http
      .get<TransactionRaw[]>('/transactionsTable')
      .pipe(map(transactions => transactions.map(transaction => new Transaction(transaction))))
  }
}
