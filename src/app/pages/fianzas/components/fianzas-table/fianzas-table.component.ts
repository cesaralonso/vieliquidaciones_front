import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FianzasInterface } from './fianzas.interface';
import { FianzasResponseInterface } from './fianzas-response.interface';
import { Component, OnInit } from '@angular/core';
import { FianzasService } from './fianzas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FianzasAddModalComponent } from './fianzas-add-modal/fianzas-add-modal.component';
import { FianzasEditModalComponent } from './fianzas-edit-modal/fianzas-edit-modal.component';


@Component({
  selector: 'fianzas-table',
  templateUrl: './fianzas-table.html',
  styleUrls: ['./fianzas-table.scss'],
})
export class FianzasTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfianza';
    sortOrder = 'asc';

    constructor(
      private service: FianzasService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addFianzasModalShow() {
      const disposable = this.dialogService.addDialog(FianzasAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editFianzasModalShow(fianzas: FianzasInterface) {
      const disposable = this.dialogService.addDialog(FianzasEditModalComponent, fianzas)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Fianza';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Fianza';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Fianza';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Fianza';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarFianza(id)
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
        this.getAllFianzas();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllFianzas();
    }
    
    private getAllFianzas(): void {
      this.service
          .getAllFianzas()
          .subscribe(
              (data: FianzasInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
