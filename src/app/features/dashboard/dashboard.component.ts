import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ExpensesChartComponent } from './components/expenses-chart/expenses-chart.component';
import { TransactionsChartComponent } from './components/transactions-chart/transactions-chart.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { TransactionDialogComponent } from '../../shared/components/transaction-dialog/transaction-dialog.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';

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
  totalBalance: number = 1250.75;

  addIncome() {
    this.openTransactionDialog(true);
  }

  addExpense() {
    this.openTransactionDialog(false);
  }

  openTransactionDialog(isIncome: boolean): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: { isIncome }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Transaction saved', result);
      }
    })
  }
}
