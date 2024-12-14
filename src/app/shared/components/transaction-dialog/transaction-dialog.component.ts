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

interface DialogData {
  isIncome: boolean;
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

  isIncome = this.data.isIncome;
  categories = this.isIncome
    ? ['Salary', 'Freelance', 'Investments']
    : ['Food', 'Transport', 'Rent', 'Shopping'];

  transactionForm = this.formBuilder.group({
    category: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    date: [new Date(), Validators.required],
    description: [''],
  })

  onCancel(): void {
      this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
        this.dialogRef.close(this.transactionForm.value)
    }
  }
}
