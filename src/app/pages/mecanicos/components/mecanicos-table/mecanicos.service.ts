import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { MecanicosResponseInterface } from './mecanicos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { MecanicosInterface } from './mecanicos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MecanicosService {
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

    all = () : Observable<MecanicosResponseInterface> => {
       return this._http.get(this.endPoint)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

 findById = ( id ) : Observable<MecanicosResponseInterface> => {
       return this._http.get(`${this.endPoint}/${id}`)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

  create = ( mecanico: MecanicosInterface ) : Observable<MecanicosResponseInterface> => {
       return this._http.post(this.endPoint, mecanico, { headers: this.headers })
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }


    addMecanicos = (mecanicos: MecanicosInterface): Observable<MecanicosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarMecanico`;
        const toAdd = JSON.stringify(mecanicos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editMecanicos = (mecanicos: MecanicosInterface): Observable<MecanicosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarMecanico`;
        const toAdd = JSON.stringify(mecanicos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getMecanicos = (idMecanico: number): Observable<MecanicosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerMecanicosPorIDMecanico`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idmecanico: idMecanico,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosInterface>response.json())
            .catch(this.handleError);
    }

    getAllMecanicos = (): Observable<MecanicosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerMecanicos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <MecanicosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteMecanicos = (id: string): Observable<MecanicosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaMecanicos`;

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

    autorizarMecanico = (idMecanico: number): Observable<MecanicosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarMecanico`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idmecanico: idMecanico,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearMecanico = (idMecanico: number): Observable<MecanicosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearMecanico`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idmecanico: idMecanico,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarMecanico = (idMecanico: number): Observable<MecanicosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarMecanico`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idmecanico: idMecanico,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarMecanico = (idMecanico: number): Observable<MecanicosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarMecanico`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idmecanico: idMecanico,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdMecanico = (idMecanico: number, idEstatusMecanico: number): Observable<MecanicosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDMecanico`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idmecanico: idMecanico,
            idestatusmecanico: idEstatusMecanico,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerMecanicosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<MecanicosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerMecanicosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerMecanicosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<MecanicosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerMecanicosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerMecanicosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<MecanicosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerMecanicosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerMecanicosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<MecanicosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerMecanicosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <MecanicosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusMecanicos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusMecanicos`;
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

    obtenerTipoMecanicos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoMecanicos`;
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
