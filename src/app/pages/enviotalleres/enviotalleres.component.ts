import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'enviotalleres',
  templateUrl: './enviotalleres.html'
})
export class EnviotalleresComponent implements OnInit {

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
