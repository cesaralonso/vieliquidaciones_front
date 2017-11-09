import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisotaxiasignadosService {

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

    addPermisotaxiasignados = (permisotaxiasignados: PermisotaxiasignadosInterface): Observable<PermisotaxiasignadosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarPermisotaxiasignado`;
        const toAdd = JSON.stringify(permisotaxiasignados);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editPermisotaxiasignados = (permisotaxiasignados: PermisotaxiasignadosInterface): Observable<PermisotaxiasignadosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarPermisotaxiasignado`;
        const toAdd = JSON.stringify(permisotaxiasignados);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getPermisotaxiasignados = (idPermisotaxiasignado: number): Observable<PermisotaxiasignadosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxiasignadosPorIDPermisotaxiasignado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxiasignado: idPermisotaxiasignado,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosInterface>response.json())
            .catch(this.handleError);
    }

    getAllPermisotaxiasignados = (): Observable<PermisotaxiasignadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxiasignados`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosInterface[]>response.json())
            .catch(this.handleError);
    }

    deletePermisotaxiasignados = (id: string): Observable<PermisotaxiasignadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaPermisotaxiasignados`;
       
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

    autorizarPermisotaxiasignado = (idPermisotaxiasignado: number): Observable<PermisotaxiasignadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarPermisotaxiasignado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxiasignado: idPermisotaxiasignado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearPermisotaxiasignado = (idPermisotaxiasignado: number): Observable<PermisotaxiasignadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearPermisotaxiasignado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxiasignado: idPermisotaxiasignado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarPermisotaxiasignado = (idPermisotaxiasignado: number): Observable<PermisotaxiasignadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarPermisotaxiasignado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxiasignado: idPermisotaxiasignado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarPermisotaxiasignado = (idPermisotaxiasignado: number): Observable<PermisotaxiasignadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarPermisotaxiasignado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxiasignado: idPermisotaxiasignado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdPermisotaxiasignado = (idPermisotaxiasignado: number, idEstatusPermisotaxiasignado: number): Observable<PermisotaxiasignadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDPermisotaxiasignado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxiasignado: idPermisotaxiasignado,
            idestatuspermisotaxiasignado: idEstatusPermisotaxiasignado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxiasignadosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<PermisotaxiasignadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxiasignadosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxiasignadosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<PermisotaxiasignadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxiasignadosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxiasignadosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<PermisotaxiasignadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxiasignadosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxiasignadosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<PermisotaxiasignadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxiasignadosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxiasignadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusPermisotaxiasignados = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusPermisotaxiasignados`;
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

    obtenerTipoPermisotaxiasignados = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoPermisotaxiasignados`;
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
