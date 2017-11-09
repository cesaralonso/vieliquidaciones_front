import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculoreparandosInterface } from './vehiculoreparandos.interface';
import { VehiculoreparandosResponseInterface } from './vehiculoreparandos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculoreparandosService } from './vehiculoreparandos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculoreparandosAddModalComponent } from './vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';
import { VehiculoreparandosEditModalComponent } from './vehiculoreparandos-edit-modal/vehiculoreparandos-edit-modal.component';


@Component({
  selector: 'vehiculoreparandos-table',
  templateUrl: './vehiculoreparandos-table.html',
  styleUrls: ['./vehiculoreparandos-table.scss'],
})
export class VehiculoreparandosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idvehiculoreparando';
    sortOrder = 'asc';

    constructor(
      private service: VehiculoreparandosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addVehiculoreparandosModalShow() {
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editVehiculoreparandosModalShow(vehiculoreparandos: VehiculoreparandosInterface) {
      const disposable = this.dialogService.addDialog(VehiculoreparandosEditModalComponent, vehiculoreparandos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Vehiculoreparando';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Vehiculoreparando';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Vehiculoreparando';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Vehiculoreparando';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarVehiculoreparando(id)
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
        this.getAllVehiculoreparandos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllVehiculoreparandos();
    }
    
    private getAllVehiculoreparandos(): void {
      this.service
          .getAllVehiculoreparandos()
          .subscribe(
              (data: VehiculoreparandosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
