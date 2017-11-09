import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculosService } from './../vehiculos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { VehiculosInterface } from './../vehiculos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./vehiculos-add-modal.component.scss')],
  templateUrl: './vehiculos-add-modal.component.html'
})

export class VehiculosAddModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  propietarioAC: AbstractControl;
  anioAC: AbstractControl;
  marcaAC: AbstractControl;
  kilometrajeAC: AbstractControl;
  modeloAC: AbstractControl;
  serieAC: AbstractControl;
  serieMotorAC: AbstractControl;
  placaAC: AbstractControl;
  statusAC: AbstractControl;
  polizaAC: AbstractControl;
  polizaTipoAC: AbstractControl;
  condActualAC: AbstractControl;
  condInicialAC: AbstractControl;
  colorAC: AbstractControl;



  constructor(
    private service: VehiculosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'propietarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'anioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'marcaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'kilometrajeAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'modeloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'serieAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'serieMotorAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'placaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'polizaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'polizaTipoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'condActualAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'condInicialAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'colorAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

        this.propietarioAC = this.form.controls['propietarioAC'];
        this.anioAC = this.form.controls['anioAC'];
        this.marcaAC = this.form.controls['marcaAC'];
        this.kilometrajeAC = this.form.controls['kilometrajeAC'];
        this.modeloAC = this.form.controls['modeloAC'];
        this.serieAC = this.form.controls['serieAC'];
        this.serieMotorAC = this.form.controls['serieMotorAC'];
        this.placaAC = this.form.controls['placaAC'];
        this.statusAC = this.form.controls['statusAC'];
        this.polizaAC = this.form.controls['polizaAC'];
        this.polizaTipoAC = this.form.controls['polizaTipoAC'];
        this.condActualAC = this.form.controls['condActualAC'];
        this.condInicialAC = this.form.controls['condInicialAC'];
        this.colorAC = this.form.controls['colorAC'];
  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: VehiculosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addVehiculos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
