import { PersonasInterface } from './../../../../personas/components/personas-table/personas.interface';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculosService } from './../vehiculos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { VehiculosInterface } from './../vehiculos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./vehiculos-edit-modal.component.scss')],
  templateUrl: './vehiculos-edit-modal.component.html',
  providers: [
    PersonasService
  ]
})

export class VehiculosEditModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit, VehiculosInterface {


  idvehiculo: number;
  propietario: number;
  anio: number;
  marca: string;
  kilometraje: number;
  modelo: string;
  serie: string;
  serieMotor:string;
  placa:string;
  status: string;
  poliza:string;
  polizaTipo:string;
  condActual: string;
  condInicial:string;
  color:string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public idvehiculoAC: AbstractControl;
  public propietarioAC: AbstractControl;
  public anioAC: AbstractControl;
  public marcaAC: AbstractControl;
  public kilometrajeAC: AbstractControl;
  public modeloAC: AbstractControl;
  public serieAC: AbstractControl;
  public serieMotorAC: AbstractControl;
  public placaAC: AbstractControl;
  public statusAC: AbstractControl;
  public polizaAC: AbstractControl;
  public polizaTipoAC: AbstractControl;
  public condActualAC: AbstractControl;
  public condInicialAC: AbstractControl;
  public colorAC: AbstractControl;

  public propietarios: PersonasInterface[];

  constructor(
    private service: VehiculosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private personasService: PersonasService,
    dialogService: DialogService,
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
    this.getPersonas()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: VehiculosInterface): void {
    this.service.edit({
        idvehiculo: this.idvehiculo,
        propietario: this.propietario,
        anio: this.anio,
        marca: this.marca,
        kilometraje: this.kilometraje,
        modelo: this.modelo,
        serie: this.serie,
        serieMotor: this.serieMotor,
        placa: this.placa,
        status: this.status,
        poliza: this.poliza,
        polizaTipo: this.polizaTipo,
        condActual: this.condActual,
        condInicial: this.condInicial,
        color: this.color,
      })
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

  getPersonas() {
    this.personasService.all()
      .subscribe( res => res.success ? this.propietarios = res.result : null)
  }
}
