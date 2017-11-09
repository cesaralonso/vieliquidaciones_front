import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { EnviotalleresResponseInterface } from './enviotalleres-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { EnviotalleresInterface } from './enviotalleres.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EnviotalleresService {

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

    addEnviotalleres = (enviotalleres: EnviotalleresInterface): Observable<EnviotalleresResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarEnviotaller`;
        const toAdd = JSON.stringify(enviotalleres);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface>response.json())
            .catch(this.handleError);
    }

    editEnviotalleres = (enviotalleres: EnviotalleresInterface): Observable<EnviotalleresResponseInterface> =>  {
        console.log(enviotalleres.claveauth);
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarEnviotaller`;
        const toAdd = JSON.stringify(enviotalleres);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface>response.json())
            .catch(this.handleError);
    }

    getEnviotalleres = (idEnviotaller: number): Observable<EnviotalleresInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEnviotalleresPorIDEnviotaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idenviotaller: idEnviotaller,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresInterface>response.json())
            .catch(this.handleError);
    }

    getAllEnviotalleres = (): Observable<EnviotalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEnviotalleres`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <EnviotalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteEnviotalleres = (id: string): Observable<EnviotalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaEnviotalleres`;
       
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

    autorizarEnviotaller = (idEnviotaller: number): Observable<EnviotalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarEnviotaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idenviotaller: idEnviotaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearEnviotaller = (idEnviotaller: number): Observable<EnviotalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearEnviotaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idenviotaller: idEnviotaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarEnviotaller = (idEnviotaller: number): Observable<EnviotalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarEnviotaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idenviotaller: idEnviotaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarEnviotaller = (idEnviotaller: number): Observable<EnviotalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarEnviotaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idenviotaller: idEnviotaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdEnviotaller = (idEnviotaller: number, idEstatusEnviotaller: number): Observable<EnviotalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDEnviotaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idenviotaller: idEnviotaller,
            idestatusenviotaller: idEstatusEnviotaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEnviotalleresPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<EnviotalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEnviotalleresPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEnviotalleresPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<EnviotalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEnviotalleresPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEnviotalleresPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<EnviotalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEnviotalleresPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEnviotalleresPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<EnviotalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEnviotalleresPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EnviotalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusEnviotalleres = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusEnviotalleres`;
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

    obtenerTipoEnviotalleres = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoEnviotalleres`;
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
