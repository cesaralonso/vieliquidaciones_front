import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { FoliosResponseInterface } from './folios-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { FoliosInterface } from './folios.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FoliosService {
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

    all = () : Observable<FoliosResponseInterface> => {
           return this._http.get(this.endPoint)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

     findById = ( id ) : Observable<FoliosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

      create = ( folio: FoliosInterface ) : Observable<FoliosResponseInterface> => {
           return this._http.post(this.endPoint, folio, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

    addFolios = (folios: FoliosInterface): Observable<FoliosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarFolio`;
        const toAdd = JSON.stringify(folios);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editFolios = (folios: FoliosInterface): Observable<FoliosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarFolio`;
        const toAdd = JSON.stringify(folios);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getFolios = (idFolio: number): Observable<FoliosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFoliosPorIDFolio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfolio: idFolio,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosInterface>response.json())
            .catch(this.handleError);
    }

    getAllFolios = (): Observable<FoliosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFolios`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <FoliosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteFolios = (id: string): Observable<FoliosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaFolios`;

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

    autorizarFolio = (idFolio: number): Observable<FoliosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarFolio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfolio: idFolio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearFolio = (idFolio: number): Observable<FoliosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearFolio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfolio: idFolio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarFolio = (idFolio: number): Observable<FoliosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarFolio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfolio: idFolio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarFolio = (idFolio: number): Observable<FoliosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarFolio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfolio: idFolio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdFolio = (idFolio: number, idEstatusFolio: number): Observable<FoliosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDFolio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idfolio: idFolio,
            idestatusfolio: idEstatusFolio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFoliosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<FoliosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFoliosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFoliosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<FoliosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFoliosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFoliosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<FoliosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFoliosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerFoliosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<FoliosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerFoliosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <FoliosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusFolios = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusFolios`;
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

    obtenerTipoFolios = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoFolios`;
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
