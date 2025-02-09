import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AuthCardComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  private formBuider = inject(FormBuilder);
  readonly destroyRef = inject(DestroyRef);

  loginForm = this.formBuider.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  login(): void {
    this.userService.login({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => response.token && this.router.navigate(['/dashboard']),
        error: (error) => console.error('Error:', error),
      })
  }
}
