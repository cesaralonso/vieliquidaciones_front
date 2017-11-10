import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ServiciosService } from './../servicios.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ServiciosInterface } from './../servicios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./servicios-edit-modal.component.scss')],
  templateUrl: './servicios-edit-modal.component.html'
})

export class ServiciosEditModalComponent extends DialogComponent<ServiciosInterface, any> implements OnInit, ServiciosInterface {


  idservicio: number;
  nombre: string;
  precio: number;
  iva: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  servicioI: ServiciosInterface = {
    idservicio: 0,
    nombre: '',
    precio: 0,
    iva: 0,
  };

  idservicioAC: AbstractControl;
  nombreAC: AbstractControl;
  precioAC: AbstractControl;
  ivaAC: AbstractControl;



  constructor(
    private service: ServiciosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idservicioAC' : this.id,
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'ivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idservicioAC = this.form.controls['idservicioAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.precioAC = this.form.controls['precioAC'];
    this.ivaAC = this.form.controls['ivaAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: ServiciosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editServicios({

          idservicio: this.idservicio,
          nombre: this.nombre,
          precio: this.precio,
          iva: this.iva,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getServicios(): void {
    this.service.getServicios(this.id)
        .subscribe( data => {
          this.servicioI = data[1];
        },
        error => console.log(error),
        () => console.log('Get servicio complete'));
  }

}
