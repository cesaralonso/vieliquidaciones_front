import { UserService } from './../admin/components/users/components/usuarios-table/user.service';
import { LoginResponseInterface } from './login-response.interface';
import { LoginInterface } from './login.interface';
import { AuthService } from './../../shared/auth.service';
import { AuthLocalstorage } from './../../shared/auth-localstorage.service';
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(
    fb: FormBuilder,
    protected service: AuthService, 
    private authLocalstorage: AuthLocalstorage,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  onSubmit(values: LoginInterface): void {
    console.log(values)
    this.service.login(values)
      .subscribe(
          (response: LoginResponseInterface) => this.saveOnLocalStorage(response, values) );
  }

  private saveOnLocalStorage(response: LoginResponseInterface, credentials: LoginInterface) {
    if ( response.success ) {
      this.authLocalstorage.setCredentials(credentials, response);
      this.router.navigate(['pages/dashboard']);
    } else {
      this.authLocalstorage.clearAll();
    }
  }

}
