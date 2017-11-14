import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from './talleres.interface';
import { TalleresResponseInterface } from './talleres-response.interface';
import { Component, OnInit } from '@angular/core';
import { TalleresService } from './talleres.service';
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
    private toastrService: ToastrService, 
    private dialogService: DialogService) {
  }

  addTalleresModalShow() {
    this.dialogService.addDialog(TalleresAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null)
  }

  editTalleresModalShow(talleres: TalleresInterface) {
    this.dialogService.addDialog(TalleresEditModalComponent, talleres)
      .subscribe( data => 
        data ? this.showToast(data) : null,
        error => console.log(error),
        () => console.log('Modified complete'));
  }

  onDeleteConfirm(event, id): void {
    if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
      this.service.remove(id)
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
      this.getAllTalleres();
    } else {
      this.toastrService.error(data.message);
    }
  }

  ngOnInit() {
      this.getAllTalleres();
  }
  
  private getAllTalleres(): void {
    this.service.all()
      .subscribe( (data: TalleresResponseInterface) =>
        this.data = data.result,
        error => console.log(error),
        () => console.log('Get all Items complete'))
  } 
}
