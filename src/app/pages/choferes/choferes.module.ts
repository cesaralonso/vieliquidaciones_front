import { BrowserModule } from '@angular/platform-browser';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './choferes.routing';
import { ChoferesComponent } from './choferes.component';

import { ChoferesAddModalComponent } from './components/choferes-table/choferes-add-modal/choferes-add-modal.component';
import { ChoferesEditModalComponent } from './components/choferes-table/choferes-edit-modal/choferes-edit-modal.component';
import { ChoferesService } from './components/choferes-table/choferes.service';

import { ChoferesTableComponent } from './components/choferes-table/choferes-table.component';
import { DataFilterPipe } from './components/choferes-table/data-filter.pipe';
import { ChoferesCreateComponent } from './components/choferes-create/choferes-create.component';
import { PersonasAddModalComponent } from 'app/pages/personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { ChoferesEditComponent } from './components/choferes-edit/choferes-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    FormsModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })    
    
  ],
  declarations: [
    ChoferesComponent,
    ChoferesTableComponent,
    DataFilterPipe,
    ChoferesAddModalComponent,
    ChoferesEditModalComponent,
    ChoferesCreateComponent,
    ChoferesEditComponent,
  ],
  entryComponents: [
    ChoferesAddModalComponent,
    ChoferesEditModalComponent,
  ],
  providers: [
    ChoferesService,
  ]
})
export class ChoferesModule {
}
