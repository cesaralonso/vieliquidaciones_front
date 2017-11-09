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
  templateUrl: './permisotaxis-add-modal.component.html'
})

export class PermisotaxisAddModalComponent extends DialogComponent<PermisotaxisInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

    liquidezAC: AbstractControl;
    liquidezDomAC: AbstractControl;
    numeroAC: AbstractControl;
    propietarioAC: AbstractControl;
    fechaAltaAC: AbstractControl;
    vigenciaAC: AbstractControl;
    statusAC: AbstractControl;



  constructor(
    private service: PermisotaxisService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'liquidezAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'liquidezDomAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'numeroAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'propietarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAltaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'vigenciaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
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

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PermisotaxisInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addPermisotaxis(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
