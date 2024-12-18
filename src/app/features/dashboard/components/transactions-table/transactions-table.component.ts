import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe, AsyncPipe } from '@angular/common';
import { Transaction } from '../../../../shared/models/transaction.model';
import { DashboardData, DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-transactions-table',
  imports: [
    MatTableModule,
    CurrencyPipe,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
})
export class TransactionsTableComponent {
  readonly dashboardService: DashboardService = inject(DashboardService)
  dashboardData$ = this.dashboardService.dashboardData$;
}
