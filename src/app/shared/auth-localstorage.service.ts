import { CredentialsInterface } from './credentials.interface';
import { Observable } from 'rxjs/Observable';
import { LoginInterface } from './../pages/login/login.interface';
import { LoginResponseInterface } from './../pages/login/login-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthLocalstorage {

  constructor(private localStorageService: LocalStorageService) {
  }

  toInt(tochange: any): number {
      return +tochange;
  }

  setAvatar(profileAvatar): void {
      this.localStorageService.set('profileAvatar', profileAvatar);
  }

  setCredentials(credentials: LoginInterface, loginResponseInterface: LoginResponseInterface): void {
      this.localStorageService.clearAll();
      this.localStorageService.set('isLoggedIn', true);
      this.localStorageService.set('email', credentials.email)
      this.localStorageService.set('token', loginResponseInterface.token)
  }

  getCredentials(): CredentialsInterface {
      const credentials: CredentialsInterface = {
        'email': this.localStorageService.get('email').toString(),
        'token': this.localStorageService.get('token').toString()
      }
      return credentials;
  }

  getIdUsuario(): string {
      return this.localStorageService.get('idusuario').toString();
  }

  clearAll(): void {
      this.localStorageService.clearAll();
  }


}