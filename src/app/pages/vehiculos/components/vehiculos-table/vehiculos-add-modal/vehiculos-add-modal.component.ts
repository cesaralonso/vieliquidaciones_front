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
  selector: 'add-service-modal',
  styleUrls: [('./vehiculos-add-modal.component.scss')],
  templateUrl: './vehiculos-add-modal.component.html',
  providers: [
    PersonasService
  ]
})

export class VehiculosAddModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  public propietario: AbstractControl;
  public anio: AbstractControl;
  public marca: AbstractControl;
  public kilometraje: AbstractControl;
  public modelo: AbstractControl;
  public serie: AbstractControl;
  public serieMotor: AbstractControl;
  public placa: AbstractControl;
  public status: AbstractControl;
  public poliza: AbstractControl;
  public polizaTipo: AbstractControl;
  public condActual: AbstractControl;
  public condInicial: AbstractControl;
  public color: AbstractControl;

  public propietarios: PersonasInterface[];

  constructor(
    private vehiculosService: VehiculosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private personasService: PersonasService,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'propietario' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'anio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'marca' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'kilometraje' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'modelo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'serie' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'serieMotor' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'placa' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'poliza' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'polizaTipo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'condActual' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'condInicial' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'color' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

        this.propietario = this.form.controls['propietario'];
        this.anio = this.form.controls['anio'];
        this.marca = this.form.controls['marca'];
        this.kilometraje = this.form.controls['kilometraje'];
        this.modelo = this.form.controls['modelo'];
        this.serie = this.form.controls['serie'];
        this.serieMotor = this.form.controls['serieMotor'];
        this.placa = this.form.controls['placa'];
        this.status = this.form.controls['status'];
        this.poliza = this.form.controls['poliza'];
        this.polizaTipo = this.form.controls['polizaTipo'];
        this.condActual = this.form.controls['condActual'];
        this.condInicial = this.form.controls['condInicial'];
        this.color = this.form.controls['color'];
  }


  ngOnInit() {
    this.getPersonas()
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: VehiculosInterface): void {
    console.log(values)  
    this.vehiculosService.create(values)
      .subscribe (data => {
          this.data = data;
          this.confirm();
        });
  }

  getPersonas() {
    this.personasService.all()
      .subscribe( res => res.success ? this.propietarios = res.result : null)
  }
}
