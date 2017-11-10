import { PersonasInterface } from './../../../../personas/components/personas-table/personas.interface';
import { PersonasResponseInterface } from './../../../../personas/components/personas-table/personas-response.interface';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ChoferesService } from './../choferes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ChoferesInterface } from './../choferes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./choferes-edit-modal.component.scss')],
  templateUrl: './choferes-edit-modal.component.html',
  providers: [
    PersonasService
  ]
})

export class ChoferesEditModalComponent extends DialogComponent<ChoferesInterface, any> implements OnInit, ChoferesInterface {

  idchofer: number;
  licencia: string;
  status: string;
  chofer: number;
  fianza: number;
  aval1: number;
  aval2: number;
  aval3: number;
  aval4: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public idchoferAC: AbstractControl;
  public licenciaAC: AbstractControl;
  public statusAC: AbstractControl;
  public choferAC: AbstractControl;
  public fianzaAC: AbstractControl;
  public aval1AC: AbstractControl;
  public aval2AC: AbstractControl;
  public aval3AC: AbstractControl;
  public aval4AC: AbstractControl;

  public avales: PersonasInterface[];

  constructor(
    private choferesService: ChoferesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private personasService: PersonasService,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idchoferAC' : this.id,
      'licenciaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'choferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fianzaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval1AC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval2AC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval3AC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval4AC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idchoferAC = this.form.controls['idchoferAC'];
    this.licenciaAC = this.form.controls['licenciaAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.choferAC = this.form.controls['choferAC'];
    this.fianzaAC = this.form.controls['fianzaAC'];
    this.aval1AC = this.form.controls['aval1AC'];
    this.aval2AC = this.form.controls['aval2AC'];
    this.aval3AC = this.form.controls['aval3AC'];
    this.aval4AC = this.form.controls['aval4AC'];

  }

  ngOnInit() {
    this.getPersonas()
  }

  getPersonas() {
    this.personasService.all()
      .subscribe( (res: PersonasResponseInterface) => 
        res.success ? this.avales = res.result : null)
  }
  
  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: ChoferesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.choferesService.edit({
          idchofer: this.idchofer,
          licencia: this.licencia,
          status: this.status,
          chofer: this.chofer,
          fianza: this.fianza,
          aval1: this.aval1,
          aval2: this.aval2,
          aval3: this.aval3,
          aval4: this.aval4,
      }).subscribe(
          (data: any) => {
            this.data = data;
            this.confirm();
      });
    }
  }
}
