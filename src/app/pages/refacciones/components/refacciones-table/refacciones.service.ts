import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { RefaccionesResponseInterface } from './refacciones-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { RefaccionesInterface } from './refacciones.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RefaccionesService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}refaccion`;
    }

    all = (): Observable<RefaccionesResponseInterface> => {
        return this._http.get(this.endPoint)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


    findById = ( id ) : Observable<RefaccionesResponseInterface> => {
        return this._http.get(`${this.endPoint}/${id}`)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


    create = ( refaccion: RefaccionesInterface ) : Observable<RefaccionesResponseInterface> => {
        return this._http.post(this.endPoint, refaccion, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    remove = ( choferId ): Observable<RefaccionesResponseInterface> => {
        return this._http.delete(`${this.endPoint}/${choferId}`, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    edit = (vehiculo: RefaccionesInterface): Observable<RefaccionesResponseInterface> =>  {
        return this._http.patch(this.endPoint, vehiculo, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    editRefacciones = (refacciones: RefaccionesInterface): Observable<RefaccionesResponseInterface> =>  {
        this.actionUrl = `${this.endPoint}modificarRefaccion`;
        const toAdd = JSON.stringify(refacciones);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getRefacciones = (idRefaccion: number): Observable<RefaccionesInterface> => {
        return this._http.get(this.endPoint)
            .map((response: Response) => <RefaccionesInterface>response.json())
            .catch(this.handleError);
    }

    getAllRefacciones = (): Observable<RefaccionesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerRefacciones`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <RefaccionesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteRefacciones = (id: string): Observable<RefaccionesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}bajaRefacciones`;

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

    autorizarRefaccion = (idRefaccion: number): Observable<RefaccionesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}autorizarRefaccion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrefaccion: idRefaccion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearRefaccion = (idRefaccion: number): Observable<RefaccionesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}bloquearRefaccion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrefaccion: idRefaccion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarRefaccion = (idRefaccion: number): Observable<RefaccionesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}cancelarRefaccion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrefaccion: idRefaccion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarRefaccion = (idRefaccion: number): Observable<RefaccionesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}FinalizarRefaccion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrefaccion: idRefaccion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdRefaccion = (idRefaccion: number, idEstatusRefaccion: number): Observable<RefaccionesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}cambiarEstatusPorIDRefaccion`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrefaccion: idRefaccion,
            idestatusrefaccion: idEstatusRefaccion,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerRefaccionesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<RefaccionesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerRefaccionesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerRefaccionesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<RefaccionesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerRefaccionesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerRefaccionesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<RefaccionesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerRefaccionesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerRefaccionesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<RefaccionesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerRefaccionesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <RefaccionesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusRefacciones = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerEstatusRefacciones`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerRazonesSociales = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerRazonesSociales`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoRefacciones = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerTipoRefacciones`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    setFile = (archivo: any): Observable<any> =>  {
        this.actionUrl = `${this.endPoint}AgregarArchivo`;
        const toAdd = JSON.stringify(archivo);

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getFiles = (idreferencia: number, proceso: string): Observable<any> =>  {
        this.actionUrl = `${this.endPoint}ObtenerArchivosPorProcesoPorIdReferencia`;
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
