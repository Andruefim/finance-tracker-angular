import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ExpensesChartComponent } from './components/expenses-chart/expenses-chart.component';
import { TransactionsChartComponent } from './components/transactions-chart/transactions-chart.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { TransactionDialogComponent } from '../../shared/components/transaction-dialog/transaction-dialog.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TransactionsService } from '../../shared/services/transactions.service';
import { Transaction } from '../../shared/models/transaction.model';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    ExpensesChartComponent,
    TransactionsChartComponent,
    ChartCardComponent,
    TransactionsTableComponent,
    CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);
  readonly transactionsService = inject(TransactionsService);
  readonly dashboardService = inject(DashboardService);
  totalBalance: number = 1250.75;

  addIncome() {
    this.openTransactionDialog('income');
  }

  addExpense() {
    this.openTransactionDialog('expense');
  }

  postTransaction(transaction: Transaction): void {
    this.transactionsService
      .postTransaction(transaction)
      .subscribe({
        next: (result) => {
          console.log('transactionPosted', result)
          this.dashboardService.loadDashboardData()
        },
        error: err => {
          console.error(err);
        }
      })
  }

  openTransactionDialog(type: string): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: { type }
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      if (result) {
        this.postTransaction(result)
      }
    })
  }
}
