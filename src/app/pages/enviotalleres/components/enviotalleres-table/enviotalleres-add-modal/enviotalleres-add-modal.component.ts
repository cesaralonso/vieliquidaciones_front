import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EnviotalleresService } from './../enviotalleres.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { EnviotalleresInterface } from './../enviotalleres.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./enviotalleres-add-modal.component.scss')],
  templateUrl: './enviotalleres-add-modal.component.html'
})

export class EnviotalleresAddModalComponent extends DialogComponent<EnviotalleresInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  taller_idtallerAC: AbstractControl;
  enviotaller_idenviotallerAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;

  constructor(
    private service: EnviotalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'enviotaller_idenviotallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

        this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
        this.enviotaller_idenviotallerAC = this.form.controls['enviotaller_idenviotallerAC'];
        this.fechaAC = this.form.controls['fechaAC'];
        this.statusAC = this.form.controls['statusAC'];


  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EnviotalleresInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addEnviotalleres(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
