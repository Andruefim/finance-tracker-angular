import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { LayoutComponent } from './core/layout/main-layout/layout.component';
import { MinimalLayoutComponent } from './core/layout/minimal-layout/minimal-layout.component';
import { AuthGuard } from './core/auth/auth.guard';
import { IncomeCategoriesComponent } from './features/categories/pages/income-categories/income-categories.component';
import { ExpenseCategoriesComponent } from './features/categories/pages/expense-categories/expense-categories.component';
import { BaseCategoriesComponent } from './features/categories/components/base-categories/base-categories.component';

const routeConfig: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'categories',
        children: [
          { path: 'income', component: IncomeCategoriesComponent },
          { path: 'expense', component: ExpenseCategoriesComponent }
        ]
      },
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
