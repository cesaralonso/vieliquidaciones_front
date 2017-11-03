import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { PersonasResponseInterface } from './personas-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { PersonasInterface } from './personas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PersonasService {

    private actionUrl: string;
    private headers: Headers;


    constructor(
        private _http: Http, 
        private _configuration: Configuration, 
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    addPersonas = (personas: PersonasInterface): Observable<PersonasResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarPersona`;
        const toAdd = JSON.stringify(personas);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface>response.json())
            .catch(this.handleError);
    }

    editPersonas = (personas: PersonasInterface): Observable<PersonasResponseInterface> =>  {
        console.log(personas.claveauth);
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarPersona`;
        const toAdd = JSON.stringify(personas);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface>response.json())
            .catch(this.handleError);
    }

    getPersonas = (idPersona: number): Observable<PersonasInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPersonasPorIDPersona`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpersona: idPersona,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasInterface>response.json())
            .catch(this.handleError);
    }

    getAllPersonas = (): Observable<PersonasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPersonas`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <PersonasInterface[]>response.json())
            .catch(this.handleError);
    }

    deletePersonas = (id: string): Observable<PersonasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaPersonas`;
       
        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'nicknameauth': credenciales.nicknameauth,
            'usuarioauth': credenciales.usuarioauth,
            'claveauth': credenciales.claveauth,
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarPersona = (idPersona: number): Observable<PersonasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarPersona`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpersona: idPersona,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearPersona = (idPersona: number): Observable<PersonasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearPersona`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpersona: idPersona,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarPersona = (idPersona: number): Observable<PersonasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarPersona`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpersona: idPersona,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarPersona = (idPersona: number): Observable<PersonasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarPersona`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpersona: idPersona,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdPersona = (idPersona: number, idEstatusPersona: number): Observable<PersonasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDPersona`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpersona: idPersona,
            idestatuspersona: idEstatusPersona,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPersonasPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<PersonasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPersonasPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPersonasPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<PersonasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPersonasPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPersonasPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<PersonasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPersonasPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPersonasPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<PersonasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPersonasPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PersonasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusPersonas = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusPersonas`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerRazonesSociales = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerRazonesSociales`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoPersonas = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoPersonas`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    setFile = (archivo: any): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}AgregarArchivo`;
        const toAdd = JSON.stringify(archivo);

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getFiles = (idreferencia: number, proceso: string): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}ObtenerArchivosPorProcesoPorIdReferencia`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            'nicknameauth': credenciales.nicknameauth,
            'usuarioauth': credenciales.usuarioauth,
            'claveauth': credenciales.claveauth,
            'idreferencia': idreferencia,
            'proceso': proceso
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
