import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  }) 
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);

    return EMPTY;
  }

  postTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>('/api/Transactions', transaction, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
