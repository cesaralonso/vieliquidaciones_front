import { ActivatedRoute } from '@angular/router';
import { OrdenesService } from './../ordenes-table/ordenes.service';
import { Component, OnInit } from '@angular/core';
import { OrdenesInterface } from 'app/pages/ordenes/components/ordenes-table/ordenes.interface';

@Component({
  selector: 'app-ordenes-show',
  templateUrl: './ordenes-show.component.html',
  styleUrls: ['./ordenes-show.component.scss']
})
export class OrdenesShowComponent implements OnInit {
  public ordenId: number;
  public orden: OrdenesInterface = {
    idorden: null,
    fecha: new Date().toLocaleDateString(),
    descripcion: '',
    status: '',
    manoObra: 0,
    subtotal: 0,
    total: 0,
    anticipo: 0,
    vehiculoreparando_idvehiculoreparando: 0
  }
  constructor(
    private ordenesService: OrdenesService,
    private activatedRoute: ActivatedRoute
  ) {
      this.activatedRoute.params
        .flatMap( parameters => {
        this.ordenId = parameters['id'];
        return this.ordenesService.findById( this.ordenId )
        })
        .subscribe( ordenInfo => {
          if ( ordenInfo.success ) {
            this.orden = ordenInfo.result[0]
            console.log(this.orden)
          }
        })

  }

  ngOnInit() {

  }
  
  
}
