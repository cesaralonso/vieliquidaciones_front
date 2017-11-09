import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mecanicos',
  templateUrl: './mecanicos.html'
})
export class MecanicosComponent implements OnInit {

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
