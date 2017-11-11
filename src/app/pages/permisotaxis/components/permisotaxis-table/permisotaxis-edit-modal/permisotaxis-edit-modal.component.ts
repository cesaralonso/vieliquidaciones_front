import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasInterface } from './../../../../personas/components/personas-table/personas.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxisService } from './../permisotaxis.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisotaxisInterface } from './../permisotaxis.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisotaxis-edit-modal.component.scss')],
  templateUrl: './permisotaxis-edit-modal.component.html',
  providers: [
    PersonasService
  ]
})

export class PermisotaxisEditModalComponent extends DialogComponent<PermisotaxisInterface, any> implements OnInit, PermisotaxisInterface {

  idpermisotaxi: number;
  liquidez: number;
  liquidezDom: number;
  numero: string;
  propietario: number;
  fechaAlta: string;
  vigencia: string;
  status: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public idpermisotaxiAC: AbstractControl;
  public liquidezAC: AbstractControl;
  public liquidezDomAC: AbstractControl;
  public numeroAC: AbstractControl;
  public propietarioAC: AbstractControl;
  public fechaAltaAC: AbstractControl;
  public vigenciaAC: AbstractControl;
  public statusAC: AbstractControl;
  
  public propietarios: PersonasInterface[];
  constructor(
    private service: PermisotaxisService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private personasService: PersonasService,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'liquidezAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'liquidezDomAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'numeroAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'propietarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAltaAC' : ['', ],
      'vigenciaAC' : ['', ],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });
    this.liquidezAC = this.form.controls['liquidezAC'];
    this.liquidezDomAC = this.form.controls['liquidezDomAC'];
    this.numeroAC = this.form.controls['numeroAC'];
    this.propietarioAC = this.form.controls['propietarioAC'];
    this.fechaAltaAC = this.form.controls['fechaAltaAC'];
    this.vigenciaAC = this.form.controls['vigenciaAC'];
    this.statusAC = this.form.controls['statusAC'];
  }
  ngOnInit() {
    this.getPersonas()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisotaxisInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service.edit({
          idpermisotaxi: this.idpermisotaxi,
          liquidez: this.liquidez,
          liquidezDom: this.liquidezDom,
          numero: this.numero,
          propietario: this.propietario,
          fechaAlta: this.fechaAlta,
          vigencia: this.vigencia,
          status: this.status,
        })
        .subscribe( data => {
            this.data = data;
            this.confirm();
          });
    }
  }

  getPersonas() {
    this.personasService.all()
      .subscribe( res => res.success ? this.propietarios = res.result : null)
  }

  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }
}
