import { PermisotaxiasignadosInterface } from 'app/pages/permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CorralonesService } from './../corralones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CorralonesInterface } from './../corralones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./corralones-edit-modal.component.scss')],
  templateUrl: './corralones-edit-modal.component.html',
  providers: [
    PermisotaxiasignadosService
  ]
})

export class CorralonesEditModalComponent extends DialogComponent<CorralonesInterface, any> implements OnInit, CorralonesInterface {

  idcorralon: number;
  infraccionNumero: number;
  corralonNombre: string;
  fecha: string;
  motivo: string;
  status: string;
  permisotaxiasignado_idpermisotaxiasignado:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public idcorralonAC: AbstractControl;
  public infraccionNumeroAC: AbstractControl;
  public corralonNombreAC: AbstractControl;
  public fechaAC: AbstractControl;
  public motivoAC: AbstractControl;
  public statusAC: AbstractControl;
  public permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;
  
  public permisos: PermisotaxiasignadosInterface[]
  constructor(
    private corralonesService: CorralonesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({
      'infraccionNumeroAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'corralonNombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.required],
      'motivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.infraccionNumeroAC = this.form.controls['infraccionNumeroAC'];
    this.corralonNombreAC = this.form.controls['corralonNombreAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.motivoAC = this.form.controls['motivoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];

  }

  ngOnInit() {
    this.getAllPermisos()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: CorralonesInterface): void {
      this.corralonesService.edit({
          idcorralon: this.idcorralon,
          infraccionNumero: this.infraccionNumero,
          corralonNombre: this.corralonNombre,
          fecha: this.fecha,
          motivo: this.motivo,
          status: this.status,
          permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
        }).subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }

  getAllPermisos() {
    this.permisotaxiasignadosService.all()
      .subscribe( res => res.success ? this.permisos = res.result : null)
  }

  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }

}
