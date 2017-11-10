import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ConceptosService } from './../conceptos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ConceptosInterface } from './../conceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./conceptos-add-modal.component.scss')],
  templateUrl: './conceptos-add-modal.component.html'
})

export class ConceptosAddModalComponent extends DialogComponent<ConceptosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  public nombre: AbstractControl;

  constructor(
    private conceptosService: ConceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'nombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.nombre = this.form.controls['nombre'];
  }

  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ConceptosInterface): void {
      this.conceptosService.create(values)
        .subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }
}
