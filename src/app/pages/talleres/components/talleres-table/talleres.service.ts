import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { TalleresResponseInterface } from './talleres-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { TalleresInterface } from './talleres.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TalleresService {

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

    all = () : Observable<TalleresResponseInterface> => {
           return this._http.get(this.endPoint)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

     findById = ( id ) : Observable<TalleresResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

      create = ( taller: TalleresInterface ) : Observable<TalleresResponseInterface> => {
           return this._http.post(this.endPoint, taller, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

    addTalleres = (talleres: TalleresInterface): Observable<TalleresResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarTaller`;
        const toAdd = JSON.stringify(talleres);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface>response.json())
            .catch(this.handleError);
    }

    editTalleres = (talleres: TalleresInterface): Observable<TalleresResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarTaller`;
        const toAdd = JSON.stringify(talleres);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface>response.json())
            .catch(this.handleError);
    }

    getTalleres = (idTaller: number): Observable<TalleresInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTalleresPorIDTaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idtaller: idTaller,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresInterface>response.json())
            .catch(this.handleError);
    }

    getAllTalleres = (): Observable<TalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTalleres`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <TalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteTalleres = (id: string): Observable<TalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaTalleres`;

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

    autorizarTaller = (idTaller: number): Observable<TalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarTaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idtaller: idTaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearTaller = (idTaller: number): Observable<TalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearTaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idtaller: idTaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarTaller = (idTaller: number): Observable<TalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarTaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idtaller: idTaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarTaller = (idTaller: number): Observable<TalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarTaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idtaller: idTaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdTaller = (idTaller: number, idEstatusTaller: number): Observable<TalleresResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDTaller`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idtaller: idTaller,
            idestatustaller: idEstatusTaller,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTalleresPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<TalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTalleresPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTalleresPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<TalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTalleresPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTalleresPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<TalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTalleresPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTalleresPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<TalleresInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTalleresPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusTalleres = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusTalleres`;
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

    obtenerTipoTalleres = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTalleres`;
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
