import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  getUser(): Observable<User> {
    return this.http
      .get<User>('/user')
      .pipe(
        catchError(this.handleError)
      )
  }
}
