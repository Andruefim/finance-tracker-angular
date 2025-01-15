import { Component, inject } from '@angular/core';
import { BaseCategoriesComponent } from '../../components/base-categories/base-categories.component';
import { Category } from '../../category.model';
import { CategoriesService } from '../../services/categories.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';


@Component({
  selector: 'app-expense-categories',
  imports: [
    BaseCategoriesComponent,
    AsyncPipe
  ],
  template: `<app-base-categories [type]='"Expenses"' [categories]='(categoriesData$ | async) ?? []'/>`,
})
export class ExpenseCategoriesComponent {
  readonly categoriesService = inject(CategoriesService);

  categoriesData$ = this.categoriesService.categoriesData$
    .pipe(
      map(categoriesData => categoriesData.find(d => d.type === 'Expenses')?.data)
    )
}
