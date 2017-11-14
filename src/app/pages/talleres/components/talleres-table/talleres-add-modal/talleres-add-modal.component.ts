import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TalleresService } from './../talleres.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TalleresInterface } from './../talleres.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./talleres-add-modal.component.scss')],
  templateUrl: './talleres-add-modal.component.html'
})

export class TalleresAddModalComponent extends DialogComponent<TalleresInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public nombre: AbstractControl;
  public direccion: AbstractControl;
  public descripcion: AbstractControl;
  public telefono: AbstractControl;
  public coordenada_idcoordenada: AbstractControl;


  constructor(
    private talleresService: TalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'nombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'direccion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'telefono' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'coordenada_idcoordenada' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.nombre = this.form.controls['nombre'];
    this.direccion = this.form.controls['direccion'];
    this.descripcion = this.form.controls['descripcion'];
    this.telefono = this.form.controls['telefono'];
    this.coordenada_idcoordenada = this.form.controls['coordenada_idcoordenada'];
  }

  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: TalleresInterface): void {
    this.talleresService.create(values)
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
}
