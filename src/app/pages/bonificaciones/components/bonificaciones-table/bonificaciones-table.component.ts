import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { BonificacionesInterface } from './bonificaciones.interface';
import { BonificacionesResponseInterface } from './bonificaciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { BonificacionesService } from './bonificaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BonificacionesAddModalComponent } from './bonificaciones-add-modal/bonificaciones-add-modal.component';
import { BonificacionesEditModalComponent } from './bonificaciones-edit-modal/bonificaciones-edit-modal.component';


@Component({
  selector: 'bonificaciones-table',
  templateUrl: './bonificaciones-table.html',
  styleUrls: ['./bonificaciones-table.scss'],
})
export class BonificacionesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idbonificacion';
    sortOrder = 'asc';

    constructor(
      private service: BonificacionesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addBonificacionesModalShow() {
      const disposable = this.dialogService.addDialog(BonificacionesAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editBonificacionesModalShow(bonificaciones: BonificacionesInterface) {
      const disposable = this.dialogService.addDialog(BonificacionesEditModalComponent, bonificaciones)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Bonificacion';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Bonificacion';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Bonificacion';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Bonificacion';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarBonificacion(id)
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
      if (data.idRespuesta === 0) {
        this.toastrService.success(data.mensajeRespuesta);
        this.getAllBonificaciones();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllBonificaciones();
    }
    
    private getAllBonificaciones(): void {
      this.service
          .getAllBonificaciones()
          .subscribe(
              (data: BonificacionesInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
