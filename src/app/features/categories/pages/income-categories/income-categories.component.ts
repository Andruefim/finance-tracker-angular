import { Component, inject } from '@angular/core';
import { BaseCategoriesComponent } from '../../components/base-categories/base-categories.component';
import { Category } from '../../category.model';
import { CategoriesService } from '../../services/categories.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';


@Component({
  selector: 'app-income-categories',
  imports: [
    BaseCategoriesComponent,
    AsyncPipe
  ],
  template: `<app-base-categories [type]='"Income"' [categories]='(categoriesData$ | async) ?? []'/>`,
})
export class IncomeCategoriesComponent {
  readonly categoriesService = inject(CategoriesService);

  categoriesData$ = this.categoriesService.categoriesData$
    .pipe(
      map(categoriesData => categoriesData.find(d => d.type === 'Income')?.data)
    )
}
