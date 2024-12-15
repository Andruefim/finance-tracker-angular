import { Injectable } from '@angular/core';
import { Observable, EMPTY, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TransactionsChartData, TransactionsRaw } from '../models/transactions-chart-data.model';
import { Transaction } from '../../../shared/models/transaction.model';
import { ExpensesChartData, ExpensesRawData, ExpensesData } from '../models/expenses-chart-data.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  getTransactionsChartData(): Observable<TransactionsChartData[]> {
    return this.http
      .get<TransactionsRaw[]>('/transactionsChart')
      .pipe(map(transactions => transactions.map(transaction => new TransactionsChartData(transaction))))
      .pipe(
        catchError(this.handleError)
      )
  }

  getExpensesChartData(): Observable<ExpensesData[]> {
    return this.http
      .get<ExpensesRawData[]>('/api/expensesChart')
      .pipe(map(expenses => expenses.map(expense => new ExpensesChartData(expense).getChartData())))
      .pipe(
        catchError(this.handleError)
      )
  }

  getTransactionsTableData(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>('/api/Transactions')
      .pipe(map(transactions => transactions.map(transaction => new Transaction(transaction))))
      .pipe(
        catchError(this.handleError)
      )
  }
}
