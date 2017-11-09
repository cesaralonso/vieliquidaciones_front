import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from './talleres.interface';
import { TalleresResponseInterface } from './talleres-response.interface';
import { Component, OnInit } from '@angular/core';
import { TalleresService } from './talleres.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TalleresAddModalComponent } from './talleres-add-modal/talleres-add-modal.component';
import { TalleresEditModalComponent } from './talleres-edit-modal/talleres-edit-modal.component';


@Component({
  selector: 'talleres-table',
  templateUrl: './talleres-table.html',
  styleUrls: ['./talleres-table.scss'],
})
export class TalleresTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtaller';
    sortOrder = 'asc';

    constructor(
      private service: TalleresService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addTalleresModalShow() {
      const disposable = this.dialogService.addDialog(TalleresAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editTalleresModalShow(talleres: TalleresInterface) {
      const disposable = this.dialogService.addDialog(TalleresEditModalComponent, talleres)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Taller';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Taller';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Taller';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Taller';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarTaller(id)
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
        this.getAllTalleres();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllTalleres();
    }
    
    private getAllTalleres(): void {
      this.service
          .getAllTalleres()
          .subscribe(
              (data: TalleresInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
