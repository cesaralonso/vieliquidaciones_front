import { ConceptosInterface } from 'app/pages/conceptos/components/conceptos-table/conceptos.interface';
import { TalleresService } from './../../../../talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EgresoconceptosService } from './../egresoconceptos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { EgresoconceptosInterface } from './../egresoconceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConceptosService } from 'app/pages/conceptos/components/conceptos-table/conceptos.service';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./egresoconceptos-edit-modal.component.scss')],
  templateUrl: './egresoconceptos-edit-modal.component.html',
  providers: [
    ConceptosService,
    TalleresService
  ]
})

export class EgresoconceptosEditModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit, EgresoconceptosInterface {

  idegresoconcepto: number;
  total: number;
  taller_idtaller: number;
  fecha: string;
  concepto_idconcepto:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public idegresoconceptoAC: AbstractControl;
  public totalAC: AbstractControl;
  public taller_idtallerAC: AbstractControl;
  public fechaAC: AbstractControl;
  public concepto_idconceptoAC: AbstractControl;
  public conceptos: ConceptosInterface[];
  public talleres: TalleresInterface[];

  constructor(
    private service: EgresoconceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private conceptosService: ConceptosService,
    private talleresService: TalleresService,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'concepto_idconceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.totalAC = this.form.controls['totalAC'];
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.concepto_idconceptoAC = this.form.controls['concepto_idconceptoAC'];
  }

  ngOnInit() {
    this.getAllConceptos()
    this.getAllTalleres()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }
  
  getAllConceptos() {
    this.conceptosService.all()
      .subscribe( res => this.conceptos = res.success ? res.result : null)
  }

  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => this.talleres = res.success ? res.result : null)
  }

  onSubmit(values: EgresoconceptosInterface): void {
      this.service.edit({
          idegresoconcepto: this.idegresoconcepto,
          total: this.total,
          taller_idtaller: this.taller_idtaller,
          fecha: this.fecha,
          concepto_idconcepto: this.concepto_idconcepto,
        }).subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }

  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }

}
