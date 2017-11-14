import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { VehiculoreparandosResponseInterface } from './vehiculoreparandos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { VehiculoreparandosInterface } from './vehiculoreparandos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VehiculoreparandosService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}vehiculoreparando`;        
    }

    all = () : Observable<VehiculoreparandosResponseInterface> => {
        return this._http.get(this.endPoint)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    findById = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
        return this._http.get(`${this.endPoint}/${id}`)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    create = ( vehiculoreparando: VehiculoreparandosInterface ) : Observable<VehiculoreparandosResponseInterface> => {
        return this._http.post(this.endPoint, vehiculoreparando, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    remove = ( choferId ): Observable<VehiculoreparandosResponseInterface> => {
        return this._http.delete(`${this.endPoint}/${choferId}`, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    edit = ( vehiculo: VehiculoreparandosInterface ): Observable<VehiculoreparandosResponseInterface> =>  {
        return this._http.patch(this.endPoint, vehiculo, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addVehiculoreparandos = (vehiculoreparandos: VehiculoreparandosInterface): Observable<VehiculoreparandosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarVehiculoreparando`;
        const toAdd = JSON.stringify(vehiculoreparandos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editVehiculoreparandos = (vehiculoreparandos: VehiculoreparandosInterface): Observable<VehiculoreparandosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarVehiculoreparando`;
        const toAdd = JSON.stringify(vehiculoreparandos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getVehiculoreparandos = (idVehiculoreparando: number): Observable<VehiculoreparandosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculoreparandosPorIDVehiculoreparando`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculoreparando: idVehiculoreparando,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosInterface>response.json())
            .catch(this.handleError);
    }

    getAllVehiculoreparandos = (): Observable<VehiculoreparandosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculoreparandos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteVehiculoreparandos = (id: string): Observable<VehiculoreparandosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaVehiculoreparandos`;

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

    autorizarVehiculoreparando = (idVehiculoreparando: number): Observable<VehiculoreparandosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarVehiculoreparando`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculoreparando: idVehiculoreparando,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearVehiculoreparando = (idVehiculoreparando: number): Observable<VehiculoreparandosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearVehiculoreparando`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculoreparando: idVehiculoreparando,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarVehiculoreparando = (idVehiculoreparando: number): Observable<VehiculoreparandosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarVehiculoreparando`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculoreparando: idVehiculoreparando,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarVehiculoreparando = (idVehiculoreparando: number): Observable<VehiculoreparandosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarVehiculoreparando`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculoreparando: idVehiculoreparando,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdVehiculoreparando = (idVehiculoreparando: number, idEstatusVehiculoreparando: number): Observable<VehiculoreparandosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDVehiculoreparando`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculoreparando: idVehiculoreparando,
            idestatusvehiculoreparando: idEstatusVehiculoreparando,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculoreparandosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<VehiculoreparandosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculoreparandosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculoreparandosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<VehiculoreparandosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculoreparandosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculoreparandosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<VehiculoreparandosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculoreparandosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculoreparandosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<VehiculoreparandosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculoreparandosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculoreparandosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusVehiculoreparandos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusVehiculoreparandos`;
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

    obtenerTipoVehiculoreparandos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoVehiculoreparandos`;
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
