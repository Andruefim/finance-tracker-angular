import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TransactionsChartData, TransactionsRaw } from '../models/transactions-chart-data.model';
import { Transaction } from '../../../shared/models/transaction.model';
import { ExpensesChartData, ExpensesRawData, ExpensesData } from '../models/expenses-chart-data.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private http: HttpClient) {}

  getTransactionsChartData(): Observable<TransactionsChartData[]> {
    return this.http
      .get<TransactionsRaw[]>('/transactionsChart')
      .pipe(map(transactions => transactions.map(transaction => new TransactionsChartData(transaction))))
  }

  getExpensesChartData(): Observable<ExpensesData[]> {
    return this.http
      .get<ExpensesRawData[]>('/expensesChart')
      .pipe(map(expenses => expenses.map(expense => new ExpensesChartData(expense).getChartData())))
  }

  getTransactionsTableData(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>('/transactionsTable')
      .pipe(map(transactions => transactions.map(transaction => new Transaction(transaction))))
  }
}
