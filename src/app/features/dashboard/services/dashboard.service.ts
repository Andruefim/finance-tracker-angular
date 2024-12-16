import { Injectable, Signal, signal } from '@angular/core';
import { Observable, EMPTY, catchError, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TransactionsChartData, TransactionsRaw } from '../models/transactions-chart-data.model';
import { Transaction } from '../../../shared/models/transaction.model';
import { ExpensesChartData, ExpensesRawData, ExpensesData } from '../models/expenses-chart-data.model';

export interface DashboardData {
  transactionsChartData?: TransactionsChartData[],
  expensesChartData?: ExpensesData[],
  transactionsTableData: Transaction[],
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  dashboardData = signal<DashboardData | null>(null);
  constructor(private http: HttpClient) {
    this.loadDashboardData();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  getTransactionsChartData(): Observable<TransactionsChartData[]> {
    return this.http
      .get<TransactionsRaw[]>('/transactionsChart')
      .pipe(
        map(transactions => transactions.map(transaction => new TransactionsChartData(transaction))),
        catchError(this.handleError)
      )
  }

  getExpensesChartData(): Observable<ExpensesData[]> {
    return this.http
      .get<ExpensesRawData[]>('/api/expensesChart')
      .pipe(
        map(expenses => expenses.map(expense => new ExpensesChartData(expense).getChartData())),
        catchError(this.handleError)
      )
  }

  getTransactionsTableData(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>('/api/Transactions')
      .pipe(
        map(transactions => transactions.map(transaction => new Transaction(transaction))),
        catchError(this.handleError)
      )
  }

  loadDashboardData(): void {
    combineLatest([
      this.getTransactionsTableData(),
    ])
      .pipe(
        map(([
          transactionsTableData
        ]) => ({
          transactionsTableData
        }))
      )
      .subscribe(result => this.dashboardData.set(result))
  }
}
