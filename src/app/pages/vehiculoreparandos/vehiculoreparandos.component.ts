import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vehiculoreparandos',
  templateUrl: './vehiculoreparandos.html'
})
export class VehiculoreparandosComponent implements OnInit {

  constructor() {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  
  }

}
