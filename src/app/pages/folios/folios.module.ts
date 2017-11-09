
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './folios.routing';
import { FoliosComponent } from './folios.component';

import { FoliosAddModalComponent } from './components/folios-table/folios-add-modal/folios-add-modal.component';
import { FoliosEditModalComponent } from './components/folios-table/folios-edit-modal/folios-edit-modal.component';
import { FoliosService } from './components/folios-table/folios.service';

import { FoliosTableComponent } from './components/folios-table/folios-table.component';
import { DataFilterPipe } from './components/folios-table/data-filter.pipe';

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
    FoliosComponent,
    FoliosTableComponent,
    DataFilterPipe,
    FoliosAddModalComponent,
    FoliosEditModalComponent,
  ],
  entryComponents: [
    FoliosAddModalComponent,
    FoliosEditModalComponent,
  ],
  providers: [
    FoliosService,
  ]
})
export class FoliosModule {
}
