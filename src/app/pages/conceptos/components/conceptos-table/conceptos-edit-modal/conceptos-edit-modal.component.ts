import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ConceptosService } from './../conceptos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ConceptosInterface } from './../conceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./conceptos-edit-modal.component.scss')],
  templateUrl: './conceptos-edit-modal.component.html'
})

export class ConceptosEditModalComponent extends DialogComponent<ConceptosInterface, any> implements OnInit, ConceptosInterface {


  idconcepto: number;
  nombre: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  idconceptoAC: AbstractControl;
  nombreAC: AbstractControl;

  constructor(
    private service: ConceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.nombreAC = this.form.controls['nombreAC'];
  }

  ngOnInit() {
  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: ConceptosInterface): void {
    this.service.edit({
        idconcepto: this.idconcepto,
        nombre: this.nombre,
      })
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
}
