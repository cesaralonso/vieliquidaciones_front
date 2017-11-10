
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './servicios.routing';
import { ServiciosComponent } from './servicios.component';

import { ServiciosAddModalComponent } from './components/servicios-table/servicios-add-modal/servicios-add-modal.component';
import { ServiciosEditModalComponent } from './components/servicios-table/servicios-edit-modal/servicios-edit-modal.component';
import { ServiciosService } from './components/servicios-table/servicios.service';

import { ServiciosTableComponent } from './components/servicios-table/servicios-table.component';
import { DataFilterPipe } from './components/servicios-table/data-filter.pipe';

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
    ServiciosComponent,
    ServiciosTableComponent,
    DataFilterPipe,
    ServiciosAddModalComponent,
    ServiciosEditModalComponent,
  ],
  entryComponents: [
    ServiciosAddModalComponent,
    ServiciosEditModalComponent,
  ],
  providers: [
    ServiciosService,
  ]
})
export class ServiciosModule {
}
