import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EnviotalleresInterface } from './enviotalleres.interface';
import { EnviotalleresResponseInterface } from './enviotalleres-response.interface';
import { Component, OnInit } from '@angular/core';
import { EnviotalleresService } from './enviotalleres.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnviotalleresAddModalComponent } from './enviotalleres-add-modal/enviotalleres-add-modal.component';
import { EnviotalleresEditModalComponent } from './enviotalleres-edit-modal/enviotalleres-edit-modal.component';


@Component({
  selector: 'enviotalleres-table',
  templateUrl: './enviotalleres-table.html',
  styleUrls: ['./enviotalleres-table.scss'],
})
export class EnviotalleresTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idenviotaller';
    sortOrder = 'asc';

    constructor(
      private service: EnviotalleresService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addEnviotalleresModalShow() {
      const disposable = this.dialogService.addDialog(EnviotalleresAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editEnviotalleresModalShow(enviotalleres: EnviotalleresInterface) {
      const disposable = this.dialogService.addDialog(EnviotalleresEditModalComponent, enviotalleres)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Enviotaller';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Enviotaller';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Enviotaller';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Enviotaller';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarEnviotaller(id)
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
        this.getAllEnviotalleres();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllEnviotalleres();
    }
    
    private getAllEnviotalleres(): void {
      this.service
          .getAllEnviotalleres()
          .subscribe(
              (data: EnviotalleresInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
