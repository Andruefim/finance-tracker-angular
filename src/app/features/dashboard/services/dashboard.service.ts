import { Injectable, Signal, signal, DestroyRef, inject } from '@angular/core';
import { Observable, EMPTY, catchError, combineLatest, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TransactionsChartData, TransactionsRaw } from '../models/transactions-chart-data.model';
import { Transaction } from '../../../shared/models/transaction.model';
import { ExpensesChartData, ExpensesRawData, ExpensesData } from '../models/expenses-chart-data.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface DashboardData {
  transactionsChartData?: TransactionsChartData[],
  expensesChartData?: ExpensesData[],
  transactionsTableData: Transaction[],
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  readonly http = inject(HttpClient);
  readonly destroyRef = inject(DestroyRef);
  dashboardData = signal<DashboardData | null>(null);
  constructor() {
    this.loadDashboardData();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  private transactionsChartData: Observable<TransactionsChartData[]> = this.http
      .get<TransactionsRaw[]>('/transactionsChart')
      .pipe(
        map(transactions => transactions.map(transaction => new TransactionsChartData(transaction))),
        catchError(this.handleError)
      )
  

  private expensesChartData: Observable<ExpensesData[]> = this.http
    .get<ExpensesRawData[]>('/api/expensesChart')
    .pipe(
      map(expenses => expenses.map(expense => new ExpensesChartData(expense).getChartData())),
      catchError(this.handleError)
    )

  private transactionsTableData: Observable<Transaction[]> = this.http
    .get<Transaction[]>('/api/Transactions')
    .pipe(
      map(transactions => transactions.map(transaction => new Transaction(transaction))),
      catchError(this.handleError)
    )

  loadDashboardData(): void {
    forkJoin({
      transactionsTableData: this.transactionsTableData,
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => this.dashboardData.set(result))
  }
}
