import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { LiquidacionesInterface } from './liquidaciones.interface';
import { LiquidacionesResponseInterface } from './liquidaciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { LiquidacionesService } from './liquidaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LiquidacionesAddModalComponent } from './liquidaciones-add-modal/liquidaciones-add-modal.component';
import { LiquidacionesEditModalComponent } from './liquidaciones-edit-modal/liquidaciones-edit-modal.component';


@Component({
  selector: 'liquidaciones-table',
  templateUrl: './liquidaciones-table.html',
  styleUrls: ['./liquidaciones-table.scss'],
})
export class LiquidacionesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idliquidacion';
    sortOrder = 'asc';

    constructor(
      private service: LiquidacionesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addLiquidacionesModalShow() {
      const disposable = this.dialogService.addDialog(LiquidacionesAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editLiquidacionesModalShow(liquidaciones: LiquidacionesInterface) {
      const disposable = this.dialogService.addDialog(LiquidacionesEditModalComponent, liquidaciones)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Liquidacion';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Liquidacion';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Liquidacion';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Liquidacion';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarLiquidacion(id)
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
        this.getAllLiquidaciones();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllLiquidaciones();
    }
    
    private getAllLiquidaciones(): void {
      this.service
          .getAllLiquidaciones()
          .subscribe(
              (data: LiquidacionesInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
