import { Component, Input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-auth-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.scss'
})
export class AuthCardComponent {
  @Input() title: string = '';
  year = new Date().getFullYear();
}