import { Component, computed, DestroyRef, inject, input, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { Category } from '../../category.model';
import { AddCategoryDialogButtonComponent } from '../add-category-dialog-button/add-category-dialog-button.component';
import { CategoriesService } from '../../services/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditCategoryDialogButtonComponent } from '../edit-category-dialog-button/edit-category-dialog-button.component';

@Component({
  selector: 'app-base-categories',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatToolbar,
    AddCategoryDialogButtonComponent,
    EditCategoryDialogButtonComponent
  ],
  templateUrl: './base-categories.component.html',
  styleUrl: './base-categories.component.scss'
})
export class BaseCategoriesComponent {
  readonly categoriesService = inject(CategoriesService);
  readonly destroyRef = inject(DestroyRef);
  type = input.required<Category['type']>()
  categories = input<Category[]>();
  isIncome = computed(() => this.type() === 'Income');

  deleteCategory(categoryId?: number): void {
    if (!categoryId) return;

    this.categoriesService
      .deleteCategory(categoryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => this.categoriesService.refetchCategoriesData(),
        error: err => console.log(err)
      })
  }
}
