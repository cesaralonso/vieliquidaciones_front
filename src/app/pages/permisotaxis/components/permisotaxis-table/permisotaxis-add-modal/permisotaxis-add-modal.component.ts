import { PersonasInterface } from './../../../../personas/components/personas-table/personas.interface';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxisService } from './../permisotaxis.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisotaxisInterface } from './../permisotaxis.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisotaxis-add-modal.component.scss')],
  templateUrl: './permisotaxis-add-modal.component.html',
  providers: [
    PersonasService
  ]
})

export class PermisotaxisAddModalComponent extends DialogComponent<PermisotaxisInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  public liquidez: AbstractControl;
  public liquidezDom: AbstractControl;
  public numero: AbstractControl;
  public propietario: AbstractControl;
  public fechaAlta: AbstractControl;
  public vigencia: AbstractControl;
  public status: AbstractControl;
  
  public propietarios: PersonasInterface[];
  constructor(
    private permisotaxisService: PermisotaxisService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private personasService: PersonasService,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'numero' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAlta' : ['', Validators.compose([Validators.required])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'vigencia' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'liquidez' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'liquidezDom' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'propietario' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });
    this.liquidez = this.form.controls['liquidez'];
    this.liquidezDom = this.form.controls['liquidezDom'];
    this.numero = this.form.controls['numero'];
    this.propietario = this.form.controls['propietario'];
    this.fechaAlta = this.form.controls['fechaAlta'];
    this.vigencia = this.form.controls['vigencia'];
    this.status = this.form.controls['status'];

  }

  ngOnInit() {
    this.getPersonas()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisotaxisInterface): void {
    this.permisotaxisService.create(values)
      .subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }

  getPersonas() {
    this.personasService.all()
      .subscribe( res => res.success ? this.propietarios = res.result : null)
  }
}
