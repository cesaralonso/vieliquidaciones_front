import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CorralonesComponent } from './corralones.component';
import { CorralonesTableComponent } from './components/corralones-table/corralones-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CorralonesComponent,
    children: [
      { path: 'corralones-table', component: CorralonesTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
