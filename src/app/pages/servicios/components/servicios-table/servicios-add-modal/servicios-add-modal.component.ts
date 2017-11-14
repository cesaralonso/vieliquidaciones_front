import { TalleresService } from './../../../../talleres/components/talleres-table/talleres.service';
import { TalleresInterface } from './../../../../talleres/components/talleres-table/talleres.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ServiciosService } from './../servicios.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ServiciosInterface } from './../servicios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosResponseInterface } from 'app/pages/servicios/components/servicios-table/servicios-response.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./servicios-add-modal.component.scss')],
  templateUrl: './servicios-add-modal.component.html',
  providers: [
    TalleresService
  ]
})

export class ServiciosAddModalComponent extends DialogComponent<ServiciosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  public form: FormGroup;

  public nombre: AbstractControl;
  public precio: AbstractControl;
  public iva: AbstractControl;
  public taller_idtaller: AbstractControl;
  public talleres: TalleresInterface[];
  constructor(
    private serviciosService: ServiciosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,    
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'taller_idtaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'iva' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.taller_idtaller = this.form.controls['taller_idtaller'];
    this.nombre = this.form.controls['nombre'];
    this.precio = this.form.controls['precio'];
    this.iva = this.form.controls['iva'];
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

  onSubmit(values: ServiciosInterface): void {
    console.log(values);
      this.serviciosService.add(values)
        .subscribe((data: ServiciosResponseInterface) => {
            this.data = data;
            this.confirm();
        });
  }
}
