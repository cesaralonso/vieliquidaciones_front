import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosService } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.service';
import { OrdenesInterface } from './../ordenes-table/ordenes.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes-create',
  templateUrl: './ordenes-create.component.html',
  styleUrls: ['./ordenes-create.component.scss'],
  providers: [
    VehiculoreparandosService
  ]
})
export class OrdenesCreateComponent implements OnInit {
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
  public vehiculos: VehiculoreparandosInterface[]
  constructor(
    private vehiculoReparandosService: VehiculoreparandosService
  ) { }

  ngOnInit() {
    this.getAllVehiculosReparando()
  }

  getAllVehiculosReparando() {
    this.vehiculoReparandosService.all()
      .subscribe( data => this.vehiculos = data.success ? data.result : null )
  }

}
