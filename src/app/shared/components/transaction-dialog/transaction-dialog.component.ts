import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Transaction } from '../../models/transaction.model';

interface DialogData {
  type: 'income' | 'expense';
}

const DIALOG_OPTIONS = {
  'income': {
    categories: ['Salary', 'Freelance', 'Investments'],
    title: 'Add Income'
  },
  'expense': {
    categories: ['Food', 'Transport', 'Rent', 'Shopping'],
    title: 'Add Expense'
  }
}

@Component({
  selector: 'app-transaction-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDialogComponent {
  private formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<TransactionDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  categories = DIALOG_OPTIONS[this.data.type].categories;
  title = DIALOG_OPTIONS[this.data.type].title;

  transactionForm = this.formBuilder.group({
    category: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date()],
    description: [''],
  })

  onCancel(): void {
      this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transformSubmitValues(this.transactionForm.value as unknown as Transaction))
    }
  }

  transformSubmitValues(formValue: Transaction): Transaction {
    const submitValues = formValue;

    if (this.data.type !== 'income') {
      submitValues.amount = -Math.abs(submitValues.amount);
    }

    return submitValues;
  }
}
