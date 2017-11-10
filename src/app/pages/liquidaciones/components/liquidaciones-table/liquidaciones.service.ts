import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { LiquidacionesResponseInterface } from './liquidaciones-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { LiquidacionesInterface } from './liquidaciones.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LiquidacionesService {
    private actionUrl: string;
    private headers: Headers;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.endPoint = `${this._configuration.ServerWithApiUrl}chofer`;        
    }

    all = () : Observable<LiquidacionesResponseInterface> => {
           return this._http.get(this.endPoint)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

     findById = ( id ) : Observable<LiquidacionesResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

      create = ( liquidacion: LiquidacionesInterface ) : Observable<LiquidacionesResponseInterface> => {
           return this._http.post(this.endPoint, liquidacion, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

    addLiquidaciones = (liquidaciones: LiquidacionesInterface): Observable<LiquidacionesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarLiquidacion`;
        const toAdd = JSON.stringify(liquidaciones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editLiquidaciones = (liquidaciones: LiquidacionesInterface): Observable<LiquidacionesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarLiquidacion`;
        const toAdd = JSON.stringify(liquidaciones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getLiquidaciones = (idLiquidacion: number): Observable<LiquidacionesInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerLiquidacionesPorIDLiquidacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idliquidacion: idLiquidacion,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface>response.json())
            .catch(this.handleError);
    }

    getAllLiquidaciones = (): Observable<LiquidacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerLiquidaciones`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteLiquidaciones = (id: string): Observable<LiquidacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaLiquidaciones`;

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

    autorizarLiquidacion = (idLiquidacion: number): Observable<LiquidacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarLiquidacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idliquidacion: idLiquidacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearLiquidacion = (idLiquidacion: number): Observable<LiquidacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearLiquidacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idliquidacion: idLiquidacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarLiquidacion = (idLiquidacion: number): Observable<LiquidacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarLiquidacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idliquidacion: idLiquidacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarLiquidacion = (idLiquidacion: number): Observable<LiquidacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarLiquidacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idliquidacion: idLiquidacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdLiquidacion = (idLiquidacion: number, idEstatusLiquidacion: number): Observable<LiquidacionesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDLiquidacion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idliquidacion: idLiquidacion,
            idestatusliquidacion: idEstatusLiquidacion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerLiquidacionesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<LiquidacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerLiquidacionesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerLiquidacionesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<LiquidacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerLiquidacionesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerLiquidacionesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<LiquidacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerLiquidacionesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerLiquidacionesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<LiquidacionesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerLiquidacionesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusLiquidaciones = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusLiquidaciones`;
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

    obtenerTipoLiquidaciones = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoLiquidaciones`;
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
