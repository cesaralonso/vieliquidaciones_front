import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { PermisotaxisResponseInterface } from './permisotaxis-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { PermisotaxisInterface } from './permisotaxis.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisotaxisService {

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

    addPermisotaxis = (permisotaxis: PermisotaxisInterface): Observable<PermisotaxisResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarPermisotaxi`;
        const toAdd = JSON.stringify(permisotaxis);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface>response.json())
            .catch(this.handleError);
    }

    editPermisotaxis = (permisotaxis: PermisotaxisInterface): Observable<PermisotaxisResponseInterface> =>  {
        console.log(permisotaxis.claveauth);
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarPermisotaxi`;
        const toAdd = JSON.stringify(permisotaxis);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface>response.json())
            .catch(this.handleError);
    }

    getPermisotaxis = (idPermisotaxi: number): Observable<PermisotaxisInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxisPorIDPermisotaxi`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxi: idPermisotaxi,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisInterface>response.json())
            .catch(this.handleError);
    }

    getAllPermisotaxis = (): Observable<PermisotaxisInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxis`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <PermisotaxisInterface[]>response.json())
            .catch(this.handleError);
    }

    deletePermisotaxis = (id: string): Observable<PermisotaxisResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaPermisotaxis`;
       
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

    autorizarPermisotaxi = (idPermisotaxi: number): Observable<PermisotaxisResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarPermisotaxi`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxi: idPermisotaxi,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearPermisotaxi = (idPermisotaxi: number): Observable<PermisotaxisResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearPermisotaxi`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxi: idPermisotaxi,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarPermisotaxi = (idPermisotaxi: number): Observable<PermisotaxisResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarPermisotaxi`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxi: idPermisotaxi,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarPermisotaxi = (idPermisotaxi: number): Observable<PermisotaxisResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarPermisotaxi`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxi: idPermisotaxi,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdPermisotaxi = (idPermisotaxi: number, idEstatusPermisotaxi: number): Observable<PermisotaxisResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDPermisotaxi`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idpermisotaxi: idPermisotaxi,
            idestatuspermisotaxi: idEstatusPermisotaxi,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxisPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<PermisotaxisInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxisPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxisPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<PermisotaxisInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxisPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxisPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<PermisotaxisInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxisPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisotaxisPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<PermisotaxisInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisotaxisPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisotaxisInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusPermisotaxis = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusPermisotaxis`;
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

    obtenerTipoPermisotaxis = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoPermisotaxis`;
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
