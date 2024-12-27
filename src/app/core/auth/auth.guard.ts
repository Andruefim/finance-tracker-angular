import { inject, Injectable } from "@angular/core";
import { UserService } from "./services/user.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  readonly userService = inject(UserService);
  readonly router = inject(Router);

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.currentUser$
      .pipe(
        take(1),
        map((isAuth) => !!isAuth),
        tap((isLoggedIn: boolean) => {
        console.log('guard', isLoggedIn)
        if (!isLoggedIn) {
          this.router.navigate(['/auth/login']);
        }
        }),


    );

  }

}
