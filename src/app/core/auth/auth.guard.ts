import { inject, Injectable } from "@angular/core";
import { UserService } from "./services/user.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { User } from "./user.model";

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
        tap((user: User | null) => {
          !user && this.router.navigate(['/auth/login']);

          !user!.emailConfirmed && this.router.navigate(['/auth/confirm-email']);
        }),
        map((user) => !!user),
    );
  }
}
