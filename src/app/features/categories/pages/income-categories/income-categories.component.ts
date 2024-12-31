import { Component } from '@angular/core';
import { BaseCategoriesComponent } from '../../components/base-categories/base-categories.component';
import { Category } from '../../category.model';


@Component({
  selector: 'app-income-categories',
  imports: [BaseCategoriesComponent],
  template: `<app-base-categories [type]='"income"' [categories]='categories'/>`,
})
export class IncomeCategoriesComponent {
  categories: Category[] = [
    { id: 1, name: 'Salary', description: 'Monthly salary income', type: 'income' },
    { id: 2, name: 'Freelance', description: 'Income from freelancing', type: 'income' },
    { id: 3, name: 'Investments', description: 'Income from investments', type: 'income' },
  ];

}
