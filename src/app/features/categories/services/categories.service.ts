import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../category.model';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly http = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  postCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>('/api/categories', category)
      .pipe(
        catchError(this.handleError)
      )
  }

  editCategory(category: Category): Observable<Category> {
    return this.http
      .put<Category>(`/api/categories/${category.id}`, category)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteCategory(categoryId: Category): Observable<Category> {
    return this.http
      .delete<Category>(`/api/categories/${categoryId}`)
      .pipe(
        catchError(this.handleError)
      )
  }
}
