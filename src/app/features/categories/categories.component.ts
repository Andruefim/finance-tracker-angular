import { Component, OnInit } from '@angular/core';
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
  selector: 'app-categories',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatToolbar
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  incomeCategories: Category[] = [
    { id: 1, name: 'Salary', description: 'Monthly salary income', type: 'income' },
    { id: 2, name: 'Freelance', description: 'Income from freelancing', type: 'income' },
    { id: 3, name: 'Investments', description: 'Income from investments', type: 'income' },
  ];

  expenseCategories: Category[] = [
    { id: 1, name: 'Food', description: 'Expenses for food and dining', type:  'expense' },
    { id: 2, name: 'Transport', description: 'Expenses for transport', type:  'expense' },
    { id: 2, name: 'Rent', description: 'Expenses for rent', type:  'expense' },
    { id: 2, name: 'Shopping', description: 'Expenses for shopping', type: 'expense' },
  ];

  addCategory(isIncome: boolean): void {
    console.log(isIncome ? 'Add Income Category' : 'Add Expense Category');
    // TODO: Add a dialog to add a category
  }

  editCategory(category: Category, isIncome: boolean): void {
    console.log(
      `Edit ${isIncome ? 'Income' : 'Expense'} Category:`,
      category,
    );
    // TODO: Add a dialog to edit the category
  }

  deleteCategory(categoryId: number, isIncome: boolean): void {
    console.log(
      `Delete ${isIncome ? 'Income' : 'Expense'} Category ID:`,
      categoryId
    );
    // TODO: Perform delete logic via api
  }
}
