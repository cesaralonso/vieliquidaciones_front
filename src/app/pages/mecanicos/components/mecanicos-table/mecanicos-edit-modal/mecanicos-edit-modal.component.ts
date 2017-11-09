import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MecanicosService } from './../mecanicos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { MecanicosInterface } from './../mecanicos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./mecanicos-edit-modal.component.scss')],
  templateUrl: './mecanicos-edit-modal.component.html'
})

export class MecanicosEditModalComponent extends DialogComponent<MecanicosInterface, any> implements OnInit, MecanicosInterface {


  idmecanico: number;
  taller_idtaller: number;
  persona_idpersona:number;
  total: number;
  fecha: string;
  concepto_idconcepto:number;

  
  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  mecanico: MecanicosInterface = {

    idmecanico: 0,
    total: 0,
    taller_idtaller: 0,
    fecha: '',
    concepto_idconcepto: 0
  };

  idmecanicoAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  persona_idpersonaAC: AbstractControl;



  constructor(
    private service: MecanicosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idmecanicoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'persona_idpersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idmecanicoAC = this.form.controls['idmecanicoAC'];
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: MecanicosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editMecanicos({


          idmecanico: this.idmecanico,
          taller_idtaller: this.taller_idtaller,
          total: 0,
          fecha: '',
          concepto_idconcepto: 0


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getMecanicos(): void {
    this.service.getMecanicos(this.id)
        .subscribe( data => {
          this.mecanico = data[1];
        },
        error => console.log(error),
        () => console.log('Get mecanico complete'));
  }

}
