import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./personas-add-modal.component.scss')],
  templateUrl: './personas-add-modal.component.html',
  providers: [
    PersonasService
  ]
})

export class PersonasAddModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  nombre: AbstractControl;
  sexo: AbstractControl;
  rfc: AbstractControl;
  domicilio: AbstractControl;
  telefono: AbstractControl;
  edad: AbstractControl;
  coordenada_idcoordenada: AbstractControl;

  constructor(
    private service: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'nombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'sexo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'rfc' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'domicilio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'telefono' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'edad' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'coordenada_idcoordenada' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.nombre = this.form.controls['nombre'];
    this.sexo = this.form.controls['sexo'];
    this.rfc = this.form.controls['rfc'];
    this.domicilio = this.form.controls['domicilio'];
    this.telefono = this.form.controls['telefono'];
    this.edad = this.form.controls['edad'];
    this.coordenada_idcoordenada = this.form.controls['coordenada_idcoordenada'];
  }

  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PersonasInterface): void {
    this.service.create(values)
      .subscribe( data => {
          this.data = data;
          this.confirm();
      });
  }
}
