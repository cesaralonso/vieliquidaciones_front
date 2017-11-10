import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./personas-edit-modal.component.scss')],
  templateUrl: './personas-edit-modal.component.html'
})

export class PersonasEditModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit, PersonasInterface {


  idpersona: number;
  nombre: string;
  sexo: string;
  RFC: string;
  domicilio: string;
  telefono: number;
  edad: number;
  coordenada_idcoordenada: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  idpersonaAC: AbstractControl;
  nombreAC: AbstractControl;
  sexoAC: AbstractControl;
  RFCAC: AbstractControl;
  domicilioAC: AbstractControl;
  telefonoAC: AbstractControl;
  edadAC: AbstractControl;
  coordenada_idcoordenadaAC: AbstractControl;

  constructor(
    private personasService: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'sexoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'RFCAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'domicilioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'telefonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'edadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'coordenada_idcoordenadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.nombreAC = this.form.controls['nombreAC'];
    this.sexoAC = this.form.controls['sexoAC'];
    this.RFCAC = this.form.controls['RFCAC'];
    this.domicilioAC = this.form.controls['domicilioAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.edadAC = this.form.controls['edadAC'];
    this.coordenada_idcoordenadaAC = this.form.controls['coordenada_idcoordenadaAC'];

  }

  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PersonasInterface): void {
    this.personasService.edit({
        idpersona: this.idpersona,
        nombre: this.nombre,
        sexo: this.sexo,
        RFC: this.RFC,
        domicilio: this.domicilio,
        telefono: this.telefono,
        edad: this.edad,
        coordenada_idcoordenada: this.coordenada_idcoordenada,
      })
      .subscribe( data => {
          this.data = data;
          this.confirm();
      });
  }
}
