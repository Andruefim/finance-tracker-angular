import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../../../../shared/models/transaction.model';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-transactions-table',
  imports: [
    MatTableModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent implements OnInit {
  transactionsData!: Transaction[];

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dashboardService
      .getTransactionsTableData()
      .subscribe({
        next: (result) => {
          this.transactionsData = result || [];
          this.cdr.detectChanges()
        },
        error: err => {
          console.error(err);
        }
      })
  }
}
