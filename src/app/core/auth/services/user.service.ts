import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, combineLatest, distinctUntilChanged, map, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { User } from '../user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly jwtService = inject(JwtService);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUserAction$ = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  //public isAuthenticated = !!this.jwtService.token;
  public isAuthenticated = this.currentUserAction$.pipe(map((user) => !!user));


  currentUser$ = this.currentUserAction$.pipe(
    switchMap((user) => {
      if (user) {
        return EMPTY;
      }
      return this.http
        .get<User>('/api/Authenticate/user').pipe(
          tap({
            next: user => this.setAuth(user),
            error: () => this.purgeAuth(),
          }),
          shareReplay(1),
        )
    }
    )
  );


  login(credentials: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>("/api/Authenticate/login", credentials)
      .pipe(tap((user) => this.setAuth(user)));
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>("/api/Authenticate/register", credentials)
  }

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user)
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/auth/login"])
  }
}
