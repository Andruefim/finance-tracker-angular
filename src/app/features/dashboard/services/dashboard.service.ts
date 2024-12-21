import { Injectable, Signal, signal, DestroyRef, inject } from '@angular/core';
import { Observable, EMPTY, catchError, combineLatest, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  readonly http = inject(HttpClient);
  private dashboardDataSubject = new BehaviorSubject(null);
  dashboardDataAction$ = this.dashboardDataSubject.asObservable();

  public refetchDashboardData() {
    this.dashboardDataSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }
  
  private transactionsChartData$ = this.dashboardDataAction$.pipe(
    switchMap((_) =>
      this.http
        .get<TransactionsRaw[]>('/api/transactions/charts/transactions-chart')
        .pipe(
          map(transactions => transactions.map(transaction => new TransactionsChartData(transaction))),
          catchError(this.handleError)
        )
    )
  )

  private expensesChartData$ = this.dashboardDataAction$.pipe(
    switchMap((_) =>
      this.http
        .get<ExpensesRawData[]>('api/transactions/charts/expenses-chart')
        .pipe(
          map(expenses => expenses.map(expense => new ExpensesChartData(expense).getChartData())),
          catchError(this.handleError)
        )
    )
  )

  private transactionsTableData$ = this.dashboardDataAction$.pipe(
    switchMap((_) =>
      this.http.get<Transaction[]>('/api/transactions').pipe(
        map(transactions => transactions.reverse().map(transaction => new Transaction(transaction))),
        catchError(this.handleError)
      )
    )
  )

  dashboardData$: Observable<DashboardData> = combineLatest({
    transactionsChartData: this.transactionsChartData$,
    expensesChartData: this.expensesChartData$,
    transactionsTableData: this.transactionsTableData$,
  })
}
