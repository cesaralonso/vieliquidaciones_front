import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { ChoferesResponseInterface } from './choferes-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ChoferesInterface } from './choferes.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChoferesService {

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

    addChoferes = (choferes: ChoferesInterface): Observable<ChoferesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarChofer`;
        const toAdd = JSON.stringify(choferes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editChoferes = (choferes: ChoferesInterface): Observable<ChoferesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarChofer`;
        const toAdd = JSON.stringify(choferes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getChoferes = (idChofer: number): Observable<ChoferesInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerChoferesPorIDChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface>response.json())
            .catch(this.handleError);
    }

    getAllChoferes = (): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerChoferes`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteChoferes = (id: string): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaChoferes`;
       
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

    autorizarChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdChofer = (idChofer: number, idEstatusChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
            idestatuschofer: idEstatusChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerChoferesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerChoferesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerChoferesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerChoferesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusChoferes = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusChoferes`;
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

    obtenerTipoChoferes = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoChoferes`;
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
