import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { LayoutComponent } from './core/layout/main-layout/layout.component';
import { MinimalLayoutComponent } from './core/layout/minimal-layout/minimal-layout.component';
import { inject } from '@angular/core';
import { UserService } from './core/auth/services/user.service';
import { map } from 'rxjs';
import { AuthGuard } from './core/auth/auth.guard';

const routeConfig: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    //canActivate: [
    //  AuthGuard
    //],
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  {
    path: 'auth',
    component: MinimalLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  },

  { path: 'swagger', redirectTo: '' },
  { path: '**', redirectTo: '/auth/login' },
]

export default routeConfig;

//{ path: 'transactions', component: TransactionsComponent },
//{ path: 'categories', component: CategoriesComponent },
//{ path: 'budgeting', component: BudgetingComponent },
//{ path: 'reports', component: ReportsComponent },
//{ path: 'settings', component: SettingsComponent },
