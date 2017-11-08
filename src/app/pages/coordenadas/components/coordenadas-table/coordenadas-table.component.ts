import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CoordenadasInterface } from './coordenadas.interface';
import { CoordenadasResponseInterface } from './coordenadas-response.interface';
import { Component, OnInit } from '@angular/core';
import { CoordenadasService } from './coordenadas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoordenadasAddModalComponent } from './coordenadas-add-modal/coordenadas-add-modal.component';
import { CoordenadasEditModalComponent } from './coordenadas-edit-modal/coordenadas-edit-modal.component';


@Component({
  selector: 'coordenadas-table',
  templateUrl: './coordenadas-table.html',
  styleUrls: ['./coordenadas-table.scss'],
})
export class CoordenadasTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcoordenada';
    sortOrder = 'asc';

    constructor(
      private service: CoordenadasService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addCoordenadasModalShow() {
      const disposable = this.dialogService.addDialog(CoordenadasAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editCoordenadasModalShow(coordenadas: CoordenadasInterface) {
      const disposable = this.dialogService.addDialog(CoordenadasEditModalComponent, coordenadas)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Coordenada';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Coordenada';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Coordenada';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Coordenada';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarCoordenada(id)
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
        this.getAllCoordenadas();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllCoordenadas();
    }
    
    private getAllCoordenadas(): void {
      this.service
          .getAllCoordenadas()
          .subscribe(
              (data: CoordenadasInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
