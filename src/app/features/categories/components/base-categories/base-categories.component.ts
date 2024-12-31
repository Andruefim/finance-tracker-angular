import { Component, computed, input, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';

interface Category {
  name: string;
  description: string;
  type: 'income' | 'expense';
  id: number;
}
@Component({
  selector: 'app-base-categories',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatToolbar
  ],
  templateUrl: './base-categories.component.html',
  styleUrl: './base-categories.component.scss'
})
export class BaseCategoriesComponent {
  type = input<Category['type']>()
  categories = input<Category[]>();
  isIncome = computed(() => this.type() === 'income');

  addCategory(): void {
    console.log(this.isIncome() ? 'Add Income Category' : 'Add Expense Category');
    // TODO: Add a dialog to add a category
  }

  editCategory(category: Category): void {
    console.log(
      `Edit ${this.isIncome() ? 'Income' : 'Expense'} Category:`,
      category,
    );
    // TODO: Add a dialog to edit the category
  }

  deleteCategory(categoryId: number): void {
    console.log(
      `Delete ${this.isIncome() ? 'Income' : 'Expense'} Category ID:`,
      categoryId
    );
    // TODO: Perform delete logic via api
  }
}
