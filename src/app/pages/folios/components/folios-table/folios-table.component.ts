import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FoliosInterface } from './folios.interface';
import { FoliosResponseInterface } from './folios-response.interface';
import { Component, OnInit } from '@angular/core';
import { FoliosService } from './folios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoliosAddModalComponent } from './folios-add-modal/folios-add-modal.component';
import { FoliosEditModalComponent } from './folios-edit-modal/folios-edit-modal.component';


@Component({
  selector: 'folios-table',
  templateUrl: './folios-table.html',
  styleUrls: ['./folios-table.scss'],
})
export class FoliosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfolio';
    sortOrder = 'asc';

    constructor(
      private service: FoliosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addFoliosModalShow() {
      const disposable = this.dialogService.addDialog(FoliosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editFoliosModalShow(folios: FoliosInterface) {
      const disposable = this.dialogService.addDialog(FoliosEditModalComponent, folios)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Folio';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Folio';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Folio';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Folio';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarFolio(id)
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
        this.getAllFolios();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllFolios();
    }
    
    private getAllFolios(): void {
      this.service
          .getAllFolios()
          .subscribe(
              (data: FoliosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
