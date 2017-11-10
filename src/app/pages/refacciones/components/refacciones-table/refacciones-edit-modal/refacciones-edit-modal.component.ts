import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RefaccionesService } from './../refacciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { RefaccionesInterface } from './../refacciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./refacciones-edit-modal.component.scss')],
  templateUrl: './refacciones-edit-modal.component.html'
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
  submitted: boolean = false;

  refaccionI: RefaccionesInterface = {
    idrefaccion: 0,
    nombre: '',
    precioCompra: 0,
    precioVenta: 0,
    precioVentaIva: 0,
    taller_idtaller: 0,
  };

  idrefaccionAC: AbstractControl;
  nombreAC: AbstractControl;
  precioCompraAC: AbstractControl;
  precioVentaAC: AbstractControl;
  precioVentaIvaAC: AbstractControl;
  taller_idtallerAC: AbstractControl;



  constructor(
    private service: RefaccionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idrefaccionAC' : this.id,
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioCompraAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioVentaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioVentaIvaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.idrefaccionAC = this.form.controls['idrefaccionAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.precioCompraAC = this.form.controls['precioCompraAC'];
    this.precioVentaAC = this.form.controls['precioVentaAC'];
    this.precioVentaIvaAC = this.form.controls['precioVentaIvaAC'];
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: RefaccionesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editRefacciones({

          idrefaccion: this.idrefaccion,
          nombre: this.nombre,
          precioCompra: this.precioCompra,
          precioVenta: this.precioVenta,
          precioVentaIva: this.precioVentaIva,
          taller_idtaller: this.taller_idtaller,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getRefacciones(): void {
    this.service.getRefacciones(this.id)
        .subscribe( data => {
          this.refaccionI = data[1];
        },
        error => console.log(error),
        () => console.log('Get refaccion complete'));
  }

}
