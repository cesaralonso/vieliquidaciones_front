import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EgresoconceptosInterface } from './egresoconceptos.interface';
import { EgresoconceptosResponseInterface } from './egresoconceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { EgresoconceptosService } from './egresoconceptos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EgresoconceptosAddModalComponent } from './egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EgresoconceptosEditModalComponent } from './egresoconceptos-edit-modal/egresoconceptos-edit-modal.component';


@Component({
  selector: 'egresoconceptos-table',
  templateUrl: './egresoconceptos-table.html',
  styleUrls: ['./egresoconceptos-table.scss'],
})
export class EgresoconceptosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idegresoconcepto';
    sortOrder = 'asc';

    constructor(
      private service: EgresoconceptosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addEgresoconceptosModalShow() {
      const disposable = this.dialogService.addDialog(EgresoconceptosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editEgresoconceptosModalShow(egresoconceptos: EgresoconceptosInterface) {
      const disposable = this.dialogService.addDialog(EgresoconceptosEditModalComponent, egresoconceptos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Egresoconcepto';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Egresoconcepto';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Egresoconcepto';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Egresoconcepto';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarEgresoconcepto(id)
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
        this.getAllEgresoconceptos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllEgresoconceptos();
    }
    
    private getAllEgresoconceptos(): void {
      this.service
          .getAllEgresoconceptos()
          .subscribe(
              (data: EgresoconceptosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
