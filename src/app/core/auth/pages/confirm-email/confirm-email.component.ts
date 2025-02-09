import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AuthCardComponent
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements AfterViewInit {
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  private formBuilder = inject(FormBuilder);
  readonly destroyRef = inject(DestroyRef);
  $user = this.userService.currentUser$.pipe(
    tap(user => user?.emailConfirmed && this.router.navigate(['/dashboard']))
  )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();

  confirmEmailForm = this.formBuilder.group({
    code: ['', Validators.required],
  })

  ngAfterViewInit(): void {
    this.initEmailConfirmation();

  }

  initEmailConfirmation(): void {
    !sessionStorage.getItem('confirmationSent') && this.sendEmailConfirmation();
  }

  sendEmailConfirmation(): void {
    this.userService
      .sendEmailConfirmation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => response.confirmationSent && sessionStorage.setItem('confirmationSent', 'true'),
        error: (error) => console.error('Error', error),
      })
  }

  confirmEmail(): void {
    this.userService
      .confirmEmail({
        code: this.confirmEmailForm.value.code ?? ''
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          if (response.emailConfirmed) {
            this.userService.refetchUser();

            this.router.navigate(['/dashboard'])
          } 
        },
        error: (error) => this.confirmEmailForm.setErrors({ code: error }),
      })
  }
}
