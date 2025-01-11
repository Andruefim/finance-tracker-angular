import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Input, input, TemplateRef } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Transaction } from '../../../../shared/models/transaction.model';
import { DialogService } from '../../../../shared/services/dialog.service';
import { TransactionsService } from '../../../../shared/services/transactions.service';
import { DashboardService } from '../../services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-transaction-dialog-button',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './transaction-dialog-button.component.html',
  styleUrl: './transaction-dialog-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDialogButtonComponent {
  readonly dialogService = inject(DialogService);
  readonly dashboardService = inject(DashboardService);
  readonly transactionsService = inject(TransactionsService);
  readonly formBuilder = inject(FormBuilder);
  readonly destroyRef = inject(DestroyRef);
  title = input.required<string>();
  categories = input.required<string[]>();

  transactionFormGroup = this.formBuilder.group({
    category: ['', Validators.required],
    amount: [0, Validators.required],
    date: [new Date()],
    description: [''],
  })

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialogService.openDialog({
      title: 'Add Transaction',
      contentTemplate: template,
      isFormValid: () => this.transactionFormGroup.valid,
      onSubmit: () => {
        if (!this.transactionFormGroup.valid) return;

        this.postTransaction(this.transformSubmitValues(this.transactionFormGroup.value as unknown as Transaction));
        this.dialogService.closeDialog();
        this.transactionFormGroup.reset();
      }
    });
  }

  postTransaction(transaction: Transaction): void {
    this.transactionsService
      .postTransaction(transaction)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => this.dashboardService.refetchDashboardData(),
        error: err => console.log(err)
      })
  }

  transformSubmitValues(formValue: Transaction): Transaction {
    const submitValues = formValue;

    if (this.title() !== 'Add Income') {
      submitValues.amount = -Math.abs(submitValues.amount);
    }

    return submitValues;
  }
}
