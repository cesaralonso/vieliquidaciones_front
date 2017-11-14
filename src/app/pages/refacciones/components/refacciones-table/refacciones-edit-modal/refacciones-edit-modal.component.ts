import { TalleresService } from './../../../../talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RefaccionesService } from './../refacciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { RefaccionesInterface } from './../refacciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./refacciones-edit-modal.component.scss')],
  templateUrl: './refacciones-edit-modal.component.html',
  providers: [
    TalleresService
  ]
})

export class RefaccionesEditModalComponent extends DialogComponent<RefaccionesInterface, any> implements OnInit, RefaccionesInterface {
  idrefaccion: number;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  precioVentaIva: number;
  taller_idtaller: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public idrefaccionAC: AbstractControl;
  public nombreAC: AbstractControl;
  public precioCompraAC: AbstractControl;
  public precioVentaAC: AbstractControl;
  public precioVentaIvaAC: AbstractControl;
  public taller_idtallerAC: AbstractControl;
  public talleres: TalleresInterface[];
  constructor(
    private service: RefaccionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,    
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioCompraAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioVentaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioVentaIvaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.nombreAC = this.form.controls['nombreAC'];
    this.precioCompraAC = this.form.controls['precioCompraAC'];
    this.precioVentaAC = this.form.controls['precioVentaAC'];
    this.precioVentaIvaAC = this.form.controls['precioVentaIvaAC'];
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];

  }

  ngOnInit() {
    this.getAllTalleres()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }
  
  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => this.talleres = res.success ? res.result : null)
  }

  onSubmit(values: RefaccionesInterface): void {
    this.service.edit({
        idrefaccion: this.idrefaccion,
        nombre: this.nombre,
        precioCompra: this.precioCompra,
        precioVenta: this.precioVenta,
        precioVentaIva: this.precioVentaIva,
        taller_idtaller: this.taller_idtaller,
      }).subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

}
