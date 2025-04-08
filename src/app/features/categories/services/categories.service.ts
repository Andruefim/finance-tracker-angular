import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoriesData, Category } from '../category.model';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly http = inject(HttpClient);
  private categoriesDataSubject = new BehaviorSubject(null);
  categoriesDataAction$ = this.categoriesDataSubject.asObservable();

  public refetchCategoriesData() {
     this.categoriesDataSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  categoriesData$ = this.categoriesDataAction$.pipe(
    switchMap((_) =>
      this.http
        .get<CategoriesData[]>(`${environment.apiUrl}/api/categories`)
        .pipe(
          catchError(this.handleError)
        )
    )
  )

  postCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>(`${environment.apiUrl}/api/categories`, category)
      .pipe(
        catchError(this.handleError)
      )
  }

  editCategory(category: Category): Observable<Category> {
    return this.http
      .put<Category>(`${environment.apiUrl}/api/categories/${category.id}`, category)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteCategory(categoryId: Category['id']): Observable<Category> {
    return this.http
      .delete<Category>(`${environment.apiUrl}/api/categories/${categoryId}`)
      .pipe(
        catchError(this.handleError)
      )
  }
}
