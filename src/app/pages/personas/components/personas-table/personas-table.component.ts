import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PersonasInterface } from './personas.interface';
import { PersonasResponseInterface } from './personas-response.interface';
import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasAddModalComponent } from './personas-add-modal/personas-add-modal.component';
import { PersonasEditModalComponent } from './personas-edit-modal/personas-edit-modal.component';


@Component({
  selector: 'personas-table',
  templateUrl: './personas-table.html',
  styleUrls: ['./personas-table.scss'],
})
export class PersonasTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpersona';
    sortOrder = 'asc';

    constructor(
      private personasService: PersonasService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addPersonasModalShow() {
      this.dialogService.addDialog(PersonasAddModalComponent)
        .subscribe( data =>  data ? this.showToast(data) : null )
    }

    editPersonasModalShow(personas: PersonasInterface) {
      this.dialogService.addDialog(PersonasEditModalComponent, personas)
      .subscribe( data =>
        data ? this.showToast(data) : null,
        error => console.log(error),
        () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.personasService.remove(id)
          .subscribe( data =>
            this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed'))
          ;
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if ( data.success ) {
        this.toastrService.success(data.message);
        this.getAllPersonas();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllPersonas();
    }
    
    private getAllPersonas(): void {
      this.personasService.all()
        .subscribe(( data: PersonasResponseInterface) =>
          this.data = data.result,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
