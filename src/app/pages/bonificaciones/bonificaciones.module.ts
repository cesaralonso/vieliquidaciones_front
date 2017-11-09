
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './bonificaciones.routing';
import { BonificacionesComponent } from './bonificaciones.component';

import { BonificacionesAddModalComponent } from './components/bonificaciones-table/bonificaciones-add-modal/bonificaciones-add-modal.component';
import { BonificacionesEditModalComponent } from './components/bonificaciones-table/bonificaciones-edit-modal/bonificaciones-edit-modal.component';
import { BonificacionesService } from './components/bonificaciones-table/bonificaciones.service';

import { BonificacionesTableComponent } from './components/bonificaciones-table/bonificaciones-table.component';
import { DataFilterPipe } from './components/bonificaciones-table/data-filter.pipe';

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
    BonificacionesComponent,
    BonificacionesTableComponent,
    DataFilterPipe,
    BonificacionesAddModalComponent,
    BonificacionesEditModalComponent,
  ],
  entryComponents: [
    BonificacionesAddModalComponent,
    BonificacionesEditModalComponent,
  ],
  providers: [
    BonificacionesService,
  ]
})
export class BonificacionesModule {
}
