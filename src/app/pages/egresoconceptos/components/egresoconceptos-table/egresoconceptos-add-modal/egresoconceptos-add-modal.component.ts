import { TalleresService } from 'app/pages/talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EgresoconceptosService } from './../egresoconceptos.service';
import { EgresoconceptosInterface } from './../egresoconceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConceptosService } from 'app/pages/conceptos/components/conceptos-table/conceptos.service';
import { ConceptosInterface } from 'app/pages/conceptos/components/conceptos-table/conceptos.interface';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./egresoconceptos-add-modal.component.scss')],
  templateUrl: './egresoconceptos-add-modal.component.html',
  providers: [
    ConceptosService,
    TalleresService
  ]
})

export class EgresoconceptosAddModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  total: AbstractControl;
  taller_idtaller: AbstractControl;
  fecha: AbstractControl;
  concepto_idconcepto: AbstractControl;
  public conceptos: ConceptosInterface[];
  public talleres: TalleresInterface[];
  constructor(
    private service: EgresoconceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private conceptosService: ConceptosService,
    private talleresService: TalleresService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'total' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fecha' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'concepto_idconcepto' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.total = this.form.controls['total'];
    this.taller_idtaller = this.form.controls['taller_idtaller'];
    this.fecha = this.form.controls['fecha'];
    this.concepto_idconcepto = this.form.controls['concepto_idconcepto'];
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
      this.service.create(values)
        .subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }
}
