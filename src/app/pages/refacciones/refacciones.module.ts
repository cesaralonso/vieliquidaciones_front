
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './refacciones.routing';
import { RefaccionesComponent } from './refacciones.component';

import { RefaccionesAddModalComponent } from './components/refacciones-table/refacciones-add-modal/refacciones-add-modal.component';
import { RefaccionesEditModalComponent } from './components/refacciones-table/refacciones-edit-modal/refacciones-edit-modal.component';
import { RefaccionesService } from './components/refacciones-table/refacciones.service';

import { RefaccionesTableComponent } from './components/refacciones-table/refacciones-table.component';
import { DataFilterPipe } from './components/refacciones-table/data-filter.pipe';

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
    RefaccionesComponent,
    RefaccionesTableComponent,
    DataFilterPipe,
    RefaccionesAddModalComponent,
    RefaccionesEditModalComponent,
  ],
  entryComponents: [
    RefaccionesAddModalComponent,
    RefaccionesEditModalComponent,
  ],
  providers: [
    RefaccionesService,
  ]
})
export class RefaccionesModule {
}
