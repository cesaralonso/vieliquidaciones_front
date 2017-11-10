import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { ServiciosResponseInterface } from './servicios-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ServiciosInterface } from './servicios.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiciosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}servicio/`;
    }

    all = (): Observable<ServiciosResponseInterface> => {
        return this._http.get(this.endPoint)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


     findById = ( id ) : Observable<ServiciosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
    }


      create = ( servicio: ServiciosInterface ) : Observable<ServiciosResponseInterface> => {
           return this._http.post(this.endPoint, servicio, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
    }


    add = ( servicios: ServiciosInterface ): Observable<ServiciosResponseInterface> =>  {
        return this._http.post(this.endPoint, servicios, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addServicios = (servicios: ServiciosInterface): Observable<ServiciosResponseInterface> =>  {
        this.actionUrl = `${this.endPoint}agregarServicio`;
        const toAdd = JSON.stringify(servicios);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editServicios = (servicios: ServiciosInterface): Observable<ServiciosResponseInterface> =>  {
        this.actionUrl = `${this.endPoint}modificarServicio`;
        const toAdd = JSON.stringify(servicios);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getServicios = (idServicio: number): Observable<ServiciosInterface> => {
        return this._http.get(this.endPoint)
            .map((response: Response) => <ServiciosInterface>response.json())
            .catch(this.handleError);
    }

    getAllServicios = (): Observable<ServiciosInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerServicios`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <ServiciosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteServicios = (id: string): Observable<ServiciosResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}bajaServicios`;

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

    autorizarServicio = (idServicio: number): Observable<ServiciosResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}autorizarServicio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idservicio: idServicio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearServicio = (idServicio: number): Observable<ServiciosResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}bloquearServicio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idservicio: idServicio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarServicio = (idServicio: number): Observable<ServiciosResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}cancelarServicio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idservicio: idServicio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarServicio = (idServicio: number): Observable<ServiciosResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}FinalizarServicio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idservicio: idServicio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdServicio = (idServicio: number, idEstatusServicio: number): Observable<ServiciosResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}cambiarEstatusPorIDServicio`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idservicio: idServicio,
            idestatusservicio: idEstatusServicio,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerServiciosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<ServiciosInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerServiciosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerServiciosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<ServiciosInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerServiciosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerServiciosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<ServiciosInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerServiciosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerServiciosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<ServiciosInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerServiciosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ServiciosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusServicios = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerEstatusServicios`;
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

    obtenerTipoServicios = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerTipoServicios`;
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
