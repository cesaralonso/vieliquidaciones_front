import { TalleresService } from './../../../../talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RefaccionesService } from './../refacciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { RefaccionesInterface } from './../refacciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RefaccionesResponseInterface } from 'app/pages/refacciones/components/refacciones-table/refacciones-response.interface';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./refacciones-add-modal.component.scss')],
  templateUrl: './refacciones-add-modal.component.html',
  providers: [
    TalleresService
  ]
})

export class RefaccionesAddModalComponent extends DialogComponent<RefaccionesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  public form: FormGroup;

  public nombre: AbstractControl;
  public precioCompra: AbstractControl;
  public precioVenta: AbstractControl;
  public precioVentaIva: AbstractControl;
  public taller_idtaller: AbstractControl;
  
  public talleres: TalleresInterface[];

  constructor(
    private refaccionesService: RefaccionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'nombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioCompra' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioVenta' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioVentaIva' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.nombre = this.form.controls['nombre'];
    this.precioCompra = this.form.controls['precioCompra'];
    this.precioVenta = this.form.controls['precioVenta'];
    this.precioVentaIva = this.form.controls['precioVentaIva'];
    this.taller_idtaller = this.form.controls['taller_idtaller'];
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
    console.log(values);
      this.refaccionesService.create(values)
        .subscribe((data: RefaccionesResponseInterface) => {
            this.data = data;
            this.confirm();
        });
  }

}
