import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, TemplateRef } from '@angular/core';
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
  selector: 'app-edit-category-dialog-button',
  imports: [
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './edit-category-dialog-button.component.html',
  styleUrl: './edit-category-dialog-button.component.scss'
})
export class EditCategoryDialogButtonComponent {
  readonly dialogService = inject(DialogService);
  readonly categoriesService = inject(CategoriesService);
  readonly formBuilder = inject(FormBuilder);
  readonly destroyRef = inject(DestroyRef);
  category = input.required<Category>();

  categoryFormGroup = this.formBuilder.group({
    name: [this.category().name, Validators.required],
    description: [this.category().description],
  })

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialogService.openDialog({
      title: 'Edit category',
      contentTemplate: template,
      isFormValid: () => this.categoryFormGroup.valid,
      onSubmit: () => {
        if (!this.categoryFormGroup.valid) return;

        this.editCategory(this.categoryFormGroup.value as unknown as Category)
      }
    })
  }

  editCategory(category: Category): void {
    this.categoriesService
      .editCategory(category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => this.categoriesService.refetchCategoriesData(),
        error: err => console.log(err)
      })
  }
}
