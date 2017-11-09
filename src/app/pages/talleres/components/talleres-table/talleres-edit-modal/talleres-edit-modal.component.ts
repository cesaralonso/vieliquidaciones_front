import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TalleresService } from './../talleres.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TalleresInterface } from './../talleres.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./talleres-edit-modal.component.scss')],
  templateUrl: './talleres-edit-modal.component.html'
})

export class TalleresEditModalComponent extends DialogComponent<TalleresInterface, any> implements OnInit, TalleresInterface {


  idtaller: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  telefono:number;
  coordenada_idcoordenada:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  taller: TalleresInterface = {

    idtaller: 0,
    nombre: '',
    direccion: '',
    descripcion: '',
    telefono:0,
    coordenada_idcoordenada:0,
  };

  idtallerAC: AbstractControl;
  nombreAC: AbstractControl;
  direccionAC: AbstractControl;
  descripcionAC: AbstractControl;
  telefonoAC: AbstractControl;
  coordenada_idcoordenadaAC: AbstractControl;



  constructor(
    private service: TalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'direccionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'telefonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'coordenada_idcoordenadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idtallerAC = this.form.controls['idtallerAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.direccionAC = this.form.controls['direccionAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.coordenada_idcoordenadaAC = this.form.controls['coordenada_idcoordenadaAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: TalleresInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editTalleres({


          idtaller: this.idtaller,
          nombre: this.nombre,
          direccion: this.direccion,
          descripcion: this.descripcion,
          telefono: this.telefono,
          coordenada_idcoordenada: this.coordenada_idcoordenada,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getTalleres(): void {
    this.service.getTalleres(this.id)
        .subscribe( data => {
          this.taller = data[1];
        },
        error => console.log(error),
        () => console.log('Get taller complete'));
  }

}
