import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ServiciosInterface } from './servicios.interface';
import { ServiciosResponseInterface } from './servicios-response.interface';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosAddModalComponent } from './servicios-add-modal/servicios-add-modal.component';
import { ServiciosEditModalComponent } from './servicios-edit-modal/servicios-edit-modal.component';


@Component({
  selector: 'servicios-table',
  templateUrl: './servicios-table.html',
  styleUrls: ['./servicios-table.scss'],
})
export class ServiciosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idservicio';
    sortOrder = 'asc';

    constructor(
      private service: ServiciosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addServiciosModalShow() {
      const disposable = this.dialogService.addDialog(ServiciosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editServiciosModalShow(servicios: ServiciosInterface) {
      const disposable = this.dialogService.addDialog(ServiciosEditModalComponent, servicios)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Servicio';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Servicio';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Servicio';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Servicio';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarServicio(id)
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
        this.toastrService.success('Servicio registrado');
        this.getAllServicios();
      } else {
        this.toastrService.error('Hubo un problema. Por favor, vuelva a intentarlo');
      }
    }

    ngOnInit() {
        this.getAllServicios();
    }
    
    private getAllServicios(): void {
      this.service.all() 
        .subscribe( (data: ServiciosResponseInterface) => {
          data.success ? this.data = data.result : null
        },
        error => console.log(error),
        () => console.log('Get all Items complete'))
    } 
}
