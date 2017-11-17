import { PersonasService } from './personas/components/personas-table/personas.service';
import { PersonasEditModalComponent } from './personas/components/personas-table/personas-edit-modal/personas-edit-modal.component';
import { FormBuilder } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { PersonasAddModalComponent } from 'app/pages/personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    PersonasAddModalComponent,
    PersonasEditModalComponent,
    Pages
  ],
  entryComponents: [
    PersonasAddModalComponent,
    PersonasEditModalComponent
  ],
  providers: [
    PersonasService
  ]
})
export class PagesModule {
}