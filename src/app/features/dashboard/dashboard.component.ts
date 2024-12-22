import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ExpensesChartComponent } from './components/expenses-chart/expenses-chart.component';
import { TransactionsChartComponent } from './components/transactions-chart/transactions-chart.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TransactionDialogButtonComponent } from './components/transaction-dialog-button/transaction-dialog-button.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    ExpensesChartComponent,
    TransactionsChartComponent,
    ChartCardComponent,
    TransactionsTableComponent,
    CurrencyPipe,
    TransactionDialogButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  totalBalance: number = 1250.75;

}
