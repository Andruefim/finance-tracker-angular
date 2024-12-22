import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgTemplateOutlet,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MatDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
      this.data.onSubmit && this.data.onSubmit();
  }
}
