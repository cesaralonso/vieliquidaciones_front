import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxiasignadosService } from './permisotaxiasignados.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisotaxiasignadosAddModalComponent } from './permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { PermisotaxiasignadosEditModalComponent } from './permisotaxiasignados-edit-modal/permisotaxiasignados-edit-modal.component';


@Component({
  selector: 'permisotaxiasignados-table',
  templateUrl: './permisotaxiasignados-table.html',
  styleUrls: ['./permisotaxiasignados-table.scss'],
})
export class PermisotaxiasignadosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxiasignado';
    sortOrder = 'asc';

    constructor(
      private service: PermisotaxiasignadosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addPermisotaxiasignadosModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editPermisotaxiasignadosModalShow(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosEditModalComponent, permisotaxiasignados)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Permisotaxiasignado';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Permisotaxiasignado';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Permisotaxiasignado';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Permisotaxiasignado';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarPermisotaxiasignado(id)
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
        this.getAllPermisotaxiasignados();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllPermisotaxiasignados();
    }
    
    private getAllPermisotaxiasignados(): void {
      this.service
          .getAllPermisotaxiasignados()
          .subscribe(
              (data: PermisotaxiasignadosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
