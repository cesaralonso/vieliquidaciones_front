import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { RefaccionesInterface } from './refacciones.interface';
import { RefaccionesResponseInterface } from './refacciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { RefaccionesService } from './refacciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RefaccionesAddModalComponent } from './refacciones-add-modal/refacciones-add-modal.component';
import { RefaccionesEditModalComponent } from './refacciones-edit-modal/refacciones-edit-modal.component';


@Component({
  selector: 'refacciones-table',
  templateUrl: './refacciones-table.html',
  styleUrls: ['./refacciones-table.scss'],
})
export class RefaccionesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idrefaccion';
    sortOrder = 'asc';

    constructor(
      private service: RefaccionesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addRefaccionesModalShow() {
      const disposable = this.dialogService.addDialog(RefaccionesAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editRefaccionesModalShow(refacciones: RefaccionesInterface) {
      const disposable = this.dialogService.addDialog(RefaccionesEditModalComponent, refacciones)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
  }

    uploadModalShow(id: number, descripcion: string) {
      const activeModal = this.modalService.open(UploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Refaccion';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Refaccion';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Refaccion';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Refaccion';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarRefaccion(id)
          .subscribe(
            (data) => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed')
          );
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if ( data.success ) {
        this.toastrService.success('Refaccion registrado');
        this.getAllRefacciones();
      } else {
        this.toastrService.error('Hubo un problema. Por favor, vuelva a intentarlo');
      }
    }

    ngOnInit() {
        this.getAllRefacciones();
    }
    
    private getAllRefacciones(): void {
      this.service.all() 
        .subscribe( (data: RefaccionesResponseInterface) => {
          data.success ? this.data = data.result : null
        },
        error => console.log(error),
        () => console.log('Get all Items complete'))
    } 
}
