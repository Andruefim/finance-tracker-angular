import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AuthCardComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuider = inject(FormBuilder);

  registerForm = this.formBuider.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  register(): void {
    console.log('register')
  }
}
