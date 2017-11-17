import { Router } from '@angular/router';
import { ChoferesResponseInterface } from 'app/pages/choferes/components/choferes-table/choferes-response.interface';
import { ChoferesService } from './../choferes-table/choferes.service';
import { PersonasAddModalComponent } from './../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { ToastrService } from 'ngx-toastr/toastr/toastr-service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Promise } from 'q';
import { ChoferesInterface } from 'app/pages/choferes/components/choferes-table/choferes.interface';

@Component({
  selector: 'app-choferes-create',
  templateUrl: './choferes-create.component.html',
  styleUrls: ['./choferes-create.component.scss'],
  providers: [
    ChoferesService
  ]
})
export class ChoferesCreateComponent implements OnInit {

  public chofer: ChoferesInterface = {
    idchofer: null,
    licencia: '',
    status: '',
    chofer: null,
    fianza: 0,
    aval1: null,
    aval2: null,
    aval3: null,
    aval4: null
  }
  constructor(
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private choferesService: ChoferesService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
  }

  addPersonasModalShow( element ) {
    this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data =>  {
        if ( data.success ){
          this.showToast( data )
          this.chofer[element] = data.result.insertId
        }
      })
  }
  
  showToast( data ) {
    if ( data.success )
      this.toastrService.success(data.message);
    else
      this.toastrService.error(data.message);
  }

  onSubmitChofer( values ) {
    console.log(values);
    this.choferesService.create(this.chofer)
      .subscribe((data: ChoferesResponseInterface) =>
          this.router.navigate(['/pages/choferes/all']));
  }
}
