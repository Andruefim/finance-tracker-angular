import { ChangeDetectionStrategy, Component, DestroyRef, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from '../../../../shared/services/dialog.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../category.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-category-dialog-button',
  imports: [
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './add-category-dialog-button.component.html',
  styleUrl: './add-category-dialog-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryDialogButtonComponent {
  readonly dialogService = inject(DialogService);
  readonly categoriesService = inject(CategoriesService);
  readonly formBuilder = inject(FormBuilder);
  readonly destroyRef = inject(DestroyRef);

  categoryFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
  })

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialogService.openDialog({
      title: 'Add category',
      contentTemplate: template,
      isFormValid: () => this.categoryFormGroup.valid,
      onSubmit: () => {
        if (!this.categoryFormGroup.valid) return;

        this.postCategory(this.categoryFormGroup.value as unknown as Category)
      }
    })
  }

  postCategory(category: Category): void {
    this.categoriesService
      .postCategory(category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => this.categoriesService.refetchCategoriesData(),
        error: err => console.log(err)
      })
  }
}
