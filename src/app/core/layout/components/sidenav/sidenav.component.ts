import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  navLinksMapper = [
    { path: '/dashboard', title: 'Dashboard' },
    { path: '/transactions', title: 'Transactions' },
    { path: '/categories', title: 'Categories' },
    { path: '/budgeting', title: 'Budgeting' },
    { path: '/reports', title: 'Reports' },
    { path: '/settings', title: 'Settings' },
  ]
}
