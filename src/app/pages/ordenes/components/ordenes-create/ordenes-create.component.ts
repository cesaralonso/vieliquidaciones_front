import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosService } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.service';
import { OrdenesInterface } from './../ordenes-table/ordenes.interface';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { RefaccionesModalComponent } from 'app/pages/ordenes/components/refacciones-modal/refacciones-modal.component';
import { RefaccionesInterface } from 'app/pages/refacciones/components/refacciones-table/refacciones.interface';

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
  public refaccionSelected: RefaccionesInterface = {
    idrefaccion: null,
    nombre: '',
    precioCompra: null,
    precioVenta: null,
    taller_idtaller: null
  }
  public cantidad = 1;
  public precio = 0;
  public refacciones = [ ]
  constructor(
    private vehiculoReparandosService: VehiculoreparandosService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getAllVehiculosReparando()
  }

  getAllVehiculosReparando() {
    this.vehiculoReparandosService.all()
      .subscribe( data => this.vehiculos = data.success ? data.result : null )
  }

  showRefaccionesModal() {
    this.dialogService.addDialog( RefaccionesModalComponent)
      .subscribe( refaccion => {
        if ( refaccion ) {
          this.refaccionSelected = refaccion
          this.cantidad = 1
          this.precio = refaccion.precioVenta
        }
      })
  }

  setPrecioVenta() {
    if ( this.refaccionSelected.precioVenta && this.precio > 0 ) {
      this.precio = this.refaccionSelected.precioVenta * this.cantidad
    }
  }

  addToList() {
    if ( this.refaccionSelected.idrefaccion !== null ) {
      this.refacciones.push({
        idrefaccion: this.refaccionSelected.idrefaccion,
        nombre: this.refaccionSelected.nombre,
        precioVenta: this.refaccionSelected.precioVenta,
        cantidad: this.cantidad
      })
      this.addToSubtotal( this.cantidad * this.refaccionSelected.precioVenta )
      // Inicializa los valores por cada agregar a la lista
      this.refaccionSelected = {
        idrefaccion: null,
        nombre: '',
        precioCompra: null,
        precioVenta: null,
        taller_idtaller: null
      }
      this.cantidad = 1;
      this.precio = 0;
    }
  }

  addToSubtotal( cantidad ) {
    this.orden.subtotal += cantidad
    this.addToTotal( cantidad )
  }

  addToTotal( cantidad ) {
    this.orden.total += cantidad
  }

}
