import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'folios',
  templateUrl: './folios.html'
})
export class FoliosComponent implements OnInit {

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
