import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routeConfig: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  //{ path: 'transactions', component: TransactionsComponent },
  //{ path: 'categories', component: CategoriesComponent },
  //{ path: 'budgeting', component: BudgetingComponent },
  //{ path: 'reports', component: ReportsComponent },
  //{ path: 'settings', component: SettingsComponent },
  { path: 'swagger', redirectTo: '' },
  { path: '**', redirectTo: 'dashboard' },
]

export default routeConfig;
