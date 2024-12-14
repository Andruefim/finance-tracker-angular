import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';

const mock: Transaction[] = [
  { id: 2, date: '08.12.2024', category: 'Food', amount: -50 },
  { id: 1, date: '08.11.2024', category: 'Salary', amount: 3000 },
  { id: 0, date: '08.10.2024', category: 'Transport', amount: -100 },
];

@Component({
  selector: 'app-transactions-table',
  imports: [
    MatTableModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent implements OnInit {
  transactionsData: Transaction[] = mock;
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.transactionsService
      .getTransactionsTableData()
      .subscribe(transactionsTableData => this.transactionsData = transactionsTableData)
  }
}
