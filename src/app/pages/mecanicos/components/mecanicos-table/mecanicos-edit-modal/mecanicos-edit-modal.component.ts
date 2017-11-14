import { PersonasService } from 'app/pages/personas/components/personas-table/personas.service';
import { PersonasInterface } from './../../../../personas/components/personas-table/personas.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MecanicosService } from './../mecanicos.service';
import { MecanicosInterface } from './../mecanicos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';
import { TalleresService } from 'app/pages/talleres/components/talleres-table/talleres.service';

@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./mecanicos-edit-modal.component.scss')],
  templateUrl: './mecanicos-edit-modal.component.html',
  providers: [
    TalleresService,
    PersonasService
  ]
})

export class MecanicosEditModalComponent extends DialogComponent<MecanicosInterface, any> implements OnInit, MecanicosInterface {


  idmecanico: number;
  taller_idtaller: number;
  persona_idpersona:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public idmecanicoAC: AbstractControl;
  public taller_idtallerAC: AbstractControl;
  public persona_idpersonaAC: AbstractControl;
  public talleres: TalleresInterface[];
  public personas: PersonasInterface[];
  constructor(
    private service: MecanicosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,
    private personasService: PersonasService,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'persona_idpersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];
  }

  ngOnInit() {
    this.getAllTalleres()
    this.getAllPersonas()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => res.success ? this.talleres = res.result : null)
  }
  
  getAllPersonas() {
    this.personasService.all()
      .subscribe( res => res.success ? this.personas = res.result : null)
  }

  onSubmit(values: MecanicosInterface): void {
    this.service.edit({
        idmecanico: this.idmecanico,
        taller_idtaller: this.taller_idtaller,
        persona_idpersona: this.persona_idpersona
      }).subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }

}
