import { RefaccionesService } from './../../../refacciones/components/refacciones-table/refacciones.service';
import { RefaccionesInterface } from './../../../refacciones/components/refacciones-table/refacciones.interface';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';

@Component({
  selector: 'app-refacciones-modal',
  templateUrl: './refacciones-modal.component.html',
  styleUrls: ['./refacciones-modal.component.scss'],
  providers: [
    RefaccionesService
  ]
})
export class RefaccionesModalComponent extends DialogComponent<RefaccionesInterface, any> implements OnInit {
  public refacciones: RefaccionesInterface[];
  constructor(
    private refaccionesService: RefaccionesService,
    dialogService: DialogService
  ) { 
    super(dialogService)
  }

  ngOnInit() {
    this.getAllRefacciones()
  }
  confirm( refaccion ) {
    this.result = refaccion
    this.close()
  }
  getAllRefacciones() {
    this.refaccionesService.all()
      .subscribe( res =>
        this.refacciones = res.success
          ? res.result
          : null)
  }


}
