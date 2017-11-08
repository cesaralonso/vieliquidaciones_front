import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ChoferesService } from './../choferes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ChoferesInterface } from './../choferes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./choferes-add-modal.component.scss')],
  templateUrl: './choferes-add-modal.component.html'
})

export class ChoferesAddModalComponent extends DialogComponent<ChoferesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;


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
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({


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
    this.aval4AC = this.form.controls['aval4AC']
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
        .addChoferes(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
