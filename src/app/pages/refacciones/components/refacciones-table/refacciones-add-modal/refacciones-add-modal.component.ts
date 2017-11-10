import { RefaccionesInterface } from './../../../../refacciones/components/refacciones-table/refacciones.interface';
import { RefaccionesResponseInterface } from './../../../../refacciones/components/refacciones-table/refacciones-response.interface';
import { RefaccionesService } from './../../../../refacciones/components/refacciones-table/refacciones.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RefaccionesService } from './../refacciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { RefaccionesInterface } from './../refacciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RefaccionesResponseInterface } from 'app/pages/refacciones/components/refacciones-table/refacciones-response.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./refacciones-add-modal.component.scss')],
  templateUrl: './refacciones-add-modal.component.html',
  providers: [
    RefaccionesService
  ]
})

export class RefaccionesAddModalComponent extends DialogComponent<RefaccionesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  public form: FormGroup;

  nombreAC: AbstractControl;
  precioCompraAC: AbstractControl;
  precioVentaAC: AbstractControl;
  precioVentaIvaAC: AbstractControl;
  taller_idtallerAC: AbstractControl;

  public avales: RefaccionesInterface[];

  constructor(
    private service: RefaccionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private refaccionesService: RefaccionesService,
    dialogService: DialogService
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
    this.getRefacciones()
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: RefaccionesInterface): void {
    console.log(values);
      this.service.add(values)
        .subscribe((data: RefaccionesResponseInterface) => {
            this.data = data;
            this.confirm();
        });
  }

  getRefacciones() {
    this.refaccionesService.all()
      .subscribe( (res: RefaccionesResponseInterface) =>
        res.success ? this.avales = res.result : null)
  }
}
