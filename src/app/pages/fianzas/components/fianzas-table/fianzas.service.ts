import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { FianzasResponseInterface } from './fianzas-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { FianzasInterface } from './fianzas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FianzasService {
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

    all = () : Observable<FianzasResponseInterface> => {
       return this._http.get(this.endPoint)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

 findById = ( id ) : Observable<FianzasResponseInterface> => {
       return this._http.get(`${this.endPoint}/${id}`)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

  create = ( fianza: FianzasInterface ) : Observable<FianzasResponseInterface> => {
       return this._http.post(this.endPoint, fianza, { headers: this.headers })
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }


    addFianzas = (fianzas: FianzasInterface): Observable<FianzasResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarFianza`;
        const toAdd = JSON.stringify(fianzas);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface>response.json())
            .catch(this.handleError);
    }

    editFianzas = (fianzas: FianzasInterface): Observable<FianzasResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarFianza`;
        const toAdd = JSON.stringify(fianzas);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface>response.json())
            .catch(this.handleError);
    }

    getFianzas = (idFianza: number): Observable<FianzasInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFianzasPorIDFianza`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfianza: idFianza,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasInterface>response.json())
            .catch(this.handleError);
    }

    getAllFianzas = (): Observable<FianzasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFianzas`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <FianzasInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteFianzas = (id: string): Observable<FianzasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaFianzas`;

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

    autorizarFianza = (idFianza: number): Observable<FianzasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarFianza`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfianza: idFianza,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearFianza = (idFianza: number): Observable<FianzasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearFianza`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfianza: idFianza,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarFianza = (idFianza: number): Observable<FianzasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarFianza`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfianza: idFianza,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarFianza = (idFianza: number): Observable<FianzasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarFianza`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfianza: idFianza,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdFianza = (idFianza: number, idEstatusFianza: number): Observable<FianzasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDFianza`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfianza: idFianza,
            idestatusfianza: idEstatusFianza,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFianzasPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<FianzasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFianzasPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFianzasPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<FianzasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFianzasPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFianzasPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<FianzasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFianzasPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFianzasPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<FianzasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFianzasPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FianzasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusFianzas = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusFianzas`;
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

    obtenerTipoFianzas = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoFianzas`;
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
