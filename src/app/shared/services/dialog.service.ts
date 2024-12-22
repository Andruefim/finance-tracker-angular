import { Injectable, inject, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../components/mat-dialog/mat-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  openDialog(options: {
    title: string;
    contentTemplate: TemplateRef<any>;
    isFormValid: () => boolean;
    onSubmit: () => void;
  }) {
    return this.dialog.open(MatDialogComponent, {
      data: options,
      width: '400px',
    })
  }

  closeDialog(): void {
    this.dialog.closeAll()
  }
}
