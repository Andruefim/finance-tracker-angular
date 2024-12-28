import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ExpensesChartComponent } from './components/expenses-chart/expenses-chart.component';
import { TransactionsChartComponent } from './components/transactions-chart/transactions-chart.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TransactionDialogButtonComponent } from './components/transaction-dialog-button/transaction-dialog-button.component';
import { DashboardService } from './services/dashboard.service';
import { TotalBalancePipe } from './pipes/total-balance.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    ExpensesChartComponent,
    TransactionsChartComponent,
    ChartCardComponent,
    TransactionsTableComponent,
    CurrencyPipe,
    TransactionDialogButtonComponent,
    AsyncPipe,
    TotalBalancePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly dashboardService = inject(DashboardService);
  dashboardData$ = this.dashboardService.dashboardData$;

}
