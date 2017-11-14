import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CorralonesInterface } from './corralones.interface';
import { CorralonesResponseInterface } from './corralones-response.interface';
import { Component, OnInit } from '@angular/core';
import { CorralonesService } from './corralones.service';
import { CorralonesAddModalComponent } from './corralones-add-modal/corralones-add-modal.component';
import { CorralonesEditModalComponent } from './corralones-edit-modal/corralones-edit-modal.component';

@Component({
  selector: 'corralones-table',
  templateUrl: './corralones-table.html',
  styleUrls: ['./corralones-table.scss'],
})
export class CorralonesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcorralon';
    sortOrder = 'asc';

    constructor(
      private service: CorralonesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addCorralonesModalShow() {
      this.dialogService.addDialog(CorralonesAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null )
    }

    editCorralonesModalShow(corralones: CorralonesInterface) {
      this.dialogService.addDialog(CorralonesEditModalComponent, corralones)
        .subscribe( data =>
          data ? this.showToast(data): null,
          error => console.log(error),
          () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.remove(id)
          .subscribe(
            data => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed'));
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if (data.success) {
        this.toastrService.success(data.message);
        this.getAllCorralones();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllCorralones();
    }
    
    private getAllCorralones(): void {
      this.service.all()
        .subscribe( (data: CorralonesResponseInterface) =>
          this.data = data.result,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
