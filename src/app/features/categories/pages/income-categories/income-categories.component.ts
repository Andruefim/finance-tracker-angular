import { Component, inject } from '@angular/core';
import { BaseCategoriesComponent } from '../../components/base-categories/base-categories.component';
import { Category } from '../../category.model';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-income-categories',
  imports: [BaseCategoriesComponent],
  template: `<app-base-categories [type]='"income"' [categories]='categories'/>`,
})
export class IncomeCategoriesComponent {
  readonly categoriesService = inject(CategoriesService);

  categories: Category[] = [
    { id: 1, name: 'Salary', description: 'Monthly salary income', type: 'income' },
    { id: 2, name: 'Freelance', description: 'Income from freelancing', type: 'income' },
    { id: 3, name: 'Investments', description: 'Income from investments', type: 'income' },
  ];

  categoriesData$ = this.categoriesService.categoriesData$;
}
