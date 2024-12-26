import { inject, Injectable } from "@angular/core";
import { UserService } from "./services/user.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  readonly userService = inject(UserService);
  readonly router = inject(Router);

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated
      .pipe(tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/auth/login']);
        }
      }));
    //!this.userService.isAuthenticated && this.router.navigate(['/auth/login']);

     //return this.userService.isAuthenticated
 
  }

}
