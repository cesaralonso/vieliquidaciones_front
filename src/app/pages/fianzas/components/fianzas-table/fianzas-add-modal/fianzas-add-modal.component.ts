import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FianzasService } from './../fianzas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { FianzasInterface } from './../fianzas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./fianzas-add-modal.component.scss')],
  templateUrl: './fianzas-add-modal.component.html'
})

export class FianzasAddModalComponent extends DialogComponent<FianzasInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  montopagadoAC: AbstractControl;
  montoadeudadoAC: AbstractControl;
  statusAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;


  constructor(
    private service: FianzasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

      'montopagadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'montoadeudadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.montopagadoAC = this.form.controls['montopagadoAC'];
    this.montoadeudadoAC = this.form.controls['montoadeudadoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];

  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: FianzasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addFianzas(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
