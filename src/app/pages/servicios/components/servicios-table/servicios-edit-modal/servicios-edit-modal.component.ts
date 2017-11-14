import { TalleresService } from './../../../../talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ServiciosService } from './../servicios.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ServiciosInterface } from './../servicios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./servicios-edit-modal.component.scss')],
  templateUrl: './servicios-edit-modal.component.html',
  providers: [
    TalleresService
  ]
})

export class ServiciosEditModalComponent extends DialogComponent<ServiciosInterface, any> implements OnInit, ServiciosInterface {


  idservicio: number;
  nombre: string;
  precio: number;
  iva: number;
  taller_idtaller: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public idservicioAC: AbstractControl;
  public nombreAC: AbstractControl;
  public precioAC: AbstractControl;
  public ivaAC: AbstractControl;
  public taller_idtallerAC: AbstractControl;
  public talleres: TalleresInterface[];
  
  constructor(
    private serviciosService: ServiciosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,        
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'ivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.nombreAC = this.form.controls['nombreAC'];
    this.precioAC = this.form.controls['precioAC'];
    this.ivaAC = this.form.controls['ivaAC'];
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

  onSubmit(values: ServiciosInterface): void {
    this.serviciosService.edit({
        idservicio: this.idservicio,
        nombre: this.nombre,
        precio: this.precio,
        iva: this.iva,
        taller_idtaller: this.taller_idtaller
      }).subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

}
