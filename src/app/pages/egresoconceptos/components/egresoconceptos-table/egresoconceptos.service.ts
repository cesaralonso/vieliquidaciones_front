import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { EgresoconceptosResponseInterface } from './egresoconceptos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { EgresoconceptosInterface } from './egresoconceptos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EgresoconceptosService {

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

    addEgresoconceptos = (egresoconceptos: EgresoconceptosInterface): Observable<EgresoconceptosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarEgresoconcepto`;
        const toAdd = JSON.stringify(egresoconceptos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editEgresoconceptos = (egresoconceptos: EgresoconceptosInterface): Observable<EgresoconceptosResponseInterface> =>  {
        console.log(egresoconceptos.claveauth);
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarEgresoconcepto`;
        const toAdd = JSON.stringify(egresoconceptos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getEgresoconceptos = (idEgresoconcepto: number): Observable<EgresoconceptosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEgresoconceptosPorIDEgresoconcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idegresoconcepto: idEgresoconcepto,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosInterface>response.json())
            .catch(this.handleError);
    }

    getAllEgresoconceptos = (): Observable<EgresoconceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEgresoconceptos`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteEgresoconceptos = (id: string): Observable<EgresoconceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaEgresoconceptos`;
       
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

    autorizarEgresoconcepto = (idEgresoconcepto: number): Observable<EgresoconceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarEgresoconcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idegresoconcepto: idEgresoconcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearEgresoconcepto = (idEgresoconcepto: number): Observable<EgresoconceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearEgresoconcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idegresoconcepto: idEgresoconcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarEgresoconcepto = (idEgresoconcepto: number): Observable<EgresoconceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarEgresoconcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idegresoconcepto: idEgresoconcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarEgresoconcepto = (idEgresoconcepto: number): Observable<EgresoconceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarEgresoconcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idegresoconcepto: idEgresoconcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdEgresoconcepto = (idEgresoconcepto: number, idEstatusEgresoconcepto: number): Observable<EgresoconceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDEgresoconcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idegresoconcepto: idEgresoconcepto,
            idestatusegresoconcepto: idEstatusEgresoconcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEgresoconceptosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<EgresoconceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEgresoconceptosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEgresoconceptosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<EgresoconceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEgresoconceptosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEgresoconceptosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<EgresoconceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEgresoconceptosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEgresoconceptosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<EgresoconceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEgresoconceptosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EgresoconceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusEgresoconceptos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusEgresoconceptos`;
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

    obtenerTipoEgresoconceptos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoEgresoconceptos`;
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
