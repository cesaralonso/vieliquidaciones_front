import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MecanicosInterface } from './mecanicos.interface';
import { MecanicosResponseInterface } from './mecanicos-response.interface';
import { Component, OnInit } from '@angular/core';
import { MecanicosService } from './mecanicos.service';
import { MecanicosAddModalComponent } from './mecanicos-add-modal/mecanicos-add-modal.component';
import { MecanicosEditModalComponent } from './mecanicos-edit-modal/mecanicos-edit-modal.component';


@Component({
  selector: 'mecanicos-table',
  templateUrl: './mecanicos-table.html',
  styleUrls: ['./mecanicos-table.scss'],
})
export class MecanicosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmecanico';
    sortOrder = 'asc';

    constructor(
      private mecanicosService: MecanicosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addMecanicosModalShow() {
      this.dialogService.addDialog(MecanicosAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null )
    }

    editMecanicosModalShow(mecanicos: MecanicosInterface) {
      this.dialogService.addDialog(MecanicosEditModalComponent, mecanicos)
        .subscribe( data =>
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.mecanicosService.remove(id)
          .subscribe(
            data => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed')
          );
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if (data.success) {
        this.toastrService.success(data.message);
        this.getAllMecanicos();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllMecanicos();
    }
    
    private getAllMecanicos(): void {
      this.mecanicosService.all()
        .subscribe( (data: MecanicosResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
}
