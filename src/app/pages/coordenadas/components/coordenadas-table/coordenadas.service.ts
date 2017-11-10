import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { CoordenadasResponseInterface } from './coordenadas-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { CoordenadasInterface } from './coordenadas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoordenadasService {

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

    all = () : Observable<CoordenadasResponseInterface> => {
       return this._http.get(this.endPoint)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

 findById = ( id ) : Observable<CoordenadasResponseInterface> => {
       return this._http.get(`${this.endPoint}/${id}`)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

  create = ( coordenada: CoordenadasInterface ) : Observable<CoordenadasResponseInterface> => {
       return this._http.post(this.endPoint, coordenada, { headers: this.headers })
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }



    addCoordenadas = (coordenadas: CoordenadasInterface): Observable<CoordenadasResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarCoordenada`;
        const toAdd = JSON.stringify(coordenadas);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface>response.json())
            .catch(this.handleError);
    }

    editCoordenadas = (coordenadas: CoordenadasInterface): Observable<CoordenadasResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarCoordenada`;
        const toAdd = JSON.stringify(coordenadas);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface>response.json())
            .catch(this.handleError);
    }

    getCoordenadas = (idCoordenada: number): Observable<CoordenadasInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCoordenadasPorIDCoordenada`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcoordenada: idCoordenada,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasInterface>response.json())
            .catch(this.handleError);
    }

    getAllCoordenadas = (): Observable<CoordenadasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCoordenadas`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <CoordenadasInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteCoordenadas = (id: string): Observable<CoordenadasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaCoordenadas`;

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

    autorizarCoordenada = (idCoordenada: number): Observable<CoordenadasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarCoordenada`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcoordenada: idCoordenada,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearCoordenada = (idCoordenada: number): Observable<CoordenadasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearCoordenada`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcoordenada: idCoordenada,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarCoordenada = (idCoordenada: number): Observable<CoordenadasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarCoordenada`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcoordenada: idCoordenada,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarCoordenada = (idCoordenada: number): Observable<CoordenadasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarCoordenada`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcoordenada: idCoordenada,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdCoordenada = (idCoordenada: number, idEstatusCoordenada: number): Observable<CoordenadasResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDCoordenada`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idcoordenada: idCoordenada,
            idestatuscoordenada: idEstatusCoordenada,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCoordenadasPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<CoordenadasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCoordenadasPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCoordenadasPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<CoordenadasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCoordenadasPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCoordenadasPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<CoordenadasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCoordenadasPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCoordenadasPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<CoordenadasInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCoordenadasPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CoordenadasInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusCoordenadas = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusCoordenadas`;
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

    obtenerTipoCoordenadas = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoCoordenadas`;
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
