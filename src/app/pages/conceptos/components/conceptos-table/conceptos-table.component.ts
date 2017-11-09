import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ConceptosInterface } from './conceptos.interface';
import { ConceptosResponseInterface } from './conceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ConceptosService } from './conceptos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConceptosAddModalComponent } from './conceptos-add-modal/conceptos-add-modal.component';
import { ConceptosEditModalComponent } from './conceptos-edit-modal/conceptos-edit-modal.component';


@Component({
  selector: 'conceptos-table',
  templateUrl: './conceptos-table.html',
  styleUrls: ['./conceptos-table.scss'],
})
export class ConceptosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idconcepto';
    sortOrder = 'asc';

    constructor(
      private service: ConceptosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addConceptosModalShow() {
      const disposable = this.dialogService.addDialog(ConceptosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editConceptosModalShow(conceptos: ConceptosInterface) {
      const disposable = this.dialogService.addDialog(ConceptosEditModalComponent, conceptos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Concepto';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Concepto';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Concepto';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Concepto';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarConcepto(id)
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
        this.getAllConceptos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllConceptos();
    }
    
    private getAllConceptos(): void {
      this.service
          .getAllConceptos()
          .subscribe(
              (data: ConceptosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
