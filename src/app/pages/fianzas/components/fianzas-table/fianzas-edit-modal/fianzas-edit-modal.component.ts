import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FianzasService } from './../fianzas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { FianzasInterface } from './../fianzas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./fianzas-edit-modal.component.scss')],
  templateUrl: './fianzas-edit-modal.component.html'
})

export class FianzasEditModalComponent extends DialogComponent<FianzasInterface, any> implements OnInit, FianzasInterface {


  idfianza: number;
  montopagado: number;
  montoadeudado: number;
  status: string;
  chofer_idchofer:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  fianza: FianzasInterface = {

    idfianza: 0,
    montopagado: 0,
    montoadeudado: 0,
    status: '',
    chofer_idchofer:0,
  };

  idfianzaAC: AbstractControl;
  montopagadoAC: AbstractControl;
  montoadeudadoAC: AbstractControl;
  statusAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;



  constructor(
    private service: FianzasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idfianzaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'montopagadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'montoadeudadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idfianzaAC = this.form.controls['idfianzaAC'];
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
        .editFianzas({


          idfianza: this.idfianza,
          montopagado: this.montopagado,
          montoadeudado: this.montoadeudado,
          status: this.status,
          chofer_idchofer: this.chofer_idchofer,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getFianzas(): void {
    this.service.getFianzas(this.id)
        .subscribe( data => {
          this.fianza = data[1];
        },
        error => console.log(error),
        () => console.log('Get fianza complete'));
  }

}
