import { Routes, RouterModule, CanActivate } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '../shared/auth-guard.service';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'forgot',
    loadChildren: 'app/pages/forgot/forgot.module#ForgotModule'
  },
  {
    path: 'change-password',
    loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule', 
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivateChild: [AuthGuard] },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'obras', loadChildren: './obras/obras.module#ObrasModule', canActivateChild: [AuthGuard] },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivateChild: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
