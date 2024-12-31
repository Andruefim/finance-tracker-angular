import { Component } from '@angular/core';
import { BaseCategoriesComponent } from '../../components/base-categories/base-categories.component';

interface Category {
  name: string;
  description: string;
  type: 'income' | 'expense';
  id: number;
}

@Component({
  selector: 'app-expense-categories',
  imports: [BaseCategoriesComponent],
  template: `<app-base-categories [type]='"expense"' [categories]='categories'/>`,
})
export class ExpenseCategoriesComponent {
  categories: Category[] = [
    { id: 1, name: 'Food', description: 'Expenses for food and dining', type: 'expense' },
    { id: 2, name: 'Transport', description: 'Expenses for transport', type: 'expense' },
    { id: 2, name: 'Rent', description: 'Expenses for rent', type: 'expense' },
    { id: 2, name: 'Shopping', description: 'Expenses for shopping', type: 'expense' },
  ];
}
