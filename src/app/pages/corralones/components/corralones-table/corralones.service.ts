import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { CorralonesResponseInterface } from './corralones-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { CorralonesInterface } from './corralones.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CorralonesService {

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

    addCorralones = (corralones: CorralonesInterface): Observable<CorralonesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarCorralon`;
        const toAdd = JSON.stringify(corralones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editCorralones = (corralones: CorralonesInterface): Observable<CorralonesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarCorralon`;
        const toAdd = JSON.stringify(corralones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getCorralones = (idCorralon: number): Observable<CorralonesInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCorralonesPorIDCorralon`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcorralon: idCorralon,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesInterface>response.json())
            .catch(this.handleError);
    }

    getAllCorralones = (): Observable<CorralonesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCorralones`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <CorralonesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteCorralones = (id: string): Observable<CorralonesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaCorralones`;
       
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

    autorizarCorralon = (idCorralon: number): Observable<CorralonesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarCorralon`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcorralon: idCorralon,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearCorralon = (idCorralon: number): Observable<CorralonesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearCorralon`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcorralon: idCorralon,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarCorralon = (idCorralon: number): Observable<CorralonesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarCorralon`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcorralon: idCorralon,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarCorralon = (idCorralon: number): Observable<CorralonesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarCorralon`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcorralon: idCorralon,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdCorralon = (idCorralon: number, idEstatusCorralon: number): Observable<CorralonesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDCorralon`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcorralon: idCorralon,
            idestatuscorralon: idEstatusCorralon,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCorralonesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<CorralonesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCorralonesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCorralonesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<CorralonesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCorralonesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCorralonesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<CorralonesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCorralonesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCorralonesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<CorralonesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCorralonesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CorralonesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusCorralones = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusCorralones`;
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

    obtenerTipoCorralones = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoCorralones`;
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
