import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EnviotalleresService } from './../enviotalleres.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { EnviotalleresInterface } from './../enviotalleres.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./enviotalleres-edit-modal.component.scss')],
  templateUrl: './enviotalleres-edit-modal.component.html'
})

export class EnviotalleresEditModalComponent extends DialogComponent<EnviotalleresInterface, any> implements OnInit, EnviotalleresInterface {


  idenviotaller: number;
  taller_idtaller: number;
  enviotaller_idenviotaller: number;
  fecha: string;
  status: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  enviotaller: EnviotalleresInterface = {

    idenviotaller: 0,
    taller_idtaller: 0,
    enviotaller_idenviotaller: 0,
    fecha: '',
    status: '',
  };

  idenviotallerAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  enviotaller_idenviotallerAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;


  constructor(
    private service: EnviotalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idenviotallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'enviotaller_idenviotallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idenviotallerAC = this.form.controls['idenviotallerAC'];
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
        .editEnviotalleres({


          idenviotaller: this.idenviotaller,
          taller_idtaller: this.taller_idtaller,
          enviotaller_idenviotaller: this.enviotaller_idenviotaller,
          fecha: this.fecha,
          status: this.status,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getEnviotalleres(): void {
    this.service.getEnviotalleres(this.id)
        .subscribe( data => {
          this.enviotaller = data[1];
        },
        error => console.log(error),
        () => console.log('Get enviotaller complete'));
  }

}
