import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxisInterface } from './permisotaxis.interface';
import { PermisotaxisResponseInterface } from './permisotaxis-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxisService } from './permisotaxis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisotaxisAddModalComponent } from './permisotaxis-add-modal/permisotaxis-add-modal.component';
import { PermisotaxisEditModalComponent } from './permisotaxis-edit-modal/permisotaxis-edit-modal.component';


@Component({
  selector: 'permisotaxis-table',
  templateUrl: './permisotaxis-table.html',
  styleUrls: ['./permisotaxis-table.scss'],
})
export class PermisotaxisTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxi';
    sortOrder = 'asc';

    constructor(
      private service: PermisotaxisService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addPermisotaxisModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editPermisotaxisModalShow(permisotaxis: PermisotaxisInterface) {
      const disposable = this.dialogService.addDialog(PermisotaxisEditModalComponent, permisotaxis)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Permisotaxi';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Permisotaxi';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Permisotaxi';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Permisotaxi';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarPermisotaxi(id)
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
        this.getAllPermisotaxis();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllPermisotaxis();
    }
    
    private getAllPermisotaxis(): void {
      this.service
          .getAllPermisotaxis()
          .subscribe(
              (data: PermisotaxisInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
