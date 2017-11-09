
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './permisotaxiasignados.routing';
import { PermisotaxiasignadosComponent } from './permisotaxiasignados.component';

import { PermisotaxiasignadosAddModalComponent } from './components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { PermisotaxiasignadosEditModalComponent } from './components/permisotaxiasignados-table/permisotaxiasignados-edit-modal/permisotaxiasignados-edit-modal.component';
import { PermisotaxiasignadosService } from './components/permisotaxiasignados-table/permisotaxiasignados.service';

import { PermisotaxiasignadosTableComponent } from './components/permisotaxiasignados-table/permisotaxiasignados-table.component';
import { DataFilterPipe } from './components/permisotaxiasignados-table/data-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })    
    
  ],
  declarations: [
    PermisotaxiasignadosComponent,
    PermisotaxiasignadosTableComponent,
    DataFilterPipe,
    PermisotaxiasignadosAddModalComponent,
    PermisotaxiasignadosEditModalComponent,
  ],
  entryComponents: [
    PermisotaxiasignadosAddModalComponent,
    PermisotaxiasignadosEditModalComponent,
  ],
  providers: [
    PermisotaxiasignadosService,
  ]
})
export class PermisotaxiasignadosModule {
}
