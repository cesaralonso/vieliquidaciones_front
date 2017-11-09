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
  templateUrl: './choferes-edit-modal.component.html'
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

  choferI: ChoferesInterface = {
    idchofer: 0,
    licencia: '',
    status: '',
    chofer: 0,
    fianza: 0,
    aval1: 0,
    aval2: 0,
    aval3: 0,
    aval4: 0,
  };

  idchoferAC: AbstractControl;
  licenciaAC: AbstractControl;
  statusAC: AbstractControl;
  choferAC: AbstractControl;
  fianzaAC: AbstractControl;
  aval1AC: AbstractControl;
  aval2AC: AbstractControl;
  aval3AC: AbstractControl;
  aval4AC: AbstractControl;



  constructor(
    private service: ChoferesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
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


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: ChoferesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editChoferes({

          idchofer: this.idchofer,
          licencia: this.licencia,
          status: this.status,
          chofer: this.chofer,
          fianza: this.fianza,
          aval1: this.aval1,
          aval2: this.aval2,
          aval3: this.aval3,
          aval4: this.aval4,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getChoferes(): void {
    this.service.getChoferes(this.id)
        .subscribe( data => {
          this.choferI = data[1];
        },
        error => console.log(error),
        () => console.log('Get chofer complete'));
  }

}
