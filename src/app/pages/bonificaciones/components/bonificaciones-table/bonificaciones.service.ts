import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { BonificacionesResponseInterface } from './bonificaciones-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { BonificacionesInterface } from './bonificaciones.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BonificacionesService {

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

    addBonificaciones = (bonificaciones: BonificacionesInterface): Observable<BonificacionesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarBonificacion`;
        const toAdd = JSON.stringify(bonificaciones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editBonificaciones = (bonificaciones: BonificacionesInterface): Observable<BonificacionesResponseInterface> =>  {
        console.log(bonificaciones.claveauth);
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarBonificacion`;
        const toAdd = JSON.stringify(bonificaciones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getBonificaciones = (idBonificacion: number): Observable<BonificacionesInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerBonificacionesPorIDBonificacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idbonificacion: idBonificacion,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesInterface>response.json())
            .catch(this.handleError);
    }

    getAllBonificaciones = (): Observable<BonificacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerBonificaciones`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <BonificacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteBonificaciones = (id: string): Observable<BonificacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaBonificaciones`;
       
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

    autorizarBonificacion = (idBonificacion: number): Observable<BonificacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarBonificacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idbonificacion: idBonificacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearBonificacion = (idBonificacion: number): Observable<BonificacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearBonificacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idbonificacion: idBonificacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarBonificacion = (idBonificacion: number): Observable<BonificacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarBonificacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idbonificacion: idBonificacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarBonificacion = (idBonificacion: number): Observable<BonificacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarBonificacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idbonificacion: idBonificacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdBonificacion = (idBonificacion: number, idEstatusBonificacion: number): Observable<BonificacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDBonificacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idbonificacion: idBonificacion,
            idestatusbonificacion: idEstatusBonificacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerBonificacionesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<BonificacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerBonificacionesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerBonificacionesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<BonificacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerBonificacionesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerBonificacionesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<BonificacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerBonificacionesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerBonificacionesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<BonificacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerBonificacionesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <BonificacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusBonificaciones = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusBonificaciones`;
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

    obtenerTipoBonificaciones = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoBonificaciones`;
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
