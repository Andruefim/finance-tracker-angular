import { Component, inject } from '@angular/core';
import { BaseCategoriesComponent } from '../../components/base-categories/base-categories.component';
import { Category } from '../../category.model';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-expense-categories',
  imports: [BaseCategoriesComponent],
  template: `<app-base-categories [type]='"expense"' [categories]='categories'/>`,
})
export class ExpenseCategoriesComponent {
  readonly categoriesService = inject(CategoriesService);

  categories: Category[] = [
    { id: 1, name: 'Food', description: 'Expenses for food and dining', type: 'expense' },
    { id: 2, name: 'Transport', description: 'Expenses for transport', type: 'expense' },
    { id: 3, name: 'Rent', description: 'Expenses for rent', type: 'expense' },
    { id: 4, name: 'Shopping', description: 'Expenses for shopping', type: 'expense' },
  ];

  categoriesData$ = this.categoriesService.categoriesData$;
}
